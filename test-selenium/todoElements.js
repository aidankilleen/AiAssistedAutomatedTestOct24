const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('chromedriver');

// Initializes a Selenium WebDriver instance
async function setupDriver() {
    const driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://demo.playwright.dev/todomvc');
    return driver;
}

// Retrieves elements dynamically with explicit waits
function getElement(driver, selector, timeout = 5000) {
    return driver.wait(until.elementLocated(By.css(selector)), timeout, `Element with selector ${selector} not found after ${timeout} ms`);
}

// Provides methods to retrieve elements when needed
exports.getDriverAndSelectors = async () => {
    const driver = await setupDriver();
    return {
        driver,
        inputBox: () => getElement(driver, '.new-todo'),
        todoList: () => getElement(driver, '.todo-list', 10000),  // Increased timeout for elements that take longer to appear
        count: () => getElement(driver, '.todo-count'),
        filters: () => getElement(driver, '.filters'),
        clearCompleted: () => getElement(driver, '.clear-completed'),
        toggleAll: () => getElement(driver, '.toggle-all')
    };
};
