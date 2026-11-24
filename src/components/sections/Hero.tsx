"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import heroCutout from "../../../public/hero-cutout.png";
import profilePhoto from "../../../public/profile.jpg";


// ─── Types ───────────────────────────────────────────────────────────────────

type Role = {
  label: string;
  color: string;
};

const MotionLink = motion.create(Link);

// ─── Data ────────────────────────────────────────────────────────────────────

const ROLES: Role[] = [
  { label: "Full Stack Developer", color: "#6EE7B7" },   // emerald
  { label: "Mobile Developer",     color: "#FCA5A5" },   // coral
  { label: "Problem Solver",       color: "#FCD34D" },   // amber
];

const STATS = [
  { target: 1,   suffix: "+", label: "Year experience"  },
  { target: 3,   suffix: "+", label: "Projects shipped" },
  { target: 600, suffix: "+", label: "Commits"          },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);
  const count = useSpring(0, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (started) count.set(target);
  }, [started, target, count]);

  useEffect(() =>
    count.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
    }),
  [count, suffix]);

  return (
    <span ref={ref} className="text-2xl font-bold text-foreground">
      0{suffix}
    </span>
  );
}


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

// Current time in the Philippines, refreshed every 15s. The server render
// shows only the location, so there's no hydration mismatch.
const timeFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Manila",
  hour: "numeric",
  minute: "2-digit",
});
const subscribeToClock = (onChange: () => void) => {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
};

function LocalTimeBadge() {
  const time = useSyncExternalStore(
    subscribeToClock,
    () => timeFormat.format(Date.now()),
    () => null,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-4 py-1.5 text-sm text-foreground/55"
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path d="M6 1C4.067 1 2.5 2.567 2.5 4.5c0 2.625 3.5 6.5 3.5 6.5s3.5-3.875 3.5-6.5C9.5 2.567 7.933 1 6 1Z" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="6" cy="4.5" r="1.2" stroke="currentColor" strokeWidth="1.1" />
      </svg>
      Quezon, PH
      {time && (
        <>
          <span className="text-foreground/20">·</span>
          <time className="font-mono tabular-nums text-foreground/70">{time}</time>
        </>
      )}
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
    <span className="relative inline-block overflow-hidden align-bottom">
      {/* Invisible spacer to set intrinsic width to the longest role */}
      <span className="invisible whitespace-nowrap font-semibold">
        Full Stack Developer
      </span>
      {ROLES.map((role, i) => (
        <motion.span
          key={role.label}
          className="absolute left-0 top-0 font-semibold whitespace-nowrap"
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
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      className={
        variant === "primary"
          ? "inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          : "inline-flex items-center gap-2 rounded-xl border border-foreground/20 bg-foreground/5 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-foreground/40 hover:bg-foreground/10"
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

// Background-removed photo: the page shows through, so it suits both themes.
// The bottom fades out because the source photo ends at the forearms.
const PHOTO_FADE = "linear-gradient(to bottom, black 78%, transparent)";

function ProfilePhoto() {
  return (
    <motion.div
      className="relative hidden shrink-0 lg:block lg:w-[400px] xl:w-[500px]"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Backlight, so the black shirt still reads on the dark theme */}
      <div className="pointer-events-none absolute inset-x-[8%] top-[6%] bottom-[18%] rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.35),rgba(59,130,246,0.25)_45%,transparent_70%)] blur-2xl" />
      <Image
        src={heroCutout}
        alt="Artem Lorredo"
        sizes="(min-width: 1280px) 500px, 400px"
        fetchPriority="high"
        className="relative h-auto w-full"
        style={{ maskImage: PHOTO_FADE, WebkitMaskImage: PHOTO_FADE }}
      />
    </motion.div>
  );
}

function ProfileAvatar() {
  return (
    <Image
      src={profilePhoto}
      alt=""
      sizes="64px"
      className="h-16 w-16 shrink-0 rounded-full border border-foreground/10 object-cover object-[50%_25%] lg:hidden"
    />
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 md:block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-2 text-foreground/30"
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
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 pb-16 pt-24 text-foreground sm:pb-24">

      {/* Background atmosphere */}
      <GridBackground />
      <GlowOrb className="left-[10%] top-[15%] h-[500px] w-[500px] bg-emerald-500/20" />
      <GlowOrb className="right-[10%] bottom-[15%] h-[400px] w-[400px] bg-blue-500/15" />
      <GlowOrb className="left-[40%] top-[50%] h-[300px] w-[300px] bg-purple-500/10" />

      {/* Content: text column, plus the photo on large screens */}
      <div className="relative z-10 w-full max-w-4xl lg:grid lg:max-w-6xl lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10">
        <div className="flex flex-col gap-8">

          {/* Badges */}
          <div className="flex items-center gap-4">
            <ProfileAvatar />
            <div className="flex flex-wrap items-center gap-3">
              <OpenToWorkBadge />
              <LocalTimeBadge />
            </div>
          </div>

          {/* Headline */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-foreground/40">
              Hi, I&apos;m
            </p>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl">
              Artem Lorredo
            </h1>
            <h2 className="text-3xl font-light leading-snug text-foreground/50 sm:text-4xl md:text-5xl">
              <RoleCycler />
            </h2>
          </motion.div>

          {/* Bio */}
          <motion.p
            className="max-w-2xl text-base leading-relaxed text-foreground/50 sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            I build backend services, REST APIs, and mobile apps — from the database
            to the interface. Currently a developer at Bakawan Data Analytics, and building
            FinTrack, a personal finance app for Philippine pay cycles.
          </motion.p>

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
              download="Artemio-Lorredo-Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 text-sm text-foreground/40 transition-colors hover:text-foreground/80"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download CV
            </motion.a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="grid grid-cols-3 gap-4 border-t border-foreground/10 pt-8 sm:flex sm:flex-wrap sm:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            {STATS.map(({ target, suffix, label }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <AnimatedCounter target={target} suffix={suffix} />
                <span className="text-xs text-foreground/40 sm:text-sm">{label}</span>
              </div>
            ))}
          </motion.div>

        </div>

        <ProfilePhoto />
      </div>

      <ScrollIndicator />
    </section>
  );
}