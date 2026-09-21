import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { divisions } from "@/lib/divisions";
import { projects } from "@/lib/projects";

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
  ];

  const divisionRoutes = divisions.map((d) => `/divisions/${d.slug}`);
  const projectRoutes = projects.map((p) => `/projects/${p.slug}`);

  return [...staticRoutes, ...divisionRoutes, ...projectRoutes].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
