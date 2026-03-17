import { generateOgImage, size, contentType } from "@/lib/og-image";

export { size, contentType };

export default async function Image() {
  return generateOgImage({
    title: "Org & Team Evolution",
    description:
      "Transformation done WITH your teams, not TO them. Agile-to-Agentic methodology, org redesign, and self-sufficiency by design.",
    badge: "Transform",
  });
}
