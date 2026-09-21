import { NextResponse } from "next/server";
import { getChatProvider } from "@/lib/chatbot/provider";

export const runtime = "nodejs";

const MAX_MESSAGE_LENGTH = 500;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const message =
    body && typeof body === "object" && "message" in body
      ? (body as { message: unknown }).message
      : undefined;

  if (typeof message !== "string" || message.trim().length === 0) {
    return NextResponse.json(
      { error: "A non-empty 'message' string is required." },
      { status: 400 }
    );
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: `Message exceeds ${MAX_MESSAGE_LENGTH} characters.` },
      { status: 400 }
    );
  }

  try {
    const provider = getChatProvider();
    const result = await provider.respond(message);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Phantom Assistant chat error:", error);
    return NextResponse.json(
      { error: "Phantom Assistant is temporarily unavailable. Please try again." },
      { status: 500 }
    );
  }
}
