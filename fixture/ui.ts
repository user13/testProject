import {expect, Locator, test as base} from '@playwright/test';

import {GeneralPage} from "../pages/General.page";


type Options = {

}

type Fixtures = {
    generalPage: GeneralPage,
}


export const test = base.extend<Options & Fixtures>({

    page: async ({ baseURL, page, request, context, }, use,  testInfo) => {
        const
            generalPage = new GeneralPage(page);

        await page.goto(baseURL)
        await page.waitForLoadState()

        await use(page);
    },

    generalPage: async ({ page}, use) => await use(new GeneralPage(page)),

});
