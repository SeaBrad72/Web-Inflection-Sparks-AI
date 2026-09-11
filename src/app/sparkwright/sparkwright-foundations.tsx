import { Section, Wrap, Eyebrow, H2, Lead } from "./sparkwright-ui";

/**
 * Breadth, conveyed densely.
 *
 * The kit carries far more engineering substance than the page was showing —
 * TDD, 15-factor, ephemeral environments, promotion classes, drift guards,
 * DR, observability. None of these need a section of their own, but a reader
 * evaluating whether this is a real SDLC or a thin wrapper needs to see that
 * they are all here and all standard.
 *
 * A scannable grid is the right device: maximum breadth per word.
 */

const FOUNDATIONS = [
  {
    name: "Test-driven by default",
    body: "Tests written with the code, never after — 80% floor, 100% on critical paths.",
  },
  {
    name: "The whole test pyramid",
    body: "Unit, property-based, integration, API contract, end-to-end, smoke, load and stress, and security tests against every auth and data boundary — each with a defined point in the lifecycle where it starts being owed.",
  },
  {
    name: "Evals as tests for AI",
    body: "Model and prompt quality, regression, and red-team sets — written alongside the feature, run in CI, and gating exactly like tests.",
  },
  {
    name: "15-factor architecture",
    body: "Config, backing services, disposability, telemetry — checked for anything deployable.",
  },
  {
    name: "Ephemeral environments",
    body: "A throwaway environment per pull request, so reviewers exercise the change running rather than reading a diff. Synthetic data only, never production credentials.",
  },
  {
    name: "Proportional promotion",
    body: "Ceremony scales with risk. A change's class is derived at promotion, never self-asserted, and defaults higher when uncertain.",
  },
  {
    name: "Drift guards",
    body: "What the docs promise cannot quietly diverge from what the pipeline enforces.",
  },
  {
    name: "Observability & SLOs",
    body: "Declared SLOs, wired telemetry, alerts on breach, a tracked error budget.",
  },
  {
    name: "Disaster recovery, proven",
    body: "Tiered RTO and RPO, and a restore drill that actually ran.",
  },
  {
    name: "Progressive delivery",
    body: "Feature flags, staged rollout, smoke tests, and a rollback path verified before you need it.",
  },
  {
    name: "Incident response",
    body: "Severity ladder, on-call ownership, postmortems that exit into tracked work.",
  },
  {
    name: "Supply-chain integrity",
    body: "Full-history secret scanning, dependency scanning, an SBOM per build, signed provenance on releases.",
  },
  {
    name: "AI governance",
    body: "An AI system card per feature — risk classified, human oversight named — plus prompt-injection defense and schema-validated output.",
  },
  {
    name: "Methodology as skills",
    body: "Planning, design, TDD, review, verification, evals and operating ship as executable skills an agent invokes — not prose it might ignore.",
  },
] as const;

export default function SparkwrightFoundations() {
  return (
    <Section id="foundations">
      <Wrap>
        <Eyebrow>Foundations</Eyebrow>
        <H2>The engineering substance, already wired.</H2>
        <Lead>
          None of this is the interesting part of an agentic SDLC. All of it is
          the part teams skip, and the part an auditor asks for. It ships
          standard.
        </Lead>

        <dl className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {FOUNDATIONS.map((f) => (
            <div key={f.name}>
              <dt className="text-sm font-semibold text-foreground">
                {f.name}
              </dt>
              <dd className="mt-1 text-sm text-muted leading-relaxed">
                {f.body}
              </dd>
            </div>
          ))}
        </dl>
      </Wrap>
    </Section>
  );
}
