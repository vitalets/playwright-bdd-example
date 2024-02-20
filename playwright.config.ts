import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig, cucumberReporter } from 'playwright-bdd';

const testDir = defineBddConfig({
  importTestFrom: 'steps/fixtures.ts',
  paths: ['./features'],
  require: ['steps/*.ts'],
  quotes: 'backtick',
  featuresRoot: './features',
});

export default defineConfig({
  testDir,
  reporter: [
    cucumberReporter('html', { outputFile: 'cucumber-report/report.html' }),
    cucumberReporter('json', { outputFile: 'cucumber-report/report.json' }),
    cucumberReporter('junit', { outputFile: 'cucumber-report/report.xml' }),
    cucumberReporter('message', { outputFile: 'cucumber-report/report.ndjson' }),
  ],
  use: {
    screenshot: 'only-on-failure',
    baseURL: 'http://localhost:3000',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ]
});
