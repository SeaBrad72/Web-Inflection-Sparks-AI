import { Section, Wrap, Eyebrow, H2, Lead, Kbd, Callout } from "./sparkwright-ui";
import LifecycleLoop, { type Stage } from "./lifecycle-loop";
import { SPARKWRIGHT } from "@/content/sparkwright";

const STAGE_LABELS = ["pre-adoption", "release-candidate", "adopted"] as const;

export default function SparkwrightMaturity() {
  const stages: Stage[] = STAGE_LABELS.map((s) => {
    const isCurrent = s === SPARKWRIGHT.maturity;
    return {
      label: isCurrent ? `${s} · now` : s,
      tone: isCurrent ? "once" : undefined,
      current: isCurrent,
    };
  });

  return (
    <Section id="maturity">
      <Wrap>
        <Eyebrow>Maturity</Eyebrow>
        <H2>Built and hardened with its own loop.</H2>
        <Lead>
          Maturity is tracked as a <em>stage</em>, separate from the version.
          Sparkwright is at{" "}
          <strong className="text-teal-light">{SPARKWRIGHT.maturity}</strong>{" "}
          — hardened, red-teamed, and dogfooded, and ready to adopt.
        </Lead>

        <LifecycleLoop
          label={`Maturity stages, currently at ${SPARKWRIGHT.maturity}`}
          stages={stages}
        />

        <p className="mt-7 text-[17.5px] text-muted max-w-[720px] leading-relaxed">
          The discipline is proven, not asserted: the kit is{" "}
          <strong>built with its own loop</strong>, holding itself to the
          same Definition of Done, separation of duties, and mutation-tested
          gates it gives you — on every change. Run end-to-end to build and
          deploy real software.
        </p>
        <Callout tone="orange">
          <p>
            <strong>What its own review layer caught.</strong>{" "}
            Run end to end,
            the kit&rsquo;s <Kbd>builder &ne; reviewer</Kbd> layer found real,
            high-severity <strong>fail-open</strong> bugs an agent had shipped{" "}
            <em>as passing tests</em>: a production path that failed open, and
            a gate that was green only because it had been skipped. Both are
            the exact failure this page argues against &mdash; a green that
            never could have gone red &mdash; caught by the process on itself.
          </p>
        </Callout>
        <p className="mt-4 text-[17.5px] text-muted max-w-[720px] leading-relaxed">
          The next stage — <strong>adopted</strong> — is earned when an
          external team ships real software through the loop; the kit is
          being put in front of its first teams now.
        </p>
      </Wrap>
    </Section>
  );
}
