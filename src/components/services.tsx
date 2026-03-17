"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Compass, Wrench, RefreshCw } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Compass,
    title: "Lead",
    tagline: "Strategic leadership for the AI era",
    description:
      "Fractional CTO, CAIO, and CPO leadership for enterprise and PE-backed companies. We set your AI strategy, governance, and product roadmap, then stay to make sure it sticks.",
    capabilities: [
      "Fractional CTO / CAIO / CPO",
      "AI Strategy & Governance",
      "Product & Technology Roadmap",
      "Board & Executive Advisory",
      "PE Due Diligence & Portfolio Tech Strategy",
      "AI Readiness Assessment",
    ],
    href: "/lead",
    accent: "teal",
  },
  {
    icon: Wrench,
    title: "Build",
    tagline: "Products, platforms, and intelligent systems",
    description:
      "We design and build AI-embedded products, intelligent workflow automation, and modern software platforms. Always working alongside your teams.",
    capabilities: [
      "Product Design & Strategy",
      "AI-Embedded Products",
      "AI-Powered Workflows",
      "Software & Platform Development",
      "Platform Modernization",
    ],
    href: "/build",
    accent: "teal",
  },
  {
    icon: RefreshCw,
    title: "Transform",
    tagline: "Organizations built for what's next",
    description:
      "We restructure engineering and product orgs for the agentic era. Upskill your teams, modernize your processes, and design for self-sufficiency.",
    capabilities: [
      "Engineering & Product Org Redesign",
      "AI-Native Dev Methodology",
      "Team Upskilling & Adoption",
      "Self-Sufficiency by Design",
    ],
    href: "/transform",
    accent: "orange",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            What we do
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            Three pillars. One through-line: we work through your organization, not around it.
            Every engagement is designed to leave you stronger than we found you.
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={service.href}
                className="group block h-full p-8 rounded-2xl border border-border-subtle bg-surface hover:border-border hover:bg-surface-elevated transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-6 ${
                    service.accent === "orange"
                      ? "bg-orange/10 text-orange"
                      : "bg-teal/10 text-teal-light"
                  }`}
                >
                  <service.icon className="h-5 w-5" />
                </div>

                {/* Title */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
                </div>

                <p className="text-sm text-teal-light font-medium mb-3">{service.tagline}</p>
                <p className="text-sm text-muted leading-relaxed mb-6">{service.description}</p>

                {/* Capabilities */}
                <ul className="space-y-2">
                  {service.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${
                        service.accent === "orange" ? "bg-orange/50" : "bg-teal/50"
                      }`} />
                      {cap}
                    </li>
                  ))}
                </ul>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
