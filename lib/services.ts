/** Owner-requested service scope; engagements need discovery and an agreed scope. */
export const services = [
  { id: "web", name: "Websites and web applications", description: "Business websites, customer portals and maintainable web applications, scoped around your users and workflow." },
  { id: "automation", name: "Chatbots and workflow automation", description: "Documentation-grounded assistants and integrations for repeatable business tasks. Provider, privacy and running costs are assessed during discovery." },
  { id: "apps", name: "Mobile and desktop applications", description: "Application design and development. Platforms, distribution and device testing are agreed for each project." },
  { id: "quant", name: "Custom quantitative software", description: "Strategy-to-software engineering, research tools, EAs, scanners and backtesting systems. Testing and acceptance criteria are agreed separately; no investment returns are promised." },
  { id: "backend", name: "Backend, API and security engineering", description: "Backend services, APIs, authentication and application security hardening. Professional penetration testing and security certification are not offered." },
] as const;
