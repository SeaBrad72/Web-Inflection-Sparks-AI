"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    era: "Late 1990s",
    role: "Director, Product Development",
    company: "Qwest Communications",
    industry: "Telecom",
    shift: "Internet & Enterprise Data",
    highlight:
      "Built enterprise backbone services from negative revenue to $1B+ annually. Pioneered ATM/IP interworking, built Qwest's first data centers, and co-led European expansion with Royal Dutch Telecom.",
  },
  {
    era: "Early 2000s",
    role: "Senior Architect → Senior Leadership",
    company: "Sony Pictures Digital Entertainment",
    industry: "Entertainment",
    shift: "Physical → Digital Distribution",
    highlight:
      "Designed Sony's first global digital media supply chain — content ingestion, DRM, transcoding, and digital storefronts — before Netflix, YouTube, or iTunes existed. Generated $30M+ in new revenue.",
  },
  {
    era: "2010s",
    role: "VP Engineering & Product Development",
    company: "INgrooves / Universal Music Group",
    industry: "Music & Media",
    shift: "Monolith → Cloud-Native",
    highlight:
      "Unified 175 globally distributed engineers into a cohesive organization. Migrated an 11-year-old monolith to microservices. Introduced Agile across the entire company. 32% OpEx reduction, 95%+ retention.",
  },
  {
    era: "2016–2019",
    role: "VP Technology & Product",
    company: "BMW / ReachNow",
    industry: "Automotive & Mobility",
    shift: "Hardware → Software-Defined Mobility",
    highlight:
      "Rebuilt BMW's car-sharing platform, engineered IoT API gateways, deployed ML for fleet optimization (67% cost reduction). Positioned ReachNow as the technology hub for the BMW-Daimler joint venture.",
  },
  {
    era: "2019–2022",
    role: "VP Engineering & Data Strategy",
    company: "Whitepages",
    industry: "Identity & SaaS",
    shift: "Legacy → ML-Driven Platform",
    highlight:
      "Zero-downtime migration from Ruby/Python monoliths to cloud-native microservices. ML-driven 82% conversion lift. Rebuilt teams 170% during COVID-19. GDPR/CCPA compliance for 300M+ records.",
  },
  {
    era: "2023–2024",
    role: "VP Technology & Digital Transformation",
    company: "Matrix Medical Network",
    industry: "Healthcare (PE-Backed)",
    shift: "Legacy → Cloud-Native + AI Readiness",
    highlight:
      "Stabilized a 103-person healthcare technology org under PE governance. Consolidated 11 teams into 4 squads. 75% downtime reduction. Led contractor transition and rebadging of 61 engineers with zero disruption.",
  },
  {
    era: "2023–Present",
    role: "Founder",
    company: "InflectionSparks.ai",
    industry: "Cross-Industry",
    shift: "The AI Transformation",
    highlight:
      "Launched InflectionSparks to bring three decades of transformation experience to the biggest platform shift yet. Fractional CTO/CAIO leadership, AI strategy, and engineering org redesign — built for self-sufficiency.",
    current: true,
  },
];

export default function AboutJourney() {
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
            Three decades of{" "}
            <span className="text-gradient-teal">platform shifts</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            Every major technology transition follows the same pattern: the
            technology arrives, organizations scramble, and the ones with the
            right leadership and structure come out ahead.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 lg:left-8 top-0 bottom-0 w-px bg-border-subtle" />

          <div className="space-y-8">
            {timeline.map((entry, i) => (
              <motion.div
                key={entry.company}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="relative pl-12 lg:pl-20"
              >
                {/* Dot on timeline */}
                <div
                  className={`absolute left-2.5 lg:left-6.5 top-2 w-3 h-3 rounded-full border-2 ${
                    entry.current
                      ? "bg-teal border-teal shadow-[0_0_8px_rgba(47,133,90,0.5)]"
                      : "bg-background border-border"
                  }`}
                />

                <div
                  className={`p-6 rounded-xl border ${
                    entry.current
                      ? "border-teal/20 bg-teal/[0.03]"
                      : "border-border-subtle bg-surface"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      {entry.era}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-teal/10 text-teal-light font-medium">
                      {entry.shift}
                    </span>
                  </div>
                  <h3 className="text-base font-bold mb-1">{entry.company}</h3>
                  <p className="text-sm text-teal-light font-medium mb-3">
                    {entry.role}
                    <span className="text-muted-foreground font-normal">
                      {" "}
                      &middot; {entry.industry}
                    </span>
                  </p>
                  <p className="text-sm text-muted leading-relaxed">
                    {entry.highlight}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
