export type ProjectStatus = "completed" | "in-progress" | "archived";

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
};

export const projects: Project[] = [
  {
    slug: "saas-task-manager",
    title: "TaskFlow — SaaS Task Manager",
    summary:
      "A multi-tenant SaaS productivity app with workspaces, real-time collaboration, and role-based access control.",
    description: `TaskFlow is a full-featured project management platform built for small teams. 
It supports multiple workspaces per organization, drag-and-drop kanban boards, 
real-time updates via WebSockets, and a Stripe-powered subscription system with 
free and pro tiers. Auth is handled by Clerk with Google and GitHub OAuth.`,
    tags: ["Full Stack", "SaaS", "Real-time"],
    techStack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
      "Clerk",
      "Stripe",
      "Pusher",
    ],
    status: "completed",
    year: 2024,
    liveUrl: "https://taskflow.demo.dev",
    githubUrl: "https://github.com/yourusername/taskflow",
    featured: true,
    coverImage: "/projects/taskflow.png",
  },
  {
    slug: "ecommerce-storefront",
    title: "ShopKit — Headless E-commerce",
    summary:
      "A headless storefront built on Next.js Commerce with Shopify as backend, featuring instant search and optimistic UI.",
    description: `ShopKit is a high-performance storefront that decouples the frontend from 
Shopify using the Storefront API. Products, collections, and cart state are 
fetched via GraphQL. Algolia powers instant product search with faceted filters. 
The site scores 98+ on Lighthouse across all categories thanks to aggressive 
ISR caching and image optimization.`,
    tags: ["Full Stack", "E-commerce", "Performance"],
    techStack: [
      "Next.js",
      "TypeScript",
      "Shopify Storefront API",
      "GraphQL",
      "Algolia",
      "Tailwind CSS",
    ],
    status: "completed",
    year: 2024,
    liveUrl: "https://shopkit.demo.dev",
    githubUrl: "https://github.com/yourusername/shopkit",
    featured: true,
    coverImage: "/projects/shopkit.png",
  },
  {
    slug: "ai-resume-builder",
    title: "ResumeAI — AI-Powered Resume Builder",
    summary:
      "A resume builder that uses Claude AI to tailor your resume to any job description, with PDF export.",
    description: `ResumeAI lets users paste a job description and their work history, 
then uses the Anthropic Claude API to generate a tailored, ATS-optimized resume. 
Users can edit the output in a rich text editor, preview in real time, and export 
to PDF. Authentication, usage limits, and billing are managed with Clerk and Stripe.`,
    tags: ["Full Stack", "AI", "SaaS"],
    techStack: [
      "Next.js",
      "TypeScript",
      "Anthropic Claude API",
      "Prisma",
      "PostgreSQL",
      "Clerk",
      "Stripe",
      "React-PDF",
    ],
    status: "completed",
    year: 2024,
    liveUrl: "https://resumeai.demo.dev",
    githubUrl: "https://github.com/yourusername/resumeai",
    featured: true,
    coverImage: "/projects/resumeai.png",
  },
  {
    slug: "devblog-platform",
    title: "DevBlog — Developer Blogging Platform",
    summary:
      "A Medium-style blogging platform for developers with MDX support, syntax highlighting, and newsletter integration.",
    description: `DevBlog is a content platform purpose-built for technical writers. 
Posts are written in MDX with full support for code blocks (Shiki syntax highlighting), 
diagrams, and custom components. Readers can bookmark posts, follow authors, 
and subscribe to a newsletter powered by Resend. The platform is fully open source 
and deployable on Vercel with one click.`,
    tags: ["Full Stack", "Content", "Open Source"],
    techStack: [
      "Next.js",
      "TypeScript",
      "MDX",
      "Shiki",
      "Prisma",
      "PostgreSQL",
      "Resend",
      "Tailwind CSS",
    ],
    status: "completed",
    year: 2023,
    liveUrl: "https://devblog.demo.dev",
    githubUrl: "https://github.com/yourusername/devblog",
    featured: false,
    coverImage: "/projects/devblog.png",
  },
  {
    slug: "realtime-chat-app",
    title: "Chatter — Real-time Chat App",
    summary:
      "A Slack-inspired chat application with channels, threads, file uploads, and end-to-end encryption.",
    description: `Chatter is a real-time messaging app built to explore WebSocket architecture 
at scale. It supports public and private channels, threaded replies, emoji reactions, 
and file uploads to S3. Messages are encrypted client-side before transmission. 
The backend is a standalone Express + Socket.io server containerized with Docker 
and deployed on Railway.`,
    tags: ["Full Stack", "Real-time", "Backend"],
    techStack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Socket.io",
      "PostgreSQL",
      "Redis",
      "AWS S3",
      "Docker",
    ],
    status: "completed",
    year: 2023,
    liveUrl: "https://chatter.demo.dev",
    githubUrl: "https://github.com/yourusername/chatter",
    featured: false,
    coverImage: "/projects/chatter.png",
  },
  {
    slug: "finance-dashboard",
    title: "Fintrack — Personal Finance Dashboard",
    summary:
      "A personal finance tracker that connects to bank accounts via Plaid, with AI-powered spending insights.",
    description: `Fintrack aggregates transactions from multiple bank accounts using the Plaid API 
and categorizes spending automatically. A monthly insights feature uses Claude AI 
to summarize spending patterns and suggest budgeting improvements in plain language. 
Charts are built with Recharts and all sensitive data is encrypted at rest.`,
    tags: ["Full Stack", "Finance", "AI"],
    techStack: [
      "Next.js",
      "TypeScript",
      "Plaid API",
      "Anthropic Claude API",
      "Prisma",
      "PostgreSQL",
      "Recharts",
      "Tailwind CSS",
    ],
    status: "in-progress",
    year: 2025,
    githubUrl: "https://github.com/yourusername/fintrack",
    featured: false,
    coverImage: "/projects/fintrack.png",
  },
  {
    slug: "cli-dev-tool",
    title: "Scaffy — Project Scaffolding CLI",
    summary:
      "A Node.js CLI tool that scaffolds full stack projects with opinionated templates, used by 500+ developers.",
    description: `Scaffy is an open-source CLI that generates production-ready project starters 
for Next.js, Express, and tRPC stacks. It asks a few questions via interactive prompts 
and outputs a fully configured project with TypeScript, ESLint, Prettier, Husky, 
Docker, and GitHub Actions pre-configured. Published on npm with 500+ weekly downloads.`,
    tags: ["Backend", "CLI", "Open Source", "DevTools"],
    techStack: ["Node.js", "TypeScript", "Commander.js", "Inquirer.js", "npm"],
    status: "completed",
    year: 2023,
    liveUrl: "https://www.npmjs.com/package/scaffy",
    githubUrl: "https://github.com/yourusername/scaffy",
    featured: false,
    coverImage: "/projects/scaffy.png",
  },
  {
    slug: "portfolio-v2",
    title: "This Portfolio",
    summary:
      "My personal portfolio and blog — built with Next.js 14, Tailwind CSS, MDX, and deployed on Vercel.",
    description: `The portfolio you're looking at right now. Built with Next.js App Router, 
Tailwind CSS v4, shadcn/ui, and MDX for the blog. Features include dark mode, 
animated sections with Framer Motion, a visitor counter backed by Postgres, 
GitHub stats integration, and OG image generation for every page and blog post.`,
    tags: ["Full Stack", "Frontend", "Open Source"],
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
      "MDX",
      "Prisma",
      "PostgreSQL",
    ],
    status: "in-progress",
    year: 2025,
    githubUrl: "https://github.com/yourusername/portfolio",
    featured: false,
    coverImage: "/projects/portfolio.png",
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