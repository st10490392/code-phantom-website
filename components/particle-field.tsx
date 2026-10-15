"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; vx: number; vy: number; r: number; tint: number; phase: number };
const palette = ["124,58,237", "22,139,255", "0,191,255", "178,153,255"];

/** Continuously drifting, bounded ambient particles. Decorative; never intercepts input. */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 640px)");
    let width = 0, height = 0, frame = 0, last = 0, previous = 0;
    let pixelRatio = 0;
    let particles: Particle[] = [];
    let visible = !document.hidden;
    let inView = true;
    let active = false;
    const random = (a: number, b: number) => a + Math.random() * (b - a);

    const resize = () => {
      const bounds = parent.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      // Ignore ResizeObserver callbacks when geometry is unchanged; do not respawn particles.
      if (Math.abs(width - bounds.width) < 1 && Math.abs(height - bounds.height) < 1 && pixelRatio === ratio) return;
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      pixelRatio = ratio;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(compact.matches ? 36 : 85, Math.max(24, Math.round(width * height / (compact.matches ? 11000 : 15000))));
      particles = Array.from({ length: count }, () => ({
        x: random(0, width), y: random(0, height),
        vx: random(-1.2, 1.2), vy: random(-1.15, 1.15),
        r: random(1.5, 3.5), tint: Math.floor(random(0, palette.length)), phase: random(0, Math.PI * 2),
      }));
      draw(0);
    };

    const draw = (elapsed: number) => {
      ctx.clearRect(0, 0, width, height);
      const moving = elapsed > 0 && !reduced.matches;
      for (const p of particles) {
        if (moving) {
          p.x += p.vx * elapsed;
          p.y += p.vy * elapsed;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
          p.phase += .016 * elapsed;
        }
        const alpha = .58 + .26 * Math.sin(p.phase);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${palette[p.tint]},${alpha})`;
        ctx.shadowColor = `rgba(${palette[p.tint]},.45)`;
        ctx.shadowBlur = 13;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      // Sparse proximity links, limited to nearby particles to avoid a distracting web.
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > 120 * 120) continue;
          ctx.strokeStyle = `rgba(70,124,238,${.22 * (1 - Math.sqrt(d2) / 120)})`;
          ctx.lineWidth = .7;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    };

    const tick = (now: number) => {
      if (!active) return;
      if (now - last >= 1000 / 30) {
        const elapsed = Math.min((now - (previous || now)) / (1000 / 30), 2);
        draw(elapsed);
        last = now;
        previous = now;
      }
      frame = window.requestAnimationFrame(tick);
    };
    const sync = () => {
      const shouldRun = visible && inView && !reduced.matches;
      if (shouldRun === active) return;
      active = shouldRun;
      if (active) { last = 0; previous = 0; frame = window.requestAnimationFrame(tick); }
      else { window.cancelAnimationFrame(frame); draw(0); }
    };
    const onVisibility = () => { visible = !document.hidden; sync(); };
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); }, { threshold: 0 });
    const resizeObserver = new ResizeObserver(resize);
    observer.observe(parent);
    resizeObserver.observe(parent);
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", onVisibility);
    resize();
    sync();
    return () => {
      active = false;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none" aria-hidden="true" />;
}
