"use client";

import { motion } from "framer-motion";
import { Search, Rocket, Users, Flag } from "lucide-react";

const steps = [
  {
    icon: Search,
    phase: "Phase 01",
    title: "Diagnose",
    description:
      "We assess your AI readiness, engineering capabilities, and organizational structure. No generic frameworks. We find the real blockers.",
    detail:
      "Deliverables: AI readiness scorecard, technology & operations audit, 90-day roadmap.",
  },
  {
    icon: Rocket,
    phase: "Phase 02",
    title: "Embed & Build",
    description:
      "We join your teams, not replace them. We build alongside your people, ship real products, and establish new workflows in the process.",
    detail:
      "2–3 days/week embedded with your leadership, product, and engineering teams.",
  },
  {
    icon: Users,
    phase: "Phase 03",
    title: "Transfer & Upskill",
    description:
      "Knowledge transfer isn't an afterthought. We train your teams on what we've built, document everything, and hand over full ownership.",
    detail:
      "Workshops, decision frameworks, and hands-on coaching — your people own every process and system.",
  },
  {
    icon: Flag,
    phase: "Phase 04",
    title: "Self-Sufficient",
    description:
      "You don't need us anymore. That's the goal. We stay available for advisory, but your teams own the strategy, the operations, and the process.",
    detail:
      "Exit criteria: your teams operate independently, with playbooks, governance policies, and decision frameworks in place.",
  },
];

export default function Engagement() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            How an engagement works
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            Unlike traditional consultants who create dependency, every engagement is designed to end.
            We come in with a clear mandate, execute alongside your people, and leave when you&apos;re
            ready to run without us.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-teal/30 via-teal/10 to-orange/20" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                {/* Step indicator */}
                <div className="relative z-10 flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    i === 3 ? "bg-orange/10 text-orange" : "bg-teal/10 text-teal-light"
                  }`}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    {step.phase}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{step.description}</p>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed italic">{step.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
