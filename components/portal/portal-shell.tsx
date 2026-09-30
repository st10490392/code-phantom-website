"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
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
  scanner_setups?: Array<{
    id: string;
    symbol: string;
    timeframe: string;
    direction: "BUY" | "SELL";
    entry: string | number;
    stop_loss: string | number;
    take_profits: Array<string | number>;
    status: string;
    confluence_score: number;
    confluence_max: number;
    detected_at: string;
  }>;
  signals?: Array<{
    id: string;
    symbol: string;
    timeframe: string;
    direction: "BUY" | "SELL";
    entry: string | number;
    stop_loss: string | number;
    take_profits: Array<string | number>;
    status: string;
    result: "WIN" | "LOSS" | "BREAKEVEN" | "PENDING" | null;
    r_multiple: string | number | null;
    published_at: string | null;
    closed_at: string | null;
    created_at: string;
  }>;
  notifications?: Array<{
    id: string;
    type: string;
    priority: "INFO" | "SUCCESS" | "WARNING" | "CRITICAL";
    title: string;
    body: string | null;
    read_at: string | null;
    created_at: string;
  }>;
  ea_accounts?: Array<{
    id: string;
    account_label?: string;
    broker?: string | null;
    risk_mode?: string;
    risk_percentage?: string | number;
    trading_enabled?: boolean;
    status?: string;
    runtime_status?: {
      balance?: string | number | null;
      equity?: string | number | null;
      daily_pl?: string | number | null;
      drawdown_percentage?: string | number | null;
      open_trades_count?: number | null;
      last_heartbeat_at?: string | null;
    } | null;
  }>;
};

function num(value: string | number | null | undefined): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function money(value: string | number | null | undefined) {
  const parsed = num(value);
  return parsed === null ? "—" : parsed.toFixed(2);
}

function pct(value: string | number | null | undefined) {
  const parsed = num(value);
  return parsed === null ? "—" : `${parsed.toFixed(2)}%`;
}

