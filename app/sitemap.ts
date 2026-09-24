import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { divisions } from "@/lib/divisions";
import { projects } from "@/lib/projects";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes = [
    "",
    "/about",
    "/capabilities",
    "/divisions",
    "/projects",
    "/insights",
    "/founder",
    "/contact",
    "/products",
    "/download",
    "/changelog",
    "/status",
    "/support",
    "/privacy",
    "/terms",
  ];

  const divisionRoutes = divisions.map((d) => `/divisions/${d.slug}`);
  const projectRoutes = projects.map((p) => `/projects/${p.slug}`);
  const productRoutes = products.map((p) => `/products/${p.slug}`);

  return [...staticRoutes, ...divisionRoutes, ...projectRoutes, ...productRoutes].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
