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
  const orderId = body && typeof body.order_id === "string" ? body.order_id : "";
  if (!orderId) return NextResponse.json({ error: "PayPal order is required." }, { status: 400 });

  let access = await currentAccessToken();
  let refreshed: Awaited<ReturnType<typeof refreshBackendSession>> = null;
  if (!access) {
    const refresh = await currentRefreshToken();
    if (refresh) refreshed = await refreshBackendSession(refresh).catch(() => null);
    access = refreshed?.accessToken;
  }
  if (!access) return NextResponse.json({ error: "Sign in to confirm this payment." }, { status: 401 });

  let backend = await backendFetch("/commerce/paypal/capture", {
    method: "POST",
    headers: { Authorization: `Bearer ${access}` },
    body: JSON.stringify({ order_id: orderId }),
  });

  if (backend.status === 401) {
    const refresh = await currentRefreshToken();
    if (refresh) refreshed = await refreshBackendSession(refresh).catch(() => null);
    if (refreshed) {
      backend = await backendFetch("/commerce/paypal/capture", {
        method: "POST",
        headers: { Authorization: `Bearer ${refreshed.accessToken}` },
        body: JSON.stringify({ order_id: orderId }),
      });
    }
  }

  const payload = await backend.json().catch(() => ({}));
  const response = NextResponse.json(
    backend.ok ? { ok: true, data: payload.data } : { error: payload?.error?.message ?? "PayPal payment confirmation failed." },
    { status: backend.status },
  );
  if (refreshed) {
    response.cookies.set(ACCESS_COOKIE, refreshed.accessToken, cookieOptions(refreshed.expiresIn));
    response.cookies.set(REFRESH_COOKIE, refreshed.refreshToken, cookieOptions(60 * 60 * 24 * 30));
  }
  return response;
}
