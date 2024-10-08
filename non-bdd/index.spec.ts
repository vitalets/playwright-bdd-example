import { test } from "@playwright/test";

test("non bdd test", async ({}) => {
  throw new Error("Fail in non bdd test");
});
