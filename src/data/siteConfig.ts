export interface BannerTopMessage {
  id: string;
  text: string;
  subText?: string;
  link?: string;
  enabled: boolean;
  isActive?: boolean;
  order: number;
}

export interface BannerTopConfig {
  enabled: boolean;
  messages: BannerTopMessage[];
  desktopImage?: string;
  desktopImageUrl?: string;
  mobileImage?: string;
  mobileImageUrl?: string;
  link: string;
  linkUrl?: string;
  backgroundColor: string;
  textColor: string;
  rotationInterval: number;
  rotationSpeedSeconds?: number;
  alignment: 'center' | 'left' | 'right';
  contentAlignment?: 'center' | 'left' | 'right';
  heightDesktop: number;
  heightMobile: number;
}

export interface HeaderMainConfig {
  enabled: boolean;
  backgroundMode: 'white' | 'light' | 'primary' | 'custom';
  bgMode?: 'white' | 'light' | 'primary' | 'custom';
  backgroundColor: string;
  bgColor?: string;
  textColor: string;
  iconColor: string;

  // Background Image Options
  useBackgroundImage?: boolean;
  backgroundImage?: string;
  backgroundImageMobile?: string;
  bgPatternUrl?: string;
  backgroundSize?: 'cover' | 'contain' | 'repeat' | 'auto';
  backgroundPosition?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  backgroundOpacity?: number;
  bgPatternOpacity?: number;
  backgroundFallbackColor?: string;

  showTopbar: boolean;
  showWelcomeGreeting: boolean;
  welcomeMessages: string[];
  greeting1?: string;
  greeting2?: string;
  greeting3?: string;
  greetingRotationInterval?: number;
  showHotline: boolean;
  hotlineLabel?: string;
  showOperatingHours: boolean;

  showSearch: boolean;
  searchPlaceholder: string;
  searchSuggestions: string[];

  showBranches: boolean;
  branchTitle: string;
  branchSubtitle: string;

  showAccount: boolean;
  showCart: boolean;

  showCta: boolean;
  ctaText: string;
  ctaLink: string;
  ctaBgColor: string;
  ctaTextColor: string;

  navBackgroundMode: 'white' | 'light' | 'primary';
  navBackgroundColor: string;
  navTextColor: string;

  // Spacing & Layout
  containerMaxWidth: string;
  containerPaddingX?: number;
  gapLogoSearch?: number;
  gapSearchActions?: number;
  gapIcons?: number;
  gapRightElements?: number;
  headerPaddingYDesktop?: number;
  headerPaddingYMobile?: number;
  headerHeightDesktop?: number;
  headerHeightMobile?: number;
  elementsGap: 'compact' | 'normal' | 'spacious';
  stickyHeader: boolean;
  isSticky?: boolean;

  // Logo & Typography
  logoUrl?: string;
  logoWhiteUrl?: string;
  logoWidthDesktop: number;
  logoHeightDesktop?: number;
  logoWidthMobile: number;
  logoHeightMobile?: number;
  logoFit: 'contain' | 'cover' | 'fill';
  showBrandNameText?: boolean;
  showFacilitySubtitle?: boolean;
  brandNameFontSize?: string;
  facilityFontSize?: string;
  gapLogoText?: number;
  logoVerticalAlign?: 'center' | 'flex-start' | 'flex-end';
}

export const initialBannerTopConfig: BannerTopConfig = {
  enabled: true,
  messages: [
    {
      id: "msg-1",
      text: "Đơn vị sở hữu máy soi da VISIA 3D đầu tiên tại Việt Nam",
      subText: "Soi da công nghệ cao – Thấy được kết quả trước khi thực hiện",
      link: "/dat-lich-kham",
      enabled: true,
      order: 1
    },
    {
      id: "msg-2",
      text: "Soi da công nghệ cao - Thấy được kết quả trước khi thực hiện",
      subText: "Phác đồ cá nhân hóa chuẩn Y khoa cùng Bác sĩ Chuyên khoa Da liễu",
      link: "/dat-lich-kham",
      enabled: true,
      order: 2
    }
  ],
  desktopImage: "",
  mobileImage: "",
  link: "/dat-lich-kham",
  backgroundColor: "#0E7C86",
  textColor: "#FFFFFF",
  rotationInterval: 4,
  alignment: "center",
  heightDesktop: 44,
  heightMobile: 40
};

