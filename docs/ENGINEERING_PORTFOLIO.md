# Engineering Portfolio — CodePhantom

This page is the public engineering overview for work that is safe to show to
recruiters and collaborators. Production credentials, broker integrations,
licence secrets, private trading logic and customer data remain in private
repositories.

## CodePhantom Technologies Website

**Public repository:** this repository.

Stack:
- Next.js / TypeScript
- Tailwind CSS
- typed content models
- server-side API route for the Phantom Assistant
- SEO and structured-data work
- responsive deployment workflow

What it demonstrates:
- production web development;
- component and content architecture;
- typed configuration;
- deployment/release discipline;
- separation of content, UI and future infrastructure.

## CodePhantom App

Production repository: private.

Stack:
- Flutter
- Android + PWA/web
- authenticated client flows
- role/permission-aware UI
- scanner/signals/licensing/notification surfaces
- staged release builds and automated tests

The public portfolio intentionally describes the architecture without exposing
private backend URLs, signing material or production configuration.

## CodePhantom Backend

Production repository: private.

Stack:
- Node.js + TypeScript
- Express
- PostgreSQL / Supabase
- Supabase Auth
- permission-based RBAC
- Row Level Security as defense in depth
- service entitlements and licensing
- integration-key authentication for machine clients
- payment/provider abstractions
- audit logging and CI

Current engineering work includes a remote MT5 execution control plane with
SHADOW/DEMO-first safety gating, equity-based drawdown limits, per-symbol/session
trade limits and risk-based position sizing.

## CPT Scanner & Quant Research Framework

Research/production repository: private because it contains strategy IP.

Stack:
- Python
- MetaTrader 5 data acquisition
- deterministic local datasets and integrity manifests
- pytest
- causal M1/tick execution auditing
- chronological development/replication/OOS research
- explicit negative-result preservation

The framework is designed to reject attractive-looking strategies when they fail
fresh replication rather than optimizing around the same historical sample.

Public-safe takeaways:
- 400+ automated research tests;
- versioned research specifications locked before P&L inspection;
- broker/server provenance checks;
- M5 -> M1 -> tick ordering audits;
- fixed-R and trade-management research;
- session, liquidity, S/R, ICT/SMC and cross-market experiments.

## Remote EA Platform

In progress.

Architecture:

```
Flutter/PWA app
      |
CodePhantom API
      |
command + telemetry control plane
      |
Windows/Azure execution agent
      |
MT5 / EA
      |
broker account
```

The mobile app is a controller; MQL/MT5 execution remains on Windows/VPS.
Development begins in SHADOW and DEMO modes before any live-money capability.

Risk controls include:
- percentage risk per trade;
- lot sizing from actual stop distance and MT5 symbol contract values;
- hard max-lot cap;
- daily equity drawdown stop;
- total drawdown stop;
- aggregate open-risk cap;
- concurrent-trade cap;
- trades-per-day;
- trades-per-symbol/session;
- same-symbol cooldown;
- emergency stop.

## Magical Conquest

Public prototype repository: `magical-conquest-`.

Work includes:
- Unreal Engine gameplay prototyping;
- progression/combat systems;
- inventory/equipment;
- loot;
- world/game-system planning;
- automated/headless validation where possible.

## Engineering principles

- Keep secrets and customer data out of source control.
- Prefer reproducible tests over screenshots of one successful run.
- Preserve failed experiments instead of rewriting history.
- Separate client UI from backend authorization.
- Separate payment/licensing from trading execution.
- Use demo/shadow execution while automation is still being validated.
- Document architecture so another engineer can continue the work.

## Core stack

Python · Java · C# · TypeScript · JavaScript · Flutter/Dart · Next.js ·
Node.js/Express · PostgreSQL · Supabase · Git/GitHub · Linux · Windows ·
MetaTrader 5 · Unreal Engine
