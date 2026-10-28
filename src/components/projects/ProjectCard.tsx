"use client";

import { motion } from "framer-motion";
import { type Project } from "../../../content/projects";
import LikeButton from "./LikeButton";

function StatusBadge({ status }: { status: Project["status"] }) {
  const map = {
    completed: {
      label: "Completed",
      classes:
        "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    "in-progress": {
      label: "In Progress",
      classes:
        "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    archived: {
      label: "Archived",
      classes: "bg-foreground/5 text-foreground/30 border-foreground/10",
    },
  };

  const { label, classes } = map[status];

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${classes}`}
    >
      {label}
    </span>
  );
}

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-foreground/8 bg-foreground/[0.03]"
    >
      {/* Your ProjectCard content here */}
      <div className="p-6">
        <StatusBadge status={project.status} />

        <h3 className="mt-4 text-lg font-semibold text-foreground">
          {project.title}
        </h3>
        <LikeButton slug={project.slug} />
        <p className="mt-2 text-sm text-foreground/45">
          {project.summary}
        </p>
      </div>
    </motion.article>
  );
}