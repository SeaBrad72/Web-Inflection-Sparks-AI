"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const principles = [
  {
    number: "01",
    title: "We build alongside your team, not instead of them",
    description:
      "Every line of code, every architecture decision, every deployment — your engineers are in the room. When we leave, they own everything.",
  },
  {
    number: "02",
    title: "Production-grade from day one",
    description:
      "No prototypes that never ship. We build with testing, CI/CD, monitoring, and security baked in from the first commit. What we build goes to production.",
  },
  {
    number: "03",
    title: "AI-native, not AI-adjacent",
    description:
      "We don't bolt AI onto existing architecture. We design systems where AI is a first-class citizen — from data pipeline to deployment to monitoring.",
  },
  {
    number: "04",
    title: "The handoff is the product",
    description:
      "Documentation, training, architecture decisions recorded, runbooks written. The real deliverable isn't code — it's a team that can evolve the system without us.",
  },
];

export default function BuildMethodology() {
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
            How we build
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            The technology matters. But the way we work with your team matters
            more. These aren&apos;t aspirations — they&apos;re non-negotiables.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {principles.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-6 rounded-2xl border border-border-subtle bg-surface"
            >
              <span className="text-xs font-mono text-teal-light/60 mb-3 block">
                {p.number}
              </span>
              <h3 className="text-lg font-bold mb-2">{p.title}</h3>
              <p className="text-sm text-muted leading-relaxed">
                {p.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bridge to Transform */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-2xl border border-border-subtle bg-surface-elevated"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-lg font-bold mb-2">
                Building is only half the equation.
              </p>
              <p className="text-sm text-muted max-w-lg">
                The organizations that win don&apos;t just build AI products — they
                restructure their teams and processes to sustain the pace. That&apos;s
                where Transform comes in.
              </p>
            </div>
            <Link
              href="/transform"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-orange/20 text-orange hover:bg-orange/5 transition-all whitespace-nowrap"
            >
              Explore Transform
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
