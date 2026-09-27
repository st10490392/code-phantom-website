import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/portal-server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const accessToken = body && typeof body.access_token === "string" ? body.access_token : "";
  const newPassword = body && typeof body.new_password === "string" ? body.new_password : "";
  if (!accessToken || newPassword.length < 8) {
    return NextResponse.json({ error: "Invalid reset request." }, { status: 400 });
  }

  try {
    const backend = await backendFetch("/auth/password-reset/confirm", {
      method: "POST",
      body: JSON.stringify({ access_token: accessToken, new_password: newPassword }),
    });
    const payload = await backend.json().catch(() => ({}));
    if (!backend.ok) {
      return NextResponse.json(
        { error: payload?.error?.message ?? payload?.message ?? "Could not update password." },
        { status: backend.status },
      );
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Password recovery is temporarily unavailable." }, { status: 503 });
  }
}
