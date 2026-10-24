require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

if (!process.env.DATABASE_URL) {
  console.error("ERROR: DATABASE_URL is not set");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function runMigration() {
  console.log("=== BẮT ĐẦU TẠO SCHEMA VÀ KHỞI TẠO NEON POSTGRESQL ===");

  // 1. Tạo các bảng an toàn
  await sql`
    CREATE TABLE IF NOT EXISTS cms_content (
      key VARCHAR(64) PRIMARY KEY,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      updated_by VARCHAR(100) DEFAULT 'system'
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS media_library (
      id VARCHAR(100) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      url TEXT NOT NULL,
      type VARCHAR(30) NOT NULL DEFAULT 'image',
      mime_type VARCHAR(100),
      size_bytes INTEGER DEFAULT 0,
      width INTEGER,
      height INTEGER,
      alt_text TEXT,
      caption TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      is_external BOOLEAN DEFAULT false
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS booking_leads (
      id VARCHAR(100) PRIMARY KEY,
      full_name VARCHAR(200) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      facility VARCHAR(100),
      service_interest VARCHAR(200),
      preferred_datetime VARCHAR(100),
      notes TEXT,
      consent_agreed BOOLEAN DEFAULT true,
      status VARCHAR(30) DEFAULT 'new',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id VARCHAR(100) PRIMARY KEY,
      timestamp TIMESTAMPTZ DEFAULT NOW(),
      module VARCHAR(100) NOT NULL,
      action VARCHAR(50) NOT NULL,
      record_title VARCHAR(255),
      details TEXT,
      author VARCHAR(100) DEFAULT 'Admin Ban Giám đốc'
    );
  `;

  console.log("✓ Đã tạo thành công 4 bảng: cms_content, media_library, booking_leads, audit_logs");

  // 2. Nạp dữ liệu ban đầu từ local dump vào cms_content
  const dumpPath = path.join(__dirname, 'current_localstorage_dump.json');
  if (fs.existsSync(dumpPath)) {
    const rawDump = JSON.parse(fs.readFileSync(dumpPath, 'utf8'));
    
    // Mapping keys from LBC_DEMO_* to clean keys
    const contentKeys = [
      { localKey: 'LBC_DEMO_siteConfig', dbKey: 'siteConfig' },
      { localKey: 'LBC_DEMO_homepageModules', dbKey: 'homepageModules' },
      { localKey: 'LBC_DEMO_heroSlides', dbKey: 'heroSlides' },
      { localKey: 'LBC_DEMO_sideBanners', dbKey: 'sideBanners' },
      { localKey: 'LBC_DEMO_coreValues', dbKey: 'coreValues' },
      { localKey: 'LBC_DEMO_specialties', dbKey: 'specialties' },
      { localKey: 'LBC_DEMO_services', dbKey: 'services' },
      { localKey: 'LBC_DEMO_doctors', dbKey: 'doctors' },
      { localKey: 'LBC_DEMO_technologies', dbKey: 'technologies' },
      { localKey: 'LBC_DEMO_caseStudies', dbKey: 'caseStudies' },
      { localKey: 'LBC_DEMO_brands', dbKey: 'brands' },
      { localKey: 'LBC_DEMO_products', dbKey: 'products' },
      { localKey: 'LBC_DEMO_articles', dbKey: 'articles' },
      { localKey: 'LBC_DEMO_locations', dbKey: 'locations' },
      { localKey: 'LBC_DEMO_faqs', dbKey: 'faqs' },
      { localKey: 'LBC_DEMO_navItems', dbKey: 'navItems' }
    ];

    for (const item of contentKeys) {
      if (rawDump[item.localKey]) {
        const jsonStr = JSON.stringify(rawDump[item.localKey]);
        await sql`
          INSERT INTO cms_content (key, data, updated_at, updated_by)
          VALUES (${item.dbKey}, ${jsonStr}::jsonb, NOW(), 'initial_migration')
          ON CONFLICT (key) DO UPDATE
          SET data = EXCLUDED.data, updated_at = NOW(), updated_by = 'initial_migration';
        `;
        console.log(`  + Seeded cms_content [${item.dbKey}]`);
      }
    }
  }

  // 3. Nạp hạt giống media_library
  const mediaSeed = [
    {
      id: "med-logo-header",
      name: "Logo LBC Brand Header",
      url: "/images/logo.svg",
      type: "image",
      mime_type: "image/svg+xml",
      size_bytes: 1420,
      alt_text: "Logo Phòng khám Da liễu Lạc's Beauty Center",
      is_external: true
    },
    {
      id: "med-logo-white",
      name: "Logo LBC Brand White",
      url: "/images/logo-white.svg",
      type: "image",
      mime_type: "image/svg+xml",
      size_bytes: 1420,
      alt_text: "Logo Trắng Lạc's Beauty Center",
      is_external: true
    },
    {
      id: "med-doc-01",
      name: "Chân dung ThS.BS. Lạc Kim Ngân",
      url: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=1200&q=80",
      type: "image",
      mime_type: "image/jpeg",
      size_bytes: 345000,
      alt_text: "Chân dung Thạc sĩ Bác sĩ Lạc Kim Ngân",
      is_external: true
    },
    {
      id: "med-doc-02",
      name: "Chân dung BSCKI. Nguyễn Văn An",
      url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80",
      type: "image",
      mime_type: "image/jpeg",
      size_bytes: 320000,
      alt_text: "Chân dung BSCKI Nguyễn Văn An",
      is_external: true
    },
    {
      id: "med-doc-03",
      name: "Chân dung ThS.BS. Trần Thị Bích Thảo",
      url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80",
      type: "image",
      mime_type: "image/jpeg",
      size_bytes: 310000,
      alt_text: "Chân dung ThS.BS Trần Thị Bích Thảo",
      is_external: true
    },
    {
      id: "med-doc-04",
      name: "Chân dung BSCKII. Lê Hoàng Nam",
      url: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=1200&q=80",
      type: "image",
      mime_type: "image/jpeg",
      size_bytes: 380000,
      alt_text: "Chân dung BSCKII Lê Hoàng Nam",
      is_external: true
    }
  ];

  for (const m of mediaSeed) {
    await sql`
      INSERT INTO media_library (id, name, url, type, mime_type, size_bytes, alt_text, is_external)
      VALUES (${m.id}, ${m.name}, ${m.url}, ${m.type}, ${m.mime_type}, ${m.size_bytes}, ${m.alt_text}, ${m.is_external})
      ON CONFLICT (id) DO NOTHING;
    `;
  }
  console.log(`✓ Seeded ${mediaSeed.length} media items vào media_library`);

  // 4. Kiểm tra và đối chiếu số lượng bản ghi
  const contentCount = await sql`SELECT count(*)::int as count FROM cms_content;`;
  const mediaCount = await sql`SELECT count(*)::int as count FROM media_library;`;
  const leadsCount = await sql`SELECT count(*)::int as count FROM booking_leads;`;

  console.log("\n=== KẾT QUẢ ĐỐI SOÁT SAU KHI SEED DỮ LIỆU ===");
  console.log(`cms_content: ${contentCount[0].count} modules`);
  console.log(`media_library: ${mediaCount[0].count} media files`);
  console.log(`booking_leads: ${leadsCount[0].count} leads`);
  console.log("Migration hoàn thành 100%!");
}

runMigration().catch(err => {
  console.error("Migration LỖI:", err);
  process.exit(1);
});
