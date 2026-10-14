
const { test, expect } = require('@playwright/test');

const { LandingPage } = require('../pages/LandingPage')
const { Toast } = require('../pages/Components')

let landingPage
let toast

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page)
  toast = new Toast(page)
})

test('deve cadastrar um lead na fila de espera', async ({ page }) => {

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Well Souza', 'well@gmail.com')

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await toast.HaveText(message)
});

test('não deve cadastrar com email incorreto', async ({ page }) => {

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Well Souza', 'well.com.br')

  await landingPage.alertHaveText('Email incorreto')

});

test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', 'well.souza@gmail.com')

  await landingPage.alertHaveText('Campo obrigatório')

});

test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Well Souza', '')

  await landingPage.alertHaveText('Campo obrigatório')

});

test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', '')

  await landingPage.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])

});