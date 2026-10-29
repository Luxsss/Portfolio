import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString();
  const languages = { fr: SITE_URL, en: `${SITE_URL}/en` };

  return [
    { url: SITE_URL, lastModified, priority: 1.0, alternates: { languages } },
    { url: `${SITE_URL}/en`, lastModified, priority: 0.8, alternates: { languages } },
  ];
}
