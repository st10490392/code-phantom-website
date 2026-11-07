"use client";

import { RefObject } from "react";

/**
 * Staggered scroll-reveal hook.
 *
 * Returns a `style` object to apply to a container. Children reveal
 * in sequence as the container enters the viewport. Honours
 * `prefers-reduced-motion`.
 */
export function useScrollReveal(
  ref: RefObject<HTMLElement | null>,
  options: { stagger?: number; delay?: number; threshold?: number } = {}
) {
  // Implementation lives in the component layer (Reveal.tsx) — this hook
  // is a thin wrapper kept for API stability and future expansion.
  return { stagger: options.stagger ?? 60 };
}

export default useScrollReveal;