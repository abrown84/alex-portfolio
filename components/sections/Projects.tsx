"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/Card";

interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
  color: string;
}

const projects: Project[] = [
  {
    title: "Daily Bag",
    description: "Gamified family chore management app with points, levels, streaks, leaderboards, and Stripe-powered cash rewards. Built as a PWA with real-time sync, offline support, and premium subscriptions.",
    tags: ["React", "Convex", "Stripe", "PWA"],
    link: "https://daily-bag.vercel.app",
    github: "https://github.com/abrown84/daily-bag",
    featured: true,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Polymarket Fact Checker",
    description: "AI-powered fact checker using prediction markets. Parses questions into claims, retrieves market data via embeddings, reranks with GPT-4, and provides confidence-scored answers with evidence.",
    tags: ["TypeScript", "Convex", "OpenAI"],
    link: "https://polymarket-fact-checker.vercel.app",
    github: "https://github.com/abrown84/polymarket-fact-checker",
    featured: true,
    color: "from-sky-500 to-cyan-500",
  },
  {
    title: "EconSight AI",
    description: "AI-powered economic monitoring platform tracking 30+ indicators with real-time analysis, forecasting, and an economic health score.",
    tags: ["Python", "FastAPI", "Next.js", "AI"],
    color: "from-teal-500 to-emerald-500",
  },
  {
    title: "Autonomous Agent System",
    description: "Multi-agent architecture where specialized AI agents collaborate on complex tasks. Features an orchestrator, developer agent, and devops agent.",
    tags: ["TypeScript", "Claude API", "Multi-Agent"],
    color: "from-violet-500 to-indigo-500",
  },
  {
    title: "Agent Progress",
    description: "Desktop overlay for real-time AI agent task progress. A floating window that visualizes what your AI agents are working on.",
    tags: ["Rust", "Tauri", "Desktop App"],
    github: "https://github.com/abrown84/agent-progress",
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Real-time Voice Assistant",
    description: "Voice-powered AI assistant using OpenAI's Realtime API with memory, SQL integration, and tool chaining.",
    tags: ["Python", "OpenAI", "Voice UI"],
    color: "from-cyan-500 to-sky-500",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isFeatured = project.featured;

  return (
    <motion.div
      className={isFeatured ? "md:col-span-2 md:row-span-2" : ""}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <Card
        className={`group h-full ${isFeatured ? "min-h-[400px]" : "min-h-[200px]"} overflow-hidden`}
        glow={isFeatured}
      >
        {/* Gradient accent */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />

        {/* Top gradient bar */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
        />

        <div className={`relative z-10 p-6 h-full flex flex-col ${isFeatured ? "p-8" : ""}`}>
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 256 256"
                fill="white"
              >
                <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM184,96a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,96Zm0,32a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,128Zm0,32a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,160Z" />
              </svg>
            </div>

            <div className="flex gap-2">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="View on GitHub"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                  >
                    <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.55a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.55a8,8,0,0,0,1.1,7.69A41.76,41.76,0,0,1,200,104Z" />
                  </svg>
                </motion.a>
              )}
              {project.link && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="View live demo"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                  >
                    <path d="M224,104a8,8,0,0,1-16,0V59.32l-66.33,66.34a8,8,0,0,1-11.32-11.32L196.68,48H152a8,8,0,0,1,0-16h64a8,8,0,0,1,8,8Zm-40,24a8,8,0,0,0-8,8v72H48V80h72a8,8,0,0,0,0-16H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V136A8,8,0,0,0,184,128Z" />
                  </svg>
                </motion.a>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className={`font-bold mb-2 ${isFeatured ? "text-2xl" : "text-lg"}`}>
              {project.title}
            </h3>
            <p className={`text-muted-foreground ${isFeatured ? "text-base" : "text-sm"} mb-4`}>
              {project.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-secondary/50 rounded-md text-xs font-mono text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32 px-6 bg-secondary/20">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-mono text-sm tracking-wider">PROJECTS</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Things I&apos;ve <span className="gradient-text">Built</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A collection of projects that showcase my skills and passion for creating
            meaningful digital experiences.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* View more */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.a
            href="https://github.com/abrown84"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            whileHover={{ x: 4 }}
          >
            View more on GitHub
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 256 256"
              fill="currentColor"
            >
              <path d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
