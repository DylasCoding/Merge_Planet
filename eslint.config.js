import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
    js.configs.recommended,

    ...tseslint.configs.recommended,

    eslintConfigPrettier,

    {
        files: ["**/*.{ts,tsx}"],

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",

            globals: {
                ...globals.browser,
            },
        },

        rules: {
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                },
            ],

            "no-console": "off",

            "no-debugger": "warn",
        },
    },
];