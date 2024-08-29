import {APIRequestContext} from "playwright-core";
import {expect, Page} from "@playwright/test";

const apiUrl = 'https://thinking-tester-contact-list.herokuapp.com/contacts'

export class ContactsApi {

    constructor(private request: APIRequestContext) {

    }

    async getAll(token): Promise<[object]> {
        let url = apiUrl,
            headers = {
                'Authorization': token,
            };
        const response = await this.request.get(url, {
            headers: headers,
        });

        console.log(await response.status(), ":", await response.statusText())

        return JSON.parse(await response.text())
    }

    async add(token): Promise<void> {
        let url = apiUrl,
            headers = {
                'Authorization': token,
            },
            data = {
                "firstName": "John",
                "lastName": "Doe",
                "birthdate": "1970-01-01",
                "email": "jdoe@fake.com",
                "phone": "8005555555",
                "street1": "1 Main St.",
                "street2": "Apartment A",
                "city": "Anytown",
                "stateProvince": "KS",
                "postalCode": "12345",
                "country": "USA"
            };
        const response = await this.request.post(url, {
            data: data,
            headers: headers,
        });

        console.log(await response.status(), ":", await response.statusText())
    }

    async delete(token): Promise<void> {
        let url = apiUrl,
            headers = {
                'Authorization': token,
            };
        const response = await this.request.delete(url, {
            headers: headers,
        });

        console.log(await response.status(), ":", await response.statusText())
    }

    async update(token, info): Promise<void> {
        let url = apiUrl,
            headers = {
                'Authorization': token,
            },
            data = info;
        const response = await this.request.patch(url, {
            headers: headers,
            data: data
        });

        console.log(await response.status(), ":", await response.statusText())

        return JSON.parse(await response.text())
    }


}
