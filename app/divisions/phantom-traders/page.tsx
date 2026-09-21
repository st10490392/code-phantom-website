import type { Metadata } from "next";
import { DivisionHero } from "@/components/division-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/icons";
import { getDivision } from "@/lib/divisions";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/cards";
import { PromotionBanner } from "@/components/promotion-banner";
import {
  signalInfrastructure,
  futurePhantomTradersServices,
} from "@/lib/future-architecture";

const division = getDivision("phantom-traders")!;

export const metadata: Metadata = {
  title: division.name,
  description: division.description,
};

const focusAreas = [
  { title: "Strategy Development", detail: "Designing systematic, rules-based approaches to markets." },
  { title: "Automated Trading Systems", detail: "Engineering execution technology like Code Phantom EA." },
  { title: "Research & Backtesting", detail: "Testing strategies against historical data before anything runs live." },
  { title: "Risk Management", detail: "Building risk controls into systems from the start, not after the fact." },
  { title: "Quantitative Tooling", detail: "Internal tools for analysis, research and strategy iteration." },
  { title: "Market Structure Research", detail: "Studying how markets actually work at a mechanical level." },
];

const tradersProjects = projects.filter((p) => p.category === "Quantitative Technology");

export default function PhantomTradersPage() {
  return (
    <>
      <PromotionBanner division="phantom-traders" />
      <DivisionHero division={division} />

      <Section className="border-t border-metallic-silver/10">
        <Reveal>
          <p className="mx-auto max-w-2xl text-center font-mono text-sm uppercase tracking-[0.2em] text-electric-blue">
            Systematic Markets. Engineered Execution.
          </p>
        </Reveal>
      </Section>

      <Section className="border-t border-metallic-silver/10 bg-midnight-navy/40">
        <Reveal>
          <SectionHeading eyebrow="Focus" title="Engineering discipline, applied to markets." />
        </Reveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {focusAreas.map((f, i) => (
            <Reveal key={f.title} delay={i * 60}>
              <div className="rounded-xl border border-metallic-silver/10 bg-surface/40 p-6 h-full card-hover">
                <h3 className="font-display text-lg font-semibold text-ghost-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-text">
                  {f.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-metallic-silver/10">
        <Reveal>
          <div className="mx-auto max-w-3xl rounded-2xl border border-electric-blue/20 bg-surface/40 p-8 text-center">
            <p className="text-sm leading-relaxed text-muted-text">
              Phantom Traders does not currently offer managed accounts,
              copy trading, financial advice, paid trading signals,
              performance-fee account management, investment management,
              or IB programmes. Code Phantom EA is presented as an active
              research and development project — no ROI, win rate, funded
              capital, or broker/prop-firm partnerships are claimed or
              implied.
            </p>
          </div>
        </Reveal>
      </Section>

      {tradersProjects.length > 0 && (
        <Section className="border-t border-metallic-silver/10 bg-midnight-navy/40">
          <Reveal>
            <SectionHeading eyebrow="Engineering" title="Quantitative Technology projects." />
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tradersProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Section className="border-t border-metallic-silver/10">
        <Reveal>
          <SectionHeading
            eyebrow="Future infrastructure"
            title={signalInfrastructure.headline}
            description={signalInfrastructure.description}
          />
        </Reveal>
        <Reveal delay={80}>
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-metallic-silver/10 bg-surface/30 p-6 md:p-8">
            {signalInfrastructure.pipeline.map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <span className="rounded-full border border-metallic-silver/20 bg-surface px-4 py-2 text-xs font-mono uppercase tracking-wide text-metallic-silver whitespace-nowrap">
                  {step}
                </span>
                {i < signalInfrastructure.pipeline.length - 1 && (
                  <ArrowRightIcon className="h-4 w-4 flex-shrink-0 text-muted-text" />
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section className="border-t border-metallic-silver/10 bg-midnight-navy/40">
        <Reveal>
          <SectionHeading
            eyebrow="Roadmap"
            title={futurePhantomTradersServices.headline}
            description={futurePhantomTradersServices.description}
          />
        </Reveal>
        <div className="flex flex-wrap gap-3">
          {futurePhantomTradersServices.possibilities.map((p, i) => (
            <Reveal key={p} delay={i * 40}>
              <span className="inline-block rounded-full border border-metallic-silver/15 bg-surface/40 px-4 py-2 text-xs font-mono text-muted-text">
                {p}
              </span>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <p className="mt-6 max-w-2xl text-xs text-muted-text">
            None of the above are currently available. Several may require
            regulatory approval before they can be offered.
          </p>
        </Reveal>
      </Section>

      <Section className="border-t border-metallic-silver/10">
        <Reveal>
          <div className="rounded-3xl border border-phantom-purple/25 bg-phantom-gradient/10 p-10 text-center md:p-16">
            <h2 className="font-display text-2xl font-semibold text-ghost-white md:text-3xl">
              Following Phantom Traders&rsquo; research?
            </h2>
            <div className="mt-8">
              <Button href="/contact" icon={<ArrowRightIcon className="h-4 w-4" />}>
                Get in Touch
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
