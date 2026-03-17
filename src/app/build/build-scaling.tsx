"use client";

import { motion } from "framer-motion";
import {
  Target,
  Zap,
  BarChart3,
  Layers,
  Shield,
} from "lucide-react";

const steps = [
  {
    icon: Target,
    number: "01",
    title: "Identify Quick Wins",
    description:
      "We use an Impact x Complexity matrix to surface high-leverage pilots — focusing on areas with immediate, measurable value and manageable implementation risk.",
  },
  {
    icon: Zap,
    number: "02",
    title: "Prototype & Validate",
    description:
      "Rapid prototyping in 6-8 week cycles. We build for insight first, production second — testing assumptions with real users and real data before committing resources.",
  },
  {
    icon: BarChart3,
    number: "03",
    title: "Fund & Measure",
    description:
      "Phase-gate reviews with clear KPIs at every stage. Pilots that prove value get scaled. Pilots that don't get stopped — early, before they drain budget and credibility.",
  },
  {
    icon: Layers,
    number: "04",
    title: "Scale with MLOps",
    description:
      "Production-grade AI operations: CI/CD for models, automated retraining triggers, drift monitoring, model registries with version control, and end-to-end observability.",
  },
  {
    icon: Shield,
    number: "05",
    title: "Govern at Speed",
    description:
      "Security and compliance baked into every deployment — not bolted on at the end. Automated bias audits, compliance-as-code, risk-scored model inventories, and rollback protocols.",
  },
];

export default function BuildScaling() {
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
            From pilot to{" "}
            <span className="text-gradient-teal">production</span>
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            Most enterprise AI pilots never leave the lab. The gap isn&apos;t
            technology — it&apos;s the absence of a structured path from experiment
            to production. We close that gap.
          </p>
        </motion.div>

        {/* Steps — connected vertical layout */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-0 bottom-0 left-[19px] w-px bg-gradient-to-b from-teal/30 via-teal/10 to-transparent" />

          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative flex gap-6"
              >
                {/* Step indicator */}
                <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-lg bg-teal/10 text-teal-light flex items-center justify-center">
                  <step.icon className="h-5 w-5" />
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      Step {step.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stat callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-12 p-6 rounded-2xl border border-border-subtle bg-surface"
        >
          <p className="text-sm text-muted leading-relaxed">
            <span className="text-foreground font-medium">
              MIT research (2025):
            </span>{" "}
            Organizations that partner externally for integrated, adaptive AI
            solutions succeed at twice the rate of internal builds (67% vs 33%).
            The barrier isn&apos;t technical — it&apos;s workflow integration,
            persistent learning, and disciplined scaling.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
