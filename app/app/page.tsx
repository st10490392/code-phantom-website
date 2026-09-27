import type { Metadata } from "next";
import { getPublicPaymentMethods, getPublicPlans } from "@/lib/platform-api";
import { PortalShell } from "@/components/portal/portal-shell";

export const metadata: Metadata = {
  title: "CodePhantom Portal",
  description: "Sign in to your CodePhantom account, manage services and install the CodePhantom web app.",
  alternates: { canonical: "/app" },
};

export default async function PortalPage() {
  const [plans, paymentMethods] = await Promise.all([
    getPublicPlans(),
    getPublicPaymentMethods(),
  ]);
  return <PortalShell plans={plans} paymentMethods={paymentMethods} />;
}
