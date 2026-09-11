const { LoginPage } = require("./LoginPage");
const { EmployeePage } = require("./EmployeePage");
const { LogoutPage } = require("./logoutPage");


class POManager{

    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.employeePage = new EmployeePage(this.page);
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

}

module.exports = {POManager};

