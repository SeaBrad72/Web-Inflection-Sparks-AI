import { generateOgImage, size, contentType } from "@/lib/og-image";

export { size, contentType };

export default async function Image() {
  return generateOgImage({
    title: "Products, AI Engineering & Development",
    description:
      "We design and build AI-embedded products, automate workflows with intelligence, and transform how your teams ship software.",
    badge: "Build",
  });
}
