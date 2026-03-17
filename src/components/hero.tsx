"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

function TerminalBlock({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      {children}
    </motion.div>
  );
}

function TerminalLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      className="text-muted-foreground"
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-[auto] md:min-h-[90vh] flex items-start md:items-center overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,_rgba(47,133,90,0.35)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_85%_40%,_rgba(47,133,90,0.12)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_80%,_rgba(249,115,22,0.08)_0%,_transparent_45%)]" />
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 right-[10%] w-[600px] h-[600px] rounded-full bg-teal/[0.12] blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 left-[5%] w-[400px] h-[400px] rounded-full bg-orange/[0.06] blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal/20 bg-teal/5 mb-8"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
              <span className="text-xs font-medium text-teal-light tracking-wide">
                Fractional CTO &middot; AI Strategy &middot; Engineering Leadership
              </span>
            </motion.div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1] mb-6"
            >
              We don&apos;t sell AI strategy&nbsp;decks.{" "}
              <span className="text-gradient-teal">
                We embed with your teams
              </span>
              , ship your products, and leave you{" "}
              <span className="text-gradient-orange">self&#8209;sufficient</span>.
            </h1>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted max-w-xl leading-relaxed mb-10"
            >
              Fractional leadership. AI engineering. Organizational transformation.
              We work from the inside out so you don&apos;t just adopt AI, you&apos;re defined by&nbsp;it.
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
                Book an AI Readiness Call
              </a>
            </motion.div>
          </div>

          {/* Right: Terminal — animated engagement log */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block relative"
          >
            <div className="relative rounded-xl border border-border bg-[#0c0c0d] shadow-2xl shadow-black/50 overflow-hidden">
              {/* Terminal chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border-subtle bg-surface/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="ml-2 text-[11px] font-mono text-muted-foreground">
                  inflectionsparks — engagement.log
                </span>
              </div>

              {/* Terminal content */}
              <div className="p-5 font-mono text-[13px] leading-relaxed space-y-4">
                {/* Command 1 */}
                <TerminalBlock delay={0.6}>
                  <span className="text-teal-light">$</span>{" "}
                  <span className="text-foreground">inflectionsparks diagnose</span>{" "}
                  <span className="text-muted-foreground">--org acme-health</span>
                </TerminalBlock>

                <div className="space-y-1.5 pl-2">
                  <TerminalLine delay={1.2}>→ Assessing AI readiness .............. <span className="text-teal-light">done</span></TerminalLine>
                  <TerminalLine delay={1.8}>→ Mapping engineering structure ........ <span className="text-teal-light">done</span></TerminalLine>
                  <TerminalLine delay={2.4}>→ Identifying bottlenecks ............. <span className="text-orange">3 found</span></TerminalLine>
                  <TerminalLine delay={3.0}>→ Recommendation: <span className="text-teal-light">restructure</span> + <span className="text-teal-light">embed</span></TerminalLine>
                </div>

                {/* Divider */}
                <TerminalBlock delay={3.6}>
                  <span className="text-border">{'─'.repeat(44)}</span>
                </TerminalBlock>

                {/* Command 2 */}
                <TerminalBlock delay={4.0}>
                  <span className="text-teal-light">$</span>{" "}
                  <span className="text-foreground">inflectionsparks engage</span>{" "}
                  <span className="text-muted-foreground">--mode build</span>
                </TerminalBlock>

                <div className="space-y-1.5 pl-2">
                  <TerminalLine delay={4.6}>→ Phase 1: Platform architecture ....... <span className="text-teal-light">✓</span></TerminalLine>
                  <TerminalLine delay={5.2}>→ Phase 2: AI pipeline deployed ........ <span className="text-teal-light">✓</span></TerminalLine>
                  <TerminalLine delay={5.8}>→ Phase 3: Team trained, handoff ....... <span className="text-teal-light">✓</span></TerminalLine>
                </div>

                {/* Status */}
                <TerminalBlock delay={6.4}>
                  <span className="text-teal-light">✓</span>{" "}
                  <span className="text-foreground font-medium">Status:</span>{" "}
                  <span className="text-gradient-orange font-medium">self-sufficient</span>
                </TerminalBlock>

                {/* Blinking cursor */}
                <TerminalBlock delay={7.0}>
                  <span className="text-teal-light">$</span>{" "}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    className="inline-block w-2 h-4 bg-teal-light/70 align-middle"
                  />
                </TerminalBlock>
              </div>
            </div>

            {/* Glow behind terminal */}
            <div className="absolute -inset-4 -z-10 rounded-2xl bg-teal/[0.04] blur-xl" />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
