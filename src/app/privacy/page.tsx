import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How InflectionSparks.ai collects, uses, and protects your information.",
  alternates: {
    canonical: "https://inflectionsparks.ai/privacy",
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
        Privacy Policy
      </h1>
      <p className="text-sm text-muted-foreground mb-10">
        Last updated: March 19, 2026
      </p>

      <div className="space-y-8 text-muted leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Information We Collect
          </h2>
          <p>
            When you use our contact form, we collect the information you
            provide: your name, email address, company name (optional), area of
            interest, and message content. We also collect basic analytics data
            (page views, referral source, device type) through Vercel Analytics
            to understand how visitors use our site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            How We Use Your Information
          </h2>
          <p>We use the information you provide to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Respond to your inquiry and follow up on your request</li>
            <li>Understand which services are of interest to potential clients</li>
            <li>Improve our website and services</li>
          </ul>
          <p className="mt-3">
            We do not sell, rent, or share your personal information with third
            parties for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Third-Party Services
          </h2>
          <p>We use the following third-party services:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              <strong>Vercel</strong> — website hosting and privacy-focused
              analytics (no cookies, no personal data tracking)
            </li>
            <li>
              <strong>Resend</strong> — transactional email delivery for contact
              form submissions
            </li>
            <li>
              <strong>Calendly</strong> — appointment scheduling (governed by
              Calendly&apos;s own privacy policy)
            </li>
            <li>
              <strong>Sanity</strong> — content management for our blog
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Cookies
          </h2>
          <p>
            This website does not use tracking cookies. Vercel Analytics is
            privacy-focused and does not use cookies or collect personally
            identifiable information. Essential cookies may be used by
            third-party embeds (such as Calendly) when you interact with those
            features.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Data Retention
          </h2>
          <p>
            Contact form submissions are retained for as long as necessary to
            respond to your inquiry and maintain our business relationship. You
            may request deletion of your information at any time by contacting
            us.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Your Rights
          </h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Request access to any personal information we hold about you</li>
            <li>Request correction or deletion of your personal information</li>
            <li>Opt out of any future communications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Contact
          </h2>
          <p>
            For privacy-related questions or requests, contact us at{" "}
            <a
              href="mailto:bradley@inflectionsparks.ai"
              className="text-teal-light hover:underline"
            >
              bradley@inflectionsparks.ai
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
