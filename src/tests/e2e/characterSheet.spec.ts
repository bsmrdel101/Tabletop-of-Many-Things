import { test, expect, Page } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
let page: Page;


test.describe('5e', () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('http://localhost:5174/login');
    await page.getByTestId('username').fill('dev');
    await page.getByTestId('password').fill('123');
    await page.getByTestId('submit-btn').click();
    await page.waitForSelector('.user-box');
    await page.goto('http://localhost:5174/characters/1?ruleset=5e');
  });

  test.describe('Health management', () => {
    test('Damage player', async () => {
      await page.getByTestId('hp-management-input').fill('5');
      await page.getByTestId('dmg-btn').click();
      await expect(page.getByTestId('hp')).toHaveText('19 / 20');
      await page.getByTestId('dmg-btn').click();
      await expect(page.getByTestId('hp')).toHaveText('14 / 20');
    });

    test('Heal player', async () => {
      await page.getByTestId('hp-management-input').fill('50');
      await page.getByTestId('heal-btn').click();
      await expect(page.getByTestId('hp')).toHaveText('20 / 20');
    });

    test('Add temp hp', async () => {
      await page.getByTestId('hp-management-input').fill('5');
      await page.getByTestId('temp-hp-btn').click();
      await expect(page.getByTestId('temp-hp')).toHaveText('+5');
    });
  });
});
