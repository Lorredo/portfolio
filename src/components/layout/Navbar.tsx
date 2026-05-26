// components/layout/Navbar.tsx - Update the ThemeToggle component
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
// import { useTheme } from "@/components/providers/ThemeProvider"; // Add this import
// import { ThemeToggle } from "@/components/ui/ThemeToggle"; // Add this import

// ─── Nav Links ────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home",     href: "/"          },
  { label: "Projects", href: "/projects"  },
  { label: "Blog",     href: "/blog"      },
  { label: "About",    href: "/about"     },
  { label: "Contact",  href: "/contact"   },
];


// ─── Mobile Menu ──────────────────────────────────────────────────

function MobileMenu({
  open,
  pathname,
  onClose,
}: {
  open: boolean;
  pathname: string;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            className="fixed inset-x-4 top-20 z-50 rounded-2xl border border-white/10 bg-background p-6 shadow-2xl"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      active
                        ? "bg-white/8 text-foreground"
                        : "text-foreground/50 hover:bg-white/5 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Resume CTA inside mobile menu */}
            <div className="mt-4 border-t border-white/8 pt-4">
              <a
                href="/resume.pdf"
                download
                onClick={onClose}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download CV
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close menu on route change
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMenuOpen(false), [pathname]);

  // Add border + blur on scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/8 bg-background/80 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

          {/* Logo */}
          <Link
            href="/"
            className="font-mono text-sm font-semibold text-foreground transition-opacity hover:opacity-70"
          >
            Artem<span className="text-emerald-400">.dev</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    active ? "text-foreground" : "text-foreground/45 hover:text-foreground/80"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-white/8"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* <ThemeToggle /> */}

            {/* Resume button — desktop only */}
            <a
              href="/resume.pdf"
              download
              className="hidden items-center gap-1.5 rounded-lg border border-white/12 bg-white/5 px-3 py-1.5 text-xs font-medium text-foreground/60 transition-all hover:border-white/25 hover:bg-white/10 hover:text-foreground md:inline-flex"
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Resume
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-foreground/50 transition-all hover:border-white/25 hover:text-foreground md:hidden"
            >
              <motion.div
                animate={menuOpen ? "open" : "closed"}
                className="flex flex-col gap-1"
              >
                <motion.span
                  className="block h-[1.5px] w-4 bg-current"
                  variants={{ open: { rotate: 45, y: 4 }, closed: { rotate: 0, y: 0 } }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block h-[1.5px] w-4 bg-current"
                  variants={{ open: { opacity: 0, x: -4 }, closed: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block h-[1.5px] w-4 bg-current"
                  variants={{ open: { rotate: -45, y: -4 }, closed: { rotate: 0, y: 0 } }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu drawer */}
      <MobileMenu
        open={menuOpen}
        pathname={pathname}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}