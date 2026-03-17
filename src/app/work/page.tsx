import type { Metadata } from "next";
import WorkHero from "./work-hero";
import WorkCases from "./work-cases";
import WorkCTA from "./work-cta";

export const metadata: Metadata = {
  title: "Work — Case Studies & Results",
  description:
    "Real transformation results from healthcare, automotive, entertainment, telecom, and SaaS. Cloud migrations, org redesigns, ML platforms, and $1B+ in generated revenue.",
  openGraph: {
    title: "Work — Case Studies & Results | InflectionSparks.ai",
    description:
      "Selected engagements across 8 industries and 3 decades of platform shifts. See the results from inside the organizations we've transformed.",
  },
  alternates: {
    canonical: "https://inflectionsparks.ai/work",
  },
};

export default function WorkPage() {
  return (
    <>
      <WorkHero />
      <WorkCases />
      <WorkCTA />
    </>
  );
}
