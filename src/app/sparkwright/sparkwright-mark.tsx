import type { ReactNode } from "react";

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
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={`flex-none ${glyph}`}
      >
        <path
          d="M12 1.5l2.1 6.3a2 2 0 001.3 1.3L21.7 11l-6.3 2.1a2 2 0 00-1.3 1.3L12 20.7l-2.1-6.3a2 2 0 00-1.3-1.3L2.3 11l6.3-2.1a2 2 0 001.3-1.3L12 1.5z"
          fill={`url(#${gradientId})`}
        />
        <defs>
          <linearGradient id={gradientId} x1="2" y1="2" x2="22" y2="22">
            <stop stopColor="#F97316" />
            <stop offset="1" stopColor="#38A169" />
          </linearGradient>
        </defs>
      </svg>
      <span className={`font-bold tracking-[-0.02em] ${word}`}>
        <span className="text-foreground">Spark</span>
        <span className="text-teal-light">wright</span>
      </span>
    </div>
  );
}
