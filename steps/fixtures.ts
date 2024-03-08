import { test as base } from "playwright-bdd";
import { TodoPage } from "./TodoPage";
import { AdminTodoPage } from "./AdminTodoPage";
import { OtherTodoPage } from "./OtherTodoPage";

export const test = base.extend<{
  todoPage: TodoPage;
  browserSpecificTest: void;
  slowTest: void;
}>({
  todoPage: async ({ page }, use) => use(new TodoPage(page)),
  adminTodoPage: async ({ page }, use) => use(new AdminTodoPage(page)),
  otherTodoPage: async ({ page }, use) => use(new OtherTodoPage(page)),
  slowTest: [
    async ({ $tags }, use, testInfo) => {
      if ($tags.includes("@slow")) testInfo.setTimeout(5000);
      await use();
    },
    { auto: true },
  ],
  browserSpecificTest: [
    async ({ $tags }, use, testInfo) => {
      if ($tags.includes("@firefox") && testInfo.project.name !== "firefox") {
        testInfo.skip();
      }
      await use();
    },
    { auto: true },
  ],
});
