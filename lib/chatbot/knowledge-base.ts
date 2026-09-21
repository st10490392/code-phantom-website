/**
 * Phantom Assistant knowledge base.
 *
 * This is the ONLY source of truth the assistant is allowed to draw on.
 * Every entry must be traceable to approved CodePhantom content elsewhere
 * in this repo (see lib/site-config.ts, lib/divisions.ts, lib/projects.ts,
 * lib/founder.ts, lib/company-history.ts). Do not add claims about
 * clients, returns, certifications, locations, employees, or regulatory
 * approval that aren't already approved content.
 *
 * A future real-LLM provider (see lib/chatbot/provider.ts) must be
 * grounded in this same knowledge base via system-prompt injection —
 * never allowed to answer from open-domain knowledge about CodePhantom.
 */

export type KnowledgeEntry = {
  id: string;
  questions: string[]; // example phrasings, used for fuzzy matching
  keywords: string[]; // high-signal keywords for scoring
  answer: string;
};

export const knowledgeBase: KnowledgeEntry[] = [
  {
    id: "what-is-codephantom",
    questions: [
      "what does codephantom do",
      "what is codephantom",
      "what is codephantom technologies",
      "tell me about codephantom",
    ],
    keywords: ["codephantom", "do", "company", "about", "what"],
    answer:
      "CodePhantom Technologies engineers software, security, automation and quantitative systems designed to solve complex problems with precision. It operates across four areas: Software Engineering, Cybersecurity, Intelligent Automation and Quantitative Technology, through its divisions — CodePhantom Software, CodePhantom Security, CodePhantom Labs and Phantom Traders.",
  },
  {
    id: "tagline",
    questions: ["what is your tagline", "codephantom motto", "company slogan"],
    keywords: ["tagline", "slogan", "motto"],
    answer: "CodePhantom Technologies' tagline is: \"Engineering Intelligent Systems.\"",
  },
  {
    id: "who-founded",
    questions: [
      "who founded codephantom",
      "who is the founder",
      "who owns codephantom",
      "who started codephantom",
    ],
    keywords: ["founder", "founded", "owns", "started", "who"],
    answer:
      "CodePhantom Technologies was founded by Ripfumelo Ngobeni, an early-career software developer based in South Africa, currently completing a Diploma in Software Development (final academic year expected in 2027). You can read his full story on the Founder page.",
  },
  {
    id: "founder-background",
    questions: [
      "how did the founder get into tech",
      "what is the founder's background",
      "founder's story",
      "how did ripfumelo start coding",
      "why did the founder start codephantom",
    ],
    keywords: ["founder", "background", "story", "journey", "trading", "markets", "coding"],
    answer:
      "Ripfumelo's path into technology actually started through financial markets, not the other way around. Trading first caught his interest, and curiosity about how automated trading systems (Expert Advisors) actually work pulled him into programming. His interest later expanded into Linux and cybersecurity. As his software skills grew, he realized the technology behind his original trading venture, Antagonistic Trading Co., could become bigger than trading alone — which led to CodePhantom Technologies. The full story is on the Founder page.",
  },
  {
    id: "founder-socials",
    questions: [
      "what is the founder's github",
      "founder's linkedin",
      "founder's instagram",
      "how do i follow the founder",
      "connect with the founder",
    ],
    keywords: ["founder", "github", "linkedin", "instagram", "social", "follow", "connect"],
    answer:
      "Ripfumelo's GitHub is github.com/st10490392 and his LinkedIn is linkedin.com/in/ripfumelo-ngobeni-753545389. His Instagram (@gingercodephantom) is his personal/professional account, not an official CodePhantom Technologies channel. All three are linked from the Founder page.",
  },
  {
    id: "whatsapp-phone",
    questions: [
      "what is your whatsapp number",
      "can i whatsapp you",
      "what is your phone number",
      "do you have whatsapp",
      "can i call you",
    ],
    keywords: ["whatsapp", "phone", "number", "call"],
    answer:
      "CodePhantom doesn't publish a personal phone or WhatsApp number. A dedicated CodePhantom WhatsApp Business line is planned for the future. For now, the best way to reach CodePhantom is through GitHub or the Contact page.",
  },
  {
    id: "technologies-used",
    questions: [
      "what technologies do you use",
      "what tech stack does codephantom use",
      "what programming languages",
      "what languages does the founder know",
    ],
    keywords: ["technologies", "stack", "languages", "tools", "programming"],
    answer:
      "CodePhantom's engineering work draws on Java, Python, C#, .NET, HTML/CSS, Git/GitHub and Linux, along with modern web technology (TypeScript, Next.js, Tailwind CSS) for projects like this website. The founder is also independently studying cybersecurity.",
  },
  {
    id: "phantom-traders",
    questions: [
      "what is phantom traders",
      "tell me about phantom traders",
      "does codephantom trade",
    ],
    keywords: ["phantom", "traders", "trading", "markets", "antagonistic"],
    answer:
      "Phantom Traders is CodePhantom's quantitative and trading-technology division — \"Systematic Markets. Engineered Execution.\" It's the direct continuation of Antagonistic Trading Co., CodePhantom's original trading venture, now focused on strategy development, automated trading systems, research & backtesting, risk management and quantitative tooling. It does not currently offer managed accounts, copy trading, financial advice, paid signals or investment management.",
  },
  {
    id: "code-phantom-ea",
    questions: [
      "tell me about code phantom ea",
      "what is code phantom ea",
      "is code phantom ea profitable",
      "can i use code phantom ea",
    ],
    keywords: ["ea", "expert advisor", "code phantom ea"],
    answer:
      "Code Phantom EA is Phantom Traders' automated trading engine project, currently in Research / Development. It represents an important transition in CodePhantom's history — turning manual, systematic trading concepts from the Antagonistic era into formal software rules, testing and automation research. No performance results, win rates, ROI, funded capital or broker/prop-firm partnerships are published, because none of that exists yet in a verified form.",
  },
  {
    id: "codephantom-software",
    questions: [
      "what is codephantom software",
      "software division",
      "what does codephantom software build",
    ],
    keywords: ["software", "division", "build", "engineering"],
    answer:
      "CodePhantom Software is the core engineering division — building custom software, backend systems, web applications, APIs, automation and internal tools.",
  },
  {
    id: "codephantom-security",
    questions: [
      "what is codephantom security",
      "does codephantom do pentesting",
      "security division",
      "is codephantom certified in security",
    ],
    keywords: ["security", "cybersecurity", "pentest", "certified"],
    answer:
      "CodePhantom Security focuses on security-oriented development, independent cybersecurity research and experimental security tooling. CodePhantom does not currently offer professional penetration-testing engagements, and holds no formal security certifications — this is an active area of independent study and research.",
  },
  {
    id: "codephantom-labs",
    questions: [
      "what is codephantom labs",
      "labs division",
      "what is r&d at codephantom",
    ],
    keywords: ["labs", "r&d", "research", "experimental", "ai"],
    answer:
      "CodePhantom Labs is CodePhantom's R&D division — the space for intelligent automation, AI experimentation, software agents, developer tooling and emerging technology.",
  },
  {
    id: "contact",
    questions: [
      "how can i contact codephantom",
      "how do i get in touch",
      "contact information",
      "email address",
      "phone number",
    ],
    keywords: ["contact", "email", "reach", "touch", "phone"],
    answer:
      "The best way to reach CodePhantom right now is through GitHub: github.com/st10490392. Visit the Contact page for the current list of active channels — CodePhantom only lists channels that are actually confirmed and active.",
  },
  {
    id: "origin-story",
    questions: [
      "what is antagonistic trading co",
      "history of codephantom",
      "where did codephantom come from",
      "origin story",
    ],
    keywords: ["antagonistic", "history", "origin", "story", "began", "2024"],
    answer:
      "CodePhantom began with Antagonistic Trading Co. (est. 2024), an independent, informal trading venture — never formally incorporated. 2025 continued that work through market research and strategy development, and 2026 saw trading concepts translate into software through Code Phantom EA. That work expanded into CodePhantom Technologies — a broader technology company — while the original trading ambitions continue today through Phantom Traders. See the About page for the full timeline.",
  },
  {
    id: "projects",
    questions: [
      "what projects has codephantom built",
      "show me your projects",
      "what are you working on",
    ],
    keywords: ["projects", "portfolio", "work", "building"],
    answer:
      "Current project areas include Code Phantom EA (trading system R&D), a C# Cybersecurity Bot, a collection of Java software projects, and web development projects including this website. See the Projects page for details and GitHub links.",
  },
  {
    id: "careers",
    questions: ["are you hiring", "do you have jobs", "careers at codephantom"],
    keywords: ["hiring", "jobs", "careers", "job"],
    answer:
      "CodePhantom does not currently have open roles listed. Check back via GitHub for updates.",
  },
  {
    id: "location",
    questions: [
      "where is codephantom based",
      "where is codephantom located",
      "does codephantom have an office",
    ],
    keywords: ["location", "based", "office", "address", "where"],
    answer:
      "CodePhantom Technologies has not published a physical office or address. The founder, Ripfumelo Ngobeni, is based in South Africa, and CodePhantom is an early-stage technology venture built and operated independently.",
  },
];

export const suggestedQuestions = [
  "What does CodePhantom do?",
  "What is Phantom Traders?",
  "Who founded CodePhantom?",
  "What technologies do you use?",
  "Tell me about Code Phantom EA.",
  "How can I contact CodePhantom?",
];

export const fallbackAnswer =
  "I don't have a confirmed answer for that yet. For anything beyond what's on this site, the best way to reach CodePhantom is through GitHub: github.com/st10490392, or the Contact page.";

export const greeting =
  "Hi, I'm Phantom Assistant. I can answer questions about CodePhantom Technologies, our divisions, projects and founder. What would you like to know?";
