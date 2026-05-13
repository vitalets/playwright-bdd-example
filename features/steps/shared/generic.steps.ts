import { Given, Then, When } from '../fixtures';
import { sleep } from '../../../src/utils/common';

Then(/^I wait "([^"]*)"$/, async ({}, seconds: string) => {
  await sleep(Number(seconds) * 1000);
});

Then(/^I wait for "([^"]*)" to become invisible$/, async ({ device }, key: string) => {
  await device.waitForInvisible(key);
});

Then(/^I see text "([^"]*)"$/, async ({ device }, text: string) => {
  await device.see(text);
});

Then(/^I do not see text "([^"]*)"$/, async ({ device }, text: string) => {
  await device.dontSee(text);
});

Then(/^I see element "([^"]*)"$/, async ({ device }, key: string) => {
  await device.seeElement(key);
});

Then(/^I do not see element "([^"]*)"$/, async ({ device }, key: string) => {
  await device.dontSeeElement(key);
});

Then(/^I verify text "([^"]*)"$/, async ({ device }, text: string) => {
  await device.seeElement('Common.TextView', text);
});

Then(/^I verify the text "([^"]*)" is displayed$/, async ({ device }, text: string) => {
  await device.waitForText(text, 'Common.TextViewContains', text);
  await device.see(text);
});

Then(/^I verify text contains "([^"]*)"$/, async ({ device }, text: string) => {
  await device.seeElement('Common.TextViewContains', text);
});

Then(
  /^I verify element "([^"]*)" with text "([^"]*)" is displayed$/,
  async ({ device }, key: string, text: string) => {
    await device.seeElement(key, text);
  },
);

Then(/^I tap on "([^"]*)"$/, async ({ device, airtimePage }, target: string) => {
  if (target.includes('.')) {
    await device.tap(target);
    return;
  }
  // Best-effort: dismiss any tooltip blocking the tap on newer app versions.
  await airtimePage.dismissToolTip();
  await device.tap('Common.TextView', target);
});

Then(/^I tap on "([^"]*)" with text "([^"]*)"$/, async ({ device }, key: string, text: string) => {
  await device.tap(key, text);
});

Then(/^I tap on "([^"]*)" from home screen$/, async ({ device, airtimePage }, button: string) => {
  await airtimePage.dismissToolTip();
  await device.tap(button);
});

Then(/^I tap on option "([^"]*)"$/, async ({ device }, name: string) => {
  await device.tap('Common.MenuItemName', name);
});

Then(/^I tap on coordinates x:"([^"]*)" and y:"([^"]*)"$/, async ({ device }, x: string, y: string) => {
  await device.tapCoordinates(Number(x), Number(y));
});

Then(/^I tap the native back button$/, async ({ device }) => {
  await device.back();
});

Then(/^I go back to the previous screen$/, async ({ device }) => {
  await device.tap('Common.BackBtn');
});

Then(/^I hide keyboard$/, async ({ device }) => {
  await device.hideKeyboard();
});

Then(/^I terminate the app$/, async ({ device }) => {
  await device.terminateApp();
});

When(/^I launch the app$/, async ({ device }) => {
  await device.launchApp();
});

Then(/^I scroll and view "([^"]*)"$/, async ({ device }, key: string) => {
  await device.scrollIntoView(key);
});

Then(/^I swipe up to the text "([^"]*)"$/, async ({ device }, text: string) => {
  await device.swipeUpUntilVisible('Common.TextViewContains', text);
});

Then(/^I change network settings "([^"]*)"$/, async ({ loginPage, device }, state: string) => {
  await loginPage.changeNetworkSettings(state as Parameters<typeof loginPage.changeNetworkSettings>[0]);
  await device.wait(5);
});

Then(
  /^I get text from the screen for "([^"]*)" and store it in "([^"]*)"$/,
  async ({ device, testData }, key: string, field: string) => {
    const txt = await device.grabText(key);
    testData.setField(field, txt);
  },
);

Then(
  /^I grab text from "([^"]*)" and store in "([^"]*)"$/,
  async ({ device, testData }, key: string, field: string) => {
    const txt = await device.grabText(key);
    testData.setField(field, txt);
  },
);

Then(
  /^I verify "([^"]*)" and "([^"]*)" are equal$/,
  async ({ testData }, a: string, b: string) => {
    const av = testData.getField(a);
    const bv = testData.getField(b);
    if (JSON.stringify(av) !== JSON.stringify(bv)) {
      throw new Error(`Expected "${a}" (${String(av)}) to equal "${b}" (${String(bv)})`);
    }
  },
);

Then(/^I dismiss the tooltip$/, async ({ airtimePage }) => {
  await airtimePage.dismissToolTip();
});

Then(/^I tap on allow permission$/, async ({ loginPage }) => {
  await loginPage.allowPermission();
});

Then(/^I tap on "([^"]*)" if available$/, async ({ device }, target: string) => {
  const count = await device.grabNumberOfVisibleElements('Common.TextView', target);
  if (count > 0) await device.tap('Common.TextView', target);
});

Given(/^I login to app using$/, async () => {
  // Phase-1 stub: device/app are bootstrapped via fixtures. The actual login
  // (device selection, app launch, language) is performed by the explicit
  // "When I launch the app and choose language" + "Then I enter Pin number"
  // steps that follow this in every scenario.
});

When(/^I launch the app and choose language "([^"]*)"$/, async ({ loginPage }, lang: string) => {
  await loginPage.launchApp();
  await loginPage.launchAppChooseLanguage(lang);
});

When(/^I launch the app again and choose language "([^"]*)"$/, async ({ loginPage }, lang: string) => {
  await loginPage.launchAppAgainChooseLanguage(lang);
});

Then(/^I enter Pin number "([^"]*)"$/, async ({ loginPage }, pin: string) => {
  await loginPage.enterPin(pin);
});

Then(/^I validate biometric screen$/, async ({ loginPage }) => {
  await loginPage.validateBiometricScreen();
});

Then(/^I validate wrong pin message displayed$/, async ({ loginPage }) => {
  await loginPage.validateWrongPinMessage();
});

Then(/^I see user is asked to enter pin$/, async ({ device }) => {
  await device.seeElement('Common.Pinpad_Label');
});

Then(/^the screen with title "([^"]*)" is displayed$/, async ({ device }, title: string) => {
  await device.wait(2);
  await device.seeTextEquals(title, 'Common.toolbarTitle', title);
});
