import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/icons";
import type { LicencePlan } from "@/lib/licensing";

export function LicenceTierSelector({ tiers }: { tiers: LicencePlan[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
      {tiers.map((tier) => (
        <div
          key={tier.tier}
          className={`relative flex flex-col rounded-3xl border p-8 ${
            tier.highlighted
              ? "border-phantom-purple/40 bg-phantom-gradient/10 scale-[1.02]"
              : "border-metallic-silver/10 bg-surface/40"
          }`}
        >
          {tier.highlighted && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-phantom-gradient px-4 py-1 text-xs font-mono font-medium text-ghost-white">
              Most Popular
            </span>
          )}
          <h3 className="font-display text-lg font-semibold text-ghost-white">
            {tier.tier}
          </h3>
          <p className="mt-1 text-sm text-cyber-blue">{tier.tagline}</p>
          <div className="mt-6 flex items-baseline gap-1">
            <span className="font-display text-4xl font-semibold text-ghost-white">
              {tier.price}
            </span>
            <span className="text-sm text-muted-text">{tier.priceSubtext}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-text flex-1">
            {tier.description}
          </p>
          <ul className="mt-6 space-y-3">
            {tier.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-ghost-white/80">
                <ArrowRightIcon className="mt-0.5 h-4 w-4 shrink-0 text-cyber-blue" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button
              href="/contact"
              variant={tier.highlighted ? "primary" : "secondary"}
              className="w-full"
            >
              {tier.cta}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}