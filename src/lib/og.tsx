// Shared design for the social preview images (opengraph-image.tsx files).
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE_HOST, SITE_NAME } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

type OgOptions = {
  eyebrow: string; // small label above the title, e.g. "Blog"
  title: string;
  subtitle?: string;
};

// Loaded once per server instance. Geist is OFL-licensed (assets/fonts).
let assets: Promise<{ logo: string; regular: Buffer; bold: Buffer }> | undefined;
function getAssets() {
  const file = (path: string) => readFile(join(process.cwd(), path));
  assets ??= Promise.all([
    file("public/logo-white.png"),
    file("assets/fonts/Geist-Regular.ttf"),
    file("assets/fonts/Geist-Bold.ttf"),
  ]).then(([logo, regular, bold]) => ({
    logo: `data:image/png;base64,${logo.toString("base64")}`,
    regular,
    bold,
  }));
  return assets;
}

export async function renderOgImage({ eyebrow, title, subtitle }: OgOptions) {
  const { logo, regular, bold } = await getAssets();
  const titleSize = title.length > 60 ? 56 : title.length > 36 ? 64 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(16,185,129,0.28), transparent 45%), radial-gradient(circle at 88% 85%, rgba(59,130,246,0.22), transparent 45%)",
          color: "#fafafa",
          fontFamily: "Geist",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={63} height={52} alt="" />
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>{SITE_NAME}</div>
        </div>

        {/* Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#6EE7B7",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: titleSize,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div style={{ display: "flex", fontSize: 28, lineHeight: 1.4, color: "#a1a1aa", maxWidth: 960 }}>
              {subtitle}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: "#71717a" }}>
          <div style={{ display: "flex" }}>Go · Python · Flutter · React Native · PostgreSQL</div>
          <div style={{ display: "flex", color: "#a1a1aa" }}>{SITE_HOST}</div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
