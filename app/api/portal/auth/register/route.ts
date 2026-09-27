import { NextResponse } from "next/server";
import { backendFetch, siteBase } from "@/lib/portal-server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const input = body as Record<string, unknown>;
  const payload = {
    email: input.email,
    username: input.username,
    password: input.password,
    display_name: input.display_name,
    referral_code: input.referral_code || undefined,
    redirect_to: `${siteBase()}/app?verified=1`,
  };

  try {
    const backend = await backendFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const responseBody = await backend.json().catch(() => ({}));
    if (!backend.ok) {
      const message =
        typeof responseBody?.error?.message === "string"
          ? responseBody.error.message
          : typeof responseBody?.message === "string"
            ? responseBody.message
            : "Registration failed.";
      return NextResponse.json({ error: message }, { status: backend.status });
    }
    return NextResponse.json({
      ok: true,
      message: "Check your email to verify your CodePhantom account.",
    });
  } catch {
    return NextResponse.json({ error: "Registration is temporarily unavailable." }, { status: 503 });
  }
}
