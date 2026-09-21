import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { socials, founderSocials } from "@/lib/site-config";
import {
  GitHubIcon,
  LinkedInIcon,
  InstagramIcon,
  WhatsAppIcon,
  MailIcon,
  ArrowRightIcon,
} from "@/components/icons";
import { NetworkBackground } from "@/components/network-background";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with CodePhantom Technologies through our active, confirmed contact channels.",
};

const channelDefs = [
  {
    key: "github",
    label: "GitHub",
    description: "Browse our code, projects and repositories.",
    icon: GitHubIcon,
    href: socials.github,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    description: "Connect with CodePhantom professionally.",
    icon: LinkedInIcon,
    href: socials.linkedin,
  },
  {
    key: "instagram",
    label: "Instagram",
    description: "Follow along with CodePhantom updates.",
    icon: InstagramIcon,
    href: socials.instagram,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    description: "Message CodePhantom directly.",
    icon: WhatsAppIcon,
    href: socials.whatsapp ? `https://wa.me/${socials.whatsapp}` : null,
  },
  {
    key: "email",
    label: "Email",
    description: "Send CodePhantom an email.",
    icon: MailIcon,
    href: socials.email ? `mailto:${socials.email}` : null,
  },
] as const;

const founderChannelDefs = [
  {
    key: "founder-github",
    label: "GitHub",
    icon: GitHubIcon,
    href: founderSocials.github,
  },
  {
    key: "founder-linkedin",
    label: "LinkedIn",
    icon: LinkedInIcon,
    href: founderSocials.linkedin,
  },
  {
    key: "founder-instagram",
    label: "Instagram",
    icon: InstagramIcon,
    href: founderSocials.instagram,
  },
] as const;

export default function ContactPage() {
  const active = channelDefs.filter((c) => c.href);

  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-24">
        <NetworkBackground className="absolute inset-0 opacity-40" />
        <div className="container-phantom relative">
          <Reveal>
            <p className="text-xs font-mono tracking-[0.3em] text-cyber-blue uppercase mb-4">
              Contact
            </p>
            <h1 className="font-display text-4xl font-semibold text-ghost-white tracking-tight md:text-5xl max-w-3xl">
              Let&rsquo;s talk about what you&rsquo;re building.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-text md:text-lg">
              CodePhantom only lists channels that are actually active. Reach
              out through any of the options below.
            </p>
          </Reveal>
        </div>
      </section>

      <Section className="border-t border-metallic-silver/10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          {active.map(({ key, label, description, icon: Icon, href }, i) => (
            <Reveal key={key} delay={i * 80}>
              <a
                href={href as string}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover group flex h-full flex-col rounded-2xl border border-metallic-silver/10 bg-surface/40 p-8"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-phantom-gradient/10 border border-phantom-purple/25 text-cyber-blue">
                  <Icon className="h-6 w-6" />
                </span>
                <h2 className="mt-6 font-display text-lg font-semibold text-ghost-white">
                  {label}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-text flex-1">
                  {description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-ghost-white/80 group-hover:text-ghost-white transition-colors">
                  Connect
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={active.length * 80 + 80}>
          <div className="mx-auto mt-14 max-w-2xl rounded-2xl border border-metallic-silver/10 bg-midnight-navy/50 p-8 text-center">
            <p className="text-sm leading-relaxed text-muted-text">
              More contact channels — including a company email and
              additional social profiles — will be added here as they are
              confirmed. CodePhantom does not publish placeholder or
              unconfirmed contact details.
            </p>
          </div>
        </Reveal>

        <Reveal delay={active.length * 80 + 160}>
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-metallic-silver/10 bg-surface/30 p-8">
            <h2 className="text-center font-mono text-xs uppercase tracking-[0.25em] text-cyber-blue">
              Connect with the Founder
            </h2>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              {founderChannelDefs.map(({ key, label, icon: Icon, href }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-metallic-silver/15 px-4 py-2 text-sm text-metallic-silver transition-colors hover:border-cyber-blue/50 hover:text-ghost-white"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </a>
              ))}
            </div>
            <p className="mt-6 text-center text-xs leading-relaxed text-muted-text">
              These are Ripfumelo Ngobeni&rsquo;s personal founder channels —
              Instagram in particular is his personal/professional account,
              not an official CodePhantom Technologies channel.
            </p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
