import type { Metadata } from "next";
import { PortalShell } from "@/components/portal/portal-shell";

export const metadata: Metadata = {
  title: "CodePhantom Portal",
  description: "Sign in to your CodePhantom account for Scanner, Signals, EA monitoring and updates across web and mobile.",
  alternates: { canonical: "/app" },
};

export default function PortalPage() {
  return <PortalShell />;
}
