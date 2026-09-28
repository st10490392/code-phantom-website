/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
