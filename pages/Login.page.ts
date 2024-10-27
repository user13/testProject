import {expect, Locator, Page} from "@playwright/test";


type Buttons = {
    submit: Locator,
    logout: Locator,
    remember: Locator,
    signup: Locator,
}

type Inputs = {
    username: Locator,
    password: Locator,
}

type Views = {
}

type Labels = {
    errorTip: Locator,
}


export class LoginPage {

    readonly buttons: Buttons
    readonly inputs: Inputs
    readonly views: Views
    readonly labels: Labels

    constructor(private page: Page) {


        this.buttons = {
            submit: page.locator('button[type="submit"]'),
            logout: page.locator('[data-test="sidenav-signout"]'),
            remember: page.locator('.PrivateSwitchBase-input'),
            signup: page.locator('[data-test="signup"]'),
        }

        this.inputs = {
            username: page.locator('[id="username"]'),
            password: page.locator('[id="password"]'),
        }

        this.views = {
        }

        this.labels = {
            errorTip: page.locator('[id="error"]'),
        }

    }


    async login(user, remember: boolean = false): Promise<void>{
        await this.inputs.username.fill(user.username)
        await this.inputs.password.fill(user.password)

        if(remember)
            await this.buttons.remember.click()

        await Promise.all([
            this.page.waitForResponse(resp => resp.status() === 200),
            this.buttons.submit.click(),
        ])

        await this.page.waitForTimeout(500);
    }


    async logout(): Promise<void>{
        await this.buttons.logout.click(),
        await this.page.waitForTimeout(500);
    }


    async signup(): Promise<void>{
        // some strange behaviour with sign up link. Workaround.
        await this.buttons.signup.click();
        await this.buttons.signup.click();
    }
}

