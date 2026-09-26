"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import type { PublicPlan } from "@/lib/platform-api";
import { PwaInstallButton } from "@/components/pwa-install";

type SessionPayload = {
  authenticated: boolean;
  me?: {
    profile?: {
      email?: string;
      username?: string;
      display_name?: string | null;
      onboarding_state?: string;
    };
    roles?: string[];
    permissions?: string[];
  } | null;
  access?: {
    entitlements?: string[];
    scanner_markets?: Array<{
      code: string;
      name: string;
      release_channel: string;
      can_view: boolean;
      can_receive_notifications: boolean;
    }>;
    licence?: {
      status?: string;
      plan_code?: string;
      expires_at?: string | null;
    } | null;
    features?: string[];
  } | null;
  purchases?: Array<{
    id: string;
    plan_code: string;
    provider: string;
    provider_reference: string;
    status: string;
    amount_minor: string | number | null;
    currency: string | null;
    created_at: string;
    paid_at: string | null;
  }>;
};

function price(plan: PublicPlan) {
  if (plan.priceAmountMinor === null || !plan.priceCurrency) return "Price not published";
  try {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: plan.priceCurrency,
    }).format(plan.priceAmountMinor / 100);
  } catch {
    return `${plan.priceCurrency} ${(plan.priceAmountMinor / 100).toFixed(2)}`;
  }
}

function billingLabel(plan: PublicPlan) {
  if (plan.billingType === "LIFETIME") return "Lifetime";
  if (plan.billingInterval === "MONTH") return "per month";
  if (plan.billingInterval === "QUARTER") return "per quarter";
  if (plan.billingInterval === "YEAR") return "per year";
  return plan.billingType.replaceAll("_", " ").toLowerCase();
}

