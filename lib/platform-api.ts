/**
 * Read-only access to the CodePhantom Backend's PUBLIC endpoints
 * (/api/v1/public/*), used at build/revalidation time on the server.
 *
 * - Server-only: import from Server Components only. CODEPHANTOM_API_URL
 *   is not a NEXT_PUBLIC_ variable (it is undefined in the browser), and no
 *   key or token of any kind is used - these endpoints are unauthenticated
 *   and return only data the backend marks publicly visible.
 * - Fail closed: if the URL is unset, the backend is unreachable, slow, or
 *   returns anything unexpected, callers get an empty list and the related
 *   section simply does not render. The site never depends on the backend
 *   being up.
 */
const REVALIDATE_SECONDS = 3600;
const TIMEOUT_MS = 5000;

function apiBase(): string | null {
  const raw = process.env.CODEPHANTOM_API_URL?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    if (url.protocol !== "https:" && !(url.protocol === "http:" && local)) return null;
    return raw.replace(/\/$/, "");
  } catch {
    return null;
  }
}

async function getPublic(path: string): Promise<unknown[]> {
  const base = apiBase();
  if (!base) return [];
  try {
    const res = await fetch(`${base}/api/v1/public${path}`, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return [];
    const body = (await res.json()) as { data?: unknown };
    return Array.isArray(body.data) ? body.data : [];
  } catch {
    return [];
  }
}

export type PublishedTestimonial = {
  id: string;
  product: "SCANNER" | "SIGNALS" | "EA" | "APP" | "COMPANY";
  displayName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  body: string;
  publishedAt: string;
  /** True only when a staff-verified performance record backs the testimonial. */
  performanceVerified: boolean;
};

const PRODUCTS = new Set(["SCANNER", "SIGNALS", "EA", "APP", "COMPANY"]);

/**
 * Testimonials that passed the backend's moderation pipeline (consented,
 * approved, and - if they make a performance claim - backed by a verified
 * performance submission). Anything malformed is dropped, not repaired.
 */
export async function getPublishedTestimonials(limit = 6): Promise<PublishedTestimonial[]> {
  const rows = await getPublic(`/testimonials?limit=${Math.min(Math.max(limit, 1), 50)}`);
  const out: PublishedTestimonial[] = [];
  for (const row of rows) {
    const r = row as Record<string, unknown>;
    if (
      typeof r.id === "string" &&
      typeof r.product === "string" &&
      PRODUCTS.has(r.product) &&
      typeof r.display_name === "string" &&
      typeof r.rating === "number" &&
      Number.isInteger(r.rating) &&
      r.rating >= 1 &&
      r.rating <= 5 &&
      typeof r.body === "string" &&
      typeof r.published_at === "string"
    ) {
      out.push({
        id: r.id,
        product: r.product as PublishedTestimonial["product"],
        displayName: r.display_name.slice(0, 60),
        rating: r.rating as PublishedTestimonial["rating"],
        body: r.body.slice(0, 2000),
        publishedAt: r.published_at,
        performanceVerified: r.performance_verified === true,
      });
    }
  }
  return out;
}

/** Feature keys the backend reports as on-for-everyone AND publicly visible. */
export async function getPublicFeatures(): Promise<string[]> {
  return (await getPublic("/features")).filter((f): f is string => typeof f === "string");
}
