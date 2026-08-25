/**
 * The Sparkwright spark glyph.
 *
 * Shared so the path and its gradient live in exactly one place — it renders
 * in the product page's mark, in the sticky sub-nav, and in the site nav's
 * Products dropdown.
 *
 * The gradient stops are literal hex on purpose: these are Sparkwright's brand
 * colours, not the site's theme. They equal --orange and --teal-light today,
 * but a retheme of the parent site must not repaint the product's logo.
 *
 * SVG gradient ids are document-global, so every instance that can appear on
 * the same page must pass its own `gradientId`.
 */
export default function SparkGlyph({
  className = "h-5 w-5",
  gradientId,
}: {
  className?: string;
  gradientId: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`flex-none ${className}`}
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
  );
}
