// .eslintrc.js (or .cjs if needed)
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Required for ESM compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// For converting old-style ESLint configs to the new "flat" config
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Extend Next.js and TypeScript core configs
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Then override or disable certain rules
  {
    rules: {
      // Disable the rule that complains about unescaped apostrophes in JSX
      "react/no-unescaped-entities": "off",
      // Disable the rule that warns about <img> usage instead of <Image>
      "@next/next/no-img-element": "off",
    },
  },
];
