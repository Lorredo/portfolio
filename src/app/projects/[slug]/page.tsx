import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "../../../../content/projects";
import ProjectDetail from "@/components/projects/ProjectDetail";
import { incrementPageView, getPageViews } from "@/lib/analytics";

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
    openGraph: {
      title: project.title,
      description: project.summary,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.summary,
    },
  };
}

// Page
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;  

  const project = getProjectBySlug(slug);

  if (!project) notFound();

  await incrementPageView(`/projects/${slug}`);
  const views = await getPageViews(`/projects/${slug}`);

  return <ProjectDetail project={project} views={views} />;
}