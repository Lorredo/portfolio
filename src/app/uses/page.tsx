import { Metadata } from 'next';
import Uses from '@/components/sections/Uses';

export const metadata: Metadata = {
  title: 'Uses',
  description: 'My development setup — hardware, software, and tools I use every day.',
};

export default function UsesPage() {
  return <Uses />;
}
