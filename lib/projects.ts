/**
 * Extensible project data model.
 *
 * Unknown / not-yet-applicable fields should be left undefined — consuming
 * UI must hide those fields gracefully rather than render empty labels.
 * This shape is intended to migrate cleanly into a future CMS/database.
 */
export type ProjectStatus =
  | "Active"
  | "In Development"
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
    licence?: string;
    /** Optional research note shown on the project detail page. */
    research?: string;
  };

export const projects: Project[] = [
  {
    title: "CPT Scanner",
    slug: "cpt-scanner",
    summary:
      "A market-scanning and trade-planning system sold as licensed software under the CodePhantom Software division.",
    description:
      "CPT Scanner turns defined market-analysis rules into a lightweight scanner that identifies potential setups for human review. It is licensed as a software product with tiered access — Free, Lite, Professional and Enterprise — rather than sold as a managed service or investment product.",
    technologies: ["Python", "MT5 Data Pipeline", "Backtesting", "Market Structure"],
    category: "Quantitative Technology",
    scope: "CodePhantom",
    status: "Active",
    licence: "Free / Lite / Professional / Enterprise",
    featured: true,
    date: "2026-01-01",
  },
  {
    title: "Code Phantom EA",
    slug: "code-phantom-ea",
    summary:
      "An automated trading engine sold as licensed software under the CodePhantom Software division.",
    description:
      "Code Phantom EA is CodePhantom's automated trading engine — an expert advisor engineered to translate systematic trading logic into disciplined, rules-based execution. It is licensed as a software product, not a managed account or investment service.",
    technologies: ["MQL5", "Python", "Backtesting Infrastructure"],
    category: "Quantitative Technology",
    scope: "CodePhantom",
    status: "In Development",
    licence: "Professional / Enterprise",
    featured: true,
    date: "2026-01-01",
  },
  {
    title: "CodePhantom App",
    slug: "codephantom-app",
    summary:
      "The Flutter mobile client for CodePhantom accounts, Scanner review, licences and future EA monitoring.",
    description:
      "CodePhantom App is the mobile client for the CodePhantom platform. Its architecture covers account access, Scanner setup review, licences and device-bound access.",
    technologies: ["Flutter", "Dart", "Riverpod", "Supabase"],
    category: "Software Engineering",
    scope: "CodePhantom",
    status: "In Development",
    licence: "Free / Lite / Professional / Enterprise",
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