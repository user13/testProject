import {expect, Locator, Page} from "@playwright/test";

type Buttons = {
    signup: Locator,
}

type Inputs = {
    firstName: Locator,
    lastName: Locator,
    username: Locator,
    password: Locator,
    confirmPassword: Locator,
}

type Views = {
}

type Labels = {
    errorTip: Locator,
}


export class RegistrationPage {

    readonly buttons: Buttons
    readonly inputs: Inputs
    readonly views: Views
    readonly labels: Labels

    constructor(private page: Page) {

        this.buttons = {
            signup: page.locator('[data-test="signup-submit"]'),
        }

        this.inputs = {
            firstName: page.locator('[id="firstName"]'),
            lastName: page.locator('[id="lastName"]'),
            username: page.locator('[id="username"]'),
            password: page.locator('[id="password"]'),
            confirmPassword: page.locator('[id="confirmPassword"]'),
        }

        this.views = {
        }

        this.labels = {
            errorTip: page.locator('[id="error"]'),
        }

    }


    async registration(user): Promise<void>{
        await this.inputs.firstName.fill(user.firstName)
        await this.inputs.lastName.fill(user.lastName)
        await this.inputs.username.fill(user.username)
        await this.inputs.password.fill(user.password)
        await this.inputs.confirmPassword.fill(user.password)
        await this.buttons.signup.click()

        await this.page.waitForTimeout(500);
    }
}

