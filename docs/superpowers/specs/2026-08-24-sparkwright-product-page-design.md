# Sparkwright Product Page — Design Spec

**Date:** 2026-08-24
**Status:** Awaiting approval
**Owner:** Bradley James
**Route:** `/sparkwright`

---

## 1. Purpose

Introduce Sparkwright — the agentic SDLC kit — as the first *product* on
InflectionSparks.ai, which until now has presented only services. The page must:

1. Stand on its own as a credible product page for the kit.
2. Read unmistakably as an Inflection Sparks property.
3. Stay current as the kit ships releases, without relying on anyone remembering.

The source material is a 437-line standalone HTML page
(`sparkwright-overview_1.html`). This spec ports it into the site rather than
embedding it.

## 2. Decisions made

| Decision | Choice | Rationale |
|---|---|---|
| Brand relationship | Sub-brand inside the IS shell | Shares nav/footer/typography; keeps SEO, OG images, and the a11y/mobile work from `04cd215`. Lift-and-shift to a separate domain stays possible later. |
| Route | `/sparkwright` (not `/products/sparkwright`) | Shorter to share; clean split target. |
| Page goal | All three, tiered | GitHub adoption is the hero; release-notify is a quiet mid-page strip; advisory/lead-gen is the closing block. |
| Content sync | Scheduled poll from this repo | No PAT, no cross-repo coupling, no secret to rotate. Up to 24h stale is acceptable for a version badge. |

### 2.1 Key finding: there is no palette conflict

`src/app/globals.css` defines:

```
--teal:       #2f855a     ← Sparkwright --green-d
--teal-light: #38a169     ← Sparkwright --green
--orange:     #f97316     ← Sparkwright --orange
```

The site tokens are **misnamed** — they are green, not teal, and they are the
exact values the Sparkwright HTML uses. The originally-proposed scoped accent
variables (`--sparkwright-accent`) are therefore **dropped from this design**.
The page uses existing Tailwind tokens (`bg-teal`, `text-teal-light`,
`text-orange`) and renders visually identical to the source HTML.

Likewise, `layout.tsx` already loads Geist and Geist Mono via `next/font/google`
as `--font-geist-sans` / `--font-geist-mono`. The source page's Google Fonts
`<link>` is dropped — self-hosted, no third-party request, no layout shift.

**Consequence:** the port is materially cheaper than first estimated, and the
"cohesive but distinct" goal is satisfied by the existing design system rather
than by a new one.

## 3. Information architecture

### 3.1 Navigation (`src/components/nav.tsx`)

Add a `Products` dropdown after `Services`, reusing the existing dropdown
component and mobile accordion verbatim — a data change to `navLinks`:

```
Services ▾ | Products ▾ | Work | Insights | About     Contact  [Book a Call]
             └─ Sparkwright — The agentic SDLC kit
```

Rationale: a flat fifth item reads as another service. A `Products` group states
that the business now ships products, mirrors the `Services ▾` pattern exactly,
and leaves a slot for product #2 without a future IA change.

**Required refactor:** `servicesOpen` is currently a single boolean driving one
dropdown. Two dropdowns need either two booleans or `openMenu: string | null`.
The latter is preferred — it also guarantees only one menu is open at a time.
The existing Escape-to-close and `aria-expanded`/`aria-controls` wiring must be
preserved per dropdown, with unique `id`s (`services-dropdown`,
`products-dropdown`).

### 3.2 Footer (`src/components/footer.tsx`)

Add a `Products` group to `footerLinks`: Sparkwright (`/sparkwright`), GitHub
(external). Data-only edit — the footer already renders from the object.

### 3.3 Homepage

One Sparkwright strip between `<ProofPoints />` and `<Engagement />` in
`src/app/page.tsx`, in the existing section rhythm. Scope-limited: a heading, a
one-line description, and a link to `/sparkwright`. This prevents the page from
being an orphan reachable only via nav. No other homepage change.

### 3.4 Sitemap

Add `/sparkwright` to `staticPages` in `src/app/sitemap.ts`,
`changeFrequency: "weekly"`, `priority: 0.8`.

## 4. Component architecture

Follows the existing per-route folder convention (`/lead`, `/build`):

