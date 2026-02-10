"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skills = [
  { name: "TypeScript", icon: "TS" },
  { name: "React", icon: "⚛️" },
  { name: "Python", icon: "🐍" },
  { name: "Rust", icon: "🦀" },
  { name: "AI/LLMs", icon: "🤖" },
  { name: "Convex", icon: "◈" },
  { name: "FastAPI", icon: "⚡" },
  { name: "Docker", icon: "🐳" },
];

const funFacts = [
  "AI Agent Builder",
  "Voice UI Explorer",
  "Security+ Certified",
  "Automation Enthusiast",
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section id="about" className="py-32 px-6">
      <motion.div
        ref={ref}
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider">ABOUT ME</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Building the future,
            <br />
            <span className="gradient-text">one line at a time</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Avatar / Visual */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl rotate-6" />
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-3xl -rotate-3" />

              {/* Main card */}
              <div className="relative bg-card border border-border rounded-3xl p-8 h-full flex flex-col justify-center items-center">
                {/* Animated avatar placeholder */}
                <motion.div
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl font-bold text-primary-foreground mb-6"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(56, 189, 248, 0.3)",
                      "0 0 40px rgba(45, 212, 191, 0.3)",
                      "0 0 20px rgba(56, 189, 248, 0.3)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  AB
                </motion.div>

                <h3 className="text-2xl font-bold mb-2">Alex Brown</h3>
                <p className="text-muted-foreground text-center">
                  Developer & Creator
                </p>

                {/* Fun facts */}
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  {funFacts.map((fact, i) => (
                    <motion.span
                      key={fact}
                      className="px-3 py-1 bg-secondary rounded-full text-sm text-secondary-foreground"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      {fact}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I&apos;m a developer obsessed with AI agents and automation. From building
              multi-agent systems that collaborate on complex tasks to creating voice-powered
              assistants and real-time dashboards, I love pushing the boundaries of what&apos;s possible
              when you combine modern web tech with AI.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              With a background in IT and a CompTIA Security+ certification, I bring a
              security-first mindset to everything I build. Currently focused on autonomous
              agent architectures, real-time data platforms, and making AI tools that actually
              help people get things done.
            </p>

            {/* Skills grid */}
            <div className="pt-6">
              <h4 className="text-sm font-mono text-primary mb-4 tracking-wider">
                TECHNOLOGIES I WORK WITH
              </h4>
              <div className="grid grid-cols-4 gap-3">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    className="group relative bg-secondary/50 hover:bg-secondary rounded-xl p-3 text-center transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 + i * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <span className="text-2xl block mb-1">{skill.icon}</span>
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
