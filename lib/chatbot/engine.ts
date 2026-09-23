import {
  knowledgeBase,
  fallbackAnswer,
  smallTalk,
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
    // "what's" -> "whats": an apostrophe must not leave a stray "s" token
    // that matches every possessive in the knowledge base.
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 0);
}

function significantTokens(input: string): string[] {
  return tokenize(input).filter((t) => t.length > 1 && !STOP_WORDS.has(t));
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

function scoreEntry(entry: KnowledgeEntry, queryTokens: string[], rawQuery: string): number {
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
  const base = queryTokens.length > 0 ? score / queryTokens.length : 0;
  // Tie-break: a query that contains one of the entry's example phrases
  // verbatim (e.g. "codephantom traders" vs. the "phantom traders"
  // division) is a stronger match than token overlap alone.
  return base + (phraseBonus(entry, rawQuery) ? PHRASE_BONUS : 0);
}

const PHRASE_BONUS = 0.25;

function normalizePhrase(text: string): string {
  return tokenize(text).join(" ");
}

function phraseBonus(entry: KnowledgeEntry, rawQuery: string): boolean {
  const query = ` ${normalizePhrase(rawQuery)} `;
  return entry.questions.some((q) => {
    const phrase = normalizePhrase(q);
    return phrase.includes(" ") && query.includes(` ${phrase} `);
  });
}

export type MatchResult = {
  answer: string;
  matchedId: string | null;
  confidence: number;
};

const CONFIDENCE_THRESHOLD = 0.32;

const GREETING_PREFIX =
  /^(hi+|hello+|hey+|hiya|howzit|heita|sawubona|yo|greetings|good (morning|afternoon|evening|day))\b[\s,!.]*(there|phantom( assistant)?)?[\s,!.]*/;
const THANKS = /^(thanks?( you)?( so much| a lot| very much)?|thank u|thx|ty|cheers|much appreciated|appreciate it)[\s!.]*$/;
const GOODBYE = /^(bye|goodbye|see you|cya|later|good night)[\s!.]*$/;
const WHO_ARE_YOU = /^(who are you|what are you|who is this|who am i (talking|speaking) to|are you (a )?(bot|human|real|robot|ai|person)|what can you do|what do you do|how can you help( me)?|help)[\s?!.]*$/;
const HOW_ARE_YOU = /^(how are you( doing)?|how is it going|hows it going|how r u)[\s?!.]*$/;

function normalizeForSmallTalk(input: string): string {
  return input.toLowerCase().replace(/[’']/g, "").replace(/\s+/g, " ").trim();
}

/**
 * Conversational basics are recognised by pattern BEFORE fuzzy matching,
 * because they are made of words the matcher ignores (stop words and very
 * short tokens). A greeting followed by a real question ("hi, what is CPT
 * Scanner?") answers the question.
 */
function matchSmallTalk(input: string): { id: string; answer: string; remainder: string } | null {
  const text = normalizeForSmallTalk(input);
  if (THANKS.test(text)) return { id: "smalltalk-thanks", answer: smallTalk.thanks, remainder: "" };
  if (GOODBYE.test(text)) return { id: "smalltalk-goodbye", answer: smallTalk.goodbye, remainder: "" };
  if (WHO_ARE_YOU.test(text)) return { id: "smalltalk-who-are-you", answer: smallTalk.whoAreYou, remainder: "" };
  if (HOW_ARE_YOU.test(text)) return { id: "smalltalk-how-are-you", answer: smallTalk.howAreYou, remainder: "" };
  const greeting = text.match(GREETING_PREFIX);
  if (greeting) {
    const remainder = text.slice(greeting[0].length).trim();
    const salutation = greeting[2] ? `Good ${greeting[2]}!` : "Hi!";
    return { id: "smalltalk-greeting", answer: `${salutation} ${smallTalk.greeting}`, remainder };
  }
  return null;
}

export function matchQuestion(rawInput: string): MatchResult {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return { answer: fallbackAnswer, matchedId: null, confidence: 0 };
  }

  const small = matchSmallTalk(trimmed);
  if (small && !small.remainder) {
    return { answer: small.answer, matchedId: small.id, confidence: 1 };
  }
  const question = small ? small.remainder : trimmed;

  const queryTokens = significantTokens(question);
  if (queryTokens.length === 0) {
    return { answer: fallbackAnswer, matchedId: null, confidence: 0 };
  }

  let bestEntry: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    const score = scoreEntry(entry, queryTokens, question);
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
