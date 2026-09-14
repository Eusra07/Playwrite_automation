# OrangeHRM Automation Project
## Project Overview
This project contains automated test cases for the OrangeHRM open source application. It covers functional testing of module Login, PIM, Admin, Leave application, and Logout using different UI automated cases. The project is built using Playwright framework and JavaScript, and follows Page Object Model design pattern. 
Following the POM pattern makes the project reusable, manageable, and easy to understand. 

## Tech Stack
* JavaScript
* Playwright
* Node.js
* npm
* dotenv
* Allure

## Installation
1. Instal Node.js<br>
Download and install Node.js from its official website or go to this link to download. https://nodejs.org/en/download <br>
To check node version. Go to cmd and write node --version <br>
To check npm version. write npm --version
2. Install Playwright
write npm init playwright@latest 
3. Install dotenv<br>
npm install dotenv <br>
Then create .env file in the project root directory and add BASE_URL.
4. Install Allure reporter: npm install -D allure-playwright
  
## Steps
* Clone git repository
* Install all dependencies
* Check environment variable
* Run a test using test commands. 

## Running test commands
1. Run All Test
* To run all test scenario: npx playwrite test
* To see the browser while all test executes: npx playwright test --headed

2. Run individual test file
* Invalid Login Tests: npx playwright test tests/invalidLogin.spec.js
* Admin Tests: npx playwright test tests/adminPage.spec.js
* PIM Tests: npx playwright test tests/EmployeePage.spec.js
* Leave Application Tests: npx playwright test tests/leavePage.spec.js

3. To run individual file in headed mode
* Invalid Login Tests: npx playwright test tests/invalidLogin.spec.js --headed
* Admin Tests: npx playwright test tests/adminPage.spec.js --headed
* PIM Tests: npx playwright test tests/EmployeePage.spec.js --headed
* Leave Application Tests: npx playwright test tests/leavePage.spec.js --headed

4. Debug test
To debug a test write "npx playwrite test "spec.js file location" --debug

## Generate Test Reports
* HTML Report:<br>
###1. Run the specific test file or files.
###2. HTML report command: npx playwrite show-report
* Allure Report:<br>
1. Install allure if not installed by using this command: pm i -D @playwright/test allure-playwright
2. allure generate ./allure-results --clean
3. allure open ./allure-report <br>

If allure report is showing previous test results then before generating, write this command: Remove-Item -Recurse -Force allure-report <br>
Then run command 2, and 3.

## Issues faced
1. Loader Issues<br>
Sometime the application shifted to different page without completing the tasks of previous commands. As it jumped to one command to another without
executing the previous one fully, it was unable to find the proper location and failing the assertions. To solve that added waitFor(), waitUntil: 'domcontentloaded', or 
added delay. 
3. Frequent changes to the application<br>
Since the application is an open source testing site, it changes frequently. Certain feature were not always available. For an example: in the leave module, the apply leave 
option were sometimes disabled or unavailable. The picture below shows that no application container is showing after clicking apply button.
This issue resulted in inconsistent test execution
<img width="1522" height="552" alt="image" src="https://github.com/user-attachments/assets/2d9f14cc-d5fd-4024-8100-c7c6782ec627" />

5. Unexpected language changes
The application's language changed multiple times during testing. This caused issues with locators and test execution. Specifically when the finding locators were dependent on texts. 
  <img width="912" height="407" alt="image" src="https://github.com/user-attachments/assets/a2c6b5ab-c8a5-41bd-bf7a-97f5bac713b2" />
  
7. Test execution issues
Running all test cases together occasionally caused loading and synchronized issues, whereas executing test cases individually worked without any issues. 




