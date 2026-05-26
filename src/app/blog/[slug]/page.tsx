// src/app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/mdx";
import { incrementBlogView, getBlogViews } from "@/lib/analytics";
import PostContent from "@/components/blog/PostContent";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.summary,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
      type: "article",
      publishedTime: post.frontmatter.publishedAt,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  await incrementBlogView(slug);
  const views = await getBlogViews(slug);

  return <PostContent post={post} views={views} />;
}