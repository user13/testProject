import { test } from '../fixture/api'
import {expect} from "@playwright/test";


test.use({user: {email: 'ololoEmail@gmail.com', password: 'ololoPassword'}})

test('Create api call', {tag: ['@api'],},  async ({ request, userApi, contactsApi  }) => {
  let countBefore = (await contactsApi.getAll(userApi.token)).length
  await contactsApi.add(userApi.token)
  let countAfter = (await contactsApi.getAll(userApi.token)).length

  expect(countAfter-countBefore, 'Contacts is not created.').toEqual(1)
});


test.skip('Delete api call', {tag: ['@api'],},  async ({ request, userApi, contactsApi  }) => {
  console.log('userApi.token', userApi.token)

  let countBefore = (await contactsApi.getAll(userApi.token)).length
  await contactsApi.delete(userApi.token)
  let countAfter = (await contactsApi.getAll(userApi.token)).length

  expect(countBefore-countAfter, 'Contacts is not deleted.').toEqual(1)
});


test.skip('Update api call', {tag: ['@api'],},  async ({ request, userApi, contactsApi  }) => {
  console.log('userApi.token', userApi.token)
  const newUserInfo = {"firstName": "Ann"}

  let updatedContact = await contactsApi.update(userApi.token, newUserInfo)

  expect(updatedContact.firstName, 'Contacts is not updated.').toEqual(newUserInfo.firstName)
});