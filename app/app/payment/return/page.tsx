import { Suspense } from "react";
import type { Metadata } from "next";
import { PaymentReturnClient } from "@/components/portal/payment-return-client";

export const metadata: Metadata = {
  title: "Payment status",
  robots: { index: false, follow: false },
};

export default function PaymentReturnPage() {
  return (
    <Suspense
      fallback={
        <section className="min-h-[70vh] pt-32 pb-20">
          <div className="container-phantom">
            <div className="mx-auto max-w-xl rounded-2xl border border-metallic-silver/10 bg-midnight-navy/50 p-8 text-muted-text">
              Confirming payment…
            </div>
          </div>
        </section>
      }
    >
      <PaymentReturnClient />
    </Suspense>
  );
}
