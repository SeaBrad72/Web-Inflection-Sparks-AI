import { client } from "./client";
import { publishedArticleCountQuery } from "./queries";

/**
 * True once at least one article is published.
 *
 * Gates the Insights entry in the nav, footer and sitemap. An empty Insights
 * section costs credibility on a page whose job is credibility — and while
 * empty, its only content is a contact CTA.
 *
 * Fails CLOSED: if Sanity is unreachable the link stays hidden rather than
 * pointing at a page that may not render. A missing nav item is a non-event;
 * a broken one is not.
 *
 * `revalidate` keeps this from being frozen at build time — see the same
 * setting on the Insights routes.
 */
export async function hasPublishedArticles(): Promise<boolean> {
  try {
    const count = await client.fetch<number>(
      publishedArticleCountQuery,
      {},
      { next: { revalidate: 300 } }
    );
    return typeof count === "number" && count > 0;
  } catch (err) {
    console.error("[insights-gate] Sanity count query failed:", err instanceof Error ? err.message : String(err));
    return false;
  }
}
