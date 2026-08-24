"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SPARKWRIGHT } from "@/content/sparkwright";

export default function SparkwrightHero() {
  const prefersReducedMotion = useReducedMotion();
  const initial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 };
  const animate = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 };

  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,_rgba(47,133,90,0.25)_0%,_transparent_60%)]"
      />
      <div aria-hidden="true" className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-32 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={initial}
            animate={animate}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal/20 bg-teal/5 mb-8"
          >
            <div aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
            <span className="text-xs font-medium text-teal-light tracking-wide">
              Agentic SDLC · Guardrails-first · Neutral on stack, harness &amp; model
            </span>
          </motion.div>

          <motion.h1
            initial={initial}
            animate={animate}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1] mb-6 max-w-[16ch]"
          >
            Let anyone build{" "}
            <span className="text-teal-light">production-grade software</span> with
            AI agents — from an idea to{" "}
            <span className="text-orange">operating software</span>.
          </motion.h1>

          <motion.p
            initial={initial}
            animate={animate}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted max-w-2xl leading-relaxed mb-10"
          >
            Sparkwright turns a repository — new or existing — into a project
            that ships real software through a guided, agent-driven lifecycle.
            You bring the idea and the decisions; the kit brings the process,
            the guardrails, and a working pipeline to build on.
          </motion.p>

          <motion.div
            initial={initial}
            animate={animate}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href={SPARKWRIGHT.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-teal text-white font-medium hover:bg-teal-light transition-all hover:shadow-lg hover:shadow-teal/20"
            >
              Explore the repo
            </a>
            <a
              href="#use"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border text-muted hover:text-foreground hover:border-muted-foreground transition-all"
            >
              See how it works
            </a>
          </motion.div>

          <motion.div
            initial={initial}
            animate={animate}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-2.5"
          >
            <span className="font-mono text-xs text-muted px-2.5 py-1.5 rounded-md border border-border bg-white/[0.015]">
              <b className="text-teal-light font-medium">{SPARKWRIGHT.version}</b>
            </span>
            <span className="font-mono text-xs text-muted px-2.5 py-1.5 rounded-md border border-border bg-white/[0.015]">
              {SPARKWRIGHT.license}
            </span>
            <span className="font-mono text-xs text-muted px-2.5 py-1.5 rounded-md border border-border bg-white/[0.015]">
              maturity: <span className="text-orange">{SPARKWRIGHT.maturity}</span>
            </span>
            <span className="font-mono text-xs text-muted px-2.5 py-1.5 rounded-md border border-border bg-white/[0.015]">
              any stack · harness · model
            </span>
            <span className="font-mono text-xs text-muted px-2.5 py-1.5 rounded-md border border-border bg-white/[0.015]">
              built with its own loop
            </span>
          </motion.div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"
      />
    </section>
  );
}
