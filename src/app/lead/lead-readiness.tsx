"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  Heart,
  GraduationCap,
  Package,
  Shield,
  Radar,
} from "lucide-react";

const dimensions = [
  {
    icon: Cpu,
    title: "Technology",
    description: "Modern infrastructure, unified data, DevSecOps, and observability",
  },
  {
    icon: Heart,
    title: "Culture & Change",
    description: "Psychological safety, experimentation mindset, cross-functional collaboration",
  },
  {
    icon: GraduationCap,
    title: "Workforce & Leadership",
    description: "AI-fluent leadership, reskilling programs, internal talent mobility",
  },
  {
    icon: Package,
    title: "Product & Business Model",
    description: "AI-powered offerings, rapid prototyping, adaptive pricing models",
  },
  {
    icon: Shield,
    title: "Governance & Risk",
    description: "NIST/EU AI Act compliance, ethics frameworks, model auditability",
  },
  {
    icon: Radar,
    title: "Strategic Signals",
    description: "Competitive benchmarking, weak-signal scanning, scenario planning",
  },
];

export default function LeadReadiness() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,_rgba(47,133,90,0.08)_0%,_transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal/20 bg-teal/5 mb-6">
            <span className="text-xs font-medium text-teal-light tracking-wide">
              AI Readiness Assessment
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            95% of AI pilots fail to scale.{" "}
            <span className="text-gradient-teal">Readiness is the difference.</span>
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            Our Six-Dimension Readiness Framework evaluates your organization
            across every factor that determines whether AI initiatives succeed or
            stall. You get a clear picture of where you are, where the gaps are, and
            a prioritized path forward.
          </p>
        </motion.div>

        {/* Six dimensions grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {dimensions.map((dim, i) => (
            <motion.div
              key={dim.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-start gap-4 p-5 rounded-xl border border-teal/10 bg-teal/[0.02]"
            >
              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-teal/10 text-teal-light flex items-center justify-center">
                <dim.icon className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold mb-1">{dim.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {dim.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stat + CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 rounded-2xl border border-border-subtle bg-surface"
        >
          <div className="max-w-lg">
            <p className="text-sm text-muted leading-relaxed">
              <span className="text-foreground font-medium">Score below 3 in any dimension?</span>{" "}
              That&apos;s your transformation lever. The assessment gives your
              leadership team a shared language for where to focus and why.
            </p>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-teal text-white text-sm font-medium hover:bg-teal-light transition-all hover:shadow-lg hover:shadow-teal/20 whitespace-nowrap"
          >
            Request an Assessment
          </a>
        </motion.div>
      </div>
    </section>
  );
}
