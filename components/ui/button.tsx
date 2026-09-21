import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
  icon?: ReactNode;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  external,
  icon,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none";
  const variants: Record<string, string> = {
    primary:
      "bg-phantom-gradient text-white shadow-glow hover:shadow-[0_0_56px_rgba(124,58,237,0.4)] hover:-translate-y-0.5",
    secondary:
      "border border-metallic-silver/25 text-ghost-white hover:border-cyber-blue/60 hover:bg-cyber-blue/5 hover:-translate-y-0.5",
    ghost:
      "text-ghost-white/80 hover:text-ghost-white underline-offset-4 hover:underline",
  };

  const content = (
    <>
      {children}
      {icon}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cx(base, variants[variant], className)}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cx(base, variants[variant], className)}>
      {content}
    </Link>
  );
}
