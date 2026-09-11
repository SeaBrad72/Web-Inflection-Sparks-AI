import { Section, Wrap, Eyebrow, H2, Lead, Callout, Kbd } from "./sparkwright-ui";
import { SPARKWRIGHT } from "@/content/sparkwright";

/**
 * Substantiates the stack axis.
 *
 * The page claims neutrality "on three axes — any stack, any harness, any
 * model". Harness had a table with certification levels and model had a
 * tiering explanation; stack had an adjective. A reader screening for "does
 * this fit my environment" — the first question a VP of Engineering asks —
 * had nothing to screen on, and the asymmetry undercut the other two claims.
 */

const serviceStacks = SPARKWRIGHT.stacks.filter((s) => s.tier === "service");
const specialistStacks = SPARKWRIGHT.stacks.filter((s) => s.tier === "specialist");

export default function SparkwrightStacks() {
  return (
    <Section id="stacks">
      <Wrap>
        <Eyebrow>Fits your environment</Eyebrow>
        <H2>Ten stacks, one Definition of Done.</H2>
        <Lead>
          The gate contract does not change when the language does. Every
          profile ships the same eight required checks and the same branch
          protection &mdash; what changes underneath is the tooling native to
          your stack.
        </Lead>

        <div className="mt-10 max-w-[760px] overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <caption className="sr-only">
              Stack profiles shipped by Sparkwright and the tooling each one
              runs in CI
            </caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="border-b border-border px-4 py-3 text-left font-semibold"
                >
                  Stack
                </th>
                <th
                  scope="col"
                  className="border-b border-border px-4 py-3 text-left font-semibold"
                >
                  Templated tooling
                </th>
              </tr>
            </thead>
            <tbody>
              {serviceStacks.map((s) => (
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
              {specialistStacks.map((s) => (
                <tr key={s.name}>
                  <th
                    scope="row"
                    className="border-b border-border-subtle px-4 py-3 text-left font-medium align-top"
                  >
                    {s.name}
                    <span className="block text-xs font-normal text-muted-foreground mt-0.5">
                      specialist &mdash; {s.exemptReason}
                    </span>
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
          Cutting across all ten, regardless of language:{" "}
          {SPARKWRIGHT.universalTools.map((t, i) => (
            <span key={t}>
              {i > 0 && (i === SPARKWRIGHT.universalTools.length - 1 ? ", and " : ", ")}
              <strong>{t}</strong>
            </span>
          ))}
          .
        </p>

        <div className="mt-10">
          <Callout>
            <p className="text-sm text-muted leading-relaxed">
              <strong>Parity is a gate, not a promise.</strong> Every service
              stack is held to the same Definition of Done &mdash; feature
              flags, smoke test, DR drill, observability, test pyramid, health
              check, deploy and rollback &mdash; by a check that fails on a
              missing capability. A stack cannot be quietly admitted, and a
              gap cannot go untracked. As of <Kbd>{SPARKWRIGHT.version}</Kbd>{" "}
              there are none.
            </p>
          </Callout>
        </div>
      </Wrap>
    </Section>
  );
}
