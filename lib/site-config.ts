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

export const siteConfig = {
  name: "CodePhantom Technologies",
  shortName: "CodePhantom",
  tagline: "Engineering Intelligent Systems.",
  description:
    "CodePhantom Technologies engineers software, security, automation and quantitative systems designed to solve complex problems with precision.",
  url: "https://codephantom.tech",
  locale: "en_US",
  themeColor: "#05070D",
  founder: {
    name: "Ripfumelo Ngobeni",
    role: "Founder, CodePhantom Technologies",
  },
} as const;

/**
 * Social + contact channels. Set a value to `null` when it has not been
 * confirmed yet — every consumer of this object must treat `null` as
 * "hide this channel entirely," never as a placeholder to render.
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
