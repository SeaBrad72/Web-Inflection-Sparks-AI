import next from "eslint-config-next";

const eslintConfig = [
  ...next,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      // Sanity Studio build output from `sanity deploy` (gitignored, but
      // flat config does not read .gitignore) — linting it OOMs the process.
      "dist/**",
      "next-env.d.ts",
      "coverage/**",
    ],
  },
];

export default eslintConfig;
