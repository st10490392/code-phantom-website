import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { PageHero, StatusPill } from "@/components/page-hero";
import { getProduct, products, scannerMarketPacks, scannerMarkets, tradingRiskNotice } from "@/lib/products";
import { getPublicPlans, type PublicPlan } from "@/lib/platform-api";

// Rebuild hourly so a plan the owner publishes in the backend appears
// without a redeploy.
export const revalidate = 3600;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.summary} Status: ${product.readiness}.`,
    alternates: { canonical: `/products/${product.slug}` },
  };
}

function formatPrice(plan: PublicPlan): string | null {
  if (plan.priceAmountMinor === null || !plan.priceCurrency) return null;
  const amount = new Intl.NumberFormat("en-ZA", { style: "currency", currency: plan.priceCurrency }).format(plan.priceAmountMinor / 100);
  const interval = plan.billingInterval ? ` / ${plan.billingInterval.toLowerCase()}` : "";
  return `${amount}${interval}`;
}

async function MarketPacks() {
  const published = new Map((await getPublicPlans()).map((p) => [p.code, p]));
  return (
    <Section className="border-t border-metallic-silver/10 bg-midnight-navy/40">
      <Reveal>
        <SectionHeading
          eyebrow="Market packs"
          title="Access by market"
          description="Scanner access is granted per market on your one CodePhantom account. Upgrading adds markets to the same licence."
        />
      </Reveal>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {scannerMarkets.map((m) => (
          <div key={m.name} className="rounded-2xl border border-metallic-silver/10 bg-surface/40 p-6">
            <p className="font-display text-lg text-ghost-white">{m.name}</p>
            <p className="mt-2 text-xs font-mono uppercase tracking-[0.2em] text-cyber-blue">{m.status}</p>
            {m.note ? <p className="mt-3 text-sm text-muted-text">{m.note}</p> : null}
          </div>
        ))}
      </div>
      <div className="mt-10 overflow-x-auto rounded-2xl border border-metallic-silver/10">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-surface/40 text-xs font-mono uppercase tracking-[0.2em] text-muted-text">
            <tr>
              <th className="px-6 py-4 font-normal">Pack</th>
              <th className="px-6 py-4 font-normal">Markets</th>
              <th className="px-6 py-4 font-normal">Availability</th>
            </tr>
          </thead>
          <tbody>
            {scannerMarketPacks.map((pack) => {
              const plan = published.get(pack.planCode);
              const price = plan ? formatPrice(plan) : null;
              return (
                <tr key={pack.planCode} className="border-t border-metallic-silver/10">
                  <td className="px-6 py-4 text-ghost-white">{pack.name}</td>
                  <td className="px-6 py-4 text-muted-text">{pack.markets.join(" + ")}</td>
                  <td className="px-6 py-4 text-muted-text">
                    {plan ? (price ? `Available · ${price}` : "Available - see the app for pricing") : "Not currently available"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-text">
        Packs are configured on the CodePhantom platform but are not on sale. Pricing, trials and subscription terms will be
        published here when a pack becomes available. Packs that include Synthetics will not be offered while that market
        is still in research.
      </p>
    </Section>
  );
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  return (
    <>
      <PageHero eyebrow="Product" title={product.name} description={product.summary}>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <StatusPill>{product.readiness}</StatusPill>
          <span className="text-sm text-muted-text">{product.readinessNote}</span>
        </div>
      </PageHero>

      <Section className="border-t border-metallic-silver/10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {product.description.map((p, i) => (
              <Reveal key={i} delay={i * 60}>
                <p className="text-base leading-relaxed text-muted-text">{p}</p>
              </Reveal>
            ))}
            {product.notes?.map((n, i) => (
              <p key={`n${i}`} className="text-sm leading-relaxed text-metallic-silver">
                {n}
              </p>
            ))}
          </div>
          <Reveal delay={120}>
            <div className="rounded-2xl border border-metallic-silver/10 bg-midnight-navy/40 p-6">
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-text">Highlights</p>
              <ul className="mt-4 space-y-3 text-sm text-metallic-silver">
                {product.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <p className="mt-6 text-xs font-mono uppercase tracking-[0.25em] text-muted-text">Platforms</p>
              <p className="mt-2 text-sm text-metallic-silver">{product.platforms.join(", ")}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {product.slug === "cpt-scanner" ? <MarketPacks /> : null}

      <Section className="border-t border-metallic-silver/10">
        <p className="max-w-3xl text-xs leading-relaxed text-muted-text">{tradingRiskNotice}</p>
        <p className="mt-4 text-sm text-metallic-silver">
          Questions? See <Link href="/support" className="text-cyber-blue hover:text-ghost-white">Support</Link> or{" "}
          <Link href="/products" className="text-cyber-blue hover:text-ghost-white">all products</Link>.
        </p>
      </Section>
    </>
  );
}
