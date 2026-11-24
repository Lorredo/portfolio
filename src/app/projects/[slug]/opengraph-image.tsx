import { getProjectBySlug } from "../../../../content/projects";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Project by Artem Lorredo";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return renderOgImage({
    eyebrow: project?.kind === "capstone" ? "Capstone project" : project?.kind === "academic" ? "Academic project" : "Project",
    title: project?.title ?? "Projects",
    subtitle: project ? project.techStack.slice(0, 5).join(" · ") : undefined,
  });
}
