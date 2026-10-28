'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

export default function EasterEgg() {
  const inputBufferRef = useRef<string[]>([]);
  const [showEgg, setShowEgg] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      const newBuffer = [...inputBufferRef.current, key].slice(-KONAMI_CODE.length);
      if (newBuffer.join(',') === KONAMI_CODE.join(',')) {
        inputBufferRef.current = [];
        setShowEgg(true);
      } else {
        inputBufferRef.current = newBuffer;
      }
      if (e.key === 'Escape' && showEgg) {
        setShowEgg(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showEgg]);

  return (
    <AnimatePresence>
      {showEgg && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={() => setShowEgg(false)}
        >
          <motion.div
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="text-center flex flex-col items-center gap-6"
          >
            <div className="text-8xl">🎉</div>
            <h2 className="text-3xl font-bold text-foreground">You found the easter egg!</h2>
            <p className="text-lg text-emerald-400 font-mono">
              &uarr;&uarr;&darr;&darr;&larr;&rarr;&larr;&rarr;BA &mdash; developer of culture.
            </p>
            <p className="text-sm text-foreground/40 mt-8">Click anywhere to close</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
