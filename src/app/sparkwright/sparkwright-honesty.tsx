import { Section, Wrap, Eyebrow, H2, Lead, Callout, Kbd } from "./sparkwright-ui";

export default function SparkwrightHonesty() {
  return (
    <Section id="honesty">
      <Wrap>
        <Eyebrow>Honesty as a feature</Eyebrow>
        <H2>
          Every control labelled: <span className="text-teal-light">enforced</span>,
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
              <strong>Defense in layers.</strong> The inline guard catches
              honest mistakes &mdash; it intercepts destructive actions before
              they land. The{" "}
              <strong>real boundary is the git and CI chokepoints</strong>,
              which hold on any harness: nothing merges unsafely, and what
              shipped is proven equal to what was approved
              (<Kbd>shipped == approved</Kbd>). Containment &mdash; egress
              allowlist, sandboxed filesystem, scoped tokens &mdash; is the
              platform&rsquo;s job, and the kit verifies it is wired.
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
              withdrawn, on the grounds that shipping a check whose claims
              were demonstrably false is worse than shipping none. And none of
              it asks for faith:{" "}
              <strong>the kit&rsquo;s headline claims are a registry</strong>,
              each backed by an executable verifier and pinned so a claim
              cannot quietly disappear. The claims on this page are checkable
              in the repository &mdash; run them.
            </p>
          </Callout>
        </div>
      </Wrap>
    </Section>
  );
}
