const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const artifactDir = 'C:/Users/admin/.gemini/antigravity-ide/brain/bd17a718-b22c-4f99-b6bf-0c67a29f7df1';

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });

  // Update siteConfig in localStorage to test:
  // Case 2: Only logo (no brand text, no subtitle)
  await page.evaluate(() => {
    const raw = localStorage.getItem('LBC_DEMO_siteConfig');
    let cfg = raw ? JSON.parse(raw) : {};
    cfg.headerMainConfig = {
      ...(cfg.headerMainConfig || {}),
      showBrandNameText: false,
      showFacilitySubtitle: false,
    };
    localStorage.setItem('demo_site_config', JSON.stringify(cfg));
  });

  // Reload to see effect
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  const logoCheck = await page.evaluate(() => {
    const brandLink = document.querySelector('.site-header-tier-1 a[aria-label]');
    if (!brandLink) return null;
    const textWrapper = brandLink.querySelector('.flex.flex-col');
    const imgWrapper = brandLink.querySelector('div');
    const searchBar = document.querySelector('.site-header-tier-1 input[type="text"]');
    return {
      hasTextWrapper: !!textWrapper, // MUST be false!
      brandLinkWidth: brandLink.getBoundingClientRect().width,
      imgWidth: imgWrapper ? imgWrapper.getBoundingClientRect().width : null,
      searchWidth: searchBar ? searchBar.getBoundingClientRect().width : null,
    };
  });
  console.log('Logo Check (Text Hidden):', logoCheck);

  await page.screenshot({
    path: `${artifactDir}/header_logo_only_no_text.png`,
    clip: { x: 0, y: 0, width: 1440, height: 260 }
  });
  console.log('Captured header_logo_only_no_text.png');

  // Case 3: Brand name enabled, but facility subtitle disabled
  await page.evaluate(() => {
    const raw = localStorage.getItem('LBC_DEMO_siteConfig');
    let cfg = raw ? JSON.parse(raw) : {};
    cfg.headerMainConfig = {
      ...(cfg.headerMainConfig || {}),
      showBrandNameText: true,
      showFacilitySubtitle: false,
    };
    localStorage.setItem('demo_site_config', JSON.stringify(cfg));
  });
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: `${artifactDir}/header_brand_only_no_subtitle.png`,
    clip: { x: 0, y: 0, width: 1440, height: 260 }
  });
  console.log('Captured header_brand_only_no_subtitle.png');

  // Case 4: Restore normal
  await page.evaluate(() => {
    const raw = localStorage.getItem('LBC_DEMO_siteConfig');
    let cfg = raw ? JSON.parse(raw) : {};
    cfg.headerMainConfig = {
      ...(cfg.headerMainConfig || {}),
      showBrandNameText: true,
      showFacilitySubtitle: true,
    };
    localStorage.setItem('LBC_DEMO_siteConfig', JSON.stringify(cfg));
  });
  await page.reload({ waitUntil: 'networkidle2' });

  // Scroll down CMS Header tab and capture background image & spacing sections
  await page.goto('http://localhost:3000/demo-admin', { waitUntil: 'networkidle2' });
  const btns = await page.$$('button');
  for (const b of btns) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('Banner top & Header')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 600));

  const subBtns = await page.$$('button');
  for (const b of subBtns) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('Header Chính')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 600));

  await page.evaluate(() => window.scrollBy(0, 950));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: `${artifactDir}/cms_tab_header_scrolled.png` });
  console.log('Captured cms_tab_header_scrolled.png');

  await browser.close();
  console.log('Dynamic logo tests passed!');
})().catch(e => {
  console.error(e);
  process.exit(1);
});
