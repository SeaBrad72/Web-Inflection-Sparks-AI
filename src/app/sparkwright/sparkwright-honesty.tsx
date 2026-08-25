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
          The rarest thing the kit does is tell you exactly how strong each
          guarantee is — a live gate that blocks, a nudge that doesn&rsquo;t, or
          an attestation it can&rsquo;t observe at runtime. That candor is the
          differentiator, and the safety story is drawn as a layered defense,
          not a disclaimer.
        </Lead>

        <div className="mt-8 space-y-5">
          <Callout>
            <p>
              <strong>Defense in layers.</strong> The inline guard is a fast{" "}
              <em>honest-mistake</em> speed bump — it intercepts destructive
              and control-plane actions before they land. The{" "}
              <strong>
                real, harness-equal boundary is the git + CI chokepoints
              </strong>
              : nothing merges unsafely, on any harness, and what shipped is
              proven equal to what was approved (<Kbd>shipped == approved</Kbd>,
              by tree equality). Containment — an egress allowlist, a
              sandboxed filesystem, scoped tokens — is the platform boundary,
              which the kit ships references for and verifies is wired. Each
              layer does one job; the load-bearing one is real enforcement.
            </p>
          </Callout>

          <Callout>
            <p>
              <strong>Green &ne; verified.</strong> A passing check proves
              only what it actually tests, never more — so the kit labels
              every capability <em>enforced</em> (a live gate blocks it),{" "}
              <em>advisory</em> (a nudge that doesn&rsquo;t), or{" "}
              <em>declared</em> (an attestation it can&rsquo;t observe at
              runtime). You always know what blocks and what merely nudges.
            </p>
          </Callout>

          <Callout tone="orange">
            <p>
              <strong>Hardened, and red-teamed in the open.</strong> The
              guard has closed real bypass classes — symlink- and
              hardlink-alias routes, branch-protection overrides — under
              adversarial review, and it enforces a deny-by-default{" "}
              <strong>MCP capability gate</strong>{" "}
              in-process. A kit that
              tells you precisely what&rsquo;s enforced versus advisory
              versus declared is more trustworthy than one that claims
              magic.
            </p>
          </Callout>
        </div>
      </Wrap>
    </Section>
  );
}
