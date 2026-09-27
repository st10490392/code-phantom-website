"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/portal/auth/password-reset/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const body = await response.json().catch(() => ({}));
      setMessage(body.error ?? body.message ?? "If that account exists, a password reset email has been sent.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="relative min-h-[75vh] overflow-hidden pt-40 pb-24">
      <div className="absolute inset-0 bg-phantom-radial" />
      <div className="grid-overlay absolute inset-0 opacity-40" />
      <div className="container-phantom relative">
        <div className="mx-auto max-w-lg rounded-2xl border border-metallic-silver/10 bg-surface/80 p-8 shadow-glow backdrop-blur md:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyber-blue">Account recovery</p>
          <h1 className="mt-4 font-display text-3xl font-semibold text-ghost-white">Reset your password</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-text">
            Enter the email on your CodePhantom account. If it exists, we will send a secure recovery link.
          </p>
          <form onSubmit={submit} className="mt-8 space-y-5">
            <label className="block">
              <span className="text-sm text-ghost-white">Email</span>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-xl border border-metallic-silver/15 bg-phantom-black/70 px-4 py-3 text-ghost-white outline-none focus:border-cyber-blue"
              />
            </label>
            {message && <p className="text-sm text-muted-text">{message}</p>}
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-xl bg-phantom-gradient px-5 py-3 font-display font-semibold text-white transition-opacity disabled:opacity-60"
            >
              {busy ? "Sending…" : "Send reset email"}
            </button>
          </form>
          <Link href="/app" className="mt-6 inline-block text-sm text-cyber-blue hover:text-electric-blue">
            Back to sign in
          </Link>
        </div>
      </div>
    </section>
  );
}
