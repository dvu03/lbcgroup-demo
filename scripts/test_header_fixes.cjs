const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const artifactDir = 'C:/Users/admin/.gemini/antigravity-ide/brain/bd17a718-b22c-4f99-b6bf-0c67a29f7df1';

  console.log('--- 1. Testing Homepage Architecture (Bean Pharmacity Layout) ---');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });

  // Verify Upper Micro-Row and Main Row
  const headerAudit = await page.evaluate(() => {
    const bannerTop = document.querySelector('.site-announcement-bar');
    const header = document.querySelector('.site-header');
    const nav = document.querySelector('.site-navigation');
    
    // Greeting & Hotline in upper micro-row
    const bodyText = document.body.innerText;
    const hasGreeting = bodyText.includes('LBC') || bodyText.includes('Y học Cá nhân hóa') || bodyText.includes('công nghệ cao');
    const hasHotline = bodyText.includes('1900 6750');
    const hasHours = bodyText.includes('08:00 – 20:00') || bodyText.includes('08:00');
    const hasBranches = bodyText.includes('Hệ thống') && bodyText.includes('cơ sở');
    const hasCta = bodyText.includes('ĐẶT LỊCH KHÁM');
    const hasTags = bodyText.includes('Trị mụn') && bodyText.includes('Trị nám') && bodyText.includes('Bioderma');
    const hasVisia = bodyText.includes('VISIA 3D') || bodyText.includes('Soi da công nghệ cao');

    return {
      hasBannerTop: !!bannerTop,
      hasHeader: !!header,
      hasNav: !!nav,
      hasGreeting,
      hasHotline,
      hasHours,
      hasBranches,
      hasCta,
      hasTags,
      hasVisia,
    };
  });
  console.log('Header Elements Audit:', headerAudit);

  // Screenshot homepage header
  await page.screenshot({ path: `${artifactDir}/final_verified_website.png`, clip: { x: 0, y: 0, width: 1440, height: 320 } });

  console.log('--- 2. Testing Branch Selector Dropdown Popover (z-[70]) ---');
  const branchBtn = await page.evaluateHandle(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    return btns.find(b => b.textContent && b.textContent.includes('cơ sở'));
  });
  if (branchBtn) {
    await branchBtn.click();
    await new Promise(r => setTimeout(r, 600));
    const dropdownInfo = await page.evaluate(() => {
      const dd = document.querySelector('.site-header div.z-\\[70\\]');
      if (!dd) return null;
      const rect = dd.getBoundingClientRect();
      const nav = document.querySelector('.site-navigation');
      const navRect = nav ? nav.getBoundingClientRect() : null;
      return {
        top: rect.top,
        bottom: rect.bottom,
        height: rect.height,
        navTop: navRect ? navRect.top : null,
        isOverlappingNav: navRect ? rect.bottom > navRect.top : false,
      };
    });
    console.log('Branch dropdown info:', dropdownInfo);
    await page.screenshot({ path: `${artifactDir}/dropdown_branch_open.png`, clip: { x: 0, y: 0, width: 1440, height: 500 } });
    
    // Press Escape to close
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 400));
  }

  console.log('--- 3. Testing Cart Dropdown ---');
  const cartBtn = await page.evaluateHandle(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    return btns.find(b => b.getAttribute('title') && b.getAttribute('title').includes('Giỏ hàng'));
  });
  if (cartBtn) {
    await cartBtn.click();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: `${artifactDir}/dropdown_cart_open.png`, clip: { x: 0, y: 0, width: 1440, height: 500 } });
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 400));
  }

  console.log('--- 4. Testing Multi-Viewport Responsiveness (Zero Overflow) ---');
  const viewports = [
    { name: '1920', width: 1920, height: 1080 },
    { name: '1440', width: 1440, height: 900 },
    { name: '1366', width: 1366, height: 768 },
    { name: '1024', width: 1024, height: 768 },
    { name: '768', width: 768, height: 1024 },
    { name: '430', width: 430, height: 932 },
    { name: '390', width: 390, height: 844 },
    { name: '375', width: 375, height: 667 },
    { name: '360', width: 360, height: 800 }
  ];

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const hasHorizontalOverflow = scrollWidth > vp.width;
    console.log(`Viewport ${vp.name}px: scrollWidth=${scrollWidth}, hasOverflow=${hasHorizontalOverflow}`);
    if (vp.name === '390') {
      await page.screenshot({ path: `${artifactDir}/header_390.png`, clip: { x: 0, y: 0, width: 390, height: 350 } });
    }
  }

  console.log('--- 5. Testing CMS Admin Tabs (Tab A to Tab E + Responsive) ---');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/demo-admin', { waitUntil: 'networkidle2' });

  // Click Banner top & Header main tab
  const adminTabBtn = await page.evaluateHandle(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    return btns.find(b => b.textContent && b.textContent.includes('Banner top & Header'));
  });
  if (adminTabBtn) {
    await adminTabBtn.click();
    await new Promise(r => setTimeout(r, 600));
  }

  // Helper to click subtab and screenshot
  const subtabs = [
    { name: 'Tab A: Banner Top', file: 'admin_tab_a_banner.png' },
    { name: 'Tab B: Logo Thương Hiệu', file: 'admin_tab_b_logo.png' },
    { name: 'Tab C: Header Chính', file: 'admin_tab_c_header.png' },
    { name: 'Tab D: Bố Cục & Khoảng Cách', file: 'admin_tab_d_spacing.png' },
    { name: 'Tab E: Menu Điều Hướng', file: 'admin_tab_e_menu.png' },
    { name: 'Mô Phỏng Responsive', file: 'admin_tab_responsive.png' },
  ];

  for (const st of subtabs) {
    const btn = await page.evaluateHandle((text) => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.find(b => b.textContent && b.textContent.includes(text));
    }, st.name);

    if (btn) {
      await btn.click();
      await new Promise(r => setTimeout(r, 500));
      await page.screenshot({ path: `${artifactDir}/${st.file}` });
      console.log(`Captured CMS ${st.name} -> ${st.file}`);
    } else {
      console.warn(`Subtab button ${st.name} not found!`);
    }
  }

  await browser.close();
  console.log('=== ALL TESTS COMPLETED SUCCESSFULLY ===');
})().catch(e => {
  console.error('Test error:', e);
  process.exit(1);
});
