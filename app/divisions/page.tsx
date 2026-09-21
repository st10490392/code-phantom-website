import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { DivisionCard } from "@/components/cards";
import { divisions } from "@/lib/divisions";
import { NetworkBackground } from "@/components/network-background";

export const metadata: Metadata = {
  title: "Divisions",
  description:
    "CodePhantom Software, CodePhantom Security, CodePhantom Labs and Phantom Traders — the four engineering divisions of CodePhantom Technologies.",
};

export default function DivisionsPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-24">
        <NetworkBackground className="absolute inset-0 opacity-40" />
        <div className="container-phantom relative">
          <Reveal>
            <p className="text-xs font-mono tracking-[0.3em] text-cyber-blue uppercase mb-4">
              Divisions
            </p>
            <h1 className="font-display text-4xl font-semibold text-ghost-white tracking-tight md:text-5xl max-w-3xl">
              One company, four engineering fronts.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-text md:text-lg">
              Each division carries its own focus, but shares the same
              engineering standard: precise, security-conscious, built to
              last.
            </p>
          </Reveal>
        </div>
      </section>

      <Section className="border-t border-metallic-silver/10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {divisions.map((d, i) => (
            <Reveal key={d.slug} delay={i * 80}>
              <DivisionCard division={d} />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
