require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

if (!process.env.DATABASE_URL) {
  console.error("Missing DATABASE_URL");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

const initialProductCategories = [
  {
    id: 'lam-sach',
    name: 'Làm sạch – tẩy trang',
    slug: 'lam-sach-tay-trang',
    description: 'Sữa rửa mặt sinh học, nước tẩy trang dịu nhẹ cho mọi loại da nhạy cảm.',
    iconName: 'Droplets',
    iconUrl: '',
    order: 1
  },
  {
    id: 'dac-tri-mun',
    name: 'Đặc trị mụn',
    slug: 'dac-tri-mun',
    description: 'Tinh chất chấm mụn, kem giảm viêm gom cồi chuẩn y khoa lâm sàng.',
    iconName: 'ShieldAlert',
    iconUrl: '',
    order: 2
  },
  {
    id: 'phuc-hoi-duong-am',
    name: 'Phục hồi – dưỡng ẩm',
    slug: 'phuc-hoi-duong-am',
    description: 'Kem dưỡng ẩm phục hồi hàng rào bảo vệ da sau xâm lấn và treatment.',
    iconName: 'HeartHandshake',
    iconUrl: '',
    order: 3
  },
  {
    id: 'chong-nang',
    name: 'Chống nắng bảo vệ',
    slug: 'chong-nang-bao-ve',
    description: 'Kem chống nắng phổ rộng quang phổ rộng UVA/UVB/HEV không gây bít tắc.',
    iconName: 'SunMedium',
    iconUrl: '',
    order: 4
  },
  {
    id: 'sang-da-mo-tham',
    name: 'Sáng da – mờ thâm',
    slug: 'sang-da-mo-tham',
    description: 'Serum dưỡng sáng, mờ thâm sau mụn và ức chế hình thành sắc tố nám.',
    iconName: 'Sparkles',
    iconUrl: '',
    order: 5
  }
];

const defaultBackToTop = {
  enabled: true,
  iconName: 'ArrowUp',
  iconUrl: '',
  position: 'bottom-right',
  bottomOffsetDesktop: 96,
  bottomOffsetMobile: 76,
  size: 'md',
  backgroundColor: '#0E7C86',
  hoverBackgroundColor: '#0A5C63',
  iconColor: '#FFFFFF',
  borderRadius: 'full',
  scrollThreshold: 300
};

(async () => {
  try {
    console.log("=== SEEDING ICONS & CATEGORIES TO NEON DB ===");

    // 1. Check & Seed productCategories
    const existingCats = await sql`SELECT data FROM cms_content WHERE key = 'productCategories'`;
    if (existingCats.length === 0) {
      console.log("- Seeding initial productCategories (5 categories)...");
      await sql`
        INSERT INTO cms_content (key, data, updated_at)
        VALUES ('productCategories', ${JSON.stringify(initialProductCategories)}::jsonb, NOW())
      `;
      console.log("  -> Inserted productCategories successfully!");
    } else {
      console.log(`- productCategories already exists (${existingCats[0].data.length} items). Preserving.`);
    }

    // 2. Update siteConfig to include backToTop if missing
    const siteConfigRes = await sql`SELECT data FROM cms_content WHERE key = 'siteConfig'`;
    if (siteConfigRes.length > 0) {
      const currentSiteConfig = siteConfigRes[0].data;
      if (!currentSiteConfig.backToTop) {
        console.log("- Updating siteConfig with default backToTop settings...");
        currentSiteConfig.backToTop = defaultBackToTop;
        await sql`
          UPDATE cms_content
          SET data = ${JSON.stringify(currentSiteConfig)}::jsonb, updated_at = NOW()
          WHERE key = 'siteConfig'
        `;
        console.log("  -> Updated siteConfig.backToTop successfully!");
      } else {
        console.log("- siteConfig.backToTop already exists. Preserving:", currentSiteConfig.backToTop);
      }
    }

    // 3. Verify specialties and services icons
    const specRes = await sql`SELECT data FROM cms_content WHERE key = 'specialties'`;
    if (specRes.length > 0) {
      console.log(`- Specialties verified: ${specRes[0].data.length} items.`);
    }

    const srvRes = await sql`SELECT data FROM cms_content WHERE key = 'services'`;
    if (srvRes.length > 0) {
      console.log(`- Services verified: ${srvRes[0].data.length} items.`);
    }

    console.log("=== SEEDING COMPLETED SUCCESSFULLY ===");
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
})();
