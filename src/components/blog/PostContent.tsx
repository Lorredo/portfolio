// components/blog/PostContent.tsx
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import type { Post, PostWithContent } from "@/lib/mdx";
import type { PluggableList } from "unified";
import CodeBlock from './CodeBlock';
import TableOfContents from './TableOfContents';
import ShareButtons from './ShareButtons';

// ─── MDX custom components ────────────────────────────────────────

const mdxComponents = {
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => <CodeBlock {...props} />,
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      {...props}
      className="rounded-md border border-foreground/10 bg-foreground/8 px-1.5 py-0.5 font-mono text-[0.85em] text-emerald-300"
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} className="mt-10 mb-4 text-2xl font-bold text-foreground scroll-mt-24" />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} className="mt-8 mb-3 text-xl font-semibold text-foreground scroll-mt-24" />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="mb-5 leading-[1.85] text-foreground/65" />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="mb-5 ml-6 list-disc space-y-2 text-foreground/65" />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className="mb-5 ml-6 list-decimal space-y-2 text-foreground/65" />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li {...props} className="leading-relaxed" />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="my-6 border-l-2 border-emerald-500/50 pl-5 italic text-foreground/50"
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
  hr: () => <hr className="my-8 border-foreground/8" />,
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={props.alt ?? ""}
      className="my-6 w-full rounded-xl border border-foreground/8"
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
  relatedPosts?: Post[];
};

export default function PostContent({ post, views, relatedPosts = [] }: Props) {
  const { frontmatter, content, readingTime, wordCount } = post;

  return (
    <article className="min-h-screen bg-background px-6 py-24 text-foreground">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_220px]">
          <div>
            {/* Back link */}
            <Link
              href="/blog"
              className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground/30 transition-colors hover:text-foreground/70"
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
                    className="rounded-md border border-foreground/8 bg-foreground/4 px-2.5 py-0.5 text-xs font-medium text-foreground/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
                {frontmatter.title}
              </h1>

              <p className="mb-6 text-lg leading-relaxed text-foreground/45">
                {frontmatter.summary}
              </p>

              <div className="flex flex-wrap items-center gap-4 border-b border-foreground/8 pb-8 font-mono text-xs text-foreground/30">
                <span>{formatDate(frontmatter.publishedAt)}</span>
                <span className="h-1 w-1 rounded-full bg-foreground/15" />
                <span>{readingTime}</span>
                <span className="h-1 w-1 rounded-full bg-foreground/15" />
                <span>{wordCount.toLocaleString()} words</span>
                <span className="h-1 w-1 rounded-full bg-foreground/15" />
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 2C3.5 2 1.5 4 1.5 6s2 4 4.5 4 4.5-2 4.5-4-2-4-4.5-4Z" stroke="currentColor" strokeWidth="1.1"/>
                    <circle cx="6" cy="6" r="1.5" fill="currentColor"/>
                  </svg>
                  {formatViews(views)} views
                </span>
                {frontmatter.updatedAt && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-foreground/15" />
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
          </div>
          
          <aside className="hidden lg:block">
            <TableOfContents />
          </aside>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-foreground/8 pt-8">
          <ShareButtons title={frontmatter.title} slug={post.slug} />
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-foreground/40 transition-colors hover:text-foreground">
            ← Back to all posts
          </Link>
        </div>

        {relatedPosts.length > 0 && (
          <section className="mt-16 border-t border-foreground/8 pt-12">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground/30">More posts</p>
            <h2 className="mb-6 text-2xl font-bold">Related reading</h2>
            <div className="flex flex-col gap-3">
              {relatedPosts.map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex items-center justify-between rounded-xl border border-foreground/8 bg-foreground/[0.03] px-5 py-4 transition-colors hover:border-foreground/16 hover:bg-foreground/[0.06]">
                  <div>
                    <p className="font-medium text-foreground group-hover:text-emerald-300 transition-colors">{p.frontmatter.title}</p>
                    <p className="text-sm text-foreground/40">{p.readingTime}</p>
                  </div>
                  <span className="text-foreground/30 group-hover:text-foreground/60 transition-colors">→</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}