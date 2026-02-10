"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Glow effect */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-accent to-primary origin-left blur-sm opacity-70"
        style={{ scaleX }}
      />
      {/* Main bar */}
      <motion.div
        className="relative h-1 bg-gradient-to-r from-primary via-accent to-primary origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}
