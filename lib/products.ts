/**
 * Product catalog content for /products.
 *
 * Rules (same as the rest of lib/): readiness states must be truthful, no
 * prices, availability, performance figures, customers or download counts
 * are ever written here. Pricing/availability for Scanner market packs is
 * read from the CodePhantom Backend's public plan catalog at build time
 * (lib/platform-api.ts) and shown ONLY for plans the backend marks enabled
 * and publicly visible - today, none.
 */

export type Readiness =
  | "Research / Development"
  | "Private development"
  | "Private beta"
  | "Public beta"
  | "Generally available";

export type ProductSlug = "cpt-scanner" | "codephantom-app" | "codephantom-ea";

export type Product = {
  slug: ProductSlug;
  name: string;
  summary: string;
  readiness: Readiness;
  readinessNote: string;
  description: string[];
  highlights: string[];
  notes?: string[];
  platforms: string[];
};

export const products: Product[] = [
  {
    slug: "cpt-scanner",
    name: "CPT Scanner",
    summary:
      "A rules-based market scanner that detects structure and supply/demand setups and routes them to human review.",
    readiness: "Private development",
    readinessNote:
      "Research and validation are in progress. The scanner is not publicly available and no market pack is on sale.",
    description: [
      "CPT Scanner applies a fixed, documented rule set - higher-timeframe direction, supply/demand zones with break-of-structure, and lower-timeframe reactions - to detect candidate setups. The rules are frozen and validated offline against historical data before anything reaches a user.",
      "Detected setups are never sent to users automatically. Each one is published to the CodePhantom platform as a pending setup and reviewed by a person, who approves or rejects it.",
      "Access is organised in market packs so each account only sees the markets it is entitled to.",
    ],
    highlights: [
      "Rules-based detection with an auditable, offline research pipeline",
      "Human review before any setup is shown",
      "Per-market access: Forex, Indices and Synthetics packs",
      "Viewing setups and automated execution are separate permissions - execution is not offered",
    ],
    notes: [
      "No win rates, returns or backtest results are published. When results are published they will come from a complete, verified record of wins and losses.",
    ],
    platforms: ["CodePhantom Android app (in development)"],
  },
  {
    slug: "codephantom-app",
    name: "CodePhantom App",
    summary: "The Android app for CodePhantom accounts: reviewed Scanner setups, notifications and account security.",
    readiness: "Private development",
    readinessNote: "The app is in development. There is no public release yet.",
    description: [
      "The CodePhantom App is where account holders will see the Scanner markets they are entitled to, receive notifications and manage their account and devices.",
      "Each account has one core licence, activated once with a one-time activation key. Upgrades are added to the same licence - you never need a second key.",
      "An account is bound to one primary device by default. If a phone is lost or replaced, CodePhantom support verifies the account holder and issues a one-time replacement key; using it moves access to the new phone and signs the old phone out.",
    ],
    highlights: [
      "Sign in with email or username; email-based password recovery",
      "One-time activation key, one core licence per account",
      "Device binding with a local PIN on the device",
      "Lost/replaced phone support with one-time replacement keys",
    ],
    notes: [
      "Android first. When a release is published it will appear on the Download page with its SHA-256 checksum.",
    ],
    platforms: ["Android"],
  },
  {
    slug: "codephantom-ea",
    name: "Code Phantom EA",
    summary: "Phantom Traders' automated-trading research engine.",
    readiness: "Research / Development",
    readinessNote: "Research and backtesting only. It is not offered to clients and does not trade.",
    description: [
      "Code Phantom EA is a deterministic research and backtesting engine for systematic trading concepts. It produces auditable observations and candidate evidence from completed candles only.",
      "In its current form it has no broker connection and no order-execution capability. An optional status bridge can report an instance's health to the CodePhantom platform; it is switched off by default and cannot place trades.",
    ],
    highlights: [
      "Deterministic, causal research engine",
      "Offline backtesting - no network or licence server required",
      "No live execution",
    ],
    notes: [
      "The EA is not proven or profitable, and no performance results are published. Any future release would follow testing and a compliance review.",
    ],
    platforms: ["Research environment"],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/**
 * CPT Scanner market packs. `planCode` matches the CodePhantom Backend
 * plan catalog (docs/PRODUCT_CATALOG.md in code-phantom-backend) so a pack
 * shows as available - with the backend's price - only once the owner
 * enables and publishes that exact plan.
 */
export type MarketPack = {
  planCode: string;
  name: string;
  markets: ("Forex" | "Indices" | "Synthetics")[];
};

export const scannerMarketPacks: MarketPack[] = [
  { planCode: "scanner_forex", name: "Forex", markets: ["Forex"] },
  { planCode: "scanner_indices", name: "Indices", markets: ["Indices"] },
  { planCode: "scanner_synthetics", name: "Synthetics", markets: ["Synthetics"] },
  { planCode: "scanner_forex_indices", name: "Forex + Indices", markets: ["Forex", "Indices"] },
  { planCode: "scanner_forex_synthetics", name: "Forex + Synthetics", markets: ["Forex", "Synthetics"] },
  { planCode: "scanner_indices_synthetics", name: "Indices + Synthetics", markets: ["Indices", "Synthetics"] },
  { planCode: "scanner_full", name: "All Markets", markets: ["Forex", "Indices", "Synthetics"] },
];

/** Per-market maturity, stated conservatively. */
export const scannerMarkets = [
  { name: "Forex", status: "In development", note: "Primary research market." },
  { name: "Indices", status: "In development", note: "" },
  {
    name: "Synthetics",
    status: "Research only",
    note: "Synthetic indices are under separate research and are not production-ready.",
  },
] as const;

export const tradingRiskNotice =
  "Trading forex, indices and synthetic instruments carries a high risk of loss and is not suitable for everyone. CodePhantom tools and community content are for information and research only and are not financial advice. Historical or backtested behaviour does not guarantee future results. Only trade with money you can afford to lose.";
