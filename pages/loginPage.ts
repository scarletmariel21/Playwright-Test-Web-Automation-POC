import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    
    readonly url: string = "https://www.saucedemo.com/";
    readonly title: string = "Swag Labs";
    readonly logo: Locator;
    readonly errorMessage: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator; 
    readonly errorIcon: Locator;
    readonly usernamesList: Locator;
    readonly validPassword: Locator;

    constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('.login_logo');
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorIcon = page.locator('.error-icon');
    this.usernamesList =page.locator('//div[@id="login_credentials"]');
    this.validPassword = page.locator('//div[@class="login_password"]/h4');
}

async getValidUsernames(): Promise<string[]>
{
    const text = await this.usernamesList.innerText();
    return text.split('\n').filter(line =>line.includes('_user'))
}


    
}   


