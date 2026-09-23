import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { PageHero, Prose } from "@/components/page-hero";
import { contractingPartyName, legalEntityNotice } from "@/lib/company";
import { tradingRiskNotice } from "@/lib/products";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for using the CodePhantom website and, once launched, CodePhantom accounts and products.",
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "2026-09-23";

export default function TermsPage() {
  const party = contractingPartyName();
  return (
    <>
      <PageHero
        eyebrow="Terms"
        title="Terms of use"
        description={`Draft - last updated ${LAST_UPDATED}. Full terms of sale, subscription and refund terms will be published before any product is sold.`}
      />
      <Section className="border-t border-metallic-silver/10">
        <Prose>
          <h2>Who you are dealing with</h2>
          <p>{legalEntityNotice()} In these terms, &ldquo;we&rdquo; means {party}.</p>

          <h2>Not financial advice</h2>
          <p>{tradingRiskNotice}</p>
          <p>
            Nothing on this website, in our apps, in Scanner setups or in the CodePhantom Traders group is a recommendation to
            buy or sell anything. You are solely responsible for your trading decisions. We do not offer managed accounts,
            copy trading or investment management.
          </p>

          <h2>Products in development</h2>
          <p>
            Our products are in development and are described with their current readiness on the{" "}
            <Link href="/products">Products</Link> page. Features, markets and availability may change. Until a product is
            generally available it is provided as-is, without guarantees of availability or accuracy.
          </p>

          <h2>Accounts, licences and devices (when launched)</h2>
          <ul>
            <li>One person per account. Keep your password and PIN private; you are responsible for activity on your account.</li>
            <li>Each account has one core licence, activated with a one-time activation key. Keys are single-use and may not be sold or shared.</li>
            <li>Access is limited to the market packs your account is entitled to, and to your authorised device (one primary device by default).</li>
            <li>Account sharing, reselling access, redistributing setups, reverse engineering or attempting to bypass device or licence controls are not allowed and may lead to suspension.</li>
            <li>A lost or replaced phone is moved to a new device through <Link href="/support">support</Link> with a one-time replacement key.</li>
          </ul>

          <h2>Plans, trials and referrals</h2>
          <p>Only plans shown as available on this site or in the app can be bought. Prices, subscription periods, trial and referral terms will be stated at the point of sale.</p>

          <h2>Intellectual property</h2>
          <p>The CodePhantom name, logo, website content and software belong to us. You may not copy or redistribute them without permission.</p>

          <h2>Liability</h2>
          <p>To the extent permitted by law, we are not liable for trading losses or for indirect or consequential loss arising from use of our website or products. Nothing in these terms limits rights you have under South African consumer law.</p>

          <h2>Law</h2>
          <p>These terms are governed by the laws of the Republic of South Africa.</p>

          <h2>Contact</h2>
          <p>See the <Link href="/contact">Contact</Link> page.</p>
        </Prose>
      </Section>
    </>
  );
}
