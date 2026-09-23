/**
 * Public changelog. Entries record real work only (see git history of the
 * CodePhantom repositories). "Internal" entries describe infrastructure that
 * exists but is not yet available to the public.
 */
export type ChangelogEntry = {
  date: string; // ISO date
  title: string;
  scope: "Website" | "Platform" | "CPT Scanner" | "CodePhantom App" | "Code Phantom EA";
  visibility: "Public" | "Internal";
  items: string[];
};

export const changelog: ChangelogEntry[] = [
  {
    date: "2026-09-23",
    title: "Product, support and legal pages",
    scope: "Website",
    visibility: "Public",
    items: [
      "Added Products, Download, Changelog, Status, Support, Privacy and Terms pages.",
      "Founder presented as GingerCodePhantom (Ripfumelo Ngobeni) across the site and search metadata.",
      "Added the CodePhantom Traders WhatsApp group link (formerly TAT Market Direction).",
      "Phantom Assistant can answer questions about products, accounts, licences and support.",
    ],
  },
  {
    date: "2026-09-23",
    title: "Platform groundwork (not yet public)",
    scope: "Platform",
    visibility: "Internal",
    items: [
      "Accounts with unique usernames, email verification and password recovery.",
      "One-time activation keys with one core licence per account.",
      "Device binding, lost/replaced-phone replacement keys and session revocation.",
      "Per-market Scanner entitlements (Forex, Indices, Synthetics packs) - all plans disabled.",
      "Support tickets and moderated testimonials.",
    ],
  },
  {
    date: "2026-09-23",
    title: "Release and integration tooling (not yet public)",
    scope: "Platform",
    visibility: "Internal",
    items: [
      "Publisher that sends detected setups to the platform for human review (dry-run by default).",
      "Android release automation for signed builds; no public build has been released.",
      "Optional EA status bridge, off by default and unable to trade.",
    ],
  },
  {
    date: "2026-09-21",
    title: "CodePhantom Technologies website V1",
    scope: "Website",
    visibility: "Public",
    items: [
      "Company, capabilities, divisions, projects, insights and founder pages.",
      "Phantom Assistant, a site assistant grounded in approved content.",
    ],
  },
];
