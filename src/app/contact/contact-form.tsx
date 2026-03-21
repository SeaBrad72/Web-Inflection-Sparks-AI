"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Calendar } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
}

const interests = [
  "Fractional CTO / CAIO / CPO",
  "AI Strategy & Roadmap",
  "Engineering Org Transformation",
  "AI-Embedded Product Development",
  "Technology Due Diligence",
  "Board & Executive Advisory",
  "Something else",
];

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    interest: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      track("contact_form_submitted", {
        interest: form.interest || "not specified",
        hasCompany: !!form.company,
      });
      setForm({ name: "", email: "", company: "", interest: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong"
      );
    }
  }

  return (
    <section className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,_rgba(47,133,90,0.25)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Copy + Calendly */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal/20 bg-teal/5 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
              <span className="text-xs font-medium text-teal-light tracking-wide">
                Contact
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              Let&apos;s talk.
            </h1>
            <p className="text-lg text-muted leading-relaxed mb-8">
              Whether you&apos;re evaluating AI strategy, considering fractional
              leadership, or ready to transform your organization —
              it starts with a conversation.
            </p>

            {/* What to expect */}
            <div className="mb-10">
              <h3 className="text-sm font-medium text-foreground mb-4">
                What to expect
              </h3>
              <ul className="space-y-3">
                {[
                  "A direct conversation with Bradley — no sales team, no gatekeepers",
                  "An honest assessment of where you are and what's realistic",
                  "Clarity on whether we're the right fit before any engagement",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-muted"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal/50 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Calendly link */}
            <div className="p-6 rounded-xl border border-border-subtle bg-surface">
              <h3 className="text-sm font-medium text-foreground mb-2">
                Prefer to book directly?
              </h3>
              <p className="text-sm text-muted mb-4">
                Skip the form and pick a time that works for you.
              </p>
              <a
                href="https://calendly.com/inflectionsparks/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-muted hover:text-foreground hover:border-muted-foreground transition-all"
              >
                <Calendar className="h-4 w-4" />
                Book a 30-Minute Call
              </a>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8 rounded-2xl border border-teal/20 bg-teal/[0.03]">
                <CheckCircle className="h-12 w-12 text-teal mb-4" />
                <h3 className="text-xl font-bold mb-2">Message sent.</h3>
                <p className="text-sm text-muted max-w-sm">
                  Thanks for reaching out. I&apos;ll get back to you within one
                  business day — usually sooner.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm text-teal-light hover:text-teal transition-colors cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 p-8 rounded-2xl border border-border-subtle bg-surface"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-colors"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-colors"
                    placeholder="you@company.com"
                  />
                </div>

                {/* Company */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-colors"
                    placeholder="Your company (optional)"
                  />
                </div>

                {/* Interest */}
                <div>
                  <label
                    htmlFor="interest"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    I&apos;m interested in
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={form.interest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-colors"
                  >
                    <option value="">Select a topic (optional)</option>
                    {interests.map((interest) => (
                      <option key={interest} value={interest}>
                        {interest}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-colors resize-none"
                    placeholder="Tell me about your situation and what you're looking to accomplish..."
                  />
                </div>

                {/* Error message */}
                {status === "error" && (
                  <div role="alert" className="flex items-center gap-2 text-sm text-red-400">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    {errorMsg}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-teal text-white font-medium hover:bg-teal-light transition-all hover:shadow-lg hover:shadow-teal/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {status === "sending" ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
