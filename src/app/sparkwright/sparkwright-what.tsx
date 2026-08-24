import { Section, Wrap, Eyebrow, H2, Lead, Card } from "./sparkwright-ui";

export default function SparkwrightWhat() {
  return (
    <Section id="what">
      <Wrap>
        <Eyebrow>In 60 seconds</Eyebrow>
        <H2>
          Opinionated about <span className="text-teal-light">how</span> you build.
          Neutral about <span className="text-orange">what</span> you build with.
        </H2>
        <Lead>
          It is opinionated about how to build well with agents, and deliberately
          neutral on three axes — <strong>any stack, any harness, any model</strong>.
          Your stack, environment, deploy target, coding agent, and even which AI
          model powers each role are chosen as you engage the kit, never picked for
          you.
        </Lead>
        <p className="mt-5 text-[17.5px] text-muted max-w-[720px] leading-relaxed">
          It is not a platform you buy, not a runtime you depend on, and not a
          service that holds your code or credentials. You copy it into your own
          repository, choose your stack, and its checks run on every push in your
          own CI. There is no lock-in — it sits <em>alongside</em> the tools you
          already use.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card title="Agent-native & enforcement-native">
            <p className="text-sm text-muted leading-relaxed">
              Executable, CI-verified checks an agent or a human runs the same
              way — not portal templates or PDF norms. The guardrails{" "}
              <em>run</em>, on every push.
            </p>
          </Card>
          <Card title="Honesty as a feature">
            <p className="text-sm text-muted leading-relaxed">
              It tells you exactly how strong each guarantee is — a live gate
              that blocks (enforced), a nudge that doesn&rsquo;t (advisory), or
              an attestation it can&rsquo;t observe (declared). Candor as the
              differentiator.
            </p>
          </Card>
          <Card title="Complements, doesn't replace">
            <p className="text-sm text-muted leading-relaxed">
              No UI, no catalog, no token broker. It layers assurance onto
              whatever platform you already run, sitting beside your CI and IDP
              rather than instead of them.
            </p>
          </Card>
        </div>
        <p className="mt-[34px] text-[17.5px] text-muted max-w-[720px] leading-relaxed">
          <strong>Who it&rsquo;s for.</strong> Any team — humans, agents, or
          both — that wants production-grade discipline without inventing a
          process from scratch, whether they&rsquo;re starting a new project or
          bringing the kit to an existing codebase. Adopt it as-is, or hand it
          to a team and tailor it.
        </p>
      </Wrap>
    </Section>
  );
}
