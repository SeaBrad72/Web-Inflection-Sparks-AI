import { Section, Wrap, Eyebrow, H2, Lead, Callout } from "./sparkwright-ui";
import LifecycleLoop from "./lifecycle-loop";

/**
 * How it works, end to end — the loop itself.
 *
 * This is the "how it works" of the whole product and belongs high on the
 * page. It previously sat mid-page as a small "what it covers" aside, so a
 * reader met the guardrails, the gates and the team without ever being shown
 * the lifecycle they hang off.
 *
 * Source: DEVELOPMENT-PROCESS.md §4 (The Loop), §7 (Gates), §8 (Retrospectives).
 */

const STAGES = [
  { name: "Discover", body: "Intake, validation, triage. Production signals land here too." },
  { name: "Plan", body: "Slice into vertical increments, write testable criteria, threat-model anything sensitive." },
  { name: "Build", body: "Test-first, in an isolated worktree, against the spec." },
  { name: "Review", body: "Did we build it right? Code, security and quality lenses, by a seat that didn't write it." },
  { name: "Release", body: "Deploy behind flags, staged rollout, smoke test, rollback ready." },
  { name: "Done", body: "Acceptance — did we build the right thing? — then the retro." },
  { name: "Operate", body: "Monitor, triage, resolve. What you learn feeds Discover." },
] as const;

export default function SparkwrightCoverage() {
  return (
    <Section id="how">
      <Wrap>
        <Eyebrow>How it works</Eyebrow>
        <H2>One loop, from idea to operating software.</H2>
        <Lead>
          A project is stood up once through Inception. After that every item
          runs the same loop &mdash; pulled, not pushed, with no timebox.
          Humans are the pacing metronome.
        </Lead>

        <LifecycleLoop
          label="Sparkwright lifecycle: Inception runs once, then Discover through Operate repeat as a loop"
          stages={[
            { label: "Inception · once", tone: "once" },
            { label: "Discover" },
            { label: "Plan" },
            { label: "Build", tone: "highlight" },
            { label: "Review" },
            { label: "Release" },
            { label: "Done" },
            { label: "Operate" },
          ]}
        />

        <dl className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2">
          {STAGES.map((s) => (
            <div key={s.name} className="flex gap-3">
              <dt className="w-[74px] flex-none text-sm font-semibold text-foreground">
                {s.name}
              </dt>
              <dd className="text-sm text-muted leading-relaxed">{s.body}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Callout>
            <p className="text-sm text-muted leading-relaxed">
              <strong>Humans hold three gates.</strong> The spec, before
              anything is built. The merge, as a recorded go/no-go. And
              acceptance, which asks whether it was the right thing at all
              &mdash; a different question from review, failed differently, so
              it stays a separate gate. Agents run at machine speed in between,
              and a gate is also an autonomy boundary: it is exactly how far an
              agent proceeds alone.
            </p>
          </Callout>

          <Callout>
            <p className="text-sm text-muted leading-relaxed">
              <strong>And the loop closes.</strong> Release is not the end
              &mdash; Operate feeds what production teaches back into Discover.
              Retrospectives nest at four levels, from a note on one increment
              up to a periodic review that edits the governing documents
              themselves. Every one has to exit into an artifact: a PR, a
              backlog item, a doc. A learning that lands nowhere does not count.
            </p>
          </Callout>
        </div>
      </Wrap>
    </Section>
  );
}
