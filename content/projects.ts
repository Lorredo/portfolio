export type ProjectStatus = "completed" | "in-progress" | "archived";

export type ProjectPlatform = "web" | "ios" | "android" | "cross-platform";

// Where a project came from. Omitted means a personal project.
export type ProjectKind = "personal" | "capstone" | "academic";

export type AppScreen = {
  label: string;
  src?: string; // portrait screenshot under /public/projects/ — placeholder shown until added
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  techStack: string[];
  status: ProjectStatus;
  year: number;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  coverImage?: string; // path under /public/projects/ — used as the demo video poster

  // School work
  kind?: ProjectKind;
  course?: string; // e.g. "BSIT, LSPU" — shown in the detail page Type row

  // Mobile projects
  platform?: ProjectPlatform; // defaults to "web"
  appStoreUrl?: string;
  playStoreUrl?: string;
  apk?: { url: string; version: string; size: string }; // sideloadable Android build, e.g. a GitHub Release asset
  demoVideo?: string; // 16:9 walkthrough under /public/projects/ — coverImage is used as the poster
  screens?: AppScreen[];
  highlights?: string[];
};

export const projects: Project[] = [
  {
    slug: "fintrack",
    title: "FinTrack — Personal Finance for Philippine Pay Cycles",
    summary:
      "A cross-platform personal finance app built for Philippine pay cycles, with payday-based spending limits, bill tracking, on-device receipt scanning and offline-first sync.",
    // One line per paragraph: the detail page renders newlines as line breaks
    description: `FinTrack is a cross-platform personal finance app designed around the semi-monthly pay cycle common in the Philippines. Users track income, expenses and transfers across e-wallets and bank accounts such as GCash and Maya. Its core feature, Safe to Spend, calculates a daily spending limit until the next payday (the 15th or 30th, or the working day before when it falls on a weekend or Philippine holiday) from expected salary and allowances, net of upcoming bills, savings and spending to date, and never above the actual wallet balance.

Beyond day-to-day tracking, the app manages recurring bills with reminders, one-tap payday income recording (including pay that arrives early), personal loans (utang) and rotating savings groups (paluwagan), category budgets, and PDF/Excel reporting. Receipts from GCash, Maya or banking apps are read on-device with Google ML Kit to pre-fill transactions, and an offline-first design lets users keep recording without a connection, with changes synced automatically once they're back online.

I designed and built FinTrack end to end as a solo developer, covering UX, mobile, backend, database and deployment. It's a monorepo with a React Native (Expo) client and a Go REST API on serverless PostgreSQL (Neon), containerized with Docker and hosted on Render. The backend follows a layered architecture (routes → handlers → services → data access) with JWT authentication middleware, request validation, and integration tests against a real PostgreSQL database. The mobile app uses a feature-based architecture, a custom design system, and a TanStack Query data layer backed by an encrypted offline cache.`,
    tags: ["Mobile", "Full Stack", "Finance"],
    techStack: [
      "React Native",
      "Expo",
      "TypeScript",
      "NativeWind",
      "TanStack Query",
      "Zustand",
      "Go",
      "Fiber",
      "PostgreSQL",
      "Neon",
      "Docker",
      "Render",
      "ML Kit",
      "MMKV",
    ],
    status: "in-progress",
    year: 2026,
    githubUrl: "https://github.com/Lorredo/fintrack",
    featured: true,
    coverImage: "/projects/fintrack/cover.png",
    platform: "cross-platform",
    apk: {
      url: "https://github.com/Lorredo/fintrack/releases/download/v1.7.0/fintrack-1.7.0-release.apk",
      version: "1.7.0",
      size: "47 MB",
    },
    demoVideo: "/projects/fintrack/demo.mp4",
    screens: [
      { label: "Dashboard", src: "/projects/fintrack/dashboard.png" },
      { label: "Safe to Spend", src: "/projects/fintrack/safe-to-spend.png" },
      { label: "Bills", src: "/projects/fintrack/bills.png" },
      { label: "Utang", src: "/projects/fintrack/utang.png" },
      { label: "Paluwagan", src: "/projects/fintrack/paluwagan-details.png" },
      { label: "Budgets", src: "/projects/fintrack/budgets.png" },
      { label: "Transactions", src: "/projects/fintrack/transactions.png" },
      { label: "Reports", src: "/projects/fintrack/reports.png" },
      { label: "Receipt Scan", src: "/projects/fintrack/scan-receipt.png" },
      { label: "Offline", src: "/projects/fintrack/offline.png" },
      { label: "PIN Lock", src: "/projects/fintrack/pin-lock.png" },
    ],
    highlights: [
      "Payday-aware budgeting: a daily Safe to Spend limit until the next payday, which moves for weekends and Philippine holidays, planned from salary and allowances and capped at real wallet balances",
      "Offline-first sync: an encrypted outbox replays changes in order, and client-generated IDs make retries idempotent",
      "On-device receipt scanning: ML Kit turns GCash, Maya and bank screenshots into transactions",
      "Bills and obligations: recurring bills, payday income logging, and utang and paluwagan tracking with local reminders",
      "Ledger and reporting: multi-wallet transfers with fees, category budgets with atomic rebalancing, and PDF/Excel exports",
      "Security: Google sign-in, rotating JWT refresh tokens, PIN and biometric lock, and encrypted local storage",
      "Platform and data: an Android home-screen widget and 19 versioned PostgreSQL migrations with data backfills",
    ],
  },
];

// Helpers used across the app

export const featuredProjects = projects.filter((p) => p.featured);

export const allTags = Array.from(
  new Set(projects.flatMap((p) => p.tags))
).sort();

export const allTechStack = Array.from(
  new Set(projects.flatMap((p) => p.techStack))
).sort();

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}
export function getProjectsByTag(tag: string): Project[] {
  return projects.filter((p) => p.tags.includes(tag));
}