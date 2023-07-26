import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import path from "path";
export const STORAGE_STATE = path.join(__dirname, ".auth/user.json");

export default defineConfig({
  reporter: 'html',
  projects: [
    {
      name: 'Login setup',
      testDir: defineBddConfig({
        outputDir: '.features-gen/login',
        importTestFrom: 'steps/fixtures.ts',
        paths: ['features'],
        require: ['steps/*.ts'],
      }),
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'chromium',
      testDir: defineBddConfig({
        outputDir: '.features-gen/regression-chrome',
        importTestFrom: 'steps/fixtures.ts',
        paths: ['features'],
        require: ['steps/*.ts'],
      }),
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['Login setup']
    },
    {
      name: 'firefox',
      testDir: defineBddConfig({
        outputDir: '.features-gen/regression-firefox',
        importTestFrom: 'steps/fixtures.ts',
        paths: ['features'],
        require: ['steps/*.ts'],
      }),
      use: { ...devices['Desktop Firefox'] },
      dependencies: ['Login setup']
    },
  ]
});
