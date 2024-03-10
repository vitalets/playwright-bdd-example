import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig, cucumberReporter } from 'playwright-bdd';

const testDir = defineBddConfig({
  paths: ['features/*.feature'],
  featuresRoot: 'features',
  importTestFrom: 'steps/fixtures.ts',
  require: ['steps/*.ts'],
});

export default defineConfig({
  testDir,
  reporter: [cucumberReporter('html', { outputFile: 'reports/report.html' })],
  use: {
    screenshot: 'only-on-failure',
    baseURL: 'http://localhost:3000',
  },
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
