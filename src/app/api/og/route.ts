import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Your Name — Full Stack Developer";

  return new Response(
    `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#080808"/>
      <rect x="60" y="60" width="1080" height="510" rx="16" fill="#111111"/>
      <circle cx="120" cy="120" r="8" fill="#6EE7B7"/>
      <text x="80" y="340" font-family="monospace" font-size="52" font-weight="bold" fill="white">${title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</text>
      <text x="80" y="420" font-family="monospace" font-size="28" fill="#6EE7B7">yourname.dev</text>
    </svg>`,
    {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=86400",
      },
    }
  );
}