import { generateOgImage, size, contentType } from "@/lib/og-image";

export { size, contentType };

export default async function Image() {
  return generateOgImage({
    title: "Fractional CTO & AI Transformation",
    description:
      "We embed with your teams, rebuild your engineering org, ship AI-powered products, and leave you self-sufficient.",
  });
}
