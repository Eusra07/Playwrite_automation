const { expect } = require("@playwright/test");

class LeaveApplyPage{

    constructor(page){
        this.page = page;
        this.leaveButton = this.page.locator('span:has-text("Leave")');
        this.leaveHeader = this.page.locator('h6:has-text("Leave")');

        this.applyHead = this.page.getByRole('link', { name: 'Apply' });
        this.applyLeaveTitle = this.page.getByRole('heading', { name: 'Apply Leave' });


        this.selectDrop = this.page.locator("//div[@class='oxd-select-text-input']")
        this.fromDate = this.page.locator('div.oxd-input-group').filter({ hasText: 'From Date' }).locator('input');
        this.toDate = this.page.locator('div.oxd-input-group').filter({ hasText: 'To Date' }).locator('input');
        this.leaveTime = this.page.locator(".oxd-select-text-input");

        this.commentBox = this.page.locator('textarea:visible');

        this.applyButton = this.page.getByRole('button', { name: 'Apply' });

        this.myLeaveHead = this.page.getByText('My Leave', { exact: true });
        this.searchButton = this.page.getByRole('button', { name: 'Search' });
        this.rowCard = this.page.locator('.oxd-table-body .oxd-table-row');


    }

    async goToLeavePage(){
        await this.leaveButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.leaveHeader).toBeVisible({timeout: 10000});
    }

    async goToApplyPage(){
        await this.applyHead.click();
        await expect(this.applyLeaveTitle).toBeVisible();
    }

    async applyForLeave(firstDate,secondDate){
        await this.selectDrop.click();

        await this.page.getByRole('option').nth(1).click();
        await this.page.waitForTimeout(3000);
        if (await this.leaveTime.filter({hasText: '0.00 Day(s)', exact: true}).count()>0){
            await this.selectDrop.click();
            await this.page.getByRole('option').nth(2).click();
        }

        //add a for loop here so that it retries until the re is successful

        await this.fromDate.fill(firstDate)
        //await calendar.click();
        await this.toDate.fill('');
        await this.toDate.fill(secondDate);
        //console.log("TO AFTER FILL:", await this.toDate.inputValue());
        
        this.comment = `Hi QA ${Date.now().toString().slice(-6)}`;
        await this.commentBox.click();
        await this.commentBox.fill(this.comment); 
        
        await this.applyButton.click();
        await expect(this.page.getByText('Successfully Saved', { exact: true })).toBeVisible({ timeout: 15000 });
    }

    async verifyPendingLeave(firstdate, secondate){
        await this.myLeaveHead.click();
        
        await this.fromDate.fill(firstdate);

        await this.toDate.click();
        await this.toDate.fill(secondate);

        await this.searchButton.click();
        await this.page.waitForLoadState('networkidle').catch(() => {});
        //await expect(toast).toHaveText(/Success/);

        this.rowComment = this.rowCard.filter({hasText: this.comment});
        await expect(this.rowComment).toBeVisible({timeout: 15000});
        await expect(this.rowComment).toContainText(firstdate);
        await expect(this.rowComment).toContainText(secondate);

        const pending = this.rowComment.getByText('Pending Approval');
        console.log('pending approval:',await pending.count()>0);

        if (await pending.count()>0){
            await this.rowComment.locator('button').filter({hasText: 'Cancel'}).click();

            const cancelled = this.rowComment.getByText('Cancelled');
            await expect(cancelled).toBeVisible();
            //await this.page.pause();
        }        
    }
}

module.exports = {LeaveApplyPage};