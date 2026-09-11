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
    body: "Slices the epic, assigns each task its model tier, spawns the builders, integrates the results. It assigns the work — it never reviews or ratifies its own output.",
  },
  {
    name: "Engineer",
    hat: "Builds",
    body: "Takes one slice, builds it test-first inside its own worktree, and never touches another slice's files. Returns a diff and a self-verify report.",
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
          A small standing team does the building between the gates. Four
          seats, each with a job that another seat cannot quietly absorb.
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

        <div className="mt-10">
          <Callout>
            <p className="text-sm text-muted leading-relaxed">
              <strong>Runs are metered, not trusted.</strong> Engineers fan out
              into isolated git worktrees so two slices cannot collide on the
              same file, each comes back through an independent review, and
              integration is a serial merge queue rather than a free-for-all.
              The whole run sits under a kill-switch with token, step, and
              agent ceilings &mdash; and{" "}
              <strong>raising one is itself a ratified act</strong>, so an
              agent cannot vote itself more rope.
            </p>
          </Callout>
        </div>
      </Wrap>
    </Section>
  );
}
