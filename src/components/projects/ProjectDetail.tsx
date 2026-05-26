// components/projects/ProjectDetail.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { projects, type Project } from "../../../content/projects"; // Make sure this path is correct
import ProjectCard from "./ProjectCard";
import LikeButton from "./LikeButton";

// ─── Sub-components ───────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-white/30">
      {children}
    </p>
  );
}

function TechBadge({ name }: { name: string }) {
  return (
    <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-white/55 transition-colors hover:border-white/22 hover:text-white/85">
      {name}
    </span>
  );
}

function StatusDot({ status }: { status: Project["status"] }) {
  const map = {
    completed:     { color: "bg-emerald-500", label: "Completed"   },
    "in-progress": { color: "bg-amber-500",   label: "In Progress" },
    archived:      { color: "bg-white/30",    label: "Archived"    },
  };
  const { color, label } = map[status];
  return (
    <span className="flex items-center gap-2 text-sm text-white/45">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      {label}
    </span>
  );
}

// ─── FadeIn wrapper ───────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────

export default function ProjectDetail({ project }: { project: Project }) {
  // Related projects — same tag, excluding current
  const related = projects
    .filter(
      (p) =>
        p.slug !== project.slug &&
        p.tags.some((t) => project.tags.includes(t))
    )
    .slice(0, 3);

  return (
    <article className="min-h-screen bg-[#080808] px-6 py-24 text-white">
      <div className="mx-auto max-w-4xl">

        {/* Back link */}
        <FadeIn>
          <Link
            href="/projects"
            className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/30 transition-colors hover:text-white/70"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11 7H3M6 4L3 7l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            All projects
          </Link>
        </FadeIn>

        {/* Header */}
        <FadeIn delay={0.05}>
          <div className="mb-10">
            {/* Badges row */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <StatusDot status={project.status} />
              {project.featured && (
                <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-0.5 text-xs font-medium text-purple-400">
                  ★ Featured
                </span>
              )}
              <span className="font-mono text-xs text-white/25">{project.year}</span>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
              {project.title}
            </h1>

            {/* Summary */}
            <p className="mb-6 max-w-2xl text-lg leading-relaxed text-white/50">
              {project.summary}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/8 bg-white/4 px-2.5 py-1 text-xs font-medium text-white/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Cover image placeholder */}
        <FadeIn delay={0.1}>
          <div className="mb-12 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03]">
            {/* Replace with <Image> when you have real cover images */}
            <div className="flex h-64 items-center justify-center md:h-80">
              <div className="flex flex-col items-center gap-3 text-white/15">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect x="4" y="8" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="14" cy="17" r="3" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M4 28l9-7 6 5 5-4 12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-mono text-xs">Cover image coming soon</span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Main content grid */}
        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">

          {/* Left — description + highlights */}
          <FadeIn delay={0.15}>
            <div className="flex flex-col gap-8">

              {/* Description */}
              <div>
                <SectionLabel>Overview</SectionLabel>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6">
                  <p className="whitespace-pre-line text-sm leading-[1.85] text-white/55">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Tech stack */}
              <div>
                <SectionLabel>Tech stack</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <TechBadge key={tech} name={tech} />
                  ))}
                </div>
              </div>

            </div>
          </FadeIn>

          {/* Right sidebar — links + meta */}
          <FadeIn delay={0.2}>
            <div className="flex flex-col gap-4">

              {/* Links */}
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                <SectionLabel>Links</SectionLabel>
                <div className="flex flex-col gap-2">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-all hover:border-white/22 hover:bg-white/8"
                    >
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path d="M5 2H2.5A1.5 1.5 0 0 0 1 3.5v9A1.5 1.5 0 0 0 2.5 14h9A1.5 1.5 0 0 0 13 12.5V10M8 1h6m0 0v6m0-6L7 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Live site
                      <span className="ml-auto text-white/25">↗</span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 rounded-xl border border-white/6 px-4 py-3 text-sm text-white/25">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path d="M5 2H2.5A1.5 1.5 0 0 0 1 3.5v9A1.5 1.5 0 0 0 2.5 14h9A1.5 1.5 0 0 0 13 12.5V10M8 1h6m0 0v6m0-6L7 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      No live demo
                    </div>
                  )}

                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-all hover:border-white/22 hover:bg-white/8"
                    >
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
                        <path d="M7.5 1a6.5 6.5 0 0 0-2.055 12.668c.325.06.444-.141.444-.313v-1.094c-1.806.393-2.187-.872-2.187-.872-.295-.75-.72-.95-.72-.95-.589-.402.044-.394.044-.394.65.046.993.668.993.668.578.99 1.517.704 1.887.538.059-.418.226-.704.411-.866-1.442-.164-2.957-.721-2.957-3.21 0-.709.253-1.288.668-1.742-.067-.165-.29-.824.063-1.717 0 0 .545-.174 1.785.665A6.218 6.218 0 0 1 7.5 5.045c.552.003 1.108.075 1.626.219 1.239-.839 1.784-.665 1.784-.665.354.893.131 1.552.064 1.717.416.454.667 1.033.667 1.742 0 2.496-1.518 3.044-2.963 3.205.233.201.44.597.44 1.204v1.785c0 .173.118.376.447.312A6.501 6.501 0 0 0 7.5 1Z"/>
                      </svg>
                      GitHub repo
                      <span className="ml-auto text-white/25">↗</span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 rounded-xl border border-white/6 px-4 py-3 text-sm text-white/25">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
                        <path d="M7.5 1a6.5 6.5 0 0 0-2.055 12.668c.325.06.444-.141.444-.313v-1.094c-1.806.393-2.187-.872-2.187-.872-.295-.75-.72-.95-.72-.95-.589-.402.044-.394.044-.394.65.046.993.668.993.668.578.99 1.517.704 1.887.538.059-.418.226-.704.411-.866-1.442-.164-2.957-.721-2.957-3.21 0-.709.253-1.288.668-1.742-.067-.165-.29-.824.063-1.717 0 0 .545-.174 1.785.665A6.218 6.218 0 0 1 7.5 5.045c.552.003 1.108.075 1.626.219 1.239-.839 1.784-.665 1.784-.665.354.893.131 1.552.064 1.717.416.454.667 1.033.667 1.742 0 2.496-1.518 3.044-2.963 3.205.233.201.44.597.44 1.204v1.785c0 .173.118.376.447.312A6.501 6.501 0 0 0 7.5 1Z"/>
                      </svg>
                      Private repo
                    </div>
                  )}
                </div>
              </div>
              

<div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
  <SectionLabel>Enjoyed this project?</SectionLabel>
  <LikeButton slug={project.slug} />
</div>

              {/* Meta info */}
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                <SectionLabel>Details</SectionLabel>
                <dl className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <dt className="text-xs text-white/30">Year</dt>
                    <dd className="font-mono text-xs text-white/60">{project.year}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-xs text-white/30">Status</dt>
                    <dd><StatusDot status={project.status} /></dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-xs text-white/30">Type</dt>
                    <dd className="font-mono text-xs text-white/60">
                      {project.tags[0]}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-xs text-white/30">Stack</dt>
                    <dd className="text-right font-mono text-xs text-white/60">
                      {project.techStack.slice(0, 3).join(", ")}
                      {project.techStack.length > 3 && ` +${project.techStack.length - 3}`}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
              >
                Hire me for something similar
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M7.5 3.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>

            </div>
          </FadeIn>
        </div>

        {/* Related projects */}
        {related.length > 0 && (
          <FadeIn delay={0.25} className="mt-20">
            <SectionLabel>Related projects</SectionLabel>
            <h2 className="mb-8 text-2xl font-bold">More work</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </FadeIn>
        )}

      </div>
    </article>
  );
}