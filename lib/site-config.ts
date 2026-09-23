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
  name: "CodePhantom Technologies",
  shortName: "CodePhantom",
  tagline: "Engineering Intelligent Systems.",
  description:
    "CodePhantom Technologies engineers software, security, automation and quantitative systems designed to solve complex problems with precision.",
  url: siteUrl,
  locale: "en_US",
  themeColor: "#05070D",
  founder: {
    name: "Ripfumelo Ngobeni",
    role: "Founder, CodePhantom Technologies",
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
 * Founder-specific social channels (Ripfumelo's own accounts). Instagram in
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
 * The WhatsApp community invite link is configured per deployment through
 * NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL so it can be set or rotated without a
 * code change. It is only accepted if it is a genuine WhatsApp invite link
 * (https://chat.whatsapp.com/<code>); anything else - including unset -
 * hides the community CTA entirely. Never put a personal number here.
 */
const WHATSAPP_INVITE = /^https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]{10,40}$/;
const configuredCommunity = process.env.NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL?.trim();

export const community = {
  whatsapp:
    configuredCommunity && WHATSAPP_INVITE.test(configuredCommunity)
      ? configuredCommunity
      : (null as string | null),
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
  { label: "Projects", href: "/projects" },
  { label: "Insights", href: "/insights" },
  { label: "Founder", href: "/founder" },
  { label: "Contact", href: "/contact" },
] as const;
