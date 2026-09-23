import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { PageHero, StatusPill } from "@/components/page-hero";
import { getApiHealth } from "@/lib/platform-api";
import { androidRelease } from "@/lib/releases";

export const metadata: Metadata = {
  title: "Status",
  description: "Current operating status of CodePhantom services.",
  alternates: { canonical: "/status" },
};

// Re-checked at most once a minute.
export const revalidate = 60;

export default async function StatusPage() {
  const api = await getApiHealth();
  const release = androidRelease();

  const rows: { name: string; state: string; detail: string }[] = [
    { name: "Website", state: "Operational", detail: "You are viewing it." },
    {
      name: "Platform API",
      state: !api.configured ? "Not in public operation" : api.reachable ? "Responding" : "Not responding",
      detail: api.configured
        ? `Single health check at ${api.checkedAt.replace("T", " ").slice(0, 16)} UTC.`
        : "The account platform has not launched publicly yet.",
    },
    {
      name: "CodePhantom App",
      state: release ? `Released (${release.channel})` : "No public release",
      detail: release ? `Version ${release.version}.` : "In development.",
    },
    { name: "CPT Scanner", state: "Private development", detail: "Not publicly available." },
    { name: "Code Phantom EA", state: "Research / Development", detail: "Not offered to clients." },
  ];

  return (
    <>
      <PageHero
        eyebrow="Status"
        title="Service status"
        description="Live checks only. CodePhantom does not publish uptime percentages or history yet, and no service level is offered."
      />
      <Section className="border-t border-metallic-silver/10">
        <div className="max-w-3xl overflow-hidden rounded-2xl border border-metallic-silver/10">
          {rows.map((r, i) => (
            <div
              key={r.name}
              className={`flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between ${i > 0 ? "border-t border-metallic-silver/10" : ""}`}
            >
              <div>
                <p className="font-display text-lg text-ghost-white">{r.name}</p>
                <p className="mt-1 text-sm text-muted-text">{r.detail}</p>
              </div>
              <StatusPill>{r.state}</StatusPill>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
