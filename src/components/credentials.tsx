"use client";

import { motion } from "framer-motion";

const industries = [
  "Healthcare",
  "Automotive",
  "Entertainment",
  "Financial Services",
  "Identity & SaaS",
  "Manufacturing",
  "Mobility",
  "Telecom",
];

export default function Credentials() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Forged across{" "}
            <span className="text-gradient-teal">eight industries</span> and{" "}
            three decades of platform shifts.
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            The methodology behind InflectionSparks wasn&apos;t invented in a lab.
            It was built inside engineering organizations that had to transform
            or become irrelevant — from automotive IoT to music distribution to
            PE-backed healthcare.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Industries
          </div>
          <div className="flex flex-wrap gap-2">
            {industries.map((industry) => (
              <span
                key={industry}
                className="px-3 py-1.5 rounded-lg border border-teal/10 bg-teal/5 text-sm text-teal-light font-medium"
              >
                {industry}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
