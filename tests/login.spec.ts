import { test, expect } from '@playwright/test';

test('should login successfully', async ({ page }) => {
  await page.goto('https://staging.tracer.byteswrite.com/login');

  // Type the username and password with a delay to simulate typing
  await page.locator('input[name="username"]').focus();
  await page.keyboard.type('E2401010004');   

  await page.locator('input[name="password"]').focus();
  await page.keyboard.type('Test@123');  

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/.*dashboard/);
  await expect(page.locator('text=Arjun!')).toBeVisible({ timeout: 5000 });
});
