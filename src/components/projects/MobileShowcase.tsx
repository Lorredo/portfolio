// components/projects/MobileShowcase.tsx
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

export function PhoneMockup({ screen }: { screen: AppScreen }) {
  return (
    <figure className="flex shrink-0 snap-center flex-col items-center gap-3">
      <div className="relative aspect-[9/20] w-40 overflow-hidden rounded-[1.75rem] border-[5px] border-foreground/15 bg-background shadow-2xl shadow-black/30 sm:w-44">
        {screen.src ? (
          <Image
            src={screen.src}
            alt={`${screen.label} screen`}
            fill
            sizes="176px"
            className="object-cover"
          />
        ) : (
          <PlaceholderScreen label={screen.label} />
        )}
      </div>
      <figcaption className="font-mono text-[11px] uppercase tracking-widest text-foreground/35">
        {screen.label}
      </figcaption>
    </figure>
  );
}

// ─── Screen gallery ───────────────────────────────────────────────

export function ScreenGallery({ project }: { project: Project }) {
  const screens = project.screens ?? [];
  if (screens.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-foreground/8 bg-gradient-to-br from-emerald-900/20 to-teal-900/10">
      <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-8 py-10 lg:justify-center">
        {screens.map((screen) => (
          <PhoneMockup key={screen.label} screen={screen} />
        ))}
      </div>
    </div>
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

export function StoreLinks({ project }: { project: Project }) {
  if (!project.appStoreUrl && !project.playStoreUrl) {
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
    </>
  );
}
