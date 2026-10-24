const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });

  // Read current localStorage
  const initialStorage = await page.evaluate(() => localStorage.getItem('LBC_DEMO_siteConfig'));
  console.log('Initial storage exists:', !!initialStorage);

  // Set showBrandNameText: false and showFacilitySubtitle: false
  await page.evaluate(() => {
    const item = localStorage.getItem('LBC_DEMO_siteConfig');
    const parsed = item ? JSON.parse(item) : {};
    parsed.headerMainConfig = {
      ...(parsed.headerMainConfig || {}),
      showBrandNameText: false,
      showFacilitySubtitle: false
    };
    localStorage.setItem('LBC_DEMO_siteConfig', JSON.stringify(parsed));
  });

  // Reload
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Inspect brand link
  const brandInfo = await page.evaluate(() => {
    const brandLink = document.querySelector('.site-header-tier-1 a[aria-label]');
    if (!brandLink) return 'No brand link found';
    return {
      innerHTML: brandLink.innerHTML,
      childrenCount: brandLink.children.length,
      childrenTags: Array.from(brandLink.children).map(c => c.tagName + '.' + c.className),
      hasFlexCol: !!brandLink.querySelector('.flex.flex-col'),
      brandLinkWidth: brandLink.getBoundingClientRect().width,
    };
  });
  console.log('Brand info with text disabled:', brandInfo);

  const artifactDir = 'C:/Users/admin/.gemini/antigravity-ide/brain/bd17a718-b22c-4f99-b6bf-0c67a29f7df1';
  await page.screenshot({
    path: `${artifactDir}/header_logo_only_no_text.png`,
    clip: { x: 0, y: 0, width: 1440, height: 260 }
  });
  console.log('Saved header_logo_only_no_text.png');

  // Reset back to true
  await page.evaluate(() => {
    const item = localStorage.getItem('LBC_DEMO_siteConfig');
    if (item) {
      const parsed = JSON.parse(item);
      parsed.headerMainConfig = {
        ...(parsed.headerMainConfig || {}),
        showBrandNameText: true,
        showFacilitySubtitle: true
      };
      localStorage.setItem('LBC_DEMO_siteConfig', JSON.stringify(parsed));
    }
  });

  await browser.close();
})();
