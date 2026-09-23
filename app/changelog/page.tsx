import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { PageHero, StatusPill } from "@/components/page-hero";
import { changelog } from "@/lib/changelog";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What has changed across the CodePhantom website, platform and products.",
  alternates: { canonical: "/changelog" },
};

export default function ChangelogPage() {
  return (
    <>
      <PageHero
        eyebrow="Changelog"
        title="What changed."
        description="Entries marked Internal describe groundwork that exists but is not yet available to the public."
      />
      <Section className="border-t border-metallic-silver/10">
        <ol className="max-w-3xl space-y-12">
          {changelog.map((entry, i) => (
            <Reveal key={`${entry.date}-${entry.title}`} delay={i * 60}>
              <li>
                <div className="flex flex-wrap items-center gap-3">
                  <time className="font-mono text-xs text-muted-text" dateTime={entry.date}>
                    {entry.date}
                  </time>
                  <StatusPill>{entry.scope}</StatusPill>
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-text">{entry.visibility}</span>
                </div>
                <h2 className="mt-3 font-display text-xl font-semibold text-ghost-white">{entry.title}</h2>
                <ul className="mt-3 list-disc space-y-2 pl-6 text-sm leading-relaxed text-muted-text">
                  {entry.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>
    </>
  );
}
