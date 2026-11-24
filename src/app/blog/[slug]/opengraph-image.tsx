import { getPostBySlug } from "@/lib/mdx";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Blog post by Artem Lorredo";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return renderOgImage({
    eyebrow: post ? `Blog · ${post.readingTime}` : "Blog",
    title: post?.frontmatter.title ?? "Blog",
  });
}
