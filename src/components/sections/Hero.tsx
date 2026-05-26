"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";


// ─── Types ───────────────────────────────────────────────────────────────────

type Role = {
  label: string;
  color: string;
};

const MotionLink = motion.create(Link);


// ─── Data ────────────────────────────────────────────────────────────────────

const ROLES: Role[] = [
  { label: "Full Stack Developer", color: "#6EE7B7" },   // emerald
  { label: "UI/UX Enthusiast",     color: "#93C5FD" },   // blue
  { label: "Open Source Builder",  color: "#FCA5A5" },   // coral
  { label: "Problem Solver",       color: "#FCD34D" },   // amber
];

const TECH_BADGES = [
  "Next.js", "TypeScript", "React", "Node.js",
  "PostgreSQL", "Tailwind CSS", "Prisma", "Docker",
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function OpenToWorkBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      Open to work
    </motion.div>
  );
}

function RoleCycler() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-block overflow-hidden align-bottom" style={{ height: "1.2em", minWidth: "320px" }}>
      {ROLES.map((role, i) => (
        <motion.span
          key={role.label}
          className="absolute left-0 top-0 font-semibold"
          style={{ color: role.color }}
          initial={{ y: "100%", opacity: 0 }}
          animate={
            i === index
              ? { y: "0%", opacity: 1 }
              : i === (index - 1 + ROLES.length) % ROLES.length
              ? { y: "-100%", opacity: 0 }
              : { y: "100%", opacity: 0 }
          }
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {role.label}
        </motion.span>
      ))}
    </span>
  );
}

function TechBadges() {
  return (
    <motion.div
      className="flex flex-wrap gap-2"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06, delayChildren: 0.9 } },
      }}
    >
      {TECH_BADGES.map((tech) => (
        <motion.span
          key={tech}
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.35, ease: "backOut" }}
          className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-white/60 transition-colors hover:border-white/25 hover:text-white/90"
        >
          {tech}
        </motion.span>
      ))}
    </motion.div>
  );
}

function MagneticButton({
  children,
  href,
  variant = "primary",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
     <MotionLink
           ref={ref}
      href={href}        // ← now works as Next.js Link
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      className={
        variant === "primary"
          ? "inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          : "inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/10"
      }
    >
      {children}
    </MotionLink>
  );
}

function GridBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage:
          "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }}
    />
  );
}

function GlowOrb({ className }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-[120px] ${className}`}
    />
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-xs font-mono tracking-widest uppercase">scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5" />
          <motion.rect
            x="7" y="5" width="2" height="5" rx="1" fill="currentColor"
            animate={{ y: [5, 10, 5], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#080808] px-6 text-white">

      {/* Background atmosphere */}
      <GridBackground />
      <GlowOrb className="left-[10%] top-[15%] h-[500px] w-[500px] bg-emerald-500/20" />
      <GlowOrb className="right-[10%] bottom-[15%] h-[400px] w-[400px] bg-blue-500/15" />
      <GlowOrb className="left-[40%] top-[50%] h-[300px] w-[300px] bg-purple-500/10" />

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-4xl flex-col gap-8">

        {/* Badge */}
        <div>
          <OpenToWorkBadge />
        </div>

        {/* Headline */}
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-white/40">
            Hi, Im
          </p>
          <h1 className="text-6xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
            Artemio III Lorredo
          </h1>
          <h2 className="text-4xl font-light leading-snug text-white/50 md:text-5xl">
            <RoleCycler />
          </h2>
        </motion.div>

        {/* Bio */}
        <motion.p
          className="max-w-2xl text-lg leading-relaxed text-white/50"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          I build fast, accessible, and beautiful web products — from the database 
          to the interface. Currently crafting tools that help people work smarter.
        </motion.p>

        {/* Tech badges */}
        <TechBadges />

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
         <MagneticButton href="/projects" variant="primary">
  View my work
</MagneticButton>

<MagneticButton href="/contact" variant="secondary">
  Get in touch
</MagneticButton>

          <motion.a
            href="/resume.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/80"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Download CV
          </motion.a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="flex flex-wrap gap-8 border-t border-white/10 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          {[
            { value: "3+", label: "Years experience" },
            { value: "8+", label: "Projects shipped" },
            { value: "500+", label: "npm downloads" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col gap-0.5">
              <span className="text-2xl font-bold text-white">{value}</span>
              <span className="text-sm text-white/40">{label}</span>
            </div>
          ))}
        </motion.div>

      </div>

      <ScrollIndicator />
    </section>
  );
}