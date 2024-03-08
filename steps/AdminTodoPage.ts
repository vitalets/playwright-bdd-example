import { Locator, Page, expect } from "@playwright/test";
import { Fixture, Given, When, Then } from "playwright-bdd/decorators";
import type { test } from "./fixtures";
import { TodoPage } from "./TodoPage";

export
@Fixture<typeof test>("adminTodoPage")
class AdminTodoPage extends TodoPage {
  constructor(public page: Page) {
    super(page);
  }

  @When("I add todo {string}")
  async addToDo(text: string) {
    await this.inputBox.fill(text);
    await this.inputBox.press("Enter");
  }
}
