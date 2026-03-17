"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function BuildCTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,_rgba(47,133,90,0.1)_0%,_transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Ready to build something that matters?
          </h2>
          <p className="text-lg text-muted leading-relaxed mb-10 max-w-2xl mx-auto">
            Whether it&apos;s an AI-powered product, an automated workflow, or a
            complete platform modernization — let&apos;s talk about what you&apos;re
            trying to build and how to get there.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-teal text-white font-medium hover:bg-teal-light transition-all hover:shadow-lg hover:shadow-teal/20"
            >
              Discuss Your Project
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="/transform"
              className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border border-border text-muted hover:text-foreground hover:border-muted-foreground transition-all"
            >
              See Our Methodology
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
