"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Linkedin } from "lucide-react";

export default function Founder() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-surface" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(47,133,90,0.06)_0%,_transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
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
                />
                {/* Dark overlay gradient at bottom for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              {/* Decorative border glow */}
              <div className="absolute -inset-px rounded-2xl border border-teal/10" />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Who you&apos;re working with
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
              Bradley James
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                I work with executives, boards, and PE firms who know they need to move on AI
                but aren&apos;t sure how to restructure their organizations to actually get there.
                The answer is never just technology. It&apos;s always people and process first.
              </p>
              <p>
                I&apos;ve led engineering at BMW, Sony, and Whitepages. I&apos;ve delivered 47% OpEx
                reductions under PE governance, cut costs 32% while growing revenue 18%, and
                scaled organizations from 7 to 200+ engineers across healthcare, mobility,
                entertainment, and SaaS.
              </p>
              <p>
                That&apos;s 30 years of building and rebuilding engineering organizations through
                every major platform shift — including two PE-backed transformations. Not from
                the sidelines. From inside the org, restructuring teams, modernizing platforms,
                and shipping products.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-sm font-medium text-teal-light hover:text-teal transition-colors"
              >
                Full background
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
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
    </section>
  );
}
