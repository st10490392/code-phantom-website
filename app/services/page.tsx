import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/services";
export const metadata: Metadata = { title: "Engineering services", description: "Scoped software engineering, applications, automation and quantitative technology projects." };
export default function ServicesPage() {
  return <div className="container-phantom pt-36 pb-24">
    <p className="font-mono text-cyber-blue">Engineering intelligent systems.</p>
    <h1 className="mt-4 font-display text-4xl text-ghost-white">Software built around your business.</h1>
    <p className="mt-6 max-w-2xl text-muted-text">Start with the problem, the people using the system and the outcome you need. We agree scope, acceptance criteria, support and delivery milestones before development.</p>
    <div className="mt-12 grid gap-6 md:grid-cols-2">{services.map(s => <section key={s.id} className="rounded-2xl border border-metallic-silver/15 bg-surface/40 p-8"><h2 className="text-xl text-ghost-white">{s.name}</h2><p className="mt-4 text-muted-text">{s.description}</p></section>)}</div>
    <p className="mt-10 text-muted-text">Custom quantitative development is a specialist engineering engagement. CPT Scanner, CodePhantom App and proprietary research products have their own release and licensing requirements.</p>
    <div className="mt-8 flex gap-6"><Link className="text-cyber-blue underline" href="/inquire">Prepare a project inquiry</Link><Link className="text-cyber-blue underline" href="/technology/qin">Explore QIN research</Link></div>
  </div>;
}
