"use client";

import { motion } from "framer-motion";
import { TrendingDown, ShieldCheck, BarChart3, ArrowRight } from "lucide-react";

const peCapabilities = [
  {
    icon: ShieldCheck,
    title: "Pre-Transaction Due Diligence",
    description:
      "Independent technology assessment for acquisition targets. We evaluate architecture, team capability, technical debt, AI maturity, and scalability risk — giving you an unvarnished picture before you commit capital.",
  },
  {
    icon: TrendingDown,
    title: "Post-Acquisition Stabilization",
    description:
      "When a portfolio company's technology is the risk, we embed as interim technology leadership. We stabilize operations, restructure teams, and build the roadmap that drives the value creation plan.",
  },
  {
    icon: BarChart3,
    title: "Portfolio Technology Strategy",
    description:
      "Ongoing advisory across your portfolio. We identify shared infrastructure opportunities, AI adoption strategies, and technology-driven growth levers across multiple companies.",
  },
];

const peMetrics = [
  { value: "47%", label: "OpEx reduction under PE governance", context: "Matrix Medical" },
  { value: "87%", label: "Roadmap predictability (from <50%)", context: "Matrix Medical" },
  { value: "30 days", label: "Full contractor offboarding — zero disruption", context: "26 engineers" },
  { value: "61/63", label: "Engineers successfully rebadged to vendor", context: "PE cost initiative" },
];

export default function LeadPE() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,_rgba(249,115,22,0.06)_0%,_transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange/20 bg-orange/5 mb-6">
            <span className="text-xs font-medium text-orange tracking-wide">
              For PE Firms & Portfolio Companies
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Technology leadership that{" "}
            <span className="text-gradient-orange">protects your investment</span>
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            Private equity moves fast. Technology problems don&apos;t wait for your
            next board meeting. We&apos;ve led technology through two PE-backed
            transformations — stabilizing operations, cutting costs, and positioning
            companies for successful transactions.
          </p>
        </motion.div>

        {/* PE capabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {peCapabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-orange/10 bg-surface"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-orange/10 text-orange mb-4">
                <cap.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold mb-2">{cap.title}</h3>
              <p className="text-sm text-muted leading-relaxed">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* PE metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-6">
            Results from PE-backed engagements
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {peMetrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="text-3xl sm:text-4xl font-bold text-gradient-orange mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-muted leading-snug mb-1">
                  {metric.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {metric.context}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* PE-specific CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 p-8 rounded-2xl border border-orange/10 bg-surface"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">
                Evaluating a portfolio company&apos;s technology?
              </h3>
              <p className="text-sm text-muted max-w-lg">
                We provide confidential, independent technology assessments for PE
                firms and boards. No conflicts of interest — just an honest evaluation
                from someone who&apos;s been inside these transformations.
              </p>
            </div>
            <a
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-orange text-white font-medium hover:bg-orange-light transition-all hover:shadow-lg hover:shadow-orange/20 whitespace-nowrap"
            >
              Discuss Due Diligence
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
