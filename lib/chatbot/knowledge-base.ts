/**
 * Phantom Assistant knowledge base.
 *
 * This is the ONLY source of truth the assistant is allowed to draw on.
 * Every entry must be traceable to approved CodePhantom content elsewhere
 * in this repo (see lib/site-config.ts, lib/company.ts, lib/divisions.ts,
 * lib/projects.ts, lib/products.ts, lib/licensing.ts, lib/founder.ts, lib/company-history.ts)
 * or to the documented CodePhantom platform design. Never state prices,
 * availability dates, performance, win rates or customer numbers, never
 * call Synthetics production-ready and never call the EA proven or
 * profitable. Do not add claims about
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
      "CodePhantom Technologies engineers software, security, automation and quantitative systems designed to solve complex problems with precision. It operates across four divisions — CodePhantom Software, CodePhantom Security, CodePhantom Labs and Phantom Traders — delivering licensed software products for market analysis, automated execution and cybersecurity.",
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
      "CodePhantom Technologies was founded by GingerCodePhantom (Ripfumelo Ngobeni) - GingerCodePhantom is his public creator name. He is an early-career software developer based in South Africa who is currently completing a Diploma in Software Development (final academic year expected in 2027). The full story is on the Founder page.",
  },
  {
    id: "founder-background",
    questions: [
      "how did the founder get into tech",
      "what is the founder's background",
      "founder's story",
      "how did gingercodephantom start coding",
      "who is gingercodephantom",
      "who is ripfumelo ngobeni",
      "is gingercodephantom ripfumelo ngobeni",
      "why did the founder start codephantom",
    ],
    keywords: ["founder", "background", "story", "journey", "coding", "gingercodephantom", "ginger", "ripfumelo", "ngobeni"],
    answer:
      "GingerCodePhantom is the public creator name of Ripfumelo Ngobeni, founder of CodePhantom Technologies. His path into technology actually started through financial markets, not the other way around. Trading first caught his interest, and curiosity about how automated trading systems (Expert Advisors) actually work pulled him into programming. His interest later expanded into Linux and cybersecurity. As his software skills grew, he realized the technology behind his original trading venture, Antagonistic Trading Co., could become bigger than trading alone — which led to CodePhantom Technologies. The full story is on the Founder page.",
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
      "GingerCodePhantom's (Ripfumelo Ngobeni's) GitHub (github.com/st10490392), LinkedIn and Instagram (@gingercodephantom) are linked from the Founder page. They are the founder's own accounts, not official CodePhantom Technologies channels.",
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
    keywords: ["phone", "number", "call"],
    answer:
      "CodePhantom doesn't publish a personal phone or WhatsApp number. For community discussion there is the CodePhantom Traders WhatsApp group (linked on the Contact and Support pages when available); for help with an account, use the Support or Contact page.",
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
      "Phantom Traders is CodePhantom's quantitative and trading-technology division — \"Systematic Markets. Engineered Execution.\" It is the direct continuation of Antagonistic Trading Co., CodePhantom's original trading venture, now focused on strategy development, automated trading systems, research & backtesting, risk management and quantitative tooling. The division builds and licenses the CPT Scanner market scanner and the Code Phantom EA automated trading engine as software products.",
  },
  {
    id: "code-phantom-ea",
    questions: [
      "tell me about code phantom ea",
      "what is code phantom ea",
      "is code phantom ea profitable",
      "does the ea make money",
      "can i buy the ea",
      "can i use code phantom ea",
    ],
    keywords: ["ea", "expert advisor", "code phantom ea"],
    answer:
      "Code Phantom EA is Phantom Traders' automated trading engine, licensed as a software product. It translates systematic trading logic into disciplined, rules-based execution. It is available under the Professional and Enterprise licence tiers. As a software licence, no performance results, win rates or ROI figures are published — the product is the engine itself, not a managed service or investment.",
  },
  {
    id: "cpt-scanner",
    questions: ["what is cpt scanner", "tell me about the scanner", "how does the scanner work", "cpt scanner"],
    keywords: ["cpt", "scanner", "setups", "detect", "supply", "demand"],
    answer:
      "CPT Scanner is a rules-based market scanner licensed as a software product. It applies a fixed, documented rule set (higher-timeframe direction, supply/demand zones with break of structure, lower-timeframe reactions) to detect candidate setups for human review. Setups are never sent to users automatically; each one is reviewed by a person first. It is available under Free, Lite, Professional and Enterprise licence tiers, with market-pack entitlements configured per tier.",
  },
  {
    id: "scanner-markets",
    questions: ["which markets does the scanner cover", "what markets", "market packs", "what packs are there"],
    keywords: ["markets", "packs", "pack", "cover", "which"],
    answer:
      "The Scanner is organised in market packs: Forex, Indices, Synthetics, Forex + Indices, Forex + Synthetics, Indices + Synthetics, and All Markets. Your account only sees the markets it is entitled to based on your licence tier. Pack entitlements are configured per tier — see the Licensing page for details.",
  },
  {
    id: "pack-forex",
    questions: ["forex pack", "forex scanner", "do you cover forex", "forex only"],
    keywords: ["forex", "fx", "currency", "currencies"],
    answer:
      "The Forex pack gives Scanner access to the Forex market. It is included in all paid licence tiers (Lite, Professional, Enterprise).",
  },
  {
    id: "pack-indices",
    questions: ["indices pack", "indices scanner", "do you cover indices", "index markets"],
    keywords: ["indices", "index", "us30", "nasdaq"],
    answer:
      "The Indices pack gives Scanner access to index markets. It is included in Professional and Enterprise tiers.",
  },
  {
    id: "pack-synthetics",
    questions: ["synthetics pack", "synthetic indices", "do you cover synthetics", "is synthetics ready"],
    keywords: ["synthetic", "synthetics", "volatility", "deriv"],
    answer:
      "Synthetics (synthetic indices) are offered under the Enterprise tier, which includes full market access identical to the system's own detection scope.",
  },
  {
    id: "pack-forex-indices",
    questions: ["forex and indices bundle", "forex plus indices", "forex indices pack"],
    keywords: ["forex", "indices", "bundle", "both", "plus"],
    answer:
      "The Forex + Indices bundle combines both markets on one account. It is included in the Professional tier.",
  },
  {
    id: "pack-forex-synthetics",
    questions: ["forex and synthetics bundle", "forex plus synthetics"],
    keywords: ["forex", "synthetics", "synthetic", "bundle", "plus"],
    answer:
      "The Forex + Synthetics bundle combines Forex with Synthetics. It is available under the Enterprise tier.",
  },
  {
    id: "pack-indices-synthetics",
    questions: ["indices and synthetics bundle", "indices plus synthetics"],
    keywords: ["indices", "synthetics", "synthetic", "bundle", "plus"],
    answer:
      "The Indices + Synthetics bundle combines Indices with Synthetics. It is available under the Enterprise tier.",
  },
  {
    id: "pack-full",
    questions: ["full market pack", "all markets pack", "everything bundle", "all three markets"],
    keywords: ["full", "all", "everything", "three", "complete"],
    answer:
      "The All Markets pack covers Forex, Indices and Synthetics on one account. It is the Enterprise tier entitlement — everything the system detects.",
  },
  {
    id: "pricing",
    questions: ["how much does it cost", "what is the price", "pricing", "how much is the scanner", "is it free"],
    keywords: ["price", "pricing", "cost", "much", "fee", "rand", "zar", "usd"],
    answer:
      "CodePhantom offers four licence tiers: Free (research materials and resources), Lite ($15/month — 5 market directions/day, 20/week), Professional ($99/month — 20+ market directions/day), and Enterprise ($499/month — everything the system detects). Exact pricing and features are on the Licensing page.",
  },
  {
    id: "availability",
    questions: ["can i buy", "how do i sign up", "when will it launch", "is it available", "how do i get access", "release date"],
    keywords: ["buy", "purchase", "available", "launch", "access", "signup", "register", "release", "when"],
    answer:
      "Licences are available now. Create an account on the Sign In page, choose your tier on the Licensing page, and you will receive a unique activation key. The core licence is applied to your account immediately — no waiting for a launch date.",
  },
  {
    id: "android-app",
    questions: ["is there an app", "codephantom app", "android app", "mobile app", "what does the app do"],
    keywords: ["app", "android", "mobile", "application"],
    answer:
      "The CodePhantom App is the mobile client for CodePhantom accounts. Account holders use it to review Scanner setups, manage their licence and devices, and receive notifications. It is distributed as an Android APK from the official Download page with SHA-256 verification.",
  },
  {
    id: "apk-download",
    questions: ["where can i download the app", "apk download", "how do i install the app", "download link"],
    keywords: ["download", "apk", "install", "play", "store"],
    answer:
      "The Android APK is linked on the Download page with its SHA-256 checksum so you can verify the file. Only install CodePhantom builds linked from the official Download page — never an APK sent over WhatsApp or from another site.",
  },
  {
    id: "ios",
    questions: ["is there an iphone app", "ios app", "apple app"],
    keywords: ["iphone", "ios", "apple", "ipad"],
    answer: "The CodePhantom App is Android-first. There is no iOS release, and none has been announced.",
  },
  {
    id: "activation-key",
    questions: ["what is an activation key", "how does activation work", "how do i activate", "activation key"],
    keywords: ["activation", "activate", "key", "code"],
    answer:
      "An activation key is a one-time code. You sign in, enter it once, and it activates your account's core licence and registers your first device. After that your account — not the key — gives you access, and the key can never be used again by anyone. Keep unused keys private.",
  },
  {
    id: "one-account-licence",
    questions: ["how many licences does an account get", "do i need a new key to upgrade", "one account one licence", "core licence"],
    keywords: ["licence", "license", "core", "second", "another", "multiple", "licences"],
    answer:
      "Each CodePhantom account has one core licence. Upgrades and extra market packs are added to that same licence on the server, so you never need a second activation key.",
  },
  {
    id: "upgrades",
    questions: ["how do i upgrade", "can i add another market", "change my plan"],
    keywords: ["upgrade", "upgrading", "add", "change", "switch"],
    answer:
      "Upgrades are added to your existing account and licence — for example moving from Lite to Professional — so there is no new key to enter. Changes take effect at the next billing cycle.",
  },
  {
    id: "entitlements",
    questions: ["what are entitlements", "what can my account access", "why cant i see a market"],
    keywords: ["entitlement", "entitlements", "permission", "locked", "visible"],
    answer:
      "Entitlements are the server-side record of what your account may use — for example Forex setups, Indices setups, or Synthetics access. The app shows only what your account is entitled to based on your licence tier.",
  },
  {
    id: "device-binding",
    questions: ["how many devices can i use", "device binding", "can i use two phones", "can i share my account"],
    keywords: ["device", "devices", "phones", "share", "sharing", "binding", "two"],
    answer:
      "An account is bound to one primary device by default. The first device is registered when you activate, and the app is unlocked with a PIN on that device. Sharing an account isn't allowed. The server always has the final say: a signed-out or replaced device loses access.",
  },
  {
    id: "lost-phone",
    questions: ["i lost my phone", "my phone was stolen", "i got a new phone", "replace my phone", "lost device"],
    keywords: ["lost", "stolen", "new", "replace", "broken", "phone"],
    answer:
      "Contact CodePhantom support from your account's email address. Support verifies that you are the account holder and issues a one-time replacement device key. Install the app on the new phone, sign in and enter the key: the new phone is authorised and the old phone is signed out and loses access. Your licence and markets stay the same — it isn't a new purchase. If the phone was stolen, tell us straight away and change your password. Details are on the Support page.",
  },
  {
    id: "replacement-key",
    questions: ["what is a replacement key", "device binding key", "replacement device key", "device key"],
    keywords: ["replacement", "rebind"],
    answer:
      "A replacement (device-binding) key is a one-time key that only CodePhantom support or an authorised client manager can issue, after verifying the account holder. It works only for your account, expires after a short period, and when used it moves access to your new phone and revokes the old one.",
  },
  {
    id: "pin",
    questions: ["what is the pin", "forgot my pin", "app pin"],
    keywords: ["pin", "unlock", "biometric", "fingerprint"],
    answer:
      "The 4-8 digit PIN unlocks the app on your own device. It never leaves your phone and is not your password. If you forget it, sign in again with your email or username and password and set a new PIN.",
  },
  {
    id: "password-recovery",
    questions: ["i forgot my password", "reset my password", "password recovery", "cant log in"],
    keywords: ["password", "forgot", "reset", "recover", "recovery", "login"],
    answer:
      "Use \"Forgot password\" in the app or on the Sign In page. If the address has an account, a reset link is emailed to it (the message looks the same either way, so nobody can check whether an email is registered). The link opens the app to set a new password, and you are then signed out on all devices. CodePhantom will never ask you for your password.",
  },
  {
    id: "username-login",
    questions: ["can i log in with my username", "username or email"],
    keywords: ["username", "handle"],
    answer:
      "Yes — CodePhantom accounts can sign in with either the email address or the unique username. Your email remains the address used for verification and password recovery.",
  },
  {
    id: "trials",
    questions: ["is there a free trial", "free trial", "can i try it"],
    keywords: ["trial", "trials", "try"],
    answer:
      "The platform supports trials (one per account per plan). If trials are available, their length and terms will be shown with the plan on the Licensing page.",
  },
  {
    id: "referrals",
    questions: ["is there a referral program", "referral code", "refer a friend"],
    keywords: ["referral", "refer", "referrals", "friend", "affiliate"],
    answer: "The platform supports referral codes, but no referral programme is running and no rewards are on offer right now.",
  },
  {
    id: "subscriptions",
    questions: ["is it a subscription", "monthly subscription", "can i cancel", "lifetime licence"],
    keywords: ["subscription", "subscriptions", "subscribe", "monthly", "cancel", "renew", "lifetime", "yearly"],
    answer:
      "Licence tiers are billed monthly. You can cancel at any time from your account settings; access continues until the end of the paid period. No lifetime licence is offered.",
  },
  {
    id: "codephantom-traders",
    questions: ["whatsapp group", "codephantom traders", "is there a community", "tat market direction", "join the group"],
    keywords: ["whatsapp", "group", "community", "traders", "tat", "chat"],
    answer:
      "CodePhantom Traders is CodePhantom's WhatsApp group (formerly TAT Market Direction) for market discussion, setups and CodePhantom updates. The invite link is on the Contact and Support pages when available. Group discussion is general information — never post account details or keys there.",
  },
  {
    id: "support",
    questions: ["how do i get support", "i need help", "customer support", "contact support"],
    keywords: ["support", "problem", "issue", "ticket"],
    answer:
      "See the Support page. For now, reach CodePhantom through the Contact page; once the app is released, account holders can open support tickets inside the app. Lost or replaced phones, activation and password problems are all covered there.",
  },
  {
    id: "signals",
    questions: ["do you sell signals", "paid signals", "trade signals"],
    keywords: ["signals", "signal", "calls", "tips"],
    answer:
          "CodePhantom software licences power the CPT Scanner, Code Phantom EA and CodePhantom App. The CPT Scanner detects market setups for your own analysis using documented, audited rules. These are software tools, not financial advice or trading recommendations.",
  },
  {
    id: "automated-trading",
    questions: ["can it trade for me", "auto trading", "copy trading", "managed account"],
    keywords: ["auto", "automated", "execute", "execution", "copy", "managed", "bot"],
    answer:
          "Code Phantom EA is licensed as a software engine. You run it on your own infrastructure with your own broker credentials. Execution permissions are part of the EA licence and operate on your hardware.",
  },
  {
    id: "performance",
    questions: ["what is your win rate", "how profitable is it", "track record", "how much can i make"],
    keywords: ["win", "rate", "profitable", "profit", "results", "returns", "roi", "performance", "make"],
    answer:
      "CodePhantom publishes no win rates, returns or backtest results, and makes no performance claims. The products are software licences — the engine, the scanner, the app — not managed services or investment vehicles.",
  },
  {
    id: "trading-risk",
    questions: ["is trading risky", "risk warning", "can i lose money"],
    keywords: ["risk", "risky", "lose", "loss", "safe", "guaranteed"],
    answer:
      "Yes. Trading forex, indices and synthetic instruments carries a high risk of loss and isn't suitable for everyone. CodePhantom tools and community content are for information and research only, not financial advice, and past or backtested behaviour does not guarantee future results. Only trade with money you can afford to lose.",
  },
  {
    id: "privacy",
    questions: ["privacy policy", "what data do you collect", "do you track me"],
    keywords: ["privacy", "data", "personal", "cookies", "track", "popia"],
    answer:
      "This website uses no analytics or tracking cookies, and Phantom Assistant messages aren't stored by the application. The Privacy page explains what CodePhantom accounts will process once they launch (it is currently a draft).",
  },
  {
    id: "terms",
    questions: ["terms and conditions", "terms of use"],
    keywords: ["terms", "conditions", "agreement", "refund"],
    answer:
      "The Terms page covers website use, the no-financial-advice position and how accounts, licences and devices work. Full terms of sale, subscription and refund terms are published for each licence tier.",
  },
  {
    id: "status",
    questions: ["is the service down", "service status", "status page"],
    keywords: ["status", "down", "outage", "uptime", "online"],
    answer: "The Status page shows live checks of CodePhantom services. There is no public uptime history or service level yet.",
  },
  {
    id: "registered-company",
    questions: ["is codephantom a registered company", "company registration", "pty ltd", "cipc"],
    keywords: ["registered", "registration", "pty", "ltd", "cipc", "incorporated"],
    answer:
      "CodePhantom Technologies is an early-stage venture founded by GingerCodePhantom (Ripfumelo Ngobeni). Company registration details will be published on the website once registration is complete.",
  },
];

export const suggestedQuestions = [
  "What does CodePhantom do?",
  "What is CPT Scanner?",
  "Who founded CodePhantom?",
  "How does activation work?",
  "I lost my phone - what now?",
  "What is CodePhantom Traders?",
  "What are the licence tiers?",
  "How do I upgrade my licence?",
];

export const fallbackAnswer =
  "I don't have a confirmed answer for that yet. For anything beyond what's on this site, the best way to reach CodePhantom is through GitHub: github.com/st10490392, or the Contact page.";

export const greeting =
  "Hi, I'm Phantom Assistant. I can answer questions about CodePhantom Technologies, our products, accounts and licences, support and our founder. What would you like to know?";

/** Replies for conversational basics, matched in engine.ts before fuzzy matching. */
export const smallTalk = {
  greeting:
    "I'm Phantom Assistant. Ask me about CodePhantom Technologies, CPT Scanner, the CodePhantom App, accounts and licences, or how to get support.",
  thanks: "You're welcome! Anything else you'd like to know about CodePhantom?",
  goodbye: "Thanks for stopping by. You can find us any time on the Contact page.",
  howAreYou: "All systems running, thanks for asking! What would you like to know about CodePhantom?",
  whoAreYou:
    "I'm Phantom Assistant, CodePhantom Technologies' website assistant. I answer from CodePhantom's approved information only — products, accounts and licences, support, the company and its founder. I can't give financial advice, and for anything I don't know I'll point you to the Contact page.",
};