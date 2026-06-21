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
    readonly errorIconUsernameInput: Locator;
    readonly errorIconPasswordInput: Locator;
    readonly usernamesList: Locator;
    readonly validPassword: Locator;

    constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('.login_logo');
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorIconUsernameInput = page.locator('//input[@id="user-name"]/following::*[1]');
    this.errorIconPasswordInput = page.locator('//input[@id="password"]/following::*[1]');
    this.usernamesList =page.locator('//div[@id="login_credentials"]');
    this.validPassword = page.locator('//div[@class="login_password"]');
}

async getValidUsernames(): Promise<string[]>
{
    const userNames = await this.usernamesList.innerText();
    return userNames.split('\n').filter(name => name.includes("_user") ) ;
}

async getValidPassword(): Promise<string>
{
    const text = await this.validPassword.innerText();
    return text.split('\n')[1].trim();   
}   
}

