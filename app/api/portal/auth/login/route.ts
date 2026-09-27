import { NextResponse } from "next/server";
import { ACCESS_COOKIE, REFRESH_COOKIE, backendFetch, cookieOptions } from "@/lib/portal-server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const input = body as { identifier?: unknown; email?: unknown; password?: unknown };
  const identifier =
    typeof input.identifier === "string"
      ? input.identifier.trim()
      : typeof input.email === "string"
        ? input.email.trim()
        : "";
  if (!identifier || typeof input.password !== "string" || !input.password) {
    return NextResponse.json({ error: "Email/username and password are required." }, { status: 400 });
  }

  try {
    const backend = await backendFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ identifier, password: input.password }),
    });
    const payload = await backend.json().catch(() => ({}));
    if (!backend.ok) {
      const message =
        typeof payload?.error?.message === "string"
          ? payload.error.message
          : typeof payload?.message === "string"
            ? payload.message
            : "Sign in failed.";
      return NextResponse.json({ error: message }, { status: backend.status });
    }

    const session = payload.data;
    if (!session?.access_token || !session?.refresh_token) {
      return NextResponse.json({ error: "Authentication service returned an invalid session." }, { status: 502 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(ACCESS_COOKIE, session.access_token, cookieOptions(Math.max(60, session.expires_in ?? 3600)));
    response.cookies.set(REFRESH_COOKIE, session.refresh_token, cookieOptions(60 * 60 * 24 * 30));
    return response;
  } catch {
    return NextResponse.json({ error: "CodePhantom authentication is temporarily unavailable." }, { status: 503 });
  }
}
