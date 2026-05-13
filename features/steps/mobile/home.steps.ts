import { DataTable } from 'playwright-bdd';
import { Then } from '../fixtures';

Then(/^I tap on "([^"]*)" at bottom bar$/, async ({ homePage }, menu: string) => {
  await homePage.navigateTo(menu);
});

Then(/^I verify the following cards are displayed$/, async ({ homePage }, table: DataTable) => {
  await homePage.verifyCards(table.hashes() as { Cards: string }[]);
});

Then(/^I verify the following bundles are displayed$/, async ({ homePage }, table: DataTable) => {
  await homePage.verifyBundles(table.hashes() as { Cards: string }[]);
});

Then(/^I verify the bottom navigation are displayed$/, async ({ homePage }, table: DataTable) => {
  await homePage.verifyBottomNavigation(table.hashes() as { Navigation: string }[]);
});

Then(/^the balance is "([^"]*)"$/, async ({ homePage }, state: string) => {
  await homePage.verifyBalanceHiddenOrNot(state);
});

Then(/^I swipe balance to "([^"]*)"$/, async ({ homePage }, side: string) => {
  await homePage.swipeBalance(side);
});

Then(/^I tap the toggle button on balance$/, async ({ homePage }) => {
  await homePage.tapOnBalanceToggleBtn();
});

Then(/^I enter an amount more than account balance$/, async ({ homePage }) => {
  await homePage.enterAmountMoreThanAccountBalance();
});

Then(/^I grab account balance$/, async ({ airtimePage, homePage }) => {
  await airtimePage.dismissToolTip();
  await homePage.tapOnBalanceToggleBtn();
  await homePage.grabAccountBalance();
});

Then(/^I verify text "([^"]*)" on balance$/, async ({ homePage }, text: string) => {
  await homePage.verifyBalanceText(text);
});

Then(/^I verify dashboard is displayed with username$/, async ({ device, homePage }) => {
  for (const key of ['Common.appRatingClose', 'Common.notNowThanks']) {
    if ((await device.grabNumberOfVisibleElements(key)) > 0) {
      await device.tap(key);
    }
  }
  await homePage.verifyUserNameDisplayed();
});

Then(/^I swipe discover card$/, async ({ homePage }) => {
  await homePage.swipeDiscoverCard();
});

Then(/^I swipe Statements$/, async ({ homePage }) => {
  await homePage.swipeStatements();
});

Then(/^I tap on user avatar icon$/, async ({ homePage }) => {
  await homePage.clickOnUserAvatarIcon();
});

Then(/^I tap on add or edit user picture$/, async ({ homePage }) => {
  await homePage.tapOnAddOrEditPicture();
});

Then(/^I close all discover cards$/, async ({ homePage }) => {
  await homePage.closeAllDiscoverItem();
});

Then(/^I close first discover card "([^"]*)"$/, async ({ homePage }, card: string) => {
  await homePage.closeDiscoverItem(card);
});

Then(/^I scroll down to services$/, async ({ homePage }) => {
  await homePage.scrollToServices();
});

Then(
  /^I verify services are displayed maximum of "([^"]*)"$/,
  async ({ homePage }, limit: string) => {
    await homePage.verifyServicesLimit(limit);
  },
);

Then(/^I validate home screen$/, async ({ homePage }) => {
  await homePage.validateHomeScreen();
});

Then(/^I tap on last quick action$/, async ({ homePage }) => {
  await homePage.tapOnLastQuickAction();
});

Then(/^I verify "([^"]*)" menu is highlighted and bold$/, async ({ homePage }, menu: string) => {
  await homePage.validateMenuIsBold(menu);
});

Then(/^I tap on home at bottom bar$/, async ({ device }) => {
  await device.tapCoordinates(95, 1449);
});

Then(/^I see if element "([^"]*)" is present$/, async ({ device }, key: string) => {
  const count = await device.grabNumberOfVisibleElements(key);
  if (count === 0) throw new Error(`Element ${key} not present`);
});

Then(/^I see if discover card "([^"]*)" is present$/, async ({ device, testData }, text: string) => {
  const expected = testData.identifyData(text);
  let visible = false;
  for (let i = 0; i < 5 && !visible; i += 1) {
    const title = await device.grabText('Common.discoverCardTitle');
    if (title === expected) {
      visible = true;
    } else {
      await device.tap('Common.closeDiscoverCard');
    }
  }
  if (!visible) throw new Error(`Discover card "${expected}" not present`);
});

Then(/^I verify that "([^"]*)" button is "([^"]*)"$/, async ({ device }, key: string, state: string) => {
  const enabled = await device.grabAttribute(key, 'enabled');
  const expected = state === 'enable' ? 'true' : 'false';
  if (enabled !== expected) {
    throw new Error(`Expected ${key} to be ${state} (${expected}), got ${enabled}`);
  }
});

Then(/^I search for service "([^"]*)"$/, async ({ device }, service: string) => {
  await device.tap('Common.SearchIcon');
  await device.fill('Common.SearchEditField', service);
});

Then(/^I choose the first service "([^"]*)" from the search$/, async ({ device }, service: string) => {
  await device.tap('Common.TextView', service);
});

Then(/^I tap on take a photo$/, async ({ device }) => {
  await device.tap(
    "//android.widget.TextView[@text='Look at the camera and place your face in the circle']//following-sibling::android.view.View[1]",
  );
});
