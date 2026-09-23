import { community } from "@/lib/site-config";
import { WhatsAppIcon, ArrowRightIcon } from "@/components/icons";

/**
 * WhatsApp community invite. Renders nothing unless a genuine invite link
 * is configured (NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL, validated in
 * lib/site-config.ts).
 */
export function CommunityCta({ className }: { className?: string }) {
  if (!community.whatsapp) return null;
  return (
    <a
      href={community.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-start gap-4 rounded-2xl border border-metallic-silver/15 bg-midnight-navy/40 p-6 transition-colors hover:border-cyber-blue/40 ${className ?? ""}`}
    >
      <WhatsAppIcon className="mt-1 h-6 w-6 shrink-0 text-cyber-blue" />
      <span>
        <span className="flex items-center gap-2 font-display text-lg text-ghost-white">
          Join the CodePhantom community
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
        <span className="mt-1 block text-sm leading-relaxed text-muted-text">
          Project updates and announcements on WhatsApp. Community messages are general information,
          not financial advice.
        </span>
      </span>
    </a>
  );
}
