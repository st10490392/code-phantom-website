import { NextResponse } from "next/server";
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  backendFetch,
  cookieOptions,
  currentAccessToken,
  currentRefreshToken,
  refreshBackendSession,
} from "@/lib/portal-server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const planCode = body && typeof body.plan_code === "string" ? body.plan_code : "";
  const offerCode = body && typeof body.offer_code === "string" ? body.offer_code : undefined;
  const provider =
    body && ["paystack", "paypal", "skrill", "binance_pay"].includes(body.provider)
      ? body.provider
      : undefined;
  if (!planCode) return NextResponse.json({ error: "Plan is required." }, { status: 400 });

  let access = await currentAccessToken();
  let refreshed: Awaited<ReturnType<typeof refreshBackendSession>> = null;
  if (!access) {
    const refresh = await currentRefreshToken();
    if (refresh) refreshed = await refreshBackendSession(refresh).catch(() => null);
    access = refreshed?.accessToken;
  }
  if (!access) return NextResponse.json({ error: "Sign in before checkout." }, { status: 401 });

  let backend = await backendFetch("/commerce/checkout", {
    method: "POST",
    headers: { Authorization: `Bearer ${access}` },
    body: JSON.stringify({ plan_code: planCode, offer_code: offerCode, provider }),
  });

  if (backend.status === 401) {
    const refresh = await currentRefreshToken();
    if (refresh) refreshed = await refreshBackendSession(refresh).catch(() => null);
    if (refreshed) {
      backend = await backendFetch("/commerce/checkout", {
        method: "POST",
        headers: { Authorization: `Bearer ${refreshed.accessToken}` },
        body: JSON.stringify({ plan_code: planCode, offer_code: offerCode, provider }),
      });
    }
  }

  const payload = await backend.json().catch(() => ({}));
  const response = NextResponse.json(
    backend.ok
      ? { ok: true, authorization_url: payload.data?.authorization_url, reference: payload.data?.reference }
      : { error: payload?.error?.message ?? payload?.message ?? "Checkout could not be started." },
    { status: backend.status },
  );
  if (refreshed) {
    response.cookies.set(ACCESS_COOKIE, refreshed.accessToken, cookieOptions(refreshed.expiresIn));
    response.cookies.set(REFRESH_COOKIE, refreshed.refreshToken, cookieOptions(60 * 60 * 24 * 30));
  }
  return response;
}
