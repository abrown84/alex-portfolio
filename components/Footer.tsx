"use client";

import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <motion.p
            className="text-muted-foreground text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            &copy; {currentYear} Alex Brown. Built with{" "}
            <span className="inline-block animate-pulse">💜</span> and lots of coffee.
          </motion.p>

          {/* Tech stack */}
          <motion.div
            className="flex items-center gap-4 text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span>Next.js</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span>React Three Fiber</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span>Framer Motion</span>
          </motion.div>

          {/* Back to top */}
          <motion.a
            href="#"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ y: -2 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Back to top
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 256 256"
              fill="currentColor"
            >
              <path d="M216.49,119.51a12,12,0,0,1-17,17L140,77v139a12,12,0,0,1-24,0V77L56.49,136.49a12,12,0,0,1-17-17l72-72a12,12,0,0,1,17,0Z" />
            </svg>
          </motion.a>
        </div>

        {/* Hidden scroll easter egg */}
        <motion.div
          className="text-center mt-16 text-xs text-muted-foreground/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p>Psst... you scrolled all the way down here! 🎯</p>
          <p className="mt-1">Thanks for checking out my portfolio.</p>
        </motion.div>
      </div>
    </footer>
  );
}
