import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage{
  readonly signInButton: Locator;
  readonly userName: Locator;
  readonly password: Locator;



  constructor(page: Page) {
    super(page);
    this.signInButton = page.locator('input[type="submit"]');
    this.userName = page.locator('input[name="email"]');
    this.password = page.locator('input[name="password"]');
    }

   async openLoginPage() {
    await this.page.goto(`/simpleFormAuth/`);
    await expect (this.signInButton).toBeVisible()
  }

  async clickOnSignIn() {
    await this.signInButton.click();
  }

  async enterUser(user: string) {
    await this.userName.fill(user);
  }

  async enterPassword(password: string) {
    await this.password.fill(password);
  }

  async assertLoginSuccess() {
    await expect (this.page).toHaveURL(`https://authenticationtest.com/loginSuccess/`);
  }
}
