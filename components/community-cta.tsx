import { community } from "@/lib/site-config";
import { WhatsAppIcon, ArrowRightIcon } from "@/components/icons";

/**
 * "Join CodePhantom Traders" - the existing WhatsApp group (formerly TAT
 * Market Direction). Renders nothing unless a genuine invite link is
 * configured (NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL, validated in
 * lib/site-config.ts).
 */
export function CommunityCta({ className }: { className?: string }) {
  const group = community.whatsapp;
  if (!group.url) return null;
  return (
    <a
      href={group.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-start gap-4 rounded-2xl border border-metallic-silver/15 bg-midnight-navy/40 p-6 transition-colors hover:border-cyber-blue/40 ${className ?? ""}`}
    >
      <WhatsAppIcon className="mt-1 h-6 w-6 shrink-0 text-cyber-blue" />
      <span>
        <span className="flex items-center gap-2 font-display text-lg text-ghost-white">
          Join {group.name}
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
        <span className="mt-1 block text-sm leading-relaxed text-muted-text">{group.description}</span>
        <span className="mt-2 block text-xs leading-relaxed text-muted-text/80">
          Formerly {group.formerName}. Group discussion is general information, not financial advice;
          trading involves risk.
        </span>
      </span>
    </a>
  );
}
