import { Section, Wrap, Eyebrow, H2, Lead, Callout } from "./sparkwright-ui";

/**
 * The enforced bar: entry gate, exit gate, and the CI contract.
 *
 * The page previously sold "eight required CI quality gates", which is the
 * gate-ID count, not the kit's contract. The contract is SEVEN required gates
 * (DEVELOPMENT-STANDARDS.md §14) — the eighth ID exists only because
 * supply-chain integrity expands to gate-sbom + gate-provenance. Eight is
 * implementation detail and belongs in the repo.
 *
 * The genuinely differentiating half is the trigger model: obligations fire on
 * what a change touches, rather than sitting in a fixed pipeline nobody reads.
 */

const TRIGGERS = [
  {
    when: "a path containing pii, phi, cardholder, or anything under migrations/",
    then: "a threat model is required",
  },
  { when: "a user-facing UI surface", then: "an accessibility sign-off" },
  { when: "a Dockerfile", then: "container supply-chain scanning" },
  { when: "a database or durable store", then: "a proven DR drill, with RTO and RPO" },
  { when: "an AI feature", then: "evals that gate like tests" },
  { when: "a deployable service", then: "resilience, observability and rollback checks" },
] as const;

export default function SparkwrightBar() {
  return (
    <Section id="bar">
      <Wrap>
        <Eyebrow>The bar, enforced</Eyebrow>
        <H2>If it isn&rsquo;t automated, it isn&rsquo;t enforced.</H2>
        <Lead>
          Work enters through a Definition of Ready and leaves through a
          Definition of Done &mdash; both enumerated gates, not aspirations.
          Between them, every pull request clears the same seven checks.
        </Lead>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="text-base font-semibold tracking-tight">
              Definition of Ready
              <span className="ml-2 font-mono text-xs font-normal uppercase tracking-[0.1em] text-muted-foreground">
                entry
              </span>
            </h3>
            <p className="mt-2.5 text-sm text-muted leading-relaxed">
              Testable acceptance criteria, an INVEST-sliced increment, known
              dependencies, and a success metric. Anything sensitive, regulated,
              user-facing or AI-shaped raises its flag here &mdash; so no
              downstream gate is ever a surprise.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="text-base font-semibold tracking-tight">
              Definition of Done
              <span className="ml-2 font-mono text-xs font-normal uppercase tracking-[0.1em] text-muted-foreground">
                exit
              </span>
            </h3>
            <p className="mt-2.5 text-sm text-muted leading-relaxed">
              Tests and coverage, green CI, docs and RUNBOOK current,
              independent review, accessibility, deployed and smoke-tested with
              a rollback path ready. The project must be resumable cold by
              another engineer &mdash; or another agent.
            </p>
          </div>
        </div>

        <p className="mt-10 text-sm text-muted leading-relaxed max-w-[720px]">
          <strong className="text-foreground">
            Seven required gates, on every pull request
          </strong>{" "}
          &mdash; lint, type-check, test and coverage, build, secret-scan across
          your full commit history, dependency scan, and supply-chain integrity
          (an SBOM, plus signed build provenance). They are declared by gate ID,
          so the contract is the gate, never the vendor: the same seven run on
          GitHub Actions or GitLab CI.
        </p>

        <div className="mt-8">
          <Callout>
            <p className="text-sm text-muted leading-relaxed mb-3">
              <strong>And the rest arrive when they are earned.</strong> Five
              further CI gates are first-class but conditional &mdash;
              accessibility, load and soak, evals, SAST, and license policy
              &mdash; binding only when their trigger appears and marked
              not-applicable <em>with a reason</em> when it doesn&rsquo;t. The
              same logic runs across the lifecycle, so the kit reads your change
              and decides what it owes:
            </p>
            <ul className="space-y-1.5">
              {TRIGGERS.map((t) => (
                <li key={t.when} className="text-sm text-muted leading-relaxed">
                  <span className="text-muted-foreground">Touch</span>{" "}
                  {t.when} <span aria-hidden="true">&rarr;</span>{" "}
                  <strong className="text-foreground/90">{t.then}</strong>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              Nobody has to remember. And a11y is never forced onto a batch job
              that has no UI &mdash; false universality is how a bar loses its
              authority.
            </p>
          </Callout>
        </div>
      </Wrap>
    </Section>
  );
}
