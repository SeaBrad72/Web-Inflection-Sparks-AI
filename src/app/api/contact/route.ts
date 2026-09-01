import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema, parseBody } from "../validation";

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

export async function POST(req: Request) {
  const parsed = await parseBody(req, contactSchema);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.message }, { status: 400 });
  }
  const { name, email, company, interest, message } = parsed.data;

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = company ? escapeHtml(company) : "";
  const safeInterest = interest ? escapeHtml(interest) : "";
  const safeMessage = escapeHtml(message);

  try {
    const resend = getResendClient();
    const { error: resendError } = await resend.emails.send({
      from: "InflectionSparks.ai <contact@resend.inflectionsparksolutions.com>",
      to: process.env.CONTACT_EMAIL || "bradley@inflectionsparksolutions.com",
      replyTo: email.trim(),
      subject: `New inquiry from ${safeName}${safeCompany ? ` (${safeCompany})` : ""}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        ${safeCompany ? `<p><strong>Company:</strong> ${safeCompany}</p>` : ""}
        ${safeInterest ? `<p><strong>Interest:</strong> ${safeInterest}</p>` : ""}
        <hr />
        <p><strong>Message:</strong></p>
        <p>${safeMessage.replace(/\n/g, "<br />")}</p>
      `,
    });

    if (resendError) {
      console.error("Resend error:", resendError);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
