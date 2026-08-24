import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SPARKWRIGHT } from "@/content/sparkwright";

export default function SparkwrightStrip() {
  return (
    <section className="border-t border-border-subtle">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="rounded-2xl border border-teal/25 bg-gradient-to-b from-teal/[0.06] to-transparent p-8 sm:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-teal-light mb-4">
            Products
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Sparkwright — the agentic SDLC kit
          </h2>
          <p className="text-muted leading-relaxed max-w-[720px] mb-6">
            Guardrails that let anyone build production-grade software with AI
            agents, from an idea to operating software. Open source, neutral on
            stack, harness, and model.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/sparkwright"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-teal text-white text-sm font-medium hover:bg-teal-light transition-colors"
            >
              Explore Sparkwright
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <span className="font-mono text-xs text-muted-foreground">
              {SPARKWRIGHT.version} · {SPARKWRIGHT.license} · {SPARKWRIGHT.maturity}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
