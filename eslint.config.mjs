import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
    recommendedConfig: js.configs.recommended,
});

/** @type {import('eslint').Linter.Config[]} */
const config = [
    // Global ignores
    {
        ignores: [
            ".next/**",
            "node_modules/**",
            "out/**",
            ".vercel/**",
            "*.config.js",
            "*.config.mjs",
        ],
    },
    // Next.js configs via FlatCompat
    ...compat.extends(
        "next/core-web-vitals",
        "next/typescript",
        "prettier"
    ),
    // Global settings
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                },
            ],
            "@typescript-eslint/no-explicit-any": "warn",
            "@next/next/no-page-custom-font": "off",
        },
    },
];

export default config;
