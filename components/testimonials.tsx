import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { approvedReviews } from "@/lib/reviews";
import { getPublishedTestimonials } from "@/lib/platform-api";

const PRODUCT_LABEL: Record<string, string> = {
  SCANNER: "CPT Scanner",
  SIGNALS: "Signals",
  EA: "Code Phantom EA",
  APP: "CodePhantom App",
  COMPANY: "CodePhantom",
};

/**
 * Renders ONLY moderated testimonials: approved entries in lib/reviews.ts
 * plus those the backend publishes after its moderation pipeline. When
 * there are none (the case today), it renders nothing at all - no
 * placeholder, no "coming soon".
 */
export async function Testimonials() {
  const local = approvedReviews().map((r) => ({
    id: `local-${r.reviewer}-${r.date}`,
    name: r.displayName,
    product: r.product,
    rating: r.rating,
    body: r.review,
    performanceVerified: false,
  }));
  const remote = (await getPublishedTestimonials(6)).map((t) => ({
    id: t.id,
    name: t.displayName,
    product: PRODUCT_LABEL[t.product] ?? t.product,
    rating: t.rating,
    body: t.body,
    performanceVerified: t.performanceVerified,
  }));
  const items = [...remote, ...local].slice(0, 6);
  if (items.length === 0) return null;

  return (
    <Section className="border-t border-metallic-silver/10">
      <Reveal>
        <SectionHeading eyebrow="Clients" title="What people say" />
      </Reveal>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((t, i) => (
          <Reveal key={t.id} delay={i * 60}>
            <figure className="h-full rounded-2xl border border-metallic-silver/10 bg-midnight-navy/40 p-6">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-cyber-blue">{t.product}</p>
              <p className="mt-2 text-sm text-metallic-silver" aria-label={`${t.rating} out of 5`}>
                {"★".repeat(t.rating)}
                {"☆".repeat(5 - t.rating)}
              </p>
              <blockquote className="mt-4 text-sm leading-relaxed text-muted-text">“{t.body}”</blockquote>
              <figcaption className="mt-4 text-sm text-ghost-white">
                {t.name}
                {t.performanceVerified ? (
                  <span className="ml-2 text-xs text-cyber-blue">· results record verified</span>
                ) : null}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted-text">
        Testimonials describe individual experiences and are published only after review and with
        the author&apos;s consent. They are not a guarantee or indication of future results and are
        not financial advice.
      </p>
    </Section>
  );
}
