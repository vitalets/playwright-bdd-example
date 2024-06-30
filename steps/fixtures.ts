import { test as base } from 'playwright-bdd';
import { MyFixture} from "./my-fixture";

export const test = base.extend<{ myFixture: MyFixture}>({
  myFixture: async ({ page }, use) => await use(new MyFixture(page)),
});