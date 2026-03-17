import { generateOgImage, size, contentType } from "@/lib/og-image";

export { size, contentType };

export default async function Image() {
  return generateOgImage({
    title: "Fractional Leadership & AI Strategy",
    description:
      "Strategic technology leadership for the AI era. We set your AI strategy, governance, and product roadmap, then stay to make sure it sticks.",
    badge: "Lead",
  });
}
