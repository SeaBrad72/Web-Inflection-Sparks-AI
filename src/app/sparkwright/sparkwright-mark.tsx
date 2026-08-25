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
  gradientId = "sparkwright-mark-gradient",
}: {
  /** Override only if two marks render on one page — SVG gradient ids are global. */
  gradientId?: string;
}): ReactNode {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="h-7 w-7 flex-none sm:h-8 sm:w-8"
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
      <span className="text-2xl font-bold tracking-[-0.02em] sm:text-[28px]">
        <span className="text-foreground">Spark</span>
        <span className="text-teal-light">wright</span>
      </span>
    </div>
  );
}
