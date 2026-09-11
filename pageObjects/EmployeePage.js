const { expect } = require("@playwright/test");
const { TIMEOUT } = require("dns");


class EmployeePage{

    constructor(page){
        this.page = page;
        this.pim = this.page.locator('a.oxd-main-menu-item').filter({ hasText: 'PIM' });
        this.pimHead = this.page.getByRole('heading', { name: 'PIM' });
        this.addButton = this.page.getByRole('button', { name: 'Add' });
        this.employeeCard = this.page.locator('div.orangehrm-card-container');

        this.firstName = this.page.getByPlaceholder('First Name');
        this.lastName = this.page.getByPlaceholder('Last Name');
        this.employeeId = this.page.locator('div.oxd-input-group').filter({ hasText: 'Employee Id' }).locator('input');
        this.saveButton = this.page.getByRole('button', { name: 'Save' });

        this.employeeList = this.page.locator('a').filter({ hasText: 'Employee List' });
        this.empname = this.page.locator('.oxd-input-group').filter({hasText: 'Employee Name'}).getByRole('textbox');
        this.empid = this.page.locator('.oxd-input-group').filter({ hasText: 'Employee Id' }).getByRole('textbox');
        this.searchButton = this.page.getByRole('button', { name: 'Search' });

        
    }

    async goToEmployeePage(){
        await this.pim.click();
        await expect(this.pimHead).toBeVisible();
    }

    async addEmployee(firstname, lastname, employeeid){
        await this.addButton.click();
        await expect(this.employeeCard).toBeVisible();
        await expect(this.saveButton).toBeVisible({timeout: 10000});
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname);
        await this.employeeId.fill(employeeid);
        await this.saveButton.click();
        await expect(this.page.getByText('Successfully Saved', { exact: true })).toBeVisible();

        //await expect(this.page.locator('.oxd-toast-content-text').toHaveText('Successfully Saved'));
        //await this.page.pause();

    }

    async empLists(){
        await expect(this.employeeList).toBeVisible();
        await this.employeeList.click();
    }

    async searchEmployee(empName, empId){
        await this.empname.fill(empName);
        await this.empid.fill(empId);
        await this.searchButton.click();
    }

    async verifyEmployee(first, last, id){
        await expect(this.page.getByText('(1) Record Found', { exact: true })).toBeVisible();
        await expect(this.page.getByText(`${id}`, { exact: true })).toBeVisible(); 
        await expect(this.page.getByText(`${first}`, { exact: true })).toBeVisible();
        await expect(this.page.getByText(`${last}`, { exact: true })).toBeVisible();  
        console.log("Employee search complete");
    }

}

module.exports = {EmployeePage};