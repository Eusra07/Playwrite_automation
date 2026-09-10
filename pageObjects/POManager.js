const { LoginPage } = require("./LoginPage");
const { EmployeePage } = require("./EmployeePage");


class POManager{

    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.employeePage = new EmployeePage(this.page);
    }

    getLoginPage(){
        return this.loginPage;
    }

    getEmployeePage(){
        return this.employeePage; 
    }
}

module.exports = {POManager};

