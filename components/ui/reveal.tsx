"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

/**
 * Scroll-reveal with Angular-style animation.
 *
 * Uses Framer Motion for a springy, layered entrance: the element slides up
 * slightly and fades in, with a subtle scale lift. Honours
 * `prefers-reduced-motion` — reduced-motion users get a plain fade.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article";
}) {
  const reduced = useReducedMotion();

  const variants = {
    hidden: {
      opacity: 0,
      y: reduced ? 0 : 28,
      scale: reduced ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: reduced ? 0.2 : 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: reduced ? 0 : delay / 1000,
      },
    },
  } as const;

  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </MotionTag>
  );
}

export default Reveal;