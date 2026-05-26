// components/sections/Testimonials.tsx
"use client";

import { useState } from "react";
import { motion, } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "CTO",
    company: "StartupXYZ",
    avatar: "SC",
    color: "bg-emerald-500",
    quote:
      "One of the most reliable developers I've worked with. Delivered a complex multi-tenant platform on time, wrote clean code, and proactively flagged issues before they became problems. Would hire again without hesitation.",
  },
  {
    name: "Marcus Webb",
    role: "Founder",
    company: "ShopKit",
    avatar: "MW",
    color: "bg-blue-500",
    quote:
      "Transformed our sluggish Shopify store into a blazing-fast headless frontend. Lighthouse score went from 55 to 98. He understood both the technical and business requirements from day one.",
  },
  {
    name: "Priya Nair",
    role: "Product Manager",
    company: "Acme Corp",
    avatar: "PN",
    color: "bg-purple-500",
    quote:
      "Rare combination of strong technical skills and excellent communication. Never had to chase for updates. The codebase he left behind is genuinely a pleasure to work in — well documented and easy to extend.",
  },
  {
    name: "James Ortiz",
    role: "Lead Engineer",
    company: "ByteWorks",
    avatar: "JO",
    color: "bg-amber-500",
    quote:
      "Mentored junior devs, improved our CI/CD pipeline, and shipped features faster than anyone else on the team. A developer who makes everyone around them better.",
  },
  
];

// ─── Star rating ──────────────────────────────────────────────────

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#FCD34D">
          <path d="M7 1l1.545 3.13 3.455.502-2.5 2.437.59 3.44L7 8.885 3.91 10.51l.59-3.44L2 4.632l3.455-.502L7 1Z"/>
        </svg>
      ))}
    </div>
  );
}

// ─── Testimonial Card ─────────────────────────────────────────────

function TestimonialCard({
  item,
  active,
}: {
  item: (typeof TESTIMONIALS)[number];
  active: boolean;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: active ? 1 : 0.4, y: 0, scale: active ? 1 : 0.97 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-2xl border p-6 transition-colors ${
        active
          ? "border-white/14 bg-white/[0.05]"
          : "border-white/6 bg-white/[0.02]"
      }`}
    >
      {/* Stars */}
      <div className="mb-4">
        <Stars />
      </div>

      {/* Quote */}
      <blockquote className="mb-6 text-sm leading-relaxed text-white/60">
        &quot;{item.quote}&quot;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-full ${item.color} text-xs font-bold text-white`}>
          {item.avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{item.name}</p>
          <p className="text-xs text-white/35">
            {item.role} · {item.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────

export default function Testimonials() {
  const [active, setActive] = useState(0);

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
            Social proof
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            What people say
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/40">
            Feedback from clients, colleagues, and teammates I&apos;ve worked with.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((item, i) => (
            <div
              key={item.name}
              onClick={() => setActive(i)}
              className="cursor-pointer"
            >
              <TestimonialCard item={item} active={active === i} />
            </div>
          ))}
        </div>

        {/* Dot navigation */}
        <div className="mt-8 flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                active === i ? "w-6 bg-white" : "w-1.5 bg-white/20"
              }`}
              aria-label={`View testimonial ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}