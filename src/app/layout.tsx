// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Footer from "@/components/layout/Footer";
import CursorGlow from "@/components/ui/CursorGlow";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CommandPalette from "@/components/ui/CommandPalette";
import EasterEgg from "@/components/ui/EasterEgg";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://artem.dev"),
  title: "Artem Lorredo — Full Stack Developer",
  description: "Full stack developer building fast, accessible web products.",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Artem Lorredo",
  "url": "https://artem.dev",
  "jobTitle": "Full Stack Developer",
  "sameAs": [
    "https://github.com/yourusername",
    "https://linkedin.com/in/yourusername"
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.className} bg-background antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ThemeProvider>
          <CursorGlow />
          <ScrollProgress />
          <CommandPalette />
          <EasterEgg />
          
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}