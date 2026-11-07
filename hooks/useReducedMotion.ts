"use client";

import { useEffect, useState } from "react";

/**
 * Respects `prefers-reduced-motion` so motion-sensitive users get a
 * static experience. Falls back to `true` when the media query is
 * unavailable (SSR).
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

export default useReducedMotion;