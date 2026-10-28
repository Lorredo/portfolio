'use client';

import { useState, useEffect } from 'react';

type Entry = {
  id: string;
  name: string;
  message: string;
  emoji?: string;
  createdAt: string;
};

function formatRelativeDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}

export default function Guestbook() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [emoji, setEmoji] = useState('');

  useEffect(() => {
    fetch('/api/guestbook')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEntries(data);
        } else if (data.entries && Array.isArray(data.entries)) {
          setEntries(data.entries);
        }
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message, emoji })
      });
      
      if (res.ok) {
        setStatus('success');
        setName('');
        setMessage('');
        setEmoji('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="max-w-2xl mx-auto">
      <div className="rounded-2xl border border-foreground/8 bg-foreground/[0.03] p-6 mb-12">
        <h3 className="text-xl font-bold text-foreground mb-6">Sign the Guestbook</h3>
        
        {status === 'success' ? (
          <div className="rounded-xl bg-emerald-500/10 p-4 text-emerald-400 text-sm">
            Your message is pending approval. Thanks!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex gap-4">
              <input
                required
                type="text"
                placeholder="Your name"
                className="flex-1 rounded-xl border border-foreground/12 bg-foreground/4 px-4 py-3 text-sm text-foreground focus:border-emerald-500/50 focus:outline-none"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="😊"
                maxLength={2}
                className="w-16 rounded-xl border border-foreground/12 bg-foreground/4 px-4 py-3 text-center text-sm text-foreground focus:border-emerald-500/50 focus:outline-none"
                value={emoji}
                onChange={e => setEmoji(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <textarea
                required
                maxLength={280}
                placeholder="Your message..."
                rows={3}
                className="w-full rounded-xl border border-foreground/12 bg-foreground/4 px-4 py-3 text-sm text-foreground focus:border-emerald-500/50 focus:outline-none resize-none"
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
              <span className="absolute bottom-3 right-4 text-xs text-foreground/30">
                {message.length}/280
              </span>
            </div>
            
            <button
              type="submit"
              disabled={status === 'loading'}
              className="rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background hover:bg-foreground/90 disabled:opacity-50 transition-colors self-start"
            >
              {status === 'loading' ? 'Sending...' : 'Sign'}
            </button>
            {status === 'error' && (
              <p className="text-red-400 text-sm mt-2">Failed to submit. Please try again.</p>
            )}
          </form>
        )}
      </div>

      <div className="flex flex-col gap-8">
        {entries.length === 0 ? (
          <div className="text-center py-10 text-foreground/30">
            Be the first to sign the guestbook!
          </div>
        ) : (
          entries.map(entry => (
            <div key={entry.id} className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                {entry.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-foreground">{entry.name}</span>
                  {entry.emoji && <span>{entry.emoji}</span>}
                  <span className="text-xs text-foreground/40">
                    {formatRelativeDate(entry.createdAt)}
                  </span>
                </div>
                <p className="text-foreground/70 text-sm leading-relaxed">{entry.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
