const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const lucide = require('lucide-react');

// Target Directories
const TARGET_ASSETS_DIR = path.resolve('public', 'assets', 'icons');
const LEGACY_PUBLIC_DIR = path.resolve('public', 'icons');
const LEGACY_ROOT_DIR = path.resolve('icons');

const CATEGORIES = [
  'brand',
  'medical-clinic',
  'dermatology-services',
  'specialties',
  'technology-equipment',
  'laboratory',
  'pharmacy-products',
  'academy-training',
  'doctors-team',
  'ui-navigation',
  'status-feedback',
  'payment',
  'shared'
];

// Ensure all target directories exist
CATEGORIES.forEach(cat => {
  const p = path.join(TARGET_ASSETS_DIR, cat);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

// Helper: render Lucide component to static SVG string
function renderLucideSvg(compName) {
  const Comp = lucide[compName];
  if (!Comp) return null;
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(Comp, {
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  );
}

// Master Icon Definitions mapped to LBC Domain Categories
const ICON_DEFINITIONS = [
  // ==========================================
  // A. BRAND — Nhận diện thương hiệu
  // ==========================================
  {
    name: 'brand-logo-color',
    category: 'brand',
    label: 'Logo LBC màu chuẩn',
    description: 'Logo chính thức có biểu tượng hoa sen y khoa và chữ Lạc\'s Beauty Center',
    lucideSource: null,
    customSvg: fs.readFileSync('public/images/logo.svg', 'utf8').trim(),
    usedIn: ['Header', 'Footer', 'BrandingIdentityTab'],
    keywords: ['logo', 'lbc', 'thuong hieu', 'brand', 'chinh thuc', 'hoa sen']
  },
  {
    name: 'brand-logo-white',
    category: 'brand',
    label: 'Logo LBC âm bản trắng',
    description: 'Logo phiên bản màu trắng cho nền tối, thanh điều hướng và chân trang',
    lucideSource: null,
    customSvg: fs.readFileSync('public/images/logo-white.svg', 'utf8').trim(),
    usedIn: ['Header', 'Footer', 'AppearanceTab'],
    keywords: ['logo', 'white', 'am ban', 'trang', 'header', 'footer']
  },
  {
    name: 'brand-emblem-lotus',
    category: 'brand',
    label: 'Biểu tượng Hoa Sen Y Khoa LBC',
    description: 'Monogram độc bản chữ L cách điệu chữ thập y khoa và búp sen ngọc',
    lucideSource: null,
    customSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" fill="none">
  <rect width="100" height="100" rx="25" fill="#0E7C86" />
  <circle cx="50" cy="50" r="40" stroke="white" stroke-width="2" stroke-opacity="0.3" stroke-dasharray="4 4"/>
  <path d="M38 30V70C38 76.6 43.4 82 50 82H70" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="70" cy="38" r="6" fill="#5EEAD4" />
  <path d="M60 50C65 44 72 44 75 50C77 56 70 62 60 67" stroke="#5EEAD4" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
    usedIn: ['BrandingIdentityTab', 'Favicon', 'EcosystemSpecialtiesSection'],
    keywords: ['monogram', 'emblem', 'hoa sen', 'y khoa', 'bieu tuong', 'lotus']
  },
  {
    name: 'brand-clinic-graphic',
    category: 'brand',
    label: 'Đồ họa đại diện cơ sở phòng khám',
    description: 'Hình minh họa đồ họa cơ sở y tế phòng khám chuẩn GPHĐ',
    lucideSource: null,
    customSvg: fs.readFileSync('public/images/fallback-clinic.svg', 'utf8').trim(),
    usedIn: ['TechnologiesSection', 'NewsTabsSection', 'BrandsSection', 'AboutSummarySection'],
    keywords: ['co so', 'phong kham', 'clinic', 'fallback', 'toa nha']
  },
  {
    name: 'brand-facebook',
    category: 'brand',
    label: 'Facebook Fanpage Icon',
    description: 'Biểu tượng Fanpage Facebook Lạc\'s Beauty Center',
    lucideSource: null,
    customSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
</svg>`,
    usedIn: ['Footer', 'ContactFloatingBar'],
    keywords: ['facebook', 'fanpage', 'social', 'mang xa hoi']
  },
  {
    name: 'brand-youtube',
    category: 'brand',
    label: 'YouTube Channel Icon',
    description: 'Biểu tượng Kênh YouTube chính thức LBC',
    lucideSource: null,
    customSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FF0000">
  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
</svg>`,
    usedIn: ['Footer'],
    keywords: ['youtube', 'video', 'kenh', 'social']
  },
  {
    name: 'brand-zalo',
    category: 'brand',
    label: 'Zalo Official Account Icon',
    description: 'Biểu tượng Zalo OA Phòng khám Da liễu',
    lucideSource: null,
    customSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <rect width="24" height="24" rx="6" fill="#0068FF" />
  <path d="M6 8.5H12L8 15.5H14" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="16.5" cy="11.5" r="2.5" stroke="white" stroke-width="1.8"/>
</svg>`,
    usedIn: ['Footer', 'ContactFloatingBar'],
    keywords: ['zalo', 'chat', 'oa', 'tu van']
  },
  {
    name: 'brand-tiktok',
    category: 'brand',
    label: 'TikTok Channel Icon',
    description: 'Biểu tượng Kênh TikTok Lạc\'s Beauty Center',
    lucideSource: null,
    customSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000000">
  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.11V9.42a6.33 6.33 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.16 8.16 0 0 0 4.77 1.52V6.82a4.85 4.85 0 0 1-1-.13z"/>
</svg>`,
    usedIn: ['Footer'],
    keywords: ['tiktok', 'video', 'kenh', 'social']
  },
  {
    name: 'brand-shopee',
    category: 'brand',
    label: 'Shopee Mall Icon',
    description: 'Biểu tượng Gian hàng chính hãng Shopee Mall',
    lucideSource: null,
    customSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <rect width="24" height="24" rx="6" fill="#EE4D2D" />
  <path d="M6.5 9.5H17.5L16.2 18H7.8L6.5 9.5Z" fill="white" fill-opacity="0.2" stroke="white" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M9.5 9.5V7C9.5 5.6 10.6 4.5 12 4.5C13.4 4.5 14.5 5.6 14.5 7V9.5" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M13.5 12C13.5 12.8 12.8 13.5 12 13.5C11.2 13.5 10.5 12.8 10.5 12" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,
    usedIn: ['Footer', 'EcommerceLink'],
    keywords: ['shopee', 'mall', 'gian hang', 'mua sam']
  },
  {
    name: 'brand-messenger',
    category: 'brand',
    label: 'Facebook Messenger Icon',
    description: 'Biểu tượng Chat Facebook Messenger phòng khám',
    lucideSource: null,
    customSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#0084FF">
  <path d="M12 2C6.48 2 2 6.03 2 11C2 13.84 3.46 16.35 5.75 17.9V22L9.67 19.84C10.42 20.05 11.19 20.17 12 20.17C17.52 20.17 22 16.14 22 11.17C22 6.03 17.52 2 12 2ZM13.06 14.28L10.52 11.56L5.56 14.28L11.02 8.48L13.56 11.2L18.52 8.48L13.06 14.28Z"/>
</svg>`,
    usedIn: ['ContactFloatingBar', 'Footer'],
    keywords: ['messenger', 'chat', 'tin nhan', 'tu van']
  },

  // ==========================================
  // B. MEDICAL-CLINIC — Phòng khám và y khoa
  // ==========================================
  {
    name: 'medical-stethoscope',
    category: 'medical-clinic',
    label: 'Ống nghe y khoa',
    description: 'Biểu tượng chẩn đoán lâm sàng, thăm khám Bác sĩ',
    lucideSource: 'Stethoscope',
    usedIn: ['KhoaDaLieu', 'DoctorSection', 'CoreValuesSection'],
    keywords: ['bac si', 'y khoa', 'ong nghe', 'kham benh', 'chuyen khoa', 'stethoscope']
  },
  {
    name: 'medical-heart-pulse',
    category: 'medical-clinic',
    label: 'Nhịp tim sinh học',
    description: 'Biểu tượng theo dõi sinh hiệu, sức khỏe làn da',
    lucideSource: 'HeartPulse',
    usedIn: ['CoreValuesSection', 'DoctorSection'],
    keywords: ['nhip tim', 'sinh hoc', 'suc khoe', 'song', 'pulse']
  },
  {
    name: 'medical-heart-care',
    category: 'medical-clinic',
    label: 'Trái tim y đức & Tận tâm',
    description: 'Biểu tượng sứ mệnh chăm sóc tận tâm, đồng hành trọn vẹn',
    lucideSource: 'HeartHandshake',
    usedIn: ['AboutSummarySection', 'CoreValuesSection'],
    keywords: ['y duc', 'tan tam', 'cham soc', 'dong hanh', 'heart', 'care']
  },
  {
    name: 'medical-safety-shield',
    category: 'medical-clinic',
    label: 'Khiên an toàn y tế',
    description: 'Biểu tượng cam kết chuẩn y khoa, an toàn điều trị',
    lucideSource: 'ShieldCheck',
    usedIn: ['CoreValuesSection', 'LegalInfoSection'],
    keywords: ['an toan', 'khien', 'chuan y khoa', 'shield', 'bao ve']
  },
  {
    name: 'medical-biometric',
    category: 'medical-clinic',
    label: 'Vân tay cá nhân hóa',
    description: 'Biểu tượng phác đồ y học cá nhân hóa độc bản',
    lucideSource: 'Fingerprint',
    usedIn: ['CoreValuesSection'],
    keywords: ['van tay', 'ca nhan hoa', 'biometric', 'phac do', 'fingerprint']
  },
  {
    name: 'medical-file-check',
    category: 'medical-clinic',
    label: 'Hồ sơ bệnh án thẩm định',
    description: 'Biểu tượng hồ sơ bệnh án được bác sĩ ký duyệt',
    lucideSource: 'FileCheck',
    usedIn: ['DoctorSection', 'MedicalRecords'],
    keywords: ['benh an', 'ho so', 'tham dinh', 'kiem tra', 'file']
  },
  {
    name: 'medical-clinical-scale',
    category: 'medical-clinic',
    label: 'Cân bằng y học & Đạo đức',
    description: 'Biểu tượng cân bằng liều lượng và tính minh bạch',
    lucideSource: 'Scale',
    usedIn: ['LegalInfoSection', 'CoreValuesSection'],
    keywords: ['can bang', 'phap ly', 'dao duc', 'minh bach', 'scale']
  },

  // ==========================================
  // C. DERMATOLOGY-SERVICES — Dịch vụ da liễu & thẩm mỹ (10 dịch vụ chuẩn)
  // ==========================================
  {
    name: 'dermatology-acne-care',
    category: 'dermatology-services',
    label: 'Đặc trị mụn & Mụn kháng trị',
    description: 'Biểu tượng điều trị mụn chuyên sâu, làm sạch nang lông và ức chế vi khuẩn P.acnes',
    lucideSource: 'ShieldAlert',
    usedIn: ['FeaturedServicesSection (srv-01)', 'ServicesTab'],
    keywords: ['mun', 'khang tri', 'viem', 'acne', 'tri mun', 'da lieu']
  },
  {
    name: 'dermatology-scar-repair',
    category: 'dermatology-services',
    label: 'Trị sẹo rỗ kỹ thuật cao',
    description: 'Biểu tượng tái tạo phục hồi mô xơ, bóc tách đáy sẹo và làm phẳng bề mặt da',
    lucideSource: 'Activity',
    usedIn: ['FeaturedServicesSection (srv-02)', 'ServicesTab'],
    keywords: ['seo', 'seo ro', 'subcision', 'phuc hoi mo', 'tai tao', 'scar']
  },
  {
    name: 'dermatology-pigment-sun',
    category: 'dermatology-services',
    label: 'Trị nám – tàn nhang & sắc tố',
    description: 'Biểu tượng điều trị rối loạn sắc tố, ức chế melanin màng đáy và làm sáng da',
    lucideSource: 'SunMedium',
    usedIn: ['FeaturedServicesSection (srv-03)', 'ServicesTab'],
    keywords: ['nam', 'tan nhang', 'doi moi', 'sac to', 'melanin', 'sun']
  },
  {
    name: 'dermatology-hair-scalp',
    category: 'dermatology-services',
    label: 'Trị rụng tóc & Kích thích nang tóc',
    description: 'Biểu tượng phục hồi nang tóc, kích thích mầm tóc tơ và điều trị hói đầu',
    lucideSource: 'Feather',
    usedIn: ['FeaturedServicesSection (srv-04)', 'ServicesTab'],
    keywords: ['rung toc', 'hoi dau', 'nang toc', 'da dau', 'hair', 'scalp']
  },
  {
    name: 'dermatology-meso-injection',
    category: 'dermatology-services',
    label: 'Thẩm mỹ nội khoa & Tiêm vi điểm',
    description: 'Biểu tượng thủ thuật tiêm vi điểm Meso, tiêm BAP, trẻ hóa da chuẩn y khoa',
    lucideSource: 'Syringe',
    usedIn: ['FeaturedServicesSection (srv-05)', 'ServicesTab'],
    keywords: ['tiem', 'meso', 'botox', 'filler', 'noi khoa', 'tre hoa', 'syringe']
  },
  {
    name: 'dermatology-lifting-contour',
    category: 'dermatology-services',
    label: 'Nâng cơ trẻ hóa da công nghệ cao',
    description: 'Biểu tượng sóng RF Jovena và HIFU kích hoạt co rút sợi collagen viền hàm',
    lucideSource: 'Zap',
    usedIn: ['FeaturedServicesSection (srv-06)', 'ServicesTab'],
    keywords: ['nang co', 'jovena', 'rf', 'hifu', 'tre hoa', 'thon gon', 'zap']
  },
  {
    name: 'dermatology-skin-facial',
    category: 'dermatology-services',
    label: 'Chăm sóc da chuyên sâu',
    description: 'Biểu tượng cấp ẩm đa tầng, phục hồi hàng rào sinh học và làm dịu da nhạy cảm',
    lucideSource: 'Sparkles',
    usedIn: ['FeaturedServicesSection (srv-07)', 'ServicesTab'],
    keywords: ['cham soc da', 'phuc hoi', 'dien di', 'cap am', 'mat na', 'facial']
  },
  {
    name: 'dermatology-exam-diagnosis',
    category: 'dermatology-services',
    label: 'Khám bệnh lý da liễu khác',
    description: 'Biểu tượng chẩn đoán viêm da cơ địa, viêm da tiết bã, mề đay, vảy nến',
    lucideSource: 'Microscope',
    usedIn: ['FeaturedServicesSection (srv-08)', 'ServicesTab'],
    keywords: ['kham da', 'benh da', 'vay nen', 'viem da', 'me day', 'cham']
  },
  {
    name: 'dermatology-laser-hair-removal',
    category: 'dermatology-services',
    label: 'Triệt lông Diode Laser Sapphire',
    description: 'Biểu tượng triệt lông bằng công nghệ Diode Laser làm mát sapphire không đau',
    lucideSource: 'Sparkle',
    usedIn: ['FeaturedServicesSection (srv-09)', 'ServicesTab'],
    keywords: ['triet long', 'laser', 'diode', 'sapphire', 'nang long']
  },
  {
    name: 'dermatology-visia-booking',
    category: 'dermatology-services',
    label: 'Đặt lịch soi da VISIA 3D',
    description: 'Biểu tượng đặt lịch khám và phân tích 8 chỉ số chuyên sâu cùng Bác sĩ',
    lucideSource: 'CalendarCheck',
    usedIn: ['FeaturedServicesSection (slot 10)', 'BookingModal'],
    keywords: ['visia', 'soi da', 'dat lich', 'kham da', 'calendar', 'booking']
  },

  // ==========================================
  // D. SPECIALTIES — Chuyên khoa và hệ sinh thái
  // ==========================================
  {
    name: 'specialties-dermatology',
    category: 'specialties',
    label: 'Khoa Da liễu',
    description: 'Chuyên khoa mũi nhọn chẩn đoán và điều trị bệnh lý da',
    lucideSource: 'Stethoscope',
    usedIn: ['EcosystemSpecialtiesSection (spec-01)', 'SpecialtiesTab'],
    keywords: ['khoa da lieu', 'chuyen khoa', 'da lieu', 'dermatology']
  },
  {
    name: 'specialties-laboratory',
    category: 'specialties',
    label: 'Khoa Xét nghiệm',
    description: 'Khoa xét nghiệm vi sinh, soi tươi Demodex và nấm da',
    lucideSource: 'FlaskConical',
    usedIn: ['EcosystemSpecialtiesSection (spec-02)', 'SpecialtiesTab'],
    keywords: ['khoa xet nghiem', 'lab', 'xet nghiem', 'demodex', 'laboratory']
  },
  {
    name: 'specialties-pharmacy',
    category: 'specialties',
    label: 'Nhà thuốc chuẩn GPP',
    description: 'Nhà thuốc chuyên khoa cung cấp thuốc da liễu chuẩn GPP',
    lucideSource: 'Pill',
    usedIn: ['EcosystemSpecialtiesSection (spec-03)', 'SpecialtiesTab'],
    keywords: ['nha thuoc', 'gpp', 'thuoc ke don', 'pharmacy']
  },
  {
    name: 'specialties-cosmeceuticals',
    category: 'specialties',
    label: 'Dược – Mỹ phẩm chính ngạch',
    description: 'Phân phối dược mỹ phẩm nhập khẩu chính hãng từ châu Âu',
    lucideSource: 'Sparkles',
    usedIn: ['EcosystemSpecialtiesSection (spec-04)', 'SpecialtiesTab'],
    keywords: ['duoc my pham', 'chinh hang', 'bioderma', 'cosmeceuticals']
  },
  {
    name: 'specialties-academy',
    category: 'specialties',
    label: 'Đào tạo nghề – LBC Academy',
    description: 'Học viện đào tạo kỹ thuật viên spa và chăm sóc da chuẩn y khoa',
    lucideSource: 'GraduationCap',
    usedIn: ['EcosystemSpecialtiesSection (spec-05)', 'SpecialtiesTab'],
    keywords: ['dao tao', 'academy', 'hoc vien', 'nghe', 'training']
  },

  // ==========================================
  // E. TECHNOLOGY-EQUIPMENT — Công nghệ và thiết bị
  // ==========================================
  {
    name: 'technology-visia-3d',
    category: 'technology-equipment',
    label: 'Máy soi da đa tầng VISIA 3D',
    description: 'Hệ thống chụp và phân tích 8 tầng chỉ số da chuẩn Hoa Kỳ',
    lucideSource: 'Cpu',
    usedIn: ['TechnologiesSection', 'CoreValuesSection'],
    keywords: ['visia', 'soi da 3d', 'cong nghe', 'may moc', 'phan tich']
  },
  {
    name: 'technology-rf-jovena',
    category: 'technology-equipment',
    label: 'Sóng RF Jovena vi điểm',
    description: 'Thiết bị sóng RF cao tần tác động tái tạo collagen sâu',
    lucideSource: 'Zap',
    usedIn: ['TechnologiesSection'],
    keywords: ['jovena', 'rf', 'nang co', 'song cao tan', 'technology']
  },
  {
    name: 'technology-laser',
    category: 'technology-equipment',
    label: 'Laser chọn lọc xung ngắn',
    description: 'Công nghệ laser tán nhỏ melanin và điều trị sắc tố',
    lucideSource: 'Sparkle',
    usedIn: ['TechnologiesSection'],
    keywords: ['laser', 'xung ngan', 'tri nam', 'laser technology']
  },
  {
    name: 'technology-hardware-specs',
    category: 'technology-equipment',
    label: 'Thông số kỹ thuật thiết bị',
    description: 'Biểu tượng bo mạch vi xử lý công nghệ tân tiến',
    lucideSource: 'Cpu',
    usedIn: ['TechnologiesSection'],
    keywords: ['cpu', 'bo mach', 'vi xu ly', 'thiet bi']
  },

  // ==========================================
  // F. LABORATORY — Xét nghiệm và phòng lab
  // ==========================================
  {
    name: 'laboratory-microscope',
    category: 'laboratory',
    label: 'Kính hiển vi soi tươi',
    description: 'Thiết bị phóng đại soi tươi tìm Demodex và vi nấm',
    lucideSource: 'Microscope',
    usedIn: ['KhoaXetNghiem', 'ServicesTab'],
    keywords: ['kinh hien vi', 'soi tuoi', 'vi sinh', 'microscope']
  },
  {
    name: 'laboratory-flask-conical',
    category: 'laboratory',
    label: 'Bình thí nghiệm hóa sinh',
    description: 'Dụng cụ phân tích mẫu xét nghiệm và thử nghiệm vi sinh',
    lucideSource: 'FlaskConical',
    usedIn: ['KhoaXetNghiem'],
    keywords: ['binh thi nghiem', 'ong nghiem', 'hoa sinh', 'flask']
  },

  // ==========================================
  // G. PHARMACY-PRODUCTS — Nhà thuốc và sản phẩm
  // ==========================================
  {
    name: 'pharmacy-medicine',
    category: 'pharmacy-products',
    label: 'Thuốc y tế chuẩn GPP',
    description: 'Viên thuốc kê đơn điều trị da liễu chuẩn GPP',
    lucideSource: 'Pill',
    usedIn: ['NhaThuoc', 'ProductDetail'],
    keywords: ['thuoc', 'vien thuoc', 'gpp', 'uong', 'medicine', 'pill']
  },
  {
    name: 'pharmacy-cleanser-droplets',
    category: 'pharmacy-products',
    label: 'Nước làm sạch & tẩy trang',
    description: 'Dung dịch tẩy trang, sữa rửa mặt dịu lành cho da mẫn cảm',
    lucideSource: 'Droplets',
    usedIn: ['ProductsTab', 'FeaturedProductsSection'],
    keywords: ['lam sach', 'tay trang', 'sua rua mat', 'droplets']
  },
  {
    name: 'pharmacy-serum-droplet',
    category: 'pharmacy-products',
    label: 'Tinh chất serum đặc trị',
    description: 'Giọt tinh chất dưỡng ẩm, phục hồi màng biểu bì',
    lucideSource: 'Droplet',
    usedIn: ['ProductsTab', 'ProductDetail'],
    keywords: ['serum', 'tinh chat', 'duong am', 'giot nuoc', 'droplet']
  },
  {
    name: 'pharmacy-shopping-bag',
    category: 'pharmacy-products',
    label: 'Túi mua sắm dược mỹ phẩm',
    description: 'Biểu tượng giỏ hàng và danh mục mua sắm sản phẩm',
    lucideSource: 'ShoppingBag',
    usedIn: ['Header', 'ProductsTab', 'CartDrawer'],
    keywords: ['gio hang', 'mua sam', 'tui xach', 'shopping', 'cart']
  },
  {
    name: 'pharmacy-product-tag',
    category: 'pharmacy-products',
    label: 'Nhãn mác thương hiệu chính hãng',
    description: 'Nhãn phân loại sản phẩm và thương hiệu ủy quyền',
    lucideSource: 'Tag',
    usedIn: ['ProductsTab'],
    keywords: ['nhan mac', 'tag', 'thuong hieu', 'brand']
  },
  {
    name: 'pharmacy-combo-package',
    category: 'pharmacy-products',
    label: 'Hộp sản phẩm đóng gói combo',
    description: 'Hộp quà tặng combo liệu trình điều trị toàn diện',
    lucideSource: 'Package',
    usedIn: ['ProductsTab'],
    keywords: ['hop', 'combo', 'dong goi', 'set', 'package']
  },
  {
    name: 'pharmacy-best-seller-flame',
    category: 'pharmacy-products',
    label: 'Sản phẩm hot bán chạy',
    description: 'Nhãn sản phẩm tiêu biểu được bác sĩ khuyên dùng',
    lucideSource: 'Flame',
    usedIn: ['ProductsTab', 'FeaturedProductsSection'],
    keywords: ['hot', 'ban chay', 'tieu bieu', 'flame']
  },
  {
    name: 'pharmacy-quality-star',
    category: 'pharmacy-products',
    label: 'Đánh giá chất lượng 5 sao',
    description: 'Biểu tượng đánh giá hiệu quả sản phẩm từ khách hàng',
    lucideSource: 'Star',
    usedIn: ['ProductsTab', 'ReviewsSection'],
    keywords: ['danh gia', 'review', '5 sao', 'star']
  },

  // ==========================================
  // H. ACADEMY-TRAINING — Đào tạo và học viện
  // ==========================================
  {
    name: 'academy-graduation',
    category: 'academy-training',
    label: 'Mũ tốt nghiệp học viện',
    description: 'Biểu tượng tốt nghiệp khóa học nghề chăm sóc da chuẩn y khoa',
    lucideSource: 'GraduationCap',
    usedIn: ['DaoTao', 'DoctorSection', 'AcademySection'],
    keywords: ['tot nghiep', 'hoc vien', 'mu', 'academy', 'graduation']
  },
  {
    name: 'academy-certificate-award',
    category: 'academy-training',
    label: 'Chứng chỉ chuyên môn',
    description: 'Chứng chỉ hành nghề và thành tựu đào tạo kỹ thuật viên',
    lucideSource: 'Award',
    usedIn: ['DaoTao', 'DoctorSection'],
    keywords: ['chung chi', 'bang khen', 'thanh tuu', 'award']
  },
  {
    name: 'academy-curriculum-book',
    category: 'academy-training',
    label: 'Giáo trình đào tạo',
    description: 'Tài liệu và giáo trình giảng dạy da liễu chuẩn mực',
    lucideSource: 'BookOpen',
    usedIn: ['DaoTao'],
    keywords: ['giao trinh', 'sach', 'tai lieu', 'book']
  },

  // ==========================================
  // I. DOCTORS-TEAM — Đội ngũ bác sĩ
  // ==========================================
  {
    name: 'doctors-specialist',
    category: 'doctors-team',
    label: 'Bác sĩ chuyên khoa Da liễu',
    description: 'Biểu tượng hồ sơ cá nhân Bác sĩ trình độ Sau Đại học',
    lucideSource: 'User',
    usedIn: ['DoctorSection', 'DoctorDetailPage'],
    keywords: ['bac si', 'chuyen gia', 'ho so', 'doctor']
  },
  {
    name: 'doctors-team-users',
    category: 'doctors-team',
    label: 'Hội đồng bác sĩ & Chuyên môn',
    description: 'Đội ngũ bác sĩ và kỹ thuật viên chuyên khoa phòng khám',
    lucideSource: 'Users',
    usedIn: ['DoctorSection', 'AboutSummarySection'],
    keywords: ['doi ngu', 'bac si', 'hoi dong', 'nhan su', 'users']
  },
  {
    name: 'doctors-degree-award',
    category: 'doctors-team',
    label: 'Bằng cấp & Học hàm bác sĩ',
    description: 'Bằng Thạc sĩ, Bác sĩ Chuyên khoa I Da liễu Sau Đại học',
    lucideSource: 'Award',
    usedIn: ['DoctorSection', 'DoctorDetailPage'],
    keywords: ['bang cap', 'thac si', 'chuyen khoa', 'award']
  },

  // ==========================================
  // J. UI-NAVIGATION — Điều hướng và giao diện
  // ==========================================
  {
    name: 'navigation-menu',
    category: 'ui-navigation',
    label: 'Nút Menu điều hướng',
    description: 'Nút đóng mở thanh điều hướng mobile',
    lucideSource: 'Menu',
    usedIn: ['Header', 'MobileMenu'],
    keywords: ['menu', 'dieu huong', 'thanh menu']
  },
  {
    name: 'navigation-close-x',
    category: 'ui-navigation',
    label: 'Nút Đóng / Thoát (X)',
    description: 'Nút tắt modal, đóng cửa sổ popup',
    lucideSource: 'X',
    usedIn: ['Modal', 'Drawer', 'Header'],
    keywords: ['dong', 'tat', 'close', 'x']
  },
  {
    name: 'navigation-search',
    category: 'ui-navigation',
    label: 'Kính lúp tìm kiếm',
    description: 'Công cụ tìm kiếm dịch vụ, bác sĩ, dược mỹ phẩm',
    lucideSource: 'Search',
    usedIn: ['Header', 'SearchModal'],
    keywords: ['tim kiem', 'tra cuu', 'search']
  },
  {
    name: 'navigation-hotline-phone',
    category: 'ui-navigation',
    label: 'Hotline 1900 6750',
    description: 'Nút gọi điện thoại liên hệ trực tiếp phòng khám',
    lucideSource: 'Phone',
    usedIn: ['Header', 'Footer', 'ContactFloatingBar'],
    keywords: ['hotline', 'dien thoai', 'goi', 'phone']
  },
  {
    name: 'navigation-phone-call',
    category: 'ui-navigation',
    label: 'Cuộc gọi tư vấn',
    description: 'Nút bấm gọi lại tư vấn miễn phí',
    lucideSource: 'PhoneCall',
    usedIn: ['ContactModal', 'BookingPage'],
    keywords: ['cuoc goi', 'goi lai', 'phone call']
  },
  {
    name: 'navigation-hours-clock',
    category: 'ui-navigation',
    label: 'Giờ mở cửa (08:00 - 20:00)',
    description: 'Biểu tượng thông báo giờ làm việc phòng khám',
    lucideSource: 'Clock',
    usedIn: ['Header', 'Footer', 'ScheduleSection'],
    keywords: ['gio mo cua', 'thoi gian', 'lam viec', 'clock']
  },
  {
    name: 'navigation-location-pin',
    category: 'ui-navigation',
    label: 'Địa chỉ cơ sở phòng khám',
    description: 'Vị trí địa lý cơ sở 1 và cơ sở 2 Cần Thơ',
    lucideSource: 'MapPin',
    usedIn: ['Header', 'Footer', 'ContactPage'],
    keywords: ['dia chi', 'co so', 'vi tri', 'ban do', 'map pin']
  },
  {
    name: 'navigation-appointment-calendar',
    category: 'ui-navigation',
    label: 'Lịch hẹn khám bệnh',
    description: 'Biểu tượng chọn ngày và đặt lịch hẹn khám',
    lucideSource: 'Calendar',
    usedIn: ['BookingModal', 'DoctorSchedule'],
    keywords: ['lich hen', 'ngay thang', 'calendar']
  },
  {
    name: 'navigation-back-to-top',
    category: 'ui-navigation',
    label: 'Nút cuộn lên đầu trang (Back to top)',
    description: 'Mũi tên hỗ trợ người dùng cuộn nhanh về đầu trang',
    lucideSource: 'ArrowUp',
    usedIn: ['BackToTop'],
    keywords: ['len dau trang', 'cuon', 'back to top', 'arrow up']
  },
  {
    name: 'navigation-arrow-right',
    category: 'ui-navigation',
    label: 'Mũi tên xem tiếp (Arrow Right)',
    description: 'Nút kêu gọi hành động CTA xem chi tiết',
    lucideSource: 'ArrowRight',
    usedIn: ['FeaturedServicesSection', 'Button'],
    keywords: ['mui ten', 'xem tiep', 'cta', 'arrow right']
  },
  {
    name: 'navigation-arrow-left',
    category: 'ui-navigation',
    label: 'Mũi tên quay lại (Arrow Left)',
    description: 'Nút quay lại trang trước',
    lucideSource: 'ArrowLeft',
    usedIn: ['BackButton', 'Pagination'],
    keywords: ['quay lai', 'tro ve', 'arrow left']
  },
  {
    name: 'navigation-chevron-down',
    category: 'ui-navigation',
    label: 'Mũi tên mở rộng (Chevron Down)',
    description: 'Mũi tên mở menu thả xuống và câu hỏi thường gặp FAQ',
    lucideSource: 'ChevronDown',
    usedIn: ['DropdownMenu', 'FaqAccordion'],
    keywords: ['mo rong', 'xo xuong', 'chevron down']
  },
  {
    name: 'navigation-chevron-up',
    category: 'ui-navigation',
    label: 'Mũi tên thu gọn (Chevron Up)',
    description: 'Mũi tên thu gọn danh mục và Back To Top',
    lucideSource: 'ChevronUp',
    usedIn: ['BackToTop', 'FaqAccordion'],
    keywords: ['thu gon', 'chevron up']
  },
  {
    name: 'navigation-mail',
    category: 'ui-navigation',
    label: 'Hòm thư điện tử (Email)',
    description: 'Địa chỉ email liên hệ hỗ trợ phòng khám',
    lucideSource: 'Mail',
    usedIn: ['Footer', 'ContactPage'],
    keywords: ['email', 'thu', 'hop thu', 'mail']
  },
  {
    name: 'navigation-share',
    category: 'ui-navigation',
    label: 'Chia sẻ liên kết',
    description: 'Nút chia sẻ bài viết dịch vụ lên mạng xã hội',
    lucideSource: 'Share2',
    usedIn: ['ArticleDetail', 'ServiceDetail'],
    keywords: ['chia se', 'share', 'lien ket']
  },
  {
    name: 'navigation-globe',
    category: 'ui-navigation',
    label: 'Website trực tuyến',
    description: 'Biểu tượng website chính thức và ngôn ngữ',
    lucideSource: 'Globe',
    usedIn: ['Footer'],
    keywords: ['website', 'toan cau', 'globe']
  },

  // ==========================================
  // K. STATUS-FEEDBACK — Trạng thái và thông báo
  // ==========================================
  {
    name: 'status-success',
    category: 'status-feedback',
    label: 'Trạng thái Thành công (Check Circle)',
    description: 'Thông báo thao tác gửi lịch hẹn / lưu dữ liệu thành công',
    lucideSource: 'CheckCircle2',
    usedIn: ['Toast', 'BookingModal', 'CmsAlert'],
    keywords: ['thanh cong', 'hoan thanh', 'xong', 'success', 'check']
  },
  {
    name: 'status-check',
    category: 'status-feedback',
    label: 'Dấu tích kiểm tra xác nhận',
    description: 'Biểu tượng xác nhận các điều khoản hoặc hoàn thành bước',
    lucideSource: 'Check',
    usedIn: ['IconPickerModal', 'ProtocolSteps'],
    keywords: ['xac nhan', 'tich', 'check']
  },
  {
    name: 'status-warning',
    category: 'status-feedback',
    label: 'Cảnh báo y khoa (Alert Triangle)',
    description: 'Thông báo lưu ý chống chỉ định hoặc cảnh báo quan trọng',
    lucideSource: 'AlertTriangle',
    usedIn: ['AlertBox', 'MedicalDisclaimer'],
    keywords: ['canh bao', 'chu y', 'luu y', 'warning']
  },
  {
    name: 'status-error',
    category: 'status-feedback',
    label: 'Thông báo lỗi (Alert Circle)',
    description: 'Thông báo lỗi nhập liệu hoặc trạng thái thất bại',
    lucideSource: 'AlertCircle',
    usedIn: ['FormValidation', 'Toast'],
    keywords: ['loi', 'that bai', 'canh bao', 'error']
  },
  {
    name: 'status-info',
    category: 'status-feedback',
    label: 'Thông tin hướng dẫn (Info)',
    description: 'Biểu tượng cung cấp thêm thông tin chú thích',
    lucideSource: 'Info',
    usedIn: ['Tooltip', 'HelpBox'],
    keywords: ['thong tin', 'chu thich', 'huong dan', 'info']
  },
  {
    name: 'status-help',
    category: 'status-feedback',
    label: 'Trợ giúp & Câu hỏi (Help)',
    description: 'Biểu tượng trung tâm trợ giúp và giải đáp thắc mắc',
    lucideSource: 'HelpCircle',
    usedIn: ['Header', 'FaqSection'],
    keywords: ['tro giup', 'cau hoi', 'thac mac', 'help']
  },
  {
    name: 'status-refresh-loading',
    category: 'status-feedback',
    label: 'Đang làm mới / Tải lại',
    description: 'Biểu tượng làm mới danh sách dữ liệu hoặc đồng bộ',
    lucideSource: 'RefreshCw',
    usedIn: ['CmsHeader', 'SyncButton'],
    keywords: ['tai lai', 'lam moi', 'refresh', 'loading']
  },

  // ==========================================
  // L. PAYMENT — Thanh toán chính thức
  // ==========================================
  {
    name: 'payment-cash',
    category: 'payment',
    label: 'Tiền mặt tại quầy',
    description: 'Phương thức thanh toán bằng tiền mặt tại quầy thu ngân phòng khám',
    lucideSource: 'DollarSign',
    usedIn: ['PolicyPage', 'CheckoutModal'],
    keywords: ['tien mat', 'quay thu ngan', 'dong tien', 'cash']
  },
  {
    name: 'payment-credit-card',
    category: 'payment',
    label: 'Thẻ tín dụng / Ghi nợ (Visa, Mastercard)',
    description: 'Phương thức quẹt thẻ ngân hàng máy POS tại phòng khám',
    lucideSource: 'CreditCard',
    usedIn: ['PolicyPage', 'CheckoutModal'],
    keywords: ['the tin dung', 'visa', 'mastercard', 'pos', 'credit card']
  },
  {
    name: 'payment-bank-transfer',
    category: 'payment',
    label: 'Chuyển khoản ngân hàng (VietQR)',
    description: 'Phương thức chuyển khoản ngân hàng qua tài khoản phòng khám',
    lucideSource: 'Building2',
    usedIn: ['PolicyPage', 'CheckoutModal'],
    keywords: ['chuyen khoan', 'ngan hang', 'vietqr', 'bank transfer']
  },

  // ==========================================
  // M. SHARED — Icon dùng chung & Quản trị CMS
  // ==========================================
  {
    name: 'shared-settings',
    category: 'shared',
    label: 'Cài đặt hệ thống (Settings)',
    description: 'Bánh răng quản trị hệ thống CMS LBC',
    lucideSource: 'Settings',
    usedIn: ['AdminLayout', 'AppearanceTab'],
    keywords: ['cai dat', 'cau hinh', 'settings']
  },
  {
    name: 'shared-edit',
    category: 'shared',
    label: 'Chỉnh sửa nội dung (Edit)',
    description: 'Nút biên tập bài viết, dịch vụ, sản phẩm',
    lucideSource: 'Edit',
    usedIn: ['AdminTabs', 'TableActions'],
    keywords: ['sua', 'bien tap', 'edit']
  },
  {
    name: 'shared-trash',
    category: 'shared',
    label: 'Xóa mục (Trash)',
    description: 'Nút xóa dữ liệu vào thùng rác',
    lucideSource: 'Trash2',
    usedIn: ['AdminTabs', 'TableActions'],
    keywords: ['xoa', 'thung rac', 'trash']
  },
  {
    name: 'shared-database',
    category: 'shared',
    label: 'Cơ sở dữ liệu (Database)',
    description: 'Biểu tượng cơ sở dữ liệu Neon / CMS Data',
    lucideSource: 'Database',
    usedIn: ['AdminOverview', 'SystemStatus'],
    keywords: ['co so du lieu', 'database', 'neon']
  },
  {
    name: 'shared-upload',
    category: 'shared',
    label: 'Tải tệp lên (Upload)',
    description: 'Nút tải ảnh hoặc tệp SVG lên hệ thống',
    lucideSource: 'Upload',
    usedIn: ['MediaLibraryModal', 'BrandingIdentityTab'],
    keywords: ['tai len', 'upload', 'chon file']
  },
  {
    name: 'shared-download',
    category: 'shared',
    label: 'Tải về máy (Download)',
    description: 'Nút tải file báo cáo, tải SVG về máy tính',
    lucideSource: 'Download',
    usedIn: ['IconLibrary', 'MediaLibraryModal'],
    keywords: ['tai ve', 'download', 'luu file']
  },
  {
    name: 'shared-eye',
    category: 'shared',
    label: 'Hiển thị / Xem trước (Eye)',
    description: 'Nút bật hiển thị hoặc xem trước giao diện',
    lucideSource: 'Eye',
    usedIn: ['AdminTabs', 'PreviewModal'],
    keywords: ['xem', 'hien thi', 'eye']
  },
  {
    name: 'shared-eye-off',
    category: 'shared',
    label: 'Ẩn mục (Eye Off)',
    description: 'Nút tắt hiển thị mục khỏi giao diện người dùng',
    lucideSource: 'EyeOff',
    usedIn: ['AdminTabs'],
    keywords: ['an', 'khong hien thi', 'eye off']
  },
  {
    name: 'shared-lock',
    category: 'shared',
    label: 'Bảo mật / Khóa (Lock)',
    description: 'Biểu tượng khóa quyền quản trị và chứng chỉ SSL',
    lucideSource: 'Lock',
    usedIn: ['AdminLogin', 'SecuritySettings'],
    keywords: ['khoa', 'bao mat', 'lock']
  },
  {
    name: 'shared-palette',
    category: 'shared',
    label: 'Màu sắc giao diện (Palette)',
    description: 'Biểu tượng tùy biến bảng màu thương hiệu',
    lucideSource: 'Palette',
    usedIn: ['AppearanceTab'],
    keywords: ['mau sac', 'giao dien', 'palette']
  },
  {
    name: 'shared-filter',
    category: 'shared',
    label: 'Bộ lọc danh sách (Filter)',
    description: 'Công cụ lọc dữ liệu theo tiêu chí',
    lucideSource: 'Filter',
    usedIn: ['ProductsTab', 'ServicesTab'],
    keywords: ['bo loc', 'loc', 'filter']
  },
  {
    name: 'shared-copy',
    category: 'shared',
    label: 'Sao chép (Copy)',
    description: 'Nút sao chép mã SVG hoặc đường dẫn URL',
    lucideSource: 'Copy',
    usedIn: ['IconLibrary', 'MediaLibraryModal'],
    keywords: ['sao chep', 'copy']
  },
  {
    name: 'shared-code',
    category: 'shared',
    label: 'Mã nhúng HTML/SVG (Code)',
    description: 'Biểu tượng mã nguồn và nhúng SVG',
    lucideSource: 'Code',
    usedIn: ['AdminHeader', 'DevTools'],
    keywords: ['code', 'ma nguon', 'svg']
  },
  {
    name: 'shared-typography',
    category: 'shared',
    label: 'Định dạng chữ (Type)',
    description: 'Công cụ soạn thảo văn bản và định dạng font chữ',
    lucideSource: 'Type',
    usedIn: ['CmsEditor'],
    keywords: ['chu', 'font', 'typography', 'type']
  }
];

// 4. Process all icons and write files
console.log(`Processing ${ICON_DEFINITIONS.length} master domain icons...`);

const manifestEntries = [];

ICON_DEFINITIONS.forEach(def => {
  let svgContent = def.customSvg;
  if (!svgContent && def.lucideSource) {
    svgContent = renderLucideSvg(def.lucideSource);
  }

  if (!svgContent) {
    console.error(`Missing SVG content for ${def.name}`);
    return;
  }

  const cleanSvg = svgContent.includes('<!-- LBC')
    ? svgContent
    : `<!-- LBC Domain Icon: ${def.name} -->\n${svgContent}`;

  const targetCategoryDir = path.join(TARGET_ASSETS_DIR, def.category);
  const targetFilePath = path.join(targetCategoryDir, `${def.name}.svg`);
  fs.writeFileSync(targetFilePath, cleanSvg, 'utf8');

  // Relative file path from web root
  const webPath = `/assets/icons/${def.category}/${def.name}.svg`;

  manifestEntries.push({
    name: def.name,
    category: def.category,
    label: def.label,
    description: def.description,
    file: webPath,
    usedIn: def.usedIn,
    keywords: def.keywords,
    lucideEquivalent: def.lucideSource,
    svg: cleanSvg
  });
});

console.log(`Successfully generated ${manifestEntries.length} domain SVGs in ${TARGET_ASSETS_DIR}`);

// 5. Write icon-manifest.json to target locations
const manifestWithoutSvg = manifestEntries.map(e => ({
  name: e.name,
  category: e.category,
  label: e.label,
  description: e.description,
  file: e.file,
  usedIn: e.usedIn,
  keywords: e.keywords,
  lucideEquivalent: e.lucideEquivalent
}));

fs.writeFileSync('icon-manifest.json', JSON.stringify(manifestWithoutSvg, null, 2), 'utf8');
fs.writeFileSync(path.join(TARGET_ASSETS_DIR, 'icon-manifest.json'), JSON.stringify(manifestWithoutSvg, null, 2), 'utf8');
console.log('Saved icon-manifest.json');

// 6. Generate interactive HTML catalog in public/assets/icons/index.html
function generateAssetsHtml(entries) {
  const categoryLabels = {
    all: 'Tất cả (' + entries.length + ')',
    brand: 'A. Thương hiệu (' + entries.filter(e => e.category === 'brand').length + ')',
    'medical-clinic': 'B. Y khoa & Lâm sàng (' + entries.filter(e => e.category === 'medical-clinic').length + ')',
    'dermatology-services': 'C. Dịch vụ Da liễu (' + entries.filter(e => e.category === 'dermatology-services').length + ')',
    specialties: 'D. Chuyên khoa (' + entries.filter(e => e.category === 'specialties').length + ')',
    'technology-equipment': 'E. Công nghệ & Thiết bị (' + entries.filter(e => e.category === 'technology-equipment').length + ')',
    laboratory: 'F. Xét nghiệm & Lab (' + entries.filter(e => e.category === 'laboratory').length + ')',
    'pharmacy-products': 'G. Nhà thuốc & Sản phẩm (' + entries.filter(e => e.category === 'pharmacy-products').length + ')',
    'academy-training': 'H. Đào tạo & Học viện (' + entries.filter(e => e.category === 'academy-training').length + ')',
    'doctors-team': 'I. Đội ngũ Bác sĩ (' + entries.filter(e => e.category === 'doctors-team').length + ')',
    'ui-navigation': 'J. Điều hướng & Giao diện (' + entries.filter(e => e.category === 'ui-navigation').length + ')',
    'status-feedback': 'K. Trạng thái & Thông báo (' + entries.filter(e => e.category === 'status-feedback').length + ')',
    payment: 'L. Thanh toán (' + entries.filter(e => e.category === 'payment').length + ')',
    shared: 'M. Dùng chung & CMS (' + entries.filter(e => e.category === 'shared').length + ')'
  };

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kho Thư Viện Icon Chuẩn Lạc's Beauty Center (LBC Assets)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&family=Fraunces:wght@600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #0E7C86;
      --primary-hover: #096068;
      --primary-light: #EEF7F8;
      --bg: #F8FAFC;
      --surface: #FFFFFF;
      --border: #E2E8F0;
      --text: #0F172A;
      --text-muted: #64748B;
    }
    .dark-mode {
      --primary: #14B8A6;
      --primary-hover: #2DD4BF;
      --primary-light: #134E4A;
      --bg: #0F172A;
      --surface: #1E293B;
      --border: #334155;
      --text: #F8FAFC;
      --text-muted: #94A3B8;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Be Vietnam Pro', system-ui, -apple-system, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      line-height: 1.5;
      padding-bottom: 60px;
      transition: background-color 0.2s, color 0.2s;
    }
    .header {
      background-color: var(--surface);
      border-bottom: 1px solid var(--border);
      padding: 28px 20px;
      position: sticky;
      top: 0;
      z-index: 50;
      box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05);
    }
    .container {
      max-width: 1380px;
      margin: 0 auto;
      padding: 0 20px;
    }
    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 20px;
    }
    .title-area h1 {
      font-family: 'Fraunces', serif;
      font-size: 24px;
      color: var(--primary);
      margin-bottom: 4px;
    }
    .title-area p {
      font-size: 13px;
      color: var(--text-muted);
    }
    .actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .btn {
      padding: 8px 16px;
      border-radius: 9999px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.15s;
    }
    .btn:hover {
      background: var(--primary-light);
      border-color: var(--primary);
      color: var(--primary);
    }
    .btn-primary {
      background: var(--primary);
      color: #FFFFFF;
      border-color: var(--primary);
    }
    .btn-primary:hover {
      background: var(--primary-hover);
      color: #FFFFFF;
    }
    .search-row {
      display: flex;
      gap: 12px;
      align-items: center;
      flex-wrap: wrap;
    }
    .search-input {
      flex: 1;
      min-width: 280px;
      padding: 12px 18px;
      border-radius: 14px;
      border: 1.5px solid var(--border);
      background: var(--surface);
      color: var(--text);
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .search-input:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(14, 124, 134, 0.15);
    }
    .category-tabs {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      margin-top: 14px;
    }
    .tab {
      padding: 5px 12px;
      border-radius: 9999px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text-muted);
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
    }
    .tab.active, .tab:hover {
      background: var(--primary);
      color: #FFFFFF;
      border-color: var(--primary);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(215px, 1fr));
      gap: 16px;
      margin-top: 24px;
    }
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 18px 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
      position: relative;
    }
    .card:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.08);
      border-color: var(--primary);
    }
    .icon-box {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      background: var(--primary-light);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12px;
      color: var(--primary);
      transition: transform 0.2s;
    }
    .card:hover .icon-box {
      transform: scale(1.1);
    }
    .icon-box svg {
      width: 26px;
      height: 26px;
    }
    .icon-box.brand-box {
      width: 64px;
      height: 52px;
      background: transparent;
    }
    .icon-box.brand-box svg {
      width: 100%;
      height: 100%;
      max-height: 48px;
    }
    .icon-name {
      font-weight: 700;
      font-size: 13px;
      margin-bottom: 3px;
      word-break: break-all;
    }
    .icon-title {
      font-size: 11px;
      color: var(--text-muted);
      margin-bottom: 8px;
      min-height: 32px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .badge-cat {
      font-size: 9px;
      padding: 2px 8px;
      border-radius: 999px;
      background: rgba(14, 124, 134, 0.1);
      color: var(--primary);
      font-weight: 700;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .btn-group {
      display: flex;
      gap: 6px;
      width: 100%;
    }
    .btn-action {
      flex: 1;
      padding: 6px 10px;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
    }
    .btn-action:hover {
      background: var(--primary);
      color: #FFFFFF;
      border-color: var(--primary);
    }
    .toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #0F172A;
      color: #FFFFFF;
      padding: 12px 20px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 600;
      box-shadow: 0 10px 30px rgba(0,0,0,0.25);
      z-index: 100;
      display: none;
      align-items: center;
      gap: 8px;
      animation: slideIn 0.3s ease;
    }
    @keyframes slideIn {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .stats-bar {
      display: flex;
      gap: 20px;
      align-items: center;
      font-size: 13px;
      color: var(--text-muted);
      margin-top: 14px;
      padding: 12px 16px;
      background: var(--surface);
      border-radius: 12px;
      border: 1px solid var(--border);
      flex-wrap: wrap;
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="container">
      <div class="header-top">
        <div class="title-area">
          <h1>Thư Viện Icon Chuẩn Y Khoa Lạc's Beauty Center</h1>
          <p>Tổ chức theo 12 nhóm lĩnh vực chuyên môn LBC • Chuẩn Vector SVG • Naming [linh-vuc]-[chuc-nang].svg</p>
        </div>
        <div class="actions">
          <button class="btn" id="themeToggle" onclick="toggleTheme()">🌓 Đổi nền Sáng/Tối</button>
          <a class="btn btn-primary" href="./lbc_icons_all.zip" download="lbc_icons_all.zip" id="btnDownloadAll">📦 Tải Trọn Bộ ZIP</a>
        </div>
      </div>

      <div class="search-row">
        <input type="text" id="searchInput" class="search-input" placeholder="Tìm kiếm icon (VD: mụn, sẹo, nám, rụng tóc, nâng cơ, bác sĩ, thuốc, kính hiển vi, lịch hẹn, hotline)..." oninput="handleSearch()">
      </div>

      <div class="category-tabs" id="categoryTabs">
        ${Object.entries(categoryLabels).map(([key, label], idx) => `
          <button class="tab ${idx === 0 ? 'active' : ''}" data-cat="${key}" onclick="filterCategory('${key}', this)">${label}</button>
        `).join('')}
      </div>
    </div>
  </header>

  <main class="container">
    <div class="stats-bar">
      <span>Đang hiển thị: <strong id="visibleCount">${entries.length}</strong> / ${entries.length} icons</span>
      <span>• Định dạng: <strong>Vector SVG chuẩn y khoa</strong> (viewBox="0 0 24 24", currentColor)</span>
      <span>• Thư mục hệ thống: <code>public/assets/icons/[linh-vuc]/</code></span>
    </div>

    <div class="grid" id="iconGrid">
      ${entries.map(item => `
        <div class="card" data-name="${item.name.toLowerCase()}" data-label="${(item.label || '').toLowerCase()}" data-desc="${(item.description || '').toLowerCase()}" data-cat="${item.category}" data-keywords="${(item.keywords || []).join(' ').toLowerCase()}">
          <div class="icon-box ${item.category === 'brand' ? 'brand-box' : ''}">
            ${item.svg}
          </div>
          <div class="badge-cat">${item.category}</div>
          <div class="icon-name">${item.name}.svg</div>
          <div class="icon-title" title="${item.description}">${item.label}</div>
          <div class="btn-group">
            <button class="btn-action" onclick="copySvgCode(this, '${item.name}')">Sao chép SVG</button>
            <a class="btn-action" href="./${item.category}/${item.name}.svg" download="${item.name}.svg" style="text-decoration:none;display:flex;align-items:center;justify-content:center;">Tải file</a>
          </div>
        </div>
      `).join('')}
    </div>
  </main>

  <div class="toast" id="toast">
    <span>✓</span>
    <span id="toastText">Đã sao chép mã SVG vào bộ nhớ tạm!</span>
  </div>

  <script>
    let currentCategory = 'all';

    function toggleTheme() {
      document.body.classList.toggle('dark-mode');
    }

    function filterCategory(cat, btn) {
      currentCategory = cat;
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    }

    function handleSearch() {
      applyFilters();
    }

    function applyFilters() {
      const q = document.getElementById('searchInput').value.trim().toLowerCase();
      const cards = document.querySelectorAll('.card');
      let count = 0;

      cards.forEach(card => {
        const cat = card.getAttribute('data-cat');
        const name = card.getAttribute('data-name');
        const label = card.getAttribute('data-label');
        const desc = card.getAttribute('data-desc');
        const keywords = card.getAttribute('data-keywords');

        const matchCat = currentCategory === 'all' || cat === currentCategory;
        const matchQuery = !q || name.includes(q) || label.includes(q) || desc.includes(q) || keywords.includes(q);

        if (matchCat && matchQuery) {
          card.style.display = 'flex';
          count++;
        } else {
          card.style.display = 'none';
        }
      });

      document.getElementById('visibleCount').innerText = count;
    }

    function copySvgCode(btn, name) {
      try {
        const card = btn.closest('.card');
        const svgEl = card.querySelector('.icon-box svg');
        if (!svgEl) throw new Error('Không tìm thấy SVG');
        const svgText = new XMLSerializer().serializeToString(svgEl);
        
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(svgText).then(() => {
            showToast('Đã sao chép mã SVG: ' + name);
          }).catch(() => fallbackCopy(svgText, name));
        } else {
          fallbackCopy(svgText, name);
        }
      } catch (e) {
        showToast('Lỗi khi sao chép: ' + e.message);
      }
    }

    function fallbackCopy(text, name) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        showToast('Đã sao chép mã SVG: ' + name);
      } catch (err) {
        showToast('Không thể sao chép');
      }
      document.body.removeChild(ta);
    }

    function showToast(msg) {
      const t = document.getElementById('toast');
      document.getElementById('toastText').innerText = msg;
      t.style.display = 'flex';
      setTimeout(() => {
        t.style.display = 'none';
      }, 2500);
    }
  </script>
</body>
</html>`;
}

const assetsHtmlContent = generateAssetsHtml(manifestEntries);
fs.writeFileSync(path.join(TARGET_ASSETS_DIR, 'index.html'), assetsHtmlContent, 'utf8');
console.log('Saved public/assets/icons/index.html');

console.log('Icon reorganization script completed.');
