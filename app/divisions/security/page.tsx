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

const division = getDivision("security")!;

export const metadata: Metadata = {
  title: division.name,
  description: division.description,
};

const focusAreas = [
  {
    title: "Security-Oriented Development",
    detail: "Secure-by-design principles applied to every system CodePhantom builds, not treated as an afterthought.",
  },
  {
    title: "Cybersecurity Research",
    detail: "Independent, self-directed research into defensive and offensive security concepts.",
  },
  {
    title: "Secure Software Principles",
    detail: "Applying established security fundamentals — least privilege, input validation, safe defaults.",
  },
  {
    title: "Linux & Security Tooling",
    detail: "Hands-on work with Linux environments and security tooling as part of ongoing study.",
  },
  {
    title: "Experimental Security Projects",
    detail: "Small, focused projects (like the C# Cybersecurity Bot) used to explore security concepts practically.",
  },
];

const securityProjects = projects.filter((p) => p.category === "Cybersecurity");

export default function SecurityPage() {
  return (
    <>
      <PromotionBanner division="security" />
      <DivisionHero division={division} />

      <Section className="border-t border-metallic-silver/10">
        <Reveal>
          <div className="mx-auto max-w-3xl rounded-2xl border border-electric-blue/20 bg-surface/40 p-8 text-center">
            <p className="text-sm leading-relaxed text-muted-text">
              CodePhantom Security is presented conservatively and
              honestly: this division does not currently offer
              professional penetration-testing engagements, and holds no
              formal security certifications. What follows is genuine,
              independent research and hands-on learning — not a
              professional security services catalog.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section className="border-t border-metallic-silver/10 bg-midnight-navy/40">
        <Reveal>
          <SectionHeading eyebrow="Focus areas" title="Security engineered in, not bolted on." />
        </Reveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

      {securityProjects.length > 0 && (
        <Section className="border-t border-metallic-silver/10">
          <Reveal>
            <SectionHeading eyebrow="Research projects" title="Experimental security tooling." />
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {securityProjects.map((p, i) => (
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
              Interested in CodePhantom&rsquo;s security research?
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
