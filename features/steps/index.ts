import { expect } from "@playwright/test";
import { firefox } from '@playwright/test';
import {Given, When, Then } from "./fixtures";
import { createBdd } from "playwright-bdd";

const {BeforeAll} = createBdd();

let browser, page;

BeforeAll(async function () {
  try {
    // Explicitly launch Firefox
    browser = await firefox.launch({
      headless: false, // Set to false to see the browser
    });

    // Open a new page in the Firefox browser
    page = await browser.newPage();
    console.log("Firefox browser opened:", Boolean(page));
  } catch (error) {
    console.log("Error launching Firefox:", error);
  }
});

Given("I am on Playwright home page", async ({ page }) => {
  await page.goto("https://playwright.dev");
});

When("I click link {string}", async ({ page }, name: string) => {
  await page.getByRole("link", { name }).click();
});

Then("I see in title {string}", async ({ page }, text: string) => {
  await expect(page).toHaveTitle(new RegExp(text));
});
