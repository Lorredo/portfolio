'use client';

import { useEffect, useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export default function CursorGlow() {
  const isInteractiveDevice = useSyncExternalStore(
    emptySubscribe,
    () => !('ontouchstart' in window),
    () => false
  );

  useEffect(() => {
    if (!isInteractiveDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isInteractiveDevice]);

  if (!isInteractiveDevice) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[25]"
      style={{
        background: 'radial-gradient(600px circle at var(--cursor-x, -100%) var(--cursor-y, -100%), rgba(110,231,183,0.05), transparent 80%)',
      }}
    />
  );
}
