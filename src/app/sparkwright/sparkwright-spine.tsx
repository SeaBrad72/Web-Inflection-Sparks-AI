import { Section, Wrap, Eyebrow, H2, Lead, Card } from "./sparkwright-ui";

export default function SparkwrightSpine() {
  return (
    <Section id="spine">
      <Wrap>
        <Eyebrow>How the kit is built</Eyebrow>
        <H2>Contract → Reference → Conformance.</H2>
        <Lead>
          Every capability ships as a three-part vertical — the architectural
          idea that makes Sparkwright opinionated and neutral at once.
        </Lead>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Card accent num="01" title="Contract">
            <p className="text-sm text-muted leading-relaxed">
              The binding, stack-neutral requirement, stated in the standards
              and process docs. This is what <em>must</em> hold.
            </p>
          </Card>
          <Card accent num="02" title="Reference">
            <p className="text-sm text-muted leading-relaxed">
              A working artifact you copy and adapt — a profile, a script, a
              template. You own it, and you may rewrite it freely.
            </p>
          </Card>
          <Card accent num="03" title="Conformance">
            <p className="text-sm text-muted leading-relaxed">
              An executable script that <em>proves</em> the implementation
              still satisfies the contract, rather than asserting it in
              prose.
            </p>
          </Card>
        </div>
        <p className="mt-[30px] text-[17.5px] text-muted max-w-[720px] leading-relaxed">
          The kit <strong>dictates the contract and offers the implementation</strong>:
          rewrite the reference however you like, as long as the conformance
          check still passes. The checks <em>run</em>, on the kit&rsquo;s own
          tree, on every push — and the kit is built with the very loop it
          prescribes, holding itself to the same Definition of Done it gives
          you. It even tests its own tests: <strong>
            every check registered in the kit&rsquo;s control set is itself
            mutation-tested
          </strong>{" "}
          — a green that can&rsquo;t be made to go red is caught and fixed,
          and checks <em>outside</em> that control set are surfaced as
          uncovered rather than silently counted. So the gates are real, not
          decorative.
        </p>
      </Wrap>
    </Section>
  );
}
