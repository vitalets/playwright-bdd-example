import { test as base, createBdd } from 'playwright-bdd';

type Fixtures = {
  filterBrowsers: void;
};

export const test = base.extend<Fixtures>({
  filterBrowsers: [
    async ({ $tags, defaultBrowserType }, use, testInfo) => {
      if (defaultBrowserType === 'chromium' && !$tags.includes('@chrome')) testInfo.skip();
      if (defaultBrowserType === 'webkit' && !$tags.includes('@WebKit')) testInfo.skip();
      await use();
    },
    { auto: true },
  ],
});

export const { Given, When, Then } = createBdd(test);
