# RUNBOOK

Operational reference for InflectionSparks.ai — a Next.js 16 marketing site. Written so
someone who has never seen this repo can get it running, ship a change, and recover from
the most likely failures without asking anyone else first.

## 1. Local setup

Requirements: Node 24 (matches `.github/workflows/ci.yml` and `sync-sparkwright.yml`),
npm.

```bash
npm ci
cp .env.example .env.local   # fill in RESEND_API_KEY if you need working email endpoints
npm run dev                  # http://localhost:3000
```

`npm run dev` works with no env vars set at all — only `/api/contact` and `/api/notify`
require `RESEND_API_KEY`, and only when actually invoked.

## 2. Environment variables

| Variable | Required | Default | Used by |
|---|---|---|---|
| `RESEND_API_KEY` | Yes, for email endpoints | none — throws / returns 500 if unset | `src/app/api/contact/route.ts`, `src/app/api/notify/route.ts` |
| `CONTACT_EMAIL` | No | `bradley@inflectionsparksolutions.com` | same two routes, as the `to:` address |
| `ENABLE_STUDIO` | No | unset (Studio route 404s) | `src/app/studio/[[...tool]]/layout.tsx` — set to exactly `"true"` to expose `/studio` |

There are **no Sanity environment variables**. `projectId`, `dataset`, and `apiVersion`
are hardcoded in `src/sanity/config.ts` — do not invent `NEXT_PUBLIC_SANITY_*` vars; the
codebase doesn't read any.

Template lives at `.env.example`. Copy it to `.env.local`, which is git-ignored.

## 3. Commands

All verified against this repo on 2026-08-24 (branch `feature/sparkwright-product-page`):

```bash
npm run type-check   # tsc --noEmit — clean, 0 errors
npm run lint         # eslint — 0 errors, 10 warnings (pre-existing <img>/alt-text warnings
                      # in scripts/*.tsx, src/app/layout.tsx, src/lib/og-image.tsx,
                      # src/sanity/image.ts — not introduced by this change, not blocking)
npm test             # vitest run — 17 tests, 2 files, all passing
npm run build         # next build --turbopack — succeeds; includes static /sparkwright
                       # and /sparkwright/opengraph-image routes
npm start             # serves the production build from `npm run build`
```

CI (`.github/workflows/ci.yml`) runs these same four steps — lint, type-check, test,
build — in that order on every push and PR. A red CI run means one of these four failed;
reproduce locally with the exact command above before pushing a fix.

## 4. Updating Sparkwright content by hand

`src/content/sparkwright.ts` is the **single source of truth** for every fact on
`/sparkwright` that can go stale: `version`, `maturity`, `license`, `repoUrl`,
`lastReleaseAt`, `lastReviewed`, `harnesses[]`, `stats[]`. No component under
`src/app/sparkwright/` hardcodes any of these — to change what the page says, edit this
one file. The module is Zod-validated (`sparkwrightSchema`) at load, so a malformed edit
(bad date format, empty string, wrong enum value) fails fast rather than shipping broken
data.

**Two categories of fact, two different update paths:**

- **Facts** (`version`, `lastReleaseAt`) — kept in sync automatically by the daily GitHub
  Action (see §5). You should rarely need to hand-edit these.
- **Narrative** (`harnesses[]` certification levels, `maturity`, `stats[]`, and the prose
  around mutation testing / guardrails elsewhere on the page) — **never touched by
  automation.** Only a human editing this file changes them.

To hand-edit narrative content:

1. Edit the relevant field(s) in `src/content/sparkwright.ts` directly.
2. If the change means the page's story still reads true as of today, bump
   `lastReviewed` to today's date (`YYYY-MM-DD`).
3. Run `npm run type-check && npm test` locally to catch a schema violation before
   pushing.
4. Open a PR as normal (feature branch, CI must pass, review, squash-merge).

`lastReviewed` records when a human last confirmed the *narrative* copy still reads
true — harness certification levels, the maturity stage, the mutation-testing and
guardrails prose, the compliance crosswalk. The sync script (§5) checks its age on
every daily run and, past 90 days, emits a `::warning::` annotation on the Actions run
and banners it into the sync PR body. Bump `lastReviewed` when you have actually
re-read those claims — not merely because the warning is noisy.

## 5. The Sparkwright sync workflow

`.github/workflows/sync-sparkwright.yml` runs `scripts/sync-sparkwright.mjs` on a daily
cron (`0 11 * * *` UTC) and via manual `workflow_dispatch`.

