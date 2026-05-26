// lib/mdx.ts
// Core MDX utilities — reading posts from the filesystem,
// parsing frontmatter, computing reading time, and rendering MDX.

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

// ─── Types ────────────────────────────────────────────────────────

export type PostFrontmatter = {
  title: string;
  summary: string;
  publishedAt: string;       // ISO date string e.g. "2025-03-15"
  updatedAt?: string;
  tags: string[];
  cover?: string;            // path under /public/blog/
  featured?: boolean;
  draft?: boolean;           // if true, hidden in production
};

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  readingTime: string;       // e.g. "5 min read"
  wordCount: number;
};

export type PostWithContent = Post & {
  content: string;           // raw MDX string for rendering
};

// ─── Constants ───────────────────────────────────────────────────

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

// ─── Helpers ─────────────────────────────────────────────────────

function slugFromFilename(filename: string): string {
  return filename.replace(/\.mdx?$/, "");
}

function isPublished(frontmatter: PostFrontmatter): boolean {
  if (process.env.NODE_ENV === "development") return true; // show drafts in dev
  return !frontmatter.draft;
}

// ─── Core functions ───────────────────────────────────────────────

/**
 * Get all post slugs (used for generateStaticParams).
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map(slugFromFilename);
}

/**
 * Get post frontmatter + metadata by slug.
 * Returns null if the post doesn't exist or is a draft in production.
 */
export function getPostBySlug(slug: string): PostWithContent | null {
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const mdPath  = path.join(POSTS_DIR, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;

  if (!isPublished(frontmatter)) return null;

  const rt = readingTime(content);

  return {
    slug,
    frontmatter,
    content,
    readingTime: rt.text,
    wordCount: rt.words,
  };
}

/**
 * Get all published posts, sorted newest first.
 */
export function getAllPosts(): Post[] {
  const slugs = getAllPostSlugs();

  return slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is PostWithContent => post !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime()
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ content: _, ...post }) => post); // strip content for listing pages
}

/**
 * Get posts filtered by tag.
 */
export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.frontmatter.tags.includes(tag));
}

/**
 * Get all unique tags across all posts.
 */
export function getAllBlogTags(): string[] {
  const tags = getAllPosts().flatMap((p) => p.frontmatter.tags);
  return [...new Set(tags)].sort();
}

/**
 * Get featured posts (for homepage).
 */
export function getFeaturedPosts(limit = 3): Post[] {
  return getAllPosts()
    .filter((p) => p.frontmatter.featured)
    .slice(0, limit);
}