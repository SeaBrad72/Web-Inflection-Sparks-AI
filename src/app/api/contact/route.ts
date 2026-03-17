import { NextResponse } from "next/server";
import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  console.error("RESEND_API_KEY environment variable is not set");
}

const resend = new Resend(process.env.RESEND_API_KEY);

const VALID_INTERESTS = [
  "Fractional CTO / CAIO / CPO",
  "AI Strategy & Roadmap",
  "Engineering Org Transformation",
  "AI-Embedded Product Development",
  "Technology Due Diligence",
  "Board & Executive Advisory",
  "Something else",
];

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  const { name, email, company, interest, message } = await req.json();

  // Basic server-side validation
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  // Length limits
  if (name.length > 100 || email.length > 254 || (company && company.length > 200) || message.length > 5000) {
    return NextResponse.json(
      { error: "One or more fields exceed the maximum length." },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email) || /[\r\n]/.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  // Validate interest field against allowed values
  if (interest && !VALID_INTERESTS.includes(interest)) {
    return NextResponse.json(
      { error: "Invalid interest selection." },
      { status: 400 }
    );
  }

  // Escape all user inputs for safe HTML rendering
  const safeName = escapeHtml(name.trim());
  const safeEmail = escapeHtml(email.trim());
  const safeCompany = company ? escapeHtml(company.trim()) : "";
  const safeInterest = interest ? escapeHtml(interest) : "";
  const safeMessage = escapeHtml(message.trim());

  try {
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
