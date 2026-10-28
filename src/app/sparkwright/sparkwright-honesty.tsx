import { Section, Wrap, Eyebrow, H2, Lead, Callout, Kbd } from "./sparkwright-ui";

export default function SparkwrightHonesty() {
  return (
    <Section id="honesty">
      <Wrap>
        <Eyebrow>Honesty as a feature</Eyebrow>
        <H2>
          Every control labeled: <span className="text-teal-light">enforced</span>,
          advisory, or <span className="text-orange">declared</span>.
        </H2>
        <Lead>
          Most tools let you assume a green check means more than it does. This
          one tells you exactly how strong each guarantee is — and draws the
          safety story as a layered defense rather than a disclaimer.
        </Lead>

        <div className="mt-8 space-y-5">
          <Callout>
            <p>
              {/* "bound", not "proven equal": as of kit v3.239.0 the post-merge
                  trunk check (trace --recent) runs only in the kit's own CI and
                  is not shipped to adopters (release Known issues). Restore
                  "proven" once adopter-gates.yml ships it. */}
              {/* Sandbox layer per kit v3.242.0: shipped on for Claude Code
                  only (every other harness is UNVERIFIED in
                  docs/operations/agent-boundary-contract.md), and egress is
                  open until the per-machine strictAllowlist step — keep "On
                  Claude Code" and "once you set it" until that changes. */}
              <strong>Defense in layers.</strong> The inline guard catches
              honest mistakes. The <strong>agent sandbox</strong> is what
              stops an injected agent: on Claude Code the kit ships it switched
              on &mdash; secret paths unreadable to the agent, its own hooks
              and your start-up files write-protected, and network egress
              locked to an allowlist once you set it for your machine &mdash;
              and turning any of it off is a committed, visible declaration. A
              harness-neutral boundary contract states what any other harness
              must provide, and marks the ones not yet measured. And the{" "}
              <strong>git and CI chokepoints</strong> hold on any harness:
              nothing merges unsafely, and the merge is bound to the exact
              commit that was approved (<Kbd>shipped == approved</Kbd>).
            </p>
          </Callout>

          <Callout>
            <p>
              <strong>Green &ne; verified.</strong> A passing check proves
              only what it actually tests, never more. So every capability
              carries its label, and you always know what blocks and what
              merely nudges.
            </p>
          </Callout>

          <Callout tone="orange">
            <p>
              <strong>Hardened, and red-teamed in the open.</strong> The
              guard has closed real bypass classes — symlink- and
              hardlink-alias routes, branch-protection overrides — under
              adversarial review, and it enforces a deny-by-default{" "}
              <strong>MCP capability gate</strong>{" "}
              in-process (real enforcement, by tool name). The kit publishes
              its own <strong>threat model</strong> — its real posture, not a
              template — naming the guard&rsquo;s deny set and the residual
              risks it has <em>not</em> closed. One check was built and then
              withdrawn, on the grounds that shipping a check whose claims were
              demonstrably false is worse than shipping none. The claims on
              this page are checkable in the repository &mdash; run them.
            </p>
          </Callout>
        </div>
      </Wrap>
    </Section>
  );
}
