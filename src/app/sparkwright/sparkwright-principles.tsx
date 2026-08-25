import { Section, Wrap, Eyebrow, H2, Callout, Card } from "./sparkwright-ui";

export default function SparkwrightPrinciples() {
  return (
    <Section id="principles">
      <Wrap>
        <Eyebrow>First principles & foundations</Eyebrow>
        <H2>
          Rituals that <span className="text-teal-light">clarify intent</span>{" "}
          get stronger. Rituals that just{" "}
          <span className="text-orange">manage effort</span> die.
        </H2>
        <div className="mt-6">
          <Callout>
            <p>
              <strong>The governing lens.</strong>{" "}
              Agent effort is cheap;
              human attention and integration risk are the scarce resources.
              Every practice in the kit is justified against that lens — or
              it doesn&rsquo;t ship.
            </p>
          </Callout>
        </div>
        <div className="mt-[34px] grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card title="Production-grade from day one">
            <p className="text-sm text-muted leading-relaxed">
              No demos. Everything is shippable.
            </p>
          </Card>
          <Card title="Test-driven">
            <p className="text-sm text-muted leading-relaxed">
              Tests — and, for AI features, evals — are written{" "}
              <em>with</em> the code, not after. Quality is built in.
            </p>
          </Card>
          <Card title="Architecture before implementation">
            <p className="text-sm text-muted leading-relaxed">
              Design and discuss trade-offs before building.
            </p>
          </Card>
          <Card title="Automated quality gates">
            <p className="text-sm text-muted leading-relaxed">
              If it isn&rsquo;t automated, it isn&rsquo;t enforced. CI on
              every push.
            </p>
          </Card>
          <Card title="Security & governance are foundational">
            <p className="text-sm text-muted leading-relaxed">
              Built into every line from the start, not bolted on.
            </p>
          </Card>
          <Card title="The loop closes">
            <p className="text-sm text-muted leading-relaxed">
              Production teaches the next iteration; every retro exits into
              an artifact.
            </p>
          </Card>
        </div>
        <p className="mt-8 text-[17.5px] text-muted max-w-[720px] leading-relaxed">
          From these follow the core ideas: <strong>flow, not sprints</strong>{" "}
          (WIP-limited kanban, humans as the pacing metronome); a{" "}
          <strong>closed loop</strong> (a retro that changes nothing is
          theatre); <strong>agent governance by autonomy tiers</strong> keyed
          on risk × reversibility (irreversible actions are human-gated,
          autonomy is earned by metrics); and{" "}
          <strong>universal-plus-profile</strong> (standards stay
          stack-neutral, the one stack-specific layer is a swappable
          profile).
        </p>
      </Wrap>
    </Section>
  );
}
