import { test as base } from 'playwright-bdd';
import { PlaywrightPage } from './PlaywrightPage';

export const test = base.extend({
  playwrightPage: ({ page }, use) => use(new PlaywrightPage(page)),
});
