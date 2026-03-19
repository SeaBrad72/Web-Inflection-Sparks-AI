import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import { allArticlesQuery } from "@/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://inflectionsparks.ai";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/lead`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/build`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/transform`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  let articles: { slug: { current: string }; publishedAt: string }[] = [];
  try {
    articles = await client.fetch(allArticlesQuery);
  } catch (err) {
    console.error("[sitemap] Failed to fetch articles from Sanity:", err);
  }

  const articlePages: MetadataRoute.Sitemap = articles
    .filter((a) => a.slug?.current && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(a.slug.current))
    .map((article) => ({
      url: `${baseUrl}/insights/${article.slug.current}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticPages, ...articlePages];
}
