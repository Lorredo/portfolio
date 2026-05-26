// components/layout/Footer.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home",     href: "/"         },
  { label: "Projects", href: "/projects" },
  { label: "Blog",     href: "/blog"     },
  { label: "About",    href: "/about"    },
  { label: "Contact",  href: "/contact"  },
];

const SOCIAL_LINKS = [
  { label: "GitHub",   href: "https://github.com/yourusername"        },
  { label: "LinkedIn", href: "https://linkedin.com/in/yourusername"   },
  { label: "Twitter",  href: "https://twitter.com/yourusername"       },
  { label: "Email",    href: "mailto:you@youremail.com"               },
];

// ─── Visitor counter (fetches from your DB) ───────────────────────

function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/views")
      .then((r) => r.json())
      .then((d) => setCount(d.total))
      .catch(() => null);
  }, []);

  if (count === null) return null;

  return (
    <span className="flex items-center gap-1.5 font-mono text-xs text-white/20">
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
        <path d="M6 2C3.5 2 1.5 4 1.5 6s2 4 4.5 4 4.5-2 4.5-4-2-4-4.5-4Z" stroke="currentColor" strokeWidth="1.1"/>
        <circle cx="6" cy="6" r="1.5" fill="currentColor"/>
      </svg>
      {count.toLocaleString()} total visits
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/8 bg-[#080808] px-6 py-14 text-white">
      <div className="mx-auto max-w-6xl">

        <div className="mb-10 grid gap-10 sm:grid-cols-[1fr_auto_auto]">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="font-mono text-sm font-semibold text-white transition-opacity hover:opacity-70"
            >
              artem<span className="text-emerald-400">.dev</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/35">
              Full stack developer building fast, accessible, and beautiful web products.
            </p>
            <VisitorCount />
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs uppercase tracking-widest text-white/25">
              Pages
            </p>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/40 transition-colors hover:text-white/80"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social links */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs uppercase tracking-widest text-white/25">
              Connect
            </p>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="text-sm text-white/40 transition-colors hover:text-white/80"
              >
                {link.label} ↗
              </a>
            ))}
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/6 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-white/25">
            © {year} Artemio III Lorredo Built with Next.js, Tailwind CSS, and Prisma.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/yourusername/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/20 transition-colors hover:text-white/55"
            >
              Source code ↗
            </a>
            <span className="flex items-center gap-1.5 text-xs text-white/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              All systems operational
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}