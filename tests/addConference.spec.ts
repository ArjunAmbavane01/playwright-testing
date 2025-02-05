import { test, expect } from '@playwright/test';

function getRandomString(length = 8) {
  return Math.random().toString(36).substring(2, 2 + length);
}

function getRandomNumber(digits) {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
}

test('should add new conference successfully', async ({ page }) => {

  const paperTitle = `Paper-${getRandomString()}`;
  const conferenceTitle = `Conference-${getRandomString()}`;
  const pISBN = `${getRandomNumber(4)}-${getRandomNumber(4)}`
  const conferenceURL = `https://test${getRandomString(4)}.com`;

  await page.goto('https://staging.tracer.byteswrite.com/login');

  await page.locator('input[name="username"]').fill('E2401010004');
  await page.locator('input[name="password"]').fill('Test@123');
  
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/.*dashboard/);
  await expect(page.locator('text=Arjun!')).toBeVisible({ timeout: 5000 });

  await page.locator('a[href="/user/publications"]').click();
  await expect(page).toHaveURL(/.*publications/);
  await page.getByRole('link', { name: 'Conference Papers' }).click();
  await expect(page).toHaveURL(/.*conferences/);
  await page.getByRole('link').filter({ hasText: /^$/ }).nth(2).click();
  await expect(page).toHaveURL(/.*add/);

  // Fill Conference Add Form
  await page.locator('input[name="paperTitle"]').fill(paperTitle);
  await page.locator('input[name="conferenceName"]').fill(conferenceTitle);

  await page.getByRole("combobox").filter({ hasText: "Enter Conference type" }).click();
  await page.locator("div").filter({ hasText: /^National$/ }).first().click();
  
  await page.getByRole("combobox").filter({ hasText: "Conference Indexed In?" }).click();
  await page.locator("div").filter({ hasText: /^ProQuest$/ }).first().click();

  await page.getByRole('combobox').filter({ hasText: 'Select Author Type' }).click();
  await page.getByRole('option', { name: 'Organizational Researcher' }).click();

  await page.getByRole('combobox').filter({ hasText: 'Select Author Name' }).click();
  await page.locator('div').filter({ hasText: /^Arjun Sachin AmbavaneE2401010004$/ }).first().click();

  await page.getByRole('combobox').filter({ hasText: 'Enter tags' }).click();
  await page.locator('div').filter({ hasText: /^5G Networks$/ }).first().click();

  await page.locator('input[name="pISBN"]').fill(pISBN);

  await page.getByRole('combobox').filter({ hasText: 'Enter category' }).click();
  await page.getByRole('option', { name: 'Submitted' }).click();

  await page.getByRole('button', { name: 'Select submitted date' }).click();
  await page.getByRole('button', { name: 'Tuesday, February 4th,' }).click();

  await page.locator('input[name="conferenceURL"]').fill(conferenceURL);
  
  await page.getByRole('combobox').filter({ hasText: 'Select Affiliation Details' }).click();
  await page.locator('div').filter({ hasText: /^Aspire Organization, Pune$/ }).first().click();
  
  await page.getByRole('button', { name: 'Submit Details' }).click();

  await expect(page).toHaveURL(/.*conferences/);

  await page.getByText(paperTitle, { exact: true }).click();

});