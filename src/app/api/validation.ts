import { z } from "zod";

/**
 * Shared request validation for the public API routes.
 *
 * Both routes previously hand-rolled the same regex, length caps and CRLF
 * check. Keeping one schema module means the two endpoints cannot drift into
 * different definitions of "a valid email", which is what made migrating only
 * one of them the wrong move.
 *
 * Zod 4 note: string formats moved to the top level (`z.email()`), so
 * `z.string().email()` is deprecated.
 */

/** Matches the previous hand-rolled regex exactly — no address that used to be accepted is now rejected, or vice versa. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * `z.email()` is deliberately NOT used on its own. Its grammar differs from the
 * regex both routes shipped with, so swapping it would silently change which
 * addresses are accepted — a behaviour change disguised as a refactor. The
 * regex stays authoritative; Zod supplies the structure, length caps and
 * error handling around it.
 *
 * The explicit CRLF guard is redundant against `[^\s@]+` (proven by mutation
 * test — removing it fails nothing) and is kept only as defence in depth, so
 * a future loosening of the regex cannot silently open header injection.
 */
export const emailField = z
  .string()
  .trim()
  .min(1, "Email is required.")
  .max(254, "Email is too long.")
  .regex(EMAIL_RE, "Please provide a valid email address.")
  .refine((v) => !/[\r\n]/.test(v), "Please provide a valid email address.");

/**
 * POST /api/notify — the envelope only.
 *
 * `email` is intentionally NOT validated here. The honeypot (`fax`) must be
 * read and answered before the address is judged: a bot that fills the
 * honeypot with a malformed address must still receive a silent 200, not a
 * 400 that tells it which field it got wrong. So the route parses the
 * envelope, answers the honeypot, and only then applies `emailField`.
 */
export const notifyEnvelopeSchema = z.object({
  email: z.unknown().optional(),
  fax: z.string().optional(),
});

/** The allow-list the contact form's select is populated from. */
export const VALID_INTERESTS = [
  "Fractional CTO / CAIO / CPO",
  "AI Strategy & Roadmap",
  "Engineering Org Transformation",
  "AI-Embedded Product Development",
  "Technology Due Diligence",
  "Board & Executive Advisory",
  "Something else",
] as const;

/** POST /api/contact — the contact form. */
export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name, email, and message are required.").max(100),
  email: emailField,
  company: z.string().max(200).optional(),
  interest: z.enum(VALID_INTERESTS).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(1, "Name, email, and message are required.")
    .max(5000),
});

/**
 * Parse a request body without letting a malformed one escape the handler.
 *
 * `/api/contact` previously called `req.json()` unguarded, so a bad body threw
 * out of the route and surfaced as a generic 500. Both routes now return a
 * clean 400 instead.
 */
export async function parseBody<T>(
  req: Request,
  schema: z.ZodType<T>
): Promise<{ ok: true; data: T } | { ok: false; message: string }> {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return { ok: false, message: "Invalid request body." };
  }

  const result = schema.safeParse(raw);
  if (!result.success) {
    // Surface the first message so the client keeps getting the specific,
    // human-readable errors the hand-rolled guards used to produce.
    const first = result.error.issues[0];
    return { ok: false, message: first?.message ?? "Invalid request body." };
  }
  return { ok: true, data: result.data };
}
