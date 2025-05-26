import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig, cucumberReporter } from 'playwright-bdd';

// const testDir = defineBddConfig({
//   features: 'features/*.feature',
//   steps: 'features/steps/*.ts',
// });

export default defineConfig({
  // testDir,
  respectGitIgnore: false,
  reporter: [
    cucumberReporter('html', {
      outputFile: 'cucumber-report/index.html',
    }),
    ['html', { open: 'never' }],
  ],
  use: {
    screenshot: 'on',
    trace: 'on',
  },
  // no projects here, see browserstack.yml
});
