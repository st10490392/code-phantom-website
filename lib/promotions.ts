/**
 * Promotion / campaign content architecture.
 *
 * No promotion currently exists. DO NOT seed a placeholder promotion —
 * `activePromotions()` must return an empty array until a real campaign
 * is added, and consuming UI (banners, division pages) must render
 * nothing when it is empty.
 *
 * Division-scoped financial promotions (e.g. Phantom Traders offers)
 * must never be published here until they are legally permitted —
 * this file only defines the shape for later use.
 */
export type CampaignType =
  | "Launch Offer"
  | "Announcement"
  | "Coupon"
  | "Free Offer"
  | "Division Campaign";

export type Promotion = {
  id: string;
  title: string;
  description: string;
  campaignType: CampaignType;
  startDate: string; // ISO
  endDate?: string; // ISO
  active: boolean;
  cta: string;
  ctaUrl: string;
  couponCode?: string;
  division?: "software" | "security" | "labs" | "phantom-traders" | "company";
  banner?: string;
  terms?: string;
};

export const promotions: Promotion[] = [];

export function activePromotions(division?: Promotion["division"]) {
  const now = new Date();
  return promotions.filter((p) => {
    if (!p.active) return false;
    if (division && p.division !== division) return false;
    const start = new Date(p.startDate);
    if (start > now) return false;
    if (p.endDate && new Date(p.endDate) < now) return false;
    return true;
  });
}