export const initialHeaderMainConfig: HeaderMainConfig = {
  enabled: true,
  backgroundMode: "white",
  bgMode: "white",
  backgroundColor: "#FFFFFF",
  bgColor: "#FFFFFF",
  textColor: "#1E293B",
  iconColor: "#0E7C86",

  useBackgroundImage: false,
  backgroundImage: "",
  backgroundImageMobile: "",
  bgPatternUrl: "",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundOpacity: 15,
  bgPatternOpacity: 0.08,
  backgroundFallbackColor: "#FFFFFF",

  showTopbar: true,
  showWelcomeGreeting: true,
  welcomeMessages: [
    "LBC xin chào.",
    "Hướng đến Y học Cá nhân hóa.",
    "Tiên phong trong ứng dụng công nghệ cao."
  ],
  greeting1: "LBC xin chào.",
  greeting2: "Hướng đến Y học Cá nhân hóa.",
  greeting3: "Tiên phong trong ứng dụng công nghệ cao.",
  showHotline: true,
  hotlineLabel: "HOTLINE",
  showOperatingHours: true,

  showSearch: true,
  searchPlaceholder: "Tìm dịch vụ, sản phẩm hoặc thương hiệu...",
  searchSuggestions: [
    "Trị mụn",
    "Trị nám",
    "Nâng cơ",
    "Triệt lông",
    "Bioderma"
  ],

  showBranches: true,
  branchTitle: "Hệ thống",
  branchSubtitle: "2 cơ sở",

  showAccount: true,
  showCart: true,

  showCta: true,
  ctaText: "ĐẶT LỊCH KHÁM",
  ctaLink: "/dat-lich-kham",
  ctaBgColor: "#0E7C86",
  ctaTextColor: "#FFFFFF",

  navBackgroundMode: "white",
  navBackgroundColor: "#FFFFFF",
  navTextColor: "#334155",

  containerMaxWidth: "1380px",
  containerPaddingX: 16,
  gapLogoSearch: 24,
  gapSearchActions: 24,
  gapIcons: 12,
  gapRightElements: 16,
  headerPaddingYDesktop: 12,
  headerPaddingYMobile: 8,
  headerHeightDesktop: 76,
  headerHeightMobile: 64,
  elementsGap: "normal",
  stickyHeader: true,
  isSticky: true,

  logoUrl: "/images/logo.svg",
  logoWhiteUrl: "/images/logo-white.svg",
  logoWidthDesktop: 185,
  logoHeightDesktop: 48,
  logoWidthMobile: 130,
  logoHeightMobile: 36,
  logoFit: "contain",
  showBrandNameText: true,
  showFacilitySubtitle: true,
  brandNameFontSize: "16px",
  facilityFontSize: "11px",
  gapLogoText: 10,
  logoVerticalAlign: "center"
};

export interface AboutFocusCard {
  id: string;
  iconName: string;
  imageUrl?: string;
  title: string;
  description: string;
  enabled: boolean;
  order: number;
}

export interface AboutSectionConfig {
  enabled?: boolean;
  badge?: string;
  sectionBadge?: string;
  title?: string;
  heading?: string;
  description?: string;
  metricNumber?: string;
  statNumber?: string;
  metricLabel?: string;
  statLabel?: string;
  metricBadge?: string;
  techBadge?: string;
  mainImage?: string;
  subImages?: string[];
  focusCards?: AboutFocusCard[];
  cta1Text?: string;
  cta1Link?: string;
  cta1Url?: string;
  cta1Enabled?: boolean;
  cta2Text?: string;
  cta2Link?: string;
  cta2Url?: string;
  cta2Enabled?: boolean;
  // Backwards compatibility
  ctaText?: string;
  ctaLink?: string;
}

