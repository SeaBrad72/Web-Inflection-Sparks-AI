import { generateOgImage, size, contentType } from "@/lib/og-image";

export { size, contentType };

export default async function Image() {
  return generateOgImage({
    title: "Start the Conversation",
    subtitle: "Book a call or send a message",
  });
}
