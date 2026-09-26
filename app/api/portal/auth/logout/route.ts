import { NextResponse } from "next/server";
import { ACCESS_COOKIE, REFRESH_COOKIE, backendFetch, currentAccessToken } from "@/lib/portal-server";

export async function POST() {
  const access = currentAccessToken();
  if (access) {
    await backendFetch("/auth/logout", {
      method: "POST",
      headers: { Authorization: `Bearer ${access}` },
    }).catch(() => undefined);
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ACCESS_COOKIE, "", { path: "/", maxAge: 0 });
  response.cookies.set(REFRESH_COOKIE, "", { path: "/", maxAge: 0 });
  return response;
}
