"use client";

import { motion } from "framer-motion";

const beliefs = [
  {
    wrong: "Bring in an outside team to \"fix\" things",
    right: "Embed with the existing team and evolve together",
  },
  {
    wrong: "Reorganize around a framework from a whitepaper",
    right: "Redesign around the actual work your teams do",
  },
  {
    wrong: "Create dependency on consultants for ongoing delivery",
    right: "Transfer every skill, process, and decision to your people",
  },
  {
    wrong: "Treat engineers as interchangeable resources",
    right: "Invest in the people who know your domain best",
  },
  {
    wrong: "Announce the reorg and expect people to adapt",
    right: "Structured change management from day one — stakeholder alignment, communication cadence, adoption measurement",
  },
];

export default function TransformPhilosophy() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Why most transformations fail
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            They fail because they&apos;re designed to benefit the people running
            them, not the people living them. We believe the organizations that
            succeed are the ones that invest in their existing teams — not replace
            them.
          </p>
        </motion.div>

        {/* Belief pairs */}
        <div className="space-y-4">
          {beliefs.map((belief, i) => (
            <motion.div
              key={belief.right}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {/* Wrong way */}
              <div className="p-5 rounded-xl border border-border-subtle bg-surface">
                <div className="text-xs font-mono text-muted-foreground/60 uppercase tracking-wider mb-2">
                  The pattern
                </div>
                <p className="text-sm text-muted-foreground line-through decoration-muted-foreground/30">
                  {belief.wrong}
                </p>
              </div>

              {/* Right way */}
              <div className="p-5 rounded-xl border border-teal/15 bg-teal/[0.03]">
                <div className="text-xs font-mono text-teal-light/60 uppercase tracking-wider mb-2">
                  Our approach
                </div>
                <p className="text-sm text-teal-light font-medium">
                  {belief.right}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Through-line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 max-w-2xl"
        >
          <p className="text-lg text-muted italic leading-relaxed">
            &ldquo;Self-sufficiency isn&apos;t the exit strategy. It&apos;s the
            design principle. Every engagement we take is built around the goal of
            making ourselves unnecessary.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
