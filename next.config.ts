

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  turbopack: {
    root: process.cwd(),
  },
  // Social preview images read these from disk (src/lib/og.tsx).
  outputFileTracingIncludes: {
    "/**/opengraph-image": ["./assets/fonts/*.ttf", "./public/logo-white.png"],
  },
  experimental: {
    // Animate route changes with React <ViewTransition> (see app/template.tsx)
    viewTransition: true,
  },
};

export default nextConfig;