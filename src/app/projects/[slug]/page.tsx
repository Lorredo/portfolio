import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "../../../../content/projects";
import ProjectDetail from "@/components/projects/ProjectDetail";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// Static params
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// SEO metadata
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const project = getProjectBySlug(slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
  };
}

// Page
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;  

  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return <ProjectDetail project={project} />;
}