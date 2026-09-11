const { test, expect } = require("@playwright/test");
const { POManager } = require("../pageObjects/POManager");
const dataset = require("../utils/validLoginData.json") ;
const employeeData = require("../utils/employeeCredData.json");


test(`Verify new employee added successfully ${dataset.USERNAME}`, async ({ page }) => {

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goToLoginPage();
    await loginPage.login(dataset.USERNAME,dataset.PASSWORD);
    await loginPage.validLogin();

    const employeePage = poManager.getEmployeePage();
    await employeePage.goToEmployeePage();

    const employeeId = Math.floor(Math.random()*(999999-100)+100).toString();
    await employeePage.addEmployee(employeeData.FIRST_NAME,employeeData.LAST_NAME,employeeId);
    await employeePage.empLists();
    await employeePage.searchEmployee(`${employeeData.FIRST_NAME} ${employeeData.LAST_NAME}`,employeeId);
    await employeePage.verifyEmployee(employeeData.FIRST_NAME,employeeData.LAST_NAME,employeeId);

    const logoutPage = poManager.getLogoutPage();
    await logoutPage.logout();


    
    
});
