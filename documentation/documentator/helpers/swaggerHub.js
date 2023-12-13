const puppeteer = require("puppeteer");
const swaggerHubSecretKeyName = `swaggerHub`;
const loginButton = "button[aria-label='log in']",
    emailInput = "input[class='input c3515fa31 c59af61b7']",
    passwordInput = "input[name='password']",
    loginIdButton = "button[class='cec7de2e9 c05bf59ae c3f6e0ede c2b3788fc _button-login-id']",
    loginPasswordButton = "button[class='cec7de2e9 c05bf59ae c3f6e0ede c2b3788fc _button-login-password']",
    createNewButton = "button[id='headlessui-popover-button-4']",
    importAndDocumentApiButton = "#headlessui-popover-panel-5 > li:nth-child(2)",
    filePathOrUrlInput = "input[label='Path or URL']",
    importApiUploadApiButton = "button[aria-label='import-api-upload-api']",
    importApiImportButton = "button[aria-label='import-api-import']",
    nameInput = "input[label='Name']",
    versionInput = "input[label='Version']";
const defaultTimeout = 1000;
const { getSecrets } = require("../../../src/shared/secrets/secretController");
const { getConfigFile } = require("../../../config");

async function uploadToSwaggerHub({ fileURL, APIName, APIversion }) {
    try {
        const [swaggerHubSecret] = await getSecrets(getConfigFile(), [swaggerHubSecretKeyName]);

        const { email, password, userName } = swaggerHubSecret;

        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();

        await page.goto("https://app.swaggerhub.com/home");
        await page.click(loginButton);

        await page.waitForSelector(emailInput);
        await page.type(emailInput, email);
        await page.click(loginIdButton);

        await page.waitForSelector(passwordInput);
        await page.$eval(passwordInput, (el, value) => (el.value = value), password);
        await page.waitForSelector(loginPasswordButton);
        await page.click(loginPasswordButton);

        await page.waitForNavigation({ waitUntil: "load" });
        await page.waitForSelector(createNewButton);
        await page.click(createNewButton);

        await page.waitForSelector(importAndDocumentApiButton);
        await page.click(importAndDocumentApiButton);

        await page.waitForSelector(filePathOrUrlInput);
        await page.type(filePathOrUrlInput, fileURL);
        await new Promise((resolve) => setTimeout(resolve, defaultTimeout));
        await page.click(importApiUploadApiButton);

        await page.waitForSelector(nameInput);
        const nameInputValue = await page.$eval(nameInput, (el) => el.value);
        await page.click(nameInput);
        for (let i = 0; i < nameInputValue.length; i++) {
            await page.keyboard.press("Backspace");
        }
        await page.type(nameInput, `${APIName}`);
        await page.waitForSelector(versionInput);
        const versionInputValue = await page.$eval(versionInput, (el) => el.value);
        await page.click(versionInput);
        for (let i = 0; i < versionInputValue.length; i++) {
            await page.keyboard.press("Backspace");
        }
        await page.type(versionInput, APIversion);
        await page.waitForSelector(importApiImportButton);
        await new Promise((resolve) => setTimeout(resolve, defaultTimeout));
        await page.click(importApiImportButton);

        await new Promise((resolve) => setTimeout(resolve, defaultTimeout));
        await browser.close();

        return `Your API documentation can be found in: https://app.swaggerhub.com/apis-docs/${userName}/${APIName}/${APIversion}`;
    } catch (e) {
        console.error(e);
        throw new Error(e);
    }
}

module.exports = { uploadToSwaggerHub };
