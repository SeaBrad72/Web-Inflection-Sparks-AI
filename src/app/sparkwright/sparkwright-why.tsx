import { Section, Wrap, Eyebrow, H2, Lead } from "./sparkwright-ui";
import { SPARKWRIGHT } from "@/content/sparkwright";

export default function SparkwrightWhy() {
  return (
    <Section id="why">
      <Wrap>
        <Eyebrow>Why now</Eyebrow>
        <H2>Agents amplify whatever discipline they&rsquo;re dropped into.</H2>
        <Lead>
          You know this part already. AI is in the workflow; the open question
          is whether it is in there safely. Every figure below carries its
          source &mdash; these are industry findings about the problem,{" "}
          <strong>not Sparkwright&rsquo;s results</strong>.
        </Lead>
        <div className="mt-8 flex flex-wrap gap-4">
          {SPARKWRIGHT.stats.map((stat) => (
            <div
              key={stat.label}
              className={`flex-1 min-w-[220px] rounded-xl border bg-surface p-6 ${
                stat.tone === "risk" ? "border-orange/30" : "border-border"
              }`}
            >
              <div
                className={`text-[34px] font-extrabold tracking-tight ${
                  stat.tone === "risk" ? "text-orange" : "text-teal-light"
                }`}
              >
                {stat.figure}
              </div>
              <div className="mt-1.5 text-sm text-muted">{stat.label}</div>
              <span className="mt-2 block font-mono text-[11.5px] leading-snug text-muted-foreground">
                {stat.source}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-7 text-[17.5px] text-muted max-w-[720px] leading-relaxed">
          Google&rsquo;s <strong>DORA 2025</strong> report names the tension
          exactly: AI finally <em>lifted</em> delivery throughput, and delivery{" "}
          <strong>instability rose anyway</strong> &mdash; leaving AI tools
          &ldquo;likely to remain isolated boosts in an otherwise unchanged
          system&rdquo; without deliberate change to workflows, roles, governance
          and culture. Which is the case for Sparkwright in a sentence:{" "}
          <strong>
            agents move fast inside enforced boundaries, so the speed is real
            and the instability isn&rsquo;t
          </strong>
          .
        </p>
        <p className="mt-3.5 text-[13px] text-muted-foreground max-w-[720px] leading-relaxed">
          Sources: DORA, State of AI-assisted Software Development 2025 (Google,
          Sept 2025, ~5,000 respondents) ·
          Veracode 2025 GenAI Code Security Report (Jul 2025, 100+ models) ·
          CodeScene, &ldquo;Code for Machines, Not Just Humans&rdquo;
          (peer-reviewed, 2026).
        </p>
      </Wrap>
    </Section>
  );
}
