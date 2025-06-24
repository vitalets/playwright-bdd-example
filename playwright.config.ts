import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig, cucumberReporter } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'features/*.feature',
  steps: 'features/steps/*.ts',
});

// disable the removal of the blob report directory for shard runs
process.env.PWTEST_BLOB_DO_NOT_REMOVE = '1';

const isShardRun = process.argv.some((a) => a.startsWith('--shard'));

export default defineConfig({
  testDir,
  reporter: isShardRun 
    ? [['blob', { outputDir: `./output/blob-report`}]]
    : [
      cucumberReporter('html', { outputFile: './output/cucumber-report/index.html' }),
      cucumberReporter('junit', { outputFile: './output/cucumber-report/report.xml' }),
      cucumberReporter('json', { outputFile: './output/cucumber-report/report.json' }),
    ],
  use: {
    screenshot: 'on',
    trace: 'on',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
