const { test, expect } = require('@playwright/test');

test('Check the title of the homepage', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example Domain/);
 
});

test('Check that the heading exists', async ({ page }) => {
    await page.goto('https://example.com');
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Example Domain');
});
