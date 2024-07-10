import { test as base } from 'playwright-bdd';
import { Browser, BrowserContext, Page, request } from '@playwright/test';
import * as Pages from './pages';

type AuthFixture = { context: BrowserContext, page: Page, userName: string };

type MyTestFixtures = {
  loginPage: Pages.LoginPage;
  auth: AuthFixture;
  pages: { 
    homePage: Pages.HomePage; 
    aboutPage: Pages.AboutPage;
    loginPage: Pages.LoginPage;
  };
  //workerStorageState: string;
};

// const createTestFunction =
//   <T extends new (page: Page) => InstanceType<T>>(PageClass: T) =>
//   async (
//     fixtures: { page: Page },
//     use: (fixture: InstanceType<T>) => Promise<void>
//   ) =>
//     use(new PageClass(fixtures.page));

export const test = base.extend<MyTestFixtures>({
  auth: async ({}, use) => {
    const auth = {} as AuthFixture; // <- will be initialized in steps
    await use(auth);
    await auth.context?.close();
  },
  pages: async ({}, use) => {
    const pages = {} as MyTestFixtures['pages']; // <- will be initialized in steps
    await use(pages);
  },
}); 