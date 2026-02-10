"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LogoClickerProps {
  children: React.ReactNode;
}

export function LogoClicker({ children }: LogoClickerProps) {
  const [clickCount, setClickCount] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    // Add click particle
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setParticles((prev) => [
      ...prev,
      { id: Date.now(), x, y },
    ]);

    setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 1000);

    setClickCount((prev) => {
      const newCount = prev + 1;

      if (newCount === 7) {
        setShowSecret(true);
        setTimeout(() => setShowSecret(false), 4000);
        return 0;
      }

      return newCount;
    });
  }, []);

  return (
    <div className="relative inline-block">
      <motion.div
        onClick={handleClick}
        className="cursor-pointer select-none"
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.div>

      {/* Click particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute pointer-events-none text-2xl"
            initial={{ x: particle.x, y: particle.y, opacity: 1, scale: 0.5 }}
            animate={{ y: particle.y - 50, opacity: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            ✨
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Progress indicator */}
      {clickCount > 0 && clickCount < 7 && (
        <motion.div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.div
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${
                i < clickCount ? "bg-primary" : "bg-muted"
              }`}
              animate={i < clickCount ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.2 }}
            />
          ))}
        </motion.div>
      )}

      {/* Secret message */}
      <AnimatePresence>
        {showSecret && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-card/95 backdrop-blur-xl border border-accent/50 rounded-2xl p-8 text-center shadow-2xl shadow-accent/20 max-w-sm mx-4"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              transition={{ type: "spring", damping: 12 }}
            >
              <motion.div
                className="text-5xl mb-3"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                🚀
              </motion.div>
              <h3 className="text-xl font-bold mb-2">Achievement Unlocked!</h3>
              <p className="text-muted-foreground text-sm">
                You clicked the logo 7 times. You&apos;re persistent, I like that!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
