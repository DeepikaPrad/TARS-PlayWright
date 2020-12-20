const playwright = require('playwright');
const assert = require('assert');

const account = { login: 'moataz.mohamed99@gmail.com', password: 'password@1', user: 'Moataz Fadl' };

('TARS Login', async () => {
  for (const browserType of ['chromium']) {
  //var browser = await playwright[browserType].connect({ timeout: 0, wsEndpoint: 'ws://moon.example.com:4444/playwright/chromium' });
  const browser = await playwright[browserType].launch({ headless: false });
  const context = await browser.newContext()
  const page = await context.newPage()

  //await browser.startTracing(page, {path: 'trace.json'})
  await page.goto('https://tars.stg.rta.ae')
  await page.click('"Login"')
  await page.click('"Individual / Company"')
  await page.click('//*[@id="details-button"]', { force: true })
  await page.click('id=proceed-link')

  await page.type('id=username', account.login)
  await page.type('id=password', account.password)
  await page.screenshot({ path: `loginScreenshot-${browserType}.png` })

  await page.click('[type="submit"]')
  await verifyIsLoggedIn(page);
  //await browser.stopTracing()
  await browser.close()
  }
})()

const verifyIsLoggedIn = async (page) => {
  await page.click(`text=${account.user}`)
  assert(await page.$('"Logout"'))
}
