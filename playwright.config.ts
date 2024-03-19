import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig, cucumberReporter } from 'playwright-bdd';

const testDir = defineBddConfig({
  paths: ['features/*.feature'],
  importTestFrom: 'steps/fixtures.ts',
});

export default defineConfig({
  testDir,
  timeout: 1000,
  reporter: [cucumberReporter('html', { outputFile: 'cucumber-report/report.html' })],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
  ]
});
