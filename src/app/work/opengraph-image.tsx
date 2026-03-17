import { generateOgImage, size, contentType } from "@/lib/og-image";

export { size, contentType };

export default async function Image() {
  return generateOgImage({
    title: "Case Studies & Results",
    subtitle: "8 industries. 3 decades. Real outcomes.",
  });
}
