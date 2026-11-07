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
      "CodePhantom Security builds network security tooling, hardening frameworks, and audit instrumentation — practical security engineering for teams that ship.",
    focus: [
      "Network security tools",
      "System hardening frameworks",
      "Security audit instrumentation",
      "Secure development pipelines",
    ],
    status: "Active",
  },
  {
    number: "03",
    slug: "labs",
    name: "CodePhantom Labs",
    tagline: "Where experimental systems become products.",
    description:
      "CodePhantom Labs is the R&D division — intelligent automation, AI agents, developer tooling, and emerging technology. What proves useful graduates to Software or Security; the rest stays here.",
    focus: [
      "Intelligent automation",
      "AI & software agent experimentation",
      "Developer tooling",
      "Emerging technology R&D",
    ],
    status: "Active",
  },
];

export function getDivision(slug: string) {
  return divisions.find((d) => d.slug === slug);
}