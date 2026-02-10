"use client";

import { forwardRef, HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, hover = true, glow = false, ...props }, ref) => {
    const baseStyles = "relative rounded-2xl bg-card border border-border overflow-hidden";

    const content = (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          hover && "transition-all duration-300 hover:border-primary/50",
          glow && "shadow-lg shadow-primary/10",
          className
        )}
        {...props}
      >
        {glow && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
        )}
        <div className="relative z-10">{children}</div>
      </div>
    );

    if (hover) {
      return (
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {content}
        </motion.div>
      );
    }

    return content;
  }
);

Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pb-4", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-4 flex items-center", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardContent, CardFooter };
