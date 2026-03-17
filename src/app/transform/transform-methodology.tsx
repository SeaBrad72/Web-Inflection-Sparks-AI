"use client";

import { motion } from "framer-motion";
import { Search, Layers, GraduationCap, Rocket } from "lucide-react";

const phases = [
  {
    icon: Search,
    phase: "Phase 01",
    title: "Diagnose",
    description:
      "We assess your engineering organization's structure, processes, talent, and AI readiness. Not with a checklist — by sitting with your teams, understanding how work actually flows, and identifying what's blocking velocity and quality.",
    outcomes: [
      "Organizational capability assessment",
      "Process and workflow mapping",
      "AI readiness evaluation across 6 dimensions",
      "Change readiness assessment and stakeholder alignment",
      "Prioritized transformation roadmap",
    ],
  },
  {
    icon: Layers,
    phase: "Phase 02",
    title: "Redesign",
    description:
      "We restructure teams, processes, and workflows based on what we found — not on a template. This means rethinking team topology, introducing AI-native development practices, and redesigning how decisions get made.",
    outcomes: [
      "Team structure and ownership redesign",
      "Agile-to-Agentic process transition — AI-assisted workflows that replace manual handoffs",
      "Structured change management and communication plan",
      "DevSecOps and CI/CD modernization",
      "Decision-making and governance frameworks",
    ],
  },
  {
    icon: GraduationCap,
    phase: "Phase 03",
    title: "Upskill & Transfer",
    description:
      "Knowledge transfer isn't a final-week checkbox. From day one, we're working alongside your engineers, explaining decisions, pairing on code, and building their capability. By this phase, we're formalizing what they've already been learning.",
    outcomes: [
      "Hands-on training in AI-native workflows",
      "Architecture decision records and documentation",
      "Team leads coaching and mentorship",
      "Runbooks and operational playbooks",
    ],
  },
  {
    icon: Rocket,
    phase: "Phase 04",
    title: "Self-Sufficient",
    description:
      "You don't need us anymore — and that's the point. Your teams own the strategy, the processes, the code, and the methodology. After handoff, we remain available for quarterly advisory and strategic check-ins — on your terms, not ours.",
    outcomes: [
      "Full team ownership of all systems and processes",
      "Measured improvement in velocity, quality, and morale",
      "Advisory relationship for ongoing innovation",
      "Organization positioned for the next platform shift",
    ],
  },
];

export default function TransformMethodology() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            The methodology
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            Four phases, one through-line: every phase is designed to transfer
            capability to your team, not accumulate it on ours.
          </p>
        </motion.div>

        {/* Phases */}
        <div className="space-y-6">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-border-subtle bg-surface p-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: description */}
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${
                        i === 3
                          ? "bg-orange/10 text-orange"
                          : "bg-teal/10 text-teal-light"
                      }`}
                    >
                      <phase.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      {phase.phase}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{phase.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {phase.description}
                  </p>
                </div>

                {/* Right: outcomes */}
                <div>
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Outcomes
                  </div>
                  <ul className="space-y-2">
                    {phase.outcomes.map((outcome) => (
                      <li
                        key={outcome}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span
                          className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${
                            i === 3 ? "bg-orange/50" : "bg-teal/50"
                          }`}
                        />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-12 p-6 rounded-2xl border border-border-subtle bg-surface"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-shrink-0 text-2xl sm:text-3xl font-bold text-gradient-teal">
              4–9 months
            </div>
            <div>
              <p className="text-sm text-muted leading-relaxed">
                <span className="text-foreground font-medium">Typical engagement timeline.</span>{" "}
                Most transformations reach self-sufficiency within 4–9 months,
                depending on org size and scope. After that, advisory is available
                on a lightweight, as-needed basis.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
