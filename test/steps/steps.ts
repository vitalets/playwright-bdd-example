import {test} from '../../support/fixtures/fixtures';
import { createBdd } from 'playwright-bdd';
import fs from 'fs';
import path from 'path';
import * as Pages from '../../support/fixtures/pages';


const { Given, When, Then } = createBdd(test);

interface ICredentials {
    username: string;
    password: string;
}

//Not used anymore
Given('I logged in with {string} credentials', async ({ browser, page, auth, pages }, authFile: string) => {
    const filePath = path.resolve(__dirname, `../../playwright/.auth/${authFile}.json`);

    if (!fs.existsSync(`${filePath}`)) { //If not already authenticated
      console.log('Storage state file does not exist. Proceeding with login.');
      const credential = require(`../../support/credentials/${authFile}.json`) as ICredentials; // load credentials from file
      const loginPage = new Pages.LoginPage(page);
      await loginPage.openLoginPage();
      await loginPage.enterUser(credential.username);
      await loginPage.enterPassword(credential.password);
      await loginPage.clickOnSignIn();
      await loginPage.assertLoginSuccess() //assert login finished
      // Save the storage state to a file
      await loginPage.page.context().storageState({ path: filePath })  //auth.context.storageState();
      console.log(`Storage state saved to ${filePath}.`);
    } else {
      console.log('Storage state file exists. Loading it into new context.');
    }

    auth.userName = authFile //storing the name of the user to make it available for other Steps
    auth.context = await browser.newContext( { storageState: filePath } );
    auth.page = await auth.context.newPage();
    pages.homePage = new Pages.HomePage(auth.page);

    //    console.log('Storage state file exists. Loading state from it.');
    //    const storedState = JSON.parse(fs.readFileSync(`${filePath}`, 'utf-8'));
    //    auth.context = await page.context(); // Initialize auth.context
    //    await auth.context.storageState(storedState);
    //    //await homePage.openHomePage();
        //const location = `../../playwright/.auth/${authFile}.json` // /user.json';
        //const storedState = require(location);
        //auth.context = await browser.newContext( { storageState: storedState } );
        // const storedState = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        // auth.context = await browser.newContext( { storageState: filePath } );

        //await homePage.page.context().storageState(storedState);
        //await homePage.openHomePage();
  
    // } else {

   // }
});

Then('I see I am on the home page',async ({ pages }) => {
    await pages.homePage.assertAuthorized();
})

When('I go to home page', async ({ pages }) => {
    await pages.homePage.openHomePage();
})
