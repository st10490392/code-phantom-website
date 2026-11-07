export type LicenceTier = "Free" | "Lite" | "Professional" | "Enterprise";

export type LicencePlan = {
  tier: LicenceTier;
  price: string;
  priceSubtext: string;
  tagline: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  includes: {
    scanner: string;
    ea: string;
    client: string;
    app: string;
  };
};

export const licenceTiers: LicencePlan[] = [
  {
    tier: "Free",
    price: "$0",
    priceSubtext: "forever",
    tagline: "Research materials and resources.",
    description:
      "Access to research materials, documentation, and unfinished or not-fully-tested software or apps. For evaluation and research use only.",
    features: [
      "Research documentation and methodology notes",
      "Access to unfinished or not-fully-tested software and apps",
      "Public beta access to CodePhantom Client",
      "Community support channels",
      "No Scanner market packs",
      "No Code Phantom EA access",
    ],
    cta: "Get Free Access",
    highlighted: false,
    includes: {
      scanner: "Not included",
      ea: "Not included",
      client: "Public beta",
      app: "Not included",
    },
  },
  {
    tier: "Lite",
    price: "$15",
    priceSubtext: "/ month",
    tagline: "Filtered market direction, 5 per day.",
    description:
      "A filtered feed of market direction from the Scanner. Five market directions per day, twenty per week.",
    features: [
      "5 market directions per day",
      "20 market directions per week",
      "One Scanner market pack",
      "CodePhantom App access",
      "Email support",
    ],
    cta: "Start Lite",
    highlighted: false,
    includes: {
      scanner: "One market pack",
      ea: "Not included",
      client: "Included",
      app: "Included",
    },
  },
  {
    tier: "Professional",
    price: "$99",
    priceSubtext: "/ month",
    tagline: "Full market direction feed, 20+ per day.",
    description:
      "The full Scanner market direction feed. Twenty or more market directions per day, across all enabled markets.",
    features: [
      "20+ market directions per day",
      "All enabled Scanner market packs",
      "CodePhantom App access",
      "Priority email support",
      "EA research access",
    ],
    cta: "Start Professional",
    highlighted: true,
    includes: {
      scanner: "All market packs",
      ea: "Research access",
      client: "Included",
      app: "Included",
    },
  },
  {
    tier: "Enterprise",
    price: "$499",
    priceSubtext: "/ month",
    tagline: "Everything the system detects.",
    description:
      "Everything the system detects — the same data the founder and engineering team see. Includes EA execution access where available.",
    features: [
      "Everything the system detects",
      "All Scanner market packs",
      "EA execution access where available",
      "Dedicated support",
      "Custom integrations",
      "Priority review of new features",
    ],
    cta: "Contact Sales",
    highlighted: false,
    includes: {
      scanner: "All market packs",
      ea: "Execution access where available",
      client: "Included",
      app: "Included",
    },
  },
];

export const accountModel = {
  headline: "How accounts work",
  description:
    "Every account is a software licence, not a trading service. You sign in with a unique ID and a password you set. Access is governed by the licence tier you hold.",
  steps: [
    {
      title: "Create your account",
      detail:
        "Sign up with your email. You are issued a unique account ID and choose your own password.",
    },
    {
      title: "Activate your licence",
      detail:
        "Your licence is activated once with a one-time activation key. Upgrades are added to the same licence — you never need a second key.",
    },
    {
      title: "Bind your device",
      detail:
        "An account is bound to one primary device by default, with a local PIN on the device. If a phone is lost or replaced, support verifies the account holder and issues a one-time replacement key.",
    },
    {
      title: "Sign in and use",
      detail:
        "Sign in with your unique ID and password. The app shows the markets and features your licence tier entitles you to.",
    },
  ],
};

export const tradingRiskNotice =
  "Trading forex, indices and synthetic instruments carries a high risk of loss and is not suitable for everyone. CodePhantom tools and community content are for information and research only and are not financial advice. Historical or backtested behaviour does not guarantee future results. Only trade with money you can afford to lose.";