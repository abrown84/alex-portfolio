"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Scene } from "@/components/three/Scene";
import { FloatingShapes } from "@/components/three/FloatingShapes";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useIsMobile } from "@/hooks/useMediaQuery";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { normalizedX, normalizedY } = useMousePosition();
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      {!isMobile && (
        <div className="absolute inset-0 z-0">
          <Scene className="w-full h-full">
            <FloatingShapes mousePosition={{ x: normalizedX, y: normalizedY }} />
          </Scene>
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background z-10 pointer-events-none" />

      {/* Mobile gradient background */}
      {isMobile && (
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
        </div>
      )}

      {/* Content */}
      <motion.div
        className="relative z-20 text-center px-6 max-w-4xl mx-auto"
        style={{ opacity, y, scale }}
      >
        <motion.p
          custom={0}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-muted-foreground text-lg mb-4 font-mono"
        >
          Hello, I&apos;m
        </motion.p>

        <motion.h1
          custom={1}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          <span className="gradient-text">Alex Brown</span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          Building AI agents, voice interfaces, and automation tools that get things done
        </motion.p>

        <motion.div
          custom={3}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-4 justify-center"
        >
          <motion.a
            href="#projects"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full font-medium hover:shadow-lg hover:shadow-primary/25 transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            View My Work
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

          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-border hover:border-primary rounded-full font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-muted-foreground"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs font-mono tracking-wider">SCROLL</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 256 256"
            fill="currentColor"
          >
            <path d="M216.49,119.51a12,12,0,0,1-17,17L140,77v139a12,12,0,0,1-24,0V77L56.49,136.49a12,12,0,0,1-17-17l72-72a12,12,0,0,1,17,0Z" transform="rotate(180 128 128)" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
