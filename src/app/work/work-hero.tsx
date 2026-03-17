"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

export default function WorkHero() {
  return (
    <section className="relative min-h-[auto] md:min-h-[70vh] flex items-start md:items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,_rgba(47,133,90,0.25)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-32 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal/20 bg-teal/5 mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
            <span className="text-xs font-medium text-teal-light tracking-wide">
              Work
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1] mb-6"
          >
            Results from the inside.{" "}
            <span className="text-gradient-teal">Not a slide deck.</span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted max-w-2xl leading-relaxed mb-10"
          >
            Every engagement here started with an organization that needed to
            change — and ended with teams that owned the outcome. Here&apos;s
            what that looks like in practice.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-teal text-white font-medium hover:bg-teal-light transition-all hover:shadow-lg hover:shadow-teal/20"
            >
              Start the Conversation
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="https://calendly.com/inflectionsparksolutions/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border text-muted hover:text-foreground hover:border-muted-foreground transition-all"
            >
              <Calendar className="h-4 w-4" />
              Book a Call
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
