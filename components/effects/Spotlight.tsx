"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface SpotlightProps {
  className?: string;
  size?: number;
}

export function Spotlight({ className = "", size = 400 }: SpotlightProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className={`pointer-events-none overflow-hidden ${className}`}>
      {/* Main spotlight */}
      <motion.div
        className="fixed rounded-full"
        style={{
          width: size,
          height: size,
          x: spotlightX,
          y: spotlightY,
          translateX: "-50%",
          translateY: "-50%",
          background: `radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, rgba(20, 184, 166, 0.06) 40%, transparent 70%)`,
        }}
      />

      {/* Inner bright core */}
      <motion.div
        className="fixed rounded-full"
        style={{
          width: size * 0.5,
          height: size * 0.5,
          x: spotlightX,
          y: spotlightY,
          translateX: "-50%",
          translateY: "-50%",
          background: `radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)`,
        }}
      />

      {/* Outer glow */}
      <motion.div
        className="fixed rounded-full blur-3xl"
        style={{
          width: size * 1.5,
          height: size * 1.5,
          x: spotlightX,
          y: spotlightY,
          translateX: "-50%",
          translateY: "-50%",
          background: `radial-gradient(circle, rgba(45, 212, 191, 0.08) 0%, transparent 60%)`,
        }}
      />
    </div>
  );
}
