// components/sections/Skills.tsx
"use client";

import { motion } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────

const SKILL_GROUPS = [
  {
    category: "Frontend",
    color: "emerald",
    skills: [
      { name: "Next.js",       level: 95 },
      { name: "React",         level: 95 },
      { name: "TypeScript",    level: 90 },
      { name: "Tailwind CSS",  level: 92 },
      { name: "Framer Motion", level: 80 },
    ],
  },
  {
    category: "Backend",
    color: "blue",
    skills: [
      { name: "Node.js",    level: 88 },
      { name: "tRPC",       level: 82 },
      { name: "REST APIs",  level: 92 },
      { name: "GraphQL",    level: 75 },
      { name: "WebSockets", level: 78 },
    ],
  },
  {
    category: "Database",
    color: "purple",
    skills: [
      { name: "PostgreSQL", level: 85 },
      { name: "Prisma ORM", level: 90 },
      { name: "Redis",      level: 72 },
      { name: "Supabase",   level: 85 },
      { name: "MySQL",      level: 75 },
    ],
  },
  {
    category: "DevOps",
    color: "amber",
    skills: [
      { name: "Git / GitHub",     level: 92 },
      { name: "Docker",           level: 78 },
      { name: "GitHub Actions",   level: 82 },
      { name: "Vercel",           level: 90 },
      { name: "AWS S3",           level: 70 },
    ],
  },
];

const TOOLS = [
  "VS Code", "Figma", "Postman", "Linear", "Notion",
  "Slack", "iTerm2", "TablePlus", "Insomnia", "Git",
];

// ─── Color maps ───────────────────────────────────────────────────

const BAR_COLOR: Record<string, string> = {
  emerald: "bg-emerald-500",
  blue:    "bg-blue-500",
  purple:  "bg-purple-500",
  amber:   "bg-amber-500",
};

const BORDER_COLOR: Record<string, string> = {
  emerald: "border-emerald-500/20",
  blue:    "border-blue-500/20",
  purple:  "border-purple-500/20",
  amber:   "border-amber-500/20",
};

const TEXT_COLOR: Record<string, string> = {
  emerald: "text-emerald-400",
  blue:    "text-blue-400",
  purple:  "text-purple-400",
  amber:   "text-amber-400",
};

const BG_COLOR: Record<string, string> = {
  emerald: "bg-emerald-500/8",
  blue:    "bg-blue-500/8",
  purple:  "bg-purple-500/8",
  amber:   "bg-amber-500/8",
};

// ─── Skill Bar ────────────────────────────────────────────────────

function SkillBar({
  name,
  level,
  color,
  index,
}: {
  name: string;
  level: number;
  color: string;
  index: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/65">{name}</span>
        <span className="font-mono text-xs text-white/30">{level}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
        <motion.div
          className={`h-full rounded-full ${BAR_COLOR[color]}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{
            delay: index * 0.07,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </div>
    </div>
  );
}

// ─── Skill Card ───────────────────────────────────────────────────

function SkillCard({
  group,
  index,
}: {
  group: (typeof SKILL_GROUPS)[number];
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
      <div className="flex flex-col gap-4">
        {group.skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            color={group.color}
            index={i}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────

export default function Skills() {
  return (
    <section className="bg-[#080808] px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-white/30">
            Expertise
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Skills</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/40">
            Technologies I use daily and the rough proficiency level I&apos;d honestly rate myself at.
          </p>
        </motion.div>

        {/* Skill cards grid */}
        <div className="mb-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_GROUPS.map((group, i) => (
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
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-white/30">
            Tools I use
          </p>
          <div className="flex flex-wrap gap-2">
            {TOOLS.map((tool) => (
              <span
                key={tool}
                className="rounded-xl border border-white/8 bg-white/4 px-3 py-1.5 text-sm text-white/45 transition-colors hover:border-white/18 hover:text-white/75"
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