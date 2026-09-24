import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { PageHero, Prose } from "@/components/page-hero";
import { CommunityCta } from "@/components/community-cta";
import { socials } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Support",
  description: "How to get help with CodePhantom: accounts, activation, password recovery, lost or replaced phones.",
  alternates: { canonical: "/support" },
};

export default function SupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Getting help"
        description="CodePhantom products are still in development, so support is personal and handled by the CodePhantom team."
      />
      <Section className="border-t border-metallic-silver/10">
        <Prose>
          <h2>How to reach us</h2>
          <ul>
            <li>
              Use the channels on the <Link href="/contact">Contact</Link> page
              {socials.github ? (
                <>
                  {" "}(currently <a href={socials.github} target="_blank" rel="noopener noreferrer">GitHub</a>)
                </>
              ) : null}
              .
            </li>
            <li>Once the CodePhantom App is released, account holders can open support tickets inside the app.</li>
            <li>The CodePhantom Traders WhatsApp group is for community discussion - please do not post account details there.</li>
          </ul>

          <h2>Lost or replaced phone</h2>
          <p>
            Your licence belongs to your account, not your phone. Each account has one primary device by default, so moving
            to a new phone goes through support:
          </p>
          <ol>
            <li>Contact support from the email address on your account (or an in-app ticket once available).</li>
            <li>We verify that you are the account holder.</li>
            <li>We issue a one-time replacement device key. It expires after a short period and works only for your account.</li>
            <li>Install the app on the new phone, sign in and enter the replacement key.</li>
            <li>The new phone is authorised and the old phone is signed out and loses access. Your licence and markets are unchanged - this is not a new purchase.</li>
          </ol>
          <p>If your phone was stolen, tell us straight away so we can revoke it immediately, and change your password.</p>

          <h2>Forgot your password</h2>
          <p>
            Use &ldquo;Forgot password&rdquo; in the app. We will email a reset link to your account address if it exists - we
            show the same message either way so nobody can check which emails have accounts. The link opens the app, where you
            choose a new password; you are then signed out on all devices.
          </p>

          <h2>Activation keys</h2>
          <p>
            An activation key is used once, to activate your account&apos;s core licence. After that your account, not the key,
            gives you access. Upgrades are added to the same licence, so you never need a second key. Keep unused keys private.
          </p>

          <h2>We will never ask for</h2>
          <ul>
            <li>Your password or app PIN.</li>
            <li>Your broker login or trading account password.</li>
            <li>An activation or replacement key in a public chat or group.</li>
          </ul>

          <h2>Security issues</h2>
          <p>If you find a security problem, report it privately through the Contact page rather than in public channels.</p>
        </Prose>
        <CommunityCta className="mt-12 max-w-3xl" />
      </Section>
    </>
  );
}
