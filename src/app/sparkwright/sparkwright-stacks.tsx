import { Section, Wrap, Eyebrow, H2, Lead, Callout, Kbd } from "./sparkwright-ui";
import { SPARKWRIGHT } from "@/content/sparkwright";

/**
 * The three neutrality axes, substantiated — as OPEN axes.
 *
 * An earlier version of this section was headed "Ten stacks, one Definition of
 * Done", which read as a catalogue and quietly closed a claim the kit makes
 * open: any stack, with ten worked references shipped and a generator for the
 * rest. The same error was live on the harness axis, where four named adapters
 * read as the supported set rather than as curated starting points for any
 * AGENTS.md-reading agent.
 *
 * The kit's own framing is neutrality *by construction*: comparable options,
 * a fit-derived choice, and a check that rejects choosing out of habit.
 */

export default function SparkwrightStacks() {
  return (
    <Section id="stacks">
      <Wrap>
        <Eyebrow>Fits your environment</Eyebrow>
        <H2>Any stack. Any agent. Any model.</H2>
        <Lead>
          The contract does not know what language you are in. Ten worked stack
          references ship so you are not starting from a blank file &mdash;
          every one is yours to rewrite, and <Kbd>new-profile.sh</Kbd>{" "}
          generates one for a stack that isn&rsquo;t here. The only thing that
          has to pass is conformance.
        </Lead>

        <div className="mt-10 max-w-[760px] overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <caption className="sr-only">
              The ten stack references Sparkwright ships, and the tooling each
              one wires into CI
            </caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="border-b border-border px-4 py-3 text-left font-semibold"
                >
                  Shipped reference
                </th>
                <th
                  scope="col"
                  className="border-b border-border px-4 py-3 text-left font-semibold"
                >
                  Wired into CI for you
                </th>
              </tr>
            </thead>
            <tbody>
              {SPARKWRIGHT.stacks.map((s) => (
                <tr key={s.name}>
                  <th
                    scope="row"
                    className="border-b border-border-subtle px-4 py-3 text-left font-medium align-top"
                  >
                    {s.name}
                  </th>
                  <td className="border-b border-border-subtle px-4 py-3 text-muted align-top">
                    {s.tools}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-sm text-muted leading-relaxed max-w-[720px]">
          Cutting across all of them, whatever the language:{" "}
          <strong>gitleaks</strong>, <strong>CycloneDX SBOMs</strong>, and{" "}
          <strong>signed build provenance</strong>. Every reference is held to
          the same Definition of Done &mdash; there is no tiering here, and no
          second-class stack.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Callout>
            <p className="text-sm text-muted leading-relaxed">
              <strong>Your agent, and your model.</strong> Any harness that
              reads <Kbd>AGENTS.md</Kbd> works, with curated adapters shipped
              and <Kbd>new-adapter.sh</Kbd> for the rest &mdash; each certified
              to the level it has actually reached, measured or declared,
              rather than claimed at blanket parity. Models bind by abstract
              tier rather than by name, so judgment seats run on your best model
              and builders run cheaper; changing provider is a mapping change,
              not a migration.
            </p>
          </Callout>

          <Callout>
            <p className="text-sm text-muted leading-relaxed">
              <strong>And it won&rsquo;t let you choose out of habit.</strong>{" "}
              Every one of these decisions is recorded, and a check reads the
              rationale. &ldquo;It&rsquo;s the proven default&rdquo; and
              &ldquo;everyone uses it&rdquo; are rejected &mdash; the record has
              to name a real fit reason. Familiarity is the most expensive
              architecture decision a team makes, and the one nobody writes
              down.
            </p>
          </Callout>
        </div>
      </Wrap>
    </Section>
  );
}
