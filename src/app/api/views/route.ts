// src/app/api/views/route.ts
// Returns total page views across all pages.
// Used by the Footer visitor counter.

import { NextResponse } from "next/server";
import { getTotalPageViews } from "@/lib/analytics";

export async function GET() {
  try {
    const total = await getTotalPageViews();
    return NextResponse.json({ total }, { status: 200 });
  } catch {
    return NextResponse.json({ total: 0 }, { status: 200 });
  }
}