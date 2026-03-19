"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background glow */}
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
            Your competitors are already restructuring for AI.
          </h2>
          <p className="text-lg text-muted leading-relaxed mb-4 max-w-2xl mx-auto">
            The organizations that move now will define the next decade.
            The ones that wait will spend it catching up.
          </p>
          <p className="text-sm text-muted-foreground mb-10 max-w-xl mx-auto">
            Whether you&apos;re a CEO evaluating your AI strategy, a CTO looking for an
            AI transformation partner, a board assessing technology risk, or a PE firm
            doing due diligence, we should talk.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-teal text-white font-medium hover:bg-teal-light transition-all hover:shadow-lg hover:shadow-teal/20"
            >
              Start the Conversation
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="https://calendly.com/inflectionsparks/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border border-border text-muted hover:text-foreground hover:border-muted-foreground transition-all"
            >
              <Calendar className="h-4 w-4" />
              Book an AI Readiness Call
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
