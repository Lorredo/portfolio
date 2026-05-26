// components/blog/PostContent.tsx
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import type { PostWithContent } from "@/lib/mdx";
import type { PluggableList } from "unified";

// ─── MDX custom components ────────────────────────────────────────

const mdxComponents = {
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      {...props}
      className="overflow-x-auto rounded-xl border border-white/8 bg-white/[0.04] p-5 text-sm leading-relaxed"
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      {...props}
      className="rounded-md border border-white/10 bg-white/8 px-1.5 py-0.5 font-mono text-[0.85em] text-emerald-300"
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} className="mt-10 mb-4 text-2xl font-bold text-white scroll-mt-24" />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} className="mt-8 mb-3 text-xl font-semibold text-white scroll-mt-24" />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="mb-5 leading-[1.85] text-white/65" />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="mb-5 ml-6 list-disc space-y-2 text-white/65" />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className="mb-5 ml-6 list-decimal space-y-2 text-white/65" />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li {...props} className="leading-relaxed" />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="my-6 border-l-2 border-emerald-500/50 pl-5 italic text-white/50"
    />
  ),
  a: ({ href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      href={href}
      {...props}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-emerald-400 underline underline-offset-4 transition-colors hover:text-emerald-300"
    />
  ),
  hr: () => <hr className="my-8 border-white/8" />,
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={props.alt ?? ""}
      className="my-6 w-full rounded-xl border border-white/8"
    />
  ),
};

// ─── rehype / remark options ──────────────────────────────────────
// Explicitly typed as PluggableList to satisfy TypeScript

const remarkPlugins: PluggableList = [remarkGfm];

const rehypePlugins: PluggableList = [
  rehypeSlug,
  [
    rehypeAutolinkHeadings,
    { behavior: "wrap", properties: { className: ["anchor"] } },
  ],
  [
    rehypePrettyCode,
    {
      theme: "github-dark-dimmed",
      keepBackground: false,
      onVisitLine(node: { children: { type: string }[] }) {
        if (node.children.length === 0) {
          node.children = [{ type: "text" }];
        }
      },
    },
  ],
];

// ─── Helpers ──────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatViews(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

// ─── Main Component ───────────────────────────────────────────────

type Props = {
  post: PostWithContent;
  views: number;
};

export default function PostContent({ post, views }: Props) {
  const { frontmatter, content, readingTime, wordCount } = post;

  return (
    <article className="min-h-screen bg-[#080808] px-6 py-24 text-white">
      <div className="mx-auto max-w-2xl">

        {/* Back link */}
        <Link
          href="/blog"
          className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/30 transition-colors hover:text-white/70"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M11 7H3M6 4L3 7l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to blog
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="mb-4 flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/8 bg-white/4 px-2.5 py-0.5 text-xs font-medium text-white/40"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">
            {frontmatter.title}
          </h1>

          <p className="mb-6 text-lg leading-relaxed text-white/45">
            {frontmatter.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4 border-b border-white/8 pb-8 font-mono text-xs text-white/30">
            <span>{formatDate(frontmatter.publishedAt)}</span>
            <span className="h-1 w-1 rounded-full bg-white/15" />
            <span>{readingTime}</span>
            <span className="h-1 w-1 rounded-full bg-white/15" />
            <span>{wordCount.toLocaleString()} words</span>
            <span className="h-1 w-1 rounded-full bg-white/15" />
            <span className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 2C3.5 2 1.5 4 1.5 6s2 4 4.5 4 4.5-2 4.5-4-2-4-4.5-4Z" stroke="currentColor" strokeWidth="1.1"/>
                <circle cx="6" cy="6" r="1.5" fill="currentColor"/>
              </svg>
              {formatViews(views)} views
            </span>
            {frontmatter.updatedAt && (
              <>
                <span className="h-1 w-1 rounded-full bg-white/15" />
                <span>Updated {formatDate(frontmatter.updatedAt)}</span>
              </>
            )}
          </div>
        </header>

        {/* MDX content */}
        <div className="prose-custom">
          <MDXRemote
            source={content}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins, rehypePlugins } }}
          />
        </div>

        {/* Footer */}
        <footer className="mt-16 border-t border-white/8 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/40 transition-colors hover:text-white"
          >
            ← Back to all posts
          </Link>
        </footer>

      </div>
    </article>
  );
}