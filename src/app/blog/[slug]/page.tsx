// src/app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug, getAllPosts } from "@/lib/mdx";
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
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  await incrementBlogView(slug);
  const views = await getBlogViews(slug);

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter(p => p.slug !== slug && p.frontmatter.tags.some(t => post.frontmatter.tags.includes(t)))
    .slice(0, 3);

  return <PostContent post={post} views={views} relatedPosts={relatedPosts} />;
}