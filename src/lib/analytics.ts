// lib/analytics.ts
// Server-side helpers for incrementing and reading view counts.
// Call these from Server Components or Route Handlers — never client side.

import { db } from "@/lib/db";

function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL || process.env.DIRECT_URL);
}

// ─── Page Views ───────────────────────────────────────────────────

/**
 * Increment the view count for a page slug.
 * Creates the record if it doesn't exist yet (upsert).
 * Safe to call on every page render.
 */
export async function incrementPageView(slug: string): Promise<void> {
  if (!isDbConfigured()) return;
  try {
    await db.pageView.upsert({
      where: { slug },
      update: { count: { increment: 1 } },
      create: { slug, count: 1 },
    });
  } catch {
    // Ignore analytics errors during static prerendering or transient DB issues
  }
}

/**
 * Get the current view count for a slug.
 * Returns 0 if the page has never been viewed.
 */
export async function getPageViews(slug: string): Promise<number> {
  if (!isDbConfigured()) return 0;
  try {
    const record = await db.pageView.findUnique({ where: { slug } });
    return record?.count ?? 0;
  } catch {
    return 0;
  }
}

/**
 * Get view counts for multiple slugs at once.
 * Returns a map of slug → count.
 */
export async function getManyPageViews(
  slugs: string[]
): Promise<Record<string, number>> {
  const map: Record<string, number> = {};
  for (const s of slugs) map[s] = 0;
  if (!isDbConfigured()) return map;
  try {
    const records = await db.pageView.findMany({
      where: { slug: { in: slugs } },
    });
    for (const r of records) map[r.slug] = r.count;
  } catch {
    // Return zeroed map on error
  }
  return map;
}

/**
 * Get total views across all pages (for footer display).
 */
export async function getTotalPageViews(): Promise<number> {
  if (!isDbConfigured()) return 0;
  try {
    const result = await db.pageView.aggregate({ _sum: { count: true } });
    return result._sum.count ?? 0;
  } catch {
    return 0;
  }
}

// ─── Blog Post Views ──────────────────────────────────────────────

export async function incrementBlogView(slug: string): Promise<void> {
  if (!isDbConfigured()) return;
  try {
    await db.blogPostView.upsert({
      where: { slug },
      update: { count: { increment: 1 } },
      create: { slug, count: 1 },
    });
  } catch {
    // Ignore analytics errors during static prerendering or transient DB issues
  }
}

export async function getBlogViews(slug: string): Promise<number> {
  if (!isDbConfigured()) return 0;
  try {
    const record = await db.blogPostView.findUnique({ where: { slug } });
    return record?.count ?? 0;
  } catch {
    return 0;
  }
}


export async function getManyBlogViews(
  slugs: string[]
): Promise<Record<string, number>> {
  const map: Record<string, number> = {};
  for (const s of slugs) map[s] = 0;
  if (!isDbConfigured()) return map;
  try {
    const records = await db.blogPostView.findMany({
      where: { slug: { in: slugs } },
    });
    for (const r of records) map[r.slug] = r.count;
  } catch {
    // Return zeroed map on error
  }
  return map;
}

/**
 * Get top N most-viewed blog posts.
 * Useful for a "Popular posts" sidebar.
 */
export async function getTopBlogPosts(limit = 5) {
  if (!isDbConfigured()) return [];
  try {
    return await db.blogPostView.findMany({
      orderBy: { count: "desc" },
      take: limit,
    });
  } catch {
    return [];
  }
}

// ─── Project Likes ────────────────────────────────────────────────

export async function getProjectLikes(projectSlug: string): Promise<number> {
  if (!isDbConfigured()) return 0;
  try {
    return await db.projectLike.count({ where: { projectSlug } });
  } catch {
    return 0;
  }
}

export async function hasLikedProject(
  projectSlug: string,
  sessionId: string
): Promise<boolean> {
  if (!isDbConfigured()) return false;
  try {
    const like = await db.projectLike.findUnique({
      where: { projectSlug_sessionId: { projectSlug, sessionId } },
    });
    return !!like;
  } catch {
    return false;
  }
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
