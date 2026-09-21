import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { capabilities } from "@/lib/capabilities";
import { CodeIcon, ShieldIcon, AutomationIcon, ChartIcon } from "@/components/icons";
import { NetworkBackground } from "@/components/network-background";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "CodePhantom Technologies engineers across four disciplines: Software Engineering, Cybersecurity, Intelligent Automation and Quantitative Technology.",
};

const iconMap = {
  code: CodeIcon,
  shield: ShieldIcon,
  automation: AutomationIcon,
  chart: ChartIcon,
};

export default function CapabilitiesPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-24">
        <NetworkBackground className="absolute inset-0 opacity-40" />
        <div className="container-phantom relative">
          <Reveal>
            <p className="text-xs font-mono tracking-[0.3em] text-cyber-blue uppercase mb-4">
              Capabilities
            </p>
            <h1 className="font-display text-4xl font-semibold text-ghost-white tracking-tight md:text-5xl max-w-3xl">
              Technology engineered across disciplines.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-text md:text-lg">
              Four connected disciplines, held to one engineering standard —
              precise, maintainable and built to solve real problems.
            </p>
          </Reveal>
        </div>
      </section>

      <Section className="border-t border-metallic-silver/10">
        <div className="space-y-6">
          {capabilities.map((c, i) => {
            const Icon = iconMap[c.icon];
            return (
              <Reveal key={c.slug} delay={i * 80}>
                <div className="grid grid-cols-1 gap-8 rounded-2xl border border-metallic-silver/10 bg-surface/40 p-8 md:grid-cols-[auto_1fr] md:p-12">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-phantom-gradient/10 border border-phantom-purple/25 text-cyber-blue">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-ghost-white">
                      {c.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-text md:text-base">
                      {c.description}
                    </p>
                    <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {c.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2 text-sm text-metallic-silver"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyber-blue" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>
    </>
  );
}
