import { expect } from '@playwright/test';
import { Given, When, Then } from './fixtures';

Given('I am on Playwright home page', async ({ page }) => {
  await page.goto('https://playwright.dev');
});

Then('I see in title {string}', async ({ page }, text: string) => {
  await expect(page).toHaveTitle(new RegExp(text));
});
