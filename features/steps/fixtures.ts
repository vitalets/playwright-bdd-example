import { mergeTests } from '@playwright/test';
import { test as base, createBdd } from 'playwright-bdd';
import { test as chromaticTest } from '@chromatic-com/playwright';

type Fixtures = {
  // set types of your fixtures
};

export const test = mergeTests(chromaticTest, base).extend<Fixtures>({
  // add your fixtures
});

export const { Given, When, Then } = createBdd(test);
