"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  velocityX: number;
  velocityY: number;
}

function Confetti({ particles }: { particles: Particle[] }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          initial={{
            x: particle.x,
            y: particle.y,
            rotate: particle.rotation,
            scale: 1,
            opacity: 1,
          }}
          animate={{
            x: particle.x + particle.velocityX * 150,
            y: particle.y + particle.velocityY * 300 + 500,
            rotate: particle.rotation + (Math.random() > 0.5 ? 360 : -360),
            scale: 0,
            opacity: 0,
          }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "0%",
          }}
        />
      ))}
    </div>
  );
}

export function KonamiCode() {
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [activated, setActivated] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showMessage, setShowMessage] = useState(false);

  const generateConfetti = useCallback(() => {
    const colors = ["#fb923c", "#fbbf24", "#f97316", "#facc15", "#ef4444", "#fcd34d"];
    const newParticles: Particle[] = [];

    for (let i = 0; i < 150; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 12 + 4,
        rotation: Math.random() * 360,
        velocityX: (Math.random() - 0.5) * 2,
        velocityY: Math.random() * 0.5 + 0.5,
      });
    }

    setParticles(newParticles);
    setTimeout(() => setParticles([]), 3000);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase() === "a" || e.key.toLowerCase() === "b" ? e.key.toLowerCase() : e.key;

      setKeySequence((prev) => {
        const newSequence = [...prev, key].slice(-KONAMI_CODE.length);

        // Check if the sequence matches
        if (newSequence.join(",") === KONAMI_CODE.join(",")) {
          setActivated(true);
          setShowMessage(true);
          generateConfetti();

          // Hide message after a while
          setTimeout(() => setShowMessage(false), 5000);

          return [];
        }

        return newSequence;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [generateConfetti]);

  // Console easter egg - runs once on mount
  useEffect(() => {
    console.log(`
%c
    _    _             ____
   / \\  | | _____  __ | __ ) _ __ _____      ___ __
  / _ \\ | |/ _ \\ \\/ / |  _ \\| '__/ _ \\ \\ /\\ / / '_ \\
 / ___ \\| |  __/>  <  | |_) | | | (_) \\ V  V /| | | |
/_/   \\_\\_|\\___/_/\\_\\ |____/|_|  \\___/ \\_/\\_/ |_| |_|


%cHey there, curious developer! 👋

%cLooking for something interesting?
Try the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A

%cOr check out my GitHub: https://github.com/abrown84
    `,
    "color: #a78bfa; font-family: monospace; font-size: 10px;",
    "color: #f472b6; font-size: 16px; font-weight: bold;",
    "color: #818cf8; font-size: 12px;",
    "color: #6b7280; font-size: 11px;"
    );
  }, []);

  return (
    <>
      <Confetti particles={particles} />

      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[99] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-card/95 backdrop-blur-xl border border-primary/50 rounded-3xl p-12 text-center shadow-2xl shadow-primary/20 max-w-lg mx-4"
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{
                  rotate: [0, -10, 10, -10, 10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 0.5 }}
              >
                🎉
              </motion.div>
              <h2 className="text-3xl font-bold gradient-text mb-4">
                You found the secret!
              </h2>
              <p className="text-muted-foreground mb-4">
                You&apos;ve unlocked the legendary Konami Code. You&apos;re clearly a person of culture.
              </p>
              <p className="text-sm text-primary font-mono">
                ↑ ↑ ↓ ↓ ← → ← → B A
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
