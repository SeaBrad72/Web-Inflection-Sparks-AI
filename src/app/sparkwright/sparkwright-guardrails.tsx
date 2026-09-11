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
              <strong>A guard that holds on any harness</strong> &mdash; a
              CLI, a git pre-push hook, and a CI gate, verified to block
              destructive and control-plane actions whichever agent you run.
              Where your harness supports it, the same rules also intercept
              in-editor, before a bad write ever lands.
            </p>
          </li>
          <li className="relative pl-6 text-[15.5px] text-muted">
            <span
              aria-hidden="true"
              className="absolute left-0 top-[9px] h-2 w-2 rounded-sm bg-gradient-to-br from-teal to-teal-light"
            />
            <strong>Every gate can explain itself</strong> &mdash; ask it
            why it exists and it tells you, from the CLI:{" "}
            <Kbd>sparkwright explain &lt;topic&gt;</Kbd>. A guardrail nobody
            can justify becomes bureaucracy.
          </li>
                    <li className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 flex-none rounded-[2px] bg-gradient-to-br from-teal-light to-teal"
            />
            <p className="text-sm text-muted leading-relaxed">
              <strong>Separation of duties, enforced</strong> &mdash; the
              merge is bound to the commit that was actually reviewed
              (<Kbd>shipped == approved</Kbd>), and branch protection carries
              it to the merge button: the last hand on the code is never the
              hand that approves it.
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
              keyed on risk × reversibility &mdash; reversibility being the master
              variable. Irreversible work (deploying, deleting data, rotating
              secrets, spending money) stays human-gated at every tier, and a
              team raises a tier only when its own metrics earn it.
            </p>
          </li>
          <li className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 flex-none rounded-[2px] bg-gradient-to-br from-teal-light to-teal"
            />
            <p className="text-sm text-muted leading-relaxed">
              <strong>Ratification</strong> &mdash; an agent never silently
              changes the standards, process, or control-plane files that
              govern it.
            </p>
          </li>
                  </ul>
      </Wrap>
    </Section>
  );
}
