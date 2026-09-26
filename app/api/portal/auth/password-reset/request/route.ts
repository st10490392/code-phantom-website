import { NextResponse } from "next/server";
import { backendFetch, siteBase } from "@/lib/portal-server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = body && typeof body.email === "string" ? body.email.trim() : "";
  if (!email) return NextResponse.json({ error: "Email is required." }, { status: 400 });

  try {
    const backend = await backendFetch("/auth/password-reset/request", {
      method: "POST",
      body: JSON.stringify({
        email,
        redirect_to: `${siteBase()}/reset-password`,
      }),
    });
    // Keep the backend's anti-enumeration behavior: callers always receive
    // the same outward message for a syntactically valid request.
    if (!backend.ok && backend.status !== 202) {
      return NextResponse.json({ error: "Password recovery is temporarily unavailable." }, { status: 503 });
    }
    return NextResponse.json({
      ok: true,
      message: "If that account exists, a password reset email has been sent.",
    });
  } catch {
    return NextResponse.json({ error: "Password recovery is temporarily unavailable." }, { status: 503 });
  }
}
