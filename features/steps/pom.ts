import { Page, expect } from '@playwright/test';
import { Fixture, Given, When, Then } from 'playwright-bdd/decorators';
import { test } from './fixtures';

export
@Fixture('base')
class Base {
  constructor(public page: Page, protected $test: typeof test) {}

  @Given('I am on todo page')
  async open() {
    await this.page.goto('https://demo.playwright.dev/todomvc/');
  }
}

export
@Fixture<typeof test>('extendedPage')
class ExtendedPage extends Base {
  @When('I add todo {string}')
  async addToDo(text: string) {
    // console.log('test info', this.$test.info());
    await this.page.locator('input.new-todo').fill(text);
    await this.page.locator('input.new-todo').press('Enter');
  }

  @Then('visible todos count is {int}')
  async checkVisibleTodosCount(count: number) {
    await expect(this.page.getByTestId('todo-item')).toHaveCount(count);
  }
}
