import { groq } from "next-sanity";

export const allArticlesQuery = groq`
  *[_type == "article" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    category,
    coverImage {
      asset-> { _id, url },
      alt
    }
  }
`;

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    category,
    coverImage {
      asset-> { _id, url },
      alt
    },
    body[] {
      ...,
      _type == "image" => {
        ...,
        asset-> { _id, url }
      }
    }
  }
`;

export const articleSlugsQuery = groq`
  *[_type == "article" && defined(slug.current)].slug.current
`;

/**
 * Whether anything is published yet. Drives whether Insights appears in the
 * nav, the footer and the sitemap, so the section reveals itself on first
 * publish instead of needing a code change nobody remembers to make.
 */
export const publishedArticleCountQuery = groq`
  count(*[_type == "article" && defined(slug.current)])
`;
