"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Target,
  Map,
  Users,
  Compass,
  Scale,
} from "lucide-react";

const offerings = [
  {
    icon: Compass,
    title: "Fractional CTO / CAIO / CPO",
    description:
      "Executive-level technology leadership without the full-time overhead. Whether you need a full interim executive or a specialized AI leader working alongside your existing CTO, we adapt to your leadership structure and drive execution across engineering, product, and AI.",
  },
  {
    icon: Target,
    title: "AI Strategy & Roadmap",
    description:
      "Cut through the noise. We assess your AI readiness, identify high-impact use cases, and build a strategic roadmap that connects AI investments to business outcomes — not a slide deck that collects dust.",
  },
  {
    icon: Scale,
    title: "AI Governance & Compliance",
    description:
      "Responsible AI isn't optional — it's a competitive advantage. We establish governance councils, compliance frameworks (NIST AI RMF, EU AI Act), bias audits, and model risk management that let you innovate at speed without regulatory exposure.",
  },
  {
    icon: Map,
    title: "Product & Technology Roadmap",
    description:
      "Align your technology investments with business outcomes. We build roadmaps that your board can understand and your engineering team can execute — with AI woven into the strategy, not bolted on.",
  },
  {
    icon: Users,
    title: "Board & Executive Advisory",
    description:
      "Translate technical complexity into board-level clarity. We advise CEOs, COOs, and boards on AI opportunities, technology risk, vendor selection, and organizational readiness.",
  },
  {
    icon: Shield,
    title: "Technology Due Diligence",
    description:
      "For boards and investors evaluating technology assets. We assess architecture, team capability, technical debt, AI readiness, and scalability — and deliver an honest picture, not a sales pitch.",
  },
];

export default function LeadOfferings() {
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
            Fractional CTO, CAIO &amp; CPO for the{" "}
            <span className="text-gradient-teal">AI era</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            Not another consultant with a slide deck. We take ownership of your
            technology strategy and stay accountable for results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerings.map((offering, i) => (
            <motion.div
              key={offering.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-6 rounded-2xl border border-border-subtle bg-surface hover:border-border transition-colors"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-teal/10 text-teal-light mb-4">
                <offering.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold mb-2">{offering.title}</h3>
              <p className="text-sm text-muted leading-relaxed">
                {offering.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
