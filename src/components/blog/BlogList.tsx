// components/blog/BlogList.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Post } from "@/lib/mdx";
import BlogCard from "./BlogCard";

type Props = {
  posts: Post[];
  tags: string[];
  viewCounts: Record<string, number>;
};

export default function BlogList({ posts, tags, viewCounts }: Props) {
  const [activeTag, setActiveTag] = useState("All");

  const filtered =
    activeTag === "All"
      ? posts
      : posts.filter((p) => p.frontmatter.tags.includes(activeTag));

  return (
    <section className="min-h-screen bg-[#080808] px-6 py-24 text-white">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-white/30">
            Writing
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Blogg</h1>
          <p className="mt-4 text-base leading-relaxed text-white/40">
            Thoughts on full stack development, tooling, and building things on the web.
          </p>
        </motion.div>

        {/* Tag filters */}
        <motion.div
          className="mb-10 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          {["All", ...tags].map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                activeTag === tag
                  ? "bg-white text-black"
                  : "border border-white/10 bg-white/4 text-white/50 hover:border-white/20 hover:text-white/80"
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Post list */}
        <div className="flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map((post, i) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  index={i}
     views={viewCounts[post.slug] ?? 0}
                />
              ))
            ) : (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 text-center text-white/30"
              >
                No posts found for &quot;{activeTag}&quot;
              </motion.p>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}