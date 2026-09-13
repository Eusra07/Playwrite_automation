const { LoginPage } = require("./LoginPage");
const { EmployeePage } = require("./EmployeePage");
const { LogoutPage } = require("./logoutPage");
const { LeaveApplyPage } = require("./LeaveApplyPage");
const { AdminPage } = require("./adminPage");


class POManager{

    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.employeePage = new EmployeePage(this.page);
        this.leaveApplyPage = new LeaveApplyPage(this.page);
        this.logoutPage = new LogoutPage(this.page);
        this.adminPage = new AdminPage(this.page);
    }

    getLoginPage(){
        return this.loginPage;
    }

    getEmployeePage(){
        return this.employeePage; 
    }

    getLeaveApplyPage(){
        return this.leaveApplyPage;
    }

    getAdminPage(){
        return this.adminPage;
    }

    getLogoutPage(){
        return this.logoutPage;
    }



}

module.exports = {POManager};

