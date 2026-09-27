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

export async function POST(_request: Request, { params }: { params: { id: string } }) {
  let access = currentAccessToken();
  let refreshed: Awaited<ReturnType<typeof refreshBackendSession>> = null;
  if (!access) {
    const refresh = currentRefreshToken();
    if (refresh) refreshed = await refreshBackendSession(refresh).catch(() => null);
    access = refreshed?.accessToken;
  }
  if (!access) return NextResponse.json({ error: "Sign in to manage your subscription." }, { status: 401 });

  const call = (token: string) =>
    backendFetch(`/commerce/subscriptions/${encodeURIComponent(params.id)}/manage`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

  let backend = await call(access);
  if (backend.status === 401) {
    const refresh = currentRefreshToken();
    if (refresh) refreshed = await refreshBackendSession(refresh).catch(() => null);
    if (refreshed) backend = await call(refreshed.accessToken);
  }

  const payload = await backend.json().catch(() => ({}));
  const url = payload?.data?.url;
  const response = NextResponse.json(
    backend.ok && typeof url === "string"
      ? { ok: true, url }
      : { error: payload?.error?.message ?? payload?.message ?? "Subscription management is unavailable." },
    { status: backend.status },
  );
  if (refreshed) {
    response.cookies.set(ACCESS_COOKIE, refreshed.accessToken, cookieOptions(refreshed.expiresIn));
    response.cookies.set(REFRESH_COOKIE, refreshed.refreshToken, cookieOptions(60 * 60 * 24 * 30));
  }
  return response;
}
