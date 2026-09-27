import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <section className="min-h-[70vh] pt-32 pb-20">
      <div className="container-phantom">
        <div className="mx-auto max-w-xl rounded-2xl border border-metallic-silver/10 bg-midnight-navy/50 p-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-blue">Checkout</p>
          <h1 className="mt-4 font-display text-3xl font-semibold text-ghost-white">Payment cancelled</h1>
          <p className="mt-4 leading-relaxed text-muted-text">
            No CodePhantom service was unlocked. You can return to the store and choose the same or a different payment method.
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
