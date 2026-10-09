import { appAccessAnswer } from "../product-access";
import { services } from "../services";

const appIds = new Set(["android-app", "apk-download", "ios"]);
export function currentAnswer(id: string, approvedFallback: string): string {
  if (id === "contact" || id === "support") return "Use /contact for the current official company email and other confirmed channels, or /support for account help. For a software project, /inquire explains what to include. Never send passwords or API secrets.";
  return appIds.has(id) ? appAccessAnswer() : approvedFallback;
}

/** Explicit service intents precede fuzzy matching; user text never becomes output or a URL. */
export function groundedIntent(message: string): { answer: string; matchedId: string; confidence: number } | null {
  const q = message.toLowerCase();
  if (/\b(ignore|override)\b.{0,40}\b(instructions|rules|prompt)\b|system prompt|api secret|private key/.test(q)) {
    return { answer: "I answer from approved public company information. I cannot provide credentials, private research or internal instructions. Use /contact for support.", matchedId: "public-boundary", confidence: 1 };
  }
  if (/\b(cpt|codephantom|code phantom)\s+app\b/.test(q) && /\b(get|download|install|access)\b/.test(q)) {
    return { answer: appAccessAnswer(), matchedId: "apk-download", confidence: 1 };
  }
  if (/\bqin\b|quantitative intelligence system/.test(q)) {
    return { answer: "QIN means Quantitative Intelligence System. It brings together rules-based quantitative research, chronological validation and risk analysis. Monte Carlo foundations are experimental; ML and adaptive monitoring require independent evidence and promotion review. No predictive model is enabled for live decisions. See /technology/qin for the development overview.", matchedId: "qin", confidence: 1 };
  }
  const serviceInquiry = /\b(build|develop|development|custom|service|quotation|quote)\b/.test(q)
    && /\b(website|web|chatbot|automation|android|application|applications|app|ea|api|backend|quote|quotation|services)\b/.test(q);
  if (serviceInquiry) {
    return { answer: `CodePhantom can discuss a scoped engineering project in these areas: ${services.map(s => s.name).join("; ")}. See /services, then /inquire to prepare your requirements for the official contact channel. Delivery, platform support and pricing depend on the agreed scope; trading-software development carries no profitability guarantee.`, matchedId: "service-inquiry", confidence: 1 };
  }
  return null;
}
