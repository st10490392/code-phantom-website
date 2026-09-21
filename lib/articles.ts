/**
 * Insights / research article data model.
 *
 * No articles have been published yet. DO NOT seed this array with
 * placeholder or fabricated content — the Insights page renders an
 * honest "coming soon" state when this list is empty. Future articles
 * (and eventually a CMS) plug directly into this shape.
 */
export type ArticleCategory =
  | "Engineering"
  | "Cybersecurity"
  | "Automation"
  | "Phantom Traders Research"
  | "Company Updates";

export type Article = {
  title: string;
  slug: string;
  summary: string;
  category: ArticleCategory;
  publicationDate: string; // ISO
  author: string;
  body: string;
  featuredImage?: string;
  tags: string[];
};

export const articles: Article[] = [];

export const articleCategories: ArticleCategory[] = [
  "Engineering",
  "Cybersecurity",
  "Automation",
  "Phantom Traders Research",
  "Company Updates",
];
