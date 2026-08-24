import type { Metadata } from "next";
import SparkwrightHero from "./sparkwright-hero";
import SparkwrightWhat from "./sparkwright-what";
import SparkwrightWhy from "./sparkwright-why";
import SparkwrightUse from "./sparkwright-use";
import SparkwrightPrinciples from "./sparkwright-principles";
import SparkwrightSpine from "./sparkwright-spine";
import SparkwrightCoverage from "./sparkwright-coverage";

export const metadata: Metadata = {
  title: "Sparkwright — The agentic SDLC kit",
  description:
    "Sparkwright is the agentic SDLC kit: guardrails that let anyone build production-grade software with AI agents, from an idea to operating software.",
  alternates: { canonical: "https://inflectionsparks.ai/sparkwright" },
  openGraph: {
    title: "Sparkwright — The agentic SDLC kit | InflectionSparks.ai",
    description:
      "Guardrails that let anyone build production-grade software with AI agents. Open source, neutral on stack, harness, and model.",
  },
};

export default function SparkwrightPage() {
  return (
    <>
      <SparkwrightHero />
      <SparkwrightWhat />
      <SparkwrightWhy />
      <SparkwrightUse />
      <SparkwrightPrinciples />
      <SparkwrightSpine />
      <SparkwrightCoverage />
    </>
  );
}
