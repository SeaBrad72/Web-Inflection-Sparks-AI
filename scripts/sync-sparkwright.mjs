#!/usr/bin/env node
/**
 * Tokenless release sync for the Sparkwright kit.
 *
 * Polls the PUBLIC GitHub releases API for SeaBrad72/sparkwright and, when
 * the latest tag differs from the version recorded in
 * src/content/sparkwright.ts, rewrites the two volatile data literals
 * (`version`, `lastReleaseAt`) in place via anchored regex.
 *
 * Fail-loud rationale: a missing PR is a visible non-event (the daily cron
 * just no-ops); a PR that blanks or corrupts the version badge on a public
 * page is a live regression. So any ambiguity here — bad response, missing
 * tag, malformed date, a regex that matches zero times — must hard-fail
 * (exit 1) rather than silently writing a partial or wrong update.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_PATH = resolve(__dirname, "../src/content/sparkwright.ts");
const RELEASES_URL =
  "https://api.github.com/repos/SeaBrad72/sparkwright/releases/latest";

const TAG_RE = /^v\d+\.\d+\.\d+$/;
const VERSION_LINE_RE = /^(\s*version: )"v[\d.]+",$/m;
const LAST_RELEASE_LINE_RE = /^(\s*lastReleaseAt: )"\d{4}-\d{2}-\d{2}",$/m;

function fail(message) {
  console.error(`[sync-sparkwright] ERROR: ${message}`);
  process.exit(1);
}

function writeOutput(name, value) {
  const outputFile = process.env.GITHUB_OUTPUT;
  if (outputFile) {
    writeFileSync(outputFile, `${name}=${value}\n`, { flag: "a" });
  } else {
    console.log(`${name}=${value}`);
  }
}

async function fetchLatestRelease() {
  const headers = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) {
    // Purely for rate-limit headroom — the releases API is public and
    // requires no auth. Never treat this as an auth requirement.
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  let response;
  try {
    response = await fetch(RELEASES_URL, { headers });
  } catch (err) {
    fail(`network request failed: ${err.message}`);
  }

  if (!response.ok) {
    fail(
      `GitHub API returned ${response.status} ${response.statusText} for ${RELEASES_URL}`,
    );
  }

  let body;
  try {
    body = await response.json();
  } catch (err) {
    fail(`failed to parse JSON response: ${err.message}`);
  }

  const tag = body?.tag_name;
  if (!tag || typeof tag !== "string") {
    fail("response is missing a usable tag_name");
  }
  if (!TAG_RE.test(tag)) {
    fail(`tag_name "${tag}" does not match /^v\\d+\\.\\d+\\.\\d+$/`);
  }

  const publishedAt = body?.published_at;
  if (!publishedAt || Number.isNaN(Date.parse(publishedAt))) {
    fail(`published_at "${publishedAt}" is missing or malformed`);
  }

  const releaseDate = publishedAt.slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(releaseDate)) {
    fail(`could not derive a YYYY-MM-DD date from published_at "${publishedAt}"`);
  }

  return { tag, releaseDate };
}

function main() {
  return fetchLatestRelease().then(({ tag, releaseDate }) => {
    const source = readFileSync(CONTENT_PATH, "utf8");

    const currentVersionMatch = source.match(VERSION_LINE_RE);
    if (!currentVersionMatch) {
      fail(
        `could not find the version data literal in ${CONTENT_PATH} — anchors may be stale`,
      );
    }
    const currentVersion = currentVersionMatch[0].match(/"v[\d.]+"/)[0].slice(1, -1);

    if (currentVersion === tag) {
      console.log(`[sync-sparkwright] No change — already at ${tag}.`);
      writeOutput("changed", "false");
      writeOutput("version", tag);
      return;
    }

    // Verify each anchor matches BEFORE replacing — comparing before/after
    // text would false-fail whenever a replacement value is identical to
    // what's already there (e.g. lastReleaseAt unchanged while version
    // changes), so a real presence check is required rather than a diff.
    if (!VERSION_LINE_RE.test(source)) {
      fail("version regex matched zero times — refusing to write");
    }
    if (!LAST_RELEASE_LINE_RE.test(source)) {
      fail("lastReleaseAt regex matched zero times — refusing to write");
    }

    const updated = source
      .replace(VERSION_LINE_RE, `$1"${tag}",`)
      .replace(LAST_RELEASE_LINE_RE, `$1"${releaseDate}",`);

    writeFileSync(CONTENT_PATH, updated, "utf8");
    console.log(
      `[sync-sparkwright] Updated version ${currentVersion} -> ${tag}, lastReleaseAt -> ${releaseDate}.`,
    );
    writeOutput("changed", "true");
    writeOutput("version", tag);
  });
}

main().catch((err) => {
  fail(err?.message ?? String(err));
});
