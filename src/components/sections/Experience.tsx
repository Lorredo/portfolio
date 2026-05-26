"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  type: "full-time" | "freelance" | "contract" | "internship";
  current?: boolean;
  description: string;
  highlights: string[];
  techStack: string[];
  companyUrl?: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

export const experience: ExperienceItem[] = [
  {
    company: "Acme Corp",
    role: "Senior Full Stack Developer",
    period: "Jan 2024 – Present",
    location: "Remote",
    type: "full-time",
    current: true,
    description:
      "Leading development of the company's core SaaS platform serving 20k+ users. Own the full stack from API design to React frontend, with a focus on performance and developer experience.",
    highlights: [
      "Reduced API response times by 60% by migrating to edge functions and adding Redis caching",
      "Architected a multi-tenant RBAC system supporting 5 permission levels",
      "Mentored 2 junior developers and introduced weekly code review practices",
      "Led migration from CRA to Next.js App Router, improving LCP by 40%",
    ],
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "Prisma", "AWS"],
    companyUrl: "https://acme.com",
  },
  {
    company: "Freelance",
    role: "Full Stack Developer",
    period: "Mar 2022 – Dec 2023",
    location: "Remote",
    type: "freelance",
    description:
      "Delivered 12+ web projects for clients across e-commerce, fintech, and SaaS. Specialized in Next.js storefronts and headless CMS integrations.",
    highlights: [
      "Built a Shopify headless storefront achieving 98 Lighthouse performance score",
      "Developed a real-time booking system handling 500+ reservations/day",
      "Integrated Stripe billing with proration for 3 SaaS clients",
      "Maintained 100% on-time delivery across all client engagements",
    ],
    techStack: ["React", "Next.js", "Node.js", "Stripe", "Shopify", "Sanity"],
  },
  {
    company: "StartupXYZ",
    role: "Frontend Developer",
    period: "Jun 2021 – Feb 2022",
    location: "Manila, PH · Hybrid",
    type: "full-time",
    description:
      "Joined as the first frontend hire at a Series A startup. Built the product UI from scratch, established the component library, and set up the CI/CD pipeline.",
    highlights: [
      "Designed and built the entire frontend from zero using React and Tailwind CSS",
      "Created a reusable component library of 40+ components with Storybook docs",
      "Set up GitHub Actions CI/CD pipeline reducing deployment time from 20 min to 4 min",
      "Improved mobile conversion rate by 35% through responsive redesign",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Storybook", "GitHub Actions"],
    companyUrl: "https://startupxyz.com",
  },
  {
    company: "ByteWorks Agency",
    role: "Junior Web Developer",
    period: "Jan 2020 – May 2021",
    location: "Manila, PH · On-site",
    type: "full-time",
    description:
      "Started career at a digital agency building websites and internal tools for local and international clients. Worked across the full stack under senior developer mentorship.",
    highlights: [
      "Delivered 20+ client websites on WordPress and custom PHP/Laravel backends",
      "Built an internal project management tool that reduced reporting time by 50%",
      "Introduced Git workflow and code review process to a team previously using FTP",
    ],
    techStack: ["JavaScript", "PHP", "Laravel", "MySQL", "WordPress"],
    companyUrl: "https://byteworks.ph",
  },
];

// ─── Type Badge ───────────────────────────────────────────────────────────────

const TYPE_STYLES: Record<ExperienceItem["type"], string> = {
  "full-time":  "bg-blue-500/10  text-blue-400  border-blue-500/20",
  freelance:    "bg-purple-500/10 text-purple-400 border-purple-500/20",
  contract:     "bg-amber-500/10  text-amber-400  border-amber-500/20",
  internship:   "bg-teal-500/10   text-teal-400   border-teal-500/20",
};

const TYPE_LABELS: Record<ExperienceItem["type"], string> = {
  "full-time": "Full-time",
  freelance:   "Freelance",
  contract:    "Contract",
  internship:  "Internship",
};

function TypeBadge({ type }: { type: ExperienceItem["type"] }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${TYPE_STYLES[type]}`}>
      {TYPE_LABELS[type]}
    </span>
  );
}

// ─── Timeline Entry ───────────────────────────────────────────────────────────

function TimelineEntry({
  item,
  index,
  isLast,
}: {
  item: ExperienceItem;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-8">

      {/* Timeline spine + dot */}
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: index * 0.1, duration: 0.4, ease: "backOut" }}
          className="relative z-10 mt-1.5 flex-shrink-0"
        >
          {item.current ? (
            <span className="relative flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-emerald-400 bg-emerald-500" />
            </span>
          ) : (
            <span className="flex h-3.5 w-3.5 rounded-full border-2 border-white/20 bg-[#080808]" />
          )}
        </motion.div>

        {!isLast && (
          <motion.div
            className="mt-2 w-px flex-1 bg-white/8"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            style={{ originY: 0 }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.7, ease: "easeOut" }}
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        className="mb-10 min-w-0 flex-1"
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: index * 0.1 + 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="group rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-colors hover:border-white/14 hover:bg-white/[0.05]">

          {/* Header */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold text-white">{item.role}</h3>
                {item.current && (
                  <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
                    Current
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {item.companyUrl ? (
                  <a
                    href={item.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-white/70 transition-colors hover:text-white"
                  >
                    {item.company} ↗
                  </a>
                ) : (
                  <span className="font-medium text-white/70">{item.company}</span>
                )}
                <span className="text-white/20">·</span>
                <TypeBadge type={item.type} />
              </div>
            </div>

            <div className="flex flex-col items-start gap-1 sm:items-end">
              <span className="font-mono text-sm text-white/45">{item.period}</span>
              <span className="flex items-center gap-1 text-xs text-white/28">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1C4.067 1 2.5 2.567 2.5 4.5c0 2.625 3.5 6.5 3.5 6.5s3.5-3.875 3.5-6.5C9.5 2.567 7.933 1 6 1Z" stroke="currentColor" strokeWidth="1.2"/>
                  <circle cx="6" cy="4.5" r="1.2" stroke="currentColor" strokeWidth="1.1"/>
                </svg>
                {item.location}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="mb-4 text-sm leading-relaxed text-white/42">{item.description}</p>

          {/* Highlights */}
          <ul className="mb-5 flex flex-col gap-2.5">
            {item.highlights.map((h, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-white/55">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500/55" />
                {h}
              </li>
            ))}
          </ul>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 border-t border-white/6 pt-4">
            {item.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/8 bg-white/4 px-2.5 py-0.5 font-mono text-[11px] text-white/35 transition-colors hover:border-white/18 hover:text-white/65"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Experience() {
  return (
    <section className="bg-[#080808] px-6 py-24 text-white">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-white/30">
            Career
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Experience</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/40">
            3+ years building products across startups, agencies, and as an independent developer.
          </p>
        </motion.div>

        {/* Timeline */}
        <div>
          {experience.map((item, i) => (
            <TimelineEntry
              key={`${item.company}-${item.period}`}
              item={item}
              index={i}
              isLast={i === experience.length - 1}
            />
          ))}
        </div>

        {/* Download CTA */}
        <motion.div
          className="mt-4 flex items-center gap-4 pl-[3.25rem]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/4 px-5 py-2.5 text-sm font-medium text-white/50 transition-all hover:border-white/25 hover:bg-white/8 hover:text-white/90"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Download full résumé
          </a>
          <span className="text-sm text-white/20">PDF · Updated 2025</span>
        </motion.div>

      </div>
    </section>
  );
}