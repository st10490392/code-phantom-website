import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cx("py-20 md:py-28", className)}>
      <div className="container-phantom">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cx(
        "max-w-2xl mb-14",
        align === "center" && "mx-auto text-center"
      )}
    >
      {eyebrow && (
        <p className="text-xs font-mono tracking-[0.3em] text-cyber-blue uppercase mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-ghost-white tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-muted-text text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 rounded-full border border-metallic-silver/20 bg-surface/60 px-3 py-1 text-xs font-mono tracking-wide text-metallic-silver",
        className
      )}
    >
      {children}
    </span>
  );
}
