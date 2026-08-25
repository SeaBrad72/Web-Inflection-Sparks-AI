import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SPARKWRIGHT } from "@/content/sparkwright";
import { isRateLimited } from "./rate-limit";

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
