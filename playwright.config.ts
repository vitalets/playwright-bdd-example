import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig, cucumberReporter } from "playwright-bdd";

const testDir = defineBddConfig({
  features: "features/*.feature",
  steps: "steps/*.ts",
});

export default defineConfig({
  testDir,
  reporter: [
    cucumberReporter("html", { outputFile: "cucumber-report/report.html" }),
  ],
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
