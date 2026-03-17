import { generateOgImage, size, contentType } from "@/lib/og-image";

export { size, contentType };

export default async function Image() {
  return generateOgImage({
    title: "Fractional Leadership & AI Strategy",
    subtitle: "CTO / CAIO / CPO on demand",
  });
}
