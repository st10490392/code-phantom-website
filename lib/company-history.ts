export const originStory = {
  headline: "From Markets to Systems.",
  narrative: [
    "CodePhantom Technologies began with Antagonistic Trading Co., an independent trading venture built around a simple idea: develop proprietary trading systems and use technology to approach financial markets systematically.",
    "As the work behind those systems expanded into software development, automation and cybersecurity, so did the vision. What began as a trading-focused venture evolved into CodePhantom Technologies — a broader technology brand dedicated to Engineering Intelligent Systems.",
    "Today, CodePhantom is being built around software engineering, cybersecurity, intelligent automation and technology research, while its original trading ambitions continue through Phantom Traders, its trading technology and quantitative research division.",
    "Antagonistic was the beginning. CodePhantom is the evolution.",
  ],
};

/**
 * Archival details from the original Antagonistic Trading Co. brand.
 * "2024" marks the origin of the Antagonistic venture and brand — not a
 * legal incorporation date for CodePhantom Technologies. Antagonistic was
 * an independent, informal trading venture, never formally incorporated,
 * so this is presented as historical brand context, not a corporate
 * founding record.
 */
export const antagonisticBrand = {
  estd: "2024",
  tagline: "The Antidote to Conventional Wisdom",
  note: "Antagonistic Trading Co. was an independent trading venture rather than a formally incorporated company. 2024 marks the origin of the Antagonistic brand and its trading work — not a legal founding date for CodePhantom Technologies.",
} as const;

export const timeline = [
  {
    year: "2024",
    label: "Antagonistic Trading Co.",
    detail:
      "The original trading-focused venture — an independent, informal effort built around systematic, technology-driven approaches to financial markets.",
  },
  {
    year: "2025",
    label: "Market Research & Strategy Development",
    detail:
      "Continued market analysis, strategy development and documentation across multiple markets, building the research foundation behind later trading-system work.",
  },
  {
    year: "2026",
    label: "From Strategy to Software",
    detail:
      "Trading-system concepts increasingly translated into formal software rules through the development of Code Phantom EA — moving from manual strategy toward tested, automatable logic.",
  },
  {
    year: "2026",
    label: "CodePhantom Technologies",
    detail:
      "The original trading vision expands into a broader technology company centered on software engineering, cybersecurity, intelligent automation and technology research.",
  },
  {
    year: "Ongoing",
    label: "Phantom Traders",
    detail:
      "The original market-focused work continues today as CodePhantom's quantitative and trading-technology division.",
  },
] as const;

/**
 * Curated historical brand/trading/development imagery for the About page's
 * origin section (Antagonistic-era brand material, market-research
 * archives, Code Phantom EA development screenshots, Phantom Traders
 * identity). None have been supplied yet — DO NOT seed this with
 * placeholder, stock or fabricated imagery. Historical chart/market
 * screenshots in particular must only ever be captioned as development or
 * research artifacts, never as evidence of profitability, returns or
 * trading performance. The About page renders no historical gallery until
 * real, explicitly curated assets are added here.
 */
export type HistoricalAsset = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  context: string;
};

export const historicalAssets: HistoricalAsset[] = [];

export const mission =
  "Engineer intelligent systems that create practical value through software, security, automation and technological research.";

export const vision =
  "Build a technology company capable of creating secure, intelligent and scalable systems for a global market.";

export const values = [
  {
    name: "Innovation",
    detail: "Approaching problems with curiosity and a willingness to build something new.",
  },
  {
    name: "Security",
    detail: "Treating security as a foundation of good engineering, not an afterthought.",
  },
  {
    name: "Precision",
    detail: "Careful, deliberate execution over rushed, fragile work.",
  },
  {
    name: "Intelligence",
    detail: "Designing systems that reason, adapt and reduce unnecessary human effort.",
  },
  {
    name: "Independence",
    detail: "Building CodePhantom as a self-driven venture, grounded in real skill and real work.",
  },
] as const;
