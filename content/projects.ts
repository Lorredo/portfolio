export type ProjectStatus = "completed" | "in-progress" | "archived";

export type ProjectPlatform = "web" | "ios" | "android" | "cross-platform";

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
  coverImage: string; // path under /public/projects/

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
    title: "FinTrack — Personal Finance & Budget Tracker",
    summary:
      "A full-stack mobile finance app for Filipino earners: Safe to Spend until payday, bills, utang and paluwagan, receipt scanning, and offline saving.",
    // One line per paragraph: the detail page renders newlines as line breaks
    description: `FinTrack is a personal finance app built around how pay works in the Philippines. It tracks income, expenses and transfers across wallets like GCash, Maya and bank accounts, and works out how much is Safe to Spend each day until the next 15th or 30th payday: from your salary and allowances, minus bills, savings and what you've already spent, never more than your wallets hold.

It also handles recurring bills with reminders, one-tap salary and allowance recording on payday, utang (money lent and borrowed) and paluwagan rounds, category budgets and PDF/Excel reports. Receipt screenshots from GCash, Maya or a bank are read on the phone with ML Kit to fill in a transaction, and changes made without signal are saved on the phone and synced later.

I built it solo: design, mobile, backend, database and deployment. It's a monorepo with a React Native (Expo) client and a Go REST API on serverless PostgreSQL (Neon), deployed in Docker on Render. The backend is layered (routes → handlers → services → database) with JWT middleware, validation and integration tests against a real database; the app uses a feature-based structure, a custom design system and a TanStack Query data layer with an encrypted offline cache.`,
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
      url: "https://github.com/Lorredo/fintrack/releases/download/v1.6.1/fintrack-1.6.1-release.apk",
      version: "1.6.1",
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
      "Safe to Spend per day until payday, planned from salary and allowances and capped by real wallet balances",
      "Offline saving: an encrypted outbox syncs changes in order, and phone-generated ids make retries safe",
      "On-device receipt scanning with ML Kit: share a GCash, Maya or bank screenshot to fill in a transaction",
      "Recurring bills, payday Record pay, utang and paluwagan tracking, all with local reminders",
      "Multi-wallet ledger with transfers and fees, category budgets with atomic rebalancing, PDF and Excel reports",
      "Google sign-in, JWT refresh-token rotation, PIN lock with biometrics, and an encrypted local store",
      "Android home-screen widget, and 18 versioned PostgreSQL migrations with data backfills",
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