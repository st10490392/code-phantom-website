import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Timeline } from "@/components/timeline";
import Image from "next/image";
import {
  originStory,
  mission,
  vision,
  values,
  antagonisticBrand,
  historicalAssets,
} from "@/lib/company-history";
import { NetworkBackground } from "@/components/network-background";

export const metadata: Metadata = {
  title: "About",
  description:
    "How CodePhantom Technologies began with Antagonistic Trading Co. and evolved into a technology engineering company built around software, security, automation and research.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-28">
        <NetworkBackground className="absolute inset-0 opacity-40" />
        <div className="container-phantom relative">
          <Reveal>
            <p className="text-xs font-mono tracking-[0.3em] text-cyber-blue uppercase mb-4">
              About CodePhantom
            </p>
            <h1 className="font-display text-4xl font-semibold text-ghost-white tracking-tight md:text-5xl max-w-3xl">
              {originStory.headline}
            </h1>
          </Reveal>
        </div>
      </section>

      <Section className="border-t border-metallic-silver/10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {originStory.narrative.map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <p className="text-base leading-relaxed text-muted-text">{p}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-metallic-silver/10 bg-midnight-navy/40">
        <Reveal>
          <SectionHeading eyebrow="Timeline" title="The evolution, step by step." />
        </Reveal>
        <Timeline />

        <Reveal delay={160}>
          <div className="mt-14 rounded-2xl border border-metallic-silver/10 bg-surface/30 p-6 md:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyber-blue">
              Archival Brand Material
            </p>
            <p className="mt-3 font-display text-lg text-ghost-white">
              Antagonistic Trading Co. — Est. {antagonisticBrand.estd}
            </p>
            <p className="mt-1 text-sm italic text-metallic-silver">
              &ldquo;{antagonisticBrand.tagline}&rdquo;
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-text">
              {antagonisticBrand.note}
            </p>
          </div>
        </Reveal>

        {historicalAssets.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {historicalAssets.map((asset, i) => (
              <Reveal key={asset.id} delay={i * 80}>
                <figure className="overflow-hidden rounded-2xl border border-metallic-silver/10 bg-surface/40">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={asset.src}
                      alt={asset.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="p-5">
                    <p className="text-xs font-mono uppercase tracking-widest text-cyber-blue">
                      {asset.context}
                    </p>
                    <p className="mt-2 text-sm text-muted-text">{asset.caption}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </Section>

      <Section className="border-t border-metallic-silver/10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-metallic-silver/10 bg-surface/40 p-8 md:p-10 h-full">
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-cyber-blue">
                Mission
              </h3>
              <p className="mt-4 font-display text-xl leading-relaxed text-ghost-white">
                {mission}
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="rounded-2xl border border-metallic-silver/10 bg-surface/40 p-8 md:p-10 h-full">
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-cyber-blue">
                Vision
              </h3>
              <p className="mt-4 font-display text-xl leading-relaxed text-ghost-white">
                {vision}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="border-t border-metallic-silver/10 bg-midnight-navy/40">
        <Reveal>
          <SectionHeading eyebrow="Values" title="What guides how we build." />
        </Reveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {values.map((v, i) => (
            <Reveal key={v.name} delay={i * 70}>
              <div className="rounded-xl border border-metallic-silver/10 bg-surface/40 p-6 h-full card-hover">
                <h3 className="font-display text-lg font-semibold text-ghost-white">
                  {v.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-text">
                  {v.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
