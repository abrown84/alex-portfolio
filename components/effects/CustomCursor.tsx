"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useIsMobile } from "@/hooks/useMediaQuery";

export function CustomCursor() {
  const isMobile = useIsMobile();
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorType = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      const text = target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text");

      if (cursorType === "pointer" || target.closest("a, button, [role='button']")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }

      if (text) {
        setCursorText(text);
      } else {
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isMobile, cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Main cursor blob */}
      <motion.div
        className="custom-cursor pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            width: isHovering ? 64 : isClicking ? 16 : 24,
            height: isHovering ? 64 : isClicking ? 16 : 24,
            x: isHovering ? -32 : isClicking ? -8 : -12,
            y: isHovering ? -32 : isClicking ? -8 : -12,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-white"
            animate={{
              scale: isClicking ? 0.8 : 1,
            }}
            transition={{ type: "spring", damping: 20, stiffness: 400 }}
          />
          {cursorText && (
            <motion.span
              className="absolute text-[10px] font-medium text-black whitespace-nowrap"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Glow trail */}
      <motion.div
        className="custom-cursor pointer-events-none fixed top-0 left-0 z-[9997]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="w-24 h-24 -ml-12 -mt-12 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 blur-xl"
          animate={{
            scale: isHovering ? 1.5 : isClicking ? 0.5 : 1,
            opacity: isHovering ? 0.6 : 0.3,
          }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
        />
      </motion.div>

      {/* Trailing dot */}
      <motion.div
        className="custom-cursor pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className="w-2 h-2 -ml-1 -mt-1 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/50"
          animate={{
            scale: isClicking ? 2 : 1,
          }}
        />
      </motion.div>
    </>
  );
}
