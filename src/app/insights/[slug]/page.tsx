import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextBlock } from "next-sanity";
import { ArrowLeft } from "lucide-react";
import { client } from "@/sanity/client";
import { articleBySlugQuery, articleSlugsQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

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
  body: PortableTextBlock[];
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

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(articleSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article: Article | null = await client.fetch(articleBySlugQuery, { slug });

  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | InflectionSparks.ai`,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      ...(article.coverImage && {
        images: [{ url: urlFor(article.coverImage).width(1200).height(630).url() }],
      }),
    },
    alternates: {
      canonical: `https://inflectionsparks.ai/insights/${article.slug.current}`,
    },
  };
}

const portableTextComponents = {
  types: {
    image: ({ value }: { value: { asset: { _ref: string }; alt?: string; caption?: string } }) => (
      <figure className="my-8">
        <Image
          src={urlFor(value).width(960).url()}
          alt={value.alt || ""}
          width={960}
          height={540}
          className="rounded-lg"
        />
        {value.caption && (
          <figcaption className="text-center text-sm text-muted-foreground mt-3">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value?: { href: string } }) => {
      const href = value?.href || "#";
      return (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="text-teal-light hover:underline"
        >
          {children}
        </a>
      );
    },
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl sm:text-3xl font-bold mt-12 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl sm:text-2xl font-semibold mt-10 mb-3">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-teal/40 pl-6 my-6 text-muted italic">
        {children}
      </blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-muted leading-relaxed mb-6">{children}</p>
    ),
  },
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article: Article | null = await client.fetch(articleBySlugQuery, { slug });

  if (!article) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 lg:px-8 py-16 md:py-24">
      {/* Back link */}
      <Link
        href="/insights"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-10"
      >
        <ArrowLeft className="h-4 w-4" />
        All Insights
      </Link>

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-medium text-teal-light px-2 py-0.5 rounded-full border border-teal/20 bg-teal/5">
            {categoryLabels[article.category] || article.category}
          </span>
          <span className="text-sm text-muted-foreground">
            {formatDate(article.publishedAt)}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
          {article.title}
        </h1>

        <p className="text-lg text-muted leading-relaxed">
          {article.excerpt}
        </p>
      </header>

      {/* Cover image */}
      {article.coverImage && (
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl mb-12">
          <Image
            src={urlFor(article.coverImage).width(960).height(540).url()}
            alt={article.coverImage.alt}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Body */}
      <div className="prose-custom">
        <PortableText value={article.body} components={portableTextComponents} />
      </div>

      {/* Footer CTA */}
      <div className="mt-16 pt-10 border-t border-border">
        <p className="text-muted mb-4">
          Want to discuss how this applies to your organization?
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-teal text-white font-medium hover:bg-teal-light transition-all"
          >
            Start the Conversation
          </Link>
          <a
            href="https://calendly.com/inflectionsparksolutions/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border text-muted hover:text-foreground hover:border-muted-foreground transition-all"
          >
            Book a Call
          </a>
        </div>
      </div>
    </article>
  );
}
