import { test as base } from 'playwright-bdd';
import { Browser, BrowserContext, Page, request } from '@playwright/test';
import * as Pages from './pages';

type AuthFixture = { context: BrowserContext, userName: string };

type MyTestFixtures = {
  loginPage: Pages.LoginPage;
  homePage: Pages.HomePage;
  auth: AuthFixture;
  //authPage: Page;
  //workerStorageState: string;
};

const createTestFunction =
  <T extends new (page: Page) => InstanceType<T>>(PageClass: T) =>
  async (
    fixtures: { page: Page },
    use: (fixture: InstanceType<T>) => Promise<void>
  ) =>
    use(new PageClass(fixtures.page));

    export const test = base.extend<MyTestFixtures>({
      loginPage: async ({ page }, use) => await createTestFunction(Pages.LoginPage)({ page }, use),
      homePage: async ({ page }, use) => await createTestFunction(Pages.HomePage)({ page }, use),
      auth: async ({ page }, use) => {
        const auth = {} as AuthFixture;
        auth.context = await page.context(); // Initialize auth.context
        await use(auth);
        await auth.context?.close();
      },
}); 