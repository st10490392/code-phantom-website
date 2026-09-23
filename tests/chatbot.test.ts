import { test } from "node:test";
import assert from "node:assert/strict";
import { matchQuestion } from "../lib/chatbot/engine";
import { knowledgeBase, fallbackAnswer } from "../lib/chatbot/knowledge-base";

const id = (q: string) => matchQuestion(q).matchedId;

test("conversational basics are understood", () => {
  for (const q of ["Hi", "hello", "Hey!", "hi there", "Good morning", "good afternoon", "Good evening"]) {
    assert.equal(id(q), "smalltalk-greeting", q);
  }
  assert.match(matchQuestion("Good morning").answer, /^Good morning!/);
  for (const q of ["Thanks", "Thank you", "thank you so much", "cheers"]) assert.equal(id(q), "smalltalk-thanks", q);
  for (const q of ["Who are you?", "what can you do", "are you a bot?"]) assert.equal(id(q), "smalltalk-who-are-you", q);
  assert.equal(id("bye"), "smalltalk-goodbye");
});

test("a greeting followed by a question answers the question", () => {
  assert.equal(id("Hi, what is CPT Scanner?"), "cpt-scanner");
  assert.equal(id("Good morning! How much does it cost?"), "pricing");
});

test("words that merely start with a greeting are not greetings", () => {
  assert.notEqual(id("history of codephantom"), "smalltalk-greeting");
  assert.notEqual(id("your founder"), "smalltalk-greeting");
});

const expected: Record<string, string> = {
  "Who founded CodePhantom?": "who-founded",
  "who is gingercodephantom": "founder-background",
  "What is CPT Scanner?": "cpt-scanner",
  "What is the CodePhantom Android app?": "android-app",
  "Tell me about Code Phantom EA": "code-phantom-ea",
  "Is Code Phantom EA profitable?": "code-phantom-ea",
  "Forex pack": "pack-forex",
  "indices pack": "pack-indices",
  "Is synthetics ready?": "pack-synthetics",
  "forex and indices bundle": "pack-forex-indices",
  "forex and synthetics bundle": "pack-forex-synthetics",
  "indices and synthetics bundle": "pack-indices-synthetics",
  "full market pack": "pack-full",
  "what market packs are there": "scanner-markets",
  "how much does it cost": "pricing",
  "can I buy it": "availability",
  "how does activation work": "activation-key",
  "do I need a new key to upgrade": "one-account-licence",
  "can I use two phones": "device-binding",
  "I lost my phone": "lost-phone",
  "what is a replacement key": "replacement-key",
  "is there a free trial": "trials",
  "referral code": "referrals",
  "is it a monthly subscription": "subscriptions",
  "what are entitlements": "entitlements",
  "whatsapp group": "codephantom-traders",
  "CodePhantom Traders": "codephantom-traders",
  "I forgot my password": "password-recovery",
  "how do I get support": "support",
  "apk download": "apk-download",
  "can I join the beta": "private-beta",
  "is trading risky": "trading-risk",
  "what is your win rate": "performance",
  "do you sell signals": "signals",
  "can it trade for me": "automated-trading",
  "is codephantom a registered company": "registered-company",
};

test("product, account and support questions route to the right answers", () => {
  const misses = Object.entries(expected).filter(([q, want]) => id(q) !== want).map(([q, want]) => `${q} -> ${id(q)} (want ${want})`);
  assert.deepEqual(misses, []);
});

test("unknown questions fall back safely", () => {
  for (const q of ["what is the capital of peru", "recommend a good pizza place", "what's the weather tomorrow", "who won the football"]) {
    assert.equal(matchQuestion(q).answer, fallbackAnswer, q);
  }
  assert.equal(matchQuestion("   ").answer, fallbackAnswer);
});

test("answers stay grounded: no prices, no performance claims, no production-ready Synthetics, no legal name", () => {
  const all = knowledgeBase.map((e) => e.answer).join("\n");
  assert.doesNotMatch(all, /R\s?\d|\$\s?\d|\d+\s?%|ZAR\s?\d|USD\s?\d/, "no prices or percentages");
  assert.doesNotMatch(all, /Ripfumelo|Ngobeni/);
  assert.doesNotMatch(all, /Synthetics[^.]*(is|are) (production-ready|stable|live)/i);
  assert.doesNotMatch(all, /\b(proven|guaranteed) (profit|returns|results)/i);
  assert.doesNotMatch(all, /\(Pty\) Ltd/);
  for (const e of knowledgeBase) assert.ok(e.answer.length > 20, e.id);
  assert.equal(new Set(knowledgeBase.map((e) => e.id)).size, knowledgeBase.length, "unique ids");
});
