import { expect } from '@playwright/test';
import { createBdd} from 'playwright-bdd';

const { Given, When, Then } = createBdd();

Given('I open url {string}' , async ({ page }, url) => {
   await page.goto(url);
});

When('I click on cart link', async ({ page }) => {
  await page.getByText('Cart').click();
});

Then('Screenshot should get captured', async ({ page }) => {
  await expect(page).toHaveScreenshot('cartpage.png', { fullPage: true });
});