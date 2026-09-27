"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type ConfirmState = "checking" | "success" | "pending" | "error";

export default function PaymentReturnPage() {
  const params = useSearchParams();
  const [state, setState] = useState<ConfirmState>("checking");
  const [message, setMessage] = useState("We are securely confirming your payment.");

  useEffect(() => {
    let cancelled = false;

    async function confirm() {
      const provider = params.get("provider");
      const paypalOrder = params.get("token");
      const binanceReference = params.get("binance_ref");

      try {
        if (provider === "paypal" && paypalOrder) {
          const response = await fetch("/api/portal/paypal/capture", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ order_id: paypalOrder }),
          });
          const body = await response.json().catch(() => ({}));
          if (!response.ok) throw new Error(body.error ?? "PayPal confirmation failed.");
          if (!cancelled) {
            setState("success");
            setMessage("Payment confirmed. Your CodePhantom access has been updated.");
          }
          return;
        }

        if (binanceReference) {
          const response = await fetch("/api/portal/binance-pay/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reference: binanceReference }),
          });
          const body = await response.json().catch(() => ({}));
          if (!response.ok) throw new Error(body.error ?? "Binance Pay confirmation failed.");
          if (!cancelled) {
            if (body.data?.paid === true) {
              setState("success");
              setMessage("Binance Pay payment confirmed. Your CodePhantom access has been updated.");
            } else {
              setState("pending");
              setMessage("Binance Pay has not marked the order as paid yet. Return to the portal and refresh shortly.");
            }
          }
          return;
        }

        // Paystack and Skrill finalize through signed server-to-server
        // callbacks. The browser redirect itself never grants access.
        if (!cancelled) {
          setState("pending");
          setMessage("Your payment provider is finalizing the transaction. Access will appear after the verified payment callback is processed.");
        }
      } catch (error) {
        if (!cancelled) {
          setState("error");
          setMessage(error instanceof Error ? error.message : "We could not confirm the payment yet.");
        }
      }
    }

    void confirm();
    return () => {
      cancelled = true;
    };
  }, [params]);

  return (
    <section className="min-h-[70vh] pt-32 pb-20">
      <div className="container-phantom">
        <div className="mx-auto max-w-xl rounded-2xl border border-metallic-silver/10 bg-midnight-navy/50 p-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-blue">Payment status</p>
          <h1 className="mt-4 font-display text-3xl font-semibold text-ghost-white">
            {state === "checking"
              ? "Confirming payment…"
              : state === "success"
                ? "Payment confirmed"
                : state === "pending"
                  ? "Confirmation pending"
                  : "Payment needs attention"}
          </h1>
          <p className="mt-4 leading-relaxed text-muted-text">{message}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-text">
            CodePhantom never unlocks a paid service from a browser redirect alone. The backend verifies the provider before granting access.
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
