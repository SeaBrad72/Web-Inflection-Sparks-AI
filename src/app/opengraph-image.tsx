import { generateOgImage, size, contentType } from "@/lib/og-image";

export { size, contentType };

export default async function Image() {
  return generateOgImage({
    title: "Fractional CTO & AI Transformation",
    subtitle: "Uplevel your organization for the AI era",
  });
}
