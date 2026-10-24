const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    console.log('Navigating to http://localhost:3000/...');
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1000));

    // Scroll to the technologies section
    const bannerInfo = await page.evaluate(() => {
      const heading = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes("Công nghệ cao tại Lạc's"));
      if (!heading) return null;
      
      const section = heading.closest('section');
      if (section) section.scrollIntoView({ behavior: 'instant', block: 'center' });

      const banners = Array.from(section.querySelectorAll('a[href*="/cong-nghe/"]')).map(a => ({
        href: a.getAttribute('href'),
        title: a.querySelector('h3')?.textContent.trim()
      }));

      const dots = section.querySelectorAll('button[aria-label*="banner"]').length;

      return {
        hasHeading: true,
        headingText: heading.textContent.trim(),
        bannersCount: banners.length,
        banners,
        dotsCount: dots
      };
    });

    console.log('Banner 2 Audit Info:', JSON.stringify(bannerInfo, null, 2));

    await new Promise(r => setTimeout(r, 600));

    // Take a screenshot of the section
    const artifactPath = path.resolve('C:/Users/admin/.gemini/antigravity-ide/brain/bd17a718-b22c-4f99-b6bf-0c67a29f7df1/banner2_cong_nghe_slide.png');
    await page.screenshot({ path: artifactPath, fullPage: false });
    console.log('Screenshot saved to:', artifactPath);

    // Test sliding next button
    await page.evaluate(() => {
      const nextBtn = document.querySelector('button[aria-label*="tiếp theo"]');
      if (nextBtn) nextBtn.click();
    });
    await new Promise(r => setTimeout(r, 800));

    const slide2Title = await page.evaluate(() => {
      const h = Array.from(document.querySelectorAll('h2')).find(el => el.textContent.includes("Công nghệ cao tại Lạc's"));
      const section = h.closest('section');
      const activeSlide = section.querySelector('div[style*="translateX"]');
      return activeSlide ? activeSlide.getAttribute('style') : null;
    });
    console.log('Slide 2 style after click next:', slide2Title);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    if (browser) await browser.close();
  }
})();
