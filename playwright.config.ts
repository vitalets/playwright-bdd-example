import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  paths: ['features/**/*.{feature,feature.md}'],
  require: ['steps/*.ts'],
  importTestFrom: 'steps/fixtures.ts',
});

export default defineConfig({
  testDir,
  reporter: 'html',
  use: {
    screenshot: 'only-on-failure',
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
