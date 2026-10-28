// app/page.tsx
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import { incrementPageView } from "@/lib/analytics";
import Skills from "@/components/sections/Skills";
import Testimonials from "@/components/sections/Testimonials";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import LatestPosts from "@/components/sections/LatestPosts";
import { getAllPosts } from "@/lib/mdx";

export default async function Home() {
  await incrementPageView("/");
  const latestPosts = getAllPosts().slice(0, 3);
  
  return (
    <main>
      <Hero />
      <FeaturedProjects />
      <LatestPosts posts={latestPosts} />
      <Experience />
      <Skills />
      <Testimonials />
    </main>
  );
}