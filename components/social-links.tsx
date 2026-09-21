import { socials } from "@/lib/site-config";
import {
  GitHubIcon,
  LinkedInIcon,
  InstagramIcon,
  WhatsAppIcon,
  MailIcon,
} from "@/components/icons";
import { cx } from "@/lib/utils";

const channels = [
  { key: "github", icon: GitHubIcon, label: "GitHub", href: socials.github },
  { key: "linkedin", icon: LinkedInIcon, label: "LinkedIn", href: socials.linkedin },
  { key: "instagram", icon: InstagramIcon, label: "Instagram", href: socials.instagram },
  {
    key: "whatsapp",
    icon: WhatsAppIcon,
    label: "WhatsApp",
    href: socials.whatsapp ? `https://wa.me/${socials.whatsapp}` : null,
  },
  {
    key: "email",
    icon: MailIcon,
    label: "Email",
    href: socials.email ? `mailto:${socials.email}` : null,
  },
] as const;

export function SocialLinks({ className }: { className?: string }) {
  const active = channels.filter((c) => c.href);
  if (active.length === 0) return null;

  return (
    <div className={cx("flex items-center gap-3", className)}>
      {active.map(({ key, icon: Icon, label, href }) => (
        <a
          key={key}
          href={href as string}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-metallic-silver/15 text-metallic-silver transition-colors duration-300 hover:border-cyber-blue/50 hover:text-cyber-blue"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}
