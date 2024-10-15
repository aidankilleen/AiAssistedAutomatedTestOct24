const { getDriverAndSelectors } = require('./todoElements');
const { By } = require('selenium-webdriver');  // Importing By

async function testAddTodo() {
    const { driver, inputBox, todoList } = await getDriverAndSelectors();

    // Use elements
    const input = await inputBox();
    await input.sendKeys('Test Todo');
    await input.sendKeys('\uE007'); // Sending Enter key

    // Wait for the todo-list and check if the todo was added
    const list = await todoList();
    const todos = await list.findElements(By.css('li'));  // By is now defined
    console.log(`Number of todos: ${todos.length}`);

    // Clean up: Close the browser after testing
    await driver.quit();
}

testAddTodo();
