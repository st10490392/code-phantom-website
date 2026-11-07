"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Stagger helper — returns a container variant that delays each child
 * by `stagger` milliseconds. Respects `prefers-reduced-motion`.
 */
export function useStagger(stagger = 60) {
  const reduced = useReducedMotion();
  return {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: reduced ? 0 : stagger,
        delayChildren: reduced ? 0 : 60,
      },
    },
  };
}

export default useStagger;