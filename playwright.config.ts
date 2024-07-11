import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig, cucumberReporter } from 'playwright-bdd';
//import dotenv from 'dotenv';
//import path from 'path';


const testDir = defineBddConfig({
  paths: ['test/features/*.feature'],
  require: ['test/steps/*.ts'],
  importTestFrom: 'support/fixtures/fixtures.ts',
});

//dotenv.config({
//  path: `environments/.env.${process.env.ENV}`,
//});

//export const STORAGE_STATE = path.join(__dirname, 'playwright/.auth/user.json');

export default defineConfig({
  testDir,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  //forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : 5,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [cucumberReporter('html', { outputFile: 'cucumber-report/report.html' })],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
     baseURL: 'https://authenticationtest.com',  //process.env.BASE_URL,


    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    //launchOptions:{
    //  slowMo: 1000,
    //}
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        //storageState: 'playwright/.auth/user.json',
      },
    },
    //{
    //  name: 'edge',
    //  use: { ...devices['Desktop Edge'] },
    //},
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
  ],
});