```
src/app/sparkwright/
  page.tsx                    metadata, JSON-LD, section assembly
  opengraph-image.tsx         matches sibling routes
  sparkwright-hero.tsx        pill, h1, CTAs, version badges
  sparkwright-what.tsx        "In 60 seconds" — 3 cards
  sparkwright-why.tsx         DORA / Veracode / CodeScene stats + sourcing
  sparkwright-use.tsx         3 steps + code block + brownfield callout
  sparkwright-spine.tsx       Contract → Reference → Conformance
  sparkwright-coverage.tsx    lifecycle loop + harness callout
  sparkwright-guardrails.tsx
  sparkwright-enterprise.tsx
  sparkwright-honesty.tsx
  sparkwright-cta.tsx         tiered CTAs
src/content/sparkwright.ts    single source of truth for volatile facts
src/app/api/notify/route.ts   release-notify capture
```

`page.tsx` composes these in order, matching `build/page.tsx` structure and
exporting `metadata` with `alternates.canonical` and `openGraph`.

### 4.1 Server vs client components

Default to **server components**. Only sections with Framer Motion entrance
animations or `<details>` interaction need `"use client"`. The source HTML uses
native `<details>/<summary>`, which needs no JS — keep it native for a11y and
keep those sections on the server.

### 4.2 CTA hierarchy

The three asks must not compete. Enforced by placement and weight:

1. **Hero (primary):** "Explore the repo" as the only filled button. GitHub is
   the single hero ask.
2. **Mid-page (quiet):** a single-input inline "notify me on releases" strip
   after the coverage section. Bordered surface, not a filled card. No modal.
3. **Closing (separated):** "Bring this to your org" block linking to
   `/contact`, visually divided by a section border so it reads as a distinct
   offer rather than a fourth product CTA.

### 4.3 Release-notify endpoint

`POST /api/notify`, modeled directly on `src/app/api/contact/route.ts`:

- Same lazy `getResendClient()` pattern (throws if `RESEND_API_KEY` unset).
- Email-only payload. Validate with the same regex, reject CRLF (header
  injection), cap length at 254.
- `escapeHtml()` before rendering into the notification email body.
- Returns `{ ok: true }` on success; never leaks whether an address is already
  known.

**Storage:** v1 sends a notification email to Bradley only — no database. This is
a deliberate YAGNI call; if volume justifies a real list, that is a separate
change.

**Rate limiting:** the endpoint is unauthenticated and public. Add a basic
per-IP limit (see §8, Open Risks).

## 5. Content module — `src/content/sparkwright.ts`

Single source of truth for everything that goes stale. Every volatile claim on
the page reads from it; no component hardcodes a version, count, or status.

Shape below is illustrative — actual values are read from the sparkwright repo at
implementation time, not carried over from this spec.

```ts
export const SPARKWRIGHT = {
  version: "v3.218.0",
  maturity: "release-candidate",
  license: "Apache-2.0",
  repoUrl: "https://github.com/SeaBrad72/sparkwright",
  lastReleaseAt: "2026-08-20",
  lastReviewed: "2026-08-24",
  harnesses: [
    { name: "Claude Code", level: "verified reference" },
    { name: "Codex",       level: "floor-verified" },
    { name: "Cursor",      level: "enforcement floor" },
    { name: "Gemini",      level: "enforcement floor" },
  ],
  stats: [ /* DORA / Veracode / CodeScene cards, each with source + year */ ],
} as const;
```

Validated with a Zod schema at module load, per global standards. **Zod is not
currently a dependency** and must be added.

### 5.1 The facts/narrative boundary

Automation can only ever carry **facts** — version, maturity, release date.
**Narrative** claims (the mutation-testing paragraph, harness certification
wording, the enterprise section) still require human review, because they assert
things about the kit that a tag cannot confirm.

`lastReviewed` guards this. A build-time check warns when
`lastReviewed` is more than 90 days old, so the narrative cannot quietly drift
out of true while the version badge stays fresh.

### 5.2 Attribution guardrail

The stat cards cite DORA 2025, Veracode 2025, and CodeScene 2026 as *industry
findings about the problem*, explicitly **not** Sparkwright's results. The
source HTML is careful about this and the port must preserve that framing
verbatim — every stat card renders its `source` line, and the section retains
the "not Sparkwright's results" sentence. This is a correctness requirement, not
a style preference.

## 6. Release-sync pipeline (scheduled poll)

A GitHub Action **in this repo**. No token, no cross-repo dispatch, no secret.

```
.github/workflows/sync-sparkwright.yml
  on:
    schedule: [ cron: "0 11 * * *" ]   # daily
    workflow_dispatch: {}              # manual trigger
```

Steps:

1. `GET https://api.github.com/repos/SeaBrad72/sparkwright/releases/latest`
   — unauthenticated, public repo. Uses the workflow's own `GITHUB_TOKEN` purely
   for rate-limit headroom; no cross-repo permission needed.
