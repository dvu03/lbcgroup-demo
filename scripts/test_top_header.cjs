const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const artifactDir = 'C:/Users/admin/.gemini/antigravity-ide/brain/bd17a718-b22c-4f99-b6bf-0c67a29f7df1';

  // 1. Test 1920px Desktop
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: `${artifactDir}/header_1920.png`, clip: { x: 0, y: 0, width: 1920, height: 350 } });
  console.log('1920px captured');

  // 2. Test 1440px Desktop
  await page.setViewport({ width: 1440, height: 900 });
  await page.screenshot({ path: `${artifactDir}/header_1440.png`, clip: { x: 0, y: 0, width: 1440, height: 350 } });
  console.log('1440px captured');

  // 3. Test 768px Tablet
  await page.setViewport({ width: 768, height: 1024 });
  await page.screenshot({ path: `${artifactDir}/header_768.png`, clip: { x: 0, y: 0, width: 768, height: 350 } });
  console.log('768px captured');

  // 4. Test 390px Mobile
  await page.setViewport({ width: 390, height: 844 });
  await page.screenshot({ path: `${artifactDir}/header_390.png`, clip: { x: 0, y: 0, width: 390, height: 350 } });
  console.log('390px captured');

  // 5. Test Demo Admin Banner Top & Header tab
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/demo-admin', { waitUntil: 'networkidle2' });
  const buttons = await page.$$('button');
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('Banner top & Header')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: `${artifactDir}/admin_banner_top_header.png` });
  console.log('Admin tab captured');

  await browser.close();
  console.log('ALL TESTS COMPLETED');
})().catch(e => {
  console.error(e);
  process.exit(1);
});
