"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, magnetic = true, ...props }, ref) => {
    const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary: "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-lg hover:shadow-primary/25 hover:scale-105",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-secondary/50 text-foreground",
      outline: "border-2 border-border hover:border-primary hover:text-primary gradient-border",
    };

    const sizes = {
      sm: "text-sm px-4 py-2",
      md: "text-base px-6 py-3",
      lg: "text-lg px-8 py-4",
    };

    if (magnetic) {
      return (
        <motion.button
          ref={ref}
          className={cn(baseStyles, variants[variant], sizes[size], className)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          {...(props as React.ComponentProps<typeof motion.button>)}
        >
          {children}
        </motion.button>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
