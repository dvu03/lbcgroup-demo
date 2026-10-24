export interface HomepageModuleConfig {
  id: string;
  name: string;
  themeMapping: string;
  enabled: boolean;
  order: number;
  description: string;
  customTitle?: string;
  customSubtitle?: string;
}

export const initialHomepageModules: HomepageModuleConfig[] = [
  {
    id: "hero-slider",
    name: "Hero – Slider thương hiệu (5 slide + 2 banner phải)",
    themeMapping: "Module Slider (col-lg-8 + col-lg-4)",
    enabled: true,
    order: 1,
    description: "Slider thông điệp thương hiệu, bác sĩ, công nghệ cao, cơ sở 02, Academy cùng 2 banner phụ."
  },
  {
    id: "core-values",
    name: "Khối Giá trị cốt lõi (4 giá trị y khoa)",
    themeMapping: "Module Chính sách (chuyển lên dưới Slider)",
    enabled: true,
    order: 2,
    description: "4 ô: Tiên phong Công nghệ cao, Y học Cá nhân hóa, Bác sĩ Sau ĐH, Phác đồ Chuẩn Y khoa."
  },
  {
    id: "about-summary",
    name: "Về Lạc's Beauty Center (Giới thiệu & Số liệu)",
    themeMapping: "Module Giới thiệu (About Us)",
    enabled: true,
    order: 3,
    description: "Ảnh lớn sảnh, 3 điểm nhấn y khoa, số liệu thực tế phòng khám và nút xem thêm."
  },
  {
    id: "ecosystem-specialties",
    name: "Hệ sinh thái 5 Chuyên khoa / Lĩnh vực",
    themeMapping: "Module Banner 1 (5 banner thẻ trượt)",
    enabled: true,
    order: 4,
    description: "5 lĩnh vực: Khoa Da liễu, Khoa Xét nghiệm, Nhà thuốc, Dược - Mỹ phẩm, Đào tạo Lạc's Academy."
  },
  {
    id: "featured-services",
    name: "Dịch vụ điều trị chuyên sâu (Lưới 10 ô)",
    themeMapping: "Module Danh mục sản phẩm (Đổi thành Lưới 10 dịch vụ)",
    enabled: true,
    order: 5,
    description: "9 dịch vụ da liễu chủ lực + 1 ô Đặt lịch soi da VISIA 3D."
  },
  {
    id: "technologies-banner",
    name: "Công nghệ cao tại phòng khám",
    themeMapping: "Module Banner 2 (Slider công nghệ)",
    enabled: true,
    order: 6,
    description: "Các công nghệ điều trị ứng dụng: RF Jovena, HIFU, Laser thẩm mỹ, VISIA 3D."
  },
  {
    id: "doctors-section",
    name: "Đội ngũ Bác sĩ trình độ Sau Đại học",
    themeMapping: "Module Tin tức 2 (Tùy biến thành 4 thẻ ngang)",
    enabled: true,
    order: 7,
    description: "4 thẻ bác sĩ nằm ngang cân đối, học vị sau đại học, chuyên môn và nút xem hồ sơ."
  },
  {
    id: "before-after-section",
    name: "Người thật – Việc thật (Before – After)",
    themeMapping: "Module Banner 3 (Banner kết quả điều trị)",
    enabled: true,
    order: 8,
    description: "Ca điều trị thực tế có cam kết đồng ý, hình ảnh trước sau và cảnh báo kết quả tùy cơ địa."
  },
  {
    id: "brands-section",
    name: "Thương hiệu Dược mỹ phẩm chính hãng",
    themeMapping: "Module Thương hiệu (Brand carousel)",
    enabled: true,
    order: 9,
    description: "Logo các hãng dược mỹ phẩm quốc tế: Bioderma, Biotrade, PostQuam, La Roche-Posay..."
  },
  {
    id: "featured-products",
    name: "Sản phẩm Dược mỹ phẩm tiêu biểu",
    themeMapping: "Module Tab Sản phẩm 1 (Tắt nhãn flash sale)",
    enabled: true,
    order: 10,
    description: "Tab sản phẩm theo nhu cầu (Làm sạch, Trị mụn, Phục hồi, Chống nắng, Sáng da)."
  },
  {
    id: "news-tabs",
    name: "Tin tức & Kiến thức y khoa",
    themeMapping: "Module Tin tức dạng tab (Bài mới, Chăm sóc da, Hoạt động)",
    enabled: true,
    order: 11,
    description: "Bài viết chuyên môn có bác sĩ tham vấn và tin tức hoạt động phòng khám."
  },
  {
    id: "customer-utilities",
    name: "Tiện ích cho khách hàng (4 ô tiện ích)",
    themeMapping: "Module Tiện ích (Chuyển xuống áp chót trang)",
    enabled: true,
    order: 12,
    description: "Đặt lịch khám, Hỏi đáp chuyên gia, Hệ thống 2 cơ sở, Tra cứu đơn hàng."
  }
];
