// components/projects/MobileShowcase.tsx
"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { type AppScreen, type Project } from "../../../content/projects";

// ─── Helpers ──────────────────────────────────────────────────────

export function isMobileProject(project: Project) {
  return !!project.platform && project.platform !== "web";
}

const platformLabels: Record<NonNullable<Project["platform"]>, string> = {
  web: "Web",
  ios: "iOS",
  android: "Android",
  "cross-platform": "iOS · Android",
};

// ─── Platform badge ───────────────────────────────────────────────

export function PlatformBadge({ platform }: { platform: Project["platform"] }) {
  if (!platform || platform === "web") return null;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/20 bg-sky-500/10 px-2.5 py-0.5 text-[11px] font-medium text-sky-400">
      <svg width="9" height="12" viewBox="0 0 9 12" fill="none" aria-hidden>
        <rect x="0.6" y="0.6" width="7.8" height="10.8" rx="1.6" stroke="currentColor" strokeWidth="1.2" />
        <path d="M3.5 9.3h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      {platformLabels[platform]}
    </span>
  );
}

// ─── Phone frame ──────────────────────────────────────────────────

function PlaceholderScreen({ label }: { label: string }) {
  return (
    <div className="flex h-full flex-col gap-2.5 bg-gradient-to-b from-emerald-900/30 to-background p-3.5 pt-9">
      <div className="h-2 w-16 rounded-full bg-foreground/15" />
      <div className="mt-1 flex h-20 flex-col justify-end gap-1.5 rounded-xl bg-foreground/[0.07] p-3">
        <div className="h-1.5 w-10 rounded-full bg-foreground/15" />
        <div className="h-3 w-20 rounded-full bg-emerald-400/40" />
      </div>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-2 rounded-lg bg-foreground/[0.04] p-2">
          <div className="h-5 w-5 shrink-0 rounded-full bg-foreground/10" />
          <div className="h-1.5 flex-1 rounded-full bg-foreground/10" />
          <div className="h-1.5 w-6 rounded-full bg-foreground/15" />
        </div>
      ))}
      <p className="mt-auto text-center font-mono text-[10px] uppercase tracking-widest text-foreground/25">
        {label}
      </p>
    </div>
  );
}

export function PhoneMockup({
  screen,
  onOpen,
}: {
  screen: AppScreen;
  onOpen?: () => void;
}) {
  const frame = (
    <div className="relative aspect-[1080/2424] w-36 overflow-hidden rounded-[1.6rem] border-[5px] border-foreground/15 bg-background shadow-2xl shadow-black/30 transition-transform duration-300 group-hover:-translate-y-1 sm:w-38">
      {screen.src ? (
        <Image
          src={screen.src}
          alt={`${screen.label} screen`}
          fill
          sizes="152px"
          className="object-cover"
        />
      ) : (
        <PlaceholderScreen label={screen.label} />
      )}
      {onOpen && (
        <span className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 via-transparent to-transparent pb-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 text-[11px] font-medium text-white">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M8.5 1.5h4v4M5.5 12.5h-4v-4M12.5 1.5 8 6M1.5 12.5 6 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            View
          </span>
        </span>
      )}
    </div>
  );

  return (
    <figure className="flex shrink-0 snap-center flex-col items-center gap-3">
      {onOpen ? (
        <button
          type="button"
          onClick={onOpen}
          aria-label={`View ${screen.label} screen`}
          className="group cursor-zoom-in rounded-[1.6rem] outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
        >
          {frame}
        </button>
      ) : (
        frame
      )}
      <figcaption className="font-mono text-[11px] uppercase tracking-widest text-foreground/35">
        {screen.label}
      </figcaption>
    </figure>
  );
}

// ─── Screenshot preview (lightbox) ────────────────────────────────

