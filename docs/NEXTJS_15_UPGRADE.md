# Next.js 15 security upgrade

Next.js 14.2.35 → **15.5.26**, React 18 → **19**. This fixes the published
Next.js advisories recorded as WEB-1 in the CodePhantom security audit
(code-phantom-App `docs/SECURITY_AUDIT.md`). Every one of them is fixed
in 15.5.24+. `npm audit` now reports **0 vulnerabilities**, including dev
dependencies.

## What changed

| Area | Change |
|---|---|
| Framework | `next` 15.5.26, `react`/`react-dom` 19, `@types/react`/`@types/react-dom` 19, `eslint-config-next` 15.5.26. |
| PostCSS | Next 15.5 pins its own copy of PostCSS 8.4.31, which has published advisories (build-time only). An npm `overrides` entry makes Next use the project's PostCSS (now `^8.5.28`, same major version). |
| Async request APIs | Next 15 makes `cookies()` and route/page `params` asynchronous. `currentAccessToken()`/`currentRefreshToken()` in `lib/portal-server.ts` are now `async`, and all six portal routes `await` them. `products/[slug]`, `projects/[slug]` and `api/portal/subscriptions/[id]/manage` await `params`. |
| Linting | `next lint` is deprecated in 15.5 and removed in 16. `npm run lint` now runs the ESLint CLI (`eslint . --max-warnings=0`) with the same `next/core-web-vitals` rules. Build output and generated files are ignored in `.eslintrc.json`. `npm run typecheck` runs `tsc --noEmit`. |
| Runtime | `engines.node >= 18.18.0` (Next 15's minimum). CI already uses Node 20. |

The security hardening from PR #8 is unchanged: images are still served
unoptimized (`/_next/image` stays disabled), and the portal Origin check
middleware is still active.

## Behaviour

No user-visible change was expected, and none was found. Verification, with
the pre-upgrade build (PR #8) and this build run side by side:

- All 42 generated routes (plus two product pages, a project page and a 404)
  return the same status codes.
- Portal API:
  - a cross-site POST is refused (403) on both;
  - a same-site POST reaches the handler ("Sign in before checkout." without
    a session);
  - cookie-based session reads behave the same.
- `/_next/image` returns 404 on both, so the optimizer stays disabled.
- Screenshots of `/`, `/products`, `/products/cpt-scanner`, `/founder`,
  `/app`, `/download`, `/support` and `/privacy` at 1440×900 and 390×844 are
  **pixel-identical** (animations disabled for the capture).
- `npm test` (15 pass), `npm run lint`, `npm run typecheck` and `npm run build`
  all pass with no warnings.

Caching note: Next 15 no longer caches `fetch` or `GET` route handlers by
default. The site's backend fetches already set their caching explicitly
(`next: { revalidate }` or `cache: "no-store"`), and the portal routes are
dynamic, so nothing changes.

## Owner actions

- The hosting runtime must use **Node.js 18.18 or newer** (20 LTS recommended).
- Redeploy after merging. No environment variables changed.
- Optional, later: now that the Image Optimization advisories are fixed,
  `images.unoptimized` in `next.config.mjs` could be removed to bring back
  optimized images. It is kept in this upgrade to preserve PR #8's behaviour
  exactly.
