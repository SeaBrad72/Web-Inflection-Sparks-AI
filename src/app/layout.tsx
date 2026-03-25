import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://inflectionsparks.ai"),
  title: {
    default: "InflectionSparks.ai — Fractional CTO & AI Transformation",
    template: "%s | InflectionSparks.ai",
  },
  description:
    "Fractional CTO, CAIO, and CPO leadership for enterprise AI transformation. We embed with your teams, ship AI-powered products, restructure organizations for AI, and leave you self-sufficient.",
  keywords: [
    "fractional CTO",
    "fractional CAIO",
    "fractional CPO",
    "fractional AI officer",
    "AI transformation consulting",
    "AI strategy for enterprise",
    "engineering org restructuring",
    "engineering team restructuring",
    "AI readiness assessment",
    "AI adoption strategy",
    "agentic development",
    "agile to agentic transformation",
    "AI engineering leadership",
    "AI due diligence",
    "AI consulting for private equity",
    "technology due diligence PE",
    "technology leadership for PE",
    "fractional technology executive",
    "AI-powered product development",
    "platform modernization",
  ],
  openGraph: {
    title: "InflectionSparks.ai — Fractional CTO & AI Transformation",
    description:
      "We embed with your teams, uplevel your organization, ship AI-powered products, and leave you self-sufficient.",
    type: "website",
    siteName: "InflectionSparks.ai",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "InflectionSparks.ai — Fractional CTO & AI Transformation",
    description:
      "Fractional CTO and AI transformation for enterprise engineering organizations.",
  },
  alternates: {
    canonical: "https://inflectionsparks.ai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "InflectionSparks.ai",
              url: "https://inflectionsparks.ai",
              logo: "https://inflectionsparks.ai/logos/logo-dark.png",
              description:
                "Fractional CTO, CAIO, and CPO leadership for enterprise AI transformation.",
              founder: {
                "@type": "Person",
                name: "Bradley James",
                jobTitle: "Fractional CTO & AI Transformation Leader",
              },
              areaServed: "Worldwide",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Seattle",
                addressRegion: "WA",
                postalCode: "98126",
                addressCountry: "US",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                url: "https://inflectionsparks.ai/contact",
              },
              sameAs: [
                "https://www.linkedin.com/company/inflectionsparks",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased noise`}
      >
        <Nav />
        <main className="pt-16">{children}</main>
        <Footer />
        <Analytics />
        {/* Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-027LYKKCX4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-027LYKKCX4');
          `}
        </Script>
        {/* LinkedIn Insight Tag */}
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "8951708";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);})(window.lintrk);
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=8951708&fmt=gif"
          />
        </noscript>
      </body>
    </html>
  );
}
