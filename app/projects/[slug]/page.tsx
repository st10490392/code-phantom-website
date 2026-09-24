import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section, Badge } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { getProject, projects } from "@/lib/projects";
import { ArrowRightIcon, GitHubIcon } from "@/components/icons";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
  };
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-16 md:pt-48 md:pb-20">
        <div className="container-phantom relative">
          <Reveal>
            <Link
              href="/projects"
              className="text-sm text-muted-text hover:text-ghost-white transition-colors"
            >
              ← All projects
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Badge>{project.scope}</Badge>
              <Badge>{project.category}</Badge>
              <span className="text-xs font-mono text-muted-text">
                {project.status}
              </span>
            </div>
            <h1 className="mt-6 font-display text-4xl font-semibold text-ghost-white tracking-tight md:text-5xl max-w-3xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-text md:text-lg">
              {project.summary}
            </p>
          </Reveal>
        </div>
      </section>

      <Section className="border-t border-metallic-silver/10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <Reveal>
              <div>
                <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-cyber-blue mb-3">
                  Overview
                </h2>
                <p className="text-base leading-relaxed text-muted-text">
                  {project.description}
                </p>
              </div>
            </Reveal>

            {project.research && (
              <Reveal delay={80}>
                <div className="rounded-2xl border border-electric-blue/20 bg-surface/40 p-6">
                  <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-cyber-blue mb-3">
                    Research Note
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-text">
                    {project.research}
                  </p>
                </div>
              </Reveal>
            )}
          </div>

          <Reveal delay={120}>
            <div className="rounded-2xl border border-metallic-silver/10 bg-surface/40 p-6 space-y-6">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-text">
                  Status
                </h3>
                <p className="mt-1 text-sm text-ghost-white">{project.status}</p>
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-text">
                  Scope
                </h3>
                <p className="mt-1 text-sm text-ghost-white">{project.scope}</p>
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-text">
                  Category
                </h3>
                <p className="mt-1 text-sm text-ghost-white">{project.category}</p>
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-text">
                  Technologies
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-metallic-silver/15 px-2.5 py-1 text-[0.65rem] font-mono text-muted-text"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-text">
                  Date
                </h3>
                <p className="mt-1 text-sm text-ghost-white">{formatDate(project.date)}</p>
              </div>
              {project.githubUrl && (
                <Button
                  href={project.githubUrl}
                  external
                  variant="secondary"
                  className="w-full"
                  icon={<GitHubIcon className="h-4 w-4" />}
                >
                  View on GitHub
                </Button>
              )}
              {project.demoUrl && (
                <Button
                  href={project.demoUrl}
                  external
                  variant="ghost"
                  className="w-full"
                  icon={<ArrowRightIcon className="h-4 w-4" />}
                >
                  View Demo
                </Button>
              )}
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
