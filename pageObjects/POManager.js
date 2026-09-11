const { LoginPage } = require("./LoginPage");
const { EmployeePage } = require("./EmployeePage");
const { LogoutPage } = require("./logoutPage");
const { LeaveApplyPage } = require("./LeaveApplyPage");


class POManager{

    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.employeePage = new EmployeePage(this.page);
        this.leaveApplyPage = new LeaveApplyPage(this.page);
        this.logoutPage = new LogoutPage(this.page);

    }

    getLoginPage(){
        return this.loginPage;
    }

    getEmployeePage(){
        return this.employeePage; 
    }

    getLogoutPage(){
        return this.logoutPage;
    }

    getLeaveApplyPage(){
        return this.leaveApplyPage;
    }

}

module.exports = {POManager};

