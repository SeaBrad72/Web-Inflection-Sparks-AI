import { Section, Wrap, Eyebrow, H2, Kbd } from "./sparkwright-ui";
import { SPARKWRIGHT } from "@/content/sparkwright";

export default function SparkwrightCTA() {
  return (
    <Section>
      <Wrap>
        <div className="rounded-2xl border border-teal/30 bg-gradient-to-b from-teal/[0.12] to-transparent px-8 py-12 sm:px-11 sm:py-14 text-center">
          <div className="flex justify-center">
            <Eyebrow>Get started</Eyebrow>
          </div>
          <div className="mx-auto max-w-[20ch]">
            <H2>Bring the idea. The kit brings the guardrails.</H2>
          </div>
          <p className="mt-4 text-[17.5px] text-muted max-w-[720px] mx-auto leading-relaxed">
            Create a project from the kit, let it walk you through Inception,
            and enter the loop. Engineers start at <Kbd>START-HERE.md</Kbd>;
            new adopters at <Kbd>ONBOARDING.md</Kbd>; leaders at the
            Executive Brief.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={SPARKWRIGHT.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-teal text-white font-medium hover:bg-teal-light transition-all hover:shadow-lg hover:shadow-teal/20"
            >
              View on GitHub →
            </a>
            <a
              href="#top"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border text-muted hover:text-foreground hover:border-muted-foreground transition-all"
            >
              Back to top
            </a>
          </div>
        </div>

        <div className="border-t border-border-subtle mt-12 pt-10 text-center">
          <h3 className="text-lg font-semibold tracking-tight">
            Want this run in your org?
          </h3>
          <p className="mt-2 text-sm text-muted max-w-[60ch] mx-auto leading-relaxed">
            If you&rsquo;re weighing a rollout, staged conformance, or
            compliance mapping, let&rsquo;s talk it through.
          </p>
          <a
            href="/contact"
            className="mt-5 inline-flex items-center justify-center gap-2 text-sm font-medium text-teal-light hover:text-teal transition-colors"
          >
            Get in touch →
          </a>
        </div>
      </Wrap>
    </Section>
  );
}
