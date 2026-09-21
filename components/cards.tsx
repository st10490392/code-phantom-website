import Link from "next/link";
import type { Capability } from "@/lib/capabilities";
import type { Division } from "@/lib/divisions";
import type { Project } from "@/lib/projects";
import { CodeIcon, ShieldIcon, AutomationIcon, ChartIcon, ArrowRightIcon } from "@/components/icons";
import { Badge } from "@/components/ui/section";

const iconMap = {
  code: CodeIcon,
  shield: ShieldIcon,
  automation: AutomationIcon,
  chart: ChartIcon,
};

export function CapabilityCard({ capability }: { capability: Capability }) {
  const Icon = iconMap[capability.icon];
  return (
    <div className="card-hover group relative rounded-2xl border border-metallic-silver/10 bg-surface/50 p-8 h-full flex flex-col">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-phantom-gradient/10 border border-phantom-purple/25 text-cyber-blue">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-6 font-display text-xl font-semibold text-ghost-white">
        {capability.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-text flex-1">
        {capability.short}
      </p>
    </div>
  );
}

export function DivisionCard({ division }: { division: Division }) {
  return (
    <Link
      href={`/divisions/${division.slug}`}
      className="card-hover group flex flex-col justify-between rounded-2xl border border-metallic-silver/10 bg-surface/40 p-8 md:p-10 h-full"
    >
      <div>
        <span className="font-mono text-5xl md:text-6xl font-light text-transparent [-webkit-text-stroke:1px_#7C3AED55] group-hover:[-webkit-text-stroke:1px_#7C3AED] transition-all">
          {division.number}
        </span>
        <h3 className="mt-6 font-display text-2xl font-semibold text-ghost-white">
          {division.name}
        </h3>
        <p className="mt-2 text-sm text-cyber-blue">{division.tagline}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted-text">
          {division.description}
        </p>
      </div>
      <div className="mt-8 flex items-center gap-2 text-sm font-medium text-ghost-white/80 group-hover:text-ghost-white transition-colors">
        Explore division
        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card-hover group flex flex-col rounded-2xl border border-metallic-silver/10 bg-surface/40 p-7 h-full"
    >
      <div className="flex items-center justify-between gap-3">
        <Badge>{project.category}</Badge>
        <span className="text-xs font-mono text-muted-text">{project.status}</span>
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold text-ghost-white">
        {project.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-text flex-1">
        {project.summary}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.technologies.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-metallic-silver/15 px-2.5 py-1 text-[0.65rem] font-mono text-muted-text"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-ghost-white/80 group-hover:text-ghost-white transition-colors">
        View project
        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
