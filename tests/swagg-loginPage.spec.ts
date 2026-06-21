import { test, expect } from '../test-bases/ui-swagg-test-base';
 
//test.describe('Verify Login Page and its Elements', () => {   
//I will not use the describe block as I want to run each test independently and not in a sequence.
//I want to decrease the execution time of the tests

test('Verify Login Page and its Elements', async ({ loginPage }) => {
  await loginPage.page.goto(loginPage.url);  
  await expect(loginPage.page).toHaveTitle(/Swag/);

  // Expect the elements "to be visible".
   await expect(loginPage.logo).toBeVisible();
   await expect(loginPage.usernameInput).toBeVisible();
   await expect(loginPage.passwordInput).toBeVisible();
   await expect(loginPage.loginButton).toBeVisible(); 
   await expect(loginPage.usernamesList).toBeVisible();
   await expect(loginPage.validPassword).toBeVisible();

   // Verify that the valid usernames and password are correct
   const validUsernames = await loginPage.getValidUsernames();
   const validPassword = await loginPage.getValidPassword();
   expect(validUsernames).toEqual(['standard_user', 'locked_out_user', 'problem_user', 'performance_glitch_user', 'error_user', 'visual_user']);
   expect(validPassword).toBe('secret_sauce');

 //Verify error message when logging in with empty credentials
  await loginPage.loginButton.click();
  expect(loginPage.errorMessage).toBeVisible();
  expect((await loginPage.errorMessage.innerText()).toString()).toBe('Epic sadface: Username is required');
  expect(loginPage.errorIconUsernameInput).toBeVisible();
  expect(loginPage.errorIconPasswordInput).toBeVisible();

  //Verify error messages when logging in with invalid credentials
  await loginPage.usernameInput.fill('invalid_user');
  await loginPage.passwordInput.fill('invalid_password');
  await loginPage.loginButton.click();
  expect(loginPage.errorMessage).toBeVisible();
  expect((await loginPage.errorMessage.innerText()).toString()).toBe('Epic sadface: Username and password do not match any user in this service');
  expect(loginPage.errorIconUsernameInput).toBeVisible();
  expect(loginPage.errorIconPasswordInput).toBeVisible();

   //Verify error message when logging in without password
  await(loginPage.page.reload());
  await loginPage.usernameInput.fill('standard_user');
  await loginPage.loginButton.click();
  expect(loginPage.errorMessage).toBeVisible();
  expect((await loginPage.errorMessage.innerText()).toString()).toBe('Epic sadface: Password is required');
  expect(loginPage.errorIconUsernameInput).not.toBeVisible();
  expect(loginPage.errorIconPasswordInput).toBeVisible();

  //Verify error message when logging in without username
  await loginPage.usernameInput.fill('');
  await loginPage.passwordInput.fill('secret_sauce');
  await loginPage.loginButton.click();
  expect(loginPage.errorMessage).toBeVisible();
  expect((await loginPage.errorMessage.innerText()).toString()).toBe('Epic sadface: Username is required');
  expect(loginPage.errorIconUsernameInput).toBeVisible();
  expect(loginPage.errorIconPasswordInput).not.toBeVisible();

    //Verify logging in with a valid user
  await(loginPage.page.reload());
  await loginPage.usernameInput.fill('problem_user');
  await loginPage.passwordInput.fill('secret_sauce');
  await loginPage.loginButton.click();
  expect(loginPage.page.url()).toBe('https://www.saucedemo.com/inventory.html');

  
});

//});