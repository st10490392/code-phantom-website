import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { articles, articleCategories } from "@/lib/articles";
import { NetworkBackground } from "@/components/network-background";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Engineering articles, cybersecurity research, automation write-ups and Phantom Traders research from CodePhantom Technologies.",
};

export default function InsightsPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-24">
        <NetworkBackground className="absolute inset-0 opacity-40" />
        <div className="container-phantom relative">
          <Reveal>
            <p className="text-xs font-mono tracking-[0.3em] text-cyber-blue uppercase mb-4">
              Insights &amp; Research
            </p>
            <h1 className="font-display text-4xl font-semibold text-ghost-white tracking-tight md:text-5xl max-w-3xl">
              Engineering notes and research, from the ground up.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-text md:text-lg">
              A home for engineering articles, cybersecurity research,
              automation write-ups, development logs and Phantom Traders
              research as CodePhantom publishes them.
            </p>
          </Reveal>
        </div>
      </section>

      <Section className="border-t border-metallic-silver/10">
        <Reveal>
          <div className="flex flex-wrap gap-3 mb-14">
            {articleCategories.map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-metallic-silver/15 bg-surface/40 px-4 py-2 text-xs font-mono uppercase tracking-wide text-muted-text"
              >
                {cat}
              </span>
            ))}
          </div>
        </Reveal>

        {articles.length === 0 ? (
          <Reveal delay={100}>
            <div className="rounded-3xl border border-metallic-silver/10 bg-surface/30 p-10 text-center md:p-20">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-phantom-gradient/10 border border-phantom-purple/25">
                <span className="font-display text-2xl text-cyber-blue">
                  CP
                </span>
              </div>
              <h2 className="mt-8 font-display text-2xl font-semibold text-ghost-white md:text-3xl">
                Nothing published yet.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-text">
                CodePhantom Insights is live, but no articles have been
                written yet. When engineering notes, security research or
                Phantom Traders analysis are ready, they&rsquo;ll appear
                here — genuine content only, nothing pre-filled.
              </p>
              <div className="mt-8">
                <Button href="/contact" variant="secondary">
                  Get notified — contact us
                </Button>
              </div>
            </div>
          </Reveal>
        ) : null}
      </Section>
    </>
  );
}
