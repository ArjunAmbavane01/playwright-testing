import { test, expect } from '@playwright/test';

function getRandomString(length = 8) {
  return Math.random().toString(36).substring(2, 2 + length);
}

function getRandomNumber(digits) {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
}

test('should add new book successfully', async ({ page }) => {

  const bookTitle = `bookTitle-${getRandomString()}`;
  const eISBN = `${getRandomNumber(4)}-${getRandomNumber(4)}`
  const bookURL = `https://test${getRandomString(4)}.com`;

  await page.goto('https://staging.tracer.byteswrite.com/login');

  await page.locator('input[name="username"]').fill('E2401010004');
  await page.locator('input[name="password"]').fill('Test@123');
  
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/.*dashboard/);
  await expect(page.locator('text=Arjun!')).toBeVisible({ timeout: 5000 });

  await page.locator('a[href="/user/publications"]').click();
  await expect(page).toHaveURL(/.*publications/);
  await page.getByRole('link', { name: 'Book Chapters' }).click();
  await expect(page).toHaveURL(/.*books/);
  await page.getByRole('link').filter({ hasText: /^$/ }).nth(2).click();
  await expect(page).toHaveURL(/.*add/);

  // Fill Book Chapter Add Form
  await page.locator('input[name="bookTitle"]').fill(bookTitle);

  await page.locator('input[name="eISBN"]').fill(eISBN);
  
  await page.getByRole("combobox").filter({ hasText: "Enter publisher name" }).click();
  await page.locator("div").filter({ hasText: /^Elsevier$/ }).first().click();

  await page.locator('input[name="editorName"]').fill('test-editor');

  await page.getByRole('combobox').filter({ hasText: 'Select Author Type' }).click();
  await page.getByRole('option', { name: 'Organizational Researcher' }).click();

  await page.getByRole('combobox').filter({ hasText: 'Select Author Name' }).click();
  await page.locator('div').filter({ hasText: /^Arjun Sachin AmbavaneE2401010004$/ }).first().click();

  await page.getByRole('combobox').filter({ hasText: 'Enter tags' }).click();
  await page.locator('div').filter({ hasText: /^5G Networks$/ }).first().click();

  await page.getByRole('button', { name: 'Select published date' }).click();
  await page.getByRole('button', { name: 'Tuesday, February 4th,' }).click();

  await page.getByRole('combobox').filter({ hasText: 'Select Country' }).click();
  await page.getByRole('option', { name: 'India' }).click();
  
  await page.getByRole('combobox').filter({ hasText: 'Select State' }).click();
  await page.getByRole('option', { name: 'Maharashtra' }).click();
  
  await page.getByRole('combobox').filter({ hasText: 'Select City' }).click();
  await page.getByRole('option', { name: 'Pune' }).click();
  
  await page.getByRole("combobox").filter({ hasText: "Is Copyright Registered" }).click();
  await page.locator("div").filter({ hasText: /^No$/ }).first().click();

  await page.locator('input[name="bookURL"]').fill(bookURL);

  await page.getByRole('combobox').filter({ hasText: 'Select Affiliation Details' }).click();
  await page.locator('div').filter({ hasText: /^Aspire Organization, Pune$/ }).first().click();

  await page.getByRole('button', { name: 'Submit Details' }).click();
  
  await expect(page).toHaveURL(/.*books/);

  await page.getByText(bookTitle, { exact: true }).click();
  
});