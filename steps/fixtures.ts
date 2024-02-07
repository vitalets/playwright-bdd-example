import { test as base } from 'playwright-bdd';
import { TodoPage } from './TodoPage';

export const test = base.extend<{ todoPage: TodoPage, browserSpecificTest: void, slowTest: void }>({
  todoPage: async ({ page }, use) => use(new TodoPage(page)),
  slowTest: [async ({ $tags }, use, testInfo) => {
    if ($tags.includes('@slow')) testInfo.setTimeout(5000);
    await use();
  }, { auto: true }],
  browserSpecificTest: [async ({ $tags }, use, testInfo) => {
    if ($tags.includes('@firefox') && testInfo.project.name !== 'firefox') {
      testInfo.skip();
    }
    await use();
  }, { auto: true }],
});
