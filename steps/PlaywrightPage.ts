import { Page, expect } from '@playwright/test';
import { Fixture, Given, When } from 'playwright-bdd/decorators';
import { test } from './fixtures';

export
@Fixture<typeof test>('playwrightPage')
class PlaywrightPage {
  constructor(public page: Page) {}

  @Given('I am on Playwright home page')
  async open() {
    test.setTimeout(10 * 1000);
    await this.page.goto('https://playwright.dev');
    await this.page.waitForTimeout(2000);
  }

  @When('I click link {string}')
  async clickLink(name: string) {
    await this.page.getByRole('link', { name }).click();
  }

  @When('I see in title {string}')
  async assertTitle(text: string) {
    await expect(this.page).toHaveTitle(new RegExp(text));
  }
}
