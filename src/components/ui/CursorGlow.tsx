'use client';

import { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!mounted || isTouchDevice) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[25]"
      style={{
        background: 'radial-gradient(600px circle at var(--cursor-x, -100%) var(--cursor-y, -100%), rgba(110,231,183,0.05), transparent 80%)',
      }}
    />
  );
}
