'use client';

import { HTMLAttributes, useRef, useState } from 'react';

export default function CodeBlock({ children, ...props }: HTMLAttributes<HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (preRef.current?.textContent) {
      await navigator.clipboard.writeText(preRef.current.textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative group/code">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 z-10 opacity-0 group-hover/code:opacity-100 transition-opacity rounded-md border border-foreground/10 bg-foreground/5 px-2 py-1 text-[11px] text-foreground/40 hover:border-foreground/20 hover:text-foreground/70"
      >
        {copied ? '✓ Copied' : 'Copy'}
      </button>
      <pre
        ref={preRef}
        className="overflow-x-auto rounded-xl border border-foreground/8 bg-foreground/[0.04] p-5 text-sm leading-relaxed"
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
