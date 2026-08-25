import type { ReactNode } from "react";
import SparkGlyph from "@/components/spark-glyph";

/**
 * The Sparkwright product mark: the gradient spark plus the wordmark.
 *
 * The page lives inside the InflectionSparks.ai shell, so the site nav carries
 * the parent brand. This mark gives the product its own identity on its own
 * page — the role the standalone design's header played before the port.
 *
 * The gradient stops are literal hex, deliberately — they are Sparkwright's
 * brand colours, not the site's theme. They happen to equal --orange and
 * --teal-light today, but a retheme of the parent site must not repaint the
 * product's logo. These are the exact values from the product's own design.
 */
export default function SparkwrightMark({
  size = "lg",
  gradientId = "sparkwright-mark-gradient",
}: {
  /** "sm" for the sticky sub-nav, "lg" for a page masthead. */
  size?: "sm" | "lg";
  /**
   * SVG gradient ids are document-global. The sub-nav and the mobile hero
   * mark both render on this page, so they must not share one.
   */
  gradientId?: string;
}): ReactNode {
  const glyph = size === "sm" ? "h-5 w-5" : "h-7 w-7 sm:h-8 sm:w-8";
  const word = size === "sm" ? "text-[19px]" : "text-2xl sm:text-[28px]";

  return (
    <div className={`flex items-center ${size === "sm" ? "gap-2" : "gap-2.5"}`}>
      <SparkGlyph className={glyph} gradientId={gradientId} />
      <span className={`font-bold tracking-[-0.02em] ${word}`}>
        <span className="text-foreground">Spark</span>
        <span className="text-teal-light">wright</span>
      </span>
    </div>
  );
}
