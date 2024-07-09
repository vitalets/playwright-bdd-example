import {test} from '../../support/fixtures/fixtures';
import { createBdd } from 'playwright-bdd';
import fs from 'fs';
import path from 'path';


const { Given, When, Then } = createBdd(test);

interface ICredentials {
    username: string;
    password: string;
}

//Not used anymore
Given('I logged in with {string} credentials', async ({ browser, loginPage, homePage, auth }, authFile: string) => {
    const credential = require(`../../support/credentials/${authFile}.json`) as ICredentials; // load credentials from file

    auth.userName = authFile //storing the name of the user to make it available for other Steps
    const filePath = path.resolve(__dirname, `../../playwright/.auth/${authFile}.json`);
    // if (fs.existsSync(`${filePath}`)) { //If not already authenticated
    // //    console.log('Storage state file exists. Loading state from it.');
    // //    const storedState = JSON.parse(fs.readFileSync(`${filePath}`, 'utf-8'));
    // //    auth.context = await page.context(); // Initialize auth.context
    // //    await auth.context.storageState(storedState);
    // //    //await homePage.openHomePage();
    //     //const location = `../../playwright/.auth/${authFile}.json` // /user.json';
    //     //const storedState = require(location);
    //     //auth.context = await browser.newContext( { storageState: storedState } );
    //     const storedState = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    //     auth.context = await browser.newContext( { storageState: storedState } );
// 
    //     //await homePage.page.context().storageState(storedState);
    //     //await homePage.openHomePage();
  // 
    // } else {
        console.log('Storage state file does not exist. Proceeding with login.');
        await loginPage.openLoginPage();
        await loginPage.enterUser(credential.username);
        await loginPage.enterPassword(credential.password);
        await loginPage.clickOnSignIn();
        await homePage.assertOpened()//assert login finished
        // Save the storage state to a file
        const storageState = await homePage.page.context().storageState()  //auth.context.storageState();
       // auth.context = await homePage.page.context();
        fs.writeFileSync(filePath, JSON.stringify(storageState));
        console.log(`Storage state saved to ${filePath}.`);
   // }
});

Then('I see I am on the home page',async ({homePage}) => {
    await homePage.assertOpened();
})

When('I go to home page', async ({homePage, auth}) => {
    const authFile = path.resolve(__dirname, `../../playwright/.auth/${auth.userName}.json`);
    const storedState = JSON.parse(fs.readFileSync(authFile, 'utf-8'));  // require(authFile);
    homePage.page = await auth.context.newPage();// How do I pass the retrieved storage state to the active page?
    await homePage.openHomePage();
})
