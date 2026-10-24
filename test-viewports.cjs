const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const viewports = [
  { name: '320x720_mobile_small', width: 320, height: 720 },
  { name: '375x812_mobile_std', width: 375, height: 812 },
  { name: '390x858_mobile_target', width: 390, height: 858 },
  { name: '430x932_mobile_large', width: 430, height: 932 },
  { name: '768x1024_tablet_portrait', width: 768, height: 1024 },
  { name: '1024x768_tablet_landscape', width: 1024, height: 768 },
  { name: '1366x768_desktop_laptop', width: 1366, height: 768 },
  { name: '1440x900_desktop_large', width: 1440, height: 900 }
];

async function runTests() {
  const screenshotDir = path.join(__dirname, 'test-screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const results = [];

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0', timeout: 15000 });

    // Wait for hero section to be fully rendered
    await page.waitForSelector('section');

    const metrics = await page.evaluate(() => {
      const scrollWidth = document.documentElement.scrollWidth;
      const clientWidth = document.documentElement.clientWidth;
      const hasHorizontalScroll = scrollWidth > clientWidth;

      // Find hero elements
      const h1 = document.querySelector('section h1');
      const mainBanner = h1 ? h1.closest('.relative.rounded-\\[20px\\], .relative.rounded-\\[24px\\], [class*="min-h-"]') : null;
      const sideBannerLinks = document.querySelectorAll('a[href="/dat-lich-kham"], a[href="/duoc-my-pham"]');

      let h1Metrics = null;
      if (h1) {
        const rect = h1.getBoundingClientRect();
        const style = window.getComputedStyle(h1);
        h1Metrics = {
          text: h1.innerText,
          fontSize: style.fontSize,
          lineHeight: style.lineHeight,
          width: rect.width,
          height: rect.height,
          isOverflowingRight: rect.right > clientWidth,
          scrollWidth: h1.scrollWidth,
          clientWidth: h1.clientWidth
        };
      }

      let bannerMetrics = null;
      if (mainBanner) {
        const rect = mainBanner.getBoundingClientRect();
        bannerMetrics = {
          width: rect.width,
          height: rect.height,
          top: rect.top,
          bottom: rect.bottom
        };
      }

      // Check CTA buttons
      const ctaButtons = document.querySelectorAll('section a[href="/dat-lich-kham"], section a[href="/gioi-thieu"], section a[href*="/"]');
      const ctas = [];
      ctaButtons.forEach(btn => {
        if (btn.innerText && btn.innerText.trim().length > 0 && btn.closest('section') === document.querySelector('section')) {
          const r = btn.getBoundingClientRect();
          ctas.push({
            text: btn.innerText.replace(/\n/g, ' ').trim(),
            width: r.width,
            height: r.height,
            isClipped: r.right > clientWidth
          });
        }
      });

      return {
        scrollWidth,
        clientWidth,
        hasHorizontalScroll,
        h1Metrics,
        bannerMetrics,
        ctasCount: ctas.length,
        ctas: ctas.slice(0, 4)
      };
    });

    const screenshotPath = path.join(screenshotDir, `${vp.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });

    results.push({
      viewport: `${vp.width}x${vp.height} (${vp.name})`,
      hasHorizontalScroll: metrics.hasHorizontalScroll,
      scrollWidth: metrics.scrollWidth,
      clientWidth: metrics.clientWidth,
      h1OverflowRight: metrics.h1Metrics ? metrics.h1Metrics.isOverflowingRight : false,
      h1FontSize: metrics.h1Metrics ? metrics.h1Metrics.fontSize : 'N/A',
      mainBannerHeight: metrics.bannerMetrics ? metrics.bannerMetrics.height : 'N/A',
      mainBannerWidth: metrics.bannerMetrics ? metrics.bannerMetrics.width : 'N/A',
      screenshot: `${vp.name}.png`
    });

    console.log(`[PASS] ${vp.name}: width=${metrics.clientWidth}, scrollW=${metrics.scrollWidth}, noHScroll=${!metrics.hasHorizontalScroll}, h1Size=${metrics.h1Metrics?.fontSize}, bannerH=${metrics.bannerMetrics?.height}px`);
  }

  await browser.close();

  fs.writeFileSync(
    path.join(__dirname, 'test-results.json'),
    JSON.stringify(results, null, 2),
    'utf-8'
  );
  console.log('All tests completed successfully. Results saved to test-results.json');
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
