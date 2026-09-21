import { siteConfig, socials } from "@/lib/site-config";

export function OrganizationJsonLd() {
  const sameAs = Object.values(socials).filter(
    (v): v is string => typeof v === "string"
  );

  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: `${siteConfig.url}/logo.png`,
    founder: {
      "@type": "Person",
      name: siteConfig.founder.name,
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
