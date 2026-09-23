import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, Badge } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { NetworkBackground } from "@/components/network-background";
import { CapabilityCard, DivisionCard, ProjectCard } from "@/components/cards";
import { PromotionBanner } from "@/components/promotion-banner";
import { capabilities } from "@/lib/capabilities";
import { divisions } from "@/lib/divisions";
import { getFeaturedProjects } from "@/lib/projects";
import { originStory } from "@/lib/company-history";
import { founder } from "@/lib/founder";
import { ArrowRightIcon } from "@/components/icons";
import { Testimonials } from "@/components/testimonials";

const disciplines = [
  "Software Engineering",
  "Cybersecurity",
  "Intelligent Automation",
  "Quantitative Technology",
];

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <>
      <PromotionBanner division="company" />

      {/* HERO */}
      <section className="relative overflow-hidden pt-40 pb-28 md:pt-52 md:pb-36">
        <div className="absolute inset-0 bg-phantom-radial" />
        <NetworkBackground className="absolute inset-0" />
        <div className="grid-overlay absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />

        <div className="container-phantom relative">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl ring-1 ring-metallic-silver/15 shadow-glow overflow-hidden">
                <Image
                  src="/mark.png"
                  alt="CodePhantom Technologies mark"
                  width={80}
                  height={80}
                  className="object-cover"
                  priority
                />
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="font-display text-4xl font-semibold uppercase tracking-tight text-ghost-white sm:text-5xl md:text-6xl lg:text-7xl">
                CodePhantom Technologies
              </h1>
              <p className="mt-5 font-display text-xl font-medium text-gradient sm:text-2xl md:text-3xl">
                Engineering Intelligent Systems.
              </p>
            </Reveal>

            <Reveal delay={160}>
              <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-text md:text-lg">
                CodePhantom Technologies engineers software, security,
                automation and quantitative systems designed to solve
                complex problems with precision.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button href="/projects" icon={<ArrowRightIcon className="h-4 w-4" />}>
                  Explore Our Work
                </Button>
                <Button href="/capabilities" variant="secondary">
                  Our Capabilities
                </Button>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
                {disciplines.map((d) => (
                  <Badge key={d}>{d}</Badge>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <Section className="border-t border-metallic-silver/10">
        <Reveal>
          <SectionHeading
            eyebrow="Capabilities"
            title="Technology engineered across disciplines."
            description="Four connected disciplines, one engineering standard."
          />
        </Reveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c, i) => (
            <Reveal key={c.slug} delay={i * 80}>
              <CapabilityCard capability={c} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SELECTED ENGINEERING */}
      <Section className="border-t border-metallic-silver/10 bg-midnight-navy/40">
        <Reveal>
          <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-mono tracking-[0.3em] text-cyber-blue uppercase mb-4">
                Selected Engineering
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-ghost-white tracking-tight">
                Real systems, in active development.
              </h2>
            </div>
            <Button href="/projects" variant="ghost" icon={<ArrowRightIcon className="h-4 w-4" />}>
              View all projects
            </Button>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* DIVISIONS */}
      <Section className="border-t border-metallic-silver/10">
        <Reveal>
          <SectionHeading
            eyebrow="Divisions"
            title="One company, four engineering fronts."
          />
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {divisions.map((d, i) => (
            <Reveal key={d.slug} delay={i * 80}>
              <DivisionCard division={d} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ORIGIN */}
      <Section className="border-t border-metallic-silver/10 bg-midnight-navy/40">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="text-xs font-mono tracking-[0.3em] text-cyber-blue uppercase mb-4">
              Origin
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-ghost-white tracking-tight">
              {originStory.headline}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-text">
              {originStory.narrative[0]}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-text">
              {originStory.narrative[1]}
            </p>
            <div className="mt-8">
              <Button href="/about" variant="secondary" icon={<ArrowRightIcon className="h-4 w-4" />}>
                Read the full story
              </Button>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl border border-metallic-silver/10 bg-surface/50 p-8">
              <p className="font-display text-lg text-ghost-white">
                &ldquo;Antagonistic was the beginning. CodePhantom is the
                evolution.&rdquo;
              </p>
              <p className="mt-4 text-sm text-muted-text">
                From Antagonistic Trading Co. to CodePhantom Technologies —
                see the full timeline on the About page.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* INSIGHTS TEASER */}
      <Section className="border-t border-metallic-silver/10">
        <Reveal>
          <div className="rounded-3xl border border-metallic-silver/10 bg-surface/30 p-10 text-center md:p-16">
            <p className="text-xs font-mono tracking-[0.3em] text-cyber-blue uppercase mb-4">
              Insights &amp; Research
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-ghost-white tracking-tight">
              Engineering notes, security research and Phantom Traders
              analysis — coming soon.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-text">
              CodePhantom is building the infrastructure for engineering
              articles, cybersecurity research, automation write-ups and
              development logs. Nothing is published yet — check back soon.
            </p>
            <div className="mt-8">
              <Button href="/insights" variant="secondary">
                Visit Insights
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* FOUNDER */}
      <Section className="border-t border-metallic-silver/10 bg-midnight-navy/40">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:items-start">
          <Reveal>
            <p className="text-xs font-mono tracking-[0.3em] text-cyber-blue uppercase mb-4">
              Founder
            </p>
            <h2 className="font-display text-3xl font-semibold text-ghost-white tracking-tight">
              {founder.alias}
            </h2>
            <p className="mt-1 text-base text-ghost-white/90">{founder.name}</p>
            <p className="mt-2 text-sm text-cyber-blue">{founder.role}</p>
            <div className="mt-6">
              <Button href="/founder" variant="ghost" icon={<ArrowRightIcon className="h-4 w-4" />}>
                Full profile
              </Button>
            </div>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-2">
            <p className="text-base leading-relaxed text-muted-text">
              {founder.summary}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* TESTIMONIALS - renders nothing until moderated testimonials exist */}
      <Testimonials />

      {/* FINAL CTA */}
      <Section className="border-t border-metallic-silver/10">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-phantom-purple/25 bg-phantom-gradient/10 p-10 text-center md:p-20">
            <div className="absolute inset-0 bg-phantom-radial" />
            <div className="relative">
              <h2 className="font-display text-3xl font-semibold text-ghost-white tracking-tight sm:text-4xl md:text-5xl">
                Have a system worth building?
              </h2>
              <p className="mt-4 font-display text-xl text-gradient">
                Let&rsquo;s engineer it.
              </p>
              <div className="mt-10">
                <Button href="/contact" icon={<ArrowRightIcon className="h-4 w-4" />}>
                  Start a Conversation
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
