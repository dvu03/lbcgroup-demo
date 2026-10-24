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

  // Click on Banner top & Header sidebar button
  const navBtns = await page.$$('button');
  for (const b of navBtns) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('Banner top & Header')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 600));

  // Edit banner message
  const inputs = await page.$$('input[type="text"]');
  // First banner message input
  for (const inp of inputs) {
    const val = await page.evaluate(el => el.value, inp);
    if (val && val.includes('VISIA 3D')) {
      await inp.click({ clickCount: 3 });
      await inp.type('LBC — Trung Tâm Thẩm Mỹ Công Nghệ Cao Số 1 Miền Tây');
      break;
    }
  }

  // Click Save
  const buttons = await page.$$('button');
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('LƯU CẤU HÌNH')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1000));

  // Verify on main website
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
  const bannerText = await page.$eval('.site-announcement', el => el.textContent);
  console.log('Main website banner text:', bannerText.trim());

  if (!bannerText.includes('LBC — Trung Tâm Thẩm Mỹ Công Nghệ Cao Số 1 Miền Tây')) {
    throw new Error('Banner text did not update on website!');
  }

  // Test reload persistence
  await page.reload({ waitUntil: 'networkidle2' });
  const reloadedText = await page.$eval('.site-announcement', el => el.textContent);
  console.log('After reload banner text:', reloadedText.trim());

  if (!reloadedText.includes('LBC — Trung Tâm Thẩm Mỹ Công Nghệ Cao Số 1 Miền Tây')) {
    throw new Error('Changes did not persist across reload!');
  }

  // Restore defaults
  await page.goto('http://localhost:3000/demo-admin', { waitUntil: 'networkidle2' });
  for (const b of await page.$$('button')) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('Banner top & Header')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 600));

  // Handle confirm dialog
  page.on('dialog', async dialog => {
    await dialog.accept();
  });

  for (const b of await page.$$('button')) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('Mặc định')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 800));

  // Verify restored default on website
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
  const restoredText = await page.$eval('.site-announcement', el => el.textContent);
  console.log('Restored default banner text:', restoredText.trim());

  await page.screenshot({ path: `${artifactDir}/final_verified_website.png`, clip: { x: 0, y: 0, width: 1440, height: 350 } });

  await browser.close();
  console.log('END-TO-END CMS PERSISTENCE TEST PASSED PERFECTLY!');
})().catch(e => {
  console.error(e);
  process.exit(1);
});
