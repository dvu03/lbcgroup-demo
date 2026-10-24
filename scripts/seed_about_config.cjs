require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

if (!process.env.DATABASE_URL) {
  console.error("ERROR: DATABASE_URL is not set");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

(async () => {
  console.log("Fetching siteConfig from Neon...");
  const rows = await sql`SELECT data FROM cms_content WHERE key = 'siteConfig';`;
  if (rows.length === 0) {
    console.log("siteConfig not found in Neon");
    return;
  }

  const current = rows[0].data;
  console.log("Current aboutConfig:", current.aboutConfig);

  // Full AboutSectionConfig with focusCards and both CTAs
  const defaultAboutConfig = {
    enabled: true,
    badge: "VỀ CHÚNG TÔI",
    sectionBadge: "VỀ CHÚNG TÔI",
    title: "Phòng khám Chuyên khoa Da liễu Lạc's Beauty Center",
    heading: "Phòng khám Chuyên khoa Da liễu Lạc's Beauty Center",
    description: "Tọa lạc tại trung tâm thành phố Cần Thơ, Lạc's Beauty Center được xây dựng với định vị là phòng khám da liễu chuẩn y khoa chuyên sâu. Chúng tôi không chạy theo các trào lưu làm đẹp lột tẩy cấp tốc, mà kiên định theo đuổi triết lý Y học Cá nhân hóa: mỗi làn da cần một phác đồ khoa học riêng biệt dựa trên bằng chứng soi da vi thể và theo dõi sát sao của bác sĩ chuyên khoa sau đại học.",
    metricNumber: "10.000+",
    statNumber: "10.000+",
    metricLabel: "Ca điều trị chuẩn Y khoa",
    statLabel: "Ca điều trị chuẩn Y khoa",
    metricBadge: "VISIA 3D",
    techBadge: "VISIA 3D",
    mainImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
    subImages: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80"
    ],
    focusCards: [
      {
        id: "focus-1",
        iconName: "Award",
        title: "Đội ngũ Chuyên môn Sau Đại học",
        description: "100% bác sĩ có học vị Thạc sĩ, Bác sĩ Chuyên khoa I & II giàu kinh nghiệm, trực tiếp khám và lên phác đồ.",
        enabled: true,
        order: 1
      },
      {
        id: "focus-2",
        iconName: "Shield",
        title: "Công nghệ Tiên tiến & Minh bạch",
        description: "Đơn vị sở hữu máy soi da VISIA 3D đầu tiên tại Việt Nam, máy nâng cơ RF Jovena, HIFU và Laser nhập khẩu chính hãng.",
        enabled: true,
        order: 2
      },
      {
        id: "focus-3",
        iconName: "HeartHandshake",
        title: "Không gian Chuẩn Y khoa & Tận tâm",
        description: "Hệ thống 2 cơ sở khang trang, phòng thủ thuật vô trùng khép kín và phong cách phục vụ chu đáo, gần gũi với người miền Tây.",
        enabled: true,
        order: 3
      }
    ],
    cta1Text: "Xem câu chuyện thương hiệu",
    cta1Link: "/gioi-thieu",
    cta1Url: "/gioi-thieu",
    cta1Enabled: true,
    cta2Text: "Hồ sơ Bác sĩ",
    cta2Link: "/doi-ngu-bac-si",
    cta2Url: "/doi-ngu-bac-si",
    cta2Enabled: true,
    ctaText: "Xem câu chuyện thương hiệu",
    ctaLink: "/gioi-thieu"
  };

  current.aboutConfig = {
    ...defaultAboutConfig,
    ...(current.aboutConfig || {})
  };

  // Ensure focusCards and CTAs are populated if empty
  if (!current.aboutConfig.focusCards || current.aboutConfig.focusCards.length === 0) {
    current.aboutConfig.focusCards = defaultAboutConfig.focusCards;
  }
  if (!current.aboutConfig.cta1Text) current.aboutConfig.cta1Text = defaultAboutConfig.cta1Text;
  if (!current.aboutConfig.cta1Url) current.aboutConfig.cta1Url = defaultAboutConfig.cta1Url;
  if (!current.aboutConfig.cta2Text) current.aboutConfig.cta2Text = defaultAboutConfig.cta2Text;
  if (!current.aboutConfig.cta2Url) current.aboutConfig.cta2Url = defaultAboutConfig.cta2Url;

  const jsonStr = JSON.stringify(current);
  await sql`
    UPDATE cms_content 
    SET data = ${jsonStr}::jsonb, updated_at = NOW(), updated_by = 'system_update'
    WHERE key = 'siteConfig';
  `;

  console.log("✓ Updated siteConfig.aboutConfig in Neon successfully!");
})();
