import { Section, Wrap, Eyebrow, H2, Lead } from "./sparkwright-ui";
import { SPARKWRIGHT } from "@/content/sparkwright";

export default function SparkwrightWhy() {
  return (
    <Section id="why">
      <Wrap>
        <Eyebrow>Why now</Eyebrow>
        <H2>Agents amplify whatever discipline they&rsquo;re dropped into.</H2>
        <Lead>
          By 2025, ~90% of developers use AI in their workflow (DORA 2025) — so
          the question isn&rsquo;t whether agents write your code, it&rsquo;s
          whether they do it safely. Recent, independent research on ungoverned
          AI is the warning. Every figure below carries its source: the
          research is industry findings about the problem,{" "}
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
          Google&rsquo;s <strong>DORA 2025</strong> report (Dec 2025) is the
          sharpest version of the story: AI finally <em>lifted</em> delivery
          throughput — yet delivery <strong>instability kept rising</strong>,
          and the report concludes that without &ldquo;intentional changes to
          workflows, roles, governance, and cultural expectations,&rdquo; AI
          stays &ldquo;an isolated boost in an otherwise unchanged
          system.&rdquo; That is the whole case for Sparkwright: agents move
          fast <em>inside</em>{" "}
          enforced boundaries, so the speed is real and
          the instability isn&rsquo;t. Human attention and integration risk are
          the scarce resources; the kit spends the cheap one freely and
          protects the expensive ones.
        </p>
        <p className="mt-3.5 text-[13px] text-muted-foreground max-w-[720px] leading-relaxed">
          Sources: DORA 2025 State of DevOps Report (Google, Dec 2025) ·
          Veracode 2025 GenAI Code Security Report (Jul 2025, 100+ models) ·
          CodeScene, &ldquo;Code for Machines, Not Just Humans&rdquo;
          (peer-reviewed, 2026).
        </p>
      </Wrap>
    </Section>
  );
}
