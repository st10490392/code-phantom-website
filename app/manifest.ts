import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CodePhantom Technologies",
    short_name: "CodePhantom",
    description: "CodePhantom client portal for products, access, signals, licences and updates.",
    start_url: "/app",
    scope: "/",
    display: "standalone",
    background_color: "#05070D",
    theme_color: "#05070D",
    orientation: "portrait-primary",
    categories: ["business", "finance", "productivity"],
    icons: [
      {
        src: "/mark.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/mark.png",
        sizes: "any",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
