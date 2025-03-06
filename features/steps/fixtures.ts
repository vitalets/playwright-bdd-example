import { test as base, createBdd } from 'playwright-bdd';
import { ExtendedPage } from './pom';

type Fixtures = {
  // set types of your fixtures
  extendedPage: ExtendedPage;
};

export const test = base.extend<Fixtures>({
  extendedPage: ({ page }, use) => use(new ExtendedPage(page)),
});

export const { Given, When, Then } = createBdd(test);
