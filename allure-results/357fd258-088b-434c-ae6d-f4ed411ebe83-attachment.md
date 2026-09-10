# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: invalidLogin.spec.js >> Check invalid login combination 3
- Location: tests\invalidLogin.spec.js:8:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", waiting until "load"

```

# Test source

```ts
  1  | const { expect } = require("@playwright/test");
  2  | 
  3  | 
  4  | class LoginPage{
  5  | 
  6  |     constructor(page){
  7  |         this.page = page;
  8  |         this.userName = page.getByPlaceholder('Username');
  9  |         this.password = page.getByPlaceholder('Password');
  10 |         this.loginButton = page.getByRole('button', { name: 'Login' });
  11 |         this.credentials = page.getByText('Invalid credentials', {exact: true});
  12 |         this.errorInput = page.locator('.oxd-input-field-error-message')
  13 |     }
  14 | 
  15 |     async goToLoginPage(){
  16 | 
> 17 |         await this.page.goto(process.env.BASE_URL);
     |                         ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  18 | 
  19 |     }
  20 | 
  21 |     async login(username, password){
  22 |         await this.userName.fill(username);
  23 |         await this.password.fill(password);
  24 | 
  25 |         await promise.all([
  26 |             this.page.waitForLoadState('load'),
  27 |             this.loginButton.click()
  28 |         ]);
  29 |         
  30 |     }
  31 | 
  32 |     async invalidLogin(username,password){
  33 | 
  34 |         if (username === '' && password === ''){
  35 | 
  36 |         await expect(this.errorInput.nth(0)).toHaveText('Required');
  37 |         await expect(this.errorInput.nth(1)).toHaveText('Required');
  38 | 
  39 |         } else if (username === '' || password === ''){
  40 | 
  41 |         await expect(this.errorInput.first()).toHaveText('Required');
  42 |         
  43 |         } else{
  44 |         await expect(this.credentials).toBeVisible();
  45 | 
  46 |         }
  47 |     }
  48 | }
  49 | 
  50 | module.exports = {LoginPage}
```