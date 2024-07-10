import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';


export class AboutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }


  async assertAuthorized() {
    await expect (this.page.getByRole('navigation')).toContainText('Sign Out')
  }
}

