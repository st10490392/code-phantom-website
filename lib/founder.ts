/**
 * Founder profile content.
 *
 * Keep this grounded and factual: career/education stage instead of a
 * hard-coded age (which only goes stale), no numerical self-ratings for
 * skills, and no inflated titles (not "senior engineer," "cybersecurity
 * expert," "quantitative analyst," or any licensed/financial-adviser
 * language) — see CP-WEB-001-R1.
 */
export const founder = {
  name: "Ripfumelo Ngobeni",
  role: "Founder — CodePhantom Technologies",
  location: "South Africa",
  careerStage: "Early-career software developer",
  summary:
    "Ripfumelo Ngobeni is the founder of CodePhantom Technologies, based in South Africa — an early-career software developer building both a technology company and the engineering skills behind it, in parallel.",
  bio: [
    "Ripfumelo's path into technology began through financial markets, not the other way around. He first became interested in trading after coming across trading content online — including material from DJ Coach — and later learned more directly from a local trader.",
    "Over time, his interest shifted beyond simply placing trades. Seeing automated trading systems and Expert Advisors online made him want to understand how those systems were actually built — and, eventually, to build one himself. That curiosity is one of the reasons he moved deeper into programming and software development.",
    "His interest later expanded into Linux and cybersecurity, with the television series Mr. Robot acting as an early spark of curiosity about that world — curiosity he has since been turning into independent, hands-on study.",
    "As his software knowledge grew, he started to recognize that the technology behind his original trading venture, Antagonistic Trading Co., could become more significant than trading alone. Antagonistic had focused on markets and proprietary trading-system development; Ripfumelo came to see that building a broader technology infrastructure around software, automation, cybersecurity and intelligent systems could take the venture well beyond its original purpose. That realization led to CodePhantom Technologies.",
    "His strongest engineering interest is building systems that can grow into real products, platforms or businesses — not just working prototypes. Long term, he wants to grow CodePhantom Technologies internationally, and eventually develop a wider group of technology-driven ventures under the CodePhantom ecosystem.",
  ],
  education: {
    program: "Diploma in Software Development",
    status: "In progress",
    expectedFinalYear: "2027",
  },
  technologies: [
    "Python",
    "Java",
    "C#",
    ".NET",
    "HTML/CSS",
    "Git/GitHub",
    "Linux",
  ],
  interests: [
    "Backend & software systems",
    "Automation",
    "Cybersecurity (independent study)",
    "Intelligent systems",
  ],
} as const;
