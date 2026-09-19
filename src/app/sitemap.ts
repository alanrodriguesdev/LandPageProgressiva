import type { MetadataRoute } from "next";
import { negocio } from "@/content/negocio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: negocio.urlCanonica,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
