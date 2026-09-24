/**
 * Public app releases for /download.
 *
 * A release is shown ONLY when every field is configured for the
 * deployment - there is no placeholder, no "coming soon" button and no
 * fake file. Values come from environment variables so publishing a
 * release needs no code change:
 *
 *   NEXT_PUBLIC_ANDROID_RELEASE_VERSION   e.g. 0.2.0
 *   NEXT_PUBLIC_ANDROID_RELEASE_URL       https://github.com/<owner>/<repo>/releases/download/<tag>/app-release.apk
 *   NEXT_PUBLIC_ANDROID_RELEASE_SHA256    64 hex chars (from SHA256SUMS.txt of the release workflow)
 *   NEXT_PUBLIC_ANDROID_RELEASE_DATE      YYYY-MM-DD
 *   NEXT_PUBLIC_ANDROID_RELEASE_CHANNEL   beta | stable
 *
 * The URL must be https on github.com (release asset) or on this site's
 * own configured domain.
 */
import { siteUrl } from "@/lib/site-config";

export type AndroidRelease = {
  version: string;
  url: string;
  sha256: string;
  date: string;
  channel: "beta" | "stable";
};

function allowedHost(url: URL): boolean {
  if (url.hostname === "github.com") return /^\/[^/]+\/[^/]+\/releases\/download\/[^/]+\/[^/]+\.apk$/.test(url.pathname);
  try {
    return url.hostname === new URL(siteUrl).hostname && url.pathname.endsWith(".apk");
  } catch {
    return false;
  }
}

export function androidRelease(env: Record<string, string | undefined> = {
  version: process.env.NEXT_PUBLIC_ANDROID_RELEASE_VERSION,
  url: process.env.NEXT_PUBLIC_ANDROID_RELEASE_URL,
  sha256: process.env.NEXT_PUBLIC_ANDROID_RELEASE_SHA256,
  date: process.env.NEXT_PUBLIC_ANDROID_RELEASE_DATE,
  channel: process.env.NEXT_PUBLIC_ANDROID_RELEASE_CHANNEL,
}): AndroidRelease | null {
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
