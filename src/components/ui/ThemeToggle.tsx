// src/components/ui/ThemeToggle.tsx
"use client";

import { useTheme } from "@/components/providers/ThemeProvider";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        // Sun icon for dark mode (to switch to light)
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5"/>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
      ) : (
        // Moon icon for light mode (to switch to dark)
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </motion.button>
  );
}