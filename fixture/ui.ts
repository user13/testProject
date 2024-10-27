import {expect, Locator, test as base} from '@playwright/test';

import { RegistrationPage } from '../pages/Registration.page';
import { OnboardingComponent } from '../pages/Onboarding.component';
import { LoginPage } from '../pages/LogIn.page';


type Options = {

}

type Fixtures = {
    loginPage: LoginPage,
    registrationPage: RegistrationPage,
    onboardingComponent: OnboardingComponent,
}


export const test = base.extend<Options & Fixtures>({

    page: async ({ baseURL, page, request, context, }, use,  testInfo) => {
        const
            generalPage = new LoginPage(page);

        await page.goto(baseURL)
        await page.waitForLoadState()

        await use(page);
    },

    loginPage: async ({ page}, use) => await use(new LoginPage(page)),
    registrationPage: async ({ page}, use) => await use(new RegistrationPage(page)),
    onboardingComponent: async ({ page}, use) => await use(new OnboardingComponent(page)),

});
