/**
 * Public app releases for /download.
 *
 * The current signed family/beta release is kept as a verified fallback so
 * the website can offer the Android app without depending on deployment
 * environment variables. A future release can override it by setting all five
 * NEXT_PUBLIC_ANDROID_RELEASE_* values together.
 *
 * The URL must be https on github.com (release asset) or on this site's own
 * configured domain.
 */
import { siteUrl } from "@/lib/site-config";

export type AndroidRelease = {
  version: string;
  url: string;
  sha256: string;
  date: string;
  channel: "beta" | "stable";
};

const officialAndroidRelease: Record<string, string> = {
  version: "1.0.0+3",
  url: "https://github.com/st10490392/code-phantom-website/releases/download/codephantom-v1.0.0/CodePhantom-v1.0.0-build3.apk",
  sha256: "d978609518eaf5e0a92dcc5c4c13ca47131014f13a35e64a15afc9dd26d4c1f7",
  date: "2026-10-01",
  channel: "beta",
};

function deployedReleaseEnv(): Record<string, string | undefined> {
  const configured = {
    version: process.env.NEXT_PUBLIC_ANDROID_RELEASE_VERSION,
    url: process.env.NEXT_PUBLIC_ANDROID_RELEASE_URL,
    sha256: process.env.NEXT_PUBLIC_ANDROID_RELEASE_SHA256,
    date: process.env.NEXT_PUBLIC_ANDROID_RELEASE_DATE,
    channel: process.env.NEXT_PUBLIC_ANDROID_RELEASE_CHANNEL,
  };
  return Object.values(configured).every((value) => value?.trim())
    ? configured
    : officialAndroidRelease;
}

function allowedHost(url: URL): boolean {
  if (url.hostname === "github.com") return /^\/[^/]+\/[^/]+\/releases\/download\/[^/]+\/[^/]+\.apk$/.test(url.pathname);
  try {
    return url.hostname === new URL(siteUrl).hostname && url.pathname.endsWith(".apk");
  } catch {
    return false;
  }
}

export function androidRelease(
  env: Record<string, string | undefined> = deployedReleaseEnv(),
): AndroidRelease | null {
  const version = env.version?.trim();
  const rawUrl = env.url?.trim();
  const sha256 = env.sha256?.trim().toLowerCase();
  const date = env.date?.trim();
  const channel = env.channel?.trim();
  if (!version || !/^\d+\.\d+\.\d+([-+][0-9A-Za-z.-]+)?$/.test(version)) return null;
  if (!sha256 || !/^[0-9a-f]{64}$/.test(sha256)) return null;
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
  if (channel !== "beta" && channel !== "stable") return null;
  if (!rawUrl) return null;
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" || url.username || url.password || !allowedHost(url)) return null;
  return { version, url: url.toString(), sha256, date, channel };
}
