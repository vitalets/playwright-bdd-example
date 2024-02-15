import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  importTestFrom: 'steps/fixtures.ts',
  paths: ['./features'],
  require: ['steps/*.ts'],
  quotes: 'backtick',
  featuresRoot: './features',
});

export default defineConfig({
  testDir,
  reporter: 'html',
  use: {
    baseURL: 'http://httpbin.org',
    screenshot: 'only-on-failure',
  },
});
