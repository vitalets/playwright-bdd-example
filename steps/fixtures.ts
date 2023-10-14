import { test as base } from 'playwright-bdd';
import { TodoPage } from './TodoPage';
import { ModelBuildModal, ModelCenter, ModelCompare } from './Modals';

export const test = base.extend<{ 
  todoPage: TodoPage, 
  browserSpecificTest: void, 
  modelBuildModal: ModelBuildModal,
  modelCenter: ModelCenter,
  modelCompare: ModelCompare,
}>({
  todoPage: async ({ page }, use) => use(new TodoPage(page)),
  modelBuildModal: async ({}, use) => use(new ModelBuildModal()),
  modelCenter: async ({}, use) => use(new ModelCenter()),
  modelCompare: async ({}, use) => use(new ModelCompare()),
  browserSpecificTest: [async ({ $tags }, use, testInfo) => {
    if ($tags.includes('@firefox') && testInfo.project.name !== 'firefox') {
      testInfo.skip();
    }
    await use();
  }, { auto: true }],
});
