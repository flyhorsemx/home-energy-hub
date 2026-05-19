import { getAllPosts } from "@/lib/mdx"
import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/config"
import { STATE_SLUGS } from "@/lib/states"
import { CITY_SLUGS } from "@/lib/cities"

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllPosts("blog")
  const newsPosts = getAllPosts("news")

  const staticRoutes: MetadataRoute.Sitemap = [
    // Core pages
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/news`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },

    // Category hub pages
    { url: `${SITE_URL}/solar`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/roofing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/hvac`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/windows`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/insulation`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/water-heating`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },

    // Quote pages (high-intent, high priority)
    { url: `${SITE_URL}/quotes/solar`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/quotes/hvac`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/quotes/roofing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/quotes/windows`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/quotes/insulation`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/quotes/water-heating`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },

    // Tools
    { url: `${SITE_URL}/calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/tools/solar-roi`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/tools/rebates`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/tools/upgrade-planner`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/tools/energy-comparison`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/tools/hvac-size`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/tools/roofing-materials`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },

    // Blog categories
    { url: `${SITE_URL}/blog/category/solar-diy`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/blog/category/hvac-maintenance`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/blog/category/energy-saving-tips`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/blog/category/roofing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },

    // News categories
    { url: `${SITE_URL}/news/category/solar-policy`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/news/category/rebates`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/news/category/home-tech`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
    { url: `${SITE_URL}/news/category/energy-costs`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },

    // Legal
    { url: `${SITE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ]

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const newsRoutes: MetadataRoute.Sitemap = newsPosts.map((p) => ({
    url: `${SITE_URL}/news/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  // Local solar pages (high local SEO value)
  const solarStateRoutes: MetadataRoute.Sitemap = STATE_SLUGS.map((state) => ({
    url: `${SITE_URL}/solar/${state}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }))

  // Roofing city pages
  const roofingCityRoutes: MetadataRoute.Sitemap = CITY_SLUGS.map((city) => ({
    url: `${SITE_URL}/roofing/${city}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }))

  // HVAC city pages
  const hvacCityRoutes: MetadataRoute.Sitemap = CITY_SLUGS.map((city) => ({
    url: `${SITE_URL}/hvac/${city}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }))

  // Windows city pages
  const windowsCityRoutes: MetadataRoute.Sitemap = CITY_SLUGS.map((city) => ({
    url: `${SITE_URL}/windows/${city}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.82,
  }))

  // Insulation city pages
  const insulationCityRoutes: MetadataRoute.Sitemap = CITY_SLUGS.map((city) => ({
    url: `${SITE_URL}/insulation/${city}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.82,
  }))

  return [...staticRoutes, ...blogRoutes, ...newsRoutes, ...solarStateRoutes, ...roofingCityRoutes, ...hvacCityRoutes, ...windowsCityRoutes, ...insulationCityRoutes]
}
