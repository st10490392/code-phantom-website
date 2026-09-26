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

async function load(accessToken: string) {
  const headers = { Authorization: `Bearer ${accessToken}` };
  const [me, access, purchases] = await Promise.all([
    backendFetch("/me", { headers }),
    backendFetch("/me/access", { headers }),
    backendFetch("/commerce/purchases", { headers }),
  ]);
  return { me, access, purchases };
}

export async function GET() {
  let token = currentAccessToken();
  let refreshed: Awaited<ReturnType<typeof refreshBackendSession>> = null;

  if (!token) {
    const refresh = currentRefreshToken();
    if (refresh) refreshed = await refreshBackendSession(refresh).catch(() => null);
    token = refreshed?.accessToken;
  }

  if (!token) return NextResponse.json({ authenticated: false }, { status: 401 });

  let loaded = await load(token);
  if (loaded.me.status === 401) {
    const refresh = currentRefreshToken();
    if (refresh) {
      refreshed = await refreshBackendSession(refresh).catch(() => null);
      if (refreshed) {
        token = refreshed.accessToken;
        loaded = await load(token);
      }
    }
  }

  if (!loaded.me.ok) {
    const response = NextResponse.json({ authenticated: false }, { status: 401 });
    response.cookies.set(ACCESS_COOKIE, "", { path: "/", maxAge: 0 });
    response.cookies.set(REFRESH_COOKIE, "", { path: "/", maxAge: 0 });
    return response;
  }

  const [meBody, accessBody, purchasesBody] = await Promise.all([
    loaded.me.json().catch(() => ({})),
    loaded.access.ok ? loaded.access.json().catch(() => ({})) : Promise.resolve({}),
    loaded.purchases.ok ? loaded.purchases.json().catch(() => ({})) : Promise.resolve({}),
  ]);

  const response = NextResponse.json({
    authenticated: true,
    me: meBody.data ?? null,
    access: accessBody.data ?? null,
    purchases: purchasesBody.data ?? [],
  });
  if (refreshed) {
    response.cookies.set(ACCESS_COOKIE, refreshed.accessToken, cookieOptions(refreshed.expiresIn));
    response.cookies.set(REFRESH_COOKIE, refreshed.refreshToken, cookieOptions(60 * 60 * 24 * 30));
  }
  return response;
}
