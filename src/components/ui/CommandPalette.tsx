'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, type Project } from '../../../content/projects';

type CommandItem = { category: string; label: string; href: string; description?: string };

const staticPages: CommandItem[] = [
  { category: 'Pages', label: 'Home', href: '/', description: 'Return to the homepage' },
  { category: 'Pages', label: 'Projects', href: '/projects', description: 'View all my work' },
  { category: 'Pages', label: 'Blog', href: '/blog', description: 'Read my thoughts and tutorials' },
  { category: 'Pages', label: 'About', href: '/about', description: 'Learn more about me' },
  { category: 'Pages', label: 'Contact', href: '/contact', description: 'Get in touch' },
  { category: 'Pages', label: 'Guestbook', href: '/guestbook', description: 'Leave a message' },
  { category: 'Pages', label: 'Uses', href: '/uses', description: 'My development setup' },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const projectItems: CommandItem[] = (projects || []).map((p: Project) => ({
    category: 'Projects',
    label: p.title,
    href: `/projects/${p.slug}`,
    description: p.summary
  }));

  const allItems = [...staticPages, ...projectItems];
  
  const filteredItems = allItems.filter(item => 
    item.label.toLowerCase().includes(query.toLowerCase()) || 
    (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const item = filteredItems[selectedIndex];
      if (item) {
        setIsOpen(false);
        router.push(item.href);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20, x: '-50%' }}
            animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, scale: 0.95, y: -20, x: '-50%' }}
            className="fixed left-1/2 top-[20%] w-full max-w-lg z-[151] overflow-hidden rounded-2xl border border-foreground/8 bg-background shadow-2xl"
          >
            <div className="border-b border-foreground/8">
              <input
                autoFocus
                className="w-full bg-transparent px-4 py-4 text-sm text-foreground placeholder-white/30 focus:outline-none"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
              />
            </div>
            
            <div className="max-h-80 overflow-y-auto py-2">
              {filteredItems.length === 0 ? (
                <div className="px-4 py-6 text-center text-sm text-foreground/40">No results found.</div>
              ) : (
                filteredItems.map((item, index) => {
                  const showHeader = index === 0 || filteredItems[index - 1].category !== item.category;
                  return (
                    <div key={item.href}>
                      {showHeader && (
                        <div className="px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest text-foreground/25">
                          {item.category}
                        </div>
                      )}
                      <div
                        className={`px-4 py-3 cursor-pointer flex flex-col gap-0.5 ${index === selectedIndex ? 'bg-foreground/8' : 'hover:bg-foreground/4'}`}
                        onClick={() => {
                          setIsOpen(false);
                          router.push(item.href);
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                      >
                        <span className="text-sm font-medium text-foreground">{item.label}</span>
                        {item.description && <span className="text-xs text-foreground/40">{item.description}</span>}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="border-t border-foreground/8 px-4 py-3 text-xs text-foreground/30 flex justify-between">
              <span>ESC to close &middot; &uarr;&darr; navigate &middot; Enter to go</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