**What it does:** polls the public GitHub releases API for `SeaBrad72/sparkwright`
(`https://api.github.com/repos/SeaBrad72/sparkwright/releases/latest`). If the latest
release tag differs from the `version` currently recorded in
`src/content/sparkwright.ts`, it rewrites exactly two literals — `version` and
`lastReleaseAt` — and opens a PR titled `chore: sync sparkwright to <tag>` via
`peter-evans/create-pull-request`.

**What it never touches:** `maturity`, `harnesses[]`, `stats[]`, or any prose. The PR
body explicitly reminds the reviewer to check whether the release changes any of those,
and to bump `lastReviewed` in the same PR if the narrative still holds.

**Auth:** tokenless by design. It uses the workflow's own automatic `GITHUB_TOKEN` (via
`permissions: contents: write, pull-requests: write` in the workflow file) purely for
API rate-limit headroom — the releases endpoint itself is public and needs no auth. There
is no PAT, no cross-repo secret to rotate or leak.

**To run it manually:** GitHub → Actions → "Sync Sparkwright release" → Run workflow
(`workflow_dispatch`). Or from the CLI:

```bash
gh workflow run sync-sparkwright.yml
```

**To run the sync script locally** (no PR created — it only rewrites the local file):

```bash
node scripts/sync-sparkwright.mjs
```

Confirmed working locally: with the version already current, it prints
`[sync-sparkwright] No change — already at v3.218.0.` and exits 0 without touching the
file.

### When it fails

The script **fails loud on purpose** (exits 1, writes nothing) rather than risk writing a
blank or corrupted version onto a public page. Causes, in order of likelihood:

1. **GitHub API hiccup** (non-2xx response, network error, malformed JSON, missing/bad
   `tag_name` or `published_at`) — usually transient. Re-run via `workflow_dispatch` or
   wait for the next cron.
2. **Regex anchors no longer match** — the script rewrites via two anchored regexes:
   ```
   /^(\s*version: )"v[\d.]+",$/m
   /^(\s*lastReleaseAt: )"\d{4}-\d{2}-\d{2}",$/m
   ```
   These expect the *exact* current formatting in `src/content/sparkwright.ts` — two-space
   indent, double-quoted string, trailing comma, on its own line. **If Prettier
   reformats that file (different indent, single quotes, semicolon style, etc.), these
   anchors stop matching and the workflow starts failing on every run.** The fix is to
   update the two `_RE` constants at the top of `scripts/sync-sparkwright.mjs` to match
   the new formatting, then re-run.
   - Note: `version:` and `lastReleaseAt:` each appear **twice** in
     `src/content/sparkwright.ts` — once in the Zod schema (`sparkwrightSchema`) and once
     in the actual `SPARKWRIGHT` data object. The anchors are deliberately written to
     match only the data-object form (they require a quoted value with a trailing comma
     on the same line, which the schema's `z.string().regex(...)` lines don't produce).
     If you edit the anchors, keep that distinction — a regex that also matches the
     schema line will corrupt the schema definition instead of the data.
3. **Tag doesn't match `vX.Y.Z`** or `published_at` doesn't parse to a `YYYY-MM-DD` date
   — indicates an unusual release on the sparkwright repo (pre-release tag, missing
   publish date). Investigate the release itself; the fail-loud behavior is correct here.

A run that no-ops (already up to date) is normal and silent — check the Action's log line
`No change — already at <version>` to confirm it ran, not just that no PR appeared.

## 6. Deploy and rollback (Vercel)

This project is linked to Vercel (`.vercel/project.json`: project
`web-inflection-sparks-ai`). Deploys are Vercel's standard Git integration —
**every merge to `main` deploys to production automatically**; every push to any other
branch and every PR gets its own preview deployment.

**To deploy:** merge (or push) to `main`. No manual deploy step exists or is needed.

