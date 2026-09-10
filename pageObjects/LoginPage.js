const { expect } = require("@playwright/test");


class LoginPage{

    constructor(page){
        this.page = page;
        this.userName = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.credentials = page.getByText('Invalid credentials', {exact: true});
        this.errorInput = page.locator('.oxd-input-field-error-message')
    }

    async goToLoginPage(){

        //await this.page.waitForTimeout(2000);

        await this.page.goto(process.env.BASE_URL, {
            waitUntil: 'domcontentloaded',
            timeout: 50000
        });
            await this.userName.waitFor({
        state: 'visible',
        timeout: 30000
        });

    }

    async login(username, password){
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async invalidLogin(username,password){

        if (username === '' && password === ''){

        await expect(this.errorInput.nth(0)).toHaveText('Required');
        await expect(this.errorInput.nth(1)).toHaveText('Required');

        } else if (username === '' || password === ''){

        await expect(this.errorInput.first()).toHaveText('Required');
        
        } else{
        await expect(this.credentials).toBeVisible({timeout: 6000});

        }
    }
}

module.exports = {LoginPage}