function ScreenLightbox({
  screens,
  index,
  onClose,
  onNavigate,
}: {
  screens: AppScreen[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const screen = screens[index];
  const prev = useCallback(
    () => onNavigate((index - 1 + screens.length) % screens.length),
    [index, screens.length, onNavigate]
  );
  const next = useCallback(
    () => onNavigate((index + 1) % screens.length),
    [index, screens.length, onNavigate]
  );

  // Keyboard controls
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  // Lock page scroll and move focus into the dialog while open
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      previousFocus?.focus();
    };
  }, []);

  const navButton =
    "absolute top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/15 bg-white/10 p-3 text-white backdrop-blur transition-colors hover:bg-white/20 sm:block";

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${screen.label} screenshot`}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 px-4 py-6 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-4 text-white">
        <p className="font-mono text-xs uppercase tracking-widest text-white/60">
          {screen.label}
          <span className="ml-3 text-white/35">
            {index + 1} / {screens.length}
          </span>
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close preview"
          className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {screens.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous screenshot"
            className={`${navButton} left-4 md:left-10`}
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <svg width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M8.5 3 4.5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next screenshot"
            className={`${navButton} right-4 md:right-10`}
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <svg width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M5.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {/* Screenshot — swipe left/right on touch screens */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={screen.label}
          className="relative aspect-[1080/2424] h-[min(72vh,860px)] max-w-full sm:h-[min(80vh,860px)] overflow-hidden rounded-[2rem] border-[6px] border-white/15 bg-background shadow-2xl"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.18 }}
          drag={screens.length > 1 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.4}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) next();
            else if (info.offset.x > 60) prev();
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {screen.src && (
            <Image
              src={screen.src}
              alt={`${screen.label} screen`}
              fill
              sizes="(max-width: 640px) 90vw, 400px"
              className="pointer-events-none object-cover"
              preload
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Thumbnails */}
      {screens.length > 1 && (
        <div className="mt-5 flex gap-2" onClick={(e) => e.stopPropagation()}>
          {screens.map((s, i) => (
            <button
              key={s.label}
              type="button"
              aria-label={`Show ${s.label}`}
              aria-current={i === index}
              onClick={() => onNavigate(i)}
              className={`relative aspect-[1080/2424] w-7 overflow-hidden rounded-md border transition-all sm:w-8 ${
                i === index ? "border-white opacity-100" : "border-white/15 opacity-45 hover:opacity-80"
              }`}
            >
              {s.src && <Image src={s.src} alt="" fill sizes="32px" className="object-cover" />}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─── Screen gallery ───────────────────────────────────────────────

const noopSubscribe = () => () => {};

export function ScreenGallery({ project }: { project: Project }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const close = useCallback(() => setOpenIndex(null), []);
  // false during SSR and hydration, true after — keeps the portal out of the hydrated tree
  const isClient = useSyncExternalStore(noopSubscribe, () => true, () => false);

  const screens = project.screens ?? [];
  // Only real screenshots can be previewed — placeholders aren't worth enlarging
  const previewable = screens.filter((s) => s.src);
  if (screens.length === 0) return null;

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-foreground/8 bg-gradient-to-br from-emerald-900/20 to-teal-900/10">
        {/* w-max + mx-auto centers the row when it fits, and scrolls from the first phone when it doesn't */}
        <div className="snap-x snap-mandatory overflow-x-auto scroll-px-6">
          <div className="mx-auto flex w-max gap-4 px-6 py-10">
            {screens.map((screen) => {
              const i = previewable.indexOf(screen);
              return (
                <PhoneMockup
                  key={screen.label}
                  screen={screen}
                  onOpen={i >= 0 ? () => setOpenIndex(i) : undefined}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Portal: the page's animated (transformed) wrappers would otherwise trap position: fixed */}
      {isClient &&
        createPortal(
          <AnimatePresence>
            {openIndex !== null && (
              <ScreenLightbox
                screens={previewable}
                index={openIndex}
                onClose={close}
                onNavigate={setOpenIndex}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

// ─── Demo video ───────────────────────────────────────────────────

export function DemoVideo({ project }: { project: Project }) {
  if (!project.demoVideo) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-foreground/8 bg-black">
      <video
        src={project.demoVideo}
        poster={project.coverImage}
        controls
        muted
        playsInline
        preload="metadata"
        aria-label={`${project.title} product demo`}
        className="aspect-video w-full"
      />
    </div>
  );
}

// ─── Store links ──────────────────────────────────────────────────

function StoreLink({ href, store }: { href: string; store: "apple" | "google" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-xl border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-foreground/22 hover:bg-foreground/8"
    >
      {store === "apple" ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.87-.76-1.47.02-2.83.86-3.59 2.18-1.53 2.66-.39 6.6 1.1 8.75.73 1.05 1.6 2.24 2.73 2.2 1.1-.05 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.4 1.2-2.46-.03-.01-2.3-.88-2.3-3.52ZM14.2 6.13c.6-.73 1.01-1.75.9-2.76-.87.04-1.92.58-2.54 1.31-.56.64-1.05 1.68-.92 2.67.97.08 1.96-.49 2.56-1.22Z" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M3.6 2.2c-.3.3-.4.7-.4 1.2v17.2c0 .5.1.9.4 1.2l.1.1 9.6-9.6v-.2L3.7 2.1l-.1.1Zm12.9 12.9-3.2-3.2v-.2l3.2-3.2.1.1 3.8 2.2c1.1.6 1.1 1.6 0 2.2l-3.8 2.2-.1-.1Zm-.1.1L13.1 12l-9.5 9.8c.4.4.9.4 1.6.1l11.2-6.7Zm0-6.4L5.2 2.1c-.7-.4-1.2-.3-1.6.1l9.5 9.8 3.3-3.2Z" />
        </svg>
      )}
      {store === "apple" ? "App Store" : "Google Play"}
      <span className="ml-auto text-foreground/25">↗</span>
    </a>
  );
}

function ApkLink({ apk }: { apk: NonNullable<Project["apk"]> }) {
  return (
    <a
      href={apk.url}
      download
      className="flex items-center gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-300 transition-all hover:border-emerald-500/40 hover:bg-emerald-500/15"
    >
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
        <path d="M7.5 1.5v8M4 6.5l3.5 3.5L11 6.5M2 13h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="flex flex-col">
        Download APK
        <span className="text-[11px] font-normal text-emerald-300/60">
          Android · v{apk.version} · {apk.size}
        </span>
      </span>
    </a>
  );
}

export function StoreLinks({ project }: { project: Project }) {
  const hasStore = project.appStoreUrl || project.playStoreUrl;

  if (!hasStore && project.apk) {
    return (
      <>
        <ApkLink apk={project.apk} />
        <p className="px-1 text-[11px] leading-relaxed text-foreground/30">
          Store release pending. Install the APK directly on Android — you may need to allow
          installs from unknown sources.
        </p>
      </>
    );
  }

  if (!hasStore) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-foreground/6 px-4 py-3 text-sm text-foreground/25">
        <svg width="12" height="15" viewBox="0 0 9 12" fill="none" aria-hidden>
          <rect x="0.6" y="0.6" width="7.8" height="10.8" rx="1.6" stroke="currentColor" strokeWidth="1.2" />
          <path d="M3.5 9.3h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        Store release pending
      </div>
    );
  }

  return (
    <>
      {project.appStoreUrl && <StoreLink href={project.appStoreUrl} store="apple" />}
      {project.playStoreUrl && <StoreLink href={project.playStoreUrl} store="google" />}
      {project.apk && <ApkLink apk={project.apk} />}
    </>
  );
}
