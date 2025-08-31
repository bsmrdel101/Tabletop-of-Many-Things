import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5174/login');
  await page.getByTestId('username').fill('dev');
  await page.getByTestId('password').fill('123');
  await page.getByTestId('submit-btn').click();
  await page.waitForSelector('.user-box');
  await page.goto('http://localhost:5174/characters');
});


test.describe('Characters List', () => {
  test('Load characters', async ({ page }) => {
    await expect(page.getByTestId('name').first()).toHaveText('Steve Lvl 1');
  });

  test('Create new character', async ({ page }) => {
    await page.getByTestId('new-btn').click();
    await page.getByTestId('name').fill('Dombip');
    await page.getByTestId('submit-btn').click();
    await expect(page.getByTestId('name').first()).toHaveText('Dombip Lvl 1');
    await expect(page.getByTestId('ruleset').first()).toHaveText('5e');
  });

  test('Delete character', async ({ page }) => {
    page.on('dialog', (dialog) => dialog.accept());
    const name = await page.getByTestId('name').first().textContent();
    await page.getByTestId('delete-btn').first().click();
    await expect(page.getByTestId('name').first()).not.toHaveText(`${name} Lvl 1`);
  });
});
