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

const services = [
  {
    title: "Custom Software",
    detail: "Purpose-built applications designed around a specific problem rather than a generic template.",
  },
  {
    title: "Backend Development",
    detail: "Reliable server-side systems, data models and business logic engineered for correctness.",
  },
  {
    title: "Web Applications",
    detail: "Fast, accessible, maintainable web products — including this website.",
  },
  {
    title: "APIs & Integrations",
    detail: "Clean, well-documented interfaces that let systems talk to each other reliably.",
  },
  {
    title: "Automation & Internal Tools",
    detail: "Tooling that removes repetitive manual work from engineering and operational workflows.",
  },
  {
    title: "Systems Development",
    detail: "End-to-end system design — from architecture decisions to production deployment.",
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
          <SectionHeading eyebrow="What we build" title="Engineering, end to end." />
        </Reveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
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
            CodePhantom Software is early stage. Projects below reflect
            genuine, ongoing engineering work rather than a client
            portfolio — CodePhantom does not yet have a public client
            history.
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
