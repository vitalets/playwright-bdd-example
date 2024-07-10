import {test} from '../../support/fixtures/fixtures';
import { createBdd } from 'playwright-bdd';
import fs from 'fs';
import path from 'path';
import * as Pages from '../../support/fixtures/pages';


const { Given, When, Then } = createBdd(test);

Then('I see I am on the home page',async ({ pages }) => {
    await pages.homePage.assertAuthorized();
})

When('I go to home page', async ({ pages }) => {
    await pages.homePage.openHomePage();
})