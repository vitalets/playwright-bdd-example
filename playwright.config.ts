import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig, cucumberReporter } from 'playwright-bdd';

// keep in sync with the --port in the "dev"/"preview" scripts in package.json
const baseURL = `http://localhost:5050`;

// Endform starts workers directly, so initialize BDD state on the remote machine.
const workerIndex = process.env.TEST_WORKER_INDEX;
const initializeBdd = process.env.ENDFORM === 'true' && !process.env.PLAYWRIGHT_BDD_CONFIGS;
if (initializeBdd) delete process.env.TEST_WORKER_INDEX;

const testDir = defineBddConfig({
  features: 'features/*.feature',
  steps: 'features/steps/*.ts',
  sourceMaps: true,
});

if (initializeBdd && workerIndex !== undefined) process.env.TEST_WORKER_INDEX = workerIndex;

export default defineConfig({
  testDir,
  // Preserve generated BDD metadata line numbers on remote workers.
  build:
    process.env.ENDFORM === 'true' ? { external: ['**/.features-gen/**/*.spec.js'] } : undefined,
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
