import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
  {
    files: ["**/*.{js}"],
    plugins: { js, prettier: eslintPluginPrettier },
    extends: ["js/recommended", eslintConfigPrettier],
    languageOptions: { globals: globals.browser },
    ignores: ["node_modules/**", "dist/**", "vite.config.js"],
    rules: {
      "prettier/prettier": "error",
      "no-console": "warn",
      eqeqeq: "warn",
      curly: "warn",
      "no-unused-vars": "warn",
      "no-debugger": "error",
    },
  },
]);
