import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from './fixtures';

const { When, Then } = createBdd(test);

When('I send request to {string}', async ({ request, lastResponse }, route: string) => {
  lastResponse.data = await request.get(route);
});

Then('I see in response field {string} containing {string}', async ({ lastResponse }, field: string, value: string) => {
  expect(await lastResponse.data?.json()).toEqual({
    headers: expect.objectContaining({
      [field]: value
    })
  });
});
