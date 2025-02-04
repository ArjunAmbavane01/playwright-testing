import { test, expect } from '@playwright/test';

test('should manual login successfully', async ({ page }) => {
  await page.goto('https://staging.tracer.byteswrite.com/login');

  await page.locator('input[name="username"]').fill('E2401010004');
  await page.locator('input[name="password"]').fill('Test@123');
  
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/.*dashboard/);
  await expect(page.locator('text=Arjun!')).toBeVisible({ timeout: 5000 });
});