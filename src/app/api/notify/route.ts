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
    hits.set(ip, recent);
    return true;
  }

  if (!isKnownIp && hits.size >= MAX_TRACKED_IPS) {
    sweepExpired(now);
    if (hits.size >= MAX_TRACKED_IPS) {
      // Cap still full after sweeping expired entries: a real flood across
      // many distinct IPs, not just stale bookkeeping. Fail CLOSED for
      // unseen IPs so the map can never grow past the cap, rather than
      // throwing or silently allowing unlimited signups.
      return true;
    }
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
      from: "InflectionSparks.ai <contact@resend.inflectionsparksolutions.com>",
      to: process.env.CONTACT_EMAIL || "bradley@inflectionsparksolutions.com",
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
