import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { NetworkBackground } from "@/components/network-background";

/** The standard inner-page hero, identical to the existing page headers. */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-24">
      <NetworkBackground className="absolute inset-0 opacity-40" />
      <div className="container-phantom relative">
        <Reveal>
          <p className="text-xs font-mono tracking-[0.3em] text-cyber-blue uppercase mb-4">{eyebrow}</p>
          <h1 className="font-display text-4xl font-semibold text-ghost-white tracking-tight md:text-5xl max-w-3xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-text md:text-lg">{description}</p>
          ) : null}
          {children}
        </Reveal>
      </div>
    </section>
  );
}

/** Plain prose block for policy/support pages, in the site's type scale. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl space-y-5 text-base leading-relaxed text-muted-text [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ghost-white [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-lg [&_h3]:text-ghost-white [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_a]:text-cyber-blue [&_a:hover]:text-ghost-white [&_strong]:text-ghost-white">
      {children}
    </div>
  );
}

export function StatusPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-cyber-blue/30 bg-cyber-blue/5 px-3 py-1 text-xs font-mono tracking-wide text-cyber-blue">
      {children}
    </span>
  );
}
