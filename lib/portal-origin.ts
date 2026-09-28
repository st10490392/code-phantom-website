/**
 * CSRF defence for the customer portal's cookie-authenticated API routes.
 *
 * Portal sessions live in HttpOnly SameSite=Lax cookies, which already keep
 * cookies off ordinary cross-site POSTs. This is the second layer: a
 * state-changing request is accepted only when the browser says it came
 * from this site (Origin header, or Sec-Fetch-Site when Origin is absent).
 */
export function isSameSiteRequest(input: {
  method: string;
  origin: string | null;
  secFetchSite: string | null;
  requestOrigin: string;
  siteUrl?: string;
}): boolean {
  const method = input.method.toUpperCase();
  if (method === "GET" || method === "HEAD" || method === "OPTIONS") return true;
  const allowed = new Set([input.requestOrigin]);
  if (input.siteUrl) {
    try {
      allowed.add(new URL(input.siteUrl).origin);
    } catch {
      // ignore a malformed site URL; the request origin still applies
    }
  }
  if (input.origin) return allowed.has(input.origin);
  // No Origin header (some same-origin requests, non-browser clients).
  return input.secFetchSite === null || input.secFetchSite === "same-origin" || input.secFetchSite === "none";
}
