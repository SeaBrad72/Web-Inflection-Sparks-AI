import { describe, it, expect, vi, beforeEach } from "vitest";

const sendMock = vi
  .fn()
  .mockResolvedValue({ data: { id: "test" }, error: null });
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(function () {
    return { emails: { send: sendMock } };
  }),
}));

import { POST } from "./route";

/** A submission that passes every guard — each test perturbs one field. */
const VALID = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines",
  interest: "AI Strategy & Roadmap",
  message: "I would like to talk about an engagement.",
};

function post(body: unknown) {
  return new Request("https://inflectionsparks.ai/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = "test-key";
    sendMock.mockClear();
    sendMock.mockResolvedValue({ data: { id: "test" }, error: null });
  });

  it("accepts a valid submission and sends one email", async () => {
    const res = await POST(post(VALID));
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ success: true });
    expect(sendMock).toHaveBeenCalledOnce();
  });

  it("accepts a submission without the optional fields", async () => {
    const { name, email, message } = VALID;
    const res = await POST(post({ name, email, message }));
    expect(res.status).toBe(200);
    expect(sendMock).toHaveBeenCalledOnce();
  });

  it.each(["name", "email", "message"])(
    "rejects a missing required field: %s",
    async (field) => {
      const res = await POST(post({ ...VALID, [field]: "" }));
      expect(res.status).toBe(400);
      expect(sendMock).not.toHaveBeenCalled();
    }
  );

  it("rejects a required field that is only whitespace", async () => {
    const res = await POST(post({ ...VALID, message: "   " }));
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it.each([
    ["name", 101],
    ["email", 255],
    ["company", 201],
    ["message", 5001],
  ])("rejects an over-length %s", async (field, len) => {
    const body =
      field === "email"
        ? { ...VALID, email: `${"a".repeat(len - 12)}@example.com` }
        : { ...VALID, [field]: "a".repeat(len) };
    const res = await POST(post(body));
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects a malformed email", async () => {
    const res = await POST(post({ ...VALID, email: "not-an-email" }));
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects CRLF header injection in the email", async () => {
    const res = await POST(
      post({ ...VALID, email: "a@b.com\r\nBcc: victim@example.com" })
    );
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects an interest outside the allow-list", async () => {
    const res = await POST(post({ ...VALID, interest: "Something invented" }));
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("escapes HTML in user input before it reaches the email body", async () => {
    await POST(
      post({ ...VALID, name: '<script>alert("xss")</script>Ada' })
    );
    expect(sendMock).toHaveBeenCalledOnce();
    const html = sendMock.mock.calls[0][0].html as string;
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });

  it("returns 500 when RESEND_API_KEY is unset", async () => {
    delete process.env.RESEND_API_KEY;
    const res = await POST(post(VALID));
    expect(res.status).toBe(500);
  });

  it("returns 500 when the mail provider reports an error", async () => {
    sendMock.mockResolvedValue({ data: null, error: { message: "provider down" } });
    const res = await POST(post(VALID));
    expect(res.status).toBe(500);
  });

  it("returns 500 when the mail provider throws", async () => {
    sendMock.mockRejectedValue(new Error("network"));
    const res = await POST(post(VALID));
    expect(res.status).toBe(500);
  });

  /**
   * This previously asserted that a malformed body THREW out of the handler,
   * surfacing as a generic 500 — a gap pinned on purpose so the Zod migration
   * (#6) would change it visibly rather than silently. It did: this was the
   * only test that failed during the migration, and it now asserts the fixed
   * behaviour. Both routes return a clean 400.
   */
  it("returns 400 on a malformed JSON body", async () => {
    const bad = new Request("https://inflectionsparks.ai/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{ not json",
    });
    const res = await POST(bad);
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });
});
