import { defineConfig } from "@playwright/test";
import { defineBddConfig, cucumberReporter } from "playwright-bdd";

const testDir = defineBddConfig({
  features: "features/*.feature",
  steps: "features/steps/*.ts",
});

export default defineConfig({
  projects: [
    {
      name: "bdd-project",
      testDir,
    },
    {
      name: "non-bdd-project",
      testDir: "non-bdd",
    },
  ],
});
