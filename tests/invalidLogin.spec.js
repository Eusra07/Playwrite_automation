
const { test, expect } = require("@playwright/test");
const { POManager } = require("../pageObjects/POManager");
const dataset = JSON.parse(JSON.stringify(require("../utils/invalidLoginData.json"))); 

let tNumber = 1
for (const data of dataset){
  test(`Check invalid login combination ${tNumber}`, async ({ page }) => {
    await page.goto(process.env.BASE_URL);
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goToLoginPage();
    await loginPage.login(data.USERNAME,data.PASSWORD);
    await loginPage.invalidLogin(data.USERNAME,data.PASSWORD);

    // const userName = page.getByPlaceholder('Username');
    // const password = page.getByPlaceholder('Password');
    // const loginButton = page.getByRole('button', { name: 'Login' });
    // const credentials = page.getByText('Invalid credentials', {exact: true});
    // const errorInput = page.locator('.oxd-input-field-error-message')
    
    //login
    // await userName.fill(data.USERNAME)
    // await password.fill(data.PASSWORD);
    // await loginButton.click();
    
    // if (data.USERNAME === '' && data.PASSWORD === ''){

    //   await expect(errorInput.nth(0)).toHaveText('Required');
    //   await expect(errorInput.nth(1)).toHaveText('Required');

    // } 
    // else if (data.USERNAME === '' || data.PASSWORD === ''){

    //   await expect(errorInput.first()).toHaveText('Required');
 
    // } else{
    //   await expect(credentials).toBeVisible();

    // }
    //await page.pause();

  });
  tNumber++;
};
