import { Section, Wrap, Eyebrow, H2, Lead, Callout } from "./sparkwright-ui";
import { SPARKWRIGHT } from "@/content/sparkwright";
import LifecycleLoop from "./lifecycle-loop";

export default function SparkwrightCoverage() {
  return (
    <Section id="coverage">
      <Wrap>
        <Eyebrow>What it covers</Eyebrow>
        <H2>One guided spine, from idea to operating software.</H2>
        <Lead>
          A project is stood up once through Inception, then every item runs
          the recurring loop. Humans gate at spec, merge, and acceptance;
          agents run between.
        </Lead>

        <LifecycleLoop
          label="Sparkwright lifecycle: Inception runs once, then Discover through Operate repeat as a loop"
          stages={[
            { label: "Inception · once", tone: "once" },
            { label: "Discover" },
            { label: "Plan" },
            { label: "Build", tone: "highlight" },
            { label: "Review" },
            { label: "Release" },
            { label: "Done" },
            { label: "Operate" },
          ]}
        />

        <div className="mt-8 max-w-[720px]">
          <Callout>
            <p>
              <strong>Works with your agent.</strong>{" "}
              {SPARKWRIGHT.harnesses.map((h) => (
                <span key={h.name}>
                  <strong>{h.name}</strong> — {h.level}. {h.note}{" "}
                </span>
              ))}
              Each harness is certified to the level it has actually reached
              — not claimed at blanket parity.
            </p>
          </Callout>
        </div>
      </Wrap>
    </Section>
  );
}
