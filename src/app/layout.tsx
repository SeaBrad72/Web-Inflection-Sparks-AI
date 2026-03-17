import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    "Fractional CTO, CAIO, and CPO leadership for enterprise AI transformation. We embed with your teams, ship AI-powered products, restructure engineering orgs, and leave you self-sufficient.",
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
      "We embed with your teams, rebuild your engineering org, ship AI-powered products, and leave you self-sufficient.",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased noise`}
      >
        <Nav />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
