# CodePhantom Technologies — Website

The official production website for **CodePhantom Technologies** —
_Engineering Intelligent Systems._

## Stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- No external UI/animation dependencies — motion is CSS + a small
  `IntersectionObserver`-based `Reveal` component
- Phantom Assistant (site chatbot) runs on a local, structured knowledge
  base — no paid AI API required

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Project structure

```
app/                    Routes (App Router)
  api/chat/              Phantom Assistant API endpoint
  divisions/[division]/  Division pages (software, security, labs, phantom-traders)
  projects/[slug]/       Project detail pages
  ...
components/             UI components
  phantom-assistant/     The Phantom Assistant chat widget
  ui/                    Small shared primitives (Button, Section, Reveal, Badge)
lib/                     Content & configuration (the site's data layer)
  site-config.ts          Identity, socials/contact channels, nav
  capabilities.ts         The 4 capability areas
  divisions.ts            The 4 divisions
  projects.ts              Project data model + entries
  articles.ts              Insights/research data model (empty until published)
  promotions.ts            Promotion/campaign data model (empty until one exists)
  reviews.ts                Testimonial data model (empty until real reviews exist)
  founder.ts                 Founder profile
  company-history.ts          Mission/vision/values, origin story, timeline
  future-architecture.ts       Documented future infrastructure (signals, Phantom Traders roadmap, admin)
  chatbot/                     Phantom Assistant knowledge base, matching engine, provider abstraction
public/
  logo.png                The official CodePhantom logo (as supplied — never redrawn)
  mark.png                 A lossless crop of the same logo's emblem, used at small sizes
```

## Content model & future CMS migration

All real content (projects, divisions, capabilities, founder bio, company
history) lives in typed files under `lib/`, separate from UI components.
This is intentional: a future **CodePhantom Admin** panel can migrate this
data into a database with minimal rework, since every page already reads
from these typed exports rather than embedding content inline.

**Nothing here is a placeholder.** `articles.ts`, `promotions.ts` and
`reviews.ts` intentionally ship empty — the corresponding pages render an
honest "coming soon" / hidden state rather than fake content. Do not seed
them with fabricated data; add real entries when they exist.

## Phantom Assistant

The site's chatbot (`components/phantom-assistant/`) is answered by
`/api/chat`, which delegates to a provider abstraction
(`lib/chatbot/provider.ts`). V1 ships the **local** provider — deterministic
keyword/fuzzy matching over `lib/chatbot/knowledge-base.ts`, with an honest
fallback when it doesn't know an answer. A real LLM provider can be enabled
later purely through environment configuration
(`PHANTOM_CHAT_PROVIDER=llm` + a server-side API key) without touching the
route or any client code — but it must stay grounded in the same knowledge
base and must never invent facts about CodePhantom.

## Contact channels & socials

`lib/site-config.ts` is the single source of truth for social/contact
links. A channel set to `null` is hidden everywhere automatically (nav,
footer, contact page) — never rendered as a dead link. Only add a value
here once it's actually confirmed.

## Brand assets

`public/logo.png` is the official CodePhantom logo exactly as supplied —
it is never redrawn, regenerated or distorted. `public/mark.png` is a
pixel-for-pixel crop of that same file's emblem (no redraw), used
wherever the full lockup would be illegible (nav, favicon).

## Operations

See [`docs/OPERATIONS.md`](docs/OPERATIONS.md) for environment variables,
SEO/structured data, the WhatsApp community link and the moderated
testimonial pipeline.

