import { test, expect } from '@playwright/test';
import {
  ButtonPage, CheckboxPage, HomePage, InputPage, SelectPage, TextAreaPage,
} from './qa-practice.pages.js';

test.describe('QA Practice homepage', () => {
  test('loads the welcome content', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();

    await expect(page).toHaveTitle(/Home Page.*QA Practice/i);
    await expect(home.heading()).toBeVisible();
    await expect(page.locator('body')).toContainText('This site is designed to gain practical skills in testing');
  });

  test('shows the homepage quick-start links', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();

    for (const module of [
      'Text input', 'Simple button', 'Single checkbox', 'Text area', 'Select input',
    ]) {
      await expect(home.quickStartLink(module)).toBeVisible();
    }
  });

  test('quick start: Text input accepts and submits text', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await home.quickStartLink('Text input').click();

    const input = new InputPage(page);
    await input.submit('playwright_user');
    await expect(page.locator('body')).toContainText('playwright_user');
  });

  test('quick start: Simple button can be clicked', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await home.quickStartLink('Simple button').click();

    const button = new ButtonPage(page);
    await button.click();
    await expect(page.locator('body')).toContainText(/submitted|clicked|success/i);
  });

  test('quick start: Single checkbox can be selected and submitted', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await home.quickStartLink('Single checkbox').click();

    const checkbox = new CheckboxPage(page);
    await checkbox.select('Select me or not');
    await checkbox.submit();
    await expect(page.locator('body')).toContainText('select me or not');
  });

  test('quick start: Text area accepts and submits text', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await home.quickStartLink('Text area').last().click();

    const textArea = new TextAreaPage(page);
    await textArea.enter('Testing text area with Playwright');
    await textArea.submit();
    await expect(page.locator('body')).toContainText('Testing text area with Playwright');
  });

  test('quick start: Select input chooses and submits an option', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await home.quickStartLink('Select input').click();

    const select = new SelectPage(page);
    await select.choose('Python');
    await select.submit();
    await expect(page.locator('body')).toContainText('Python');
  });
});

