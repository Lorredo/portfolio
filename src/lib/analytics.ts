// lib/analytics.ts
// Server-side helpers for incrementing and reading view counts.
// Call these from Server Components or Route Handlers — never client side.

import { db } from "@/lib/db";

// ─── Page Views ───────────────────────────────────────────────────

/**
 * Increment the view count for a page slug.
 * Creates the record if it doesn't exist yet (upsert).
 * Safe to call on every page render.
 */
export async function incrementPageView(slug: string): Promise<void> {
  await db.pageView.upsert({
    where: { slug },
    update: { count: { increment: 1 } },
    create: { slug, count: 1 },
  });
}

/**
 * Get the current view count for a slug.
 * Returns 0 if the page has never been viewed.
 */
export async function getPageViews(slug: string): Promise<number> {
  const record = await db.pageView.findUnique({ where: { slug } });
  return record?.count ?? 0;
}

/**
 * Get view counts for multiple slugs at once.
 * Returns a map of slug → count.
 */
export async function getManyPageViews(
  slugs: string[]
): Promise<Record<string, number>> {
  const records = await db.pageView.findMany({
    where: { slug: { in: slugs } },
  });
  const map: Record<string, number> = {};
  for (const r of records) map[r.slug] = r.count;
  for (const s of slugs) if (!(s in map)) map[s] = 0;
  return map;
}

/**
 * Get total views across all pages (for footer display).
 */
export async function getTotalPageViews(): Promise<number> {
  const result = await db.pageView.aggregate({ _sum: { count: true } });
  return result._sum.count ?? 0;
}

// ─── Blog Post Views ──────────────────────────────────────────────

export async function incrementBlogView(slug: string): Promise<void> {
  await db.blogPostView.upsert({
    where: { slug },
    update: { count: { increment: 1 } },
    create: { slug, count: 1 },
  });
}

export async function getBlogViews(slug: string): Promise<number> {
  const record = await db.blogPostView.findUnique({ where: { slug } });
  return record?.count ?? 0;
}


// lib/analytics.ts — add this function
export async function getManyBlogViews(
  slugs: string[]
): Promise<Record<string, number>> {
  const records = await db.blogPostView.findMany({
    where: { slug: { in: slugs } },
  });
  const map: Record<string, number> = {};
  for (const r of records) map[r.slug] = r.count;
  for (const s of slugs) if (!(s in map)) map[s] = 0;
  return map;
}

/**
 * Get top N most-viewed blog posts.
 * Useful for a "Popular posts" sidebar.
 */
export async function getTopBlogPosts(limit = 5) {
  return db.blogPostView.findMany({
    orderBy: { count: "desc" },
    take: limit,
  });
}

// ─── Project Likes ────────────────────────────────────────────────

export async function getProjectLikes(projectSlug: string): Promise<number> {
  return db.projectLike.count({ where: { projectSlug } });
}

export async function hasLikedProject(
  projectSlug: string,
  sessionId: string
): Promise<boolean> {
  const like = await db.projectLike.findUnique({
    where: { projectSlug_sessionId: { projectSlug, sessionId } },
  });
  return !!like;
}

export async function toggleProjectLike(
  projectSlug: string,
  sessionId: string
): Promise<{ liked: boolean; count: number }> {
  const existing = await db.projectLike.findUnique({
    where: { projectSlug_sessionId: { projectSlug, sessionId } },
  });

  if (existing) {
    await db.projectLike.delete({
      where: { projectSlug_sessionId: { projectSlug, sessionId } },
    });
  } else {
    await db.projectLike.create({ data: { projectSlug, sessionId } });
  }

  const count = await db.projectLike.count({ where: { projectSlug } });
  return { liked: !existing, count };
}

