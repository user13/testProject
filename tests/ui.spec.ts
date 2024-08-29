import { test } from '../fixture/ui'
import { expect } from '@playwright/test';

test('Positive: Login', {tag: ['@ui']}, async ({ page, generalPage }) => {
  const user = {
    email: 'ololoEmail@gmail.com',
    password: 'ololoPassword',
  }

  await generalPage.login(user)
  await expect(generalPage.buttons.logout, 'Log out button is not shown.').toHaveCount(1)

});

test('Negative: Login', {tag: ['@ui']},async ({ page, generalPage }) => {
  const user = {
    email: 'wrong',
    password: 'wrong',
  }

  await generalPage.login(user)
  await expect(generalPage.labels.errorTip, 'Log out button is not shown.').toHaveCount(1)

});