export interface EcosystemSpecialtiesSectionConfig {
  enabled: boolean;
  title: string;
  subtitle: string;
  defaultBadgeText: string;
  paddingY: 'compact' | 'normal' | 'spacious';
  gap: 'sm' | 'md' | 'lg';
  backgroundColor: string;
  textColor?: string;
  desktopLayout: '3-2' | '3-cols' | '2-cols';
  cardBorderRadius?: 'rounded-xl' | 'rounded-2xl' | 'rounded-3xl';
  showBadge?: boolean;
}

export const defaultSpecialtiesSectionConfig: EcosystemSpecialtiesSectionConfig = {
  enabled: true,
  title: "5 Chuyên khoa & Lĩnh vực Trọng tâm",
  subtitle: "Mô hình khép kín kết hợp giữa thăm khám da liễu, xét nghiệm hỗ trợ, nhà thuốc chuẩn GPP, dược mỹ phẩm quốc tế và học viện đào tạo nghề chuyên sâu.",
  defaultBadgeText: "Chuyên khoa",
  paddingY: "normal",
  gap: "md",
  backgroundColor: "transparent",
  textColor: "",
  desktopLayout: "3-2",
  cardBorderRadius: "rounded-2xl",
  showBadge: true
};

export interface BackToTopConfig {
  enabled: boolean;
  iconName: string;
  iconUrl?: string;
  position: 'bottom-right' | 'bottom-left';
  bottomOffsetDesktop: number;
  bottomOffsetMobile: number;
  sideOffset?: number;
  backgroundColor: string;
  iconColor: string;
  hoverBackgroundColor: string;
  size: 'sm' | 'md' | 'lg';
  borderRadius: 'full' | 'xl' | 'lg';
  scrollThreshold: number;
  tooltipText?: string;
}

export interface ThemeConfig {
  // Typography
  fontHeading: string;
  fontBody: string;
  fontSizeBase: number;
  fontSizeH1: string;
  fontSizeH2: string;
  fontSizeH3: string;
  fontSizeH4: string;
  lineHeightBase: number;
  letterSpacingHeading: string;

  // Colors
  primaryColor: string;
  primaryHoverColor: string;
  primaryLightColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  sectionBgColor: string;
  textColorMain: string;
  textColorMuted: string;
  borderColor: string;

  // Dimensions & Spacings
  containerMaxWidth: string;
  sectionPaddingDesktop: number;
  sectionPaddingMobile: number;
  cardBorderRadius: string;
  buttonBorderRadius: string;

  // Banner Heights
  heroHeightDesktop: number;
  heroHeightMobile: number;
  pageBannerHeightDesktop: number;
  pageBannerHeightMobile: number;
}

export const defaultThemeConfig: ThemeConfig = {
  fontHeading: "'Fraunces', Georgia, serif",
  fontBody: "'Be Vietnam Pro', system-ui, -apple-system, sans-serif",
  fontSizeBase: 16,
  fontSizeH1: "clamp(1.875rem, 3.5vw + 1rem, 3rem)",
  fontSizeH2: "clamp(1.375rem, 2vw + 0.75rem, 2.25rem)",
  fontSizeH3: "clamp(1.125rem, 1.2vw + 0.5rem, 1.5rem)",
  fontSizeH4: "1.25rem",
  lineHeightBase: 1.6,
  letterSpacingHeading: "-0.015em",

  primaryColor: "#0E7C86",
  primaryHoverColor: "#0A4F57",
  primaryLightColor: "#EEF7F8",
  secondaryColor: "#C49A45",
  accentColor: "#0E7C86",
  backgroundColor: "#FFFFFF",
  sectionBgColor: "#F8FAFC",
  textColorMain: "#1E293B",
  textColorMuted: "#64748B",
  borderColor: "#E2E8F0",

  containerMaxWidth: "1380px",
  sectionPaddingDesktop: 80,
  sectionPaddingMobile: 48,
  cardBorderRadius: "24px",
  buttonBorderRadius: "9999px",

  heroHeightDesktop: 480,
  heroHeightMobile: 360,
  pageBannerHeightDesktop: 320,
  pageBannerHeightMobile: 220
};

