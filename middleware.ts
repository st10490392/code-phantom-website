import { NextResponse, type NextRequest } from "next/server";
import { isSameSiteRequest } from "./lib/portal-origin";

export function middleware(request: NextRequest) {
  const ok = isSameSiteRequest({
    method: request.method,
    origin: request.headers.get("origin"),
    secFetchSite: request.headers.get("sec-fetch-site"),
    requestOrigin: request.nextUrl.origin,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  });
  if (!ok) {
    return NextResponse.json({ error: "Cross-site request refused." }, { status: 403 });
  }
  return NextResponse.next();
}

// Cookie-authenticated portal endpoints only.
export const config = { matcher: "/api/portal/:path*" };
