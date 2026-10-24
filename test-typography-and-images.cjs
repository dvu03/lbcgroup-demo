const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:3000';
const SCREENSHOT_DIR = path.join(__dirname, 'test-screenshots', 'font-audit');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const testPages = [
  { name: '01_homepage_desktop', url: '/', viewport: { width: 1280, height: 800 } },
  { name: '02_homepage_mobile', url: '/', viewport: { width: 375, height: 667 } },
  { name: '03_services_page', url: '/dich-vu', viewport: { width: 1280, height: 800 } },
  { name: '04_product_detail', url: '/san-pham/bioderma-sensibio-h2o-500ml', viewport: { width: 1280, height: 800 } },
  { name: '05_doctor_profile', url: '/bs-lac-kim-ngan', viewport: { width: 1280, height: 800 } },
  { name: '06_news_list', url: '/tin-tuc', viewport: { width: 1280, height: 800 } },
  { name: '07_news_detail', url: '/tin-tuc/mun-an-mun-viem-mun-khang-tri', viewport: { width: 1280, height: 800 } },
  { name: '08_demo_admin', url: '/demo-admin', viewport: { width: 1280, height: 900 } },
];

async function runAudit() {
  console.log('🚀 Starting Chrome headless typography and image audit...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const report = [];

  for (const pageInfo of testPages) {
    console.log(`\n🔍 Auditing: ${pageInfo.name} (${pageInfo.url}) at ${pageInfo.viewport.width}x${pageInfo.viewport.height}`);
    const page = await browser.newPage();
    await page.setViewport(pageInfo.viewport);

    // Track failed image requests
    const failedImages = [];
    page.on('response', response => {
      const req = response.request();
      if (req.resourceType() === 'image' && response.status() >= 400) {
        failedImages.push({ url: req.url(), status: response.status() });
      }
    });

    try {
      await page.goto(`${BASE_URL}${pageInfo.url}`, { waitUntil: 'networkidle2', timeout: 15000 });
      // Ensure fonts are loaded
      await page.evaluate(() => document.fonts.ready);
      await new Promise(r => setTimeout(r, 800));

      // If demo admin, switch to doctors tab to inspect doctor avatar
      if (pageInfo.url === '/demo-admin') {
        await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('button'));
          const docBtn = buttons.find(b => b.textContent && b.textContent.includes('Bác sĩ'));
          if (docBtn) docBtn.click();
        });
        await new Promise(r => setTimeout(r, 600));
      }

      // Collect computed styles and font status
      const metrics = await page.evaluate(() => {
        const isBeVietnamLoaded = document.fonts.check('16px "Be Vietnam Pro"') || document.fonts.check('400 16px "Be Vietnam Pro"');
        const isFrauncesLoaded = document.fonts.check('bold 24px "Fraunces"') || document.fonts.check('700 24px "Fraunces"') || document.fonts.check('600 24px "Fraunces"');

        const getFont = (selector) => {
          const el = document.querySelector(selector);
          if (!el) return null;
          const style = window.getComputedStyle(el);
          return {
            fontFamily: style.fontFamily,
            fontSize: style.fontSize,
            fontWeight: style.fontWeight,
            lineHeight: style.lineHeight,
            text: el.textContent ? el.textContent.trim().slice(0, 40) : ''
          };
        };

        // Check broken images
        const allImages = Array.from(document.querySelectorAll('img')).map(img => ({
          src: img.src ? img.src.slice(0, 80) : '',
          complete: img.complete,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          isBroken: img.complete && img.naturalWidth === 0
        }));

        const brokenImages = allImages.filter(img => img.isBroken);

        return {
          isBeVietnamLoaded,
          isFrauncesLoaded,
          h1: getFont('h1'),
          h2: getFont('h2'),
          h3: getFont('h3'),
          body: getFont('body'),
          paragraph: getFont('p'),
          button: getFont('button'),
          totalImages: allImages.length,
          brokenImagesCount: brokenImages.length,
          brokenImagesList: brokenImages.map(b => b.src),
          hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth
        };
      });

      const screenshotPath = path.join(SCREENSHOT_DIR, `${pageInfo.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });

      report.push({
        page: pageInfo.name,
        url: pageInfo.url,
        viewport: `${pageInfo.viewport.width}x${pageInfo.viewport.height}`,
        metrics,
        failedNetworkImages: failedImages,
        screenshot: screenshotPath
      });

      console.log(`  Fonts check: Be Vietnam Pro: ${metrics.isBeVietnamLoaded}, Fraunces: ${metrics.isFrauncesLoaded}`);
      console.log(`  H1 Font: ${metrics.h1 ? metrics.h1.fontFamily : 'None'} (${metrics.h1 ? metrics.h1.fontSize : ''})`);
      console.log(`  Body Font: ${metrics.body ? metrics.body.fontFamily : 'None'}`);
      console.log(`  Button Font: ${metrics.button ? metrics.button.fontFamily : 'None'}`);
      console.log(`  Images: ${metrics.totalImages} total, ${metrics.brokenImagesCount} broken (Network 404s: ${failedImages.length})`);
      console.log(`  Horizontal Overflow: ${metrics.hasHorizontalOverflow ? 'FAIL ❌' : 'PASS ✅'}`);
    } catch (err) {
      console.error(`  Error auditing ${pageInfo.name}:`, err.message);
      report.push({ page: pageInfo.name, error: err.message });
    } finally {
      await page.close();
    }
  }

  await browser.close();

  const reportPath = path.join(__dirname, 'typography-test-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
  console.log(`\n✅ Audit complete! Full report saved to ${reportPath}`);
}

runAudit();
