import { NetworkBackground } from "@/components/network-background";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/section";
import type { Division } from "@/lib/divisions";

export function DivisionHero({ division }: { division: Division }) {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-24">
      <NetworkBackground className="absolute inset-0 opacity-40" />
      <div className="container-phantom relative">
        <Reveal>
          <p className="text-xs font-mono tracking-[0.3em] text-cyber-blue uppercase mb-4">
            Division {division.number}
          </p>
          <h1 className="font-display text-4xl font-semibold text-ghost-white tracking-tight md:text-5xl max-w-3xl">
            {division.name}
          </h1>
          <p className="mt-4 font-display text-xl text-gradient">
            {division.tagline}
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-text md:text-lg">
            {division.description}
          </p>
          <div className="mt-6">
            <Badge>{division.status}</Badge>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
