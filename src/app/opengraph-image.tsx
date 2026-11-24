import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";
import { SITE_TITLE } from "@/lib/site";

export const alt = SITE_TITLE;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Full Stack Developer",
    title: "Backend services, REST APIs, web and mobile apps.",
    subtitle: "Developer at Bakawan Data Analytics · Building FinTrack",
  });
}
