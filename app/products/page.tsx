import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ProductCard } from "@/components/cards";
import { products } from "@/lib/products";
import { NetworkBackground } from "@/components/network-background";

export const metadata: Metadata = {
  title: "Products",
  description:
    "CPT Scanner, Code Phantom EA, CodePhantom Client and the CodePhantom App — licensed software products from CodePhantom Technologies.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-24">
        <NetworkBackground className="absolute inset-0 opacity-40" />
        <div className="container-phantom relative">
          <Reveal>
            <p className="text-xs font-mono tracking-[0.3em] text-cyber-blue uppercase mb-4">
              Products
            </p>
            <h1 className="font-display text-4xl font-semibold text-ghost-white tracking-tight md:text-5xl max-w-3xl">
              Software products. Licensed, not sold.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-text md:text-lg">
              Each product is a licensed software artefact — not a managed
              service, not a subscription to trading activity. Access is
              governed by licence tiers, and every product carries a clear
              readiness label.
            </p>
          </Reveal>
        </div>
      </section>

      <Section className="border-t border-metallic-silver/10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}