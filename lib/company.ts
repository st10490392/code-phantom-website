/**
 * Central company identity - the single place to change brand, founder
 * and (future) legal registration details.
 *
 *   brand      - how the company is presented everywhere.
 *   founder    - the founder is presented with BOTH identities:
 *                  alias:      GingerCodePhantom (public creator brand)
 *                  personName: Ripfumelo Ngobeni (real name)
 *                so searches for either associate him with the company.
 *                No further personal details belong here.
 *   legal      - null until CIPC registration is complete. When it is,
 *                fill in `legalName` (e.g. "CodePhantom Technologies (Pty)
 *                Ltd") and `registrationNumber` here and every consumer
 *                (footer, terms, privacy, structured data) picks it up.
 *                Never write a "(Pty) Ltd" name anywhere before then.
 */
export const company = {
  brand: {
    name: "CodePhantom Technologies",
    shortName: "CodePhantom",
    tagline: "Engineering Intelligent Systems.",
    country: "South Africa",
  },
  founder: {
    alias: "GingerCodePhantom",
    personName: "Ripfumelo Ngobeni",
    title: "Founder",
  },
  legal: {
    legalName: null as string | null,
    registrationNumber: null as string | null,
    registrationAuthority: "CIPC",
  },
} as const;

export function isRegisteredCompany(): boolean {
  return company.legal.legalName !== null && company.legal.registrationNumber !== null;
}

/** Name to use where a legal party must be named (terms, privacy). */
export function contractingPartyName(): string {
  return company.legal.legalName ?? company.brand.name;
}

/** One-line legal notice, truthful in both the pre- and post-registration state. */
export function legalEntityNotice(): string {
  if (isRegisteredCompany()) {
    return `${company.legal.legalName}, registered with ${company.legal.registrationAuthority} under registration number ${company.legal.registrationNumber}.`;
  }
  return `${company.brand.name} is the trading brand of an early-stage venture founded by ${founderDisplayName}. Company registration details will be published here once registration is complete.`;
}

/** "GingerCodePhantom (Ripfumelo Ngobeni)" - for running text and SEO. */
export const founderDisplayName = `${company.founder.alias} (${company.founder.personName})`;

/** "Founder · CodePhantom Technologies" */
export const founderByline = `${company.founder.title} · ${company.brand.name}`;
