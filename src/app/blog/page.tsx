// app/blog/page.tsx
// Blog listing page — server component, fully static.

import { getAllPosts, getAllBlogTags } from "@/lib/mdx";
import { getManyBlogViews } from "@/lib/analytics"; // ← swap this
import BlogList from "@/components/blog/BlogList";


export const metadata = {
  title: "Blog",
  description: "Thoughts on full stack development, tooling, and building things on the web.",
};
// src/app/blog/page.tsx
export default async function BlogPage() {
  const posts = getAllPosts();
  const tags  = getAllBlogTags();

  let viewCounts: Record<string, number> = {};
  try {
    const slugs  = posts.map((p) => p.slug);
    viewCounts   = await getManyBlogViews(slugs); // ← and this
  } catch (err) {
    console.error("[blog] Failed to fetch view counts:", err);
  }

  return <BlogList posts={posts} tags={tags} viewCounts={viewCounts} />;
}

