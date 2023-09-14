import { test as base } from 'playwright-bdd';
import { TodoPage } from './TodoPage';

export const test = base.extend<{ todoPage: TodoPage, browserSpecificTest: void }>({
  todoPage: async ({ page }, use) => use(new TodoPage(page)),
  browserSpecificTest: [async ({ $tags }, use, testInfo) => {
    if ($tags.includes('@firefox') && testInfo.project.name !== 'firefox') {
      testInfo.skip();
    }
    await use();
  }, { auto: true }],
});
