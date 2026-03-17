import type { Metadata } from "next";
import LeadHero from "./lead-hero";
import LeadOfferings from "./lead-offerings";
import LeadReadiness from "./lead-readiness";
import LeadApproach from "./lead-approach";
import LeadPE from "./lead-pe";
import LeadCTA from "./lead-cta";

export const metadata: Metadata = {
  title: "Fractional Leadership & AI Strategy",
  description:
    "Fractional CTO, CAIO, and CPO leadership for enterprise and PE-backed companies. AI strategy, governance, compliance, product roadmap, and executive advisory.",
  openGraph: {
    title: "Lead — Fractional Leadership & AI Strategy | InflectionSparks.ai",
    description:
      "Strategic technology leadership for the AI era. We set your AI strategy, governance, and product roadmap, then stay to make sure it sticks.",
  },
};

export default function LeadPage() {
  return (
    <>
      <LeadHero />
      <LeadOfferings />
      <LeadReadiness />
      <LeadApproach />
      <LeadPE />
      <LeadCTA />
    </>
  );
}
