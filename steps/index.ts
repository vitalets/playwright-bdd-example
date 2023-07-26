import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from './fixtures';
import { STORAGE_STATE } from "../playwright.config";

const { Given, When, Then } = createBdd(test);

Given('I am on home page', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await page.context().storageState({ path: STORAGE_STATE });
});

When('I click link {string}', async ({ page }, name: string) => {
  await page.getByRole('link', { name }).click();
});

Then('I see in title {string}', async ({ page }, text: string) => {
  await expect(page).toHaveTitle(new RegExp(text));
});
