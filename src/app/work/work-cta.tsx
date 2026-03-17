"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function WorkCTA() {
  return (
    <section className="relative py-24 lg:py-32 border-t border-border-subtle">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,_rgba(47,133,90,0.15)_0%,_transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Your transformation could be next.
          </h2>
          <p className="text-lg text-muted mb-10">
            Every engagement starts with a conversation about where you are and
            where you need to be. No pitch decks, no templated proposals — just
            an honest assessment and a clear path forward.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-teal text-white font-medium hover:bg-teal-light transition-all hover:shadow-lg hover:shadow-teal/20"
            >
              Discuss Your Transformation
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="/lead"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border text-muted hover:text-foreground hover:border-muted-foreground transition-all"
            >
              Explore Our Services
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
