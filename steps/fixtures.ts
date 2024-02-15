import { APIResponse } from '@playwright/test';
import { test as base } from 'playwright-bdd';

export const test = base.extend<{ lastResponse: { data: APIResponse | null } }>({
  lastResponse: async ({}, use) => use({ data: null }),
});
