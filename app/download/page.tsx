import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { PageHero, Prose, StatusPill } from "@/components/page-hero";
import { CommunityCta } from "@/components/community-cta";
import { Button } from "@/components/ui/button";
import { androidRelease } from "@/lib/releases";

export const metadata: Metadata = {
  title: "Download",
  description: "Download the CodePhantom Android app when a release is available, and verify the file before installing.",
  alternates: { canonical: "/download" },
};

export default function DownloadPage() {
  const release = androidRelease();
  return (
    <>
      <PageHero
        eyebrow="Download"
        title="CodePhantom for Android"
        description={
          release
            ? "Download the current release and verify it before installing."
            : "There is no public release of the CodePhantom App yet. This page will list the official build once one is published."
        }
      />
      <Section className="border-t border-metallic-silver/10">
        {release ? (
          <div className="max-w-3xl rounded-2xl border border-metallic-silver/10 bg-midnight-navy/40 p-8">
            <div className="flex flex-wrap items-center gap-3">
              <StatusPill>{release.channel === "beta" ? "Beta" : "Stable"}</StatusPill>
              <span className="text-sm text-muted-text">
                Version {release.version} · released {release.date}
              </span>
            </div>
            <Button href={release.url} external className="mt-6">
              Download APK {release.version}
            </Button>
            <p className="mt-6 text-xs font-mono uppercase tracking-[0.25em] text-muted-text">SHA-256</p>
            <p className="mt-2 break-all font-mono text-xs text-metallic-silver">{release.sha256}</p>
          </div>
        ) : (
          <div className="max-w-3xl rounded-2xl border border-metallic-silver/10 bg-midnight-navy/40 p-8">
            <StatusPill>No public release yet</StatusPill>
            <p className="mt-4 text-sm leading-relaxed text-muted-text">
              The app is in development. We will not link to any unofficial or test build here. Follow the{" "}
              <Link href="/changelog" className="text-cyber-blue hover:text-ghost-white">changelog</Link> for release news.
            </p>
            <CommunityCta className="mt-6" />
          </div>
        )}

        <div className="mt-16">
          <Prose>
            <h2>Installing safely</h2>
            <ul>
              <li>Only install CodePhantom builds linked from this page (or an official store listing announced here).</li>
              <li>
                Check the file before installing: on a computer run <code>sha256sum</code> (Linux/macOS) or{" "}
                <code>certutil -hashfile &lt;file&gt; SHA256</code> (Windows) and compare it with the SHA-256 shown above.
              </li>
              <li>Android will ask you to allow installs from your browser for a direct APK. Turn that permission off again afterwards.</li>
              <li>CodePhantom will never send you an APK over WhatsApp or ask you to install one from another site.</li>
            </ul>
            <h2>After installing</h2>
            <p>
              Sign in with your email or username, enter your one-time activation key once, and set a PIN for the device. If
              you are moving to a new phone, contact <Link href="/support">support</Link> for a replacement key.
            </p>
          </Prose>
        </div>
      </Section>
    </>
  );
}
