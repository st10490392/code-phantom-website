import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { founder } from "@/lib/founder";
import { ArrowRightIcon, GitHubIcon, LinkedInIcon, InstagramIcon } from "@/components/icons";
import { founderSocials } from "@/lib/site-config";
import { NetworkBackground } from "@/components/network-background";
import { FounderJsonLd } from "@/components/structured-data";

const founderDescription =
  "GingerCodePhantom, founder of CodePhantom Technologies — an early-career software developer building software, security and trading technology.";

export const metadata: Metadata = {
  title: "GingerCodePhantom — Founder",
  description: founderDescription,
  alternates: { canonical: "/founder" },
  openGraph: {
    type: "profile",
    url: "/founder",
    title: "GingerCodePhantom — Founder of CodePhantom Technologies",
    description: founderDescription,
    username: "GingerCodePhantom",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CodePhantom Technologies" }],
  },
};

export default function FounderPage() {
  return (
    <>
      <FounderJsonLd />
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-24">
        <NetworkBackground className="absolute inset-0 opacity-40" />
        <div className="container-phantom relative">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[auto_1fr] lg:items-center">
            <Reveal>
              <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-phantom-gradient/10 border border-phantom-purple/25 shadow-glow">
                <span className="font-display text-4xl font-semibold text-gradient">
                  GC
                </span>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-xs font-mono tracking-[0.3em] text-cyber-blue uppercase mb-4">
                Founder
              </p>
              <h1 className="font-display text-4xl font-semibold text-ghost-white tracking-tight md:text-5xl">
                {founder.name}
              </h1>
              <p className="mt-3 text-lg text-metallic-silver">{founder.role}</p>
              <p className="mt-1 text-sm text-muted-text">
                {founder.location} · {founder.careerStage}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Section className="border-t border-metallic-silver/10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Reveal>
              <p className="text-base leading-relaxed text-muted-text">
                {founder.summary}
              </p>
            </Reveal>
            {founder.bio.map((p, i) => (
              <Reveal key={i} delay={(i + 1) * 80}>
                <p className="text-base leading-relaxed text-muted-text">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="space-y-6">
              <div className="rounded-2xl border border-metallic-silver/10 bg-surface/40 p-6">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-blue">
                  Education
                </h3>
                <p className="mt-3 text-sm text-ghost-white">
                  {founder.education.program}
                </p>
                <p className="mt-1 text-sm text-muted-text">
                  {founder.education.status} — final academic year expected{" "}
                  {founder.education.expectedFinalYear}
                </p>
              </div>

              <div className="rounded-2xl border border-metallic-silver/10 bg-surface/40 p-6">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-blue">
                  Technologies
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {founder.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-metallic-silver/15 px-3 py-1 text-xs font-mono text-metallic-silver"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-metallic-silver/10 bg-surface/40 p-6">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-blue">
                  Interests
                </h3>
                <ul className="mt-3 space-y-2">
                  {founder.interests.map((interest) => (
                    <li key={interest} className="flex items-start gap-2 text-sm text-metallic-silver">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyber-blue" />
                      {interest}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-metallic-silver/10 bg-surface/40 p-6">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-blue">
                  Connect
                </h3>
                <div className="mt-4 space-y-3">
                  <a
                    href={founderSocials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-metallic-silver transition-colors hover:text-ghost-white"
                  >
                    <GitHubIcon className="h-4 w-4 flex-shrink-0" />
                    GitHub
                  </a>
                  <a
                    href={founderSocials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-metallic-silver transition-colors hover:text-ghost-white"
                  >
                    <LinkedInIcon className="h-4 w-4 flex-shrink-0" />
                    LinkedIn
                  </a>
                  <a
                    href={founderSocials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-metallic-silver transition-colors hover:text-ghost-white"
                  >
                    <InstagramIcon className="h-4 w-4 flex-shrink-0" />
                    Instagram
                  </a>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-muted-text">
                  Instagram is GingerCodePhantom&rsquo;s personal/professional
                  account, not an official CodePhantom Technologies channel.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="border-t border-metallic-silver/10 bg-midnight-navy/40">
        <Reveal>
          <SectionHeading
            eyebrow="Building"
            title="Building CodePhantom, one system at a time."
            description="CodePhantom Technologies is the product of ongoing, hands-on engineering work — not a finished company, but an actively developing one."
          />
        </Reveal>
        <Reveal delay={100}>
          <Button href="/about" variant="ghost" icon={<ArrowRightIcon className="h-4 w-4" />}>
            Read the CodePhantom story
          </Button>
        </Reveal>
      </Section>
    </>
  );
}
