const { expect } = require("@playwright/test");
const { POManager } = require("./POManager");

class AdminPage{

    constructor(page){
        this.page = page;
        this.adminButton = this.page.getByRole('link', { name: 'Admin' });
        this.adminHeader = this.page.getByRole('heading', { name: 'Admin' });
        this.addButton = this.page.getByRole('button', { name: 'Add' });
        this.userDropdown = this.page.locator('div').filter({ hasText: '-- Select --' }).nth(11);
        this.statusDropdown = this.page.locator('div').filter({ hasText: '-- Select --' }).last();
        this.empName = this.page.getByPlaceholder('Type for hints...');
        this.userNameInput = this.page.locator('div.oxd-input-group').filter({ hasText: 'Username', exact: true }).locator('input');
        this.passwordInput = this.page.locator('.user-password-row input[type="password"]').first();
        this.confirmPasswordInput = this.page.locator('.user-password-row input[type="password"]').nth(1);
        this.saveButton = this.page.getByRole('button', { name: 'Save' });

        this.container = this.page.locator('div.orangehrm-background-container');
        this.userRole = this.page.locator('div.oxd-select-text.oxd-select-text--active').locator('div').nth(0);
        this.searchButton = this.page.getByRole('button', { name: 'Search' });

        this.rowAll = this.page.getByRole('row');
        this.editIcon = this.page.locator('i.oxd-icon.bi-pencil-fill');
        this.editTitle = this.page.getByRole('heading', { name: 'Edit User' });
        this.cardAll = this.page.locator('div.oxd-input-group.oxd-input-field-bottom-space:visible');
        this.editDropdown = this.page.locator('.oxd-select-text-input'); //both dropdown


    }

    async goToAdminPage(){
        await this.adminButton.click();
        await this.page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
        //await this.page.waitForLoadState('domcontentloaded');
        await expect(this.adminHeader).toBeVisible({timeout: 10000});
        //await this.page.pause();
    }

    async addUser(firstName, lastName, empId){
        await this.addButton.click();
        await this.userDropdown.click();
        await this.page.getByText('ESS', { exact: true }).click();
        await this.statusDropdown.click();
        await this.page.getByText('Enabled', { exact: true }).click();

        this.fillEmpName = `${firstName} ${lastName}`
        await this.empName.fill(this.fillEmpName);
        await this.page.getByText(this.fillEmpName, { exact: true }).first().click();

        this.filledUsernameInput = `${firstName}${empId}`;
        await this.userNameInput.fill(this.filledUsernameInput);

        await this.passwordInput.fill(`${firstName}${lastName}${empId}123`);
        await this.confirmPasswordInput.fill(`${firstName}${lastName}${empId}123`);
        await this.saveButton.click();
        await expect(this.page.getByText('Successfully Saved', { exact: true })).toBeVisible();
        //await this.page.pause();
        
    }

    async searchUser(statusSearch){
        await this.page.waitForLoadState('domcontentloaded');

        await expect(this.container).toBeVisible();
        await expect(this.userNameInput).toBeVisible();
        
        await this.userNameInput.click();
        await this.userNameInput.fill(this.filledUsernameInput);

        await this.userDropdown.click();
        await this.page.getByRole('listbox').getByText('ESS', { exact: true }).click();

        await this.empName.fill(this.fillEmpName);
        await this.page.getByRole('listbox').getByText(this.fillEmpName, { exact: true }).first().click();
        
        //this.enable = 'Enabled';
        await this.statusDropdown.click();
        await this.page.getByRole('listbox').getByText(statusSearch, { exact: true }).click();
        await this.searchButton.click();
        //await this.page.pause();
    }

    async edit(){
        const myRow = this.rowAll.filter({hasText: this.filledUsernameInput}).filter({hasText: this.fillEmpName});
        await expect(myRow).toBeVisible();

        await myRow.locator(this.editIcon).click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.editTitle).toBeVisible();
        //await this.page.pause()

        this.statusCard = this.cardAll.filter({hasText: 'Status'});
        this.editStatusDropdown = this.statusCard.locator(this.editDropdown);
       
        await expect(this.cardAll.filter({ hasText: 'Status' })).toBeVisible({timeout: 10000});
        await expect(this.editStatusDropdown).not.toHaveText('-- Select --', {timeout: 5000});

        this.currentStatus = await this.editStatusDropdown.innerText();
        console.log('Current status:', this.currentStatus);
        await this.editStatusDropdown.click();
        // const currentStatus = await statusCard.nth(0).textContent();
        // console.log(currentStatus);
        
        this.newState = '';
        if ( this.currentStatus === 'Enabled'){
            await this.page.getByRole('listbox').getByText('Disabled',{exact: true}).click();
            this.newState = 'Disabled';
        }else{
            await this.page.getByRole('listbox').getByText('Enabled', {exact: true}).click();
            this.newState = 'Enabled';
        }
        
        await this.saveButton.click();
        await expect(this.page.getByText('Successfully Updated', { exact: true })).toBeVisible();
    }

    async checkEditedInfo(){

        const myRow = this.rowAll.filter({hasText: this.filledUsernameInput}).filter({hasText: this.fillEmpName});
        await expect(myRow).toBeVisible();

        //this.updatedStatus = await this.editStatusDropdown.innerText();
        await expect(myRow).toContainText(this.newState);
        //await expect(myRow).toContainText(this.newState);
        console.log('Expected updated status:', this.newState);
        //await expect(myRow.locator(this.updatedStatus));

    }
}

module.exports = {AdminPage}; 