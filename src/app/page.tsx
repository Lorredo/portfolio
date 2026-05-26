// app/page.tsx
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import { incrementPageView } from "@/lib/analytics";
import Skills from "@/components/sections/Skills";
import Testimonials from "@/components/sections/Testimonials";


export default async function Home() {
  await incrementPageView("/");    
  return (
    <main>
      <Hero />
      <Experience />
      <Skills />
      <Testimonials />
    </main>
  );
}