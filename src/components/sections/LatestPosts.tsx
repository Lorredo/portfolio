'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

type Post = {
  slug: string;
  title?: string;
  date?: string;
  readingTime?: string;
  tags?: string[];
  frontmatter?: {
    title?: string;
    publishedAt?: string;
    tags?: string[];
  };
};

export default function LatestPosts({ posts }: { posts: Post[] }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  const recentPosts = posts.slice(0, 3);

  return (
    <section className="bg-background px-6 py-24 text-foreground">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/30 mb-4">Writing</div>
            <h2 className="text-3xl font-bold text-foreground">Latest Posts</h2>
          </div>
          <Link href="/blog" className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
            View all posts &rarr;
          </Link>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col gap-2"
        >
          {recentPosts.map((post) => {
            const date = new Date(post.frontmatter?.publishedAt || post.date || new Date().toISOString()).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric'
            });
            const tags = post.frontmatter?.tags ?? post.tags;

            return (
              <motion.div variants={item} key={post.slug}>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-2 rounded-xl p-4 transition-colors hover:bg-foreground/[0.03] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="font-medium text-foreground transition-colors group-hover:text-emerald-400">
                      {post.frontmatter?.title || post.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-3 text-sm text-foreground/40">
                      <span>{date}</span>
                      {post.readingTime && (
                        <>
                          <span>&middot;</span>
                          <span>{post.readingTime}</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {tags && tags.length > 0 && (
                    <div className="flex gap-2 sm:self-center">
                      {tags.slice(0, 2).map((tag: string) => (
                        <span key={tag} className="text-xs text-foreground/30">#{tag}</span>
                      ))}
                    </div>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
