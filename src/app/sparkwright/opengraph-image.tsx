import { generateOgImage, size, contentType } from "@/lib/og-image";

export { size, contentType };

export default async function Image() {
  return generateOgImage({
    title: "Sparkwright — The agentic SDLC kit",
    subtitle: "Production-grade software with AI agents",
  });
}
