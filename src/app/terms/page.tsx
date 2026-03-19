import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of the InflectionSparks.ai website.",
  alternates: {
    canonical: "https://inflectionsparks.ai/terms",
  },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
        Terms of Service
      </h1>
      <p className="text-sm text-muted-foreground mb-10">
        Last updated: March 19, 2026
      </p>

      <div className="space-y-8 text-muted leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Agreement to Terms
          </h2>
          <p>
            By accessing or using the InflectionSparks.ai website, you agree to
            be bound by these Terms of Service. If you do not agree, please do
            not use the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Services
          </h2>
          <p>
            InflectionSparks.ai provides information about fractional technology
            leadership, AI transformation consulting, and related services. The
            content on this website is for informational purposes and does not
            constitute a binding offer or contract for services. All engagements
            are governed by separate agreements executed between the parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Intellectual Property
          </h2>
          <p>
            All content on this website — including text, graphics, logos,
            images, and software — is the property of InflectionSparks.ai or its
            content suppliers and is protected by applicable intellectual
            property laws. You may not reproduce, distribute, or create
            derivative works without written permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            User Submissions
          </h2>
          <p>
            Information submitted through our contact form is used solely for
            the purpose of responding to your inquiry. We do not claim ownership
            of any information you submit. See our Privacy Policy for details on
            how we handle your data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Disclaimer
          </h2>
          <p>
            The information on this website is provided &quot;as is&quot; without
            warranties of any kind. Case study results and metrics described on
            this site reflect specific past engagements and are not guarantees of
            future outcomes. Every organization is different, and results depend
            on numerous factors.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Limitation of Liability
          </h2>
          <p>
            InflectionSparks.ai shall not be liable for any indirect,
            incidental, or consequential damages arising from your use of this
            website or reliance on any information provided herein.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            External Links
          </h2>
          <p>
            This website may contain links to third-party websites (including
            Calendly, LinkedIn, and others). We are not responsible for the
            content or privacy practices of those sites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Changes to Terms
          </h2>
          <p>
            We reserve the right to update these terms at any time. Changes will
            be posted on this page with an updated effective date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Governing Law
          </h2>
          <p>
            These terms are governed by the laws of the State of Washington,
            United States.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Contact
          </h2>
          <p>
            Questions about these terms? Contact us at{" "}
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
