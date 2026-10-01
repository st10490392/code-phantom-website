import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { webAppUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "CodePhantom App",
  description: "Open the full CodePhantom app for Scanner, Signals and account access across web, desktop and Apple devices.",
  alternates: { canonical: "/app" },
};

export default function AppPage() {
  redirect(webAppUrl);
}
