import { test } from '../fixture/ui'
import { expect } from '@playwright/test';
import { randomUUID } from 'crypto';
import { Random } from "random-js";
const users = require('../data/database.json').users;


test('should redirect unauthenticated user to signin page', {tag: ['@ui']}, async ({ page, loginPage }) => {
  await page.goto('/personal');

  await page.waitForLoadState('networkidle')
  await expect(page.url()).toContain('/signin')
});

test('should redirect to the home page after login', {tag: ['@ui']}, async ({ page, loginPage, baseURL }) => {
  const user = users[0];
  await loginPage.login(user)
  await expect(page.url()).toEqual(baseURL)
});

test('should remember a user for 30 days after login', {tag: ['@ui']}, async ({ page, loginPage, baseURL }) => {
  const user = users[0];
  await loginPage.login(user, true)

  const cookie = (await page.context().cookies()).filter(el => el.name == 'connect.sid')[0];
  expect(cookie.expires).not.toEqual(-1)

  await loginPage.logout()
  await expect(page.url()).toContain('/signin')
});

test('should allow a visitor to sign-up, login, and logout', {tag: ['@ui']}, async ({ page, loginPage, registrationPage, onboardingComponent, baseURL }) => {
  const userInfo = {
    firstName: "Bob",
    lastName: "Ross",
    username: "PainterJoy90" + randomUUID(),
    password: "s3cret",
  };
  const bankInfo = {
    bankName: "The Best Bank",
    routingNumber: "123456789",
    accountNumber: "987654321",
  };

  await loginPage.signup();
  await registrationPage.registration(userInfo);
  await loginPage.login(userInfo)

  // onbording 
  await page.waitForLoadState();
  await expect(onboardingComponent.labels.title).toHaveCount(1)
  await onboardingComponent.onboarding(bankInfo);

  await expect(page.locator('[role="rowgroup"]')).toHaveCount(1)

  await loginPage.logout()
  await expect(page.url()).toContain('/signin')
});






