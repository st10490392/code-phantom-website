import { NextResponse } from "next/server";
import { getChatProvider } from "@/lib/chatbot/provider";
import { boundedJson, createLimiter } from "@/lib/chatbot/request-guards";

export const runtime = "nodejs";
const allow = createLimiter();
const headers = { "Cache-Control": "no-store" };

export async function POST(request: Request) {
  if (!allow()) return NextResponse.json({ error: "Please try again shortly." }, { status: 429, headers: { ...headers, "Retry-After": "60" } });
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: "Invalid origin." }, { status: 403, headers });
  let body: unknown;
  try { body = await boundedJson(request); }
  catch { return NextResponse.json({ error: "A small JSON request body is required." }, { status: 400, headers }); }
  if (!body || typeof body !== "object" || Array.isArray(body) || Object.keys(body).some(k => k !== "message")) {
    return NextResponse.json({ error: "Only a message is accepted." }, { status: 400, headers });
  }
  const message = (body as { message?: unknown }).message;
  if (typeof message !== "string" || !message.trim() || message.length > 500) {
    return NextResponse.json({ error: "Message must contain 1 to 500 characters." }, { status: 400, headers });
  }
  try { return NextResponse.json(await getChatProvider().respond(message), { headers }); }
  catch { return NextResponse.json({ error: "Phantom Assistant is temporarily unavailable. Use /contact." }, { status: 500, headers }); }
}
