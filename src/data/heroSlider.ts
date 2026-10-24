export interface SlideItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
  desktopImage: string;
  mobileImage: string;
  altText?: string;
  internalName?: string;
  enabled?: boolean;
  overlayOpacity?: number;
  textColor?: 'light' | 'dark';
  align?: 'left' | 'center' | 'right';
  order?: number;
}

export interface SideBanner {
  id: string;
  tag: string;
  title: string;
  desc: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
}

export const initialHeroSlides: SlideItem[] = [
  {
    id: "slide-01",
    badge: "Phòng khám Chuyên khoa Da liễu",
    title: "Lạc's Beauty Center – Tiên phong Y học Cá nhân hóa",
    subtitle: "Chẩn đoán chính xác bằng hệ thống soi da VISIA 3D và phác đồ điều trị chuyên biệt cho từng làn da.",
    ctaText: "Tìm hiểu về phòng khám",
    ctaLink: "/gioi-thieu",
    desktopImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80",
    mobileImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=750&q=80"
  },
  {
    id: "slide-02",
    badge: "Đội ngũ Chuyên môn Cấp cao",
    title: "100% Bác sĩ trình độ Sau Đại học trực tiếp thăm khám",
    subtitle: "Thạc sĩ, Bác sĩ Chuyên khoa I & II giàu kinh nghiệm lâm sàng đồng hành suốt toàn bộ phác đồ điều trị.",
    ctaText: "Gặp gỡ đội ngũ bác sĩ",
    ctaLink: "/doi-ngu-bac-si",
    desktopImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80",
    mobileImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=750&q=80"
  },
  {
    id: "slide-03",
    badge: "Công nghệ Thẩm mỹ Tiên tiến",
    title: "Sở hữu máy soi da VISIA 3D đầu tiên tại Việt Nam",
    subtitle: "Ứng dụng các công nghệ điều trị nâng cơ RF Jovena, HIFU và Laser vi điểm đạt chuẩn quốc tế.",
    ctaText: "Khám phá công nghệ",
    ctaLink: "/cong-nghe",
    desktopImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80",
    mobileImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=750&q=80"
  },
  {
    id: "slide-04",
    badge: "Mở rộng Hệ thống Y tế",
    title: "Chào đón Cơ sở 02 Lạc's Beauty Center tại Cần Thơ",
    subtitle: "Không gian chuẩn y khoa hiện đại, tiện nghi sẵn sàng phục vụ khách hàng trên toàn khu vực miền Tây.",
    ctaText: "Xem hệ thống cơ sở",
    ctaLink: "/he-thong-co-so",
    desktopImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80",
    mobileImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=750&q=80"
  },
  {
    id: "slide-05",
    badge: "Học viện Đào tạo Nghề",
    title: "Lạc's Academy – Đào tạo chăm sóc da chuẩn Y khoa",
    subtitle: "Chương trình thực hành trên 80% thời lượng, cấp chứng chỉ sơ cấp chính quy tự tin lập nghiệp.",
    ctaText: "Tư vấn khóa học",
    ctaLink: "/dao-tao",
    desktopImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80",
    mobileImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=750&q=80"
  }
];

export const initialSideBanners: SideBanner[] = [
  {
    id: "side-01",
    tag: "ĐẶT LỊCH NGAY",
    title: "Soi da đa tầng VISIA 3D",
    desc: "Đo lường 8 chỉ số sức khỏe làn da & tư vấn trực tiếp cùng Bác sĩ Chuyên khoa.",
    ctaText: "Đặt lịch thăm khám",
    ctaLink: "/dat-lich-kham",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "side-02",
    tag: "100% CHÍNH HÃNG",
    title: "Dược mỹ phẩm Quốc tế",
    desc: "Bioderma, Biotrade, PostQuam nhập khẩu chính ngạch bảo vệ da nhạy cảm.",
    ctaText: "Khám phá sản phẩm",
    ctaLink: "/duoc-my-pham",
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80"
  }
];
