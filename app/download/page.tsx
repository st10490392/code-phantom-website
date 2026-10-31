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
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-3xl font-semibold uppercase tracking-tight text-ghost-white sm:text-4xl">
          Download CodePhantom Client
        </h1>
        <p className="mt-4 text-muted-text">
          Choose your platform. The client app requires a licence key to activate.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-metallic-silver/10 bg-midnight-navy/40 p-8">
            <h2 className="font-display text-xl font-semibold text-ghost-white">Android APK</h2>
            <p className="mt-3 text-sm text-muted-text">
              Download the lightweight Android app. Sign in with your account and activate your licence key.
            </p>
            <div className="mt-6">
              <Button
                href="https://github.com/st10490392/code-phantom-client/releases/latest"
                external
                className="w-full"
              >
                Download APK
              </Button>
            </div>
            <p className="mt-3 text-xs text-muted-text">
              Requires Android 8.0 or later.
            </p>
          </div>

          <div className="rounded-2xl border border-metallic-silver/10 bg-midnight-navy/40 p-8">
            <h2 className="font-display text-xl font-semibold text-ghost-white">Web / PWA</h2>
            <p className="mt-3 text-sm text-muted-text">
              Use the client directly in your browser. Install it as a PWA for a native app experience.
            </p>
            <div className="mt-6">
              <Button
                href="/"
                className="w-full"
              >
                Open Web Client
              </Button>
            </div>
            <p className="mt-3 text-xs text-muted-text">
              No installation required.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-metallic-silver/10 bg-midnight-navy/40 p-8 text-left">
          <h3 className="font-display text-lg font-semibold text-ghost-white">How to Install</h3>
          <div className="mt-4 space-y-4 text-sm text-muted-text">
            <div>
              <h4 className="font-semibold text-ghost-white">Android APK</h4>
              <ol className="mt-2 list-decimal list-inside space-y-1">
                <li>Download the APK from GitHub Releases</li>
                <li>Open the file on your Android device</li>
                <li>Tap &ldquo;Install&rdquo; (enable &ldquo;Unknown sources&rdquo; if prompted)</li>
                <li>Open the app and sign in</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold text-ghost-white">Web / PWA</h4>
              <ol className="mt-2 list-decimal list-inside space-y-1">
                <li>Open the Web Client link above</li>
                <li>Sign in with your account</li>
                <li>Tap your browser menu → &ldquo;Add to Home screen&rdquo;</li>
                <li>Launch from your home screen like a native app</li>
              </ol>
            </div>
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
