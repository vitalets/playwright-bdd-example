import { expect } from '@playwright/test';
import { Given, When, Then } from './fixtures';

Given('I am on the users list', async ({ page }) => {
  await page.goto('/');
});

When('I click the first user', async ({ page }) => {
  await page.getByTestId('user-row').first().click();
});

When('I click the next page button', async ({ page }) => {
  await page.getByRole('button', { name: 'Next page' }).click();
});

When('I click the previous page button', async ({ page }) => {
  await page.getByRole('button', { name: 'Previous page' }).click();
});

Then('I see heading {string}', async ({ page }, text: string) => {
  await expect(page.getByRole('heading', { name: text })).toBeVisible();
});

Then('I see {int} users in the table', async ({ page }, count: number) => {
  await expect(page.getByTestId('user-row')).toHaveCount(count);
});

Then('the first user is {string}', async ({ page }, name: string) => {
  await expect(page.getByTestId('user-row').first()).toContainText(name);
});

Then('I see the name {string}', async ({ page }, name: string) => {
  await expect(page.getByRole('heading', { name })).toBeVisible();
});
