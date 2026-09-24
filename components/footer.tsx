import { Logo } from "@/components/logo";
import { SocialLinks } from "@/components/social-links";
import { primaryNav, siteConfig } from "@/lib/site-config";
import { divisions } from "@/lib/divisions";
import Link from "next/link";
import { contractingPartyName } from "@/lib/company";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-metallic-silver/10 bg-midnight-navy/60">
      <div className="container-phantom py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo size={44} />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-text">
              {siteConfig.description}
            </p>
            <SocialLinks className="mt-6" />
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-text">
              Navigate
            </h3>
            <ul className="mt-5 space-y-3">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-metallic-silver hover:text-ghost-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-text">
              Divisions
            </h3>
            <ul className="mt-5 space-y-3">
              {divisions.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/divisions/${d.slug}`}
                    className="text-sm text-metallic-silver hover:text-ghost-white transition-colors"
                  >
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-text">
              Company
            </h3>
            <ul className="mt-5 space-y-3">
              <li>
                <Link href="/about" className="text-sm text-metallic-silver hover:text-ghost-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/founder" className="text-sm text-metallic-silver hover:text-ghost-white transition-colors">
                  Founder
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-metallic-silver hover:text-ghost-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-sm text-metallic-silver hover:text-ghost-white transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/download" className="text-sm text-metallic-silver hover:text-ghost-white transition-colors">
                  Download
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="text-sm text-metallic-silver hover:text-ghost-white transition-colors">
                  Changelog
                </Link>
              </li>
              <li>
                <Link href="/status" className="text-sm text-metallic-silver hover:text-ghost-white transition-colors">
                  Status
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-metallic-silver hover:text-ghost-white transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-metallic-silver hover:text-ghost-white transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-metallic-silver/10 pt-8 text-xs text-muted-text sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {contractingPartyName()}. All rights reserved.
          </p>
          <p className="font-mono tracking-wide text-muted-text/70">
            Engineering Intelligent Systems.
          </p>
        </div>
      </div>
    </footer>
  );
}
