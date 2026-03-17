import { generateOgImage, size, contentType } from "@/lib/og-image";

export { size, contentType };

export default async function Image() {
  return generateOgImage({
    title: "About — Bradley James",
    description:
      "From Qwest to Sony to BMW to the AI era. 30 years of building and rebuilding engineering organizations through every major platform shift.",
    badge: "About",
  });
}
