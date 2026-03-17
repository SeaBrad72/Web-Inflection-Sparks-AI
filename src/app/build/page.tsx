import type { Metadata } from "next";
import BuildHero from "./build-hero";
import BuildModes from "./build-modes";
import BuildScaling from "./build-scaling";
import BuildMethodology from "./build-methodology";
import BuildCTA from "./build-cta";

export const metadata: Metadata = {
  title: "Products, AI Engineering & Development",
  description:
    "AI-embedded products, intelligent workflow automation, and modern software platforms. From pilot to production with MLOps, agentic development, and AI-native engineering methodology.",
  openGraph: {
    title: "Build — Products, AI Engineering & Development | InflectionSparks.ai",
    description:
      "We design and build AI-embedded products, automate workflows with intelligence, and transform how your teams ship software.",
  },
};

export default function BuildPage() {
  return (
    <>
      <BuildHero />
      <BuildModes />
      <BuildScaling />
      <BuildMethodology />
      <BuildCTA />
    </>
  );
}
