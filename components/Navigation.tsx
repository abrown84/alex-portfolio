"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LogoClicker } from "@/components/easter-eggs/LogoClicker";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <LogoClicker>
            <motion.a
              href="#"
              className="text-xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
            >
              AB
            </motion.a>
          </LogoClicker>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-4">
            <ThemeToggle />
            <motion.button
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <motion.span
                  className="w-full h-0.5 bg-foreground rounded-full origin-left"
                  animate={mobileMenuOpen ? { rotate: 45, y: -2 } : { rotate: 0, y: 0 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-foreground rounded-full"
                  animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-foreground rounded-full origin-left"
                  animate={mobileMenuOpen ? { rotate: -45, y: 2 } : { rotate: 0, y: 0 }}
                />
              </div>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.nav
              className="absolute top-20 left-6 right-6 bg-card border border-border rounded-2xl p-6 space-y-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1 }}
            >
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="block text-lg font-medium py-2 hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
