
const { test, expect } = require("@playwright/test");
const { POManager } = require("../pageObjects/POManager");
const dataset = JSON.parse(JSON.stringify(require("../utils/invalidLoginData.json"))); 

let tNumber = 1
for (const data of dataset){
  test(`Check invalid login combination ${tNumber}`, async ({ page }) => {

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goToLoginPage();
    await loginPage.login(data.USERNAME,data.PASSWORD);
    await loginPage.invalidLogin(data.USERNAME,data.PASSWORD);

  });
  tNumber++;
};
