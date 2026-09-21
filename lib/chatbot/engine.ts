import {
  knowledgeBase,
  fallbackAnswer,
  type KnowledgeEntry,
} from "./knowledge-base";

const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "is",
  "are",
  "do",
  "does",
  "what",
  "who",
  "how",
  "can",
  "i",
  "you",
  "your",
  "to",
  "of",
  "for",
  "about",
  "me",
  "tell",
  "please",
  "in",
  "on",
  "with",
]);

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 0);
}

function significantTokens(input: string): string[] {
  return tokenize(input).filter((t) => !STOP_WORDS.has(t));
}

/** Levenshtein distance, used for lightweight typo tolerance on short tokens. */
function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () =>
    new Array(b.length + 1).fill(0)
  );
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[a.length][b.length];
}

function tokenSimilarity(a: string, b: string): number {
  if (a === b) return 1;
  if (a.length < 3 || b.length < 3) return a === b ? 1 : 0;
  const dist = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length);
  const similarity = 1 - dist / maxLen;
  return similarity >= 0.75 ? similarity : 0;
}

function scoreEntry(entry: KnowledgeEntry, queryTokens: string[]): number {
  const entryTokens = new Set(
    entry.keywords
      .concat(entry.questions.flatMap((q) => significantTokens(q)))
      .map((t) => t.toLowerCase())
  );

  let score = 0;
  for (const qt of queryTokens) {
    let best = 0;
    for (const et of entryTokens) {
      best = Math.max(best, tokenSimilarity(qt, et));
    }
    score += best;
  }
  // Normalize by query length so short, precise queries aren't penalized.
  return queryTokens.length > 0 ? score / queryTokens.length : 0;
}

export type MatchResult = {
  answer: string;
  matchedId: string | null;
  confidence: number;
};

const CONFIDENCE_THRESHOLD = 0.32;

export function matchQuestion(rawInput: string): MatchResult {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return { answer: fallbackAnswer, matchedId: null, confidence: 0 };
  }

  const queryTokens = significantTokens(trimmed);
  if (queryTokens.length === 0) {
    return { answer: fallbackAnswer, matchedId: null, confidence: 0 };
  }

  let bestEntry: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    const score = scoreEntry(entry, queryTokens);
    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  if (bestEntry && bestScore >= CONFIDENCE_THRESHOLD) {
    return { answer: bestEntry.answer, matchedId: bestEntry.id, confidence: bestScore };
  }

  return { answer: fallbackAnswer, matchedId: null, confidence: bestScore };
}
