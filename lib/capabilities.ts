export type Capability = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: "code" | "shield" | "automation" | "chart";
  points: string[];
};

export const capabilities: Capability[] = [
  {
    slug: "software-engineering",
    title: "Software Engineering",
    short:
      "Modern software solutions built for performance, maintainability and real-world impact.",
    description:
      "CodePhantom Software designs and builds custom applications, backend systems, APIs and internal tools using disciplined engineering practices — from architecture through deployment.",
    icon: "code",
    points: [
      "Custom software & internal tooling",
      "Backend development & APIs",
      "Web application development",
      "Automation of engineering workflows",
    ],
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    short:
      "Security-focused engineering, research and tooling designed around resilient digital systems.",
    description:
      "CodePhantom Security applies secure-by-design principles to everything we build, and pursues independent research and experimental tooling in defensive and offensive security concepts.",
    icon: "shield",
    points: [
      "Security-oriented software design",
      "Independent security research",
      "Linux & security tooling",
      "Experimental defensive/offensive projects",
    ],
  },
  {
    slug: "intelligent-automation",
    title: "Intelligent Automation",
    short:
      "Automation systems that reduce repetitive work and create operational leverage.",
    description:
      "CodePhantom Labs explores automation, software agents and applied AI — turning repetitive, error-prone processes into reliable, monitored systems.",
    icon: "automation",
    points: [
      "Workflow & process automation",
      "Software agents & tooling",
      "Applied AI experimentation",
      "Developer productivity systems",
    ],
  },
  {
    slug: "quantitative-technology",
    title: "Quantitative Technology",
    short:
      "Systematic market research, trading technology and quantitative tooling through Phantom Traders.",
    description:
      "Phantom Traders continues CodePhantom's original trading ambitions — engineering systematic approaches to markets through research, backtesting and automated execution technology.",
    icon: "chart",
    points: [
      "Strategy development & research",
      "Automated trading systems",
      "Backtesting infrastructure",
      "Risk management tooling",
    ],
  },
];
