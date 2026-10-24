export interface NavItem {
  id: string;
  title: string;
  path: string;
  isActive?: boolean;
  isMega?: boolean;
  megaType?: "specialties" | "services" | "brands";
  children?: {
    title: string;
    path: string;
    desc?: string;
    icon?: string;
  }[];
}

export const initialNavItems: NavItem[] = [
  {
    id: "nav-home",
    title: "Trang chủ",
    path: "/",
    isActive: true
  },
  {
    id: "nav-about",
    title: "Giới thiệu",
    path: "/gioi-thieu",
    isActive: true,
    children: [
      { title: "Về Lạc's Beauty Center", path: "/gioi-thieu", desc: "Câu chuyện thương hiệu, tầm nhìn & sứ mệnh" },
      { title: "Giá trị cốt lõi", path: "/gioi-thieu#gia-tri-cot-loi", desc: "4 giá trị chuẩn mực y khoa" },
      { title: "Hệ thống cơ sở", path: "/he-thong-co-so", desc: "Khám phá 2 cơ sở khang trang tại Cần Thơ" },
      { title: "Giấy phép hoạt động", path: "/giay-phep-hoat-dong", desc: "Hồ sơ pháp lý minh bạch của Sở Y tế" },
      { title: "Cơ hội tuyển dụng", path: "/tuyen-dung", desc: "Gia nhập đội ngũ y khoa LBC Group" }
    ]
  },
  {
    id: "nav-specialties",
    title: "Chuyên khoa",
    path: "/khoa-da-lieu",
    isActive: true,
    isMega: true,
    megaType: "specialties"
  },
  {
    id: "nav-services",
    title: "Dịch vụ điều trị",
    path: "/dich-vu",
    isActive: true,
    isMega: true,
    megaType: "services"
  },
  {
    id: "nav-doctors",
    title: "Đội ngũ bác sĩ",
    path: "/doi-ngu-bac-si",
    isActive: true
  },
  {
    id: "nav-technologies",
    title: "Công nghệ",
    path: "/cong-nghe",
    isActive: true
  },
  {
    id: "nav-before-after",
    title: "Kết quả điều trị",
    path: "/ket-qua-dieu-tri",
    isActive: true
  },
  {
    id: "nav-cosmeceuticals",
    title: "Dược – Mỹ phẩm",
    path: "/duoc-my-pham",
    isActive: true,
    isMega: true,
    megaType: "brands"
  },
  {
    id: "nav-news",
    title: "Tin tức",
    path: "/tin-tuc",
    isActive: true,
    children: [
      { title: "Kiến thức chăm sóc da", path: "/tin-tuc?cat=cham-soc-da", desc: "Bác sĩ giải đáp các vấn đề về da" },
      { title: "Hoạt động phòng khám", path: "/tin-tuc?cat=hoat-dong", desc: "Sự kiện, hội nghị y khoa và khai trương" }
    ]
  },
  {
    id: "nav-contact",
    title: "Liên hệ",
    path: "/lien-he",
    isActive: true
  }
];

export const footerLinks = {
  about: [
    { title: "Câu chuyện Lạc's", path: "/gioi-thieu" },
    { title: "Hệ thống 2 cơ sở", path: "/he-thong-co-so" },
    { title: "Đội ngũ Bác sĩ sau ĐH", path: "/doi-ngu-bac-si" },
    { title: "Giấy phép hoạt động y tế", path: "/giay-phep-hoat-dong" },
    { title: "Đào tạo nghề Lạc's Academy", path: "/dao-tao" },
    { title: "Tuyển dụng nhân sự", path: "/tuyen-dung" }
  ],
  services: [
    { title: "Điều trị mụn kháng trị", path: "/dich-vu/dieu-tri-mun" },
    { title: "Bóc tách đáy sẹo rỗ", path: "/dich-vu/dieu-tri-seo" },
    { title: "Điều trị nám – tàn nhang", path: "/dich-vu/dieu-tri-nam-tan-nhang" },
    { title: "Nâng cơ trẻ hóa da RF/HIFU", path: "/dich-vu/nang-co" },
    { title: "Thẩm mỹ nội khoa", path: "/dich-vu/tham-my-noi-khoa" },
    { title: "Soi da đa tầng VISIA 3D", path: "/cong-nghe" }
  ],
  policies: [
    { title: "Chính sách bảo mật thông tin", path: "/chinh-sach-bao-mat" },
    { title: "Chính sách thanh toán", path: "/chinh-sach-thanh-toan" },
    { title: "Chính sách giao hàng dược mỹ phẩm", path: "/chinh-sach-giao-hang" },
    { title: "Chính sách đổi trả sản phẩm", path: "/chinh-sach-doi-tra" },
    { title: "Điều khoản sử dụng website", path: "/dieu-khoan-su-dung" }
  ],
  support: [
    { title: "Đặt lịch khám da liễu", path: "/dat-lich-kham" },
    { title: "Câu hỏi thường gặp (FAQ)", path: "/cau-hoi-thuong-gap" },
    { title: "Kết quả điều trị Before-After", path: "/before-after" },
    { title: "Hướng dẫn tra cứu đơn hàng", path: "/cau-hoi-thuong-gap#don-hang" },
    { title: "Đường dây nóng khiếu nại CSKH", path: "/lien-he" }
  ]
};
