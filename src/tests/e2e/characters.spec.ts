import { test, expect, Page } from '@playwright/test';

test.describe.configure({ mode: 'serial' });


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
    await expect(page.getByTestId('name').first()).toHaveText('Steve Lvl 1');
  });

  test('Create new character', async () => {
    await page.getByTestId('new-btn').click();
    await page.getByTestId('name').fill('Dombip');
    await page.getByTestId('submit-btn').click();
    await expect(page.getByTestId('name').first()).toHaveText('Dombip Lvl 1');
    await expect(page.getByTestId('ruleset').first()).toHaveText('5e');
  });

  test('Delete character', async () => {
    page.on('dialog', (dialog) => dialog.accept());
    const name = await page.getByTestId('name').first().textContent();
    await page.getByTestId('delete-btn').first().click();
    await expect(page.getByTestId('name').first()).not.toHaveText(`${name} Lvl 1`);
  });
});
