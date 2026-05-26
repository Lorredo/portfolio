// components/projects/LikeButton.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  slug: string;
};

export default function LikeButton({ slug }: Props) {
  const [liked, setLiked]   = useState(false);
  const [count, setCount]   = useState(0);
  const [loading, setLoading] = useState(true);
  const [popping, setPopping] = useState(false);

  // Fetch initial like state on mount
  useEffect(() => {
    fetch(`/api/projects/${slug}/like`)
      .then((r) => r.json())
      .then((d) => {
        setLiked(d.liked);
        setCount(d.count);
      })
      .catch(() => null)
      .finally(() => setLoading(false));
  }, [slug]);

  const handleLike = async () => {
    if (loading) return;

    // Optimistic update
    const wasLiked = liked;
    setLiked(!wasLiked);
    setCount((c) => (wasLiked ? c - 1 : c + 1));
    setPopping(true);
    setTimeout(() => setPopping(false), 600);

    try {
      const res = await fetch(`/api/projects/${slug}/like`, { method: "POST" });
      const data = await res.json();
      // Sync with server state
      setLiked(data.liked);
      setCount(data.count);
    } catch {
      // Revert on error
      setLiked(wasLiked);
      setCount((c) => (wasLiked ? c + 1 : c - 1));
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      aria-label={liked ? "Unlike project" : "Like project"}
      className={`group relative inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200 disabled:opacity-50 ${
        liked
          ? "border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/15"
          : "border-white/10 bg-white/5 text-white/45 hover:border-white/22 hover:bg-white/8 hover:text-white/80"
      }`}
    >
      {/* Heart icon */}
      <motion.span
        animate={popping ? { scale: [1, 1.4, 0.9, 1.1, 1] } : { scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill={liked ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7.5 13.5S1.5 9.5 1.5 5.5a3 3 0 0 1 6-0 3 3 0 0 1 6 0c0 4-6 8-6 8Z"/>
        </svg>

        {/* Burst particles on like */}
        <AnimatePresence>
          {popping && liked && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-red-400"
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos((i * 60 * Math.PI) / 180) * 14,
                    y: Math.sin((i * 60 * Math.PI) / 180) * 14,
                    opacity: 0,
                    scale: 0,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.span>

      {/* Count */}
      <span className="font-mono text-xs">
        {loading ? "—" : count}
      </span>
    </button>
  );
}