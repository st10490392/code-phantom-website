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

export type PublicPlan = {
  code: string;
  name: string;
  billingType: string;
  billingInterval: string | null;
  priceAmountMinor: number | null;
  priceCurrency: string | null;
  trialEligible: boolean;
  trialDays: number | null;
};

/**
 * Plans the backend reports as enabled AND publicly visible. Anything the
 * owner has not explicitly published is absent, so the site can never
 * advertise a disabled plan. Prices are the backend's, never invented here.
 */
export async function getPublicPlans(): Promise<PublicPlan[]> {
  const out: PublicPlan[] = [];
  for (const row of await getPublic("/plans")) {
    const r = row as Record<string, unknown>;
    if (typeof r.code !== "string" || typeof r.name !== "string") continue;
    const amount = typeof r.price_amount_minor === "number" ? r.price_amount_minor : typeof r.price_amount_minor === "string" ? Number(r.price_amount_minor) : null;
    out.push({
      code: r.code,
      name: r.name,
      billingType: typeof r.billing_type === "string" ? r.billing_type : "CUSTOM",
      billingInterval: typeof r.billing_interval === "string" ? r.billing_interval : null,
      priceAmountMinor: amount !== null && Number.isFinite(amount) && amount >= 0 ? amount : null,
      priceCurrency: typeof r.price_currency === "string" && /^[A-Z]{3}$/.test(r.price_currency) ? r.price_currency : null,
      trialEligible: r.trial_eligible === true,
      trialDays: typeof r.trial_days === "number" ? r.trial_days : null,
    });
  }
  return out;
}

export type ApiHealth = { configured: boolean; reachable: boolean | null; checkedAt: string };

/**
 * One live liveness probe of the platform API (GET /health). Reports what
 * was observed at `checkedAt` - never an uptime percentage or history.
 */
export async function getApiHealth(): Promise<ApiHealth> {
  const checkedAt = new Date().toISOString();
  const base = apiBase();
  if (!base) return { configured: false, reachable: null, checkedAt };
  try {
    const res = await fetch(`${base}/health`, { next: { revalidate: 60 }, signal: AbortSignal.timeout(TIMEOUT_MS) });
    return { configured: true, reachable: res.ok, checkedAt };
  } catch {
    return { configured: true, reachable: false, checkedAt };
  }
}

