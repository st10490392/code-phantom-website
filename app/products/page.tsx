import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { PageHero, StatusPill } from "@/components/page-hero";
import { ArrowRightIcon } from "@/components/icons";
import { products, tradingRiskNotice } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description: "CodePhantom products and their current readiness: CPT Scanner, the CodePhantom App and Code Phantom EA.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="What we are building."
        description="Every product below is still in development. Readiness is stated plainly; nothing here is on sale yet."
      />
      <Section className="border-t border-metallic-silver/10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <Link
                href={`/products/${p.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-metallic-silver/10 bg-midnight-navy/40 p-8 transition-colors hover:border-cyber-blue/40"
              >
                <StatusPill>{p.readiness}</StatusPill>
                <h2 className="mt-6 font-display text-2xl font-semibold text-ghost-white">{p.name}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-text">{p.summary}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm text-metallic-silver group-hover:text-ghost-white">
                  Details <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="mt-12 max-w-3xl text-xs leading-relaxed text-muted-text">{tradingRiskNotice}</p>
      </Section>
    </>
  );
}
