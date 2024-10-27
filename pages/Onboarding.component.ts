import {expect, Locator, Page} from "@playwright/test";

type Buttons = {
    next: Locator,
    save: Locator,
    done: Locator,
}

type Inputs = {
    bankName: Locator,
    routingNumber: Locator,
    accountNumber: Locator,
}

type Views = {
}

type Labels = {
    title: Locator,
}


export class OnboardingComponent {

    readonly buttons: Buttons
    readonly inputs: Inputs
    readonly views: Views
    readonly labels: Labels

    constructor(private page: Page) {

        this.buttons = {
            next: page.locator('[data-test="user-onboarding-next"]'),
            save: page.locator('[data-test="bankaccount-submit"]'),
            done: page.locator('[data-test="user-onboarding-next"]'),
        }

        this.inputs = {
            bankName: page.locator('[id="bankaccount-bankName-input"]'),
            routingNumber: page.locator('[id="bankaccount-routingNumber-input"]'),
            accountNumber: page.locator('[id="bankaccount-accountNumber-input"]'),
        }

        this.views = {
        }

        this.labels = {
            title: page.locator('[data-test="user-onboarding-dialog-title"]'),

        }

    }


    async onboarding(info): Promise<void>{
        await this.buttons.next.click();
        await this.page.waitForTimeout(500);

        await this.inputs.bankName.fill(info.bankName);
        await this.inputs.routingNumber.fill(info.routingNumber);
        await this.inputs.accountNumber.fill(info.accountNumber);
        await this.buttons.save.click();
        await this.page.waitForTimeout(500);
        await this.buttons.done.click();
    }
}

