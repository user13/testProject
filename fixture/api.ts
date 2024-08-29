import {expect, Locator, test as base} from '@playwright/test';

import {UserApi} from "../api/user.api";
import {ContactsApi} from "../api/contacts.api";


type Options = {
    user: { email: string; password: string },
}

type Fixtures = {
    userApi: UserApi,
    contactsApi: ContactsApi,
}


export const test = base.extend<Options & Fixtures>({

    user: [null, { option: true }],

    page: async ({ baseURL, page, request, context, }, use,  testInfo) => {

        await use(page);
    },

    contactsApi: async ({ request}, use) => await use(new ContactsApi(request)),
    userApi: async ({ request, user }, use) => {
        const userApi = new UserApi(request)
        await userApi.getToken(user)
        await use(userApi)
    },

});
