import type { Metadata } from "next";
import { DivisionHero } from "@/components/division-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/icons";
import { getDivision } from "@/lib/divisions";
import { PromotionBanner } from "@/components/promotion-banner";

const division = getDivision("labs")!;

export const metadata: Metadata = {
  title: division.name,
  description: division.description,
};

const researchAreas = [
  {
    title: "Intelligent Automation",
    detail: "Automating repetitive engineering and operational tasks with reliable, monitored systems.",
  },
  {
    title: "AI Experimentation",
    detail: "Applied experimentation with AI tools and techniques as they become practically useful.",
  },
  {
    title: "Software Agents",
    detail: "Exploring autonomous and semi-autonomous software agents, like the Phantom Assistant on this site.",
  },
  {
    title: "Developer Tooling",
    detail: "Small tools and utilities built to make CodePhantom's own engineering faster and safer.",
  },
  {
    title: "Emerging Technology",
    detail: "A dedicated space to experiment with new technology before it becomes a formal product or service.",
  },
];

export default function LabsPage() {
  return (
    <>
      <PromotionBanner division="labs" />
      <DivisionHero division={division} />

      <Section className="border-t border-metallic-silver/10">
        <Reveal>
          <SectionHeading
            eyebrow="R&D"
            title="Where CodePhantom experiments before it ships."
            description="CodePhantom Labs is intentionally unstructured — a home for early-stage ideas, prototypes and research that may later become a project, division feature, or product."
          />
        </Reveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {researchAreas.map((r, i) => (
            <Reveal key={r.title} delay={i * 60}>
              <div className="rounded-xl border border-metallic-silver/10 bg-surface/40 p-6 h-full card-hover">
                <h3 className="font-display text-lg font-semibold text-ghost-white">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-text">
                  {r.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-metallic-silver/10 bg-midnight-navy/40">
        <Reveal>
          <div className="mx-auto max-w-2xl rounded-2xl border border-metallic-silver/10 bg-surface/40 p-8 text-center">
            <p className="text-sm leading-relaxed text-muted-text">
              The Phantom Assistant chatbot on this website — built on a
              local, structured knowledge base rather than a paid AI
              API — is itself a CodePhantom Labs project.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section className="border-t border-metallic-silver/10">
        <Reveal>
          <div className="rounded-3xl border border-phantom-purple/25 bg-phantom-gradient/10 p-10 text-center md:p-16">
            <h2 className="font-display text-2xl font-semibold text-ghost-white md:text-3xl">
              Curious what CodePhantom Labs is exploring?
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
