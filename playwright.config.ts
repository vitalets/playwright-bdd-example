import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'features/*.feature',
  steps: 'features/steps/*.ts',
});

export default defineConfig({
  testDir,
  reporter: [
    process.env.SAUCE_VM
      ? [
          'html',
          { open: 'never', outputFolder: '__assets__/html-report/', attachmentsBaseURL: './' },
        ]
      : ['html', { open: 'never' }],
  ],
  use: {
    screenshot: 'on',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
