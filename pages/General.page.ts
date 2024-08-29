import {expect, Locator, Page} from "@playwright/test";


type Buttons = {
    submit: Locator,
    logout: Locator,
}

type Inputs = {
    email: Locator,
    password: Locator,
}

type Views = {
}

type Labels = {
    errorTip: Locator,
}


export class GeneralPage {

    readonly buttons: Buttons
    readonly inputs: Inputs
    readonly views: Views
    readonly labels: Labels

    constructor(private page: Page) {


        this.buttons = {
            submit: page.locator('[id="submit"]'),
            logout: page.locator('[id="logout"]'),
        }

        this.inputs = {
            email: page.locator('[id="email"]'),
            password: page.locator('[id="password"]'),
        }

        this.views = {
        }

        this.labels = {
            errorTip: page.locator('[id="error"]'),
        }

    }


    async login(user: {email: string, password: string}): Promise<void>{
        await this.inputs.email.fill(user.email)
        await this.inputs.password.fill(user.password)

        await this.buttons.submit.click()
    }

}

