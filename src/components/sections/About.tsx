// components/sections/About.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import profileCutout from "../../../public/profile-cutout.png";
import { skillGroups, tools } from "../../../content/skills";

// ─── Data ─────────────────────────────────────────────────────────

// Same skills as the home page, plus the tools row.
const TECH_STACK = [
  ...skillGroups.map((g) => ({ category: g.category, items: g.skills })),
  { category: "Tools", items: tools },
];

const EDUCATION = {
  school: "Laguna State Polytechnic University",
  degree: "BS Information Technology",
  honors: "Magna Cum Laude",
  year: "2026",
};

const CERTIFICATES = [
  "Certified IT Service Management Professional",
  "IBM SkillsBuild — User Experience Design Fundamentals",
];

const VALUES = [
  {
    emoji: "⚡",
    title: "Performance first",
    description: "I care deeply about load times, Lighthouse scores, and the experience on slow connections.",
  },
  {
    emoji: "♿",
    title: "Accessibility matters",
    description: "Semantic HTML, keyboard navigation, and screen reader support aren't optional — they're baseline.",
  },
  {
    emoji: "🧹",
    title: "Clean code",
    description: "Code is read far more than it's written. I write for the next developer, not just the compiler.",
  },
  {
    emoji: "🚢",
    title: "Ship it",
    description: "Done is better than perfect. I bias toward getting things live and iterating based on real feedback.",
  },
];

// ─── Section fade-in wrapper ──────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────

export default function About() {
  return (
    <section className="min-h-screen bg-background px-6 py-16 sm:py-24 text-foreground">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <FadeIn>
          <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            <div className="relative w-28 shrink-0 sm:w-36">
              <div className="pointer-events-none absolute -inset-3 rounded-3xl bg-gradient-to-br from-emerald-500/20 via-transparent to-blue-500/20 blur-xl" />
              {/* Background-removed photo on a theme-coloured backdrop */}
              <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.06] bg-gradient-to-b from-emerald-500/15 to-transparent">
                <Image
                  src={profileCutout}
                  alt="Artem Lorredo"
                  sizes="(min-width: 640px) 144px, 112px"
                  placeholder="blur"
                  preload
                  className="h-auto w-full"
                />
              </div>
            </div>
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground/30">
                About me
              </p>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                Hey, I&apos;m Artem Lorredo 👋
              </h1>
            </div>
          </div>
        </FadeIn>

        {/* Bio */}
        <FadeIn delay={0.1}>
          <div className="mb-14 flex flex-col gap-4 text-base leading-relaxed text-foreground/55">
            <p>
              I&apos;m a full stack developer from Macalelon, Quezon, Philippines, building web and
              mobile applications, REST APIs, and database-driven systems. I work mostly with
              <span className="text-foreground"> Go, Python, Flutter, React Native, and PostgreSQL</span>,
              with a focus on secure, reliable, and maintainable software.
            </p>
            <p>
              I got my start as an intern at FDS Asya Philippines, working across project management,
              QA, technical support, and software development. Since August 2025 I&apos;ve been an
              Application/Software Developer at Bakawan Data Analytics, where I build backend services
              and APIs, web and mobile apps, and the authentication and access control behind them.
            </p>
            <p>
              Outside of work I build my own products — most recently{" "}
              <Link href="/projects/fintrack" className="text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground/70">
                FinTrack
              </Link>
              , a personal finance app with a React Native client and a Go API.
            </p>
          </div>
        </FadeIn>

        {/* Values */}
        <FadeIn delay={0.15}>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-foreground/30">
            How I work
          </p>
          <div className="mb-14 grid gap-4 sm:grid-cols-2">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-foreground/8 bg-foreground/[0.03] p-5 transition-colors hover:border-foreground/14 hover:bg-foreground/[0.05]"
              >
                <div className="mb-2 text-2xl">{v.emoji}</div>
                <h3 className="mb-1.5 font-semibold text-foreground">{v.title}</h3>
                <p className="text-sm leading-relaxed text-foreground/45">{v.description}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Skills */}
        <FadeIn delay={0.2}>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-foreground/30">
            Tech stack
          </p>
          <div className="mb-14 flex flex-col gap-5">
            {TECH_STACK.map((group) => (
              <div key={group.category} className="flex flex-col gap-2 sm:flex-row sm:gap-6">
                <span className="w-36 shrink-0 text-sm font-medium text-foreground/35">
                  {group.category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-foreground/8 bg-foreground/4 px-2.5 py-1 font-mono text-xs text-foreground/55 transition-colors hover:border-foreground/18 hover:text-foreground/85"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Education & certificates */}
        <FadeIn delay={0.22}>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-foreground/30">
            Education &amp; certificates
          </p>
          <div className="mb-14 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-foreground/8 bg-foreground/[0.03] p-5">
              <div className="mb-2 text-2xl">🎓</div>
              <h3 className="font-semibold text-foreground">{EDUCATION.degree}</h3>
              <p className="mt-1 text-sm text-foreground/45">{EDUCATION.school}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-medium text-amber-400">
                  {EDUCATION.honors}
                </span>
                <span className="font-mono text-xs text-foreground/30">{EDUCATION.year}</span>
              </div>
            </div>
            <div className="rounded-2xl border border-foreground/8 bg-foreground/[0.03] p-5">
              <div className="mb-2 text-2xl">📜</div>
              <h3 className="mb-2 font-semibold text-foreground">Certificates</h3>
              <ul className="flex flex-col gap-2">
                {CERTIFICATES.map((c) => (
                  <li key={c} className="flex gap-2.5 text-sm leading-relaxed text-foreground/45">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>

        {/* Currently */}
        <FadeIn delay={0.25}>
          <div className="mb-14 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
            <div className="mb-3 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-400">
                Currently
              </span>
            </div>
            <ul className="flex flex-col gap-2 text-sm text-foreground/55">
              <li>🏢 Working as Application/Software Developer at Bakawan Data Analytics Inc.</li>
              <li>📱 Building FinTrack, a personal finance app for Android and iOS</li>
              <li>🌱 Learning Agentic AI</li>
              <li>📝 Writing about full stack development on this blog</li>
              <li>🔍 Open to interesting freelance projects</li>
            </ul>
          </div>
        </FadeIn>

        {/* CTA row */}
        <FadeIn delay={0.3}>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Get in touch
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7.5 3.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <a
              href="/resume.pdf"
              download="Artemio-Lorredo-Resume.pdf"
              className="inline-flex items-center gap-2 rounded-xl border border-foreground/12 bg-foreground/4 px-6 py-3 text-sm font-medium text-foreground/55 transition-all hover:border-foreground/25 hover:bg-foreground/8 hover:text-foreground"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download CV
            </a>
            <a
              href="https://github.com/Lorredo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground/30 transition-colors hover:text-foreground/70"
            >
              GitHub ↗
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground/30 transition-colors hover:text-foreground/70"
            >
              LinkedIn ↗
            </a>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}