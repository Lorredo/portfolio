// components/sections/Services.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────

type Service = {
  emoji: string;
  title: string;
  description: string;
  points: string[];
  example?: { label: string; href: string };
};

const SERVICES: Service[] = [
  {
    emoji: "📱",
    title: "Mobile apps",
    description: "Android and iOS apps built with Flutter or React Native, from first screen to release.",
    points: ["Works offline and syncs later", "Push notifications and reminders", "Secure login, PIN and biometrics"],
    example: { label: "See FinTrack", href: "/projects/fintrack" },
  },
  {
    emoji: "⚙️",
    title: "Backend & REST APIs",
    description: "Fast, secure APIs in Go or Python (FastAPI) with a PostgreSQL database behind them.",
    points: ["Authentication and role-based access", "Payment, messaging and third-party integrations", "Docker deployment and CI/CD"],
  },
  {
    emoji: "🖥️",
    title: "Web apps & dashboards",
    description: "Admin panels and internal tools in Next.js and React, connected to your data.",
    points: ["Reports, tables and exports", "Responsive on desktop and mobile", "Fast, accessible interfaces"],
  },
];

// ─── Main Component ───────────────────────────────────────────────

export default function Services() {
  return (
    <section className="bg-background px-6 py-16 sm:py-24 text-foreground">
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
            Freelance
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Available for freelance work</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/40">
            Alongside my full-time role, I take on a small number of freelance projects.
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              className="flex flex-col rounded-2xl border border-foreground/8 bg-foreground/[0.03] p-5 transition-colors hover:border-foreground/14 hover:bg-foreground/[0.05] sm:p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-3 text-2xl" aria-hidden>{s.emoji}</div>
              <h3 className="mb-2 font-semibold text-foreground">{s.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-foreground/45">{s.description}</p>
              <ul className="flex flex-col gap-2">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-foreground/55">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                    {p}
                  </li>
                ))}
              </ul>
              {s.example && (
                <Link
                  href={s.example.href}
                  className="mt-5 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
                >
                  {s.example.label} →
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Start a project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M3 7h8M7.5 3.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <span className="text-sm text-foreground/30">Usually replies within 24 hours</span>
        </motion.div>

      </div>
    </section>
  );
}
