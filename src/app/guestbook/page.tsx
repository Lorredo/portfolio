import { Metadata } from 'next';
import Guestbook from '@/components/sections/Guestbook';
// Replace with actual import if analytics is available, using a no-op fallback here if missing
// import { incrementPageView } from '@/lib/analytics';

export const metadata: Metadata = {
  title: 'Guestbook',
  description: 'Leave a message — say hi, share thoughts, or just let me know you stopped by.',
};

export default function GuestbookPage() {
  // incrementPageView('/guestbook');

  return (
    <div className="min-h-screen bg-background px-6 py-24 text-foreground">
      <div className="max-w-3xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Guestbook</h1>
          <p className="text-lg text-foreground/60">
            Leave a message &mdash; say hi, share thoughts, or just let me know you stopped by.
          </p>
        </header>
        <Guestbook />
      </div>
    </div>
  );
}
