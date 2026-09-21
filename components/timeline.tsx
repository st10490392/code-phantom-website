import { timeline } from "@/lib/company-history";
import { Reveal } from "@/components/ui/reveal";

export function Timeline() {
  return (
    <ol className="relative border-l border-metallic-silver/15 pl-8 space-y-12">
      {timeline.map((step, i) => (
        <li key={step.label} className="relative">
          <Reveal delay={i * 80}>
            <span className="absolute -left-[2.35rem] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-phantom-gradient shadow-glow" />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-blue">
              Step {i + 1}
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold text-ghost-white">
              {step.label}
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-text">
              {step.detail}
            </p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
