import type { Metadata } from "next";
import TransformHero from "./transform-hero";
import TransformPhilosophy from "./transform-philosophy";
import TransformMethodology from "./transform-methodology";
import TransformProof from "./transform-proof";
import TransformCTA from "./transform-cta";

export const metadata: Metadata = {
  title: "Org & Team Evolution",
  description:
    "Engineering and product org redesign for the AI era. We upskill your teams, modernize your processes, and design for self-sufficiency — not dependency.",
  openGraph: {
    title: "Transform — Org & Team Evolution | InflectionSparks.ai",
    description:
      "Transformation done WITH your teams, not TO them. Agile-to-Agentic methodology, org redesign, and self-sufficiency by design.",
  },
};

export default function TransformPage() {
  return (
    <>
      <TransformHero />
      <TransformPhilosophy />
      <TransformMethodology />
      <TransformProof />
      <TransformCTA />
    </>
  );
}
