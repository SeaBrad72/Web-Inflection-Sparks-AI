import { generateOgImage, size, contentType } from "@/lib/og-image";

export { size, contentType };

export default async function Image() {
  return generateOgImage({
    title: "Start the Conversation",
    description:
      "Whether you're evaluating AI strategy or ready to transform your engineering organization — it starts with a conversation.",
    badge: "Contact",
  });
}
