"use client";

import { motion } from "framer-motion";

const caseStudies = [
  {
    company: "INgrooves / Universal Music Group",
    context: "175-person engineering org, 65% of global independent music distribution",
    challenge:
      "Siloed teams, bi-weekly releases, manual processes, and an engineering culture that couldn't keep pace with the market. Turnover exceeded 50% within two years — the organization was bleeding institutional knowledge faster than it could ship.",
    actions: [
      "Restructured engineering organization around product-aligned squads",
      "Opened a dedicated engineering hub, scaling to 65 engineers locally plus 60 globally",
      "Transitioned from waterfall-influenced processes to modern agile practices",
      "Built cross-functional collaboration between engineering, product, and data",
    ],
    results: [
      { metric: "95%+", label: "Annual retention (from ~50%)" },
      { metric: "32%", label: "OpEx reduction while revenue grew 18%" },
      { metric: "175", label: "Engineers unified across six continents" },
    ],
  },
  {
    company: "Whitepages",
    context: "Post-spinoff platform rebuild, 25M+ monthly visits",
    challenge:
      "Following a corporate split, Whitepages lost most of its engineering talent to the B2B spinoff. What remained were outdated Ruby and Python monoliths with severe technical debt, scalability issues, and declining conversion. Then COVID-19 hit mid-transformation.",
    actions: [
      "Led zero-downtime migration from legacy monoliths to cloud-native microservices",
      "Rebuilt and expanded engineering, QA, SRE, and product teams by 170%",
      "Deployed ML-driven personalization and conversion optimization platform",
      "Implemented GDPR/CCPA compliance frameworks protecting 300M+ user records",
    ],
    results: [
      { metric: "170%", label: "Team growth across North and South America" },
      { metric: "82%", label: "Increase in conversion rates" },
      { metric: "45%+", label: "Improvement in search relevance" },
    ],
  },
];

export default function TransformProof() {
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
            Proof it works
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            Two organizations. Different industries, different crises, same
            principle: rebuild around the people you have, not the people
            you wish you had.
          </p>
        </motion.div>

        <div className="space-y-8">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-border-subtle bg-surface p-8 lg:p-10"
            >
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">{study.company}</h3>
                <p className="text-sm text-teal-light">{study.context}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: challenge + actions */}
                <div>
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Challenge
                  </div>
                  <p className="text-sm text-muted leading-relaxed mb-6">
                    {study.challenge}
                  </p>

                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    What we did
                  </div>
                  <ul className="space-y-2">
                    {study.actions.map((action) => (
                      <li
                        key={action}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0 bg-teal/50" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: results */}
                <div className="flex items-center">
                  <div className="w-full space-y-6">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Results
                    </div>
                    {study.results.map((result) => (
                      <div key={result.label}>
                        <div className="text-3xl sm:text-4xl font-bold text-gradient-teal mb-1">
                          {result.metric}
                        </div>
                        <div className="text-sm text-muted">
                          {result.label}
                        </div>
                      </div>
                    ))}
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
