// components/sections/Testimonials.tsx
"use client";

import { motion } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────

type Testimonial = {
  name: string;
  role: string;
  avatar: string; // initials
  color: string;
  quote: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Rainier Dalwampo",
    role: "Student · LSPU-SPCC",
    avatar: "RD",
    color: "bg-emerald-500",
    quote:
      "Working with this developer has been a great experience. Magaling siyang umintindi ng project requirements and always makes sure na maayos ang final output. He is creative in finding solutions, open to suggestions, and willing to make improvements whenever needed. His dedication and attention to detail really helped make the project successful. I would definitely recommend him to anyone looking for a talented and dependable developer.",
  },
];

// ─── Star rating ──────────────────────────────────────────────────

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#FCD34D" aria-hidden>
          <path d="M7 1l1.545 3.13 3.455.502-2.5 2.437.59 3.44L7 8.885 3.91 10.51l.59-3.44L2 4.632l3.455-.502L7 1Z"/>
        </svg>
      ))}
    </div>
  );
}

// ─── Testimonial Card ─────────────────────────────────────────────

function TestimonialCard({ item, index }: { item: Testimonial; index: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col rounded-2xl border border-foreground/10 bg-foreground/[0.04] p-6 sm:p-8"
    >
      <div className="mb-5">
        <Stars />
      </div>

      <blockquote className="mb-8 flex-1 text-base leading-relaxed text-foreground/65 sm:text-lg">
        &ldquo;{item.quote}&rdquo;
      </blockquote>

      <figcaption className="flex items-center gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${item.color} text-xs font-bold text-white`}>
          {item.avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{item.name}</p>
          <p className="text-xs text-foreground/40">{item.role}</p>
        </div>
      </figcaption>
    </motion.figure>
  );
}

// ─── Main Component ───────────────────────────────────────────────

export default function Testimonials() {
  // One testimonial gets a single wide card; more fill a grid.
  const grid =
    TESTIMONIALS.length === 1
      ? "max-w-3xl"
      : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3";

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
            Social proof
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            What people say
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/40">
            Feedback from people I&apos;ve built projects with.
          </p>
        </motion.div>

        <div className={grid}>
          {TESTIMONIALS.map((item, i) => (
            <TestimonialCard key={item.name} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
