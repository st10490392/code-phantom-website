import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { PageHero, Prose, StatusPill } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { androidRelease } from "@/lib/releases";
import { webAppUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Get CodePhantom",
  description: "Install or open CodePhantom on Android, iPhone, iPad and desktop from one official page.",
  alternates: { canonical: "/download" },
};

export default function DownloadPage() {
  const release = androidRelease();
  return (
    <>
      <PageHero
        eyebrow="Get the app"
        title="CodePhantom on every device"
        description="Use the same CodePhantom account on Android, Apple devices and desktop. The web app is the official iPhone/iPad and browser experience for this release."
      />

      <Section className="border-t border-metallic-silver/10">
        <div className="grid max-w-5xl gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-cyber-blue/25 bg-midnight-navy/40 p-8">
            <div className="flex flex-wrap items-center gap-3">
              <StatusPill>Web / Apple</StatusPill>
              <span className="text-sm text-muted-text">Available now</span>
            </div>
            <h2 className="mt-5 font-display text-2xl text-ghost-white">Open CodePhantom</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-text">
              Works in Safari, Chrome, Edge and other modern browsers. iPhone and iPad users can add the app to the Home Screen for an app-like experience.
            </p>
            <Button href={webAppUrl} external className="mt-6">
              Open Web App
            </Button>
            <p className="mt-5 text-xs leading-relaxed text-muted-text">
              iPhone/iPad: open in Safari → Share → Add to Home Screen. Desktop browsers may also offer an Install App option.
            </p>
          </div>

          {release ? (
            <div className="rounded-2xl border border-phantom-purple/25 bg-midnight-navy/40 p-8">
              <div className="flex flex-wrap items-center gap-3">
                <StatusPill>{release.channel === "beta" ? "Android beta" : "Android stable"}</StatusPill>
                <span className="text-sm text-muted-text">
                  Version {release.version} · released {release.date}
                </span>
              </div>
              <h2 className="mt-5 font-display text-2xl text-ghost-white">Android native app</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-text">
                Download the signed CodePhantom APK directly from this official page.
              </p>
              <Button href={release.url} external className="mt-6">
                Download APK {release.version}
              </Button>
              <p className="mt-6 text-xs font-mono uppercase tracking-[0.25em] text-muted-text">SHA-256</p>
              <p className="mt-2 break-all font-mono text-xs text-metallic-silver">{release.sha256}</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-metallic-silver/10 bg-midnight-navy/40 p-8">
              <StatusPill>Android</StatusPill>
              <h2 className="mt-5 font-display text-2xl text-ghost-white">Use the web app now</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-text">
                The full browser/PWA version works on Android today. The signed native APK will appear here once its public release file is attached to the official site.
              </p>
              <Button href={webAppUrl} external className="mt-6">
                Open on Android
              </Button>
            </div>
          )}
        </div>

        <div className="mt-16 max-w-4xl">
          <Prose>
            <h2>Account and Scanner access</h2>
            <p>
              Create or sign in to your CodePhantom account in the app. New client accounts enter a one-time Scanner activation key issued by CodePhantom. A replacement phone uses a separate replacement-device key after identity verification.
            </p>
            <h2>Installing safely</h2>
            <ul>
              <li>Use this page as the official starting point for CodePhantom app access.</li>
              <li>If an Android APK is listed above, verify its SHA-256 before installing it.</li>
              <li>Android may ask you to allow installs from your browser for a direct APK. Turn that permission off again afterwards.</li>
              <li>Do not trust APK files forwarded through WhatsApp or hosted on unrelated sites.</li>
            </ul>
            <h2>Need help?</h2>
            <p>
              Visit <Link href="/support">support</Link> if you cannot activate an account or need to move an existing licence to a replacement device.
            </p>
          </Prose>
        </div>
      </Section>
    </>
  );
}
