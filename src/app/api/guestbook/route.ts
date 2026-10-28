import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';

const guestbookSchema = z.object({
  name: z.string().min(2).max(60),
  message: z.string().min(1).max(280),
  emoji: z.string().max(8).optional(),
});

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 2;
const RATE_LIMIT_WINDOW = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count++;
  return false;
}

export async function GET() {
  try {
    const entries = await db.guestbookEntry.findMany({
      where: { status: 'APPROVED' },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        message: true,
        emoji: true,
        createdAt: true,
      },
    });

    return NextResponse.json(entries);
  } catch (err) {
    console.error('[guestbook GET route]', err);
    return NextResponse.json(
      { error: 'Failed to fetch guestbook entries.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = guestbookSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input.', issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, message, emoji } = parsed.data;

    await db.guestbookEntry.create({
      data: {
        name,
        message,
        emoji,
        status: 'PENDING',
      },
    });

    return NextResponse.json(
      { success: true, message: 'Your entry is pending approval.' },
      { status: 200 }
    );
  } catch (err) {
    console.error('[guestbook POST route]', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
