import { createBdd } from 'playwright-bdd';

const { BeforeAll, AfterAll } = createBdd();

BeforeAll(async function ({ browser }) {
  try {
    const page = await browser.newPage();
    console.log("page", Boolean(page));
  } catch (error) {
    console.log("error", error);
  }}
);

BeforeAll(async function ({ playwright }) {
  try {
    const browser = await playwright.chromium.launch();
    console.log("browser", Boolean(browser));
  } catch (error) {
    console.log("error", error);
  }}
);