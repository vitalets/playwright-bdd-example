import {test} from '../../support/fixtures/fixtures';
import { createBdd } from 'playwright-bdd';
import fs from 'fs';
import path from 'path';
import * as Pages from '../../support/fixtures/pages';


const { Given, When, Then } = createBdd(test);

When('I go to About section',async ({ pages }) => {
    await pages.aboutPage.open();
    await pages.aboutPage.assertAuthorized();
})
