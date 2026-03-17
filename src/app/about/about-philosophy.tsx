"use client";

import { motion } from "framer-motion";
import { Users, Target, Shield, Zap } from "lucide-react";

const principles = [
  {
    icon: Target,
    title: "Strategy without execution is theater",
    description:
      "Execution without strategy is chaos. We do both — and we stay accountable for results, not deliverables.",
  },
  {
    icon: Users,
    title: "Transformation starts with people",
    description:
      "Technology doesn't transform businesses. Aligned people, clear strategy, and committed leadership do. The platform comes second.",
  },
  {
    icon: Zap,
    title: "AI is leverage, not magic",
    description:
      "People, culture, and vision complete the equation. We build AI into organizations that are ready for it — and get the ones that aren't ready there first.",
  },
  {
    icon: Shield,
    title: "Self-sufficiency is the measure of success",
    description:
      "If you still need us a year later, we failed. Every engagement is designed to transfer capability to your team — not accumulate it on ours.",
  },
];

export default function AboutPhilosophy() {
  return (
    <section className="relative py-24 lg:py-32 border-t border-border-subtle">
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
            How we work
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            We work <em>through</em> your organization, not around it. We
            supplement where you need capacity, upskill where you need
            capability, and design every engagement for the day you don&apos;t
            need us anymore.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principles.map((principle, i) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-6 rounded-2xl border border-border-subtle bg-background"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-teal/10 text-teal-light mb-4">
                <principle.icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold mb-2">{principle.title}</h3>
              <p className="text-sm text-muted leading-relaxed">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Certifications & credentials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          <div className="p-6 rounded-xl border border-border-subtle bg-background text-center">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Certifications
            </div>
            <div className="space-y-1 text-sm text-muted">
              <p>Certified Scrum Master (CSM)</p>
              <p>Certified Scrum Product Owner (CSPO)</p>
              <p>Advanced Certified ScrumMaster (A-CSM)</p>
            </div>
          </div>
          <div className="p-6 rounded-xl border border-border-subtle bg-background text-center">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Languages
            </div>
            <div className="space-y-1 text-sm text-muted">
              <p>English (Native)</p>
              <p>Spanish (Working)</p>
              <p>German (Working)</p>
            </div>
          </div>
          <div className="p-6 rounded-xl border border-border-subtle bg-background text-center">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Leadership Scope
            </div>
            <div className="space-y-1 text-sm text-muted">
              <p>$20M+ budgets managed</p>
              <p>200+ person orgs built</p>
              <p>6 continents, distributed teams</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