export function PortalShell({ plans }: { plans: PublicPlan[] }) {
  const [session, setSession] = useState<SessionPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [message, setMessage] = useState<string>("");
  const [busy, setBusy] = useState(false);

  const refreshSession = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/portal/session", { cache: "no-store" });
      const body = (await response.json().catch(() => ({}))) as SessionPayload;
      setSession(response.ok ? body : { authenticated: false });
    } catch {
      setSession({ authenticated: false });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (window.location.search.includes("verified=1")) {
      setMessage("Email confirmed. Sign in to continue.");
      window.history.replaceState({}, "", "/app");
    }
    void refreshSession();
  }, [refreshSession]);

  const entitlements = useMemo(() => session?.access?.entitlements ?? [], [session]);
  const visibleMarkets = useMemo(
    () => (session?.access?.scanner_markets ?? []).filter((market) => market.can_view),
    [session],
  );

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/portal/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: String(form.get("identifier") ?? ""),
          password: String(form.get("password") ?? ""),
        }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        setMessage(body.error ?? "Sign in failed.");
        return;
      }
      await refreshSession();
    } finally {
      setBusy(false);
    }
  }

  async function register(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm_password") ?? "");
    if (password !== confirm) {
      setMessage("Passwords do not match.");
      setBusy(false);
      return;
    }
    try {
      const response = await fetch("/api/portal/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          display_name: String(form.get("display_name") ?? ""),
          username: String(form.get("username") ?? ""),
          email: String(form.get("email") ?? ""),
          password,
          referral_code: String(form.get("referral_code") ?? "").trim() || undefined,
        }),
      });
      const body = await response.json().catch(() => ({}));
      setMessage(body.error ?? body.message ?? (response.ok ? "Check your email to verify your account." : "Registration failed."));
      if (response.ok) setMode("login");
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    setBusy(true);
    await fetch("/api/portal/auth/logout", { method: "POST" }).catch(() => undefined);
    setSession({ authenticated: false });
    setBusy(false);
  }

  async function checkout(planCode: string) {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/portal/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan_code: planCode }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok || typeof body.authorization_url !== "string") {
        setMessage(body.error ?? "Checkout is not available yet.");
        return;
      }
      window.location.assign(body.authorization_url);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="min-h-screen pt-28 pb-20">
      <div className="container-phantom">
        <div className="mb-8 flex flex-col gap-5 rounded-2xl border border-metallic-silver/10 bg-midnight-navy/50 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-blue">CodePhantom Portal</p>
            <h1 className="mt-2 font-display text-3xl font-semibold text-ghost-white md:text-4xl">
              One account. Every CodePhantom service.
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-text">
              Use the same account on the Android app and this installable web app. Purchases and service access are controlled by the CodePhantom backend.
            </p>
          </div>
          <PwaInstallButton />
        </div>

        {message && (
          <div className="mb-6 rounded-xl border border-cyber-blue/25 bg-cyber-blue/5 px-5 py-4 text-sm text-metallic-silver">
            {message}
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl border border-metallic-silver/10 bg-surface/50 p-8 text-muted-text">Loading your CodePhantom account…</div>
        ) : !session?.authenticated ? (
          <div className="mx-auto max-w-xl rounded-2xl border border-metallic-silver/10 bg-midnight-navy/50 p-7 md:p-9">
            <div className="mb-7 flex rounded-full border border-metallic-silver/10 bg-phantom-black/50 p-1">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`flex-1 rounded-full px-4 py-2.5 text-sm ${mode === "login" ? "bg-surface-raised text-ghost-white" : "text-muted-text"}`}
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => setMode("register")}
                className={`flex-1 rounded-full px-4 py-2.5 text-sm ${mode === "register" ? "bg-surface-raised text-ghost-white" : "text-muted-text"}`}
              >
                Create account
              </button>
            </div>

            {mode === "login" ? (
              <form onSubmit={login} className="space-y-4">
                <label className="block text-sm text-metallic-silver">
                  Email or username
                  <input name="identifier" required autoComplete="username" className="mt-2 w-full rounded-xl border border-metallic-silver/15 bg-phantom-black/70 px-4 py-3 text-ghost-white" />
                </label>
                <label className="block text-sm text-metallic-silver">
                  Password
                  <input name="password" type="password" required autoComplete="current-password" className="mt-2 w-full rounded-xl border border-metallic-silver/15 bg-phantom-black/70 px-4 py-3 text-ghost-white" />
                </label>
                <button disabled={busy} className="w-full rounded-full bg-phantom-gradient px-6 py-3 text-sm font-medium text-white disabled:opacity-50">
                  {busy ? "Signing in…" : "Sign in"}
                </button>
              </form>
            ) : (
              <form onSubmit={register} className="space-y-4">
                <label className="block text-sm text-metallic-silver">
                  Display name
                  <input name="display_name" required autoComplete="name" className="mt-2 w-full rounded-xl border border-metallic-silver/15 bg-phantom-black/70 px-4 py-3 text-ghost-white" />
                </label>
                <label className="block text-sm text-metallic-silver">
                  Username
                  <input name="username" required minLength={3} maxLength={30} autoComplete="username" className="mt-2 w-full rounded-xl border border-metallic-silver/15 bg-phantom-black/70 px-4 py-3 text-ghost-white" />
                </label>
                <label className="block text-sm text-metallic-silver">
                  Email
                  <input name="email" type="email" required autoComplete="email" className="mt-2 w-full rounded-xl border border-metallic-silver/15 bg-phantom-black/70 px-4 py-3 text-ghost-white" />
                </label>
                <label className="block text-sm text-metallic-silver">
                  Password
                  <input name="password" type="password" required minLength={12} maxLength={128} autoComplete="new-password" className="mt-2 w-full rounded-xl border border-metallic-silver/15 bg-phantom-black/70 px-4 py-3 text-ghost-white" />
                </label>
                <label className="block text-sm text-metallic-silver">
                  Confirm password
                  <input name="confirm_password" type="password" required minLength={12} maxLength={128} autoComplete="new-password" className="mt-2 w-full rounded-xl border border-metallic-silver/15 bg-phantom-black/70 px-4 py-3 text-ghost-white" />
                </label>
                <label className="block text-sm text-metallic-silver">
                  Referral code <span className="text-muted-text">(optional)</span>
                  <input name="referral_code" maxLength={16} className="mt-2 w-full rounded-xl border border-metallic-silver/15 bg-phantom-black/70 px-4 py-3 uppercase text-ghost-white" />
                </label>
                <button disabled={busy} className="w-full rounded-full bg-phantom-gradient px-6 py-3 text-sm font-medium text-white disabled:opacity-50">
                  {busy ? "Creating account…" : "Create account"}
                </button>
              </form>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-2xl border border-metallic-silver/10 bg-midnight-navy/50 p-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-text">Signed in as</p>
                    <h2 className="mt-1 font-display text-2xl font-semibold text-ghost-white">
                      {session.me?.profile?.display_name || session.me?.profile?.username || session.me?.profile?.email || "CodePhantom client"}
                    </h2>
                    <p className="mt-1 text-sm text-muted-text">{session.me?.profile?.email}</p>
                  </div>
                  <button type="button" disabled={busy} onClick={logout} className="rounded-full border border-metallic-silver/20 px-4 py-2 text-sm text-metallic-silver hover:text-ghost-white">
                    Sign out
                  </button>
                </div>

                <div className="mt-7">
                  <h3 className="font-display text-lg font-semibold text-ghost-white">My services</h3>
                  {entitlements.length === 0 ? (
                    <div className="mt-3 rounded-xl border border-metallic-silver/10 bg-phantom-black/40 p-5">
                      <p className="font-medium text-ghost-white">No services are enabled on your account yet.</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-text">
                        When you purchase or receive access to a CodePhantom service, it will appear here and in the Android app automatically.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {entitlements.map((item) => (
                        <span key={item} className="rounded-full border border-phantom-purple/30 bg-phantom-purple/10 px-3 py-1.5 text-xs text-metallic-silver">
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {visibleMarkets.length > 0 && (
                  <div className="mt-7">
                    <h3 className="font-display text-lg font-semibold text-ghost-white">Scanner markets</h3>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {visibleMarkets.map((market) => (
                        <div key={market.code} className="rounded-xl border border-metallic-silver/10 bg-surface/60 p-4">
                          <p className="font-medium text-ghost-white">{market.name}</p>
                          <p className="mt-1 text-xs text-muted-text">{market.release_channel}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-metallic-silver/10 bg-midnight-navy/50 p-7">
                <h3 className="font-display text-lg font-semibold text-ghost-white">Account</h3>
                <dl className="mt-5 space-y-4 text-sm">
                  <div>
                    <dt className="text-muted-text">Username</dt>
                    <dd className="mt-1 text-ghost-white">{session.me?.profile?.username ?? "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-text">Role</dt>
                    <dd className="mt-1 text-ghost-white">{session.me?.roles?.join(", ") || "CLIENT"}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-text">Licence</dt>
                    <dd className="mt-1 text-ghost-white">{session.access?.licence?.status ?? "Not activated"}</dd>
                  </div>
                </dl>
                <button type="button" onClick={() => void refreshSession()} className="mt-6 rounded-full border border-cyber-blue/30 px-4 py-2 text-sm text-ghost-white hover:bg-cyber-blue/10">
                  Refresh access
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-metallic-silver/10 bg-midnight-navy/50 p-7">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-blue">Store</p>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-ghost-white">CodePhantom services</h2>
                </div>
                <p className="max-w-xl text-sm text-muted-text">Only plans enabled and published by the CodePhantom backend appear here.</p>
              </div>

              {plans.length === 0 ? (
                <div className="mt-6 rounded-xl border border-metallic-silver/10 bg-phantom-black/40 p-5 text-sm text-muted-text">
                  No services are on sale yet. The store will populate automatically when plans are published.
                </div>
              ) : (
                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {plans.map((plan) => (
                    <article key={plan.code} className="rounded-xl border border-metallic-silver/10 bg-surface/60 p-5">
                      <h3 className="font-display text-lg font-semibold text-ghost-white">{plan.name}</h3>
                      <p className="mt-4 text-2xl font-semibold text-ghost-white">{price(plan)}</p>
                      <p className="mt-1 text-xs text-muted-text">{billingLabel(plan)}</p>
                      {plan.trialEligible && plan.trialDays ? (
                        <p className="mt-3 text-xs text-cyber-blue">{plan.trialDays}-day trial available</p>
                      ) : null}
                      <button
                        type="button"
                        disabled={busy || plan.priceAmountMinor === null}
                        onClick={() => void checkout(plan.code)}
                        className="mt-5 w-full rounded-full bg-phantom-gradient px-5 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Purchase
                      </button>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-metallic-silver/10 bg-midnight-navy/50 p-7">
              <h2 className="font-display text-xl font-semibold text-ghost-white">Purchase history</h2>
              {(session.purchases ?? []).length === 0 ? (
                <p className="mt-3 text-sm text-muted-text">No purchases yet.</p>
              ) : (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[620px] text-left text-sm">
                    <thead className="text-muted-text">
                      <tr>
                        <th className="pb-3 pr-5 font-medium">Plan</th>
                        <th className="pb-3 pr-5 font-medium">Status</th>
                        <th className="pb-3 pr-5 font-medium">Provider</th>
                        <th className="pb-3 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(session.purchases ?? []).map((purchase) => (
                        <tr key={purchase.id} className="border-t border-metallic-silver/10">
                          <td className="py-3 pr-5 text-ghost-white">{purchase.plan_code}</td>
                          <td className="py-3 pr-5 text-metallic-silver">{purchase.status}</td>
                          <td className="py-3 pr-5 text-metallic-silver">{purchase.provider}</td>
                          <td className="py-3 text-muted-text">{new Date(purchase.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
