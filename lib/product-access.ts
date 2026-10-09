import { getProduct } from "./products";
import { androidRelease, type AndroidRelease } from "./releases";
import { webAppUrl } from "./site-config";

/** Release metadata is authoritative; a configured host is not an uptime guarantee. */
export function appAccess(release: AndroidRelease | null = androidRelease(), web: string | null = webAppUrl) {
  const product = getProduct("codephantom-app");
  return {
    name: product?.name ?? "CodePhantom App",
    android: release,
    web,
    documentation: "/products/codephantom-app",
    support: "/support",
    registration: null,
    licence: "An account and the appropriate server-granted licence and market entitlements are required for protected product features.",
  };
}

export function appAccessAnswer(access = appAccess()): string {
  const parts = [`${access.name} access is listed on /download.`];
  if (access.android) {
    parts.push(`Android ${access.android.channel} ${access.android.version}: ${access.android.url} . SHA-256: ${access.android.sha256}. Use the official Download page to check release details.`);
  } else {
    parts.push("No Android download is configured. Use /contact for current availability.");
  }
  if (access.web) {
    parts.push(`The configured web/PWA entry point is ${access.web}. It is the existing family/beta staging service; availability can change. Desktop browsers and iPhone/iPad browsers can use the web app; no native iOS release is verified.`);
  } else {
    parts.push("No web-app URL is configured. No native iOS release is verified.");
  }
  parts.push(access.licence, "For onboarding or help, use /support or /contact. Never share trading passwords or API secrets.");
  return parts.join(" ");
}
