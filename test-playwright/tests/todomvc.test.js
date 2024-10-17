const { test, expect } = require('@playwright/test');

test('Create todos and verify active items', async ({ page }) => {
    // Navigate to the To-Do MVC demo site
    await page.goto('https://demo.playwright.dev/todomvc');

    // Function to add a todo
    async function addTodo(item) {
        await page.locator('.new-todo').fill(item);
        await page.locator('.new-todo').press('Enter');
    }

    // Add todos
    await addTodo('Buy Milk');
    await addTodo('Collect Kids');
    await addTodo('Go to gym');

    // Mark "Collect Kids" as complete
    await page.locator('.todo-list li:has-text("Collect Kids") .toggle').click();

    // Switch to 'Active' filter to display only active tasks
    await page.locator('a', { hasText: 'Active' }).click();

    // Verify that only 2 items exist in the active list
    const activeItems = await page.locator('.todo-list li').count();
    await expect(activeItems).toEqual(2);
});

test('Add todos and verify persistence after refresh', async ({ page }) => {
    // Navigate to the To-Do MVC demo site
    await page.goto('https://demo.playwright.dev/todomvc');

    // Function to add a todo
    async function addTodo(item) {
        await page.locator('.new-todo').fill(item);
        await page.locator('.new-todo').press('Enter');
    }

    // Add todos
    await addTodo('Get milk');
    await addTodo('Collect Kids');
    await addTodo('Go to gym');
    await addTodo('Watch tv');

    // Refresh the browser
    await page.reload();

    // Verify that 4 items exist in the todo list after refresh
    const itemCount = await page.locator('.todo-list li').count();
    await expect(itemCount).toEqual(4);

    // Optionally, verify the text of each item to ensure correct persistence
    await expect(page.locator('.todo-list li', { hasText: 'Get milk' })).toBeVisible();
    await expect(page.locator('.todo-list li', { hasText: 'Collect Kids' })).toBeVisible();
    await expect(page.locator('.todo-list li', { hasText: 'Go to gym' })).toBeVisible();
    await expect(page.locator('.todo-list li', { hasText: 'Watch tv' })).toBeVisible();
});

