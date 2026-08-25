# Sparkwright Product Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `/sparkwright` — a native Next.js product page for the Sparkwright agentic SDLC kit — wired into the site's nav, footer, homepage, and sitemap, backed by a content module that a scheduled GitHub Action keeps current.

**Architecture:** The existing standalone HTML (`~/Downloads/sparkwright-overview_1.html`) is ported into ~11 route-scoped React components under `src/app/sparkwright/`, following the same folder convention as `/build` and `/lead`. All volatile facts (version, maturity, harness levels, stats) live in a single Zod-validated content module. A tokenless daily GitHub Action polls the kit's public releases API and opens a PR when the version changes. The repo currently has no CI and no test runner; Task 1 establishes both.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion, lucide-react, Resend, Zod (new), Vitest (new), GitHub Actions (new).

**Spec:** `docs/superpowers/specs/2026-08-24-sparkwright-product-page-design.md`

## Global Constraints

- **Route:** `/sparkwright`. Canonical URL `https://inflectionsparks.ai/sparkwright`.
- **Repo URL:** `https://github.com/SeaBrad72/sparkwright` — always via `SPARKWRIGHT.repoUrl`, never hardcoded in a component.
- **Colors:** use existing Tailwind tokens only — `teal` (`#2f855a`), `teal-light` (`#38a169`), `orange` (`#f97316`), `surface`, `border`, `border-subtle`, `muted`, `muted-foreground`. Do **not** introduce new color variables; the site's "teal" tokens are already the source page's greens.
- **Fonts:** already loaded globally as `--font-geist-sans` / `--font-geist-mono`. Use `font-mono` for eyebrows, badges, code, and stat sources. Do **not** add a Google Fonts `<link>`.
- **No volatile facts in components.** Version, maturity, license, release date, harness levels, and stat figures are read from `SPARKWRIGHT` in `src/content/sparkwright.ts`.
- **Attribution is a correctness requirement.** The DORA / Veracode / CodeScene figures must render their source line and must remain framed as industry findings about the problem, **not** Sparkwright's results. Never drop the "not Sparkwright's results" sentence.
- **Layout container:** `mx-auto max-w-7xl px-6 lg:px-8` — matches every other route.
- **Prose width:** cap body copy at `max-w-[720px]`, matching the source's `--readw`.
- **Coverage floor:** 80% on `src/content/` and `src/app/api/` only. Presentational section components are excluded — do not write snapshot tests for marketing JSX.
- **Commits:** Conventional Commits. Branch `feature/sparkwright-product-page`.
- **Copy is authoritative.** All prose in this plan is transcribed from the source HTML. Do not paraphrase, tighten, or "improve" it.

---

### Task 1: Tooling foundation — type-check, Vitest, Zod, CI

The repo has `dev`, `build`, `start`, `lint` and no `.github/` directory. Everything downstream depends on a working test command, so this lands first.

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `.github/workflows/ci.yml`

**Interfaces:**
- Consumes: nothing.
- Produces: `npm run type-check`, `npm test`, `npm run test:coverage`. All later tasks rely on these exact script names.

- [ ] **Step 1: Create the branch**

```bash
git checkout -b feature/sparkwright-product-page
```

- [ ] **Step 2: Install dev dependencies**

```bash
npm install --save-exact zod
npm install --save-dev --save-exact vitest @vitejs/plugin-react vite-tsconfig-paths @vitest/coverage-v8
```

Note: global standards require exact versions (no `^`/`~`) for production apps. `--save-exact` enforces this.

- [ ] **Step 3: Add scripts to `package.json`**

Add to the `scripts` block:

```json
"type-check": "tsc --noEmit",
"test": "vitest run",
"test:watch": "vitest",
"test:coverage": "vitest run --coverage"
```

- [ ] **Step 4: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    coverage: {
      provider: "v8",
      include: ["src/content/**", "src/app/api/**"],
      thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 },
    },
  },
});
```

- [ ] **Step 5: Verify the toolchain runs**

```bash
npm run type-check
npm test
```

Expected: `type-check` passes clean. `test` exits 0 reporting "No test files found" — that is success at this step, not a failure.

- [ ] **Step 6: Create `.github/workflows/ci.yml`**

```yaml
name: CI

on:
  push:
    branches: ["**"]
  pull_request:

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "24"
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm test
      - run: npm run build
        env:
          NEXT_PUBLIC_SANITY_PROJECT_ID: ${{ secrets.NEXT_PUBLIC_SANITY_PROJECT_ID }}
          NEXT_PUBLIC_SANITY_DATASET: ${{ secrets.NEXT_PUBLIC_SANITY_DATASET }}
```

Before committing, confirm the Sanity env var names by reading `src/sanity/client.ts` and `src/sanity/config.ts`, and correct the `env:` block to match. If `next build` succeeds locally without them, drop the `env:` block entirely.

- [ ] **Step 7: Verify the build still passes locally**

```bash
npm run build
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json vitest.config.ts .github/workflows/ci.yml
git commit -m "chore: add type-check, vitest, and CI workflow"
```

---

### Task 2: Content module — the single source of volatile facts

**Files:**
- Create: `src/content/sparkwright.ts`
- Test: `src/content/sparkwright.test.ts`

**Interfaces:**
- Consumes: `zod` (Task 1).
- Produces:
  - `SPARKWRIGHT: Sparkwright` — the validated content object, imported by every section component and by Task 13's workflow.
  - `sparkwrightSchema: z.ZodType<Sparkwright>` — exported for the test and the sync workflow.
  - `type Sparkwright`
  - `isContentStale(now?: Date): boolean` — true when `lastReviewed` is more than 90 days before `now`.

- [ ] **Step 1: Write the failing test**

Create `src/content/sparkwright.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { SPARKWRIGHT, sparkwrightSchema, isContentStale } from "./sparkwright";

