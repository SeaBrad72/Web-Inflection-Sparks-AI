"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  Workflow,
  Code2,
  Sparkles,
  Bot,
  Search,
  Layers,
  Zap,
  GitBranch,
} from "lucide-react";

const modes = [
  {
    id: "products",
    icon: Cpu,
    label: "Mode 01",
    title: "AI in your products",
    tagline: "Intelligent features your customers experience",
    description:
      "We design and build AI capabilities that become core to your product — not gimmicks bolted onto the side. From recommendation engines to natural language interfaces, we ship features that drive measurable business outcomes.",
    capabilities: [
      { icon: Sparkles, text: "LLM integration & prompt engineering" },
      { icon: Search, text: "RAG pipelines & semantic search" },
      { icon: Bot, text: "Conversational AI & intelligent agents" },
      { icon: Layers, text: "ML model selection, fine-tuning & deployment" },
    ],
    proof: {
      metric: "82%",
      description: "conversion lift from NLP/ML integration",
      context: "Whitepages — 25M+ monthly visits",
      narrative:
        "Search was the product. We rebuilt the core search pipeline with NLP and ML models that understood intent, not just keywords — turning a commodity directory into an intelligent identity platform.",
    },
    accent: "teal",
  },
  {
    id: "operations",
    icon: Workflow,
    label: "Mode 02",
    title: "AI in your operations",
    tagline: "Workflow automation that compounds",
    description:
      "The biggest ROI from AI often isn't customer-facing. We build intelligent internal tools, automated workflows, and copilot experiences that multiply your team's output without multiplying headcount.",
    capabilities: [
      { icon: Zap, text: "Intelligent workflow automation" },
      { icon: Bot, text: "Internal copilots & AI assistants" },
      { icon: Layers, text: "Data pipeline design & optimization" },
      { icon: Search, text: "Knowledge base & document intelligence" },
    ],
    proof: {
      metric: "9%",
      description: "increase in monthly revenue per vehicle",
      context: "BMW / ReachNow — ML-driven fleet intelligence",
      narrative:
        "ML models for demand forecasting and dynamic repositioning didn't just cut costs — they put vehicles where customers needed them. Revenue per vehicle climbed while support calls dropped from 1:7 to fewer than 1:32 reservations.",
    },
    accent: "teal",
  },
  {
    id: "methodology",
    icon: Code2,
    label: "Mode 03",
    title: "AI as your development methodology",
    tagline: "The way software gets built has changed",
    description:
      "This is the shift most organizations haven't made yet. AI isn't just something you build — it's how you build. Your engineers focus on architecture, business logic, and code review while AI handles the repetitive work: generating boilerplate, writing tests, managing deployments. It's not about replacing developers — it's about freeing them to do the work that actually requires judgment. Teams that adopt this methodology ship 3–4x faster with higher quality.",
    capabilities: [
      { icon: GitBranch, text: "Agentic development workflows" },
      { icon: Bot, text: "AI-assisted code generation & review" },
      { icon: Zap, text: "Intelligent CI/CD & automated testing" },
      { icon: Layers, text: "Platform modernization for AI-native development" },
    ],
    proof: {
      metric: "3–4x",
      description: "release velocity — from bi-weekly to daily",
      context: "INgrooves / UMG — 175-person engineering org",
      narrative:
        "175 engineers, siloed teams, bi-weekly releases. We restructured the org around product-aligned squads, introduced CI/CD and automated testing, and transformed how the entire organization ships software.",
    },
    accent: "teal",
  },
];

export default function BuildModes() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Three ways AI transforms{" "}
            <span className="text-gradient-teal">what you build</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            Most organizations think about AI as a product feature. The real
            advantage comes when it&apos;s embedded across products, operations,
            and the engineering process itself.
          </p>
        </motion.div>

        {/* Mode cards — full width, stacked */}
        <div className="space-y-8">
          {modes.map((mode, i) => (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-border-subtle bg-surface p-8 lg:p-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Left: content — 3 cols */}
                <div className="lg:col-span-3">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-teal/10 text-teal-light">
                      <mode.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      {mode.label}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{mode.title}</h3>
                  <p className="text-sm text-teal-light font-medium mb-3">
                    {mode.tagline}
                  </p>
                  <p className="text-sm text-muted leading-relaxed mb-6">
                    {mode.description}
                  </p>

                  {/* Capabilities */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {mode.capabilities.map((cap) => (
                      <div
                        key={cap.text}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <cap.icon className="h-4 w-4 text-teal/60 mt-0.5 flex-shrink-0" />
                        {cap.text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: proof point — 2 cols */}
                <div className="lg:col-span-2 flex items-center">
                  <div className="w-full p-6 rounded-xl border border-teal/10 bg-teal/[0.03]">
                    <div className="text-4xl sm:text-5xl font-bold text-gradient-teal mb-2">
                      {mode.proof.metric}
                    </div>
                    <div className="text-sm text-muted mb-1">
                      {mode.proof.description}
                    </div>
                    <div className="text-xs text-muted-foreground mb-3">
                      {mode.proof.context}
                    </div>
                    <p className="text-xs text-muted-foreground/70 leading-relaxed border-t border-teal/10 pt-3">
                      {mode.proof.narrative}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
