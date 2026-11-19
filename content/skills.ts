// Skills shown on the home page (Skills section) and the About page.
// Only list technologies used in real projects (work projects, FinTrack and
// this portfolio).

export type SkillGroup = {
  category: string;
  color: "emerald" | "blue" | "purple" | "amber" | "rose" | "sky";
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Backend",
    color: "emerald",
    skills: ["Go", "Fiber", "GORM", "Python", "FastAPI", "REST APIs"],
  },
  {
    category: "Mobile",
    color: "blue",
    skills: ["Flutter", "Dart", "Provider", "React Native", "Expo", "Firebase Cloud Messaging"],
  },
  {
    category: "Frontend",
    color: "sky",
    skills: ["TypeScript", "Next.js", "React", "Tailwind CSS", "TanStack Query", "Zustand"],
  },
  {
    category: "Data & Messaging",
    color: "purple",
    skills: ["PostgreSQL", "Redis", "SQLite", "Kafka", "WebSockets", "Goose migrations"],
  },
  {
    category: "Security",
    color: "rose",
    skills: ["JWT", "OAuth 2.0", "RBAC", "bcrypt", "Biometric auth", "Encrypted storage"],
  },
  {
    category: "DevOps",
    color: "amber",
    skills: ["Docker", "GitLab CI/CD", "GitHub Actions", "Vercel", "Render", "Expo EAS"],
  },
];

export const tools = [
  "VS Code",
  "Android Studio",
  "Git",
  "GitLab",
  "GitHub",
  "Postman",
  "Claude Code",
  "Google Antigravity",
];
