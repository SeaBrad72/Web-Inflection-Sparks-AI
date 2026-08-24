import Hero from "@/components/hero";
import LogoBar from "@/components/logo-bar";
import Thesis from "@/components/thesis";
import Services from "@/components/services";
import ProofPoints from "@/components/proof-points";
import SparkwrightStrip from "@/components/sparkwright-strip";
import Engagement from "@/components/engagement";
import Founder from "@/components/founder";
import Credentials from "@/components/credentials";
import FAQ from "@/components/faq";
import CTA from "@/components/cta";
import JsonLd from "@/components/json-ld";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Hero />
      <LogoBar />
      <Thesis />
      <Services />
      <ProofPoints />
      <SparkwrightStrip />
      <Engagement />
      <Founder />
      <Credentials />
      <FAQ />
      <CTA />
    </>
  );
}
