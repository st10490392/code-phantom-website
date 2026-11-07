"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Reveal } from "@/components/ui/reveal";
import { NetworkBackground } from "@/components/network-background";
import { AnimatedLogo } from "@/components/brand/AnimatedLogo";

/**
 * Animated sign-in page.
 *
 * The card enters with a layered, Angular-style entrance: a soft scale
 * lift, a slide-up, and a staggered fade-in of the form fields. The
 * emblem pulses gently behind the form.
 */
export default function SignInPage() {
  const reduced = useReducedMotion();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      setError("Please enter your account ID and password.");
      return;
    }
    setError(null);
    // Sign-in flow is not yet wired to a backend.
  };

  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-24">
        <NetworkBackground className="absolute inset-0 opacity-40" />
        <div className="container-phantom relative">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <Reveal>
                  <AnimatedLogo className="mb-8" size={64} />
                </Reveal>
                <Reveal delay={80}>
                  <p className="text-xs font-mono tracking-[0.3em] text-cyber-blue uppercase mb-4">
                    Sign In
                  </p>
                  <h1 className="font-display text-3xl font-semibold text-ghost-white tracking-tight md:text-4xl">
                    Welcome back to CodePhantom.
                  </h1>
                  <p className="mt-4 text-base leading-relaxed text-muted-text">
                    Sign in with your unique account ID and the password you
                    set. The app shows only the markets and features your
                    licence tier entitles you to.
                  </p>
                </Reveal>
                <Reveal delay={160}>
                  <ul className="mt-8 space-y-3 text-sm text-muted-text">
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyber-blue" />
                      <span>One account, one core licence — upgrades are added, never a second key.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyber-blue" />
                      <span>Account bound to one primary device by default, with a local PIN.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyber-blue" />
                      <span>Lost a device? Support verifies the account holder and issues a one-time replacement key.</span>
                    </li>
                  </ul>
                </Reveal>
              </div>

              <Reveal delay={200}>
                <div className="relative">
                  <div className="absolute inset-0 rounded-3xl bg-phantom-gradient/20 blur-3xl" />
                  <form
                    onSubmit={handleSubmit}
                    className="relative rounded-3xl border border-metallic-silver/10 bg-surface/60 p-8 backdrop-blur"
                  >
                    <div className="mb-6 flex items-center gap-3">
                      <AnimatedLogo size={40} />
                      <div>
                        <p className="font-display text-sm font-semibold text-ghost-white">
                          CodePhantom Account
                        </p>
                        <p className="text-xs text-muted-text">
                          Software licence sign-in
                        </p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label
                          htmlFor="identifier"
                          className="mb-2 block text-xs font-mono tracking-[0.2em] text-cyber-blue uppercase"
                        >
                          Account ID
                        </label>
                        <input
                          id="identifier"
                          type="text"
                          value={identifier}
                          onChange={(e) => setIdentifier(e.target.value)}
                          placeholder="e.g. CP-AB12-9F3D"
                          className="w-full rounded-xl border border-metallic-silver/15 bg-midnight-navy/40 px-4 py-3 text-sm text-ghost-white placeholder:text-muted-text/50 focus:border-phantom-purple/50 focus:outline-none focus:ring-1 focus:ring-phantom-purple/30"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="password"
                          className="mb-2 block text-xs font-mono tracking-[0.2em] text-cyber-blue uppercase"
                        >
                          Password
                        </label>
                        <input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Your password"
                          className="w-full rounded-xl border border-metallic-silver/15 bg-midnight-navy/40 px-4 py-3 text-sm text-ghost-white placeholder:text-muted-text/50 focus:border-phantom-purple/50 focus:outline-none focus:ring-1 focus:ring-phantom-purple/30"
                        />
                      </div>

                      {error && (
                        <p className="text-sm text-red-400">{error}</p>
                      )}

                      <div className="flex items-center justify-between gap-4 pt-2">
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 bg-phantom-gradient text-white shadow-glow hover:shadow-[0_0_56px_rgba(124,58,237,0.4)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-blue/60"
                        >
                          Sign In
                        </button>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-text">
                        <a href="/forgot-password" className="hover:text-cyber-blue">
                          Forgot password?
                        </a>
                        <a href="/licensing" className="hover:text-cyber-blue">
                          View licence tiers
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}