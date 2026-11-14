import { Section, Wrap, Eyebrow, H2, Lead, Callout, Kbd } from "./sparkwright-ui";
import { SPARKWRIGHT } from "@/content/sparkwright";

export default function SparkwrightUse() {
  return (
    <Section id="use">
      <Wrap>
        <Eyebrow>What you actually do with it</Eyebrow>
        <H2>A new repo, or the one you already have.</H2>
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
                One command from the kit to your project
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Five questions &mdash; stack, solo or team, board, which agent
                tools, and a name &mdash; then it exports a clean project,
                checks your toolchain, runs Inception&rsquo;s setup and checks
                again, ending with a list of what&rsquo;s still owed. Your
                tree gets only what your project uses &mdash; the kit&rsquo;s
                own development machinery stays behind &mdash; and each later
                release arrives as a patch you review and apply, never a
                silent overwrite.
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
                Open it in your AI tool and say{" "}
                <Kbd>&ldquo;Walk me through START-HERE.&rdquo;</Kbd> A charter,{" "}
                <strong>your stack decision recorded as an ADR</strong>, CI
                stood up &mdash; and a{" "}
                <strong>green pipeline before any feature work</strong>.
                Inception Done comes in two lists: what your first slice needs,
                and what your first production deploy needs &mdash; SLOs,
                environments, on-call, rollback and recovery &mdash; so
                production readiness is owed before you ship, not before you
                start.
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
                Every backlog item runs the loop, and your team holds the
                gates. Start solo; when people join, one command makes it a
                team &mdash; no second Inception.
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
              # Your new project: five questions, then it sets it up
            </span>
            {"\n"}
            <span className="text-teal-light">
              sh /tmp/sparkwright/scripts/sparkwright new ./my-app
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
              &mdash; and doesn&rsquo;t have to.</strong> One command composes
              the kit&rsquo;s guard and entry contract into a single patch you
              read and apply, and your agent can draft the charter, stack
              decision, runbook and backlog gaps from the code you already
              have, for a person to ratify. A failing gate runs on a{" "}
              <em>time-boxed waiver</em>: tracked, owned,
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
          carried, not waived. And the person approving the work gets one
          page: what to approve, what to type, and what each red message
          means.
        </p>
      </Wrap>
    </Section>
  );
}
