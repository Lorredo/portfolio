// components/sections/TechMarquee.tsx
// Endless strip of the tech I use. Logos are from Simple Icons (CC0).
import {
  siApachekafka,
  siDart,
  siDocker,
  siExpo,
  siFastapi,
  siFirebase,
  siFlutter,
  siGithubactions,
  siGitlab,
  siGo,
  siNextdotjs,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

const TECH: { icon: SimpleIcon; label: string }[] = [
  { icon: siGo, label: "Go" },
  { icon: siPython, label: "Python" },
  { icon: siFastapi, label: "FastAPI" },
  { icon: siFlutter, label: "Flutter" },
  { icon: siDart, label: "Dart" },
  { icon: siReact, label: "React Native" },
  { icon: siExpo, label: "Expo" },
  { icon: siTypescript, label: "TypeScript" },
  { icon: siNextdotjs, label: "Next.js" },
  { icon: siTailwindcss, label: "Tailwind CSS" },
  { icon: siPostgresql, label: "PostgreSQL" },
  { icon: siRedis, label: "Redis" },
  { icon: siApachekafka, label: "Kafka" },
  { icon: siFirebase, label: "Firebase" },
  { icon: siDocker, label: "Docker" },
  { icon: siGitlab, label: "GitLab CI/CD" },
  { icon: siGithubactions, label: "GitHub Actions" },
];

function Logo({ icon, label }: { icon: SimpleIcon; label: string }) {
  return (
    <li
      className="group flex shrink-0 items-center gap-2.5 text-foreground/40 transition-colors hover:text-foreground"
      style={{ ["--brand" as string]: `#${icon.hex}` }}
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current transition-colors group-hover:fill-[var(--brand)]" aria-hidden>
        <path d={icon.path} />
      </svg>
      <span className="whitespace-nowrap text-sm font-medium">{label}</span>
    </li>
  );
}

export default function TechMarquee() {
  return (
    <section aria-label="Technologies I work with" className="border-y border-foreground/6 bg-background py-8">
      <div className="group/marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        {/* Two identical lists side by side; sliding by -50% loops seamlessly. */}
        <div className="flex w-max animate-[marquee_45s_linear_infinite] group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-12 pr-12">
              {TECH.map((t) => (
                <Logo key={t.label} {...t} />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
