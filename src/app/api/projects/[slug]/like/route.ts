// src/app/api/projects/[slug]/like/route.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { toggleProjectLike, getProjectLikes, hasLikedProject } from "@/lib/analytics";
import crypto from "crypto";

type Params = { params: Promise<{ slug: string }> };

async function getSessionId(): Promise<string> {
  const cookieStore = await cookies();
  const existing = cookieStore.get("portfolio_session")?.value;
  if (existing) return existing;
  return crypto.randomUUID();
}

export async function GET(
  _req: NextRequest,
  { params }: Params
) {
  try {
    // ← await params first (Next.js 15 requirement)
    const { slug } = await params;
    const sessionId = await getSessionId();

    const [count, liked] = await Promise.all([
      getProjectLikes(slug),
      hasLikedProject(slug, sessionId),
    ]);

    return NextResponse.json({ count, liked });
  } catch {
    return NextResponse.json({ count: 0, liked: false });
  }
}

export async function POST(
  _req: NextRequest,
  { params }: Params
) {
  try {
    // ← await params first (Next.js 15 requirement)
    const { slug } = await params;

    const cookieStore = await cookies();
    let sessionId = cookieStore.get("portfolio_session")?.value;

    const isNew = !sessionId;
    if (!sessionId) sessionId = crypto.randomUUID();

    const { liked, count } = await toggleProjectLike(slug, sessionId);

    const res = NextResponse.json({ liked, count });

    if (isNew) {
      res.cookies.set("portfolio_session", sessionId, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365, // 1 year
        path: "/",
      });
    }

    return res;
  } catch {
    return NextResponse.json(
      { error: "Failed to toggle like" },
      { status: 500 }
    );
  }
}