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

async function loadEa(accessToken: string) {
  const headers = { Authorization: `Bearer ${accessToken}` };
  const accountsResponse = await backendFetch("/ea/accounts?limit=50", { headers });
  if (!accountsResponse.ok) return [];
  const accountsBody = await accountsResponse.json().catch(() => ({}));
  const accounts = Array.isArray(accountsBody.data) ? accountsBody.data : [];

  return Promise.all(
    accounts.map(async (account: Record<string, unknown>) => {
      const id = typeof account.id === "string" ? account.id : "";
      if (!id) return { ...account, runtime_status: null };
      const statusResponse = await backendFetch(`/ea/accounts/${encodeURIComponent(id)}/status`, { headers });
      const statusBody = statusResponse.ok ? await statusResponse.json().catch(() => ({})) : {};
      return { ...account, runtime_status: statusBody.data ?? null };
    }),
  );
}

async function load(accessToken: string) {
  const headers = { Authorization: `Bearer ${accessToken}` };
  const [me, access, scanner, signals, notifications, eaAccounts] = await Promise.all([
    backendFetch("/me", { headers }),
    backendFetch("/me/access", { headers }),
    backendFetch("/scanner/setups?limit=50", { headers }),
    backendFetch("/signals?limit=200", { headers }),
    backendFetch("/notifications?limit=50", { headers }),
    loadEa(accessToken),
  ]);
  return { me, access, scanner, signals, notifications, eaAccounts };
}

export async function GET() {
  let token = await currentAccessToken();
  let refreshed: Awaited<ReturnType<typeof refreshBackendSession>> = null;

  if (!token) {
    const refresh = await currentRefreshToken();
    if (refresh) refreshed = await refreshBackendSession(refresh).catch(() => null);
    token = refreshed?.accessToken;
  }

  if (!token) return NextResponse.json({ authenticated: false }, { status: 401 });

  let loaded = await load(token);
  if (loaded.me.status === 401) {
    const refresh = await currentRefreshToken();
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

  const [meBody, accessBody, scannerBody, signalsBody, notificationsBody] = await Promise.all([
    loaded.me.json().catch(() => ({})),
    loaded.access.ok ? loaded.access.json().catch(() => ({})) : Promise.resolve({}),
    loaded.scanner.ok ? loaded.scanner.json().catch(() => ({})) : Promise.resolve({}),
    loaded.signals.ok ? loaded.signals.json().catch(() => ({})) : Promise.resolve({}),
    loaded.notifications.ok ? loaded.notifications.json().catch(() => ({})) : Promise.resolve({}),
  ]);

  const response = NextResponse.json({
    authenticated: true,
    me: meBody.data ?? null,
    access: accessBody.data ?? null,
    scanner_setups: scannerBody.data ?? [],
    signals: signalsBody.data ?? [],
    notifications: notificationsBody.data ?? [],
    ea_accounts: loaded.eaAccounts,
  });
  if (refreshed) {
    response.cookies.set(ACCESS_COOKIE, refreshed.accessToken, cookieOptions(refreshed.expiresIn));
    response.cookies.set(REFRESH_COOKIE, refreshed.refreshToken, cookieOptions(60 * 60 * 24 * 30));
  }
  return response;
}
