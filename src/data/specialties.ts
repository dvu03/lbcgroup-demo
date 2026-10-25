export interface Specialty {
  id: string;
  code: string;
  name: string;
  slug: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  iconUrl?: string;
  ctaText: string;
  ctaLink: string;
  servicesList: string[];
  inChargePerson: string;
  licenseInfo: string;
  operatingHours: string;
  badge?: string;
  heroImage: string;
  galleryImages: string[];
  // Banner customization fields
  enabled?: boolean;
  order?: number;
  altText?: string;
  imagePosition?: string;
  bgColor?: string;
  textColor?: string;
  titleColor?: string;
  descColor?: string;
  badgeColor?: string;
  badgeBgColor?: string;
  btnBgColor?: string;
  btnTextColor?: string;
  // Overlay overrides per banner
  overlayEnabled?: boolean;
  overlayColor?: 'black' | 'white' | 'custom' | string;
  overlayCustomColor?: string;
  overlayOpacity?: number; // 0 to 80
  overlayMode?: 'gradient-left' | 'gradient-bottom' | 'solid';
  overlayGradientStart?: number;
  overlayGradientEnd?: number;
  contentPosition?: 'left' | 'center' | 'bottom';
}

export const initialSpecialties: Specialty[] = [
  {
    id: "spec-01",
    code: "ICO-K1",
    name: "Khoa Da liễu",
    slug: "khoa-da-lieu",
    badge: "Chuyên khoa",
    tagline: "Chẩn đoán chính xác – Điều trị tận gốc",
    shortDesc: "Thăm khám và điều trị các bệnh lý da, mụn, nám và các vấn đề về da.",
    fullDesc: "Khoa Da liễu Lạc's Beauty Center là mũi nhọn chuyên môn của phòng khám. Dưới sự phụ trách trực tiếp của đội ngũ bác sĩ chuyên khoa da liễu trình độ sau đại học, khoa tiếp nhận và điều trị toàn diện các bệnh lý da liễu từ thường gặp đến phức tạp. Ứng dụng công nghệ soi da đa tầng VISIA 3D giúp phân tích sâu 8 chỉ số của da, từ đó xây dựng phác đồ cá nhân hóa cho từng khách hàng, kết hợp công nghệ cao và thuốc điều trị an toàn.",
    iconName: "Stethoscope",
    ctaText: "Tìm hiểu",
    ctaLink: "/khoa-da-lieu",
    servicesList: [
      "Điều trị mụn & mụn kháng trị",
      "Điều trị sẹo rỗ, sẹo thâm kỹ thuật cao",
      "Điều trị rối loạn sắc tố (nám, tàn nhang, đồi mồi)",
      "Nâng cơ trẻ hóa da công nghệ RF Jovena & HIFU",
      "Thẩm mỹ nội khoa (tiêm vi điểm, mesotherapy)",
      "Điều trị rụng tóc & phục hồi nang tóc",
      "Chăm sóc da chuyên sâu & phục hồi hàng rào bảo vệ da"
    ],
    inChargePerson: "Bác sĩ Chuyên khoa Da liễu phụ trách kỹ thuật (Chờ xác nhận danh tính)",
    licenseInfo: "Theo Giấy phép hoạt động khám bệnh, chữa bệnh số 0123/CTO-GPHĐ cấp bởi Sở Y tế TP. Cần Thơ",
    operatingHours: "08:00 – 20:00 (Hằng ngày)",
    heroImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80",
    altText: "Phòng khám Khoa Da liễu Lạc's Beauty Center",
    imagePosition: "center center",
    enabled: true,
    order: 1,
    galleryImages: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "spec-02",
    code: "ICO-K2",
    name: "Khoa Xét nghiệm",
    slug: "khoa-xet-nghiem",
    badge: "Chuyên khoa",
    tagline: "Chuẩn xác – Nhanh chóng – Hỗ trợ chẩn đoán tối ưu",
    shortDesc: "Hỗ trợ chẩn đoán và theo dõi sức khỏe với quy trình xét nghiệm phù hợp.",
    fullDesc: "Khoa Xét nghiệm đóng vai trò nền tảng trong việc xác định chính xác nguyên nhân gốc rễ của các vấn đề da liễu dai dẳng. Được trang bị hệ thống kính hiển vi soi tươi độ phóng đại cao và thiết bị phân tích hiện đại, khoa cung cấp kết quả nhanh chóng, chính xác nhằm hỗ trợ bác sĩ kê đơn thuốc và phác đồ điều trị đúng hướng, tránh tình trạng điều trị mò hay lạm dụng corticoid.",
    iconName: "FlaskConical",
    ctaText: "Tìm hiểu",
    ctaLink: "/khoa-xet-nghiem",
    servicesList: [
      "Soi tươi tìm ký sinh trùng Demodex trên da",
      "Xét nghiệm soi tươi & cấy vi nấm ngoài da, móng, tóc",
      "Xét nghiệm vi sinh vật & kháng sinh đồ đối với mụn mủ kháng trị",
      "Xét nghiệm máu cơ bản trước liệu trình điều trị toàn thân",
      "Xét nghiệm đánh giá chức năng gan, thận khi dùng thuốc đặc trị"
    ],
    inChargePerson: "Cử nhân Xét nghiệm Y học (Chờ xác nhận)",
    licenseInfo: "Phòng Xét nghiệm thuộc cơ cấu chuyên môn được cấp phép hoạt động trong Giấy phép KCB",
    operatingHours: "08:00 – 17:30 (Thứ 2 – Thứ 7)",
    heroImage: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1600&q=80",
    altText: "Phòng Khoa Xét nghiệm chuẩn Y khoa LBC",
    imagePosition: "center center",
    enabled: true,
    order: 2,
    galleryImages: [
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "spec-03",
    code: "ICO-K3",
    name: "Nhà thuốc",
    slug: "nha-thuoc",
    badge: "Chuyên khoa",
    tagline: "Thuốc chuẩn GPP – Tư vấn tận tâm",
    shortDesc: "Tư vấn và cung cấp thuốc theo quy định, phù hợp với nhu cầu điều trị.",
    fullDesc: "Nhà thuốc Chuyên khoa Da liễu Lạc's Beauty Center đạt chuẩn Thực hành tốt cơ sở bán lẻ thuốc (GPP). Nhà thuốc chuyên cung ứng các danh mục thuốc da liễu chuyên biệt, thuốc kháng sinh, kháng nấm, điều hòa miễn dịch và dưỡng ẩm y tế do chính bác sĩ phòng khám chỉ định. Lưu ý pháp lý: Nhà thuốc chỉ phục vụ cấp phát thuốc trực tiếp theo đơn hợp lệ tại phòng khám, không bán thuốc kê đơn trực tuyến qua mạng.",
    iconName: "Pill",
    ctaText: "Tìm hiểu",
    ctaLink: "/nha-thuoc",
    servicesList: [
      "Cấp phát thuốc điều trị da liễu theo đơn bác sĩ",
      "Tư vấn sử dụng thuốc an toàn, đúng liều lượng và thời điểm",
      "Hướng dẫn chăm sóc tương tác thuốc bôi ngoài da",
      "Cung cấp các sản phẩm làm sạch, dưỡng ẩm y tế bổ trợ",
      "Theo dõi phản ứng phụ và nhắc nhở lịch tái khám"
    ],
    inChargePerson: "Dược sĩ phụ trách chuyên môn (Chờ xác nhận)",
    licenseInfo: "Giấy chứng nhận Đủ điều kiện kinh doanh dược số 123/ĐKKDD-CTO do Sở Y tế TP. Cần Thơ cấp",
    operatingHours: "08:00 – 20:00 (Hằng ngày)",
    heroImage: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1600&q=80",
    altText: "Nhà thuốc chuẩn GPP Lạc's Beauty Center",
    imagePosition: "center center",
    enabled: true,
    order: 3,
    galleryImages: [
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "spec-04",
    code: "ICO-K4",
    name: "Dược – Mỹ phẩm",
    slug: "duoc-my-pham",
    badge: "Chuyên khoa",
    tagline: "100% Chính hãng – Nhập khẩu ủy quyền",
    shortDesc: "Khám phá các dòng dược mỹ phẩm phù hợp với nhu cầu chăm sóc da.",
    fullDesc: "Lạc's Beauty Center là đối tác phân phối chính hãng của các tập đoàn dược mỹ phẩm danh tiếng từ Pháp, Tây Ban Nha, Bulgaria như Bioderma, Biotrade, PostQuam. Mọi sản phẩm đều có đầy đủ hóa đơn chứng từ, tem chống hàng giả và số phiếu công bố mỹ phẩm của Bộ Y tế. Các dòng sản phẩm được chọn lọc khắt khe dựa trên hiệu quả lâm sàng cho da mụn, da sau xâm lấn và da nhiễm độc corticoid.",
    iconName: "Sparkles",
    ctaText: "Tìm hiểu",
    ctaLink: "/duoc-my-pham",
    servicesList: [
      "Dược mỹ phẩm làm sạch sâu & cân bằng độ pH",
      "Tinh chất đặc trị mụn viêm, mụn ẩn, mụn đầu đen",
      "Kem phục hồi hàng rào sinh học & làm dịu da kích ứng",
      "Kem chống nắng phổ rộng bảo vệ da chuyên biệt",
      "Dưỡng chất ức chế melanin, làm sáng da mờ thâm nám"
    ],
    inChargePerson: "Bộ phận Dược mỹ phẩm & CSKH LBC",
    licenseInfo: "Hóa đơn VAT nhà phân phối & Phiếu công bố sản phẩm mỹ phẩm hợp lệ",
    operatingHours: "08:00 – 20:00 (Hỗ trợ đặt hàng trực tuyến)",
    heroImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80",
    altText: "Khu vực Dược Mỹ phẩm chính hãng LBC",
    imagePosition: "center center",
    enabled: true,
    order: 4,
    galleryImages: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "spec-05",
    code: "ICO-K5",
    name: "Đào tạo nghề – LBC Academy",
    slug: "dao-tao",
    badge: "Chuyên khoa",
    tagline: "Vững tay nghề – Chuẩn y khoa – Tự tin lập nghiệp",
    shortDesc: "Đào tạo kỹ thuật viên và kiến thức chăm sóc da theo chương trình chuyên môn.",
    fullDesc: "Lạc's Academy là đơn vị đào tạo nghề trực thuộc hệ sinh thái LBC Group, chuyên cung cấp các khóa học chăm sóc da sơ cấp và nâng cao. Học viên được đào tạo trực tiếp bởi các bác sĩ da liễu và chuyên viên tay nghề cao, thực hành trên 80% thời lượng với hệ thống máy móc công nghệ hiện đại. Sau tốt nghiệp, học viên được cấp chứng chỉ nghề hợp pháp và có cơ hội làm việc ngay tại hệ thống phòng khám hoặc tự mở spa.",
    iconName: "GraduationCap",
    ctaText: "Tìm hiểu",
    ctaLink: "/dao-tao",
    servicesList: [
      "Khóa đào tạo Chăm sóc da chuyên sâu chuẩn y khoa",
      "Khóa kỹ thuật nặn mụn vô khuẩn chuẩn y khoa không để lại sẹo",
      "Khóa ứng dụng công nghệ cao trong trẻ hóa da & triệt lông",
      "Khóa phân tích bệnh học da liễu cơ bản dành cho chủ Spa",
      "Chuyển giao quy trình vận hành và setup phòng khám Spa"
    ],
    inChargePerson: "Ban Giảng huấn Lạc's Academy (Chờ xác nhận)",
    licenseInfo: "Đăng ký hoạt động giáo dục nghề nghiệp trình độ sơ cấp (Chờ đối chiếu mã ngành)",
    operatingHours: "08:30 – 17:30 (Thứ 2 – Thứ 7)",
    heroImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80",
    altText: "Lớp học Đào tạo nghề LBC Academy",
    imagePosition: "center center",
    enabled: true,
    order: 5,
    galleryImages: [
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
    ]
  }
];
