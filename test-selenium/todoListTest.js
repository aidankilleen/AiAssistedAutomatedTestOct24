const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function runTest() {
    // Set up WebDriver
    const driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to the TodoMVC page
        await driver.get('https://demo.playwright.dev/todomvc');

        // Function to add a todo
        async function addTodo(task) {
            const inputField = await driver.findElement(By.className('new-todo'));
            await inputField.sendKeys(task, Key.ENTER);
        }

        // Add todos
        await addTodo('Get milk');
        await addTodo('Collect Kids');
        await addTodo('Go to Gym');

        // Mark the second todo as done
        const toggleButtons = await driver.findElements(By.className('toggle'));
        await toggleButtons[1].click();

        // View Active todos
        const activeLink = await driver.findElement(By.linkText('Active'));
        await activeLink.click();

        // Verify there are only 2 active todos in the list
        const activeTodos = await driver.findElements(By.css('.todo-list li:not(.completed)'));
        assert.strictEqual(activeTodos.length, 2, 'There should be 2 active todos');

        console.log('Test Passed: Correct number of active todos verified');
    } catch (error) {
        console.error('Test Failed:', error);
    } finally {
        await driver.quit();
    }
}

runTest();
