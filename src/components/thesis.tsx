"use client";

import { motion } from "framer-motion";

export default function Thesis() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(249,115,22,0.04)_0%,_transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange/20 bg-orange/5 mb-8">
            <span className="text-xs font-medium text-orange tracking-wide">The Problem</span>
          </div>

          {/* Provocation */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] mb-6">
            Your agile process is slowing you down.{" "}
            <span className="text-muted">
              Your teams aren&apos;t structured for AI. Your pilots aren&apos;t scaling.
            </span>
          </h2>

          <p className="text-lg text-muted leading-relaxed max-w-2xl mx-auto mb-8">
            The methodologies that built the last generation of software are now impediments to the next.
            Agentic development doesn&apos;t fit in two-week sprints. AI adoption doesn&apos;t happen through isolated pilots.
            And organizational transformation doesn&apos;t come from a strategy deck.
          </p>

          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-border bg-surface">
            <span className="text-sm font-medium text-foreground">We fix all three.</span>
            <span className="text-gradient-teal text-sm font-bold">Lead. Build. Transform.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
