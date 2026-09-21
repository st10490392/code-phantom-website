/**
 * Testimonial / review content architecture.
 *
 * No genuine reviews exist yet. DO NOT seed fake reviews — the
 * testimonials section must stay hidden (see `approvedReviews()`)
 * until real, moderated reviews are added.
 *
 * For Phantom Traders specifically: trading-performance claims must
 * never be represented through cherry-picked testimonials. Future
 * performance communication should come from a complete, verified
 * ledger (wins and losses), not from reviews.
 */
export type Review = {
  reviewer: string;
  displayName: string;
  verified: boolean;
  product: string;
  rating: 1 | 2 | 3 | 4 | 5;
  review: string;
  date: string; // ISO
  moderationStatus: "pending" | "approved" | "rejected";
};

export const reviews: Review[] = [];

export function approvedReviews() {
  return reviews.filter((r) => r.moderationStatus === "approved");
}
