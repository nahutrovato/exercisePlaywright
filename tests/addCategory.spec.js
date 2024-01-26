// @ts-check
const { test, expect } = require('@playwright/test');
const UserGenerator = require ('../data/userGeneratorFunction');

test.describe.serial('Test create category', () => {
  let email = UserGenerator.genRandomString(6) + "@example.com";
  let password = UserGenerator.genRandomString(8);;
 
  test('Creation user with POST request', async ({ request }) => {
    const url = 'https://api.club-administration.qa.qubika.com'
    const response = await request.post(url+'/api/auth/register',{
      data: {
          "email": email,
          "password": password,
          "roles": [
            "ROLE_ADMIN"
          ]
      }
    });
    expect(response.status()).toBe(201);
  });
  
  test('Create new sub category test', async ({ page }) => {
    let newCategoryName = UserGenerator.genRandomString(8);
    let newSubCategoryName = UserGenerator.genRandomString(4);

    await page.goto('https://club-administration.qa.qubika.com/#/auth/login');
    await expect(page).toHaveTitle(/Qubika Club/);
  
    await page.getByPlaceholder('Usuario o correo electrónico').fill(email);
    await page.getByPlaceholder('Contraseña').fill(password);
    await page.getByRole('button', { name: 'Autenticar' }).click();
    
    await expect(page).toHaveTitle(/Qubika Club/);
    await page.waitForURL('https://club-administration.qa.qubika.com/#/dashboard');
    
    await page.getByText('Tipos de Categorias').click();
    await page.getByRole('button', { name: ' Adicionar' }).click();
    await page.getByPlaceholder('Nombre de categoría').fill(newCategoryName);
    await page.getByRole('button', { name: 'Aceptar' }).click();
    await expect(page.locator("text="+newCategoryName+"")).toBeVisible();

    await page.getByRole('button', { name: ' Adicionar' }).click();
    await page.getByPlaceholder('Nombre de categoría').fill(newSubCategoryName);
    await page.locator('label').filter({ hasText: 'Es subcategoria?' }).click();
    await page.getByLabel('Adicionar tipo de categoría').locator('span').nth(1).click();
    await page.getByRole('option', { name: ""+newCategoryName+"" }).click();
    await page.getByRole('button', { name: 'Aceptar' }).click();
    await expect(page.locator("text="+newSubCategoryName+"")).toBeVisible();
  });

 

})


