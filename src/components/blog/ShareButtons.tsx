'use client';

import { useState, useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export default function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = useSyncExternalStore(
    emptySubscribe,
    () => window.location.href,
    () => `https://artem.dev/blog/${slug}`
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-foreground/40">Share:</span>
      <a 
        href={twitterUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="rounded-xl border border-foreground/8 bg-foreground/4 px-3 py-1.5 text-sm text-foreground/45 transition hover:border-foreground/18 hover:text-foreground/80"
      >
        Twitter/X
      </a>
      <a 
        href={linkedinUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="rounded-xl border border-foreground/8 bg-foreground/4 px-3 py-1.5 text-sm text-foreground/45 transition hover:border-foreground/18 hover:text-foreground/80"
      >
        LinkedIn
      </a>
      <button 
        onClick={handleCopy}
        className="rounded-xl border border-foreground/8 bg-foreground/4 px-3 py-1.5 text-sm text-foreground/45 transition hover:border-foreground/18 hover:text-foreground/80"
      >
        {copied ? '✓ Copied!' : 'Copy link'}
      </button>
    </div>
  );
}
