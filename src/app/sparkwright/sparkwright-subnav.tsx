"use client";

import { useEffect, useState } from "react";
import { SPARKWRIGHT } from "@/content/sparkwright";
import SparkwrightMark from "./sparkwright-mark";

/**
 * Sticky section nav for the Sparkwright page.
 *
 * Restores the structure of the product's standalone design, whose own header
 * carried the mark plus these section links. Because this page lives inside the
 * InflectionSparks.ai shell, it sits *below* the site nav (`top-16`, matching
 * `<main className="pt-16">`) rather than replacing it.
 *
 * Desktop only. Two stacked sticky bars would eat ~112px of a 375px viewport,
 * so on mobile the hero carries the mark instead and this is not rendered.
 */

const SECTIONS = [
  { id: "what", label: "What it is" },
  { id: "use", label: "Use it" },
  { id: "principles", label: "Foundations" },
  { id: "guardrails", label: "Guardrails" },
  { id: "honesty", label: "Honesty" },
  { id: "enterprise", label: "Enterprise" },
] as const;

export default function SparkwrightSubnav() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const targets = SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (targets.length === 0) return;

    // Top offset is the site nav (64px) + this bar (48px). The negative bottom
    // margin keeps only the upper band of the viewport eligible, so the active
    // link tracks the section actually being read rather than the last one to
    // clip the viewport edge.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-112px 0px -55% 0px", threshold: 0 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sparkwright page sections"
      className="sticky top-16 z-40 hidden border-b border-border-subtle bg-background/80 backdrop-blur-xl md:block"
    >
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between gap-6 px-6 lg:px-8">
        <SparkwrightMark size="sm" gradientId="sparkwright-subnav-gradient" />

        <ul className="flex items-center gap-1">
          {SECTIONS.map(({ id, label }) => {
            const isActive = activeId === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`rounded-md px-2.5 py-1.5 text-[13.5px] transition-colors ${
                    isActive
                      ? "text-teal-light"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href={SPARKWRIGHT.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-none rounded-full bg-teal px-4 py-1.5 text-[13.5px] font-medium text-white transition-colors hover:bg-teal-light"
        >
          View on GitHub{" "}
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </nav>
  );
}
