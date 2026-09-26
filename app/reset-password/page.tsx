"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

type State = "checking" | "ready" | "saving" | "success" | "invalid";

function recoveryAccessToken(): string {
  if (typeof window === "undefined") return "";
  const fragment = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const query = new URLSearchParams(window.location.search);
  return fragment.get("access_token") ?? query.get("access_token") ?? "";
}

export default function ResetPasswordPage() {
  const [state, setState] = useState<State>("checking");
  const [accessToken, setAccessToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = recoveryAccessToken();
    if (!token) {
      setMessage("This password reset link is invalid or has expired. Request a new reset email and try again.");
      setState("invalid");
      return;
    }
    setAccessToken(token);
    // Remove the recovery token from the visible URL/history immediately.
    window.history.replaceState({}, "", "/reset-password");
    setState("ready");
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (password.length < 8) {
      setMessage("Use at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setMessage("The passwords do not match.");
      return;
    }
    if (!accessToken) {
      setMessage("This password reset link is invalid or has expired.");
      setState("invalid");
      return;
    }

    setState("saving");
    setMessage("");
    try {
      const response = await fetch("/api/portal/auth/password-reset/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: accessToken, new_password: password }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload?.error ?? "Could not update password.");
      setAccessToken("");
      setState("success");
      setMessage("Password updated. You can now sign in again.");
    } catch (error) {
      setState("ready");
      setMessage(error instanceof Error ? error.message : "Could not update password.");
    }
  }

  return (
    <section className="relative min-h-[75vh] overflow-hidden pt-40 pb-24">
      <div className="absolute inset-0 bg-phantom-radial" />
      <div className="grid-overlay absolute inset-0 opacity-40" />
      <div className="container-phantom relative">
        <div className="mx-auto max-w-lg rounded-2xl border border-metallic-silver/10 bg-surface/80 p-8 shadow-glow backdrop-blur md:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyber-blue">Account recovery</p>
          <h1 className="mt-4 font-display text-3xl font-semibold text-ghost-white">Choose a new password</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-text">
            Recovery links are short-lived and can only be used for the account that requested them.
          </p>

          {state === "checking" && <p className="mt-8 text-sm text-muted-text">Validating recovery link…</p>}

          {state === "invalid" && (
            <div className="mt-8 rounded-xl border border-metallic-silver/10 bg-phantom-black/50 p-4 text-sm text-muted-text">
              {message}
            </div>
          )}

          {state === "success" ? (
            <div className="mt-8">
              <div className="rounded-xl border border-cyber-blue/30 bg-cyber-blue/10 p-4 text-sm text-ghost-white">{message}</div>
              <Link href="/app" className="mt-6 inline-flex rounded-full bg-phantom-gradient px-6 py-3 text-sm font-medium text-white">
                Sign in
              </Link>
            </div>
          ) : state === "ready" || state === "saving" ? (
            <form onSubmit={submit} className="mt-8 space-y-5">
              <label className="block">
                <span className="text-sm text-ghost-white">New password</span>
                <input type="password" autoComplete="new-password" minLength={8} maxLength={128} value={password} onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-metallic-silver/15 bg-phantom-black/70 px-4 py-3 text-ghost-white outline-none focus:border-cyber-blue" />
              </label>
              <label className="block">
                <span className="text-sm text-ghost-white">Confirm password</span>
                <input type="password" autoComplete="new-password" minLength={8} maxLength={128} value={confirm} onChange={(e) => setConfirm(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-metallic-silver/15 bg-phantom-black/70 px-4 py-3 text-ghost-white outline-none focus:border-cyber-blue" />
              </label>
              {message && <p className="text-sm text-muted-text">{message}</p>}
              <button type="submit" disabled={state === "saving"}
                className="w-full rounded-xl bg-phantom-gradient px-5 py-3 font-display font-semibold text-white transition-opacity disabled:opacity-60">
                {state === "saving" ? "Updating password…" : "Update password"}
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </section>
  );
}
