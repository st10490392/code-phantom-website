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
  | "Academic Project"
  | "Archived";

export type ProjectCategory =
  | "Quantitative Technology"
  | "Cybersecurity"
  | "Software Engineering"
  | "Web Development";

export type ProjectScope = "CodePhantom" | "Academic / Portfolio";

export type Project = {
  title: string;
  slug: string;
  summary: string;
  description: string;
  technologies: string[];
  category: ProjectCategory;
  scope: ProjectScope;
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
    title: "CPT Scanner",
    slug: "cpt-scanner",
    summary:
      "A market-scanning and trade-planning system under active research and backtesting within Phantom Traders.",
    description:
      "CPT Scanner turns defined market-analysis rules into a lightweight scanner that identifies potential setups for human review. Current work focuses on Forex and indices validation, data parity and backtesting. Synthetic-market support and automated execution are separate future capabilities that remain unavailable until they are independently validated.",
    technologies: ["Python", "MT5 Data Pipeline", "Backtesting", "Market Structure"],
    category: "Quantitative Technology",
    scope: "CodePhantom",
    status: "Research / Development",
    featured: true,
    date: "2026-01-01",
    research:
      "CPT Scanner remains a research and validation project. No production performance, win rate or return figure is claimed, and future execution capability is intentionally separate from the current scanner workflow.",
  },
  {
    title: "Code Phantom EA",
    slug: "code-phantom-ea",
    summary:
      "An automated trading system under active research and development within Phantom Traders.",
    description:
      "Code Phantom EA is CodePhantom's automated trading engine research project — an expert advisor engineered to translate systematic trading logic into disciplined, rules-based execution. It marks the transition from Antagonistic Trading Co.'s manual, market-research-driven strategy work into formal software rules, testing and automation, and is being developed as part of Phantom Traders' broader research into strategy development, backtesting and automated execution technology.",
    technologies: ["MQL5", "Python", "Backtesting Infrastructure"],
    category: "Quantitative Technology",
    scope: "CodePhantom",
    status: "Research / Development",
    featured: true,
    date: "2026-01-01",
    research:
      "Code Phantom EA is in active research and development. No performance results, win rates or return figures are published until a complete, verified track record exists. No exact project start date is claimed beyond its place in CodePhantom's broader company timeline.",
  },
  {
    title: "CodePhantom App",
    slug: "codephantom-app",
    summary:
      "The Flutter mobile client for CodePhantom accounts, Scanner review, signals, licences and future EA monitoring.",
    description:
      "CodePhantom App is the mobile client being built for the CodePhantom platform. Its architecture covers account access, Scanner setup review, signals, licences, device-bound access and future EA monitoring. The Android application is still in development and no public APK release is currently offered.",
    technologies: ["Flutter", "Dart", "Riverpod", "Supabase"],
    category: "Software Engineering",
    scope: "CodePhantom",
    status: "In Development",
    featured: true,
    date: "2026-01-01",
  },
  {
    title: "CodePhantom Website",
    slug: "web-development-projects",
    summary:
      "The official CodePhantom Technologies website and public product platform.",
    description:
      "The official CodePhantom Technologies website presents the company, founder, products, project work, support information and release infrastructure. It is engineered as a maintainable production web application rather than a collection of unrelated client projects.",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "HTML", "CSS"],
    category: "Web Development",
    scope: "CodePhantom",
    status: "Active",
    githubUrl: "https://github.com/st10490392/code-phantom-website",
    featured: true,
    date: "2026-01-01",
  },
  {
    title: "C# Cybersecurity POE",
    slug: "csharp-cybersecurity-bot",
    summary:
      "An academic C# Portfolio of Evidence project exploring cybersecurity education and software concepts.",
    description:
      "A C# coursework project created as part of the founder's software-development studies. It explores cybersecurity-related concepts through an academic Portfolio of Evidence and is shown here as part of GingerCodePhantom's learning and technical portfolio — not as a CodePhantom product or commercial security service.",
    technologies: ["C#", ".NET"],
    category: "Cybersecurity",
    scope: "Academic / Portfolio",
    status: "Academic Project",
    githubUrl: "https://github.com/st10490392",
    featured: false,
    date: "2025-01-01",
  },
  {
    title: "Java Software POEs",
    slug: "java-software-projects",
    summary:
      "Academic Java Portfolio of Evidence projects completed while developing core software-engineering skills.",
    description:
      "Java coursework and Portfolio of Evidence projects from the founder's software-development studies, covering object-oriented design, application logic and general software-engineering fundamentals. They are included as academic portfolio work and are not CodePhantom products or commercial offerings.",
    technologies: ["Java"],
    category: "Software Engineering",
    scope: "Academic / Portfolio",
    status: "Academic Project",
    githubUrl: "https://github.com/st10490392",
    featured: false,
    date: "2025-01-01",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured && p.scope === "CodePhantom");
}
