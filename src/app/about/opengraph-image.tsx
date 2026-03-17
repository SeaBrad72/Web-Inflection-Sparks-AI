import { generateOgImage, size, contentType } from "@/lib/og-image";

export { size, contentType };

export default async function Image() {
  return generateOgImage({
    title: "Bradley James",
    subtitle: "30 years of engineering leadership",
  });
}