2. Compare `tag_name` / `published_at` against `SPARKWRIGHT.version` /
   `lastReleaseAt` in the content module.
3. If unchanged → exit 0, no-op.
4. If changed → rewrite only those fields and open a PR via
   `peter-evans/create-pull-request`, titled `chore: sync sparkwright to <tag>`.
5. Vercel builds a preview. Bradley checks the version badge, squash-merges.

**Explicitly out of scope for automation:** `maturity`, `harnesses`, `stats`,
and all prose. The PR body includes a reminder to review the narrative and bump
`lastReviewed` when the release is significant.

**Failure mode:** if the API call fails, the workflow fails loudly rather than
opening a PR with empty values. A missing PR is a visible non-event; a PR that
blanks the version badge is a live regression.

**Note:** this repo currently has **no `.github/` directory** — no CI exists.
This workflow is the first one, and §7 adds the quality gates alongside it.

## 7. Quality gates

The repo currently has: `dev`, `build`, `start`, `lint`. **No test framework, no
type-check script, and no CI.** Global standards require both. This spec adds
the minimum viable gate rather than a full harness — sized to what a marketing
site actually needs:

- Add `"type-check": "tsc --noEmit"` to `package.json`.
- Add **Vitest** plus tests for the two pieces with real logic:
  - `src/content/sparkwright.ts` — Zod schema accepts the module, rejects a
    malformed version, rejects a missing source on a stat card.
  - `src/app/api/notify/route.ts` — rejects malformed email, rejects CRLF
    injection, rejects over-length input, accepts a valid address.
- Add `.github/workflows/ci.yml` running `lint`, `type-check`, `test`, `build`
  on push and PR.

The 80% coverage floor is scoped to `src/content/` and `src/app/api/` — the code
with branching logic. Presentational section components are excluded; snapshot
testing static marketing JSX is exactly the low-value coverage the standards
warn against.

## 8. Accessibility

Non-negotiable per global standards; the source HTML has gaps to close in the
port:

- The `Products` dropdown must match the `Services` dropdown's keyboard support
  (Escape to close, `aria-expanded`, `aria-controls`, `role="menu"`).
- The lifecycle loop (`Inception → Discover → … → Operate ↺`) is presented
  visually with `→` glyphs. Wrap it in an `<ol>` with an accessible label so it
  reads as an ordered process; mark the arrow glyphs `aria-hidden`.
- The code block's macOS traffic-light dots are decoration — `aria-hidden`.
- Verify contrast on `--muted-foreground` (`#8a8a93`) against `--bg2` for the
  stat-source lines; the source HTML's `--muted2` at 11.5px is the most likely
  WCAG AA failure on the page. Bump size or lighten the token if it fails.
- The notify input needs a real `<label>`, not placeholder-only text.
- `prefers-reduced-motion` respected on any Framer Motion entrance.

## 9. Out of scope

- Any change to `/lead`, `/build`, `/transform`, `/work`, `/insights`, `/about`.
- Restructuring the homepage beyond the single strip in §3.3.
- Moving Sparkwright to its own domain.
- Modeling the page in Sanity.
- A real subscriber database for release-notify.

## 10. Open risks

| Risk | Mitigation |
|---|---|
| `/api/notify` is public and unauthenticated — spam vector | Per-IP rate limit; consider a honeypot field. Decide before ship. |
| Narrative claims drift while the version badge stays fresh | `lastReviewed` + 90-day staleness warning (§5.1). |
| Nav grows to two dropdowns on mobile | Mobile accordion already handles grouped items; verify at 375px. |
| Kit is release-candidate; claims may outpace reality | Honesty section is ported verbatim and kept prominent — it is the product's stated differentiator. |
| Three CTAs compete and none converts | Hierarchy enforced in §4.2; revisit with GA4 data after 60 days. |

## 11. Definition of Done

- [ ] `/sparkwright` renders all sections, matching the source design
- [ ] `Products ▾` in desktop nav + mobile accordion, both dropdowns keyboard-accessible
- [ ] Footer `Products` group; homepage strip; sitemap entry
- [ ] `src/content/sparkwright.ts` is the only source of volatile facts
- [ ] `/api/notify` validates and rate-limits
- [ ] `lint`, `type-check`, `test`, `build` all green in CI
- [ ] Lighthouse a11y ≥ 95; keyboard-only pass; contrast verified
- [ ] `sync-sparkwright.yml` verified via `workflow_dispatch`
- [ ] OG image renders; canonical URL correct
- [ ] README + RUNBOOK updated with the sync process and how to hand-edit the content module
