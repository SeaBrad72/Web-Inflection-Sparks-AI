import { z } from "zod";

const harnessSchema = z.object({
  name: z.string().min(1),
  level: z.enum(["verified reference", "floor-verified", "enforcement floor"]),
  note: z.string().min(1),
});

const statSchema = z.object({
  figure: z.string().min(1),
  label: z.string().min(1),
  /** Attribution is mandatory — see the plan's Global Constraints. */
  source: z.string().min(1),
  tone: z.enum(["risk", "green"]),
});

export const sparkwrightSchema = z.object({
  version: z.string().regex(/^v\d+\.\d+\.\d+$/, "version must look like v3.218.0"),
  maturity: z.enum(["pre-adoption", "release-candidate", "adopted"]),
  license: z.string().min(1),
  repoUrl: z.url(),
  lastReleaseAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  lastReviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  harnesses: z.array(harnessSchema).min(1),
  stats: z.array(statSchema).min(1),
});

export type Sparkwright = z.infer<typeof sparkwrightSchema>;

export const SPARKWRIGHT = {
  version: "v3.221.0",
  maturity: "release-candidate",
  license: "Apache-2.0",
  repoUrl: "https://github.com/SeaBrad72/sparkwright",
  lastReleaseAt: "2026-09-01",
  lastReviewed: "2026-09-01",
  harnesses: [
    {
      name: "Claude Code",
      level: "verified reference",
      note: "Inline enforcement blocks a risky write before it lands.",
    },
    {
      name: "Codex",
      level: "floor-verified",
      note: "A cold, operator-run field test drove it through the guardrails live and it passed all five acceptance criteria — the honest maximum for a harness with no inline pre-execution hook.",
    },
    {
      name: "Cursor",
      level: "enforcement floor",
      note: "Routing + a pre-push hook + a CI backstop. Experimental until exercised.",
    },
    {
      name: "Gemini",
      level: "enforcement floor",
      note: "Routing + a pre-push hook + a CI backstop. Experimental until exercised.",
    },
  ],
  stats: [
    {
      figure: "+30%",
      label: "higher defect risk when AI writes into unhealthy or legacy code",
      source: "CodeScene · peer-reviewed · 2026",
      tone: "risk",
    },
    {
      figure: "45%",
      label:
        "of AI-generated code samples contained an OWASP Top-10 security flaw",
      source: "Veracode · 100+ models · 2025",
      tone: "risk",
    },
    {
      figure: "cheap",
      label: "agent effort itself — the resource to spend freely, once it's governed",
      source: "Sparkwright's governing lens",
      tone: "green",
    },
  ],
} as const satisfies Sparkwright;
