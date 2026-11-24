// Public URL of the site, used for metadata, the sitemap, share links and
// social preview images. Set NEXT_PUBLIC_SITE_URL to override (e.g. a custom
// domain); no trailing slash.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://artemlorredo-portfolio.vercel.app"
).replace(/\/$/, "");

// Shown on social preview images.
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");

export const SITE_NAME = "Artem Lorredo";
export const SITE_TITLE = "Artem Lorredo — Full Stack Developer";
export const SITE_DESCRIPTION =
  "Full stack developer building backend services in Go and Python and mobile apps in Flutter and React Native.";
