"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "We already have a CTO. How does this work?",
    answer:
      "Most of our engagements are alongside an existing CTO, not instead of one. We augment your leadership team with specialized AI transformation experience, help your CTO execute a broader mandate, and transfer knowledge so they're stronger when we leave. The goal is to make your existing leadership more effective — not to compete with them.",
  },
  {
    question: "How is this different from hiring a consulting firm?",
    answer:
      "Consulting firms deliver a strategy deck and leave. We embed with your teams, build the systems and processes that scale alongside your people, restructure your organization from the inside, and stay accountable for outcomes — not deliverables. We don't bill by the hour for recommendations. We're measured by what your team can do after we're gone.",
  },
  {
    question: "What does \"fractional\" actually mean?",
    answer:
      "Fractional means you get executive-level leadership at a fraction of the cost of a full-time hire. Depending on the engagement, that might be 2-3 days per week embedded with your team, or full-time for a focused transformation sprint. The structure adapts to what you need — not to a billing model.",
  },
  {
    question: "What happens in the first 30 days?",
    answer:
      "We diagnose. That means interviewing your engineering, product, and executive teams, auditing your technology stack, mapping your organizational structure, and identifying the real blockers — not the symptoms. By day 30, you have a clear-eyed assessment and a concrete transformation roadmap with priorities, timelines, and measurable outcomes.",
  },
  {
    question: "How long does a typical engagement last?",
    answer:
      "Most transformations run 4-9 months from diagnosis through self-sufficiency. Some focused engagements (technology due diligence, AI readiness assessments) are 2-4 weeks. The timeline depends on the scope — but every engagement is designed to end. We don't create dependency.",
  },
  {
    question: "Can you help if we're not sure what we need yet?",
    answer:
      "That's exactly where most conversations start. You know something needs to change — AI is moving fast, your engineering org isn't keeping up, or the board is asking questions you can't answer yet. A 30-minute call is enough to determine whether we're the right fit and what the next step would be.",
  },
];

function FAQItem({
  faq,
  index,
}: {
  faq: (typeof faqs)[0];
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-border-subtle"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left cursor-pointer group"
      >
        <span className="text-sm font-medium text-foreground group-hover:text-teal-light transition-colors">
          {faq.question}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-muted leading-relaxed pb-5">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left: header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Common questions
            </h2>
            <p className="text-lg text-muted">
              If you don&apos;t see your question here, that&apos;s what the
              conversation is for.
            </p>
          </motion.div>

          {/* Right: accordion */}
          <div className="lg:col-span-3">
            {faqs.map((faq, i) => (
              <FAQItem key={faq.question} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
