'use client';

import { useEffect, useState } from 'react';

type Heading = {
  id: string;
  text: string;
  level: number;
};

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('article h2[id], article h3[id]'));
    const parsedHeadings = elements.map(el => ({
      id: el.id,
      text: el.textContent || '',
      level: el.tagName === 'H3' ? 3 : 2
    }));

    const frameId = requestAnimationFrame(() => {
      setHeadings(parsedHeadings);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0% -60% 0%' }
    );

    elements.forEach(el => observer.observe(el));
    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  if (headings.length < 2) return null;

  return (
    <nav className="sticky top-28">
      <div className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/30 mb-3">
        Contents
      </div>
      <ul className="flex flex-col gap-1">
        {headings.map(heading => (
          <li key={heading.id} className={heading.level === 3 ? 'pl-3' : ''}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`text-sm leading-relaxed transition-colors block py-0.5 ${
                activeId === heading.id 
                  ? 'text-emerald-400' 
                  : 'text-foreground/35 hover:text-foreground/65'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
