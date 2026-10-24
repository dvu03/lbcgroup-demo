const puppeteer = require('puppeteer-core');
async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
  await page.evaluate(() => document.fonts.ready);
  const result = await page.evaluate(() => {
    return {
      check400: document.fonts.check('400 16px "Fraunces"'),
      check600: document.fonts.check('600 24px "Fraunces"'),
      check700: document.fonts.check('700 24px "Fraunces"'),
      checkBold: document.fonts.check('bold 24px "Fraunces"'),
      checkBeVietnam400: document.fonts.check('400 16px "Be Vietnam Pro"'),
      checkBeVietnam700: document.fonts.check('700 16px "Be Vietnam Pro"')
    };
  });
  console.log('Font checks:', result);
  await browser.close();
}
run();
