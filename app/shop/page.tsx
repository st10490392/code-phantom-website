import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { getPublicPlans, type PublicPlan } from "@/lib/platform-api";

export const metadata: Metadata = {
  title: "Shop",
  description: "CodePhantom plans and services published for sale by the platform owner.",
  alternates: { canonical: "/shop" },
};

export const revalidate = 300;

function formatPrice(plan: PublicPlan): string {
  if (plan.priceAmountMinor === null || !plan.priceCurrency) return "Contact CodePhantom";
  const amount = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: plan.priceCurrency,
  }).format(plan.priceAmountMinor / 100);
  if (!plan.billingInterval) return amount;
  return `${amount} / ${plan.billingInterval.toLowerCase()}`;
}

function billingLabel(plan: PublicPlan): string {
  if (plan.billingType === "LIFETIME") return "Lifetime";
  if (plan.billingType === "FIXED_TERM") return "Fixed term";
  if (plan.billingType === "SUBSCRIPTION") return "Subscription";
  return "Custom";
}

export default async function ShopPage() {
  const plans = await getPublicPlans();

  return (
    <>
      <PageHero
        eyebrow="Shop"
        title="CodePhantom services."
        description="Only plans explicitly published by the CodePhantom platform appear here. Payments remain outside the mobile app."
      />

      <Section className="border-t border-metallic-silver/10">
        {plans.length === 0 ? (
          <Reveal>
            <div className="mx-auto max-w-2xl rounded-2xl border border-metallic-silver/10 bg-midnight-navy/40 p-8 text-center">
              <h2 className="font-display text-2xl font-semibold text-ghost-white">
                Nothing is on sale right now.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-text">
                CodePhantom only publishes a plan here after the product, pricing and
                checkout configuration are ready. Existing users can continue to use
                the CodePhantom app for account and entitlement access.
              </p>
              <p className="mt-6 text-sm">
                <Link href="/products" className="text-cyber-blue hover:text-ghost-white">
                  View current products
                </Link>
              </p>
            </div>
          </Reveal>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {plans.map((plan, index) => (
                <Reveal key={plan.code} delay={index * 70}>
                  <article className="flex h-full flex-col rounded-2xl border border-metallic-silver/10 bg-midnight-navy/40 p-7">
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-cyber-blue">
                      {billingLabel(plan)}
                    </p>
                    <h2 className="mt-3 font-display text-2xl font-semibold text-ghost-white">
                      {plan.name}
                    </h2>
                    <p className="mt-5 text-2xl font-display text-ghost-white">
                      {formatPrice(plan)}
                    </p>
                    {plan.trialEligible ? (
                      <p className="mt-2 text-sm text-muted-text">
                        {plan.trialDays ? `${plan.trialDays}-day trial available` : "Trial available"}
                      </p>
                    ) : null}
                    <div className="mt-auto pt-8">
                      <p className="text-sm leading-relaxed text-muted-text">
                        Secure website checkout is being connected to the existing
                        CodePhantom backend. The app itself will not collect payment
                        details.
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <div className="mt-10 rounded-2xl border border-metallic-silver/10 bg-surface/30 p-6">
                <p className="text-sm leading-relaxed text-muted-text">
                  Checkout will use provider-hosted payment pages. CodePhantom does
                  not store card details in this website or in the mobile app, and
                  access is granted only after the backend confirms the payment.
                </p>
              </div>
            </Reveal>
          </>
        )}
      </Section>
    </>
  );
}
