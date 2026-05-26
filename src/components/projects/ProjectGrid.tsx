"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, allTags, type Project } from "../../../content/projects";

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Project["status"] }) {
  const map = {
    completed:   { label: "Completed",   classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    "in-progress": { label: "In Progress", classes: "bg-amber-500/10  text-amber-400  border-amber-500/20"  },
    archived:    { label: "Archived",    classes: "bg-white/5        text-white/30   border-white/10"       },
  };
  const { label, classes } = map[status];
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${classes}`}>
      {label}
    </span>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] transition-colors duration-300 hover:border-white/16 hover:bg-white/[0.06]"
    >
      {/* Top accent line — animates in on hover */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[1.5px] origin-left bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="flex flex-1 flex-col gap-4 p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={project.status} />
            {project.featured && (
              <span className="inline-flex items-center gap-1 rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-0.5 text-[11px] font-medium text-purple-400">
                ★ Featured
              </span>
            )}
          </div>
          <span className="shrink-0 font-mono text-xs text-white/25">{project.year}</span>
        </div>

        {/* Title + summary */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold leading-snug text-white transition-colors group-hover:text-emerald-300">
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-white/45">{project.summary}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/8 bg-white/4 px-2 py-0.5 text-[11px] font-medium text-white/40"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] text-white/25"
            >
              {tech}{" "}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span className="font-mono text-[11px] text-white/20">
              +{project.techStack.length - 5} more
            </span>
          )}
        </div>
      </div>

      {/* Footer links */}
      <div className="flex items-center gap-1 border-t border-white/6 px-6 py-3">
        <a
          href={`/projects/${project.slug}`}
          className="flex-1 text-sm font-medium text-white/40 transition-colors hover:text-white"
        >
          View details →
        </a>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-lg p-2 text-white/25 transition-colors hover:bg-white/8 hover:text-white/70"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path
                d="M7.5 1a6.5 6.5 0 0 0-2.055 12.668c.325.06.444-.141.444-.313v-1.094c-1.806.393-2.187-.872-2.187-.872-.295-.75-.72-.95-.72-.95-.589-.402.044-.394.044-.394.65.046.993.668.993.668.578.99 1.517.704 1.887.538.059-.418.226-.704.411-.866-1.442-.164-2.957-.721-2.957-3.21 0-.709.253-1.288.668-1.742-.067-.165-.29-.824.063-1.717 0 0 .545-.174 1.785.665A6.218 6.218 0 0 1 7.5 5.045c.552.003 1.108.075 1.626.219 1.239-.839 1.784-.665 1.784-.665.354.893.131 1.552.064 1.717.416.454.667 1.033.667 1.742 0 2.496-1.518 3.044-2.963 3.205.233.201.44.597.44 1.204v1.785c0 .173.118.376.447.312A6.501 6.501 0 0 0 7.5 1Z"
                fill="currentColor"
              />
            </svg>
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Live site"
            className="rounded-lg p-2 text-white/25 transition-colors hover:bg-white/8 hover:text-white/70"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path
                d="M3 7.5h9M8.5 3.5l4 4-4 4M10.5 2.5h2v10h-2"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 2.5h6v10H2z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open live site"
            className="rounded-lg p-2 text-white/25 transition-colors hover:bg-white/8 hover:text-white/70"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path
                d="M5 2H2.5A1.5 1.5 0 0 0 1 3.5v9A1.5 1.5 0 0 0 2.5 14h9A1.5 1.5 0 0 0 13 12.5V10M8 1h6m0 0v6m0-6L7 8"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        )}
      </div>
    </motion.article>
  );
}

// ─── Filter Bar ───────────────────────────────────────────────────────────────

function FilterBar({
  active,
  onChange,
  counts,
}: {
  active: string;
  onChange: (tag: string) => void;
  counts: Record<string, number>;
}) {
  const tags = ["All", ...allTags];

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isActive = active === tag;
        const count = tag === "All" ? projects.length : (counts[tag] ?? 0);
        return (
          <button
            key={tag}
            onClick={() => onChange(tag)}
            className={`relative inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-white text-black"
                : "border border-white/10 bg-white/4 text-white/50 hover:border-white/20 hover:bg-white/8 hover:text-white/80"
            }`}
          >
            {tag}
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] font-mono ${
                isActive ? "bg-black/15 text-black/60" : "bg-white/8 text-white/30"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Project Grid (main export) ───────────────────────────────────────────────

export default function ProjectGrid() {
  const [activeTag, setActiveTag] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filtered =
    activeTag === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeTag));

  const INITIAL_COUNT = 6;
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hasMore = filtered.length > INITIAL_COUNT && !showAll;

  const tagCounts = allTags.reduce<Record<string, number>>((acc, tag) => {
    acc[tag] = projects.filter((p) => p.tags.includes(tag)).length;
    return acc;
  }, {});

  const handleTagChange = (tag: string) => {
    setActiveTag(tag);
    setShowAll(false);
  };

  return (
    <section className="min-h-screen bg-[#080808] px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">

        {/* Section header */}
        <motion.div
          className="mb-12 flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/35">
            Work
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Projects
            </h2>
            <p className="text-sm text-white/35">
              {filtered.length} project{filtered.length !== 1 ? "s" : ""}
              {activeTag !== "All" && ` in ${activeTag}`}
            </p>
          </div>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <FilterBar
            active={activeTag}
            onChange={handleTagChange}
            counts={tagCounts}
          />
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.length > 0 ? (
              visible.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full py-20 text-center text-white/30"
              >
                No projects found for &quot;{activeTag}&quot;
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Show more */}
        {hasMore && (
          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/4 px-6 py-3 text-sm font-medium text-white/50 transition-all hover:border-white/25 hover:bg-white/8 hover:text-white/90"
            >
              Show {filtered.length - INITIAL_COUNT} more projects
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
}