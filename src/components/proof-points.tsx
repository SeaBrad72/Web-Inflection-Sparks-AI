"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const metrics = [
  {
    metric: "67%",
    outcome: "Fleet operations cost reduction",
    context: "IoT and ML-driven optimization for a global mobility platform. Increased revenue per vehicle while cutting ops cost.",
  },
  {
    metric: "3–4x",
    outcome: "Daily releases, up from bi-weekly",
    context: "Stabilized a 175-person global engineering org. Shifted from bi-weekly releases to 3–4 deployments per day.",
  },
  {
    metric: "82%",
    outcome: "Lift in conversion rates",
    context: "NLP/ML-driven search optimization and personalization for a platform serving 25M+ visits per month.",
  },
  {
    metric: "32%",
    outcome: "OpEx cut while revenue grew 18%",
    context: "Global platform modernization handling 65% of worldwide music distribution. Cost down, revenue up.",
  },
];

export default function ProofPoints() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-surface" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(47,133,90,0.06)_0%,_transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            What changes after we work together
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            Every engagement is measured by what it leaves behind: faster teams, lower costs,
            and organizations that don&apos;t need us anymore.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured case study */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="lg:row-span-2 p-8 rounded-2xl border border-border-subtle bg-background"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal/20 bg-teal/5 mb-6">
              <span className="text-[10px] font-medium text-teal-light uppercase tracking-wider">Featured</span>
            </div>
            <h3 className="text-xl font-bold mb-3">
              PE-Backed Healthcare: Stabilized for Transaction
            </h3>
            <p className="text-sm text-muted leading-relaxed mb-4">
              A PE-backed healthcare technology company needed to stabilize a fragmented 103-person
              engineering org, reduce costs, and modernize their platform — all under board pressure
              to prepare for sale. We consolidated 11 siloed teams into 4 domain-driven squads,
              migrated to cloud-native infrastructure, and delivered the operational discipline
              PE governance demanded.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold font-mono text-gradient-teal">47%</span>
                <span className="text-sm text-muted-foreground">reduction in OpEx</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold font-mono text-gradient-teal">{">"}75%</span>
                <span className="text-sm text-muted-foreground">less downtime</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold font-mono text-gradient-teal">87%</span>
                <span className="text-sm text-muted-foreground">roadmap predictability (from &lt;50%)</span>
              </div>
            </div>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-sm font-medium text-teal-light hover:text-teal transition-colors"
            >
              View all case studies
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Metric cards */}
          {metrics.map((point, i) => (
            <motion.div
              key={point.metric + point.outcome}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (i + 1) * 0.08 }}
              className="p-6 rounded-xl border border-border-subtle bg-background hover:border-border transition-colors"
            >
              <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-gradient-teal mb-2">
                {point.metric}
              </div>
              <div className="text-sm font-medium text-foreground mb-2">
                {point.outcome}
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                {point.context}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
