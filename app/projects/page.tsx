import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/cards";
import { projects, type ProjectScope } from "@/lib/projects";
import { NetworkBackground } from "@/components/network-background";
import { GitHubIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "CodePhantom engineering projects and products, plus clearly separated academic Java and C# portfolio work by founder GingerCodePhantom.",
};

const sections: {
  scope: ProjectScope;
  title: string;
  description: string;
}[] = [
  {
    scope: "CodePhantom",
    title: "CodePhantom Engineering",
    description:
      "Company products, platforms and research systems being built under CodePhantom Technologies.",
  },
  {
    scope: "Academic / Portfolio",
    title: "Academic / Portfolio Work",
    description:
      "Selected Java and C# coursework and Portfolio of Evidence projects from GingerCodePhantom's software-development studies. These demonstrate the founder's learning and engineering background; they are not CodePhantom products or commercial services.",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-24">
        <NetworkBackground className="absolute inset-0 opacity-40" />
        <div className="container-phantom relative">
          <Reveal>
            <p className="text-xs font-mono tracking-[0.3em] text-cyber-blue uppercase mb-4">
              Projects
            </p>
            <h1 className="font-display text-4xl font-semibold text-ghost-white tracking-tight md:text-5xl max-w-3xl">
              Engineering work, clearly separated.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-text md:text-lg">
              CodePhantom products and research are shown separately from the
              founder&rsquo;s academic Java and C# portfolio work.
            </p>
            <a
              href="https://github.com/st10490392"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-metallic-silver hover:text-ghost-white transition-colors"
            >
              <GitHubIcon className="h-4 w-4" />
              github.com/st10490392
            </a>
          </Reveal>
        </div>
      </section>

      {sections.map((section, si) => {
        const items = projects.filter((p) => p.scope === section.scope);
        if (items.length === 0) return null;
        return (
          <Section
            key={section.scope}
            className={
              si === 0
                ? "border-t border-metallic-silver/10"
                : "border-t border-metallic-silver/10 bg-midnight-navy/40"
            }
          >
            <Reveal>
              <div className="mb-8 max-w-3xl">
                <h2 className="font-display text-2xl font-semibold text-ghost-white">
                  {section.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-text">
                  {section.description}
                </p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p, i) => (
                <Reveal key={p.slug} delay={i * 80}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </Section>
        );
      })}
    </>
  );
}
