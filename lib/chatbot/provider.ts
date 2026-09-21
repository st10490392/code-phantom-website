/**
 * Chat provider abstraction.
 *
 * V1 ships with the LOCAL provider only: a deterministic/fuzzy matcher over
 * the approved knowledge base in `knowledge-base.ts`. No paid AI API is
 * required for the site to work.
 *
 * A future LLM-backed provider can be enabled purely through environment
 * configuration (PHANTOM_CHAT_PROVIDER=llm + a server-side API key) without
 * changing the /api/chat route or any client code. That provider MUST be
 * grounded in the same knowledge base (e.g. via system-prompt injection)
 * and must never invent facts about CodePhantom — if the knowledge base
 * doesn't cover something, it should say so, exactly like the local
 * provider's fallback answer.
 *
 * API keys must never be exposed to the client — only read from
 * server-side environment variables inside a provider implementation.
 */
import { matchQuestion } from "./engine";

export type ChatProviderResponse = {
  answer: string;
  matchedId: string | null;
  confidence: number;
  provider: "local" | "llm";
};

export interface ChatProvider {
  respond(message: string): Promise<ChatProviderResponse>;
}

class LocalKnowledgeBaseProvider implements ChatProvider {
  async respond(message: string): Promise<ChatProviderResponse> {
    const result = matchQuestion(message);
    return {
      answer: result.answer,
      matchedId: result.matchedId,
      confidence: result.confidence,
      provider: "local",
    };
  }
}

/**
 * Placeholder for a future real-LLM provider. Intentionally unimplemented
 * in V1 — selecting it via PHANTOM_CHAT_PROVIDER without the required
 * server-side configuration falls back to the local provider so the site
 * never breaks.
 */
class UnavailableLlmProvider implements ChatProvider {
  async respond(): Promise<ChatProviderResponse> {
    const local = new LocalKnowledgeBaseProvider();
    return local.respond("");
  }
}

export function getChatProvider(): ChatProvider {
  const configured = process.env.PHANTOM_CHAT_PROVIDER;
  if (configured === "llm" && process.env.PHANTOM_CHAT_LLM_API_KEY) {
    // Reserved for future real-LLM integration.
    return new UnavailableLlmProvider();
  }
  return new LocalKnowledgeBaseProvider();
}
