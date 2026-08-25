import { describe, it, expect, vi, beforeEach } from "vitest";

const sendMock = vi.fn().mockResolvedValue({ data: { id: "test" }, error: null });
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(function () {
    return { emails: { send: sendMock } };
  }),
}));

import { POST } from "./route";
import { hitsSize, __seedHitsForTest, __resetHitsForTest } from "./rate-limit";

function post(body: unknown, ip = "203.0.113.1") {
  return new Request("https://inflectionsparks.ai/api/notify", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

describe("POST /api/notify", () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = "test-key";
    sendMock.mockClear();
  });

  it("accepts a valid email", async () => {
    const res = await POST(post({ email: "dev@example.com" }, "203.0.113.10"));
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });
    expect(sendMock).toHaveBeenCalledOnce();
  });

  it("rejects a malformed email", async () => {
    const res = await POST(post({ email: "not-an-email" }, "203.0.113.11"));
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects a missing email", async () => {
    const res = await POST(post({}, "203.0.113.12"));
    expect(res.status).toBe(400);
  });

  it("rejects CRLF header injection", async () => {
    const res = await POST(
      post({ email: "a@b.com\r\nBcc: victim@example.com" }, "203.0.113.13")
    );
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects an over-length email", async () => {
    const res = await POST(
      post({ email: `${"a".repeat(250)}@example.com` }, "203.0.113.14")
    );
    expect(res.status).toBe(400);
  });

  it("rejects a honeypot submission without sending mail", async () => {
    const res = await POST(
      post({ email: "dev@example.com", fax: "spam" }, "203.0.113.15")
    );
    expect(res.status).toBe(200);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rate-limits repeated submissions from one IP", async () => {
    const ip = "203.0.113.99";
    for (let i = 0; i < 5; i++) {
      await POST(post({ email: `user${i}@example.com` }, ip));
    }
    const res = await POST(post({ email: "six@example.com" }, ip));
    expect(res.status).toBe(429);
  });

  it("returns 500 when RESEND_API_KEY is unset", async () => {
    delete process.env.RESEND_API_KEY;
    const res = await POST(post({ email: "dev@example.com" }, "203.0.113.20"));
    expect(res.status).toBe(500);
  });

  it("does not let the rate-limit map grow without bound", async () => {
    const MAX_TRACKED_IPS = 5000;
    const attempts = MAX_TRACKED_IPS + 500;
    for (let i = 0; i < attempts; i++) {
      await POST(post({ email: "flood@example.com" }, `10.0.${Math.floor(i / 250)}.${i % 250}`));
    }
    expect(hitsSize()).toBeLessThanOrEqual(MAX_TRACKED_IPS);
  });

  it("evicts the oldest entry and admits a newcomer once the map is genuinely full of live entries", async () => {
    __resetHitsForTest();
    const MAX_TRACKED_IPS = 5000;
    const now = Date.now();
    for (let i = 0; i < MAX_TRACKED_IPS; i++) {
      __seedHitsForTest(`seed-${i}`, [now]);
    }
    expect(hitsSize()).toBeGreaterThanOrEqual(MAX_TRACKED_IPS);

    const res = await POST(post({ email: "newcomer@example.com" }, "203.0.113.250"));
    expect(res.status).toBe(200);
    expect(sendMock).toHaveBeenCalledOnce();
    // The map never grows past the cap: the oldest live entry was evicted
    // to make room for the newcomer, rather than the newcomer being
    // rejected.
    expect(hitsSize()).toBeLessThanOrEqual(MAX_TRACKED_IPS);
  });
});
