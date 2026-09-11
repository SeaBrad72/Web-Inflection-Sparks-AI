import { Section, Wrap, Eyebrow, H2, Lead, Callout } from "./sparkwright-ui";

/**
 * The Governing Lens — what adopting the kit does to how a team works.
 *
 * The sharpest idea in the kit and the one a technology leader is actually
 * sitting on: what happens to my process when agents do the building? The kit
 * has a principled answer rather than a shrug, and it is the strongest
 * differentiator on the page.
 *
 * Source: DEVELOPMENT-PROCESS.md §1 (Governing Lens), §11 (Rituals We Keep /
 * Rituals We Drop), §14 (Flow Metrics).
 */

const DROPPED = [
  {
    name: "Story points & planning poker",
    why: "Forecasts scarce human effort. Replaced by slice-size discipline and a risk tag.",
  },
  {
    name: "Time-boxed sprint planning",
    why: "Replaced by continuous refinement and pull-based WIP.",
  },
  {
    name: "Daily standup, as a meeting",
    why: "The board is the status. Replaced by an on-demand digest.",
  },
  {
    name: "Burndown & velocity charts",
    why: "Replaced by flow and DORA metrics.",
  },
] as const;

const KEPT = [
  {
    name: "Definition of Ready",
    why: "An enumerated entry gate. Nothing enters Build without testable criteria, an INVEST slice, known dependencies, and a success metric.",
  },
  {
    name: "Acceptance, separate from review",
    why: "Review asks whether you built it right. Acceptance asks whether you built the right thing. They fail differently, so they stay distinct.",
  },
  {
    name: "Adversarial, multi-lens review",
    why: "A spec reviewed in parallel by product, architecture, test, and security lenses. Nearly free agentically — so use it.",
  },
  {
    name: "Spikes",
    why: "Time-boxed research before committing a plan, used heavily when choosing a stack.",
  },
] as const;

export default function SparkwrightProcess() {
  return (
    <Section id="process">
      <Wrap>
        <Eyebrow>What it changes about how you work</Eyebrow>
        <H2>Agent effort is cheap. Human attention is not.</H2>
        <Lead>
          That single shift decides which of your rituals still earn their
          place. Ceremonies that forecast human effort stop making sense.
          Practices that clarify intent or catch defects get{" "}
          <em>more</em> valuable, because agents can run them far more often
          than a team of people ever could.
        </Lead>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-mono uppercase tracking-[0.12em] text-muted-foreground mb-4">
              What goes away
            </h3>
            <ul className="space-y-4">
              {DROPPED.map((r) => (
                <li key={r.name}>
                  <p className="text-sm font-medium text-foreground/70 line-through decoration-border decoration-1">
                    {r.name}
                  </p>
                  <p className="mt-1 text-sm text-muted leading-relaxed">
                    {r.why}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-mono uppercase tracking-[0.12em] text-teal-light mb-4">
              What gets stronger
            </h3>
            <ul className="space-y-4">
              {KEPT.map((r) => (
                <li key={r.name}>
                  <p className="text-sm font-medium text-foreground">
                    {r.name}
                  </p>
                  <p className="mt-1 text-sm text-muted leading-relaxed">
                    {r.why}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <Callout>
            <p className="text-sm text-muted leading-relaxed">
              <strong>And you still get numbers &mdash; better ones.</strong>{" "}
              Velocity is replaced by the DORA four, mapped so they stay
              portable: cycle time, release cadence, change-failure rate, and
              time to resolve. Two more have no DORA equivalent and are the
              ones that actually bite in agentic delivery &mdash;{" "}
              <strong>review latency</strong>, because human review is now the
              real constraint, and <strong>retro-action closure</strong>,
              because a learning loop that never closes is theatre.
            </p>
          </Callout>
        </div>
      </Wrap>
    </Section>
  );
}
