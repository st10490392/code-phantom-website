"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function FloatingActions() {
  const [expanded, setExpanded] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => { setExpanded(false); }, [pathname]);
  useEffect(() => {
    const update = () => setShowTop(window.scrollY > 500);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!expanded) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (root.current && !root.current.contains(event.target as Node)) setExpanded(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [expanded]);

  const control = "flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#101b31]/90 text-ghost-white shadow-lg backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-cyber-blue/60 hover:shadow-[0_0_24px_rgba(22,139,255,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-blue";

  return (
    <div ref={root} className="fixed bottom-5 left-4 z-[55] flex flex-col items-start gap-2 md:bottom-8 md:left-8" aria-label="Quick actions">
      {expanded && (
        <nav aria-label="Quick links" className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-[#09111f]/95 p-2 shadow-2xl backdrop-blur-xl">
          <Link href="/contact" className="rounded-xl px-4 py-2 text-sm text-ghost-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-blue">Contact</Link>
          <Link href="/projects" className="rounded-xl px-4 py-2 text-sm text-ghost-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-blue">Projects</Link>
          <a href="https://github.com/st10490392" target="_blank" rel="noopener noreferrer" className="rounded-xl px-4 py-2 text-sm text-ghost-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-blue">GitHub <span aria-hidden="true">↗</span></a>
        </nav>
      )}
      <button type="button" className={control + " bg-gradient-to-br from-[#45228b]/95 to-[#123c78]/95"} aria-expanded={expanded} aria-label={expanded ? "Close quick links" : "Open quick links"} onClick={() => setExpanded(v => !v)}>
        <span aria-hidden="true" className="text-2xl font-light">{expanded ? "×" : "+"}</span>
      </button>
      {showTop && (
        <button type="button" className={control} aria-label="Back to top" title="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}>
          <span aria-hidden="true" className="text-xl">↑</span>
        </button>
      )}
    </div>
  );
}
