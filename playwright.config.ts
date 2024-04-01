import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig, cucumberReporter } from 'playwright-bdd';

const testDir = defineBddConfig({
//   importTestFrom: 'steps/fixtures.ts',
  paths: ['./features'],
  require: ['steps/*.js'],
  quotes: 'backtick',
  featuresRoot: './features',
});

export default defineConfig({
  repeatEach: 10,
  /* Maximum time one test can run for. */
  timeout: 3000 * 3000,
  expect: {
    timeout: 7000
  },
  testDir,
  reporter: [
    ['html'],
    cucumberReporter('html', { outputFile: 'cucumber-report/report.html' }),
    cucumberReporter('json', { outputFile: 'cucumber-report/report.json' }),
    cucumberReporter('junit', { outputFile: 'cucumber-report/report.xml' }),
    cucumberReporter('message', { outputFile: 'cucumber-report/report.ndjson' }),
  ],
  use: {
    actionTimeout: 0,
    browserName: 'chromium',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: {
      mode: 'on-first-retry',
      size: { width: 640, height: 480 }
    },
    ignoreHTTPSErrors: true,
    permissions: ['geolocation'],
    launchOptions: {
      args: ["--window-size=1920,1080", "--disable-web-security"],
    },
    viewport: null
  }
});