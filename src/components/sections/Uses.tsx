import React from 'react';

const hardware = [
  { name: 'MacBook Pro', desc: '14" M2 Pro, 32GB RAM - Main workstation.' },
  { name: 'Studio Display', desc: '27" 5K Retina display for crisp text.' },
  { name: 'Custom Mechanical Keyboard', desc: 'Keychron Q1 Pro with Holy Panda switches.' },
  { name: 'Logitech MX Master 3S', desc: 'The best mouse for productivity.' }
];

const software = [
  { name: 'VS Code', desc: 'Theme: One Dark Pro, Font: Geist Mono.' },
  { name: 'Extensions', desc: 'Prettier, ESLint, GitLens, Tailwind CSS IntelliSense.' },
  { name: 'iTerm2', desc: 'zsh + Oh My Zsh + starship prompt.' }
];

const design = [
  { name: 'Figma', desc: 'For UI/UX design and prototyping.' },
  { name: 'Excalidraw', desc: 'For quick wireframes and flowcharts.' }
];

const productivity = [
  { name: 'Notion', desc: 'Second brain, notes, and documentation.' },
  { name: 'Linear', desc: 'Task and project management.' },
  { name: 'Slack', desc: 'Team communication.' }
];

const stack = [
  { name: 'Next.js 16 App Router', desc: 'React framework for the web.' },
  { name: 'Tailwind CSS v4', desc: 'Utility-first CSS framework.' },
  { name: 'Framer Motion', desc: 'Animation library for React.' },
  { name: 'Prisma + Supabase', desc: 'Database ORM and hosting.' },
  { name: 'Vercel', desc: 'Hosting and CI/CD.' }
];

function CategorySection({ title, items }: { title: string, items: { name: string, desc: string }[] }) {
  return (
    <section className="mb-16">
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/30 mb-6">{title}</h2>
      <ul className="flex flex-col">
        {items.map((item, i) => (
          <li key={item.name} className={`flex flex-col sm:flex-row sm:items-start py-4 ${i !== 0 ? 'border-t border-foreground/6' : ''}`}>
            <span className="font-semibold text-foreground sm:w-1/3 mb-1 sm:mb-0 shrink-0">{item.name}</span>
            <span className="text-foreground/45 sm:w-2/3">{item.desc}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Uses() {
  return (
    <div className="min-h-screen bg-background px-6 py-24 text-foreground">
      <div className="max-w-3xl mx-auto">
        <header className="mb-20">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Uses</h1>
          <p className="text-lg text-foreground/60">
            A somewhat comprehensive list of tools, apps, hardware, and more that I use on a daily basis.
          </p>
        </header>

        <CategorySection title="Hardware" items={hardware} />
        <CategorySection title="Editor & Terminal" items={software} />
        <CategorySection title="Design" items={design} />
        <CategorySection title="Productivity" items={productivity} />
        <CategorySection title="This site is built with" items={stack} />
      </div>
    </div>
  );
}
