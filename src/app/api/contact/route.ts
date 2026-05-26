// src/app/api/contact/route.ts
// Handles contact form with optional file attachments via Resend.

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { db } from "@/lib/db";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Validation ───────────────────────────────────────────────────

const contactSchema = z.object({
  name:     z.string().min(2).max(80),
  email:    z.string().email(),
  subject:  z.string().max(120).optional(),
  message:  z.string().min(10).max(2000),
  honeypot: z.string().optional(),
});

// ─── Rate limiting ────────────────────────────────────────────────

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX    = 3;
const RATE_LIMIT_WINDOW = 60_000;

function isRateLimited(ip: string): boolean {
  const now   = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count++;
  return false;
}

// ─── Allowed file types ───────────────────────────────────────────

const ALLOWED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

const MAX_FILE_SIZE   = 5 * 1024 * 1024;  // 5MB per file
const MAX_FILES       = 3;                 // max 3 attachments
const MAX_TOTAL_SIZE  = 10 * 1024 * 1024; // 10MB total

// ─── Handler ──────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment." },
        { status: 429 }
      );
    }

    // Parse multipart form data
    const formData = await req.formData();

    const fields = {
      name:     formData.get("name")     as string,
      email:    formData.get("email")    as string,
      subject:  formData.get("subject")  as string | undefined,
      message:  formData.get("message")  as string,
      honeypot: formData.get("honeypot") as string | undefined,
    };

    // Validate fields
    const parsed = contactSchema.safeParse(fields);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input.", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Silently reject bots
    if (parsed.data.honeypot) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // ── Process attachments ───────────────────────────────────────
    const fileEntries = formData.getAll("attachments") as File[];
    const files = fileEntries.filter((f) => f && f.size > 0);

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { error: `Maximum ${MAX_FILES} files allowed.` },
        { status: 400 }
      );
    }

    let totalSize = 0;
    const attachments: { filename: string; content: Buffer }[] = [];

    for (const file of files) {
      // Check type
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: `File type not allowed: ${file.name}. Allowed: PDF, images, Word docs, text files.` },
          { status: 400 }
        );
      }

      // Check individual size
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File too large: ${file.name}. Max 5MB per file.` },
          { status: 400 }
        );
      }

      totalSize += file.size;

      // Check total size
      if (totalSize > MAX_TOTAL_SIZE) {
        return NextResponse.json(
          { error: "Total attachment size exceeds 10MB." },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({ filename: file.name, content: buffer });
    }

    const { name, email, subject, message } = parsed.data;
    const ipHash    = crypto.createHash("sha256").update(ip).digest("hex");
    const userAgent = req.headers.get("user-agent") ?? undefined;

    // Save to DB
    await db.contactMessage.create({
      data: { name, email, subject, message, ipHash, userAgent },
    });

    // Build attachment list for email body
    const attachmentInfo =
      attachments.length > 0
        ? `<p style="color:#555;font-size:13px">📎 ${attachments.length} attachment${attachments.length > 1 ? "s" : ""}: ${attachments.map((a) => a.filename).join(", ")}</p>`
        : "";

    // Send email with attachments
    await resend.emails.send({
      from:    "Portfolio Contact <onboarding@resend.dev>",
      to:      process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: subject
        ? `[Portfolio] ${subject}`
        : `[Portfolio] New message from ${name}`,
      attachments: attachments.map((a) => ({
        filename: a.filename,
        content:  a.content,
      })),
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#111">New message from your portfolio</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:8px 0;color:#666;width:80px">From</td>
              <td><strong>${name}</strong> &lt;${email}&gt;</td>
            </tr>
            ${subject ? `<tr><td style="padding:8px 0;color:#666">Subject</td><td>${subject}</td></tr>` : ""}
          </table>
          <hr style="margin:16px 0;border:none;border-top:1px solid #eee"/>
          <p style="line-height:1.7;color:#333;white-space:pre-wrap">${message}</p>
          <hr style="margin:16px 0;border:none;border-top:1px solid #eee"/>
          ${attachmentInfo}
          <p style="font-size:12px;color:#999">
            Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[contact route]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}