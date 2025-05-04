import { test, expect, Page } from '@playwright/test';


test.describe('Characters List', () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('http://localhost:5174/login');
    await page.getByTestId('username').fill('dev');
    await page.getByTestId('password').fill('123');
    await page.getByTestId('submit-btn').click();
    await page.waitForSelector('.user-box');
  });

  test('Load characters', async () => {
    await page.goto('http://localhost:5174/characters');
    await expect(page.getByTestId('character-name').first()).toHaveText('Steve');
  });

  test('Create new character', async () => {

  });

  test('Delete character', async () => {

  });
});
