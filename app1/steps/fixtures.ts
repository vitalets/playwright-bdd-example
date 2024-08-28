import { test as base, createBdd } from "playwright-bdd";

export const test = base.extend<{ myFixture: string }>({
  myFixture: async ({}, use) => use("my custom fixture"),
});

export const { Given, When, Then } = createBdd(test);
