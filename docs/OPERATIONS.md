# Website operations

## Environments

| Variable | Scope | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | build | Confirmed production domain; drives canonical URLs, OpenGraph, sitemap, robots and JSON-LD ids. Never guessed - falls back to `http://localhost:3000`. |
| `CODEPHANTOM_API_URL` | server only | CodePhantom Backend base URL (`https://…`). Read at build/revalidation (hourly) for **public, moderated** data only. Unset = feature off. |
| `NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL` | build | CodePhantom Traders WhatsApp group invite (`https://chat.whatsapp.com/<code>`, WhatsApp's share query parameters allowed and stripped). Anything else is ignored and the CTA stays hidden. |
| `NEXT_PUBLIC_ANDROID_RELEASE_*` | build | Version, URL, SHA-256, date, channel of a real signed Android release (see `lib/releases.ts`). All must be valid or `/download` offers nothing. |

Staging: deploy preview builds (e.g. Vercel preview) with the staging
backend URL and **no** `NEXT_PUBLIC_SITE_URL` (so previews never claim the
production canonical domain), and keep `robots` indexing off for previews
at the host level.

## SEO

- Organization + WebSite JSON-LD on every page, connected by stable `@id`s
  (`/#organization`, `/#website`); the Organization lists only confirmed
  company channels in `sameAs`.
- `/founder` adds Person (`/founder#person`, `worksFor` the Organization,
  `sameAs` the founder's own GitHub/LinkedIn/Instagram), ProfilePage and
  BreadcrumbList, plus a canonical URL and `og:type=profile`.
- Facts come only from `lib/founder.ts` / `lib/site-config.ts`. Do not add
  titles, credentials, awards or metrics that are not confirmed.
- Google Search Console verification file is in `public/`. After the
  production domain is live: submit `/sitemap.xml`, request indexing for
  `/` and `/founder`, and validate structured data with the Rich Results
  test. Create a LinkedIn company page / Google Business Profile only when
  they genuinely exist, then add them to `socials` (they flow into
  `sameAs` automatically).

## Company and founder identity

`lib/company.ts` is the single source for the brand (CodePhantom
Technologies), the founder's two identities - `alias` GingerCodePhantom
(public creator brand, shown first) and `personName` Ripfumelo Ngobeni
(real name, shown beneath it) - and the future legal entity. Structured
data uses the real name as the Person `name` with GingerCodePhantom as
`alternateName`; titles read "GingerCodePhantom (Ripfumelo Ngobeni) —
Founder of CodePhantom Technologies", so searches for either name
associate the founder with the company. `legal.legalName` and `legal.registrationNumber` stay
`null` until CIPC registration is complete; filling them in updates the
footer, Terms, Privacy and Organization structured data at once. Never
write "(Pty) Ltd" anywhere before then. No founder details beyond those
already on the Founder page belong in the site.

## WhatsApp - CodePhantom Traders

The existing group (formerly TAT Market Direction) is presented as
"Join CodePhantom Traders" - "Market discussion, setups and CodePhantom
updates." Set `NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL` and redeploy; the CTA
appears on /contact, /support and /download. The backend has a matching `community.whatsapp` feature flag for
the app. Community content must stay informational: no signals, no
performance claims, no "guaranteed" language, and the not-financial-advice
line stays in the CTA.

## Testimonials

Only moderated testimonials are ever shown:

1. Clients submit in the app (`POST /api/v1/submissions/testimonials`,
   flag `testimonials.submission`) with explicit publication consent.
2. A moderator (`moderation.manage`) approves/rejects. Any testimonial that
   makes a performance claim needs a staff-VERIFIED performance
   submission; the database refuses to approve it otherwise.
3. When the backend flag `testimonials.public` is on, approved items appear
   at `GET /api/v1/public/testimonials` (no user ids); this site reads them
   hourly and renders the section only if there is at least one. Malformed
   rows are dropped.

Never add testimonials by hand that did not go through this pipeline
(`lib/reviews.ts` exists for moderated, consented entries only), never
invent users, customers, results or win rates.

## Products, download, status

- `/products/*` content lives in `lib/products.ts`. Scanner pack
  availability and prices come only from the backend's public plan catalog
  (enabled + publicly visible plans); nothing else is ever shown as for sale.
- `/download` offers an APK only when every `NEXT_PUBLIC_ANDROID_RELEASE_*`
  value is set and valid - publish the checksum from the release workflow's
  `SHA256SUMS.txt`.
- `/status` shows a single live health check of the platform API when
  `CODEPHANTOM_API_URL` is set; it never shows uptime percentages.
- `/privacy` and `/terms` are marked Draft; have them reviewed before any
  account-based product launches.

## Phantom Assistant

Answers come only from `lib/chatbot/knowledge-base.ts`; greetings, thanks
and "who are you" are handled in `lib/chatbot/engine.ts`. `npm test` checks
routing for every product/account topic and that answers contain no
prices, performance claims, production-ready Synthetics or legal names.

## Deployment checklist

`npm ci && npm run lint && npm test && npm run build` (CI runs the same). Confirm the
production domain before setting `NEXT_PUBLIC_SITE_URL`.
