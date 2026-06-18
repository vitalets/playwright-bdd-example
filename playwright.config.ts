import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig, cucumberReporter } from 'playwright-bdd';

// keep in sync with the --port in the "dev"/"preview" scripts in package.json
const baseURL = `http://localhost:5050`;

const testDir = defineBddConfig({
  features: 'features/*.feature',
  steps: 'features/steps/*.ts',
});

export default defineConfig({
  testDir,
  reporter: [
    cucumberReporter('html', {
      outputFile: 'cucumber-report/index.html',
      externalAttachments: true,
    }),
    ['html', { open: 'never' }],
  ],
  use: {
    baseURL,
    screenshot: 'on',
    trace: 'on',
  },
  webServer: {
    command: 'npm run dev',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