describe("SPARKWRIGHT content module", () => {
  it("validates against its own schema", () => {
    expect(() => sparkwrightSchema.parse(SPARKWRIGHT)).not.toThrow();
  });

  it("rejects a version that is not a semver tag", () => {
    const bad = { ...SPARKWRIGHT, version: "3.218" };
    expect(() => sparkwrightSchema.parse(bad)).toThrow();
  });

  it("rejects a stat card missing its source attribution", () => {
    const bad = {
      ...SPARKWRIGHT,
      stats: [{ figure: "45%", label: "of AI-generated code shipped a flaw" }],
    };
    expect(() => sparkwrightSchema.parse(bad)).toThrow();
  });

  it("rejects an unknown maturity stage", () => {
    const bad = { ...SPARKWRIGHT, maturity: "production" };
    expect(() => sparkwrightSchema.parse(bad)).toThrow();
  });

  it("requires at least one harness", () => {
    const bad = { ...SPARKWRIGHT, harnesses: [] };
    expect(() => sparkwrightSchema.parse(bad)).toThrow();
  });

  it("reports content as fresh within 90 days of lastReviewed", () => {
    const reviewed = new Date(SPARKWRIGHT.lastReviewed);
    const thirtyDaysLater = new Date(reviewed.getTime() + 30 * 86_400_000);
    expect(isContentStale(thirtyDaysLater)).toBe(false);
  });

  it("reports content as stale more than 90 days after lastReviewed", () => {
    const reviewed = new Date(SPARKWRIGHT.lastReviewed);
    const ninetyOneDaysLater = new Date(reviewed.getTime() + 91 * 86_400_000);
    expect(isContentStale(ninetyOneDaysLater)).toBe(true);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
npx vitest run src/content/sparkwright.test.ts
```

Expected: FAIL — cannot resolve `./sparkwright`.

- [ ] **Step 3: Write the content module**

Create `src/content/sparkwright.ts`. Before writing the values, check the actual current release at https://github.com/SeaBrad72/sparkwright/releases/latest and use the real `version` and `lastReleaseAt`; the values below are from the source HTML and may already be behind.

```ts
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
  repoUrl: z.string().url(),
  lastReleaseAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  lastReviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  harnesses: z.array(harnessSchema).min(1),
  stats: z.array(statSchema).min(1),
});

export type Sparkwright = z.infer<typeof sparkwrightSchema>;

export const SPARKWRIGHT = {
  version: "v3.218.0",
  maturity: "release-candidate",
  license: "Apache-2.0",
  repoUrl: "https://github.com/SeaBrad72/sparkwright",
  lastReleaseAt: "2026-08-20",
  lastReviewed: "2026-08-24",
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
      label: "of AI-generated code shipped an OWASP Top-10 security flaw",
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

const STALE_AFTER_DAYS = 90;

/** True when the narrative copy has not been human-reviewed in over 90 days. */
export function isContentStale(now: Date = new Date()): boolean {
  const reviewed = new Date(SPARKWRIGHT.lastReviewed);
  const ageDays = (now.getTime() - reviewed.getTime()) / 86_400_000;
  return ageDays > STALE_AFTER_DAYS;
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
npx vitest run src/content/sparkwright.test.ts
npm run type-check
```

Expected: 7 tests PASS, type-check clean.

- [ ] **Step 5: Commit**

```bash
git add src/content/sparkwright.ts src/content/sparkwright.test.ts
git commit -m "feat: add sparkwright content module with schema validation"
```

---

### Task 3: Release-notify API endpoint

Models `src/app/api/contact/route.ts`. Read that file first — reuse its `getResendClient()` and `escapeHtml()` shape exactly rather than inventing a new one.

**Files:**
- Create: `src/app/api/notify/route.ts`
- Test: `src/app/api/notify/route.test.ts`

**Interfaces:**
- Consumes: `resend`, `SPARKWRIGHT` (Task 2).
- Produces: `POST /api/notify` accepting `{ email: string }`, returning `{ ok: true }` (200) or `{ error: string }` (400 / 429 / 500). Task 11's form posts to it.

- [ ] **Step 1: Write the failing test**

Create `src/app/api/notify/route.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";

const sendMock = vi.fn().mockResolvedValue({ data: { id: "test" }, error: null });
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({ emails: { send: sendMock } })),
}));

import { POST } from "./route";

