const puppeteer = require('puppeteer-core');

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    const viewports = [320, 360, 375, 390, 430, 768, 1024, 1366, 1440, 1920];
    
    console.log('Testing responsive viewports for horizontal overflow and rendering errors...');
    const results = [];

    for (const width of viewports) {
      await page.setViewport({ width, height: 900 });
      await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
      await new Promise(r => setTimeout(r, 400));

      const overflow = await page.evaluate(() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          hasHorizontalScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth
        };
      });

      results.push({ width, ...overflow });
    }

    console.log('Responsive Overflow Results:', JSON.stringify(results, null, 2));
  } catch (e) {
    console.error('Error:', e);
  } finally {
    if (browser) await browser.close();
  }
})();