export interface SiteConfig {
  brandName: string;
  tagline: string;
  legalEntity: string;
  facilityName: string;
  domain: string;
  hotline: string;
  hotlineConsultation: string;
  email: string;
  announcement: {
    enabled: boolean;
    text: string;
    subText?: string;
    link?: string;
    backgroundColor: string;
    textColor: string;
    desktopImage?: string;
    mobileImage?: string;
  };
  headerWelcomeMessages: string[];
  searchSuggestions?: string[];
  socialLinks: {
    facebook: string;
    tiktok: string;
    zalo: string;
    messenger?: string;
    youtube: string;
    shopee: string;
    tiktokShop: string;
  };
  operatingHours: string;
  seoDefault: {
    title: string;
    description: string;
    keywords: string;
    ogImage?: string;
  };
  popupBanner: {
    enabled: boolean;
    title: string;
    description: string;
    imageUrl: string;
    link: string;
  };
  floatingContact?: {
    enabled: boolean;
    actions: {
      id: string;
      type: 'hotline' | 'zalo' | 'messenger' | 'facilities';
      label: string;
      url: string;
      enabled: boolean;
      order: number;
    }[];
  };
  aboutConfig?: AboutSectionConfig;
  bannerTopConfig?: BannerTopConfig;
  headerMainConfig?: HeaderMainConfig;
  logoUrl?: string;
  logoHeader?: string;
  logoWhiteUrl?: string;
  logoFooterUrl?: string;
  logoFooter?: string;
  faviconUrl?: string;
  favicon?: string;
  primaryColor?: string;
  secondaryColor?: string;
  fontHeading?: string;
  fontBody?: string;
  address?: string;
  backToTop?: BackToTopConfig;
  specialtiesSectionConfig?: EcosystemSpecialtiesSectionConfig;
  theme?: ThemeConfig;
}

