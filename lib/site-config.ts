import { company, founderByline } from "@/lib/company";

/**
 * Central site configuration: identity, socials, and contact channels.
 *
 * IMPORTANT: Only include values that are actually confirmed. Unset fields
 * (null) must cause the corresponding UI (icons, links, sections) to hide
 * gracefully rather than render a dead/fake link. Do not invent values here.
 *
 * This file is the single source of truth so a future CodePhantom Admin /
 * CMS can migrate this data without touching component code.
 */

/**
 * The production domain has not been confirmed as owned/deployed yet, so it
 * is never hard-coded. Metadata (canonical URLs, OpenGraph, sitemap,
 * structured data) reads from NEXT_PUBLIC_SITE_URL at build/deploy time.
 * Until that's configured, everything falls back to a safe local value —
 * this must never be swapped for a guessed production domain.
 */
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
export const siteUrl =
  configuredSiteUrl && configuredSiteUrl.length > 0
    ? configuredSiteUrl.replace(/\/$/, "")
    : "http://localhost:3000";

export const siteConfig = {
  name: company.brand.name,
  shortName: company.brand.shortName,
  tagline: company.brand.tagline,
  description:
    "CodePhantom Technologies engineers software, security, automation and quantitative systems designed to solve complex problems with precision.",
  url: siteUrl,
  locale: "en_US",
  themeColor: "#05070D",
  founder: {
    name: company.founder.publicName,
    role: founderByline,
  },
} as const;

/**
 * COMPANY social + contact channels. Set a value to `null` when it has not
 * been confirmed yet — every consumer of this object must treat `null` as
 * "hide this channel entirely," never as a placeholder to render.
 *
 * CodePhantom does not currently operate dedicated company social accounts.
 * This shape stays ready for a company LinkedIn page, company Instagram,
 * WhatsApp Business line and company email once each is actually set up —
 * none of those are fabricated here in the meantime.
 *
 * Keep this conceptually separate from `founderSocials` below: the founder's
 * personal GitHub/LinkedIn/Instagram are his own accounts, not official
 * CodePhantom channels, even where (like GitHub today) they point at the
 * same place for practical reasons.
 */
export const socials = {
  github: "https://github.com/st10490392",
  linkedin: null as string | null,
  instagram: null as string | null,
  whatsapp: null as string | null,
  email: null as string | null,
} as const;

export type SocialKey = keyof typeof socials;

export const hasAnyContactChannel = Object.values(socials).some(
  (v) => v !== null
);

/**
 * Founder-specific social channels (GingerCodePhantom's own accounts). Instagram in
 * particular is his personal/professional account, used for both
 * CodePhantom-related and lifestyle content — it must never be presented as
 * an official CodePhantom Technologies channel. He currently has only a
 * personal WhatsApp number, which is intentionally not included here; a
 * dedicated CodePhantom WhatsApp Business line will be added later under
 * `socials.whatsapp` once one exists.
 */
export const founderSocials = {
  github: "https://github.com/st10490392",
  linkedin: "https://www.linkedin.com/in/ripfumelo-ngobeni-753545389",
  instagram: "https://www.instagram.com/gingercodephantom",
} as const;

/**
 * CodePhantom community channels (distinct from 1:1 contact channels).
 *
 * The WhatsApp group is "CodePhantom Traders" (the existing group, formerly
 * TAT Market Direction). Its invite link is configured per deployment
 * through NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL so it can be set or rotated
 * without a code change; see parseWhatsAppInvite for what is accepted.
 * Unset or invalid hides the community CTA entirely. Never put a personal
 * phone number here.
 */
const WHATSAPP_INVITE_CODE = /^[A-Za-z0-9]{10,40}$/;

/**
 * Accepts a genuine WhatsApp group invite link and returns its canonical
 * form, or null. Accepted: https, host exactly chat.whatsapp.com, default
 * port, no credentials, a single path segment that is an invite code
 * (optional trailing slash), and optional query parameters such as the
 * share-tracking ones WhatsApp adds (?s=cl&p=a&...). The canonical URL
 * drops the query string and fragment: the invite code alone opens the
 * group, and nothing caller-supplied beyond the code reaches the page.
 * Rejected: other hosts (incl. look-alikes such as
 * chat.whatsapp.com.evil.example), http, userinfo, ports, extra path
 * segments, and anything that fails to parse.
 */
export function parseWhatsAppInvite(raw: string | undefined | null): string | null {
  const value = raw?.trim();
  if (!value) return null;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" || url.hostname !== "chat.whatsapp.com") return null;
  if (url.port !== "" || url.username !== "" || url.password !== "") return null;
  const code = url.pathname.replace(/^\//, "").replace(/\/$/, "");
  if (!WHATSAPP_INVITE_CODE.test(code)) return null;
  return `https://chat.whatsapp.com/${code}`;
}

export const community = {
  whatsapp: {
    name: "CodePhantom Traders",
    formerName: "TAT Market Direction",
    description: "Market discussion, setups and CodePhantom updates.",
    url: parseWhatsAppInvite(process.env.NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL),
  },
} as const;

/**
 * Stable JSON-LD identifiers so search engines can connect the
 * Organization, its founder (Person) and the WebSite as one entity graph.
 */
export const entityIds = {
  organization: `${siteUrl}/#organization`,
  founder: `${siteUrl}/founder#person`,
  website: `${siteUrl}/#website`,
} as const;

/**
 * Primary site navigation. Kept flat and small per the brief:
 * "Primary navigation should remain clean."
 */
export const primaryNav = [
  { label: "About", href: "/about" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Divisions", href: "/divisions" },
  { label: "Products", href: "/products" },
  { label: "Projects", href: "/projects" },
  { label: "Insights", href: "/insights" },
  { label: "Founder", href: "/founder" },
  { label: "Contact", href: "/contact" },
] as const;
