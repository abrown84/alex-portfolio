"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface SpotlightProps {
  className?: string;
  size?: number;
}

export function Spotlight({ className = "", size = 400 }: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const container = containerRef.current?.parentElement;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Main spotlight */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          x: spotlightX,
          y: spotlightY,
          translateX: "-50%",
          translateY: "-50%",
          background: `radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, rgba(20, 184, 166, 0.08) 40%, transparent 70%)`,
        }}
      />

      {/* Inner bright core */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 0.5,
          height: size * 0.5,
          x: spotlightX,
          y: spotlightY,
          translateX: "-50%",
          translateY: "-50%",
          background: `radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, transparent 70%)`,
        }}
      />

      {/* Outer glow */}
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          width: size * 1.5,
          height: size * 1.5,
          x: spotlightX,
          y: spotlightY,
          translateX: "-50%",
          translateY: "-50%",
          background: `radial-gradient(circle, rgba(45, 212, 191, 0.1) 0%, transparent 60%)`,
        }}
      />
    </div>
  );
}