export const initialSiteConfig: SiteConfig = {
  brandName: "Lạc's Beauty Center",
  tagline: "Tiên phong công nghệ cao – Hướng đến Y học Cá nhân hóa",
  legalEntity: "CÔNG TY TNHH VIỆN CHĂM SÓC DA LẠC'S BEAUTY CENTER",
  facilityName: "Phòng khám Chuyên khoa Da liễu",
  domain: "lbcgroup.vn",
  hotline: "1900 6750",
  hotlineConsultation: "0901 234 567",
  email: "cskh@lbcgroup.vn",
  announcement: {
    enabled: true,
    text: "Đơn vị sở hữu máy soi da VISIA 3D đầu tiên tại Việt Nam",
    subText: "Soi da công nghệ cao – Thấy được kết quả trước khi thực hiện",
    link: "/dat-lich-kham",
    backgroundColor: "#0E7C86",
    textColor: "#FFFFFF",
    desktopImage: "",
    mobileImage: ""
  },
  headerWelcomeMessages: [
    "LBC xin chào.",
    "Hướng đến Y học Cá nhân hóa.",
    "Tiên phong trong ứng dụng công nghệ cao."
  ],
  searchSuggestions: [
    "Trị mụn",
    "Trị nám",
    "Nâng cơ",
    "Triệt lông",
    "Bioderma"
  ],
  socialLinks: {
    facebook: "https://facebook.com/lacsbeautycenter",
    tiktok: "https://tiktok.com/@lacsbeautycenter",
    zalo: "https://zalo.me/lacsbeautycenter",
    messenger: "https://m.me/lacsbeautycenter",
    youtube: "https://youtube.com/@lacsbeautycenter",
    shopee: "https://shopee.vn/lacsbeautycenter",
    tiktokShop: "https://tiktok.com/@lacsbeautycenter/shop"
  },
  operatingHours: "08:00 – 20:00 (Hằng ngày)",
  seoDefault: {
    title: "Phòng khám Chuyên khoa Da liễu Lạc's Beauty Center | Cần Thơ",
    description: "Phòng khám Chuyên khoa Da liễu Lạc's Beauty Center tại Cần Thơ. Đội ngũ bác sĩ trình độ sau đại học, tiên phong công nghệ cao, y học cá nhân hóa.",
    keywords: "da liễu Cần Thơ, trị mụn Cần Thơ, trị nám Cần Thơ, nâng cơ, Lạc's Beauty Center, bác sĩ da liễu"
  },
  popupBanner: {
    enabled: false,
    title: "Mừng Khai Trương Cơ Sở 02 Lạc's Beauty Center",
    description: "Trải nghiệm soi da VISIA 3D đa tầng miễn phí và nhận phác đồ điều trị cá nhân hóa từ Bác sĩ Chuyên khoa.",
    imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
    link: "/he-thong-co-so"
  },
  floatingContact: {
    enabled: true,
    actions: [
      { id: "act-hotline", type: "hotline", label: "Hotline 1900 6750", url: "tel:19006750", enabled: true, order: 1 },
      { id: "act-zalo", type: "zalo", label: "Chat Zalo OA", url: "https://zalo.me/lacsbeautycenter", enabled: true, order: 2 },
      { id: "act-messenger", type: "messenger", label: "Messenger phòng khám", url: "https://m.me/lacsbeautycenter", enabled: true, order: 3 },
      { id: "act-facilities", type: "facilities", label: "Hệ thống 2 cơ sở", url: "/he-thong-co-so", enabled: true, order: 4 }
    ]
  },
  aboutConfig: {
    enabled: true,
    badge: "VỀ CHÚNG TÔI",
    title: "Phòng khám Chuyên khoa Da liễu Lạc's Beauty Center",
    description: "Tọa lạc tại trung tâm thành phố Cần Thơ, Lạc's Beauty Center được xây dựng với định vị là phòng khám da liễu chuẩn y khoa chuyên sâu. Chúng tôi không chạy theo các trào lưu làm đẹp lột tẩy cấp tốc, mà kiên định theo đuổi triết lý Y học Cá nhân hóa: mỗi làn da cần một phác đồ khoa học riêng biệt dựa trên bằng chứng soi da vi thể và theo dõi sát sao của bác sĩ chuyên khoa sau đại học.",
    metricNumber: "10.000+",
    metricLabel: "Ca điều trị chuẩn Y khoa",
    metricBadge: "VISIA 3D",
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
    cta1Enabled: true,
    cta2Text: "Hồ sơ Bác sĩ",
    cta2Link: "/doi-ngu-bac-si",
    cta2Enabled: true,
    ctaText: "Xem câu chuyện thương hiệu",
    ctaLink: "/gioi-thieu"
  },
  bannerTopConfig: initialBannerTopConfig,
  headerMainConfig: initialHeaderMainConfig,
  logoHeader: "/images/logo.svg",
  logoUrl: "/images/logo.svg",
  logoWhiteUrl: "/images/logo-white.svg",
  logoFooterUrl: "/images/logo-white.svg",
  backToTop: {
    enabled: true,
    iconName: "ArrowUp",
    position: "bottom-right",
    bottomOffsetDesktop: 96,
    bottomOffsetMobile: 76,
    sideOffset: 24,
    backgroundColor: "#0E7C86",
    iconColor: "#FFFFFF",
    hoverBackgroundColor: "#096068",
    size: "md",
    borderRadius: "full",
    scrollThreshold: 300,
    tooltipText: "Cuộn lên đầu trang"
  },
  specialtiesSectionConfig: defaultSpecialtiesSectionConfig,
  theme: defaultThemeConfig
};
