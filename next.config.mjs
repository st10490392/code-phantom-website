/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        { key: "Content-Security-Policy", value: [
          "default-src 'self'",
          "base-uri 'self'",
          "object-src 'none'",
          "frame-ancestors 'none'",
          "form-action 'self'",
          "img-src 'self' data: blob:",
          "font-src 'self' data:",
          "style-src 'self' 'unsafe-inline'",
          "script-src 'self' 'unsafe-inline'",
          "connect-src 'self'",
          "upgrade-insecure-requests",
        ].join("; ") },
      ],
    }];
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    // Security: Next.js 14 is affected by published Image Optimization API
    // advisories (including remote code execution when AVIF is served, and
    // several denial-of-service issues) that are only fixed in 15.5.24+.
    // The site's images are small local brand assets, so serving them as-is
    // removes that endpoint entirely until the framework upgrade lands
    // (code-phantom-App docs/SECURITY_AUDIT.md, finding WEB-1).
    unoptimized: true,
  },
};

export default nextConfig;
