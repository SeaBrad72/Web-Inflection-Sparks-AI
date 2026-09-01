/**
 * Root Studio config, for the Sanity CLI only.
 *
 * The Studio itself is embedded in the Next app at /studio and reads
 * src/sanity/studio-config.ts. `sanity deploy` and `sanity schema deploy`
 * look for this file at the repo root, so it re-exports that single
 * definition rather than duplicating it — one schema, two entry points.
 */
export { default } from "./src/sanity/studio-config";
