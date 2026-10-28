'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
// @ts-ignore
import { featuredProjects } from '../../../content/projects';

export default function FeaturedProjects() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="bg-background px-6 py-24 text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/30 mb-4">Work</div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Featured Projects</h2>
            <p className="text-foreground/60">A selection of things I've built.</p>
          </div>
          <Link href="/projects" className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
            View all projects &rarr;
          </Link>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {featuredProjects.map((project: any) => (
            <motion.div variants={item} key={project.slug}>
              <Link 
                href={`/projects/${project.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-foreground/8 bg-foreground/[0.03] p-6 transition-all hover:border-foreground/16 hover:bg-foreground/[0.06]"
              >
                <div className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 transition-transform duration-300 origin-left group-hover:scale-x-100" />
                
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full border border-foreground/10 bg-foreground/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-emerald-400">
                    {project.status || 'Active'}
                  </span>
                  <span className="text-sm text-foreground/40">{project.year}</span>
                </div>
                
                <h3 className="mb-2 text-xl font-bold text-foreground">{project.title}</h3>
                <p className="mb-6 flex-1 text-sm text-foreground/60 line-clamp-3">{project.summary}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.techStack?.slice(0, 4).map((tech: string) => (
                    <span key={tech} className="text-xs text-foreground/40">
                      {tech}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
