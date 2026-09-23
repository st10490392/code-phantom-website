# Website operations

## Environments

| Variable | Scope | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | build | Confirmed production domain; drives canonical URLs, OpenGraph, sitemap, robots and JSON-LD ids. Never guessed - falls back to `http://localhost:3000`. |
| `CODEPHANTOM_API_URL` | server only | CodePhantom Backend base URL (`https://…`). Read at build/revalidation (hourly) for **public, moderated** data only. Unset = feature off. |
| `NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL` | build | WhatsApp **community** invite (`https://chat.whatsapp.com/<code>`). Anything else is ignored and the CTA stays hidden. |

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

## WhatsApp community

Set `NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL` and redeploy; the CTA appears on
/contact. The backend has a matching `community.whatsapp` feature flag for
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

## Deployment checklist

`npm ci && npm run lint && npm run build` (CI runs the same). Confirm the
production domain before setting `NEXT_PUBLIC_SITE_URL`.
