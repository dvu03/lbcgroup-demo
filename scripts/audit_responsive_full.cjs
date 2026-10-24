const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const viewports = [
  { name: '320x740', width: 320, height: 740 },
  { name: '360x800', width: 360, height: 800 },
  { name: '375x812', width: 375, height: 812 },
  { name: '390x844', width: 390, height: 844 },
  { name: '414x896', width: 414, height: 896 },
  { name: '430x932', width: 430, height: 932 },
  { name: '480x900', width: 480, height: 900 },
  { name: '768x1024', width: 768, height: 1024 },
  { name: '1024x768', width: 1024, height: 768 },
  { name: '1280x800', width: 1280, height: 800 },
  { name: '1366x768', width: 1366, height: 768 },
  { name: '1440x900', width: 1440, height: 900 },
  { name: '1920x1080', width: 1920, height: 1080 },
];

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

    console.log('=== AUDITING HOMEPAGE ACROSS ALL 13 VIEWPORTS ===');

    const results = [];

    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
      await new Promise(r => setTimeout(r, 600));

      const analysis = await page.evaluate((vpWidth) => {
        const docScrollWidth = document.documentElement.scrollWidth;
        const bodyScrollWidth = document.body.scrollWidth;
        const clientWidth = document.documentElement.clientWidth;
        const hasHorizontalScroll = docScrollWidth > clientWidth || bodyScrollWidth > clientWidth;

        // Find elements that stick out beyond viewport
        const overflowingElements = [];
        const allElements = document.querySelectorAll('*');
        for (const el of allElements) {
          if (['SCRIPT', 'STYLE', 'HEAD', 'HTML', 'BODY'].includes(el.tagName)) continue;
          
          const rect = el.getBoundingClientRect();
          if (rect.right > vpWidth + 2 && rect.width > 0) {
            // Check if element is inside an intentional horizontal scroll container or carousel with overflow hidden
            let parent = el.parentElement;
            let insideScroll = false;
            while (parent && parent !== document.body) {
              const style = window.getComputedStyle(parent);
              if (style.overflowX === 'auto' || style.overflowX === 'scroll' || style.overflow === 'hidden' || style.overflowX === 'hidden') {
                insideScroll = true;
                break;
              }
              parent = parent.parentElement;
            }

            if (!insideScroll) {
              overflowingElements.push({
                tag: el.tagName.toLowerCase(),
                className: (el.className || '').toString().slice(0, 100),
                id: el.id,
                right: Math.round(rect.right),
                width: Math.round(rect.width),
                overflowPx: Math.round(rect.right - vpWidth),
                textSnippet: (el.innerText || '').slice(0, 50).trim()
              });
            }
          }
        }

        // Section heights & grid check
        const heroSection = document.querySelector('section:has(.hero-slider), .site-main section:first-of-type');
        const heroHeight = heroSection ? Math.round(heroSection.getBoundingClientRect().height) : 0;

        return {
          clientWidth,
          docScrollWidth,
          bodyScrollWidth,
          hasHorizontalScroll,
          heroHeight,
          overflowCount: overflowingElements.length,
          topOverflowElements: overflowingElements.slice(0, 5)
        };
      }, vp.width);

      results.push({ viewport: vp.name, ...analysis });
      console.log(`[${vp.name}] clientWidth: ${analysis.clientWidth}, scrollWidth: ${analysis.docScrollWidth}, horizontalOverflow: ${analysis.hasHorizontalScroll ? 'YES (' + (analysis.docScrollWidth - analysis.clientWidth) + 'px)' : 'NO (0px)'}, uncontainedOverflows: ${analysis.overflowCount}, heroHeight: ${analysis.heroHeight}px`);

      if (analysis.overflowCount > 0) {
        console.log(`   Overflowing items:`, analysis.topOverflowElements);
      }

      // Capture screenshot for key viewports
      if (['320x740', '390x844', '414x896', '430x932', '768x1024', '1440x900'].includes(vp.name)) {
        const screenshotPath = path.join(artifactDir, `responsive_${vp.name}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: false });
        console.log(`   Captured screenshot -> responsive_${vp.name}.png`);
      }
    }

    console.log('\n=== AUDITING KEY SUBPAGES AT MOBILE (390x844) ===');
    const subpages = [
      '/dich-vu',
      '/dich-vu/tri-mun-chuan-y-khoa',
      '/cong-nghe',
      '/cong-nghe/nang-co-rf-jovena',
      '/doi-ngu-bac-si',
      '/bac-si/thac-si-bac-si-le-quang-loc',
      '/duoc-my-pham',
      '/san-pham/kem-chong-nang-bioderma-photoderm-max',
      '/tin-tuc',
      '/tin-tuc/bi-quyet-cham-soc-da-dau-mun-mua-he',
      '/dat-lich-kham',
      '/lien-he',
      '/gioi-thieu',
      '/he-thong-co-so',
      '/chinh-sach/chinh-sach-bao-mat'
    ];

    await page.setViewport({ width: 390, height: 844 });
    for (const urlPath of subpages) {
      try {
        await page.goto(`http://localhost:3000${urlPath}`, { waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 400));
        const subCheck = await page.evaluate(() => {
          const clientWidth = document.documentElement.clientWidth;
          const scrollWidth = document.documentElement.scrollWidth;
          return {
            hasHorizontalScroll: scrollWidth > clientWidth,
            diff: scrollWidth - clientWidth
          };
        });
        console.log(`Route ${urlPath.padEnd(35)}: ${subCheck.hasHorizontalScroll ? 'OVERFLOW ' + subCheck.diff + 'px' : 'OK (0px overflow)'}`);
      } catch (err) {
        console.log(`Route ${urlPath}: Error - ${err.message}`);
      }
    }

    console.log('\n=== AUDITING COMPLETED SUCCESSFULLY ===');
  } catch (err) {
    console.error('Audit script error:', err);
  } finally {
    if (browser) await browser.close();
  }
})();
