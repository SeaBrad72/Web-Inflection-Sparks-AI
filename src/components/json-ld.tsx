// JSON-LD structured data for SEO rich snippets.
// All data is static — no user input flows into this component.
// dangerouslySetInnerHTML is the standard Next.js pattern for JSON-LD injection.
// See: https://nextjs.org/docs/app/building-your-application/optimizing/metadata#json-ld

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://inflectionsparks.ai/#organization",
      name: "InflectionSparks.ai",
      url: "https://inflectionsparks.ai",
      logo: "https://inflectionsparks.ai/logos/banner-light.png",
      description:
        "Fractional CTO, CAIO, and CPO leadership for enterprise AI transformation. We embed with your teams, ship AI-powered products, and leave you self-sufficient.",
      founder: {
        "@type": "Person",
        name: "Bradley James",
        jobTitle: "Founder & Fractional CTO",
        url: "https://www.linkedin.com/in/bpjames",
      },
      areaServed: "US",
      knowsAbout: [
        "AI Transformation",
        "Fractional CTO Services",
        "Engineering Organization Restructuring",
        "AI Strategy & Governance",
        "Agentic Development Methodology",
        "Platform Modernization",
        "AI Due Diligence for Private Equity",
        "MLOps & AI Operations",
        "Pilot-to-Production AI Scaling",
        "AI Readiness Assessment",
        "Change Management for AI Adoption",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://inflectionsparks.ai/#service",
      name: "InflectionSparks.ai",
      url: "https://inflectionsparks.ai",
      provider: { "@id": "https://inflectionsparks.ai/#organization" },
      serviceType: [
        "Fractional CTO",
        "Fractional CAIO",
        "AI Transformation Consulting",
        "Engineering Leadership",
        "AI Strategy",
        "Technology Due Diligence",
      ],
      areaServed: "US",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Lead",
              description:
                "Fractional CTO, CAIO, and CPO leadership. AI strategy, governance, product roadmap, and executive advisory.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Build",
              description:
                "AI-embedded products, intelligent workflow automation, pilot-to-production scaling with MLOps, and platform modernization.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Transform",
              description:
                "Engineering and product org redesign, AI-native development methodology, team upskilling, and self-sufficiency by design.",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://inflectionsparks.ai/#website",
      url: "https://inflectionsparks.ai",
      name: "InflectionSparks.ai",
      publisher: { "@id": "https://inflectionsparks.ai/#organization" },
    },
    {
      "@type": "FAQPage",
      "@id": "https://inflectionsparks.ai/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "We already have a CTO. How does this work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most of our engagements are alongside an existing CTO, not instead of one. We augment your leadership team with specialized AI transformation experience, help your CTO execute a broader mandate, and transfer knowledge so they're stronger when we leave. The goal is to make your existing leadership more effective — not to compete with them.",
          },
        },
        {
          "@type": "Question",
          name: "How is this different from hiring a consulting firm?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Consulting firms deliver a strategy deck and leave. We embed with your teams, build the systems and processes that scale alongside your people, restructure your organization from the inside, and stay accountable for outcomes — not deliverables. We don't bill by the hour for recommendations. We're measured by what your team can do after we're gone.",
          },
        },
        {
          "@type": "Question",
          name: 'What does "fractional" actually mean?',
          acceptedAnswer: {
            "@type": "Answer",
            text: "Fractional means you get executive-level leadership at a fraction of the cost of a full-time hire. Depending on the engagement, that might be 2-3 days per week embedded with your team, or full-time for a focused transformation sprint. The structure adapts to what you need — not to a billing model.",
          },
        },
        {
          "@type": "Question",
          name: "What happens in the first 30 days?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We diagnose. That means interviewing your engineering, product, and executive teams, auditing your technology stack, mapping your organizational structure, and identifying the real blockers — not the symptoms. By day 30, you have a clear-eyed assessment and a concrete transformation roadmap with priorities, timelines, and measurable outcomes.",
          },
        },
        {
          "@type": "Question",
          name: "How long does a typical engagement last?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most transformations run 4-9 months from diagnosis through self-sufficiency. Some focused engagements (technology due diligence, AI readiness assessments) are 2-4 weeks. The timeline depends on the scope — but every engagement is designed to end. We don't create dependency.",
          },
        },
        {
          "@type": "Question",
          name: "Can you help if we're not sure what we need yet?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "That's exactly where most conversations start. You know something needs to change — AI is moving fast, your engineering org isn't keeping up, or the board is asking questions you can't answer yet. A 30-minute call is enough to determine whether we're the right fit and what the next step would be.",
          },
        },
      ],
    },
  ],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
