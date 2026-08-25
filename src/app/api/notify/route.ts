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
// Upper bound on distinct IPs tracked at once. Reaching this triggers a
// sweep of fully-expired entries instead of a full sweep on every request,
// keeping the amortised per-request cost O(1).
const MAX_TRACKED_IPS = 5000;
const hits = new Map<string, number[]>();

/** Test-only visibility into map growth. Not used by production logic. */
export function hitsSize(): number {
  return hits.size;
}

/** Test-only seeding of the map. Not used by production logic. */
export function __seedHitsForTest(ip: string, timestamps: number[]): void {
  hits.set(ip, timestamps);
}

/** Test-only reset of the map. Not used by production logic. */
export function __resetHitsForTest(): void {
  hits.clear();
}

function sweepExpired(now: number): void {
  for (const [candidateIp, timestamps] of hits) {
    const stillRecent = timestamps.filter((t) => now - t < RATE_WINDOW_MS);
    if (stillRecent.length === 0) {
      // Self-clean: an IP with no timestamps left in the window is dropped
      // entirely rather than kept as an empty array.
      hits.delete(candidateIp);
    } else if (stillRecent.length !== timestamps.length) {
      hits.set(candidateIp, stillRecent);
    }
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const isKnownIp = hits.has(ip);
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);

  if (recent.length >= RATE_LIMIT) {
    // Re-insert (delete + set) so Map insertion order tracks recency of
    // last hit, not just first-seen order. This keeps the eviction below
    // O(1)-amortised: the oldest entry is always the Map's first key.
    hits.delete(ip);
    hits.set(ip, recent);
    return true;
  }

  if (!isKnownIp && hits.size >= MAX_TRACKED_IPS) {
    sweepExpired(now);
    if (hits.size >= MAX_TRACKED_IPS) {
      // Cap still full after sweeping expired entries: evict the oldest
      // live entry (the Map's first key — see the re-insert-on-update
      // comment above) and admit the newcomer, instead of failing closed.
      //
      // `x-forwarded-for` is attacker-controlled: fail-closed here would
      // let ~5,000 cheap forged-header POSTs fill the map with live
      // entries and lock out every genuinely new visitor for up to an
      // hour on this instance, with nothing to alert on it — turning a
      // spam control into a denial-of-service lever. Fail-open (skip the
      // cap entirely) would allow unbounded memory growth. Eviction keeps
      // the O(1) memory cap AND keeps the service available to honest
      // users. A rotating-IP attacker was never stoppable by per-IP
      // limiting in the first place — that's a documented known
      // limitation, not something this change is meant to solve.
      const oldestIp = hits.keys().next().value;
      if (oldestIp !== undefined) {
        hits.delete(oldestIp);
      }
    }
  }

  hits.delete(ip);
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let payload: { email?: string; fax?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { email, fax } = payload;
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  // Honeypot: `fax` is a hidden field no human fills in (chosen because it's
  // not a field name autofillers target, unlike `company`). Accept silently
  // so bots get a 200 and learn nothing, but send nothing. Checked before
  // validation and rate limiting so a bot never consumes a real user's quota.
  if (fax) {
    return NextResponse.json({ ok: true });
  }

  // Validate before consuming rate-limit budget: a typo'd address should
  // not burn an honest user's hourly quota.
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

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const safeEmail = escapeHtml(email.trim());

  try {
    const resend = getResendClient();
    await resend.emails.send({
      from: "InflectionSparks.ai <contact@resend.inflectionsparksolutions.com>",
      to: process.env.CONTACT_EMAIL || "bradley@inflectionsparksolutions.com",
      subject: `Sparkwright release notify signup — ${safeEmail}`,
      html: `<p>New Sparkwright release-notify signup.</p>
             <p><strong>Email:</strong> ${safeEmail}</p>
             <p><strong>Current release:</strong> ${SPARKWRIGHT.version} (${SPARKWRIGHT.maturity})</p>`,
    });
  } catch (err) {
    console.error(
      "[api/notify] Failed to send notification:",
      err instanceof Error ? err.message : String(err)
    );
    return NextResponse.json(
      { error: "Could not process signup. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
