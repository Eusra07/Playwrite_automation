# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: invalidLogin.spec.js >> Check invalid login combination 1
- Location: tests\invalidLogin.spec.js:8:3

# Error details

```
Error: page.goto: net::ERR_CONNECTION_CLOSED at https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
Call log:
  - navigating to "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e6]:
    - heading "This site can’t be reached" [level=1] [ref=e7]
    - paragraph [ref=e8]:
      - strong [ref=e9]: opensource-demo.orangehrmlive.com
      - text: unexpectedly closed the connection.
    - generic [ref=e10]:
      - paragraph [ref=e11]: "Try:"
      - list [ref=e12]:
        - listitem [ref=e13]: Checking the connection
        - listitem [ref=e14]:
          - link "Checking the proxy and the firewall" [ref=e15] [cursor=pointer]:
            - /url: "#buttons"
        - listitem [ref=e16]:
          - link "Running Windows Network Diagnostics" [ref=e17] [cursor=pointer]:
            - /url: javascript:diagnoseErrors()
    - generic [ref=e18]: ERR_CONNECTION_CLOSED
  - generic [ref=e19]:
    - button "Reload" [ref=e21] [cursor=pointer]
    - button "Details" [ref=e22] [cursor=pointer]
```

# Test source

```ts
  1  | 
  2  | const { test, expect } = require("@playwright/test");
  3  | const { POManager } = require("../pageObjects/POManager");
  4  | const dataset = JSON.parse(JSON.stringify(require("../utils/invalidLoginData.json"))); 
  5  | 
  6  | let tNumber = 1
  7  | for (const data of dataset){
  8  |   test(`Check invalid login combination ${tNumber}`, async ({ page }) => {
> 9  |     await page.goto(process.env.BASE_URL);
     |                ^ Error: page.goto: net::ERR_CONNECTION_CLOSED at https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  10 |     const poManager = new POManager(page);
  11 |     const loginPage = poManager.getLoginPage();
  12 |     await loginPage.goToLoginPage();
  13 |     await loginPage.login(data.USERNAME,data.PASSWORD);
  14 |     await loginPage.invalidLogin(data.USERNAME,data.PASSWORD);
  15 | 
  16 |     // const userName = page.getByPlaceholder('Username');
  17 |     // const password = page.getByPlaceholder('Password');
  18 |     // const loginButton = page.getByRole('button', { name: 'Login' });
  19 |     // const credentials = page.getByText('Invalid credentials', {exact: true});
  20 |     // const errorInput = page.locator('.oxd-input-field-error-message')
  21 |     
  22 |     //login
  23 |     // await userName.fill(data.USERNAME)
  24 |     // await password.fill(data.PASSWORD);
  25 |     // await loginButton.click();
  26 |     
  27 |     // if (data.USERNAME === '' && data.PASSWORD === ''){
  28 | 
  29 |     //   await expect(errorInput.nth(0)).toHaveText('Required');
  30 |     //   await expect(errorInput.nth(1)).toHaveText('Required');
  31 | 
  32 |     // } 
  33 |     // else if (data.USERNAME === '' || data.PASSWORD === ''){
  34 | 
  35 |     //   await expect(errorInput.first()).toHaveText('Required');
  36 |  
  37 |     // } else{
  38 |     //   await expect(credentials).toBeVisible();
  39 | 
  40 |     // }
  41 |     //await page.pause();
  42 | 
  43 |   });
  44 |   tNumber++;
  45 | };
  46 | 
```