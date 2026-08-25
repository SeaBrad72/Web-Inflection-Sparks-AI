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
              that intercepts destructive and control-plane actions before
              they land: a fast first layer in front of the real boundary,
              the git + CI chokepoints below.
            </p>
          </li>
          <li className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 flex-none rounded-[2px] bg-gradient-to-br from-teal-light to-teal"
            />
            <p className="text-sm text-muted leading-relaxed">
              <strong>Eight required CI quality gates</strong> on every push
              — lint, type-check, test + coverage, build, secret-scan,
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
              reviewer ≠ ratifier. Control-plane changes need an independent
              ratifier, and the merge is a recorded go/no-go bound to the
              reviewed commit (<Kbd>shipped == approved</Kbd>, verified by
              tree equality). The agent actuates the mechanics; the judgment
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
              &mdash; rigor proportional to
              change-class × rung: relax the safe majority, harden the
              dangerous minority. A change&rsquo;s class is{" "}
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
