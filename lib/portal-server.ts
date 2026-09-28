import { cookies } from "next/headers";

export const ACCESS_COOKIE = "cpt_access";
export const REFRESH_COOKIE = "cpt_refresh";

export function apiBase(): string {
  const raw = process.env.CODEPHANTOM_API_URL?.trim();
  if (!raw) throw new Error("CODEPHANTOM_API_URL is not configured.");
  const url = new URL(raw);
  const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
  if (url.protocol !== "https:" && !(url.protocol === "http:" && local)) {
    throw new Error("CODEPHANTOM_API_URL must use HTTPS outside local development.");
  }
  return raw.replace(/\/$/, "");
}

export function siteBase(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
  return raw.replace(/\/$/, "");
}

export async function backendFetch(path: string, init: RequestInit = {}) {
  return fetch(`${apiBase()}/api/v1${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...init.headers,
    },
  });
}

export function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

// Next.js 15: request APIs such as cookies() are asynchronous.
export async function currentAccessToken(): Promise<string | undefined> {
  return (await cookies()).get(ACCESS_COOKIE)?.value;
}

export async function currentRefreshToken(): Promise<string | undefined> {
  return (await cookies()).get(REFRESH_COOKIE)?.value;
}

export async function refreshBackendSession(refreshToken: string) {
  const response = await backendFetch("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  if (!response.ok) return null;
  const body = (await response.json()) as {
    data?: {
      access_token?: string;
      refresh_token?: string;
      expires_in?: number;
    };
  };
  if (!body.data?.access_token || !body.data.refresh_token) return null;
  return {
    accessToken: body.data.access_token,
    refreshToken: body.data.refresh_token,
    expiresIn: Math.max(60, body.data.expires_in ?? 3600),
  };
}
