import type { Metadata } from "next";
import AboutHero from "./about-hero";
import AboutJourney from "./about-journey";
import AboutPhilosophy from "./about-philosophy";
import AboutCTA from "./about-cta";

export const metadata: Metadata = {
  title: "About — Bradley James",
  description:
    "Three decades of engineering leadership across BMW, Sony, Whitepages, Universal Music Group, and Matrix Medical. Fractional CTO and AI transformation for enterprise organizations.",
  openGraph: {
    title: "About Bradley James | InflectionSparks.ai",
    description:
      "From Qwest to Sony to BMW to the AI era. 30 years of building and rebuilding engineering organizations through every major platform shift.",
  },
  alternates: {
    canonical: "https://inflectionsparks.ai/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutJourney />
      <AboutPhilosophy />
      <AboutCTA />
    </>
  );
}
