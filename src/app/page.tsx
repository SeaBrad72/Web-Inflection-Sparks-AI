import Hero from "@/components/hero";
import Thesis from "@/components/thesis";
import Services from "@/components/services";
import ProofPoints from "@/components/proof-points";
import Engagement from "@/components/engagement";
import Founder from "@/components/founder";
import Credentials from "@/components/credentials";
import CTA from "@/components/cta";
import JsonLd from "@/components/json-ld";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Hero />
      <Thesis />
      <Services />
      <ProofPoints />
      <Engagement />
      <Founder />
      <Credentials />
      <CTA />
    </>
  );
}
