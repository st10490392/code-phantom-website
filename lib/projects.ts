/**
 * Extensible project data model.
 *
 * Unknown / not-yet-applicable fields should be left undefined — consuming
 * UI must hide those fields gracefully rather than render empty labels.
 * This shape is intended to migrate cleanly into a future CMS/database.
 */
export type ProjectStatus =
  | "Research / Development"
  | "In Development"
  | "Active"
  | "Prototype"
  | "Archived";

export type ProjectCategory =
  | "Quantitative Technology"
  | "Cybersecurity"
  | "Software Engineering"
  | "Web Development";

export type Project = {
  title: string;
  slug: string;
  summary: string;
  description: string;
  technologies: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  githubUrl?: string;
  demoUrl?: string;
  image?: string;
  featured: boolean;
  date: string; // ISO
  research?: string;
};

export const projects: Project[] = [
  {
    title: "Code Phantom EA",
    slug: "code-phantom-ea",
    summary:
      "An automated trading system under active research and development within Phantom Traders.",
    description:
      "Code Phantom EA is CodePhantom's flagship automated trading engine project — an expert advisor engineered to translate systematic trading logic into disciplined, rules-based execution. It is being developed as part of Phantom Traders' broader research into strategy development, backtesting and automated execution technology.",
    technologies: ["MQL5", "Python", "Backtesting Infrastructure"],
    category: "Quantitative Technology",
    status: "Research / Development",
    githubUrl: "https://github.com/st10490392",
    featured: true,
    date: "2025-01-01",
    research:
      "Code Phantom EA is in active research and development. No performance results, win rates or return figures are published until a complete, verified track record exists.",
  },
  {
    title: "C# Cybersecurity Bot",
    slug: "csharp-cybersecurity-bot",
    summary:
      "An experimental C# security-tooling project exploring automated defensive/monitoring concepts.",
    description:
      "A C#-based cybersecurity bot built as an independent research project to explore automation in security monitoring and tooling. Developed as part of CodePhantom Security's ongoing hands-on research into secure systems and defensive tooling concepts.",
    technologies: ["C#", ".NET"],
    category: "Cybersecurity",
    status: "In Development",
    githubUrl: "https://github.com/st10490392",
    featured: true,
    date: "2025-01-01",
  },
  {
    title: "Java Software Projects",
    slug: "java-software-projects",
    summary:
      "A collection of Java-based software engineering projects built while developing core backend skills.",
    description:
      "An ongoing collection of Java projects covering object-oriented design, backend logic and general-purpose software engineering — part of the founder's continued development of CodePhantom Software's engineering foundation.",
    technologies: ["Java"],
    category: "Software Engineering",
    status: "In Development",
    githubUrl: "https://github.com/st10490392",
    featured: false,
    date: "2025-01-01",
  },
  {
    title: "Web Development Projects",
    slug: "web-development-projects",
    summary:
      "A collection of web projects, including this CodePhantom Technologies website.",
    description:
      "Web applications and sites built by CodePhantom, including the official CodePhantom Technologies website — engineered with modern, maintainable, production-grade web technology.",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "HTML", "CSS"],
    category: "Web Development",
    status: "Active",
    githubUrl: "https://github.com/st10490392",
    featured: true,
    date: "2026-01-01",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}
