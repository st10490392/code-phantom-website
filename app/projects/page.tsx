import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/cards";
import { projects, type ProjectCategory } from "@/lib/projects";
import { NetworkBackground } from "@/components/network-background";
import { GitHubIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Real, active CodePhantom engineering projects — Code Phantom EA, security tooling, Java software projects and web development.",
};

const categories: ProjectCategory[] = [
  "Quantitative Technology",
  "Cybersecurity",
  "Software Engineering",
  "Web Development",
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
              Selected engineering.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-text md:text-lg">
              Real projects, at various stages of development. See more on
              GitHub.
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

      {categories.map((category, ci) => {
        const items = projects.filter((p) => p.category === category);
        if (items.length === 0) return null;
        return (
          <Section
            key={category}
            className={ci === 0 ? "border-t border-metallic-silver/10" : "border-t border-metallic-silver/10 bg-midnight-navy/40"}
          >
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-ghost-white mb-8">
                {category}
              </h2>
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
