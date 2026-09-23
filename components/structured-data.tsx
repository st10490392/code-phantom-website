import { entityIds, founderSocials, siteConfig, socials } from "@/lib/site-config";
import { founder } from "@/lib/founder";
import { company, isRegisteredCompany } from "@/lib/company";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output with "<" escaped so content can never close the script tag.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/**
 * Organization + WebSite graph, rendered on every page. `sameAs` lists only
 * confirmed COMPANY channels; the founder's personal profiles belong to
 * the Person entity (see FounderJsonLd), never to the Organization.
 */
export function OrganizationJsonLd() {
  const sameAs = Object.values(socials).filter((v): v is string => typeof v === "string");

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": entityIds.organization,
        name: siteConfig.name,
        alternateName: siteConfig.shortName,
        url: siteConfig.url,
        description: siteConfig.description,
        slogan: siteConfig.tagline,
        // Only emitted once CIPC registration details exist in lib/company.ts.
        ...(isRegisteredCompany()
          ? {
              legalName: company.legal.legalName,
              identifier: {
                "@type": "PropertyValue",
                propertyID: company.legal.registrationAuthority,
                value: company.legal.registrationNumber,
              },
            }
          : {}),
        logo: { "@type": "ImageObject", url: `${siteConfig.url}/logo.png` },
        founder: { "@id": entityIds.founder },
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": entityIds.website,
        url: siteConfig.url,
        name: siteConfig.name,
        publisher: { "@id": entityIds.organization },
        inLanguage: "en",
      },
    ],
  };

  return <JsonLd data={data} />;
}

/**
 * Founder Person entity for the /founder page. Every field is taken from
 * lib/founder.ts / lib/site-config.ts (confirmed facts only) - no inflated
 * titles, credentials or claims are introduced here.
 */
export function FounderJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": entityIds.founder,
        name: founder.name,
        jobTitle: company.founder.title,
        worksFor: { "@id": entityIds.organization },
        url: `${siteConfig.url}/founder`,
        description: founder.summary,
        homeLocation: { "@type": "Country", name: founder.location },
        knowsAbout: [...founder.interests, ...founder.technologies],
        sameAs: Object.values(founderSocials),
      },
      {
        "@type": "ProfilePage",
        url: `${siteConfig.url}/founder`,
        name: `${founder.name} — Founder of ${siteConfig.name}`,
        mainEntity: { "@id": entityIds.founder },
        isPartOf: { "@id": entityIds.website },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Founder", item: `${siteConfig.url}/founder` },
        ],
      },
    ],
  };

  return <JsonLd data={data} />;
}
