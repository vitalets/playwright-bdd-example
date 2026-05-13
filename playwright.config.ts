import { defineConfig, devices } from '@playwright/test';
import { cucumberReporter, defineBddProject } from 'playwright-bdd';

const webProject = defineBddProject({
  name: 'web-chromium',
  features: 'features/web/**/*.feature',
  steps: ['features/steps/web/**/*.ts', 'features/steps/shared/**/*.ts', 'features/steps/fixtures.ts'],
});

const apiProject = defineBddProject({
  name: 'api',
  features: 'features/api/**/*.feature',
  steps: ['features/steps/api/**/*.ts', 'features/steps/shared/**/*.ts', 'features/steps/fixtures.ts'],
});

const mobileAndroidProject = defineBddProject({
  name: 'mobile-android',
  features: 'features/mobile/**/*.feature',
  steps: ['features/steps/mobile/**/*.ts', 'features/steps/shared/**/*.ts', 'features/steps/fixtures.ts'],
});

const mobileIosProject = defineBddProject({
  name: 'mobile-ios',
  features: 'features/mobile/**/*.feature',
  steps: ['features/steps/mobile/**/*.ts', 'features/steps/shared/**/*.ts', 'features/steps/fixtures.ts'],
});

export default defineConfig({
  reporter: [
    cucumberReporter('html', {
      outputFile: 'cucumber-report/index.html',
      externalAttachments: true,
    }),
    ['html', { open: 'never' }],
  ],
  use: {
    screenshot: 'on',
    trace: 'on',
  },
  projects: [
    { ...webProject, use: { ...devices['Desktop Chrome'] } },
    { ...apiProject },
    { ...mobileAndroidProject, use: { mobilePlatform: 'android' } as Record<string, unknown> },
    { ...mobileIosProject, use: { mobilePlatform: 'ios' } as Record<string, unknown> },
  ],
});
