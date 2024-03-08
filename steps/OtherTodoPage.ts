import { Locator, Page, expect } from "@playwright/test";
import { Fixture, Given, When, Then } from "playwright-bdd/decorators";
import type { test } from "./fixtures";
import { TodoPage } from "./TodoPage";

export
@Fixture<typeof test>("otherTodoPage")
class OtherTodoPage extends TodoPage {
  constructor(public page: Page) {
    super(page);
  }

  @When("I complete todo {string}")
  async completeTodo(hasText: string) {
    const checkbox = this.todoItems.filter({ hasText }).getByRole("checkbox");
    if (!(await checkbox.isChecked())) {
      await checkbox.click();
    }
  }
}
