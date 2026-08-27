import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";

export default defineConfig([
    {
        ignores: ["node_modules", "dist", "backend"],
    },
    {
        files: ["**/*.{js,jsx}"],
        plugins: {
            js,
            "react-hooks": reactHooks,
        },
        extends: ["js/recommended"],
        languageOptions: { globals: globals.browser },

        settings: {
            react: {
                version: "detect",
            },
        },

        rules: {
            ...reactHooks.configs.recommended.rules,
        },
    },
    pluginReact.configs.flat.recommended,
    {
        files: ["**/*.{js,jsx}"],
        rules: {
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
        },
    },

    prettier,
]);
