const { test, expect } = require("@playwright/test");
const { POManager } = require("../pageObjects/POManager");
const dataset = require("../utils/validLoginData.json") ;
const dateData = require("../utils/leaveDate.json");



test(`Verify leave request accepted ${dataset.USERNAME}`, async ({ page }) => {

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goToLoginPage();
    await loginPage.login(dataset.USERNAME,dataset.PASSWORD);
    await loginPage.validLogin();

    const leaveApplyPage = poManager.getLeaveApplyPage();
    await leaveApplyPage.goToLeavePage();
    await leaveApplyPage.goToApplyPage();
    await leaveApplyPage.applyForLeave(dateData.fromDate, dateData.toDate);
    await leaveApplyPage.verifyPendingLeave(dateData.fromDate, dateData.toDate);


    //const logoutPage = poManager.getLogoutPage();
    //await logoutPage.logout();    
    
});
