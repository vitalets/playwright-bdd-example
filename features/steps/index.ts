import { expect } from '@playwright/test';
import { Given, When, Then } from './fixtures';

When(
  'Actor does action {string} on {string} site',
  async ({ page }, customer: string, nameSite: string) => {
    // step body
  },
);

Then('User verifies something visible', async ({ page }) => {
  // step body
});