**To roll back:** in the Vercel dashboard → the project → **Deployments**, find the last
known-good production deployment and use **Promote to Production** (or "Instant
Rollback" if offered on your plan) — this repoints production traffic to that build
without needing a new commit or revert. In parallel, revert the offending commit on
`main` (`git revert <sha>`) so the next deploy doesn't reintroduce the regression.

The Vercel CLI was not available in this environment to verify `vercel` commands
end-to-end, so this section documents the dashboard flow, which is authoritative
regardless of local tooling.

## 6b. Publishing an article (Sanity)

### Where the editor actually is

Sanity has three surfaces and only one of them edits content:

| | What it is |
|---|---|
| [sanity.io/manage](https://www.sanity.io/manage) | Project console — datasets, tokens, members, CORS. **Not a content editor.** |
| **Sanity Studio** | The editor. It is an app that must be hosted — by Sanity at `*.sanity.studio`, or by you. |
| [sanity.io/welcome](https://www.sanity.io/welcome) | Dashboard. Only lists studios that are *registered*; ours is not. |

**This project has no deployed Studio.** It is embedded at `/studio` in this app and
gated behind `ENABLE_STUDIO`, so there is no hosted URL to log into. Run it locally.

### Publish (works today, no setup)

```bash
ENABLE_STUDIO=true npm run dev
# open http://localhost:3000/studio and sign in with your Sanity account
```

`http://localhost:3000` is already an allowed CORS origin on project `pt4tkl68`, so
this authenticates immediately. Create an **Article**, fill in title, slug, excerpt,
category, publishedAt and body, then hit **Publish** (not just save — a draft is not
visible to the site).

### What happens after you publish

You do **not** need to redeploy. Two things are now automatic:

1. `/insights` and the article pages carry `export const revalidate = 300`, so new
   content appears on the live site within about five minutes. Before this they were
   generated once at build and frozen — publishing would have changed nothing until
   the next deploy.
2. **Insights re-appears in the nav and the sitemap by itself** on first publish. It
   is hidden while nothing is published (see `src/sanity/has-articles.ts`) because an
   empty Insights section costs credibility, and while empty its only content was a
   contact CTA. The gate fails closed: if Sanity is unreachable the link stays hidden
   rather than pointing at a page that may not render.

### Optional: a hosted Studio you can use from anywhere

To write from a phone or without running the dev server, deploy a Studio to
`*.sanity.studio`. This needs a `sanity.cli.ts` at the repo root, which does not exist
yet — the Studio here is embedded-only:

```typescript
// sanity.cli.ts
import { defineCliConfig } from "sanity/cli";
export default defineCliConfig({
  api: { projectId: "pt4tkl68", dataset: "production" },
});
```

Then `npx sanity@latest deploy` and choose a hostname. It prompts interactively, so
run it yourself rather than in CI. `npx sanity@latest undeploy` removes it.

## 7a. Dependency posture (Sanity)

`sanity` and `@sanity/vision` are **devDependencies**. They are needed only to build the
embedded Studio at `/studio`, which is a client component bundled at build time — Vercel
installs devDependencies during builds, so the Studio still works. Runtime content fetching
uses `next-sanity` and `@sanity/image-url`, which stay in `dependencies`.

`/studio` is gated behind `ENABLE_STUDIO=true` and returns 404 without it. To work on the
Studio locally: `npm run build && ENABLE_STUDIO=true npm start`, then open `/studio`.

**Known residual: `npm audit --omit=dev` reports ~9 findings, 4 of them high.** All four are
the Sanity Studio CLI toolchain (`@sanity/cli`, `@sanity/runtime-cli`, `adm-zip`, `js-yaml`),
reached because `next-sanity` declares `sanity` as a *peer* dependency — npm counts peers of a
production package in the production tree even though we install it as a devDependency. None
of that code executes in the deployed application; it is CLI and build tooling. This is down
from 40 findings including 1 critical and 20 high before the v13 upgrade.

## 7. Known limitations

- **`/api/notify` rate limiting is in-memory and per-instance.** It tracks up to 5000 IPs
  in a `Map` (`src/app/api/notify/route.ts`) with a 5-requests-per-hour cap per IP. This
  resets on every cold start and does **not** coordinate across concurrent serverless
  instances — a determined abuser distributed across instances/cold-starts can exceed the
  nominal limit. It fails **closed**: once the 5000-IP cap is reached and a sweep of
  expired entries doesn't free space, new IPs are rejected outright rather than allowed
  through unlimited. Adequate for current traffic; if abused, move to a shared store
  (e.g. Redis/Upstash) keyed the same way.
- **No build-time staleness gate, by design.** The 90-day narrative-review check runs
  in the daily sync workflow, not in the build. Failing a deploy purely because a date
  rolled over is worse than the stale copy it would be guarding against, so it warns
  (Actions annotation + sync PR banner) rather than blocks.

## 8. Outstanding manual verification (pre-merge checklist)

The following were **not** performed by any agent on this branch — they require a real
browser/device and human judgment, and are listed here so they aren't silently skipped:

- [ ] Run a Lighthouse (or equivalent) audit on `/sparkwright` and confirm scores are
      acceptable, especially accessibility and performance.
- [ ] Keyboard-only pass through `/sparkwright` — nav dropdown, all interactive
      elements, the notify form — confirm focus order and visible focus indicators.
- [ ] Screen reader spot-check (VoiceOver/NVDA) of `/sparkwright`.
- [ ] Real device / responsive check at common breakpoints (not just browser dev tools).
- [ ] Toggle `prefers-reduced-motion` at the OS level and confirm animations respect it.

Do this before merging `feature/sparkwright-product-page`, not after.
