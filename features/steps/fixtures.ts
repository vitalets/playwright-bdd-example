import { test as base, createBdd } from 'playwright-bdd';
import { Device } from '../../src/device/device';
import { createAppiumSession } from '../../src/device/appium-session';
import { LocatorResolver } from '../../src/locators/locator-resolver';
import { TestData } from '../../src/utils/test-data';
import { MarketConfig, Platform, loadMarketConfig } from '../../src/utils/market';
import { AirtimePage } from '../../src/pages/mobile/airtime.page';
import { LoginPage } from '../../src/pages/mobile/login.page';
import { HomePage } from '../../src/pages/mobile/home.page';

type WorkerFixtures = {
  mobilePlatform: Platform | undefined;
  marketConfig: MarketConfig;
  testData: TestData;
  locatorResolver: LocatorResolver;
};

type TestFixtures = {
  device: Device;
  airtimePage: AirtimePage;
  loginPage: LoginPage;
  homePage: HomePage;
};

export const test = base.extend<TestFixtures, WorkerFixtures>({
  mobilePlatform: [undefined, { option: true, scope: 'worker' }],

  marketConfig: [
    async ({ mobilePlatform }, use) => {
      await use(loadMarketConfig(mobilePlatform));
    },
    { scope: 'worker' },
  ],

  testData: [
    async ({ marketConfig }, use) => {
      await use(new TestData(marketConfig));
    },
    { scope: 'worker' },
  ],

  locatorResolver: [
    async ({ marketConfig }, use) => {
      await use(new LocatorResolver(marketConfig));
    },
    { scope: 'worker' },
  ],

  device: async ({ marketConfig, locatorResolver, testData }, use) => {
    const browser = await createAppiumSession(marketConfig);
    const device = new Device(browser, locatorResolver, testData, marketConfig);
    try {
      await use(device);
    } finally {
      try {
        await browser.deleteSession();
      } catch {
        // session may already be gone — swallow.
      }
    }
  },

  airtimePage: async ({ device }, use) => {
    await use(new AirtimePage(device));
  },

  loginPage: async ({ device }, use) => {
    await use(new LoginPage(device));
  },

  homePage: async ({ device, airtimePage }, use) => {
    await use(new HomePage(device, airtimePage));
  },
});

export const { Given, When, Then } = createBdd(test);