function post(body: unknown, ip = "203.0.113.1") {
  return new Request("https://inflectionsparks.ai/api/notify", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

describe("POST /api/notify", () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = "test-key";
    sendMock.mockClear();
  });

  it("accepts a valid email", async () => {
    const res = await POST(post({ email: "dev@example.com" }, "203.0.113.10"));
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });
    expect(sendMock).toHaveBeenCalledOnce();
  });

  it("rejects a malformed email", async () => {
    const res = await POST(post({ email: "not-an-email" }, "203.0.113.11"));
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects a missing email", async () => {
    const res = await POST(post({}, "203.0.113.12"));
    expect(res.status).toBe(400);
  });

  it("rejects CRLF header injection", async () => {
    const res = await POST(
      post({ email: "a@b.com\r\nBcc: victim@example.com" }, "203.0.113.13")
    );
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects an over-length email", async () => {
    const res = await POST(
      post({ email: `${"a".repeat(250)}@example.com` }, "203.0.113.14")
    );
    expect(res.status).toBe(400);
  });

  it("rejects a honeypot submission without sending mail", async () => {
    const res = await POST(
      post({ email: "dev@example.com", company: "spam" }, "203.0.113.15")
    );
    expect(res.status).toBe(200);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rate-limits repeated submissions from one IP", async () => {
    const ip = "203.0.113.99";
    for (let i = 0; i < 5; i++) {
      await POST(post({ email: `user${i}@example.com` }, ip));
    }
    const res = await POST(post({ email: "six@example.com" }, ip));
    expect(res.status).toBe(429);
  });

  it("returns 500 when RESEND_API_KEY is unset", async () => {
    delete process.env.RESEND_API_KEY;
    const res = await POST(post({ email: "dev@example.com" }, "203.0.113.20"));
    expect(res.status).toBe(500);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
npx vitest run src/app/api/notify/route.test.ts
```

Expected: FAIL — cannot resolve `./route`.

- [ ] **Step 3: Read the existing contact route for the shared patterns**

```bash
sed -n 1,120p src/app/api/contact/route.ts
```

Reuse `getResendClient()`, `escapeHtml()`, and the `from:` / `to:` addresses verbatim. Do not duplicate the helper bodies from memory — copy them.

- [ ] **Step 4: Write the route**

Create `src/app/api/notify/route.ts`:

```ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SPARKWRIGHT } from "@/content/sparkwright";

function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY environment variable is not set");
  }
  return new Resend(process.env.RESEND_API_KEY);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let payload: { email?: string; company?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { email, company } = payload;
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  // Honeypot: `company` is a hidden field no human fills in. Accept silently
  // so bots get a 200 and learn nothing, but send nothing.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  if (!email?.trim()) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }
  if (email.length > 254) {
    return NextResponse.json({ error: "Email is too long." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || /[\r\n]/.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  const safeEmail = escapeHtml(email.trim());

  try {
    const resend = getResendClient();
    await resend.emails.send({
      from: "InflectionSparks.ai <noreply@inflectionsparks.ai>",
      to: "bpjames101@gmail.com",
      subject: `Sparkwright release notify signup — ${safeEmail}`,
      html: `<p>New Sparkwright release-notify signup.</p>
             <p><strong>Email:</strong> ${safeEmail}</p>
             <p><strong>Current release:</strong> ${SPARKWRIGHT.version} (${SPARKWRIGHT.maturity})</p>`,
    });
  } catch (err) {
    console.error("[api/notify] Failed to send notification:", err);
    return NextResponse.json(
      { error: "Could not process signup. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
```

Correct the `from:` and `to:` addresses to whatever `src/app/api/contact/route.ts` actually uses.

- [ ] **Step 5: Run the test to verify it passes**

```bash
npx vitest run src/app/api/notify/route.test.ts
npm run type-check
```

Expected: 8 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/app/api/notify/route.ts src/app/api/notify/route.test.ts
git commit -m "feat: add release-notify endpoint with rate limiting and honeypot"
```

**Known limitation to note in the RUNBOOK (Task 15):** the rate-limit map is per-instance and resets on cold start. Adequate for this traffic volume; if abuse appears, move to a shared store.

---

### Task 4: Nav — `openMenu` refactor and the Products dropdown

**Files:**
- Modify: `src/components/nav.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `/sparkwright` reachable from desktop and mobile nav.

- [ ] **Step 1: Replace the single boolean with `openMenu`**

In `src/components/nav.tsx`, replace:

```tsx
const [servicesOpen, setServicesOpen] = useState(false);
```

with:

```tsx
const [openMenu, setOpenMenu] = useState<string | null>(null);
```

This guarantees only one dropdown is open at a time.

- [ ] **Step 2: Add Products to `navLinks`**

Insert directly after the `Services` entry, before `Work`:

```tsx
{
  label: "Products",
  href: "#products",
  children: [
    {
      label: "Sparkwright",
      href: "/sparkwright",
      description: "The agentic SDLC kit",
    },
  ],
},
```

- [ ] **Step 3: Rewire the dropdown to be keyed by label**

In the desktop `navLinks.map(...)` branch for `link.children`, replace every use of `servicesOpen` / `setServicesOpen` and the hardcoded `services-dropdown` id:

```tsx
onMouseEnter={() => setOpenMenu(link.label)}
onMouseLeave={() => setOpenMenu(null)}
```

```tsx
<button
  aria-haspopup="true"
  aria-expanded={openMenu === link.label}
  aria-controls={`${link.label.toLowerCase()}-dropdown`}
  onClick={() => setOpenMenu(openMenu === link.label ? null : link.label)}
  onKeyDown={(e) => {
    if (e.key === "Escape") setOpenMenu(null);
  }}
  className="flex items-center gap-1 px-4 py-2 text-sm text-muted hover:text-foreground transition-colors"
>
```

```tsx
{openMenu === link.label && (
  <motion.div
    id={`${link.label.toLowerCase()}-dropdown`}
    role="menu"
    ...
```

The mobile accordion branch already iterates `link.children` generically and needs no change — verify this by reading it rather than assuming.

- [ ] **Step 4: Verify in the browser**

```bash
npm run dev
```

Check at desktop width: both dropdowns open on hover, opening one closes the other, Escape closes, Tab reaches every item, focus ring is visible. Then at 375px: both groups render as labelled accordion sections and `Sparkwright` is tappable.

- [ ] **Step 5: Verify types and lint**

```bash
npm run type-check && npm run lint
```

Expected: both clean.

- [ ] **Step 6: Commit**

```bash
git add src/components/nav.tsx
git commit -m "feat: add Products nav group with Sparkwright"
```

---

### Task 5: Footer, sitemap, and homepage entry point

Three small wiring changes that stop `/sparkwright` being an orphan. Grouped because none is independently reviewable.

**Files:**
- Modify: `src/components/footer.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/page.tsx`
- Create: `src/components/sparkwright-strip.tsx`

**Interfaces:**
- Consumes: `SPARKWRIGHT` (Task 2).
- Produces: `<SparkwrightStrip />`, rendered on the homepage.

- [ ] **Step 1: Add the Products group to the footer**

In `src/components/footer.tsx`, add to `footerLinks` between `Services` and `Company`:

```tsx
Products: [
  { label: "Sparkwright", href: "/sparkwright" },
  { label: "Sparkwright on GitHub", href: "https://github.com/SeaBrad72/sparkwright", external: true },
],
```

The footer grid is `md:grid-cols-4` with brand + 3 groups. Adding a fourth group makes 5 columns — change the grid to `md:grid-cols-3 lg:grid-cols-5` and verify at 768px and 1024px that nothing wraps awkwardly.

- [ ] **Step 2: Add the sitemap entry**

In `src/app/sitemap.ts`, add to `staticPages` after the `/transform` entry:

```ts
{
  url: `${baseUrl}/sparkwright`,
  lastModified: new Date(),
  changeFrequency: "weekly",
  priority: 0.8,
},
```

- [ ] **Step 3: Create the homepage strip**

Create `src/components/sparkwright-strip.tsx`:

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SPARKWRIGHT } from "@/content/sparkwright";

export default function SparkwrightStrip() {
  return (
    <section className="border-t border-border-subtle">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="rounded-2xl border border-teal/25 bg-gradient-to-b from-teal/[0.06] to-transparent p-8 sm:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-teal-light mb-4">
            Products
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Sparkwright — the agentic SDLC kit
          </h2>
          <p className="text-muted leading-relaxed max-w-[720px] mb-6">
            Guardrails that let anyone build production-grade software with AI
            agents, from an idea to operating software. Open source, neutral on
            stack, harness, and model.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/sparkwright"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-teal text-white text-sm font-medium hover:bg-teal-light transition-colors"
            >
              Explore Sparkwright
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <span className="font-mono text-xs text-muted-foreground">
              {SPARKWRIGHT.version} · {SPARKWRIGHT.license} · {SPARKWRIGHT.maturity}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Mount it on the homepage**

In `src/app/page.tsx`, add the import and render `<SparkwrightStrip />` between `<ProofPoints />` and `<Engagement />`. Change nothing else on the homepage.

- [ ] **Step 5: Verify**

```bash
npm run type-check && npm run lint && npm run build
```

Then load `/` in dev and confirm the strip sits in the section rhythm without disrupting neighbours.

- [ ] **Step 6: Commit**

```bash
git add src/components/footer.tsx src/app/sitemap.ts src/app/page.tsx src/components/sparkwright-strip.tsx
git commit -m "feat: wire sparkwright into footer, sitemap, and homepage"
```

---

### Task 6: Route scaffold — shared primitives, page shell, OG image

Establishes the visual vocabulary every section reuses. Doing this before the sections prevents eleven divergent card implementations.

**Files:**
- Create: `src/app/sparkwright/sparkwright-ui.tsx`
- Create: `src/app/sparkwright/page.tsx`
- Create: `src/app/sparkwright/opengraph-image.tsx`
- Create: `src/app/sparkwright/sparkwright-hero.tsx`

**Interfaces:**
- Consumes: `SPARKWRIGHT` (Task 2).
- Produces, from `sparkwright-ui.tsx` — every later section imports these:
  - `<Section id?: string, children>` — `<section>` with top border and vertical rhythm
  - `<Wrap children>` — the `max-w-7xl` container
  - `<Eyebrow children>` — mono, uppercase, teal-light
  - `<H2 children>` — the section heading scale
  - `<Lead children>` — 17.5px muted intro paragraph
  - `<Card title, children, accent?: boolean>`
  - `<Callout tone?: "green" | "orange", children>`
  - `<Kbd children>` — inline mono token

- [ ] **Step 1: Create the shared primitives**

Create `src/app/sparkwright/sparkwright-ui.tsx` as a server component (no `"use client"`). Implement each primitive above with these Tailwind mappings, transcribed from the source CSS:

- `Section`: `border-t border-border-subtle py-16 sm:py-20`
- `Wrap`: `mx-auto max-w-7xl px-6 lg:px-8`
- `Eyebrow`: `font-mono text-xs uppercase tracking-[0.15em] text-teal-light mb-3.5 font-medium`
- `H2`: `text-3xl sm:text-4xl font-bold tracking-tight leading-[1.12] max-w-[20ch]`
- `Lead`: `mt-5 text-[17.5px] text-muted max-w-[720px] leading-relaxed`
- `Card`: `rounded-xl border border-border bg-surface p-6`; when `accent`, `border-teal/35 bg-gradient-to-b from-teal/[0.06] to-transparent`. Title is `text-lg font-semibold tracking-tight mb-2.5`.
- `Callout`: `border-l-[3px] border-teal bg-gradient-to-r from-teal/[0.07] to-transparent px-6 py-5 rounded-r-xl max-w-[720px]`; `tone="orange"` swaps `border-orange` / `from-orange/[0.07]`.
- `Kbd`: `font-mono text-[0.88em] text-foreground/85 bg-white/5 px-1.5 py-0.5 rounded border border-border-subtle`

- [ ] **Step 2: Create the hero**

Create `src/app/sparkwright/sparkwright-hero.tsx` with `"use client"` (it uses Framer Motion, matching `build-hero.tsx`). Copy transcribed from source:

- Pill: `Agentic SDLC · Guardrails-first · Neutral on stack, harness & model`
- H1: `Let anyone build ` + `production-grade software` (`text-teal-light`) + ` with AI agents — from an idea to ` + `operating software` (`text-orange`) + `.`
- Subtitle: "Sparkwright turns a repository — new or existing — into a project that ships real software through a guided, agent-driven lifecycle. You bring the idea and the decisions; the kit brings the process, the guardrails, and a working pipeline to build on."
- CTAs — **only one filled button**, per the spec's CTA hierarchy: primary "Explore the repo" → `SPARKWRIGHT.repoUrl` (`target="_blank" rel="noopener noreferrer"`); secondary ghost "See how it works" → `#use`.
- Badges row, all from the content module: `SPARKWRIGHT.version`, `SPARKWRIGHT.license`, `maturity: {SPARKWRIGHT.maturity}` (orange), `any stack · harness · model`, `built with its own loop`.

Wrap Framer Motion entrances so they respect reduced motion — use `useReducedMotion()` from `framer-motion` and skip the `y` offset when it returns true.

- [ ] **Step 3: Create the OG image**

Create `src/app/sparkwright/opengraph-image.tsx`, matching `src/app/build/opengraph-image.tsx` exactly:

```tsx
import { generateOgImage, size, contentType } from "@/lib/og-image";

export { size, contentType };

export default async function Image() {
  return generateOgImage({
    title: "Sparkwright — The agentic SDLC kit",
    subtitle: "Production-grade software with AI agents",
  });
}
```

- [ ] **Step 4: Create the page shell**

Create `src/app/sparkwright/page.tsx`, following `src/app/build/page.tsx`:

```tsx
import type { Metadata } from "next";
import SparkwrightHero from "./sparkwright-hero";

export const metadata: Metadata = {
  title: "Sparkwright — The agentic SDLC kit",
  description:
    "Sparkwright is the agentic SDLC kit: guardrails that let anyone build production-grade software with AI agents, from an idea to operating software.",
  alternates: { canonical: "https://inflectionsparks.ai/sparkwright" },
  openGraph: {
    title: "Sparkwright — The agentic SDLC kit | InflectionSparks.ai",
    description:
      "Guardrails that let anyone build production-grade software with AI agents. Open source, neutral on stack, harness, and model.",
  },
};

export default function SparkwrightPage() {
  return (
    <>
      <SparkwrightHero />
    </>
  );
}
```

Sections from Tasks 7–12 get appended here as they are built.

- [ ] **Step 5: Verify**

```bash
npm run type-check && npm run lint
```

Load `/sparkwright` in dev. The hero should render on the site's nav and footer, in green, with Geist Mono badges.

- [ ] **Step 6: Commit**

```bash
git add src/app/sparkwright/
git commit -m "feat: add sparkwright route scaffold, shared UI primitives, and hero"
```

---

### Task 7: Sections — "In 60 seconds" and "Why now"

**Files:**
- Create: `src/app/sparkwright/sparkwright-what.tsx`
- Create: `src/app/sparkwright/sparkwright-why.tsx`
- Modify: `src/app/sparkwright/page.tsx`

**Interfaces:**
- Consumes: the primitives from Task 6; `SPARKWRIGHT.stats` (Task 2).
- Produces: `<SparkwrightWhat />` (anchor `what`), `<SparkwrightWhy />` (anchor `why`).

- [ ] **Step 1: Build the "In 60 seconds" section**

Server component. Eyebrow `In 60 seconds`. H2: "Opinionated about **how** you build. Neutral about **what** you build with." — `how` in `text-teal-light`, `what` in `text-orange`.

Lead and body paragraphs, then a 3-card grid (`grid gap-4 sm:grid-cols-2 lg:grid-cols-3`) with titles: "Agent-native & enforcement-native", "Honesty as a feature", "Complements, doesn't replace". Close with the "Who it's for." paragraph. Transcribe all body copy verbatim from the source HTML's `#what` section.

- [ ] **Step 2: Build the "Why now" section**

Server component. Eyebrow `Why now`. H2: "Agents amplify whatever discipline they're dropped into."

**The attribution requirement applies here.** The lead must retain: "...Recent, independent research on ungoverned AI is the warning. These are industry findings about the problem, **not Sparkwright's results**:"

Render the stat cards by mapping `SPARKWRIGHT.stats` — never hardcode the figures:

```tsx
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
```

Then the DORA paragraph and the trailing sources line, both verbatim from source.

- [ ] **Step 3: Mount both in `page.tsx`**

Add after `<SparkwrightHero />`.

- [ ] **Step 4: Verify**

```bash
npm run type-check && npm run lint
```

Load `/sparkwright` and confirm all three stat figures render with their source lines.

- [ ] **Step 5: Commit**

```bash
git add src/app/sparkwright/ && git commit -m "feat: add sparkwright what-it-is and why-now sections"
```

---

### Task 8: Sections — "Use it" and "First principles"

**Files:**
- Create: `src/app/sparkwright/sparkwright-use.tsx`
- Create: `src/app/sparkwright/sparkwright-principles.tsx`
- Modify: `src/app/sparkwright/page.tsx`

**Interfaces:**
- Consumes: primitives from Task 6; `SPARKWRIGHT.repoUrl`.
- Produces: `<SparkwrightUse />` (anchor `use` — the hero's ghost CTA targets it), `<SparkwrightPrinciples />` (anchor `principles`).

- [ ] **Step 1: Build the "Use it" section**

Eyebrow `What you actually do with it`. H2: "From an empty repo to a green pipeline, then into the loop."

Three numbered steps (`01`/`02`/`03` in `font-mono text-teal-light`, each row `border-t border-border-subtle py-5 flex gap-5`): "Create your project *from* the kit", "Let it guide you through Inception (Phase 0)", "Enter the loop". Body copy verbatim.

Then the code block. Render as `<pre>` with `overflow-x-auto` (per the artifact rule that wide content scrolls in its own container, not the page). The clone URL must interpolate `SPARKWRIGHT.repoUrl`:

```tsx
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
    {/* comment lines in text-muted-foreground, commands in text-teal-light */}
  </code>
</pre>
```

Then the orange `<Callout tone="orange">` for the brownfield path, and the closing "The shape, in one line:" paragraph — both verbatim.

- [ ] **Step 2: Build the "First principles" section**

Eyebrow `First principles & foundations`. H2: "Rituals that **clarify intent** get stronger. Rituals that just **manage effort** die." — `clarify intent` teal, `manage effort` orange.

Green `<Callout>` for "The governing lens." Then a 6-card grid: "Production-grade from day one", "Test-driven", "Architecture before implementation", "Automated quality gates", "Security & governance are foundational", "The loop closes". Close with the "From these follow the core ideas:" paragraph. All verbatim.

- [ ] **Step 3: Mount both in `page.tsx` and verify**

```bash
npm run type-check && npm run lint
```

Confirm the hero's "See how it works" ghost button scrolls to the Use section, and the code block scrolls horizontally at 375px without the page scrolling sideways.

- [ ] **Step 4: Commit**

```bash
git add src/app/sparkwright/ && git commit -m "feat: add sparkwright use-it and first-principles sections"
```

---

### Task 9: Sections — "Spine" and "Coverage" (with the accessible lifecycle loop)

**Files:**
- Create: `src/app/sparkwright/sparkwright-spine.tsx`
- Create: `src/app/sparkwright/sparkwright-coverage.tsx`
- Create: `src/app/sparkwright/lifecycle-loop.tsx`
- Modify: `src/app/sparkwright/page.tsx`

**Interfaces:**
- Consumes: primitives from Task 6; `SPARKWRIGHT.harnesses`, `SPARKWRIGHT.maturity`.
- Produces: `<SparkwrightSpine />` (anchor `spine`), `<SparkwrightCoverage />` (anchor `coverage`), and `<LifecycleLoop stages, label />` — reused by Task 11's maturity section.

- [ ] **Step 1: Build the accessible lifecycle loop**

This is the a11y-critical piece from the spec. The source renders `Inception → Discover → … → Operate ↺` as bare spans, which a screen reader reads as meaningless run-on text. Render an ordered list with an accessible label and hide the arrow glyphs:

```tsx
type Stage = { label: string; tone?: "once" | "highlight" };

export default function LifecycleLoop({
  stages,
  label,
}: {
  stages: Stage[];
  label: string;
}) {
  return (
    <ol aria-label={label} className="mt-8 flex flex-wrap items-center gap-2">
      {stages.map((stage, i) => (
        <li key={stage.label} className="flex items-center gap-2">
          <span
            className={`rounded-full border px-4 py-2 text-sm font-medium ${
              stage.tone === "once"
                ? "border-orange/35 bg-orange/[0.06] text-orange-light"
                : stage.tone === "highlight"
                  ? "border-teal/40 bg-teal/[0.09] text-foreground"
                  : "border-border bg-surface text-foreground"
            }`}
          >
            {stage.label}
          </span>
          {i < stages.length - 1 && (
            <span aria-hidden="true" className="text-xs text-muted-foreground">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
```

Note the final `↺` in the source signals the loop repeating. Convey that in the `label` prop text — e.g. `"Sparkwright lifecycle: Inception once, then a repeating loop from Discover to Operate"` — rather than as a decorative glyph a reader cannot interpret.

- [ ] **Step 2: Build the "Spine" section**

Eyebrow `How the kit is built`. H2: "Contract → Reference → Conformance." Lead, then three `accent` cards numbered 01/02/03: Contract, Reference, Conformance. Then the closing paragraph about mutation testing — verbatim, and note this is narrative the sync workflow will never update, so it must read correctly as written.

- [ ] **Step 3: Build the "Coverage" section**

Eyebrow `What it covers`. H2: "One guided spine, from idea to operating software." Lead, then:

```tsx
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
```

Then the "Works with your agent" `<Callout>`. Drive the harness claims from `SPARKWRIGHT.harnesses` rather than hardcoding, so a certification change is a data edit:

```tsx
<Callout>
  <p>
    <strong>Works with your agent.</strong>{" "}
    {SPARKWRIGHT.harnesses.map((h) => (
      <span key={h.name}>
        <strong>{h.name}</strong> — {h.level}. {h.note}{" "}
      </span>
    ))}
    Each harness is certified to the level it has actually reached — not claimed
    at blanket parity.
  </p>
</Callout>
```

- [ ] **Step 4: Mount both and verify**

```bash
npm run type-check && npm run lint
```

Confirm with VoiceOver (or Chrome DevTools accessibility tree) that the loop announces as a labelled list of 8 items and the arrows are not read aloud.

- [ ] **Step 5: Commit**

```bash
git add src/app/sparkwright/ && git commit -m "feat: add sparkwright spine and coverage sections with accessible lifecycle loop"
```

---

### Task 10: Sections — "Guardrails" and "Enterprise"

**Files:**
- Create: `src/app/sparkwright/sparkwright-guardrails.tsx`
- Create: `src/app/sparkwright/sparkwright-enterprise.tsx`
- Modify: `src/app/sparkwright/page.tsx`

**Interfaces:**
- Consumes: primitives from Task 6.
- Produces: `<SparkwrightGuardrails />` (anchor `guardrails`), `<SparkwrightEnterprise />` (anchor `enterprise`).

- [ ] **Step 1: Build the "Guardrails" section**

Eyebrow `Guardrails & governance`. H2: "Built in, not bolted on — the reason to adopt the kit."

A `<ul>` of seven items with the source's square gradient bullets (`before:` pseudo-element or an explicit `<span aria-hidden>`): The guard, Eight required CI quality gates, Separation of duties enforced, Model tiering, Autonomy tiers (L1/L2/L3), Ratification, Proportional promotion. Inline `<Kbd>` for `PreToolUse`, `shipped == approved`. All copy verbatim.

- [ ] **Step 2: Build the "Enterprise" section**

Eyebrow `For engineering leaders & compliance`. H2: "A portable, executable assurance layer you own and run in your own CI."

A 2-card grid: "Relative assurance against irreversible damage", "Audit-ready evidence", "No lock-in", "A staged rollout". Copy verbatim — note the first card's deliberate "Risk reduction, stated as such, not a guarantee" hedge must survive the port intact.

Then the compliance crosswalk in a native `<details>`/`<summary>` (no `"use client"` needed — keep it server-rendered and keyboard-accessible for free):

```tsx
<details className="mt-6 rounded-xl border border-border bg-surface overflow-hidden group">
  <summary className="cursor-pointer list-none px-6 py-4 font-semibold flex items-center justify-between hover:bg-white/[0.015]">
    <span>Compliance crosswalk — framework by framework</span>
    <span aria-hidden="true" className="text-teal-light transition-transform group-open:rotate-90">›</span>
  </summary>
  <div className="border-t border-border-subtle px-6 pb-6 pt-3">
    {/* intro paragraph, then the table */}
  </div>
</details>
```

The table must scroll in its own container: wrap in `<div className="mt-6 overflow-x-auto rounded-xl border border-border">` with `<table className="w-full min-w-[640px] border-collapse text-sm">`. Three rows: SOC 2, ISO 27001:2022, NIST SSDF — all cell copy verbatim. Close with the AI-governance crosswalk paragraph.

Add `summary::-webkit-details-marker { display: none }` via a `[&::-webkit-details-marker]:hidden` class on the `<summary>` rather than editing `globals.css`.

- [ ] **Step 3: Mount both and verify**

```bash
npm run type-check && npm run lint
```

Confirm the `<details>` opens with Enter/Space when focused, and the table scrolls horizontally at 375px without the page scrolling sideways.

- [ ] **Step 4: Commit**

```bash
git add src/app/sparkwright/ && git commit -m "feat: add sparkwright guardrails and enterprise sections"
```

---

### Task 11: Sections — "Honesty", "Maturity", and the tiered CTA

The maturity section was missing from the spec's component list; it exists in the source HTML (`#maturity`) and is included here.

**Files:**
- Create: `src/app/sparkwright/sparkwright-honesty.tsx`
- Create: `src/app/sparkwright/sparkwright-maturity.tsx`
- Create: `src/app/sparkwright/sparkwright-cta.tsx`
- Create: `src/app/sparkwright/notify-form.tsx`
- Modify: `src/app/sparkwright/page.tsx`

**Interfaces:**
- Consumes: primitives from Task 6; `<LifecycleLoop />` (Task 9); `POST /api/notify` (Task 3); `SPARKWRIGHT.maturity`, `SPARKWRIGHT.repoUrl`.
- Produces: `<SparkwrightHonesty />` (anchor `honesty`), `<SparkwrightMaturity />` (anchor `maturity`), `<SparkwrightCTA />`.

- [ ] **Step 1: Build the "Honesty" section**

Eyebrow `Honesty as a feature`. H2: "Every control labelled: **enforced**, advisory, or **declared**." — `enforced` teal, `declared` orange. Lead, then three callouts: "Defense in layers." (green), "Green ≠ verified." (green), "Hardened, and red-teamed in the open." (orange). Copy verbatim — this section is the product's stated differentiator and must not be softened.

- [ ] **Step 2: Build the "Maturity" section**

Eyebrow `Maturity`. H2: "Built and hardened with its own loop."

Lead reads the current stage from the content module so it cannot contradict the hero badge:

```tsx
<Lead>
  Maturity is tracked as a <em>stage</em>, separate from the version. Sparkwright
  is at <strong className="text-teal-light">{SPARKWRIGHT.maturity}</strong> —
  hardened, red-teamed, and dogfooded, and ready to adopt.
</Lead>
```

Then reuse `<LifecycleLoop />` for the stage track, marking the current stage from the data:

```tsx
<LifecycleLoop
  label={`Maturity stages, currently at ${SPARKWRIGHT.maturity}`}
  stages={["pre-adoption", "release-candidate", "adopted"].map((s) => ({
    label: s === SPARKWRIGHT.maturity ? `${s} · now` : s,
    tone: s === SPARKWRIGHT.maturity ? "once" : undefined,
  }))}
/>
```

Then the two closing paragraphs (built-with-its-own-loop, and the "adopted" stage) verbatim.

- [ ] **Step 3: Build the notify form**

Create `src/app/sparkwright/notify-form.tsx` with `"use client"`. Requirements:

- A real `<label htmlFor="notify-email">`, visually hidden with `sr-only` if the design calls for it — never placeholder-only.
- A hidden honeypot input named `company` with `tabIndex={-1}`, `autoComplete="off"`, and `aria-hidden="true"`, positioned off-screen (not `display:none`, which some bots detect).
- Submit state: idle / submitting / success / error. Announce the result in an `aria-live="polite"` region.
- POST JSON `{ email, company }` to `/api/notify`; on non-200 show the returned `error` string.
- Disable the submit button while in flight.
- Styled as a bordered surface strip, **not** a filled card — per the spec's CTA hierarchy this must read as quieter than the hero.

- [ ] **Step 4: Build the tiered CTA section**

Create `src/app/sparkwright/sparkwright-cta.tsx`. Two visually separated blocks:

1. The final box, matching the source's `.final-box`: eyebrow `Get started`, H2 "Bring the idea. The kit brings the guardrails.", the lead about `START-HERE.md` / `ONBOARDING.md` / the Executive Brief, and a single filled "View on GitHub →" button to `SPARKWRIGHT.repoUrl`.
2. Below it, separated by `border-t border-border-subtle`, the advisory block: a heading such as "Want this run in your org?", one sentence, and a link to `/contact`. Ghost styling, not filled — it must not compete with the GitHub CTA.

Place `<NotifyForm />` **above** this section in `page.tsx` (after `<SparkwrightCoverage />`), per the spec's mid-page placement — not inside the closing CTA, where three asks would stack.

- [ ] **Step 5: Mount everything in `page.tsx`**

Final order:

```tsx
<SparkwrightHero />
<SparkwrightWhat />
<SparkwrightWhy />
<SparkwrightUse />
<SparkwrightPrinciples />
<SparkwrightSpine />
<SparkwrightCoverage />
<NotifyForm />
<SparkwrightGuardrails />
<SparkwrightEnterprise />
<SparkwrightHonesty />
<SparkwrightMaturity />
<SparkwrightCTA />
```

- [ ] **Step 6: Verify the form end-to-end**

```bash
npm run dev
```

With `RESEND_API_KEY` set locally, submit a valid address and confirm a 200 plus the email arriving. Submit `not-an-email` and confirm the inline error is announced. Submit six times and confirm the sixth returns the 429 message.

```bash
npm run type-check && npm run lint && npm test
```

- [ ] **Step 7: Commit**

```bash
git add src/app/sparkwright/ && git commit -m "feat: add sparkwright honesty, maturity, and tiered CTA sections"
```

---

### Task 12: Accessibility and responsive pass

The spec makes this non-negotiable, and it is easier to fix once the whole page exists than section by section.

**Files:**
- Modify: any `src/app/sparkwright/*.tsx` needing correction

- [ ] **Step 1: Audit contrast on the stat-source lines**

The spec flags `--muted-foreground` (`#8a8a93`) at 11.5px against `--surface` (`#141415`) as the most likely WCAG AA failure. Compute the ratio; AA requires 4.5:1 for text under 18.66px.

If it fails, fix by raising the text to `text-xs` (12px) **and** lightening the token usage to `text-muted` (`#a1a1aa`) for these lines specifically. Do not change the global token — other pages depend on it.

- [ ] **Step 2: Run Lighthouse**

```bash
npm run build && npm start
```

Run Lighthouse (Chrome DevTools) against `http://localhost:3000/sparkwright`. Record the accessibility score; the gate is ≥ 95. Fix every flagged issue.

- [ ] **Step 3: Keyboard-only pass**

Tab through the entire page with no mouse. Verify: both nav dropdowns reachable and dismissible with Escape; every link and button shows a visible focus ring; the `<details>` crosswalk toggles with Enter/Space; the notify input and submit are reachable and the honeypot is **not** in the tab order; no focus trap anywhere.

- [ ] **Step 4: Responsive pass**

Check 375px, 768px, and 1440px. Confirm: no horizontal page scroll at any width; the code block and the crosswalk table scroll inside their own containers; the footer's five columns reflow cleanly; all tap targets are at least 44×44px.

- [ ] **Step 5: Reduced-motion pass**

Enable "Reduce motion" in macOS System Settings, reload, and confirm no entrance animations play.

- [ ] **Step 6: Commit**

```bash
git add -A src/app/sparkwright/
git commit -m "fix: accessibility and responsive corrections on sparkwright page"
```

---

### Task 13: Scheduled release-sync workflow

Tokenless by design — polls the public releases API, no PAT, no cross-repo secret.

**Files:**
- Create: `.github/workflows/sync-sparkwright.yml`
- Create: `scripts/sync-sparkwright.mjs`

**Interfaces:**
- Consumes: `SPARKWRIGHT.version`, `SPARKWRIGHT.lastReleaseAt` (Task 2).
- Produces: a PR titled `chore: sync sparkwright to <tag>` when the upstream release differs.

- [ ] **Step 1: Write the sync script**

Create `scripts/sync-sparkwright.mjs`. Requirements:

- `fetch` `https://api.github.com/repos/SeaBrad72/sparkwright/releases/latest` with `Accept: application/vnd.github+json` and, when `GITHUB_TOKEN` is present in env, an `Authorization: Bearer` header purely for rate-limit headroom.
- **Fail loudly** on a non-200 response or a missing `tag_name` — `process.exit(1)` with a clear message. Per the spec: a missing PR is a visible non-event; a PR that blanks the version badge is a live regression. Never write a partial update.
- Validate `tag_name` against `/^v\d+\.\d+\.\d+$/` before writing.
- Read `src/content/sparkwright.ts` as text and replace **only** the `version:` and `lastReleaseAt:` string literals via anchored regex. Do not reformat, re-serialize, or touch any other field.
- Exit 0 with `No change` when the tag already matches, so the workflow no-ops silently.
- Print `changed=true`/`changed=false` to `$GITHUB_OUTPUT` so the workflow can gate the PR step.

- [ ] **Step 2: Test the script locally against the real API**

```bash
node scripts/sync-sparkwright.mjs
git diff src/content/sparkwright.ts
```

Expected: either "No change", or a diff touching exactly two lines. If it touches more, fix the regex before proceeding.

- [ ] **Step 3: Verify the guard path**

Temporarily point the script at a nonexistent repo and re-run. Expected: exit code 1, clear error, and **no** modification to `src/content/sparkwright.ts`. Revert the URL.

- [ ] **Step 4: Write the workflow**

Create `.github/workflows/sync-sparkwright.yml`:

```yaml
name: Sync Sparkwright release

on:
  schedule:
    - cron: "0 11 * * *"
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "24"
      - id: sync
        run: node scripts/sync-sparkwright.mjs
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - if: steps.sync.outputs.changed == 'true'
        uses: peter-evans/create-pull-request@v7
        with:
          branch: chore/sync-sparkwright
          title: "chore: sync sparkwright to ${{ steps.sync.outputs.version }}"
          commit-message: "chore: sync sparkwright to ${{ steps.sync.outputs.version }}"
          body: |
            Automated sync from the sparkwright repo's latest release.

            **This PR updates facts only** — `version` and `lastReleaseAt`.

            Narrative claims are NOT updated automatically. Before merging, check
            whether this release changes anything in:
            - the harness certification levels (`harnesses`)
            - the maturity stage (`maturity`)
            - the mutation-testing and guardrails prose

            If the narrative still reads true, bump `lastReviewed` to today in
            the same PR to reset the 90-day staleness clock.
```

`secrets.GITHUB_TOKEN` is the workflow's own automatic token — it is not a PAT and requires no setup.

- [ ] **Step 5: Enable Actions to open PRs**

In GitHub repo Settings → Actions → General → Workflow permissions, confirm "Allow GitHub Actions to create and approve pull requests" is enabled. Without it, `create-pull-request` fails with a permissions error.

- [ ] **Step 6: Commit and verify on GitHub**

```bash
git add .github/workflows/sync-sparkwright.yml scripts/sync-sparkwright.mjs
git commit -m "ci: add tokenless scheduled sparkwright release sync"
git push -u origin feature/sparkwright-product-page
```

Then trigger it manually from the Actions tab (`Run workflow`) and confirm it either no-ops or opens a well-formed PR.

---

### Task 14: Verification, PR, and deploy

- [ ] **Step 1: Full local gate**

```bash
npm run lint && npm run type-check && npm test && npm run test:coverage && npm run build
```

Expected: all pass; coverage ≥ 80% on `src/content/` and `src/app/api/`.

- [ ] **Step 2: Open the PR**

```bash
gh pr create --title "feat: add Sparkwright product page" --body "Implements docs/superpowers/specs/2026-08-24-sparkwright-product-page-design.md"
```

- [ ] **Step 3: Confirm CI is green and review the Vercel preview**

On the preview URL check: `/sparkwright` renders fully; nav `Products ▾` works; the homepage strip appears; the OG image renders (paste the preview URL into a Slack or LinkedIn composer to confirm).

- [ ] **Step 4: Self-review the diff**

```bash
gh pr diff
```

Look specifically for: hardcoded versions or repo URLs that should read from `SPARKWRIGHT`; any dropped source attribution on the stat cards; any softened wording in the Honesty section.

- [ ] **Step 5: Squash-merge and verify production**

After merge, load `https://inflectionsparks.ai/sparkwright`, submit the notify form once, and confirm the email arrives. Check `https://inflectionsparks.ai/sitemap.xml` contains the new URL.

---

### Task 15: Documentation

**Files:**
- Modify: `README.md`
- Create: `RUNBOOK.md` (the repo has none; global standards require it)

- [ ] **Step 1: Update `README.md`**

Add a Products section noting `/sparkwright`, that `src/content/sparkwright.ts` is the single source of volatile facts, and that a daily Action syncs the version.

- [ ] **Step 2: Create `RUNBOOK.md`**

Cover: local setup; required env vars (`RESEND_API_KEY`, the Sanity vars); deploy and rollback via Vercel; **how to update Sparkwright content by hand** (edit the content module, bump `lastReviewed`, open a PR); how the sync workflow behaves and how to run it manually; and the known limitations — the in-memory rate limiter resetting on cold start, and the fact that narrative copy is never auto-updated.

- [ ] **Step 3: Commit**

```bash
git add README.md RUNBOOK.md
git commit -m "docs: document sparkwright content workflow and add RUNBOOK"
```

---

## Self-Review Notes

**Spec coverage:** every spec section maps to a task — §3.1 nav → Task 4; §3.2–3.4 footer/homepage/sitemap → Task 5; §4 components → Tasks 6–11; §4.2 CTA hierarchy → Tasks 6 and 11; §4.3 notify → Task 3; §5 content module → Task 2; §5.1 staleness → Task 2 (`isContentStale`) and Task 13 (PR body reminder); §5.2 attribution → Task 7 plus a Global Constraint; §6 sync → Task 13; §7 quality gates → Task 1; §8 a11y → Tasks 9 and 12; §10 risks → Task 3 (rate limit, honeypot) and Task 12.

**Gap found and closed:** the spec's §4 component list omitted the source HTML's `#maturity` section. Added to Task 11.

**Deferred deliberately:** the spec's §7 mentions a build-time staleness warning. `isContentStale()` is implemented and tested in Task 2, but nothing calls it at build time — wiring it into the build would fail deploys on a date boundary, which is worse than the problem. The 90-day reminder lives in the sync PR body instead (Task 13).
