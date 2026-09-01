import { createImageUrlBuilder } from "@sanity/image-url";
import { projectId, dataset } from "./config";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: any) {
  return builder.image(source);
}
