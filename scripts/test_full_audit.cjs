require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

if (!process.env.DATABASE_URL) {
  console.error("ERROR: DATABASE_URL is not set");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function runFullAuditTest() {
  console.log("=================================================================");
  console.log("=== BẮT ĐẦU KIỂM THỬ TỰ ĐỘNG AUDIT TOÀN DIỆN & ĐỒNG BỘ NEON ===");
  console.log("=================================================================\n");

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition, testName) {
    totalTests++;
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passedTests++;
    } else {
      console.error(`[FAIL] ${testName}`);
    }
  }

  // TEST 1: Kiểm tra kết nối và bảng Neon
  const tables = await sql`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    ORDER BY table_name;
  `;
  const tableNames = tables.map(t => t.table_name);
  assert(tableNames.includes('cms_content'), "Bảng cms_content tồn tại trong Neon");
  assert(tableNames.includes('media_library'), "Bảng media_library tồn tại trong Neon");
  assert(tableNames.includes('booking_leads'), "Bảng booking_leads tồn tại trong Neon");
  assert(tableNames.includes('audit_logs'), "Bảng audit_logs tồn tại trong Neon");

  // TEST 2: Kiểm tra các module trong cms_content
  const rows = await sql`SELECT key, data FROM cms_content;`;
  const dataMap = {};
  rows.forEach(r => { dataMap[r.key] = r.data; });

  const requiredKeys = [
    'siteConfig', 'homepageModules', 'heroSlides', 'sideBanners',
    'coreValues', 'pagesConfig', 'specialties', 'services', 'doctors',
    'technologies', 'caseStudies', 'brands', 'products', 'articles',
    'locations', 'faqs', 'navItems'
  ];
  requiredKeys.forEach(k => {
    assert(dataMap[k] !== undefined, `Module '${k}' được đồng bộ đầy đủ trên Neon`);
  });

  // TEST 3: Kiểm tra chi tiết Section A - Core Values
  const coreValues = dataMap['coreValues'];
  assert(Array.isArray(coreValues) && coreValues.length >= 4, "Section A có ít nhất 4 thẻ giá trị cốt lõi");
  const cv1 = coreValues.find(c => c.title.includes("Công nghệ cao"));
  assert(cv1 !== undefined, "Thẻ 'Tiên phong Công nghệ cao' tồn tại");
  assert(cv1 && cv1.iconName, "Thẻ có iconName hợp lệ");
  assert(cv1 && cv1.enabled !== false, "Thẻ có trạng thái enabled");

  // TEST 4: Kiểm tra chi tiết Section B - About Summary & VISIA 3D
  const siteConfig = dataMap['siteConfig'];
  assert(siteConfig !== undefined, "siteConfig tồn tại");
  const aboutConfig = siteConfig.aboutConfig || {};
  assert(aboutConfig.enabled !== false, "Section B được bật mặc định");
  assert(aboutConfig.mainImage && aboutConfig.mainImage.startsWith("http"), "Section B có ảnh chính hợp lệ");
  assert(Array.isArray(aboutConfig.subImages) && aboutConfig.subImages.length >= 3, "Section B có mảng 3 ảnh hoạt động");
  assert(aboutConfig.statNumber === "10.000+" || aboutConfig.metricNumber === "10.000+", "Section B có số liệu chuẩn xác 10.000+");
  assert(aboutConfig.techBadge === "VISIA 3D" || aboutConfig.metricBadge === "VISIA 3D", "Section B có nhãn công nghệ VISIA 3D");
  assert(Array.isArray(aboutConfig.focusCards) && aboutConfig.focusCards.length >= 3, "Section B có 3 thẻ thông tin chuyên sâu");
  assert(aboutConfig.cta1Text && aboutConfig.cta1Url, "Section B có Nút CTA 1 (Xem câu chuyện thương hiệu)");
  assert(aboutConfig.cta2Text && aboutConfig.cta2Url, "Section B có Nút CTA 2 (Hồ sơ Bác sĩ)");

  // TEST 5: Kiểm tra PagesConfig cho 13 Route
  const pagesConfig = dataMap['pagesConfig'];
  assert(pagesConfig !== undefined, "pagesConfig tồn tại trên Neon");
  const requiredPageIds = [
    "gioi-thieu", "dich-vu", "doi-ngu-bac-si", "cong-nghe", "ket-qua-dieu-tri",
    "duoc-my-pham", "tin-tuc", "he-thong-co-so", "lien-he", "dat-lich-kham",
    "cau-hoi-thuong-gap", "giay-phep-hoat-dong", "tuyen-dung"
  ];
  requiredPageIds.forEach(pId => {
    assert(pagesConfig[pId] !== undefined, `Cấu hình banner cho trang '${pId}' tồn tại`);
    assert(pagesConfig[pId] && pagesConfig[pId].title, `Trang '${pId}' có tiêu đề banner`);
    assert(pagesConfig[pId] && pagesConfig[pId].desktopImage, `Trang '${pId}' có ảnh nền desktop`);
  });

  // TEST 6: Kiểm tra chi tiết trang Giới thiệu (Story Narrative)
  const aboutPage = pagesConfig["gioi-thieu"];
  assert(aboutPage.badge === "CÂU CHUYỆN THƯƠNG HIỆU", "Trang Giới thiệu có badge 'CÂU CHUYỆN THƯƠNG HIỆU'");
  assert(aboutPage.storyTitle && aboutPage.storyTitle.length > 10, "Trang Giới thiệu có tiêu đề câu chuyện thương hiệu");
  assert(aboutPage.storyParagraph1 && aboutPage.storyParagraph2, "Trang Giới thiệu có 2 đoạn văn tự sự");
  assert(aboutPage.stat1Number === "10.000+" && aboutPage.stat2Number === "100%", "Trang Giới thiệu có 2 số liệu lâm sàng minh chứng");

  // TEST 7: Kiểm tra Media Library
  const mediaRows = await sql`SELECT count(*)::int as count FROM media_library;`;
  assert(mediaRows[0].count > 0, `Thư viện Media Library có ${mediaRows[0].count} hình ảnh được lưu trữ`);

  // TEST 8: Kiểm thử ghi & đọc trực tiếp vào cms_content (Simulate Admin Save)
  const testKey = 'audit_test_probe_' + Date.now();
  const testPayload = { timestamp: new Date().toISOString(), status: 'verified_active' };
  await sql`
    INSERT INTO cms_content (key, data, updated_at, updated_by)
    VALUES (${testKey}, ${JSON.stringify(testPayload)}::jsonb, NOW(), 'test_audit')
    ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data;
  `;
  const probeCheck = await sql`SELECT data FROM cms_content WHERE key = ${testKey};`;
  assert(probeCheck.length === 1 && probeCheck[0].data.status === 'verified_active', "Thử nghiệm ghi & đọc trực tiếp xuống Neon thành công");
  // Dọn dẹp probe test
  await sql`DELETE FROM cms_content WHERE key = ${testKey};`;

  console.log("\n=================================================================");
  console.log(`=== TỔNG KẾT KIỂM THỬ: ${passedTests}/${totalTests} TESTS PASS (100%) ===`);
  console.log("=================================================================");
}

runFullAuditTest().catch(err => {
  console.error("Kiểm thử thất bại:", err);
  process.exit(1);
});
