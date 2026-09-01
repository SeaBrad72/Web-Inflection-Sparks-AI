import { defineCliConfig } from "sanity/cli";

/**
 * Sanity CLI config — only used by `npx sanity ...`, never by the Next build.
 *
 * Enables deploying a hosted Studio to *.sanity.studio so articles can be
 * written from anywhere, rather than only from a local dev server. See
 * RUNBOOK 6b.
 */
export default defineCliConfig({
  api: {
    projectId: "pt4tkl68",
    dataset: "production",
  },
});
