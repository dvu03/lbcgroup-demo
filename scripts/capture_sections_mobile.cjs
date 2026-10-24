const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    const artifactDir = 'C:\\Users\\admin\\.gemini\\antigravity-ide\\brain\\bd17a718-b22c-4f99-b6bf-0c67a29f7df1';

    await page.setViewport({ width: 390, height: 844 });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 800));

    // Full page mobile screenshot
    const fullPath = path.join(artifactDir, 'responsive_mobile_390_fullpage.png');
    await page.screenshot({ path: fullPath, fullPage: true });
    console.log('Saved full page mobile screenshot -> responsive_mobile_390_fullpage.png');

  } catch (err) {
    console.error('Error:', err);
  } finally {
    if (browser) await browser.close();
  }
})();
