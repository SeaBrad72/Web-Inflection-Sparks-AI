import { generateOgImage, size, contentType } from "@/lib/og-image";

export { size, contentType };

export default async function Image() {
  return generateOgImage({
    title: "Case Studies & Results",
    description:
      "Selected engagements across 8 industries and 3 decades of platform shifts. See the results from inside the organizations we've transformed.",
    badge: "Work",
  });
}
