import {APIRequestContext} from "playwright-core";
import {expect, Page} from "@playwright/test";

export class UserApi {
    token: string;

    constructor(private request: APIRequestContext) {

    }

    async getToken(user): Promise<void> {
        const response = await this.request.post('https://thinking-tester-contact-list.herokuapp.com/users/login', {
            data: {
                "email": user.email,
                "password": user.password
            }});
        expect(response.ok(), 'getToken api call is failed.').toBeTruthy();

        this.token = 'Bearer ' + JSON.parse(await response.text()).token
    }
}
