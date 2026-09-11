import { Section, Wrap, Eyebrow, H2, Lead, Card, Callout } from "./sparkwright-ui";

/**
 * The agent team, and what meters it.
 *
 * The page asserted `builder ≠ reviewer` and "agents propose, humans approve"
 * without ever showing the team that makes those structurally true. For an
 * agentic SDLC kit the seats are the product, not an implementation detail —
 * and the metering answers the question a CTO actually asks first, which is
 * not "how good is the output" but "what stops this thing running away".
 *
 * Mechanism stays in the repo. This is the shape of what you get.
 */

const SEATS = [
  {
    name: "Orchestrator",
    hat: "Lead / EM",
    body: "Slices an epic into disjoint, independently testable increments, composes the team for the job, fans the engineers out, then integrates what comes back. It assigns the work — it never reviews or ratifies its own output.",
  },
  {
    name: "Engineers",
    hat: "Build, in parallel",
    body: "One per slice, each test-first in its own isolated worktree, none able to touch another slice's files. Each returns a diff and a self-verify report.",
  },
  {
    name: "Reviewer",
    hat: "Independent",
    body: "Correctness and standards review of the diff, by a seat that did not write it. This is where builder ≠ reviewer stops being a policy and becomes structure.",
  },
  {
    name: "Security",
    hat: "The security lens",
    body: "Threat model, injection, authorization, secret handling, prompt injection — brought in on any trust, data, or AI boundary.",
  },
] as const;

export default function SparkwrightTeam() {
  return (
    <Section id="team">
      <Wrap>
        <Eyebrow>The team you get</Eyebrow>
        <H2>Four seats, and a governor on the whole run.</H2>
        <Lead>
          A small standing team does the building between the gates &mdash;
          four seats, each with a job another seat cannot quietly absorb, and
          as many engineers running at once as the work splits into.
        </Lead>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {SEATS.map((seat) => (
            <Card key={seat.name} title={seat.name}>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-teal-light mb-2">
                {seat.hat}
              </p>
              <p className="text-sm text-muted leading-relaxed">{seat.body}</p>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Callout>
            <p className="text-sm text-muted leading-relaxed">
              <strong>One team, more than one model.</strong> Seats bind to
              abstract tiers, not model names, so the orchestrator composes a
              build team rather than picking a single model for everything
              &mdash; judgment and review seats on your strongest model,
              engineers on whatever the slice actually warrants, sometimes a
              mix within the same run. High-stakes work is floored back to the
              top regardless. You own the tier-to-model map, so this is a
              config change when the model landscape moves, not a rewrite.
            </p>
          </Callout>
        </div>

        <div className="mt-4">
          <Callout>
            <p className="text-sm text-muted leading-relaxed">
              <strong>Parallel, because nothing escapes the rails.</strong>{" "}
              Engineers fan out into isolated worktrees so two slices cannot
              collide, and integration is a serial merge queue rather than a
              free-for-all. The whole run is metered by a kill-switch with
              token, step and agent ceilings &mdash; and{" "}
              <strong>raising one is itself a ratified act</strong>, so an
              agent cannot vote itself more rope. The guardrails are precisely
              what let you floor it.
            </p>
          </Callout>
        </div>
      </Wrap>
    </Section>
  );
}
