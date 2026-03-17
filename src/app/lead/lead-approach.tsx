"use client";

import { motion } from "framer-motion";

const differentiators = [
  {
    label: "Consultants",
    trait: "Deliver a report and leave",
    yours: "Embed with your team and stay accountable",
  },
  {
    label: "Recruiters",
    trait: "12–18 month search, $400K+ salary",
    yours: "Start in days, not months. Fractional cost.",
  },
  {
    label: "Advisors",
    trait: "Monthly check-ins, limited context",
    yours: "In the room for every hard decision",
  },
  {
    label: "Agencies",
    trait: "Build it and hand off a codebase",
    yours: "Build it and hand off a capable team",
  },
];

export default function LeadApproach() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Not a consultant.{" "}
            <span className="text-gradient-teal">Not an advisor.</span>
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            Fractional leadership means you get an executive who&apos;s in the
            room, not on a call once a month. Someone who owns the outcome, not
            just the recommendation.
          </p>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-border-subtle bg-surface overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 px-6 py-4 border-b border-border-subtle bg-surface-elevated">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Alternative
            </div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              What you get
            </div>
            <div className="text-xs font-medium text-teal-light uppercase tracking-wider">
              With InflectionSparks
            </div>
          </div>

          {/* Rows */}
          {differentiators.map((d, i) => (
            <div
              key={d.label}
              className={`grid grid-cols-3 gap-4 px-6 py-5 ${
                i < differentiators.length - 1
                  ? "border-b border-border-subtle"
                  : ""
              }`}
            >
              <div className="text-sm font-medium text-foreground">
                {d.label}
              </div>
              <div className="text-sm text-muted-foreground">{d.trait}</div>
              <div className="text-sm text-teal-light font-medium">
                {d.yours}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Pull quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 max-w-2xl"
        >
          <p className="text-lg text-muted italic leading-relaxed">
            &ldquo;The goal isn&apos;t to become your permanent CTO. It&apos;s to
            build the strategy, the team, and the systems so you can hire one who
            walks into a functioning operation.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
