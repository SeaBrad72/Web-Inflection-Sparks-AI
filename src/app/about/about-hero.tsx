"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,_rgba(47,133,90,0.25)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Photo — 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="relative max-w-sm mx-auto lg:mx-0">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src="/images/bradley-james.jpeg"
                  alt="Bradley James, Founder of InflectionSparks.ai"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 384px, 320px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <div className="absolute -inset-px rounded-2xl border border-teal/10" />
            </div>
          </motion.div>

          {/* Bio — 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal/20 bg-teal/5 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
              <span className="text-xs font-medium text-teal-light tracking-wide">
                About
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              Bradley James
            </h1>
            <p className="text-sm font-medium text-teal-light mb-6">
              Founder, InflectionSparks.ai
            </p>

            <div className="space-y-4 text-muted leading-relaxed">
              <p className="text-lg">
                I&apos;ve spent three decades inside product &amp; engineering organizations
                during their most critical moments — the ones where the
                technology has shifted, the org hasn&apos;t caught up, and
                someone needs to go in and make it work.
              </p>
              <p>
                That&apos;s what I do. I embed with technology teams, rebuild
                how they work, modernize what they&apos;ve built, and leave them
                in a position to keep going without me. I&apos;ve done it at
                BMW, Sony, Whitepages, and Universal Music Group. I&apos;ve done
                it under PE governance with board-level accountability. And
                I&apos;ve done it through every major platform shift from SOA to
                cloud-native to AI.
              </p>
              <p>
                InflectionSparks exists because this work — the intersection of
                technology strategy, organizational redesign, and hands-on
                engineering leadership — is what I&apos;m built for. And because
                the AI shift is the biggest one yet.
              </p>
            </div>

            <div className="mt-8">
              <a
                href="https://www.linkedin.com/in/bpjames"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
