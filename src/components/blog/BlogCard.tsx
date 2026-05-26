// components/blog/BlogCard.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Post } from "@/lib/mdx";

type Props = {
  post: Post;
  index: number;
  views: number;
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatViews(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

export default function BlogCard({ post, index, views }: Props) {
  const { frontmatter, slug, readingTime } = post;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/blog/${slug}`} className="group block">
        <article className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-all duration-300 hover:border-white/16 hover:bg-white/[0.06]">

          {/* Top row — featured badge + tags */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {frontmatter.featured && (
              <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-0.5 text-[11px] font-medium text-purple-400">
                ★ Featured
              </span>
            )}
            {frontmatter.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/8 bg-white/4 px-2.5 py-0.5 text-[11px] font-medium text-white/40"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2 className="mb-2 text-lg font-bold leading-snug text-white transition-colors group-hover:text-emerald-300">
            {frontmatter.title}
          </h2>

          {/* Summary */}
          <p className="mb-4 text-sm leading-relaxed text-white/45">
            {frontmatter.summary}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-white/28">
            <span>{formatDate(frontmatter.publishedAt)}</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>{readingTime}</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M6 2C3.5 2 1.5 4 1.5 6s2 4 4.5 4 4.5-2 4.5-4-2-4-4.5-4Z"
                  stroke="currentColor"
                  strokeWidth="1.1"
                />
                <circle cx="6" cy="6" r="1.5" fill="currentColor" />
              </svg>
              {formatViews(views)} views
            </span>
            <span className="ml-auto text-white/35 transition-colors group-hover:text-emerald-400">
              Read →
            </span>
          </div>

        </article>
      </Link>
    </motion.div>
  );
}