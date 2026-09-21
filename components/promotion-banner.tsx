import { activePromotions, type Promotion } from "@/lib/promotions";
import { ArrowRightIcon } from "@/components/icons";

/**
 * Renders nothing unless a real, active promotion exists for the given
 * scope. This is intentional — see lib/promotions.ts for why no
 * placeholder promotion is ever seeded.
 */
export function PromotionBanner({ division }: { division?: Promotion["division"] }) {
  const active = activePromotions(division);
  if (active.length === 0) return null;

  const promo = active[0];

  return (
    <div className="border-b border-phantom-purple/25 bg-gradient-to-r from-phantom-purple/15 via-cyber-blue/10 to-transparent">
      <div className="container-phantom flex flex-wrap items-center justify-between gap-3 py-3 text-sm">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-cyber-blue">
            {promo.campaignType}
          </span>
          <span className="text-ghost-white">{promo.title}</span>
          {promo.couponCode && (
            <code className="rounded border border-metallic-silver/20 bg-surface px-2 py-0.5 text-xs text-metallic-silver">
              {promo.couponCode}
            </code>
          )}
        </div>
        <a
          href={promo.ctaUrl}
          className="flex items-center gap-1 font-medium text-ghost-white hover:text-cyber-blue transition-colors"
        >
          {promo.cta}
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
