const { expect } = require("@playwright/test");


class LogoutPage{

    constructor(page){
        this.page = page;
        this.dropdown = this.page.locator('i.oxd-icon.bi-caret-down-fill.oxd-userdropdown-icon');
        this.logoutButton = this.page.getByRole('menuitem', { name: 'Logout' });

    }

    async logout(){

        await this.dropdown.click();
        await this.logoutButton.click();
        
    }

    

}

module.exports = {LogoutPage};