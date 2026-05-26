// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";
import Footer from "@/components/layout/Footer";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Artemio III Lorredo — Full Stack Developer",
  description: "Full stack developer building fast, accessible web products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.className} bg-background antialiased`}>
        <ThemeProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}