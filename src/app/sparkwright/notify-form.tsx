"use client";

import { useState } from "react";
import { Section, Wrap } from "./sparkwright-ui";

type Status = "idle" | "submitting" | "success" | "error";

export default function NotifyForm() {
  const [email, setEmail] = useState("");
  const [fax, setFax] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, fax }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <Section>
      <Wrap>
        <div className="rounded-xl border border-border-subtle px-6 py-6 sm:px-8 sm:py-7 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <div className="flex-1">
            <h3 className="text-base font-semibold tracking-tight">
              Get notified on releases
            </h3>
            <p className="mt-1 text-sm text-muted">
              An occasional email when a new Sparkwright release ships.
            </p>
          </div>

          {status === "success" ? (
            <p className="text-sm text-teal-light">
              You&rsquo;re on the list. Thanks.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-none w-full sm:w-auto"
              noValidate
            >
              <label htmlFor="notify-email" className="sr-only">
                Email address
              </label>
              <input
                id="notify-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2.5 rounded-lg border border-border-subtle bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-colors sm:w-64"
              />

              {/* Honeypot: hidden from sighted and keyboard users, visible to bots. */}
              <input
                type="text"
                name="fax"
                value={fax}
                onChange={(e) => setFax(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden"
              />

              <button
                type="submit"
                disabled={status === "submitting"}
                className="px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-muted hover:text-foreground hover:border-muted-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
              >
                {status === "submitting" ? "Sending..." : "Notify me"}
              </button>
            </form>
          )}
        </div>

        <div aria-live="polite" className={status === "error" ? "mt-2 text-sm text-red-400" : "sr-only"}>
          {status === "submitting" && "Submitting."}
          {status === "success" && "You’re on the list. Thanks."}
          {status === "error" && errorMsg}
        </div>
      </Wrap>
    </Section>
  );
}
