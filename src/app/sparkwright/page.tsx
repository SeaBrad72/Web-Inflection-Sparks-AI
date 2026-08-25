import type { Metadata } from "next";
import SparkwrightSubnav from "./sparkwright-subnav";
import SparkwrightHero from "./sparkwright-hero";
import SparkwrightWhat from "./sparkwright-what";
import SparkwrightWhy from "./sparkwright-why";
import SparkwrightUse from "./sparkwright-use";
import SparkwrightPrinciples from "./sparkwright-principles";
import SparkwrightSpine from "./sparkwright-spine";
import SparkwrightCoverage from "./sparkwright-coverage";
import NotifyForm from "./notify-form";
import SparkwrightGuardrails from "./sparkwright-guardrails";
import SparkwrightEnterprise from "./sparkwright-enterprise";
import SparkwrightHonesty from "./sparkwright-honesty";
import SparkwrightMaturity from "./sparkwright-maturity";
import SparkwrightCTA from "./sparkwright-cta";

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
      <SparkwrightSubnav />
      <SparkwrightHero />
      <SparkwrightWhat />
      <SparkwrightWhy />
      <SparkwrightUse />
      <SparkwrightPrinciples />
      <SparkwrightSpine />
      <SparkwrightCoverage />
      <NotifyForm />
      <SparkwrightGuardrails />
      <SparkwrightEnterprise />
      <SparkwrightHonesty />
      <SparkwrightMaturity />
      <SparkwrightCTA />
    </>
  );
}
