const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

async function verifyH1Text() {
    let driver = await new Builder().forBrowser('chrome')
        .setChromeOptions(new chrome.Options()) // Add options if necessary
        .build();
    try {
        // Navigate to example.com
        await driver.get('http://www.example.com');

        // Find the h1 element
        const h1 = await driver.findElement(By.css('h1'));

        // Get the text of the h1 element
        const h1Text = await h1.getText();

        // Verify that the text is "Example Domain"
        assert.strictEqual(h1Text, "Example Domain", "The h1 text does not match 'Example Domain'");

        console.log("Test passed: The h1 text is 'Example Domain'");
    } catch (error) {
        console.error(`Test failed: ${error}`);
    } finally {
        await driver.quit();
    }
}

verifyH1Text();
