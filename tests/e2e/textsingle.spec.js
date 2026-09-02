import { test, expect } from '@playwright/test';
import { textAreaData } from '../data/textarea.data.js';

test('Submit single text area', async ({ page }) => {
  await page.goto('https://www.qa-practice.com/elements/textarea/single');

  await page.getByLabel('Text area').fill(textAreaData.single);
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.locator('#result-text')).toHaveText(textAreaData.single);
});

test('Submit multiple text areas', async ({ page }) => {
  await page.goto('https://www.qa-practice.com/elements/textarea/textareas');

  await page.getByLabel('First chapter').fill(textAreaData.multiple.firstChapter);
  await page.getByLabel('Second chapter').fill(textAreaData.multiple.secondChapter);
  await page.getByLabel('Third chapter').fill(textAreaData.multiple.thirdChapter);

  await page.getByRole('button', { name: 'Submit' }).click();
});
