// components/sections/About.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────

const SKILLS = [
  { category: "Frontend",  items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "shadcn/ui"] },
  { category: "Backend",   items: ["Node.js", "REST APIs", "WebSockets"] },
  { category: "Database",  items: ["PostgreSQL", "Prisma", "Redis", "Supabase", "MySQL"] },
  { category: "DevOps",    items: ["GitHub Actions", "Vercel", "AWS S3",] },
  { category: "Tools",     items: ["Git", "VS Code", "Figma", "Postman",] },
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
    <section className="min-h-screen bg-[#080808] px-6 py-24 text-white">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <FadeIn>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-white/30">
            About me
          </p>
          <h1 className="mb-8 text-4xl font-bold tracking-tight md:text-5xl">
            Hey, I&apos;m Artemio III Lorredo 👋
          </h1>
        </FadeIn>

        {/* Bio */}
        <FadeIn delay={0.1}>
          <div className="mb-14 flex flex-col gap-4 text-base leading-relaxed text-white/55">
            <p>
              I&apos;m a full stack developer based in Manila, Philippines, with 3+ years of experience
              building web products from the database to the interface. I specialize in
              <span className="text-white"> Next.js, TypeScript, and PostgreSQL</span> — the stack
              that lets me move fast without cutting corners.
            </p>
            <p>
              I started my career at a digital agency, learned the fundamentals the hard way
              (FTP deploys and all), then moved into startups where I got to own entire products
              end-to-end. These days I work as a senior full stack developer and take on freelance
              projects that interest me.
            </p>
            <p>
              Outside of code I&apos;m into mechanical keyboards, specialty coffee, and occasionally
              convincing myself I&apos;ll finish a side project before starting another one.
            </p>
          </div>
        </FadeIn>

        {/* Values */}
        <FadeIn delay={0.15}>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-white/30">
            How I work
          </p>
          <div className="mb-14 grid gap-4 sm:grid-cols-2">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 transition-colors hover:border-white/14 hover:bg-white/[0.05]"
              >
                <div className="mb-2 text-2xl">{v.emoji}</div>
                <h3 className="mb-1.5 font-semibold text-white">{v.title}</h3>
                <p className="text-sm leading-relaxed text-white/45">{v.description}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Skills */}
        <FadeIn delay={0.2}>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-white/30">
            Tech stack
          </p>
          <div className="mb-14 flex flex-col gap-5">
            {SKILLS.map((group) => (
              <div key={group.category} className="flex flex-col gap-2 sm:flex-row sm:gap-6">
                <span className="w-24 shrink-0 text-sm font-medium text-white/35">
                  {group.category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-white/8 bg-white/4 px-2.5 py-1 font-mono text-xs text-white/55 transition-colors hover:border-white/18 hover:text-white/85"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
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
            <ul className="flex flex-col gap-2 text-sm text-white/55">
              <li>🏢 Working as Senior Full Stack Developer at Acme Corp</li>
              <li>🌱 Learning Rust and exploring WebAssembly</li>
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
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
            >
              Get in touch
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7.5 3.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/4 px-6 py-3 text-sm font-medium text-white/55 transition-all hover:border-white/25 hover:bg-white/8 hover:text-white"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download CV
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/30 transition-colors hover:text-white/70"
            >
              GitHub ↗
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/30 transition-colors hover:text-white/70"
            >
              LinkedIn ↗
            </a>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}