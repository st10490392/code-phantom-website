import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { LicenceTierSelector } from "@/components/products/LicenceTierSelector";
import { licenceTiers, accountModel } from "@/lib/licensing";
import { NetworkBackground } from "@/components/network-background";

export const metadata: Metadata = {
  title: "Licensing",
  description:
    "CodePhantom software licences: Free research, Lite, Professional and Enterprise tiers. Sign in with a unique ID and password you set.",
};

export default function LicensingPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-24">
        <NetworkBackground className="absolute inset-0 opacity-40" />
        <div className="container-phantom relative">
          <Reveal>
            <p className="text-xs font-mono tracking-[0.3em] text-cyber-blue uppercase mb-4">
              Licensing
            </p>
            <h1 className="font-display text-4xl font-semibold text-ghost-white tracking-tight md:text-5xl max-w-3xl">
              Software licences. One account. No trading service attached.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-text md:text-lg">
              Each licence is a software artefact — access to a product, governed
              by a tier. You sign in with a unique ID and a password you set.
              Nothing here is a managed trading service, and no licence grants
              trading activity on your behalf.
            </p>
          </Reveal>
        </div>
      </section>

      <Section className="border-t border-metallic-silver/10">
        <LicenceTierSelector tiers={licenceTiers} />
      </Section>

      <Section className="border-t border-metallic-silver/10 bg-midnight-navy/40">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold text-ghost-white text-center md:text-3xl">
            {accountModel.headline}
          </h2>
          <p className="mt-4 max-w-2xl text-center text-base text-muted-text">
            {accountModel.description}
          </p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {accountModel.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 80}>
              <div className="rounded-2xl border border-metallic-silver/10 bg-surface/40 p-8">
                <span className="font-mono text-xs tracking-[0.2em] text-cyber-blue">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-ghost-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-text">
                  {step.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}