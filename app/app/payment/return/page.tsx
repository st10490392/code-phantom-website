import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payment status",
  robots: { index: false, follow: false },
};

export default function PaymentReturnPage() {
  return (
    <section className="min-h-[70vh] pt-32 pb-20">
      <div className="container-phantom">
        <div className="mx-auto max-w-xl rounded-2xl border border-metallic-silver/10 bg-midnight-navy/50 p-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-blue">Payment return</p>
          <h1 className="mt-4 font-display text-3xl font-semibold text-ghost-white">We are confirming your payment.</h1>
          <p className="mt-4 leading-relaxed text-muted-text">
            CodePhantom grants access only after the payment provider&apos;s verified webhook reaches our backend.
            Return to the portal and refresh your services in a few seconds.
          </p>
          <Link
            href="/app"
            className="mt-7 inline-flex rounded-full bg-phantom-gradient px-6 py-3 text-sm font-medium text-white"
          >
            Return to CodePhantom
          </Link>
        </div>
      </div>
    </section>
  );
}
