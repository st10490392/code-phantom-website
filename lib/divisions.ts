export type Division = {
  number: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  focus: string[];
  status: string;
};

export const divisions: Division[] = [
  {
    number: "01",
    slug: "software",
    name: "CodePhantom Software",
    tagline: "Engineering systems that work.",
    description:
      "The core engineering division. CodePhantom Software builds custom software, backend systems, web applications, APIs, automation and internal tools — engineered for performance, maintainability and real-world impact.",
    focus: [
      "Custom software development",
      "Backend systems & APIs",
      "Web applications",
      "Internal tools & automation",
    ],
    status: "Active",
  },
  {
    number: "02",
    slug: "security",
    name: "CodePhantom Security",
    tagline: "Security engineered in, not bolted on.",
    description:
      "CodePhantom Security focuses on security-oriented development, independent cybersecurity research, and experimental security tooling — built around secure software principles and hands-on Linux/security work.",
    focus: [
      "Security-oriented development",
      "Cybersecurity research",
      "Secure software principles",
      "Experimental security projects",
    ],
    status: "Active — Research Stage",
  },
  {
    number: "03",
    slug: "labs",
    name: "CodePhantom Labs",
    tagline: "Where experimental systems are built.",
    description:
      "CodePhantom Labs is the R&D division — the space for intelligent automation, AI experimentation, software agents, developer tooling and emerging technology that hasn't found a permanent home yet.",
    focus: [
      "Intelligent automation",
      "AI & software agent experimentation",
      "Developer tooling",
      "Emerging technology R&D",
    ],
    status: "Active — R&D",
  },
  {
    number: "04",
    slug: "phantom-traders",
    name: "Phantom Traders",
    tagline: "Systematic markets. Engineered execution.",
    description:
      "Phantom Traders is CodePhantom's quantitative and trading-technology division — the continuation of the company's original trading ambitions, now engineered as systematic research and automated trading technology.",
    focus: [
      "Strategy development",
      "Automated trading systems",
      "Research & backtesting",
      "Risk management & quantitative tooling",
    ],
    status: "Active — Research & Development",
  },
];

export function getDivision(slug: string) {
  return divisions.find((d) => d.slug === slug);
}
