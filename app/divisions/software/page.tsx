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

const division = getDivision("software")!;

export const metadata: Metadata = {
  title: division.name,
  description: division.description,
};

const focusAreas = [
  {
    title: "Licensed Software Products",
    detail:
      "CodePhantom Software builds and licenses software — CPT Scanner, Code Phantom EA and the CodePhantom App — sold under four tiers, not as managed services.",
  },
  {
    title: "Quantitative Systems",
    detail:
      "Market-scanning and automated trading engines designed around fixed, documented rules with human review at the boundary between automated detection and human action.",
  },
  {
    title: "Mobile Platforms",
    detail:
      "Native Android clients for account access, Scanner review and licence management, distributed with verified builds.",
  },
  {
    title: "Web & Infrastructure",
    detail:
      "Production web applications and internal tooling — including this website — engineered for maintainability and correctness.",
  },
];

const relatedProjects = projects.filter(
  (p) => p.category === "Software Engineering" || p.category === "Web Development"
);

export default function SoftwarePage() {
  return (
    <>
      <PromotionBanner division="software" />
      <DivisionHero division={division} />

      <Section className="border-t border-metallic-silver/10">
        <Reveal>
          <SectionHeading eyebrow="What we build" title="Software products. Licensed, not sold." />
        </Reveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {focusAreas.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <div className="rounded-xl border border-metallic-silver/10 bg-surface/40 p-6 h-full card-hover">
                <h3 className="font-display text-lg font-semibold text-ghost-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-text">
                  {s.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-metallic-silver/10 bg-midnight-navy/40">
        <Reveal>
          <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-muted-text">
            CodePhantom Software is an early-stage engineering company. Projects below reflect genuine, ongoing engineering work rather than a client portfolio — and the products listed on the Products page are licensed software, not financial services.
          </p>
        </Reveal>
      </Section>

      {relatedProjects.length > 0 && (
        <Section className="border-t border-metallic-silver/10">
          <Reveal>
            <SectionHeading eyebrow="Related engineering" title="Software Engineering projects." />
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Section className="border-t border-metallic-silver/10 bg-midnight-navy/40">
        <Reveal>
          <div className="rounded-3xl border border-phantom-purple/25 bg-phantom-gradient/10 p-10 text-center md:p-16">
            <h2 className="font-display text-2xl font-semibold text-ghost-white md:text-3xl">
              Have a software problem worth engineering properly?
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