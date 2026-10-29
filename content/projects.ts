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
      "A full-stack mobile app for tracking spending, budgets and accounts, with PIN and biometric security.",
    // One line per paragraph: the detail page renders newlines as line breaks
    description: `FinTrack is a cross-platform personal finance app. Users track income, expenses and transfers across multiple accounts, set budgets per category over flexible periods, and see trends in reports. It's a monorepo with a React Native (Expo) client and a Go REST API backed by serverless PostgreSQL on Neon, deployed in Docker on Render.

I built it solo — design, mobile, backend, database and deployment. The Go backend is layered (routes → handlers → services → database) with JWT middleware and centralized validation; the mobile app uses a feature-based structure, a custom design system and a React Query data layer with central error handling. Schema changes ship as versioned migrations that backfill existing data.`,
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
      "Expo EAS",
    ],
    status: "in-progress",
    year: 2026,
    githubUrl: "https://github.com/Lorredo/fintrack",
    featured: true,
    coverImage: "/projects/fintrack/cover.png",
    platform: "cross-platform",
    apk: {
      url: "https://github.com/Lorredo/fintrack/releases/download/v1.0.2/fintrack-1.0.2-release.apk",
      version: "1.0.2",
      size: "45 MB",
    },
    demoVideo: "/projects/fintrack/demo.mp4",
    screens: [
      { label: "Dashboard", src: "/projects/fintrack/dashboard.png" },
      { label: "Budgets", src: "/projects/fintrack/budgets.png" },
      { label: "Transactions", src: "/projects/fintrack/transactions.png" },
      { label: "Reports", src: "/projects/fintrack/reports.png" },
      { label: "PIN Lock", src: "/projects/fintrack/pin-lock.png" },
    ],
    highlights: [
      "Multi-account ledger with transfers between cash, bank and other accounts",
      "Flexible category budgets with atomic rebalancing in a single database transaction",
      "Monthly trends, period-over-period category comparison and CSV export",
      "JWT access/refresh tokens, Google & Apple sign-in, PIN lock and biometric unlock",
      "Android home-screen widget showing remaining budget, synced via MMKV",
      "11 versioned migrations with data backfills and composite indexes",
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