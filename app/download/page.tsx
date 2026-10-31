import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Download CodePhantom Client",
  description: "Download the CodePhantom Client app for Android or use the web PWA.",
  alternates: { canonical: "/download" },
};

export default function DownloadPage() {
  return (
    <Section className="border-t border-metallic-silver/10">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-3xl font-semibold uppercase tracking-tight text-ghost-white sm:text-4xl">
          Download CodePhantom Client
        </h1>
        <p className="mt-4 text-muted-text">
          Choose your platform. The client app requires a licence key to activate.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-metallic-silver/10 bg-midnight-navy/40 p-8 text-left">
            <h2 className="font-display text-xl font-semibold text-ghost-white">Android APK</h2>
            <p className="mt-3 text-sm text-muted-text">
              Direct download. Install and activate with your licence key.
            </p>
            <div className="mt-6 space-y-3">
              <Button
                href="https://github.com/st10490392/code-phantom-client/releases/latest"
                external
                className="w-full"
              >
                Download APK
              </Button>
            </div>
            <div className="mt-6">
              <h3 className="font-display text-sm font-semibold text-ghost-white">Installation</h3>
              <ol className="mt-2 list-decimal list-inside space-y-1 text-sm text-muted-text">
                <li>Download the APK</li>
                <li>Open on your Android device</li>
                <li>Tap Install (enable Unknown sources if prompted)</li>
                <li>Open app and sign in</li>
              </ol>
            </div>
          </div>

          <div className="rounded-2xl border border-metallic-silver/10 bg-midnight-navy/40 p-8 text-left">
            <h2 className="font-display text-xl font-semibold text-ghost-white">Web / PWA</h2>
            <p className="mt-3 text-sm text-muted-text">
              Use in browser or install as PWA. Works on iOS and Android.
            </p>
            <div className="mt-6">
              <Button
                href="/"
                className="w-full"
              >
                Open Web Client
              </Button>
            </div>
            <div className="mt-6">
              <h3 className="font-display text-sm font-semibold text-ghost-white">Installation</h3>
              <ol className="mt-2 list-decimal list-inside space-y-1 text-sm text-muted-text">
                <li>Open the Web Client link above</li>
                <li>Sign in with your account</li>
                <li>Add to Home Screen (browser menu)</li>
                <li>Launch from home screen like a native app</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-metallic-silver/10 bg-midnight-navy/40 p-8 text-left">
          <h3 className="font-display text-lg font-semibold text-ghost-white">Voice Control</h3>
          <p className="mt-3 text-sm text-muted-text">
            Talk to ASTRO like Siri. Choose your platform:
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <h4 className="font-semibold text-ghost-white text-sm">Telegram Voice</h4>
              <p className="mt-1 text-sm text-muted-text">
                Open Telegram → Find your bot → Hold mic button → Speak → Get voice reply
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-ghost-white text-sm">PWA Voice (Beta)</h4>
              <p className="mt-1 text-sm text-muted-text">
                Open Web Client → Tap microphone button → Speak → Hear reply
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-xl border border-metallic-silver/10 bg-surface/40 p-4">
            <h4 className="font-semibold text-ghost-white text-sm">Quick Shortcuts</h4>
            <ul className="mt-2 space-y-1 text-sm text-muted-text list-disc list-inside">
              <li><strong>iOS:</strong> Say Hey Siri, open Telegram to launch your bot</li>
              <li><strong>Android:</strong> Add PWA to home screen for one-tap access</li>
              <li><strong>Both:</strong> Use browser widgets for quick access</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-metallic-silver/10 bg-midnight-navy/40 p-8 text-left">
          <h3 className="font-display text-lg font-semibold text-ghost-white">Licence Keys</h3>
          <p className="mt-3 text-sm text-muted-text">
            Licence keys are account-bound and device-locked. They cannot be reused or shared across accounts.
            Contact support if you need a replacement key for a lost or replaced device.
          </p>
        </div>
      </div>
    </Section>
  );
}
