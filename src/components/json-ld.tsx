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
                "AI-embedded products, intelligent workflow automation, software platform development and modernization.",
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
