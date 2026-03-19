import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import { allArticlesQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

export const metadata: Metadata = {
  title: "Insights — AI Strategy & Engineering Leadership",
  description:
    "Practical insights on AI transformation, engineering leadership, org design, and building AI-powered products. From the field, not the ivory tower.",
  openGraph: {
    title: "Insights | InflectionSparks.ai",
    description:
      "Practical insights on AI transformation, engineering leadership, and building AI-powered products.",
  },
  alternates: {
    canonical: "https://inflectionsparks.ai/insights",
  },
};

interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  category: string;
  coverImage?: {
    asset: { _id: string; url: string };
    alt: string;
  };
}

const categoryLabels: Record<string, string> = {
  "ai-strategy": "AI Strategy",
  "engineering-leadership": "Engineering Leadership",
  "product-development": "Product Development",
  "org-transformation": "Org Transformation",
  "industry-insights": "Industry Insights",
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function InsightsPage() {
  const articles: Article[] = await client.fetch(allArticlesQuery);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[auto] md:min-h-[50vh] flex items-start md:items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,_rgba(47,133,90,0.25)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-24 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal/20 bg-teal/5 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
              <span className="text-xs font-medium text-teal-light tracking-wide">
                Insights
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1] mb-6">
              From the field.{" "}
              <span className="text-gradient-teal">Not the ivory tower.</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted max-w-2xl leading-relaxed">
              Practical thinking on AI transformation, engineering leadership,
              and building organizations that thrive through platform shifts.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Articles */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        {articles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted text-lg">
              New insights coming soon. In the meantime,{" "}
              <Link href="/contact" className="text-teal-light hover:underline">
                let&apos;s talk
              </Link>{" "}
              about your AI transformation.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article._id}
                href={`/insights/${article.slug.current}`}
                className="group rounded-xl border border-border bg-surface hover:border-teal/30 transition-all hover:shadow-lg hover:shadow-teal/5"
              >
                {article.coverImage && (
                  <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl">
                    <Image
                      src={urlFor(article.coverImage).width(640).height(360).url()}
                      alt={article.coverImage.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium text-teal-light px-2 py-0.5 rounded-full border border-teal/20 bg-teal/5">
                      {categoryLabels[article.category] || article.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(article.publishedAt)}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-foreground group-hover:text-teal-light transition-colors mb-2">
                    {article.title}
                  </h2>
                  <p className="text-sm text-muted line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
