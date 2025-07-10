import { test, expect, Page } from '@playwright/test';

test.describe.configure({ mode: 'serial' });


test.describe('5e Main Page', () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('http://localhost:5174/login');
    await page.getByTestId('username').fill('dev');
    await page.getByTestId('password').fill('123');
    await page.getByTestId('submit-btn').click();
    await page.waitForSelector('.user-box');
    await page.goto('http://localhost:5174/characters/1?ruleset=5e');
  });

  test.describe('Header', () => {
    test('TODO', async () => {
      
    });
  });
});
