import { defineConfig } from "vitest/config";

export default defineConfig({
    resolve: {
        extensions: [".ts"],
    },

    "cacheDir": "./.artifacts/vitest",

    test: {
        "coverage": {
            "provider": "v8",
            "reporter": ["html-spa", "lcovonly", "cobertura"],
            "reportsDirectory": "./.artifacts/coverage",
        },
        "watch": false,
        exclude: ["npm/**"],
        "outputFile": "./.artifacts/vitest.json",
    },
});
