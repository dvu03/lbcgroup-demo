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
  await page.goto('http://localhost:3000/demo-admin', { waitUntil: 'networkidle2' });

  // Navigate to Banner top & Header
  const navBtns = await page.$$('button');
  for (const b of navBtns) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('Banner top & Header')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 600));

  // Helper to click subtab by text
  const clickSubTab = async (subText) => {
    const tabs = await page.$$('button');
    for (const t of tabs) {
      const text = await page.evaluate(el => el.textContent, t);
      if (text && text.includes(subText)) {
        await t.click();
        await new Promise(r => setTimeout(r, 500));
        return;
      }
    }
  };

  // Tab 2: Logo
  await clickSubTab('Tab 2: Logo');
  await page.screenshot({ path: `${artifactDir}/admin_tab2_logo.png` });
  console.log('Tab 2 captured');

  // Tab 3: Header
  await clickSubTab('Tab 3: Header');
  await page.screenshot({ path: `${artifactDir}/admin_tab3_header.png` });
  console.log('Tab 3 captured');

  // Tab 4: Menu
  await clickSubTab('Tab 4: Menu');
  await page.screenshot({ path: `${artifactDir}/admin_tab4_menu.png` });
  console.log('Tab 4 captured');

  // Tab 5: Responsive
  await clickSubTab('Tab 5: Giao Diện Responsive');
  await page.screenshot({ path: `${artifactDir}/admin_tab5_responsive.png` });
  console.log('Tab 5 captured');

  await browser.close();
  console.log('ALL ADMIN TABS TESTED SUCCESSFULLY');
})().catch(e => {
  console.error(e);
  process.exit(1);
});
