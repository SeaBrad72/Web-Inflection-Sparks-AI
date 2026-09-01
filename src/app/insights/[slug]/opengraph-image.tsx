import { generateOgImage, size, contentType } from "@/lib/og-image";
import { client } from "@/sanity/client";
import { articleBySlugQuery } from "@/sanity/queries";

export { size, contentType };

/**
 * Social preview card for an article.
 *
 * Without this, an article published with no cover image had NO social image at
 * all — `generateMetadata` only set `openGraph.images` when `coverImage`
 * existed. Pasting that link into LinkedIn produced a bare text card, which
 * reads as unfinished and gets materially less reach.
 *
 * Now every article always has a branded card, generated from its title, using
 * the same Satori template as the rest of the site. A cover image, when the
 * author adds one, still wins — `generateMetadata` sets an explicit
 * `openGraph.images` and explicit metadata takes precedence over this
 * file-based convention.
 *
 * Inherits `revalidate` from the route segment, so a retitled article gets a
 * regenerated card without a deploy.
 */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // A failure here must not break the page it belongs to: fall back to the
  // site name rather than throwing while rendering a social card.
  let title = "InflectionSparks.ai";
  let subtitle = "Insights";
  try {
    const article: { title?: string; category?: string } | null =
      await client.fetch(articleBySlugQuery, { slug });
    if (article?.title) title = article.title;
    if (article?.category) {
      subtitle = article.category
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    }
  } catch (err) {
    console.error(
      "[og-image] article fetch failed:",
      err instanceof Error ? err.message : String(err)
    );
  }

  return generateOgImage({ title, subtitle });
}
