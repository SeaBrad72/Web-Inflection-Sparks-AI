import type { ReactNode } from "react";
import { Section, Wrap, Eyebrow, H2, Lead, Callout, Kbd } from "./sparkwright-ui";
import { SPARKWRIGHT } from "@/content/sparkwright";
import LifecycleLoop from "./lifecycle-loop";

type HarnessLevel = (typeof SPARKWRIGHT.harnesses)[number]["level"];

/** Groups harnesses that share an identical level + note so they render as one clause. */
function groupHarnesses(harnesses: typeof SPARKWRIGHT.harnesses) {
  const groups: { names: string[]; level: HarnessLevel; note: string }[] = [];
  for (const h of harnesses) {
    const existing = groups.find((g) => g.level === h.level && g.note === h.note);
    if (existing) {
      existing.names.push(h.name);
    } else {
      groups.push({ names: [h.name], level: h.level, note: h.note });
    }
  }
  return groups;
}

/** Joins items into a natural, Oxford-comma list: "A", "A and B", or "A, B, and C". */
function joinOxford(items: ReactNode[]): ReactNode {
  if (items.length === 1) return items[0];
  if (items.length === 2) {
    return (
      <>
        {items[0]} and {items[1]}
      </>
    );
  }
  return (
    <>
      {items.slice(0, -1).map((item, i) => (
        <span key={i}>{item}, </span>
      ))}
      and {items[items.length - 1]}
    </>
  );
}

export default function SparkwrightCoverage() {
  const harnessGroups = groupHarnesses(SPARKWRIGHT.harnesses);
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
              {harnessGroups.map((g) => {
                const isEnforcementFloor = g.level === ("enforcement floor" satisfies HarnessLevel);
                const nameNodes: ReactNode[] = g.names.map((n) => <strong key={n}>{n}</strong>);
                if (isEnforcementFloor) {
                  nameNodes.push(
                    <span key="any-other">
                      any other <Kbd>AGENTS.md</Kbd>-reading agent
                    </span>,
                  );
                }
                return (
                  <span key={g.level + g.note}>
                    {joinOxford(nameNodes)} — {g.level}. {g.note}{" "}
                  </span>
                );
              })}
              Each harness is certified to the level it has actually reached
              — not claimed at blanket parity.
            </p>
          </Callout>
        </div>
      </Wrap>
    </Section>
  );
}
