const { test, expect } = require("@playwright/test");
const { POManager } = require("../pageObjects/POManager");
const dataset = require("../utils/validLoginData.json");
const empData = require("../utils/employeeCredData.json");


test(`Verify user search working and update user status ${dataset.USERNAME}`, async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goToLoginPage();
    await loginPage.login(dataset.USERNAME,dataset.PASSWORD);
    await loginPage.validLogin();
    
    const employeePage = poManager.getEmployeePage();
    await employeePage.goToEmployeePage();
    const empId = Math.floor(Math.random()*(999999-100)+100).toString();
    const employeeName = `${empData.LAST_NAME}${empId}`;
    await employeePage.addEmployee(empData.FIRST_NAME,`${employeeName}`,empId);
    
    const adminPage = poManager.getAdminPage();
    await adminPage.goToAdminPage();
    await adminPage.addUser(empData.FIRST_NAME,employeeName,empId);
    await adminPage.searchUser('Enabled');
    await adminPage.edit();
    await adminPage.goToAdminPage();
    await adminPage.searchUser(adminPage.newState);
    await adminPage.checkEditedInfo();

})