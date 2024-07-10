import {test} from '../../support/fixtures/fixtures';
import { createBdd } from 'playwright-bdd';
import fs from 'fs';
import path from 'path';
import * as Pages from '../../support/fixtures/pages';


const { Given, When, Then } = createBdd(test);

Given('I am at login page', async ({ pages }) => {
    await pages.loginPage.openLoginPage();
})