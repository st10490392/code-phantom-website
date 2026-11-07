export type Readiness =
  | "Research / Development"
  | "Private development"
  | "Private beta"
  | "Public beta"
  | "Generally available";

export type LicenceTier = "Free" | "Lite" | "Professional" | "Enterprise";

export type ProductSlug =
  | "cpt-scanner"
  | "codephantom-app"
  | "codephantom-ea"
  | "codephantom-client";

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
  licenceTiers: LicenceTier[];
};

export const products: Product[] = [
  {
    slug: "cpt-scanner",
    name: "CPT Scanner",
    summary:
      "A rules-based market scanner that detects structure and supply/demand setups and routes them to human review.",
    readiness: "Private beta",
    readinessNote:
      "Available under licence. Access is organised in market packs so each account only sees the markets it is entitled to.",
    description: [
      "CPT Scanner applies a fixed, documented rule set - higher-timeframe direction, supply/demand zones with break-of-structure, and lower-timeframe reactions - to detect candidate setups. The rules are frozen and validated offline against historical data before anything reaches a user.",
      "Detected setups are never sent to users automatically. Each one is published to the CodePhantom platform as a pending setup and reviewed by a person, who approves or rejects it.",
      "Access is organised in market packs so each account only sees the markets it is entitled to.",
    ],
    highlights: [
      "Rules-based detection with an auditable, offline research pipeline",
      "Human review before any setup is shown",
      "Per-market access: Forex, Indices and Synthetics packs",
      "Viewing setups and automated execution are separate permissions",
    ],
    notes: [
      "No win rates, returns or backtest results are published. When results are published they will come from a complete, verified record of wins and losses.",
    ],
    platforms: ["CodePhantom Android app", "Web dashboard"],
    licenceTiers: ["Free", "Lite", "Professional", "Enterprise"],
  },
  {
    slug: "codephantom-app",
    name: "CodePhantom App",
    summary: "The CodePhantom account app: reviewed Scanner setups, notifications and account security.",
    readiness: "Public beta",
    readinessNote:
      "The app is available now. Each account has one core licence, activated once with a one-time activation key.",
    description: [
      "The CodePhantom App is where account holders see the Scanner markets they are entitled to, receive notifications and manage their account and devices.",
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
    licenceTiers: ["Free", "Lite", "Professional", "Enterprise"],
  },
  {
    slug: "codephantom-ea",
    name: "Code Phantom EA",
    summary: "An automated trading engine that translates systematic trading logic into disciplined, rules-based execution.",
    readiness: "Private beta",
    readinessNote:
      "Available under licence. You run it on your infrastructure with your broker credentials.",
    description: [
      "Code Phantom EA is an automated trading engine engineered to translate systematic trading logic into disciplined, rules-based execution. It produces auditable observations and candidate evidence from completed candles only.",
      "Runs on your infrastructure, with your broker credentials. An optional status bridge can report an instance's health to the CodePhantom platform; it is switched off by default and cannot place trades.",
    ],
    highlights: [
      "Deterministic, causal execution engine",
      "Offline backtesting - no network or licence server required",
      "Execution requires a licence with execution permissions enabled",
    ],
    notes: [
      "Production-ready licensing terms apply.",
    ],
    platforms: ["Production deployment environment"],
    licenceTiers: ["Free", "Professional", "Enterprise"],
  },
  {
    slug: "codephantom-client",
    name: "CodePhantom Client",
    summary: "Lightweight client app for accessing Scanner setups and managing EA instances.",
    readiness: "Public beta",
    readinessNote:
      "The client app is available. Web PWA and Android versions are ready for production use.",
    description: [
      "CodePhantom Client is a lightweight application for accessing Scanner setups and managing your CodePhantom EA instance.",
      "Activate your licence key to unlock access. Keys are account-bound and device-locked - they cannot be shared or reused across accounts.",
      "The client is account-bound and device-locked. Licence keys cannot be shared or reused across accounts.",
    ],
    highlights: [
      "Simplified interface for Scanner and EA",
      "Account-bound licence activation",
      "Lightweight PWA and Android app",
      "Direct integration with CodePhantom backend",
    ],
    notes: [
      "This is a public beta. Features may change.",
      "Android APK available on the download page.",
    ],
    platforms: ["Web (PWA)", "Android"],
    licenceTiers: ["Free", "Lite", "Professional", "Enterprise"],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

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

export const scannerMarkets = [
  { name: "Forex", status: "In development", note: "Primary research market." },
  { name: "Indices", status: "In development", note: "" },
  {
    name: "Synthetics",
    status: "Enterprise tier",
    note: "Synthetic indices are available under the Enterprise licence tier.",
  },
] as const;

export const tradingRiskNotice =
  "Trading forex, indices and synthetic instruments carries a high risk of loss and is not suitable for everyone. CodePhantom tools and community content are for information and research only and are not financial advice. Historical or backtested behaviour does not guarantee future results. Only trade with money you can afford to lose.";