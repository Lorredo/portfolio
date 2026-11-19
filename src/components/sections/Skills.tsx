// components/sections/Skills.tsx
"use client";

import { motion } from "framer-motion";
import { skillGroups, tools, type SkillGroup } from "../../../content/skills";

// ─── Color maps ───────────────────────────────────────────────────

const BORDER_COLOR: Record<SkillGroup["color"], string> = {
  emerald: "border-emerald-500/20",
  blue:    "border-blue-500/20",
  purple:  "border-purple-500/20",
  amber:   "border-amber-500/20",
  rose:    "border-rose-500/20",
  sky:     "border-sky-500/20",
};

const TEXT_COLOR: Record<SkillGroup["color"], string> = {
  emerald: "text-emerald-400",
  blue:    "text-blue-400",
  purple:  "text-purple-400",
  amber:   "text-amber-400",
  rose:    "text-rose-400",
  sky:     "text-sky-400",
};

const BG_COLOR: Record<SkillGroup["color"], string> = {
  emerald: "bg-emerald-500/8",
  blue:    "bg-blue-500/8",
  purple:  "bg-purple-500/8",
  amber:   "bg-amber-500/8",
  rose:    "bg-rose-500/8",
  sky:     "bg-sky-500/8",
};

// ─── Skill Card ───────────────────────────────────────────────────

function SkillCard({
  group,
  index,
}: {
  group: SkillGroup;
  index: number;
}) {
  return (
    <motion.div
      className={`rounded-2xl border ${BORDER_COLOR[group.color]} ${BG_COLOR[group.color]} p-6`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className={`mb-5 font-mono text-xs font-semibold uppercase tracking-widest ${TEXT_COLOR[group.color]}`}>
        {group.category}
      </p>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className={`rounded-lg border border-foreground/10 bg-foreground/5 px-3 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:border-foreground/25 hover:bg-foreground/10 hover:text-foreground`}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────

export default function Skills() {
  return (
    <section className="bg-background px-6 py-24 text-foreground">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground/30">
            Expertise
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Skills</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/40">
            The technologies I use in production: backend services in Go and Python, mobile apps in
            Flutter and React Native, and the databases and pipelines behind them.
          </p>
        </motion.div>

        {/* Skill cards grid */}
        <div className="mb-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.category} group={group} index={i} />
          ))}
        </div>

        {/* Tools row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-foreground/30">
            Tools I use
          </p>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span
                key={tool}
                className="rounded-xl border border-foreground/8 bg-foreground/4 px-3 py-1.5 text-sm text-foreground/45 transition-colors hover:border-foreground/18 hover:text-foreground/75"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}