export function PortalShell() {
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

  const performance = useMemo(() => {
    const resolved = (session?.signals ?? []).filter(
      (signal) => signal.result === "WIN" || signal.result === "LOSS" || signal.result === "BREAKEVEN",
    );
    const wins = resolved.filter((signal) => signal.result === "WIN").length;
    const losses = resolved.filter((signal) => signal.result === "LOSS").length;
    const breakeven = resolved.filter((signal) => signal.result === "BREAKEVEN").length;
    const decided = wins + losses;
    const rValues = resolved.map((signal) => num(signal.r_multiple)).filter((value): value is number => value !== null);
    return {
      total: resolved.length,
      wins,
      losses,
      breakeven,
      winRate: decided === 0 ? null : (wins / decided) * 100,
      averageR: rValues.length === 0 ? null : rValues.reduce((sum, value) => sum + value, 0) / rValues.length,
    };
  }, [session]);

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

  return (
    <section className="min-h-screen pt-28 pb-20">
      <div className="container-phantom">
        <div className="mb-8 flex flex-col gap-5 rounded-2xl border border-metallic-silver/10 bg-midnight-navy/50 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-blue">CodePhantom Portal</p>
            <h1 className="mt-2 font-display text-3xl font-semibold text-ghost-white md:text-4xl">
              One account across Android, iPhone and web.
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-text">
              Scanner setups, published signals, performance, EA monitoring and account access come from the same CodePhantom backend on every device.
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
          <div className="rounded-2xl border border-metallic-silver/10 bg-surface/50 p-8 text-muted-text">
            Loading your CodePhantom account…
          </div>
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
                <a href="/forgot-password" className="block text-center text-sm text-cyber-blue hover:text-electric-blue">
                  Forgot password?
                </a>
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
                      <p className="font-medium text-ghost-white">No client services are enabled on this account yet.</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-text">
                        Service access is controlled by CodePhantom account entitlements. Payments are not part of this release.
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
                  Refresh live data
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-metallic-silver/10 bg-midnight-navy/50 p-7">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-blue">Signals performance</p>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-ghost-white">Verified signal outcomes</h2>
                </div>
                <p className="text-sm text-muted-text">Calculated only from signals whose outcome is recorded by the backend.</p>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  ["Closed", String(performance.total)],
                  ["Wins", String(performance.wins)],
                  ["Losses", String(performance.losses)],
                  ["Win rate", performance.winRate === null ? "—" : `${performance.winRate.toFixed(1)}%`],
                  ["Average R", performance.averageR === null ? "—" : `${performance.averageR.toFixed(2)}R`],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-metallic-silver/10 bg-surface/60 p-4">
                    <p className="text-xs text-muted-text">{label}</p>
                    <p className="mt-2 font-display text-xl font-semibold text-ghost-white">{value}</p>
                  </div>
                ))}
              </div>
              {performance.breakeven > 0 && (
                <p className="mt-4 text-xs text-muted-text">{performance.breakeven} breakeven signal{performance.breakeven === 1 ? "" : "s"} recorded separately.</p>
              )}
            </div>

            <div className="rounded-2xl border border-metallic-silver/10 bg-midnight-navy/50 p-7">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-blue">EA Monitor</p>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-ghost-white">Live EA accounts</h2>
                </div>
                <p className="text-sm text-muted-text">Read-only account and heartbeat data from the CodePhantom backend.</p>
              </div>
              {(session.ea_accounts ?? []).length === 0 ? (
                <div className="mt-6 rounded-xl border border-metallic-silver/10 bg-phantom-black/40 p-5 text-sm text-muted-text">
                  No EA account is connected to this account yet. This is a real empty state, not demo data.
                </div>
              ) : (
                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {(session.ea_accounts ?? []).map((account) => {
                    const heartbeat = account.runtime_status?.last_heartbeat_at;
                    const online = heartbeat
                      ? Date.now() - new Date(heartbeat).getTime() < 5 * 60 * 1000
                      : false;
                    return (
                      <article key={account.id} className="rounded-xl border border-metallic-silver/10 bg-surface/60 p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-display text-lg font-semibold text-ghost-white">{account.account_label ?? account.id}</h3>
                            <p className="mt-1 text-xs text-muted-text">{account.broker ?? "Broker not reported"}</p>
                          </div>
                          <span className="rounded-full border border-metallic-silver/15 px-3 py-1 text-xs text-metallic-silver">
                            {online ? "ONLINE" : heartbeat ? "OFFLINE" : "WAITING"}
                          </span>
                        </div>
                        <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
                          <div><dt className="text-muted-text">Balance</dt><dd className="mt-1 text-ghost-white">{money(account.runtime_status?.balance)}</dd></div>
                          <div><dt className="text-muted-text">Equity</dt><dd className="mt-1 text-ghost-white">{money(account.runtime_status?.equity)}</dd></div>
                          <div><dt className="text-muted-text">Daily P/L</dt><dd className="mt-1 text-ghost-white">{money(account.runtime_status?.daily_pl)}</dd></div>
                          <div><dt className="text-muted-text">Drawdown</dt><dd className="mt-1 text-ghost-white">{pct(account.runtime_status?.drawdown_percentage)}</dd></div>
                          <div><dt className="text-muted-text">Open trades</dt><dd className="mt-1 text-ghost-white">{account.runtime_status?.open_trades_count ?? 0}</dd></div>
                          <div><dt className="text-muted-text">Risk</dt><dd className="mt-1 text-ghost-white">{pct(account.risk_percentage)}</dd></div>
                        </dl>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-metallic-silver/10 bg-midnight-navy/50 p-7">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-blue">Scanner</p>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-ghost-white">Live setups</h2>
                </div>
                <p className="text-sm text-muted-text">The backend applies the account&apos;s market visibility and review rules.</p>
              </div>
              {(session.scanner_setups ?? []).length === 0 ? (
                <div className="mt-6 rounded-xl border border-metallic-silver/10 bg-phantom-black/40 p-5 text-sm text-muted-text">
                  No scanner setup is currently available for this account.
                </div>
              ) : (
                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {(session.scanner_setups ?? []).map((setup) => (
                    <article key={setup.id} className="rounded-xl border border-metallic-silver/10 bg-surface/60 p-5">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-display text-lg font-semibold text-ghost-white">{setup.symbol} {setup.direction}</h3>
                        <span className="rounded-full border border-metallic-silver/15 px-2.5 py-1 text-xs text-metallic-silver">{setup.timeframe}</span>
                      </div>
                      <p className="mt-2 text-xs text-muted-text">{setup.status}</p>
                      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                        <div><dt className="text-muted-text">Entry</dt><dd className="mt-1 text-ghost-white">{String(setup.entry)}</dd></div>
                        <div><dt className="text-muted-text">Stop loss</dt><dd className="mt-1 text-ghost-white">{String(setup.stop_loss)}</dd></div>
                      </dl>
                      {setup.take_profits?.length > 0 && <p className="mt-4 text-sm text-muted-text">TP: <span className="text-metallic-silver">{setup.take_profits.map(String).join(" · ")}</span></p>}
                      {setup.confluence_max > 0 && <p className="mt-3 text-xs text-muted-text">Confluence {setup.confluence_score}/{setup.confluence_max}</p>}
                      <p className="mt-3 text-xs text-muted-text">{new Date(setup.detected_at).toLocaleString()}</p>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-metallic-silver/10 bg-midnight-navy/50 p-7">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-blue">Signals</p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-ghost-white">Published signals</h2>
              </div>
              {(session.signals ?? []).length === 0 ? (
                <div className="mt-6 rounded-xl border border-metallic-silver/10 bg-phantom-black/40 p-5 text-sm text-muted-text">
                  No published signals yet.
                </div>
              ) : (
                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {(session.signals ?? []).map((signal) => (
                    <article key={signal.id} className="rounded-xl border border-metallic-silver/10 bg-surface/60 p-5">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-display text-lg font-semibold text-ghost-white">{signal.symbol} {signal.direction}</h3>
                        <span className="rounded-full border border-cyber-blue/25 bg-cyber-blue/5 px-2.5 py-1 text-xs text-metallic-silver">
                          {signal.status.replaceAll("_", " ")}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-muted-text">{signal.timeframe}</p>
                      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                        <div><dt className="text-muted-text">Entry</dt><dd className="mt-1 text-ghost-white">{String(signal.entry)}</dd></div>
                        <div><dt className="text-muted-text">Stop loss</dt><dd className="mt-1 text-ghost-white">{String(signal.stop_loss)}</dd></div>
                      </dl>
                      {signal.take_profits?.length > 0 && <p className="mt-4 text-sm text-muted-text">TP: <span className="text-metallic-silver">{signal.take_profits.map(String).join(" · ")}</span></p>}
                      {signal.result && signal.result !== "PENDING" && (
                        <p className="mt-4 text-sm text-metallic-silver">
                          Result: {signal.result}{num(signal.r_multiple) !== null ? ` · ${num(signal.r_multiple)!.toFixed(2)}R` : ""}
                        </p>
                      )}
                      <p className="mt-3 text-xs text-muted-text">{new Date(signal.published_at ?? signal.created_at).toLocaleString()}</p>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-metallic-silver/10 bg-midnight-navy/50 p-7">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-blue">Updates</p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-ghost-white">Notifications</h2>
              </div>
              {(session.notifications ?? []).length === 0 ? (
                <p className="mt-5 text-sm text-muted-text">No notifications yet.</p>
              ) : (
                <div className="mt-5 space-y-3">
                  {(session.notifications ?? []).map((notification) => (
                    <article
                      key={notification.id}
                      className={`rounded-xl border p-4 ${notification.read_at ? "border-metallic-silver/10 bg-surface/40" : "border-cyber-blue/25 bg-cyber-blue/5"}`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="font-medium text-ghost-white">{notification.title}</h3>
                        <span className="text-xs text-muted-text">{new Date(notification.created_at).toLocaleString()}</span>
                      </div>
                      {notification.body && <p className="mt-2 text-sm leading-relaxed text-muted-text">{notification.body}</p>}
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
