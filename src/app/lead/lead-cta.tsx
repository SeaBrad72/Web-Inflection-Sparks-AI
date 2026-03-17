"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Calendar } from "lucide-react";
import Link from "next/link";

export default function LeadCTA() {
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
            The right leader changes everything.
          </h2>
          <p className="text-lg text-muted leading-relaxed mb-4 max-w-2xl mx-auto">
            Whether you&apos;re navigating an AI transformation, preparing for a
            transaction, or building a technology team that can execute — the first
            step is the same.
          </p>
          <p className="text-sm text-muted-foreground mb-10 max-w-xl mx-auto">
            No pitch decks. No proposals. Just a conversation about where you are
            and what&apos;s possible.
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
              href="https://calendly.com/inflectionsparksolutions/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border border-border text-muted hover:text-foreground hover:border-muted-foreground transition-all"
            >
              <Calendar className="h-4 w-4" />
              Book a Strategy Call
            </a>
          </div>

          <Link
            href="/work"
            className="group inline-flex items-center gap-1.5 mt-8 text-sm text-muted-foreground hover:text-teal-light transition-colors"
          >
            See how we&apos;ve led transformations before
            <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
