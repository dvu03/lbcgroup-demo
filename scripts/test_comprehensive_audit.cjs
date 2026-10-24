const puppeteer = require('puppeteer-core');

(async () => {
  let browser;
  try {
    console.log('🚀 Starting Comprehensive Audit & E2E Verification of LBC Website & CMS...');
    browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    // -------------------------------------------------------------
    // TEST 1: Homepage Client Full Verification (Mục 0 - Mục 16)
    // -------------------------------------------------------------
    console.log('\n--- TEST 1: Auditing Homepage Modules (Mục 0 - Mục 16) ---');
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });

    const auditHomepage = await page.evaluate(() => {
      // 0. Banner Top
      const bannerTop = document.querySelector('a[href*="dat-lich-kham"], div');
      const bannerText = document.body.innerText.includes('VISIA 3D') || document.body.innerText.includes('Soi da công nghệ cao');

      // 1. Header
      const brandLogo = document.querySelector('header img, header a[href="/"]');
      const ctaButton = Array.from(document.querySelectorAll('a, button')).find(el => el.textContent.includes('ĐẶT LỊCH KHÁM'));
      const searchBox = document.querySelector('input[type="text"], input[type="search"]');

      // 2. Navigation items
      const navLinks = Array.from(document.querySelectorAll('nav a, header nav a')).map(a => ({
        text: a.textContent.trim(),
        href: a.getAttribute('href')
      })).filter(n => n.text.length > 0 && n.text.length < 40);

      // 10. Before After link
      const beforeAfterLink = Array.from(document.querySelectorAll('a')).find(a => 
        a.getAttribute('href') === '/ket-qua-dieu-tri' || a.textContent.includes('Xem kết quả điều trị')
      );

      // 11. Brands Section
      const brandBadges = Array.from(document.querySelectorAll('span')).filter(s => s.textContent.includes('Phân phối chính hãng'));

      // 12. Featured Products
      const productSectionTitle = Array.from(document.querySelectorAll('h2, h3, span')).find(el => el.textContent.includes('Sản phẩm tiêu biểu'));

      // 14. Customer Utilities
      const utilityLinks = Array.from(document.querySelectorAll('section a')).filter(a => {
        const href = a.getAttribute('href');
        return href && (href.includes('dat-lich-kham') || href.includes('cau-hoi-thuong-gap') || href.includes('he-thong-co-so'));
      });

      // 15. Footer
      const footerLegal = document.body.innerText.includes('CÔNG TY TNHH VIỆN CHĂM SÓC DA LẠC\'S BEAUTY CENTER');
      const footerBoCongThuong = document.body.innerText.includes('Đã thông báo Bộ Công Thương');

      // 16. Floating Contact
      const floatingContainer = document.querySelector('div.fixed.bottom-6.right-6');
      const mobileBar = document.querySelector('div.fixed.bottom-0');

      return {
        hasBannerTop: !!bannerText,
        hasBrandLogo: !!brandLogo,
        hasCtaButton: !!ctaButton,
        hasSearchBox: !!searchBox,
        navCount: navLinks.length,
        hasBeforeAfterLink: !!beforeAfterLink,
        beforeAfterHref: beforeAfterLink ? beforeAfterLink.getAttribute('href') : null,
        brandBadgesCount: brandBadges.length,
        hasProductSection: !!productSectionTitle,
        utilityCount: utilityLinks.length,
        hasFooterLegal: footerLegal,
        hasFooterBCT: footerBoCongThuong,
        hasFloatingDesktop: !!floatingContainer,
        hasMobileBottomBar: !!mobileBar
      };
    });

    console.log('Homepage Audit Results:', JSON.stringify(auditHomepage, null, 2));

    // -------------------------------------------------------------
    // TEST 2: Direct routes verification
    // -------------------------------------------------------------
    console.log('\n--- TEST 2: Direct Service & Results Routes ---');
    
    // Service 1: /dieu-tri-mun
    await page.goto('http://localhost:3000/dieu-tri-mun', { waitUntil: 'networkidle2' });
    const srvMun = await page.evaluate(() => ({
      title: document.title,
      heading: document.querySelector('h1')?.textContent.trim()
    }));
    console.log('Route /dieu-tri-mun:', srvMun);

    // Results Route: /ket-qua-dieu-tri
    await page.goto('http://localhost:3000/ket-qua-dieu-tri', { waitUntil: 'networkidle2' });
    const resultsPage = await page.evaluate(() => ({
      title: document.title,
      heading: document.querySelector('h1')?.textContent.trim()
    }));
    console.log('Route /ket-qua-dieu-tri:', resultsPage);

    // Redirect test: /before-after -> should navigate to /ket-qua-dieu-tri
    await page.goto('http://localhost:3000/before-after', { waitUntil: 'networkidle2' });
    const redirectedUrl = page.url();
    console.log('Route /before-after redirects to:', redirectedUrl);

    // -------------------------------------------------------------
    // TEST 3: CMS Editing & Full Client Sync (Mục 5 & Mục 17)
    // -------------------------------------------------------------
    console.log('\n--- TEST 3: CMS Editing & Persistence Test ---');
    await page.goto('http://localhost:3000/demo-admin', { waitUntil: 'networkidle2' });

    // Step 1: Click "Logo & Nhận diện" in Admin Sidebar
    const sidebarBrandingClicked = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('aside button, [class*="select-none"] button'));
      const brandingBtn = items.find(b => b.textContent.includes('Logo & Nhận diện'));
      if (brandingBtn) {
        brandingBtn.click();
        return true;
      }
      return false;
    });
    console.log('Clicked Sidebar "Logo & Nhận diện":', sidebarBrandingClicked);
    await new Promise(r => setTimeout(r, 800));

    // Step 2: Navigate to Subtab 5: Popup & Liên Hệ Nổi
    const subTabClicked = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const popupTabBtn = btns.find(b => b.textContent.includes('Popup & Liên Hệ Nổi'));
      if (popupTabBtn) {
        popupTabBtn.click();
        return true;
      }
      return false;
    });
    console.log('Clicked SubTab 5 (Popup & Liên Hệ Nổi):', subTabClicked);
    await new Promise(r => setTimeout(r, 600));

    // Update About Section Metric & Toggle Popup Banner
    const updatedValues = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input'));
      
      // Metric Number input
      const metricInput = inputs.find(i => i.placeholder && i.placeholder.includes('10.000+'));
      if (metricInput) {
        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        setter.call(metricInput, '15.000+ Ca Thành Công');
        metricInput.dispatchEvent(new Event('input', { bubbles: true }));
        metricInput.dispatchEvent(new Event('change', { bubbles: true }));
      }

      // Popup Banner checkbox toggle
      const popupCheckbox = inputs.find(i => i.type === 'checkbox');
      let toggled = false;
      if (popupCheckbox && !popupCheckbox.checked) {
        popupCheckbox.click();
        toggled = true;
      }

      // Submit Form
      const saveBtn = document.querySelector('form button[type="submit"]');
      if (saveBtn) {
        saveBtn.click();
      }

      return {
        metricUpdated: !!metricInput,
        popupToggled: toggled
      };
    });
    console.log('Updated CMS Form Fields:', updatedValues);
    await new Promise(r => setTimeout(r, 1500));

    // -------------------------------------------------------------
    // TEST 4: Verify Client Displays Updated Data
    // -------------------------------------------------------------
    console.log('\n--- TEST 4: Verifying Updated Data on Client Homepage ---');
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1500));

    const clientVerification = await page.evaluate(() => {
      // Check About Metric
      const pageText = document.body.innerText;
      const hasUpdatedMetric = pageText.includes('15.000+ Ca Thành Công');

      // Check Popup Banner rendered
      const popupModal = document.querySelector('[role="dialog"]');
      const popupTitle = popupModal ? popupModal.querySelector('h3')?.textContent.trim() : null;

      return {
        hasUpdatedMetric,
        hasPopupModal: !!popupModal,
        popupTitle
      };
    });
    console.log('Client Live Verification:', clientVerification);

    // -------------------------------------------------------------
    // TEST 5: Reload Client and Check Data Persistence
    // -------------------------------------------------------------
    console.log('\n--- TEST 5: Reload Client Page & Check Persistence ---');
    await page.reload({ waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1000));

    const reloadedVerification = await page.evaluate(() => {
      const pageText = document.body.innerText;
      return {
        metricPersisted: pageText.includes('15.000+ Ca Thành Công')
      };
    });
    console.log('Data Persistence After Reload:', reloadedVerification);

    console.log('\n✅ ALL AUDIT TESTS COMPLETED SUCCESSFULLY!');
  } catch (err) {
    console.error('❌ Audit Test Error:', err);
  } finally {
    if (browser) await browser.close();
  }
})();
