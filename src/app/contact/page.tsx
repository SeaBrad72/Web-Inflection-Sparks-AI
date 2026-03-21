import type { Metadata } from "next";
import ContactForm from "./contact-form";

export const metadata: Metadata = {
  title: "Contact — Start the Conversation",
  description:
    "Get in touch with Bradley James for fractional CTO leadership, AI strategy, or engineering transformation. Book a call or send a message.",
  openGraph: {
    title: "Contact | InflectionSparks.ai",
    description:
      "Whether you're evaluating AI strategy or ready to transform your organization — it starts with a conversation.",
  },
  alternates: {
    canonical: "https://inflectionsparks.ai/contact",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
