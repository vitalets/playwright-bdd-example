import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

export default defineConfig({
  reporter: 'html',
  use: {
    screenshot: 'only-on-failure',
    baseURL: 'http://localhost:3000',
  },
  projects: [
    {
      name: 'chromium',
      testDir: defineBddConfig({
        outputDir: ".features-gen/home",
        importTestFrom: 'steps/fixtures.ts',
        paths: ['./features/homepage.feature'],
        require: ['steps/*.ts'],
        quotes: 'backtick',
        featuresRoot: './features',
      }),
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testDir: defineBddConfig({
        outputDir: ".features-gen/todo",
        importTestFrom: 'steps/fixtures.ts',
        paths: ['./features/todopage.feature'],
        require: ['steps/*.ts'],
        quotes: 'backtick',
        featuresRoot: './features',
      }),
      use: { ...devices['Desktop Firefox'] },
    },
  ]
});
