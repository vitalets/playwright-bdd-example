import { expect, type Locator, type Page } from '@playwright/test';

export abstract class BasePage {
   page: Page;


  constructor(page: Page) {
    this.page = page;
  }
  
}

