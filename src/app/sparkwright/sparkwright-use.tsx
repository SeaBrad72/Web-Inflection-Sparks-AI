import { Section, Wrap, Eyebrow, H2, Lead, Callout, Kbd } from "./sparkwright-ui";
import { SPARKWRIGHT } from "@/content/sparkwright";

export default function SparkwrightUse() {
  return (
    <Section id="use">
      <Wrap>
        <Eyebrow>What you actually do with it</Eyebrow>
        <H2>From an empty repo to a green pipeline, then into the loop.</H2>
        <Lead>
          Sparkwright is the execution engine that takes you from a{" "}
          <em>Ready</em> backlog to operating, monitored software, with the
          guardrails built in.
        </Lead>

        <ol className="mt-8 max-w-[720px]">
          <li className="border-t border-border-subtle py-5 flex gap-5">
            <div className="font-mono text-teal-light" aria-hidden="true">01</div>
            <div>
              <h3 className="text-base font-semibold tracking-tight mb-1.5">
                Create your project <em>from</em> the kit
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                One script turns a throwaway clone into a clean, CI-ready
                project of your own — with every stack profile still on the
                table, so your stack stays a decision, not a default.
              </p>
            </div>
          </li>
          <li className="border-t border-border-subtle py-5 flex gap-5">
            <div className="font-mono text-teal-light" aria-hidden="true">02</div>
            <div>
              <h3 className="text-base font-semibold tracking-tight mb-1.5">
                Let it guide you through Inception (Phase 0)
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Open the project in your AI coding tool and say{" "}
                <Kbd>&ldquo;Walk me through START-HERE.&rdquo;</Kbd> You
                write a charter, <strong>
                  choose your stack and record it as ADR-000
                </strong>{" "}
                — the one step that decides what you build it with — stand up
                CI, and get a{" "}
                <strong>
                  green pipeline on the empty project before any feature work
                </strong>
                . You build on working software, not an empty repo.
              </p>
            </div>
          </li>
          <li className="border-t border-border-subtle py-5 flex gap-5">
            <div className="font-mono text-teal-light" aria-hidden="true">03</div>
            <div>
              <h3 className="text-base font-semibold tracking-tight mb-1.5">
                Enter the loop
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Each backlog item flows through the delivery cycle. You, the
                human, sit on the gates — approve the design, make the
                go/no-go at release, accept the increment. The agents do the
                building between the gates, at machine speed.
              </p>
            </div>
          </li>
        </ol>

        <pre className="mt-6 max-w-[720px] overflow-x-auto rounded-xl border border-border bg-[#08080a] p-5">
          <div className="mb-3.5 flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-2 font-mono text-xs text-muted-foreground">
              create-your-project.sh
            </span>
          </div>
          <code className="block font-mono text-[13.5px] leading-[1.7] text-foreground/85">
            <span className="text-muted-foreground">
              # A throwaway clone — used only to create your project
            </span>
            {"\n"}
            <span className="text-teal-light">
              git clone --depth 1 {SPARKWRIGHT.repoUrl} /tmp/sparkwright
            </span>
            {"\n\n"}
            <span className="text-muted-foreground">
              # Your new project
            </span>
            {"\n"}
            <span className="text-teal-light">
              sh /tmp/sparkwright/scripts/adopter-export.sh ./my-app
            </span>
            {"\n"}
            <span className="text-teal-light">cd my-app</span>
            {"\n\n"}
            <span className="text-muted-foreground">
              # then open it in your AI coding tool and say:
            </span>
            {"\n"}
            <span className="text-muted-foreground">
              {'#   "Walk me through START-HERE."'}
            </span>
          </code>
        </pre>

        <div className="mt-6 max-w-[720px]">
          <Callout tone="orange">
            <p>
              <strong>An existing codebase won&rsquo;t pass on day one
              &mdash; and doesn&rsquo;t have to.</strong> Brownfield adoption
              merges the kit into the repo you already have and lets a failing
              gate run on a <em>time-boxed waiver</em>: tracked, owned,
              ratified, and capped at 90 days. Never a silently disabled check.
              Secret-scan and branch protection can never be waived at all.
            </p>
          </Callout>
        </div>

        <p className="mt-[30px] text-[17.5px] text-muted max-w-[720px] leading-relaxed">
          <strong>And every function has a door.</strong> Product, design, QA,
          DevOps, security and engineering each start at their own row, with
          their own artifact &mdash; but routing by role changes which document
          you open, never which gate applies. Non-builders get the rigor
          carried, not waived.
        </p>
      </Wrap>
    </Section>
  );
}
