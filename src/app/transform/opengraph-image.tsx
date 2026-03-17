import { generateOgImage, size, contentType } from "@/lib/og-image";

export { size, contentType };

export default async function Image() {
  return generateOgImage({
    title: "Org & Team Evolution",
    subtitle: "Done with your teams, not to them",
  });
}
