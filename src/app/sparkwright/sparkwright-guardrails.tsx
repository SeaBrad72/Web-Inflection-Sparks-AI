import { Section, Wrap, Eyebrow, H2, Kbd } from "./sparkwright-ui";

export default function SparkwrightGuardrails() {
  return (
    <Section id="guardrails">
      <Wrap>
        <Eyebrow>Guardrails &amp; governance</Eyebrow>
        <H2>Built in, not bolted on — the reason to adopt the kit.</H2>
        <ul className="mt-8 max-w-[720px] space-y-4">
          <li className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 flex-none rounded-[2px] bg-gradient-to-br from-teal-light to-teal"
            />
            <p className="text-sm text-muted leading-relaxed">
              <strong>The guard</strong> — a <Kbd>PreToolUse</Kbd> deny-matrix
              that intercepts destructive actions, and changes to the rules
              governing the agents themselves, before they land: a fast first layer in front of the real boundary,
              the git + CI chokepoints below.
            </p>
          </li>
          <li className="relative pl-6 text-[15.5px] text-muted">
            <span
              aria-hidden="true"
              className="absolute left-0 top-[9px] h-2 w-2 rounded-sm bg-gradient-to-br from-teal to-teal-light"
            />
            <strong>Every gate can explain itself</strong>{" "}
            &mdash; each one
            records the risk it answers and why paying its cost beats the
            alternative, queryable from the CLI with{" "}
            <Kbd>sparkwright explain &lt;topic&gt;</Kbd>. A guardrail nobody can
            justify becomes bureaucracy; this is how the kit keeps them
            accountable to a reason.
          </li>
          <li className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 flex-none rounded-[2px] bg-gradient-to-br from-teal-light to-teal"
            />
            <p className="text-sm text-muted leading-relaxed">
              <strong>Eight required CI quality gates</strong> on every push
              — nothing merges without them. Lint, type-check, test + coverage, build, secret-scan,
              dependency-scan, SBOM, and SAST — plus build-provenance (SLSA),
              license-policy, and AI-eval gates that activate by context.
            </p>
          </li>
          <li className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 flex-none rounded-[2px] bg-gradient-to-br from-teal-light to-teal"
            />
            <p className="text-sm text-muted leading-relaxed">
              <strong>Separation of duties, enforced</strong> — builder ≠
              reviewer ≠ ratifier, the last being whoever signs off that a
              governing change may ship. Those changes need an independent
              ratifier, and the merge is a recorded go/no-go bound to the
              reviewed commit (<Kbd>shipped == approved</Kbd>, verified by
              tree equality). Branch protection carries the rule down to the
              merge button itself: the last hand on the code is never the hand
              that approves it. The agent actuates the mechanics; the judgment
              is the control, not the keystroke.
            </p>
          </li>
          <li className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 flex-none rounded-[2px] bg-gradient-to-br from-teal-light to-teal"
            />
            <p className="text-sm text-muted leading-relaxed">
              <strong>Model tiering</strong> — each agent seat runs at an
              abstract tier: judgment and review seats pinned to the top
              model, builders free to run cheaper where the task allows,
              high-stakes work floored to the top. You declare the
              tier→model map for your provider — opinionated about{" "}
              <em>structure</em>, neutral about <em>which model</em>.
            </p>
          </li>
          <li className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 flex-none rounded-[2px] bg-gradient-to-br from-teal-light to-teal"
            />
            <p className="text-sm text-muted leading-relaxed">
              <strong>Autonomy tiers (L1/L2/L3)</strong> — how much an agent
              may do without sign-off, from suggest-only to act-then-report,
              keyed on risk × reversibility. Autonomy is earned by metrics.
            </p>
          </li>
          <li className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 flex-none rounded-[2px] bg-gradient-to-br from-teal-light to-teal"
            />
            <p className="text-sm text-muted leading-relaxed">
              <strong>Ratification</strong> — agents propose, humans approve.
              An agent never silently changes the standards, process, or
              control-plane files that govern it.
            </p>
          </li>
          <li className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 flex-none rounded-[2px] bg-gradient-to-br from-teal-light to-teal"
            />
            <p className="text-sm text-muted leading-relaxed">
              <strong>Proportional promotion</strong>{" "}
              &mdash; rigor scales with how risky a
              change is and how far it is being promoted. Safe changes move
              fast; dangerous ones get slowed down. A change&rsquo;s class is{" "}
              <em>derived</em>{" "}
              at promotion, defaulting higher when
              uncertain, so it can&rsquo;t be understated.
            </p>
          </li>
        </ul>
      </Wrap>
    </Section>
  );
}
