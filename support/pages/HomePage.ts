import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';


export class HomePage extends BasePage {
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.successMessage = page.locator('h1');

  }

   async openHomePage() {
    await this.page.goto(`/`);
  }

  async assertOpened() {
    await expect (this.page).toHaveURL(`https://authenticationtest.com/loginSuccess/`);
    await expect (this.successMessage).toBeVisible()
  }

}

