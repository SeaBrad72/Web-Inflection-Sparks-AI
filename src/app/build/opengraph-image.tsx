import { generateOgImage, size, contentType } from "@/lib/og-image";

export { size, contentType };

export default async function Image() {
  return generateOgImage({
    title: "AI Engineering & Product Development",
    subtitle: "From pilot to production",
  });
}
