const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const lucide = require('lucide-react');

// 1. Recursive scan of src
function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      results.push(fullPath);
    }
  });
  return results;
}

const srcFiles = getFiles('src');
console.log(`Found ${srcFiles.length} files in src/`);

// Track icons and their usages
const iconUsageMap = new Map(); // iconName -> Set of relative file paths

function recordUsage(iconName, file) {
  const relFile = path.relative('.', file).replace(/\\/g, '/');
  if (!iconUsageMap.has(iconName)) {
    iconUsageMap.set(iconName, new Set());
  }
  iconUsageMap.get(iconName).add(relFile);
}

// 2. Scan static imports from 'lucide-react'
const importRegex = /import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"]/g;
srcFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const names = match[1]
      .replace(/\/\/[^\n]*/g, '')
      .split(',')
      .map(s => s.trim().split(/\s+as\s+/)[0].trim())
      .filter(Boolean);
    names.forEach(n => {
      if (n && /^[A-Z][A-Za-z0-9]*$/.test(n) && lucide[n]) {
        recordUsage(n, f);
      }
    });
  }
});

// 3. Scan dynamic icon references (e.g. iconName: "...", icon: "...", name="...")
const dynamicRegex = /(?:iconName|iconCode|icon)\s*:\s*['"]([A-Z][A-Za-z0-9]*)['"]/g;
srcFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  let match;
  while ((match = dynamicRegex.exec(content)) !== null) {
    const n = match[1];
    if (lucide[n]) {
      recordUsage(n, f);
    }
  }
});

// Also check DynamicIcon name prop e.g. name="Stethoscope" or name: 'Stethoscope'
const jsxDynamicRegex = /<DynamicIcon[^>]*\bname=['"]([A-Z][A-Za-z0-9]*)['"]/g;
srcFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  let match;
  while ((match = jsxDynamicRegex.exec(content)) !== null) {
    const n = match[1];
    if (lucide[n]) {
      recordUsage(n, f);
    }
  }
});

// Also check IconPickerModal CURATED_ICONS
try {
  const iconPickerPath = 'src/components/admin/IconPickerModal.tsx';
  if (fs.existsSync(iconPickerPath)) {
    const content = fs.readFileSync(iconPickerPath, 'utf8');
    const curatedMatches = content.match(/name:\s*['"]([A-Z][A-Za-z0-9]*)['"]/g);
    if (curatedMatches) {
      curatedMatches.forEach(m => {
        const name = m.replace(/name:\s*['"]/, '').replace(/['"]/, '');
        if (lucide[name]) {
          recordUsage(name, iconPickerPath);
        }
      });
    }
  }
} catch (e) {
  console.error('Error parsing curated icons:', e);
}

console.log(`Total unique Lucide icons found in LBC website: ${iconUsageMap.size}`);

// 4. Categorization logic
function categorizeIcon(name) {
  const medicalClinical = [
    'Stethoscope', 'FlaskConical', 'Pill', 'Microscope', 'HeartPulse', 
    'HeartHandshake', 'Syringe', 'Activity', 'ShieldCheck', 'ShieldAlert', 
    'Shield', 'Award', 'GraduationCap', 'Fingerprint', 'Cpu', 'CheckCircle2', 
    'Check', 'FileCheck', 'Scale', 'AlertCircle', 'AlertTriangle'
  ];
  const servicesAesthetics = [
    'Zap', 'SunMedium', 'Sun', 'Feather', 'Sparkle', 'Sparkles', 
    'Scissors', 'Flame', 'Droplets', 'Droplet', 'Heart', 'Pause', 'Play'
  ];
  const productsCommerce = [
    'ShoppingBag', 'Tag', 'Package', 'Star', 'DollarSign', 'CreditCard', 
    'Truck', 'RotateCcw', 'Box'
  ];
  const uiNavigation = [
    'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowUpRight', 
    'ArrowUpCircle', 'ChevronDown', 'ChevronLeft', 'ChevronRight', 'ChevronUp', 
    'ChevronsUp', 'MoveUp', 'Menu', 'X', 'Search', 'User', 'UserCheck', 
    'UserPlus', 'Users', 'Clock', 'Phone', 'PhoneCall', 'MapPin', 'Calendar', 
    'CalendarCheck', 'CalendarCheck2', 'Navigation', 'ExternalLink', 'Link', 
    'Share', 'Share2', 'Globe', 'Home', 'LogIn', 'Mail', 'MessageCircle', 
    'HelpCircle', 'Info', 'Building', 'Building2', 'Briefcase', 'BookOpen'
  ];
  
  if (medicalClinical.includes(name)) return 'medical-clinical';
  if (servicesAesthetics.includes(name)) return 'services-aesthetics';
  if (productsCommerce.includes(name)) return 'products-commerce';
  if (uiNavigation.includes(name)) return 'ui-navigation';
  return 'admin-system';
}

// Convert PascalCase to kebab-case
function toKebabCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

// Vietnamese descriptions for icons
const iconMeta = {
  Stethoscope: { vi: 'Ống nghe y khoa chuyên khoa', desc: 'Dùng cho Khoa Da liễu, hồ sơ Bác sĩ' },
  FlaskConical: { vi: 'Bình thí nghiệm hóa sinh', desc: 'Dùng cho Khoa Xét nghiệm, Demodex, vi nấm' },
  Pill: { vi: 'Viên thuốc y tế chuẩn GPP', desc: 'Dùng cho Nhà thuốc chuẩn GPP' },
  Microscope: { vi: 'Kính hiển vi soi tươi', desc: 'Dùng cho dịch vụ soi da, vi sinh' },
  HeartPulse: { vi: 'Nhịp tim sinh học', desc: 'Dùng cho sức khỏe, phác đồ cá nhân' },
  HeartHandshake: { vi: 'Trái tim tận tâm y đức', desc: 'Dùng cho Sứ mệnh & Chăm sóc tận tâm' },
  Syringe: { vi: 'Kim tiêm vi điểm y khoa', desc: 'Dùng cho Tiêm vi điểm, Meso, Thẩm mỹ nội khoa' },
  Activity: { vi: 'Xung điện / Trị sẹo vi điểm', desc: 'Dùng cho điều trị sẹo rỗ, phục hồi mô' },
  ShieldCheck: { vi: 'Khiên bảo chứng chuẩn y khoa', desc: 'Dùng cho Cam kết chính hãng, vô trùng' },
  ShieldAlert: { vi: 'Khiên cảnh báo đặc trị mụn', desc: 'Dùng cho Dịch vụ Trị mụn kháng trị' },
  Shield: { vi: 'Khiên an toàn y tế', desc: 'Dùng cho Minh bạch công nghệ & pháp lý' },
  Award: { vi: 'Huy hiệu chuyên môn', desc: 'Dùng cho Bác sĩ trình độ Sau Đại học' },
  GraduationCap: { vi: 'Mũ học thuật / Đào tạo', desc: 'Dùng cho Học viện Đào tạo LBC Academy' },
  Cpu: { vi: 'Vi xử lý công nghệ cao', desc: 'Dùng cho Giá trị cốt lõi: Tiên phong công nghệ' },
  Fingerprint: { vi: 'Vân tay cá nhân hóa', desc: 'Dùng cho Y học Cá nhân hóa' },
  Zap: { vi: 'Năng lượng nâng cơ cao cấp', desc: 'Dùng cho Nâng cơ RF Jovena, HIFU' },
  SunMedium: { vi: 'Mặt trời sắc tố & trị nám', desc: 'Dùng cho Dịch vụ Trị rối loạn sắc tố' },
  Sun: { vi: 'Ánh nắng mặt trời', desc: 'Dùng cho Chống nắng, làm sáng da' },
  Feather: { vi: 'Lông vũ phục hồi dịu nhẹ', desc: 'Dùng cho Dịch vụ Điều trị rụng tóc' },
  Sparkles: { vi: 'Lấp lánh trẻ hóa da', desc: 'Dùng cho Dược mỹ phẩm, trẻ hóa làn da' },
  Sparkle: { vi: 'Tia sáng laser thẩm mỹ', desc: 'Dùng cho Triệt lông, laser quang học' },
  Droplets: { vi: 'Giọt nước làm sạch sâu', desc: 'Dùng cho Danh mục Sữa rửa mặt & Tẩy trang' },
  Droplet: { vi: 'Giọt tinh chất serum', desc: 'Dùng cho Tinh chất đặc trị, phục hồi' },
  ShoppingBag: { vi: 'Túi mua sắm dược mỹ phẩm', desc: 'Dùng cho Giỏ hàng & Danh mục sản phẩm' },
  Tag: { vi: 'Nhãn thương hiệu chính ngạch', desc: 'Dùng cho Phân loại thương hiệu' },
  Package: { vi: 'Hộp sản phẩm đóng gói', desc: 'Dùng cho Bộ sản phẩm combo điều trị' },
  Star: { vi: 'Ngôi sao đánh giá 5 sao', desc: 'Dùng cho Đánh giá chất lượng, hiệu quả' },
  DollarSign: { vi: 'Bảng giá niêm yết', desc: 'Dùng cho Bảng giá dịch vụ, tuyển dụng' },
  Flame: { vi: 'Ngọn lửa sản phẩm hot', desc: 'Dùng cho Dịch vụ/Sản phẩm bán chạy' },
  ArrowUp: { vi: 'Mũi tên cuộn lên đầu trang', desc: 'Dùng cho Nút Back To Top' },
  ChevronUp: { vi: 'Mũi tên nhọn hướng lên', desc: 'Dùng cho Thu gọn danh mục & Back To Top' },
  ArrowRight: { vi: 'Mũi tên sang phải CTA', desc: 'Dùng cho Xem chi tiết, Đặt lịch hẹn' },
  Phone: { vi: 'Điện thoại Hotline', desc: 'Dùng cho Hotline 1900 6750' },
  Clock: { vi: 'Đồng hồ giờ làm việc', desc: 'Dùng cho Giờ mở cửa 08:00 - 20:00' },
  MapPin: { vi: 'Địa điểm cơ sở phòng khám', desc: 'Dùng cho Cơ sở 1 và Cơ sở 2' },
  Calendar: { vi: 'Lịch hẹn khám bệnh', desc: 'Dùng cho Đặt lịch khám & Lịch bác sĩ' },
  Search: { vi: 'Kính lúp tìm kiếm', desc: 'Dùng cho Tìm kiếm dịch vụ, bác sĩ, sản phẩm' },
  Menu: { vi: 'Thanh điều hướng Menu', desc: 'Dùng cho Menu mobile' },
  X: { vi: 'Đóng / Tắt cửa sổ', desc: 'Dùng cho Đóng popup, đóng modal' },
  Settings: { vi: 'Bánh răng cài đặt', desc: 'Dùng cho Quản trị CMS LBC Admin' }
};

// 5. Brand and Custom SVG definitions
const brandIcons = [
  {
    name: 'Logo-LBC-Color',
    kebab: 'logo-lbc-color',
    category: 'brand',
    title: 'Logo Lạc\'s Beauty Center (Bản chuẩn)',
    vi: 'Logo chính thức có chữ và biểu tượng hoa sen y khoa',
    svg: fs.readFileSync('public/images/logo.svg', 'utf8').trim()
  },
  {
    name: 'Logo-LBC-White',
    kebab: 'logo-lbc-white',
    category: 'brand',
    title: 'Logo Lạc\'s Beauty Center (Bản trắng âm bản)',
    vi: 'Logo phiên bản nền tối cho Header/Footer',
    svg: fs.readFileSync('public/images/logo-white.svg', 'utf8').trim()
  },
  {
    name: 'Logo-Emblem-Medical-Lotus',
    kebab: 'logo-emblem-medical-lotus',
    category: 'brand',
    title: 'Biểu tượng Hoa Sen Y Khoa LBC (Monogram)',
    vi: 'Biểu tượng chữ L cách điệu chữ thập y khoa và búp sen',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" fill="none">
  <rect width="100" height="100" rx="25" fill="#0E7C86" />
  <circle cx="50" cy="50" r="40" stroke="white" stroke-width="2" stroke-opacity="0.3" stroke-dasharray="4 4"/>
  <path d="M38 30V70C38 76.6 43.4 82 50 82H70" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="70" cy="38" r="6" fill="#5EEAD4" />
  <path d="M60 50C65 44 72 44 75 50C77 56 70 62 60 67" stroke="#5EEAD4" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
  },
  {
    name: 'Fallback-Clinic',
    kebab: 'fallback-clinic',
    category: 'brand',
    title: 'Hình ảnh đại diện Phòng khám (Fallback Graphic)',
    vi: 'Hình minh họa đồ họa cơ sở phòng khám',
    svg: fs.readFileSync('public/images/fallback-clinic.svg', 'utf8').trim()
  },
  {
    name: 'Facebook',
    kebab: 'facebook',
    category: 'brand',
    title: 'Facebook Fanpage Icon',
    vi: 'Biểu tượng Fanpage Facebook Lạc\'s Beauty Center',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
</svg>`
  },
  {
    name: 'YouTube',
    kebab: 'youtube',
    category: 'brand',
    title: 'YouTube Channel Icon',
    vi: 'Biểu tượng Kênh YouTube chính thức LBC',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FF0000">
  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
</svg>`
  },
  {
    name: 'Zalo',
    kebab: 'zalo',
    category: 'brand',
    title: 'Zalo Official Account Icon',
    vi: 'Biểu tượng Zalo OA Phòng khám Da liễu',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <rect width="24" height="24" rx="6" fill="#0068FF" />
  <path d="M6 8.5H12L8 15.5H14" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="16.5" cy="11.5" r="2.5" stroke="white" stroke-width="1.8"/>
</svg>`
  },
  {
    name: 'TikTok',
    kebab: 'tiktok',
    category: 'brand',
    title: 'TikTok Channel Icon',
    vi: 'Biểu tượng Kênh TikTok Lạc\'s Beauty Center',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000000">
  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.11V9.42a6.33 6.33 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.16 8.16 0 0 0 4.77 1.52V6.82a4.85 4.85 0 0 1-1-.13z"/>
</svg>`
  },
  {
    name: 'Shopee',
    kebab: 'shopee',
    category: 'brand',
    title: 'Shopee Mall Icon',
    vi: 'Biểu tượng Gian hàng chính hãng Shopee Mall',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <rect width="24" height="24" rx="6" fill="#EE4D2D" />
  <path d="M6.5 9.5H17.5L16.2 18H7.8L6.5 9.5Z" fill="white" fill-opacity="0.2" stroke="white" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M9.5 9.5V7C9.5 5.6 10.6 4.5 12 4.5C13.4 4.5 14.5 5.6 14.5 7V9.5" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M13.5 12C13.5 12.8 12.8 13.5 12 13.5C11.2 13.5 10.5 12.8 10.5 12" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
</svg>`
  },
  {
    name: 'Messenger',
    kebab: 'messenger',
    category: 'brand',
    title: 'Facebook Messenger Icon',
    vi: 'Biểu tượng Chat Facebook Messenger phòng khám',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#0084FF">
  <path d="M12 2C6.48 2 2 6.03 2 11C2 13.84 3.46 16.35 5.75 17.9V22L9.67 19.84C10.42 20.05 11.19 20.17 12 20.17C17.52 20.17 22 16.14 22 11.17C22 6.03 17.52 2 12 2ZM13.06 14.28L10.52 11.56L5.56 14.28L11.02 8.48L13.56 11.2L18.52 8.48L13.06 14.28Z"/>
</svg>`
  }
];

// Target directories
const ROOT_ICONS_DIR = path.resolve('icons');
const PUBLIC_ICONS_DIR = path.resolve('public', 'icons');

[ROOT_ICONS_DIR, PUBLIC_ICONS_DIR].forEach(base => {
  if (!fs.existsSync(base)) fs.mkdirSync(base, { recursive: true });
  ['all', 'brand', 'medical-clinical', 'services-aesthetics', 'products-commerce', 'ui-navigation', 'admin-system'].forEach(sub => {
    const subPath = path.join(base, sub);
    if (!fs.existsSync(subPath)) fs.mkdirSync(subPath, { recursive: true });
  });
});

console.log('Created directories in ./icons and ./public/icons');

const iconManifest = [];

// 6. Process Brand Icons
brandIcons.forEach(b => {
  const item = {
    name: b.name,
    kebabName: b.kebab,
    category: 'brand',
    title: b.title,
    description: b.vi,
    isBrand: true,
    svg: b.svg,
    usageCount: 2,
    filesUsed: ['src/components/layout/Header.tsx', 'src/components/layout/Footer.tsx', 'src/data/siteConfig.ts']
  };
  iconManifest.push(item);

  // Write SVG files to both root and public
  [ROOT_ICONS_DIR, PUBLIC_ICONS_DIR].forEach(base => {
    fs.writeFileSync(path.join(base, 'brand', `${b.kebab}.svg`), b.svg, 'utf8');
    fs.writeFileSync(path.join(base, 'all', `${b.kebab}.svg`), b.svg, 'utf8');
  });
});

// 7. Process all Lucide icons
const sortedNames = Array.from(iconUsageMap.keys()).sort();

sortedNames.forEach(name => {
  const Comp = lucide[name];
  if (!Comp) return;

  const category = categorizeIcon(name);
  const kebab = toKebabCase(name);
  const filesUsed = Array.from(iconUsageMap.get(name));
  const meta = iconMeta[name] || {};

  // Render SVG static markup
  const svgMarkup = ReactDOMServer.renderToStaticMarkup(
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

  // Add XML declaration or clean formatting
  const formattedSvg = svgMarkup.replace(
    '<svg ',
    '<!-- LBC Website Icon: ' + name + ' -->\n<svg '
  );

  const item = {
    name,
    kebabName: kebab,
    category,
    title: meta.vi || name,
    description: meta.desc || `Icon ${name} trên giao diện website Lạc's Beauty Center`,
    isBrand: false,
    svg: formattedSvg,
    usageCount: filesUsed.length,
    filesUsed
  };
  iconManifest.push(item);

  // Save to categorized folder and flat all folder
  [ROOT_ICONS_DIR, PUBLIC_ICONS_DIR].forEach(base => {
    fs.writeFileSync(path.join(base, category, `${kebab}.svg`), formattedSvg, 'utf8');
    fs.writeFileSync(path.join(base, 'all', `${kebab}.svg`), formattedSvg, 'utf8');
  });
});

console.log(`Saved ${iconManifest.length} total SVG files in both ./icons and ./public/icons`);

// 8. Write manifest.json
[ROOT_ICONS_DIR, PUBLIC_ICONS_DIR].forEach(base => {
  fs.writeFileSync(
    path.join(base, 'manifest.json'),
    JSON.stringify(iconManifest, null, 2),
    'utf8'
  );
});

// 9. Generate Interactive HTML Gallery Preview (preview.html)
function generatePreviewHtml(manifest) {
  const categoryLabels = {
    all: 'Tất cả Icon (' + manifest.length + ')',
    brand: 'Thương hiệu & Mạng xã hội (' + manifest.filter(i => i.category === 'brand').length + ')',
    'medical-clinical': 'Y khoa & Lâm sàng (' + manifest.filter(i => i.category === 'medical-clinical').length + ')',
    'services-aesthetics': 'Dịch vụ & Thẩm mỹ (' + manifest.filter(i => i.category === 'services-aesthetics').length + ')',
    'products-commerce': 'Sản phẩm & Dược mỹ phẩm (' + manifest.filter(i => i.category === 'products-commerce').length + ')',
    'ui-navigation': 'Điều hướng & Tiện ích (' + manifest.filter(i => i.category === 'ui-navigation').length + ')',
    'admin-system': 'Quản trị CMS & Hệ thống (' + manifest.filter(i => i.category === 'admin-system').length + ')'
  };

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bộ Sưu Tập Icon Website Lạc's Beauty Center (LBC)</title>
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
      padding: 32px 24px;
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
      margin-bottom: 24px;
    }
    .title-area h1 {
      font-family: 'Fraunces', serif;
      font-size: 26px;
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
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 16px;
    }
    .tab {
      padding: 6px 14px;
      border-radius: 9999px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text-muted);
      font-size: 12px;
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
      grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
      gap: 16px;
      margin-top: 28px;
    }
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 20px 16px;
      display: flex;
      flex-col;
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
      width: 56px;
      height: 56px;
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
      width: 28px;
      height: 28px;
    }
    .icon-box.brand-box {
      width: 64px;
      height: 56px;
      background: transparent;
    }
    .icon-box.brand-box svg {
      width: 100%;
      height: 100%;
      max-height: 48px;
    }
    .icon-name {
      font-weight: 700;
      font-size: 14px;
      margin-bottom: 4px;
      word-break: break-all;
    }
    .icon-title {
      font-size: 12px;
      color: var(--text-muted);
      margin-bottom: 10px;
      min-height: 36px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .badge-count {
      font-size: 10px;
      padding: 2px 8px;
      border-radius: 999px;
      background: rgba(14, 124, 134, 0.1);
      color: var(--primary);
      font-weight: 600;
      margin-bottom: 12px;
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
      margin-top: 16px;
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
          <h1>Kho Thư Viện Icon Website Lạc's Beauty Center</h1>
          <p>Tổng hợp đầy đủ ${manifest.length} Icon (Vector SVG) gồm Logo, Mạng xã hội, Y khoa, Dịch vụ, Dược mỹ phẩm và Điều hướng.</p>
        </div>
        <div class="actions">
          <button class="btn" id="themeToggle" onclick="toggleTheme()">🌓 Đổi nền Sáng/Tối</button>
          <a class="btn btn-primary" href="./lbc_icons_all.zip" download="lbc_icons_all.zip" id="btnDownloadAll">📦 Tải Trọn Bộ ZIP (${manifest.length} Icons)</a>
        </div>
      </div>

      <div class="search-row">
        <input type="text" id="searchInput" class="search-input" placeholder="Tìm kiếm icon (VD: Stethoscope, tim, thuoc, mui ten, bac si, facebook, zalo, phone, settings)..." oninput="handleSearch()">
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
      <span>Đang hiển thị: <strong id="visibleCount">${manifest.length}</strong> / ${manifest.length} icons</span>
      <span>• Định dạng: <strong>Vector SVG chuẩn</strong> (Đổi màu stroke/fill linh hoạt)</span>
      <span>• Thư mục lưu trữ: <code>d:\\Demo_LBC\\icons\\</code></span>
    </div>

    <div class="grid" id="iconGrid">
      ${manifest.map(item => `
        <div class="card" data-name="${item.name.toLowerCase()}" data-kebab="${item.kebabName}" data-title="${(item.title || '').toLowerCase()}" data-desc="${(item.description || '').toLowerCase()}" data-cat="${item.category}">
          <div class="icon-box ${item.isBrand ? 'brand-box' : ''}">
            ${item.svg}
          </div>
          <div class="icon-name">${item.name}</div>
          <div class="icon-title" title="${item.description}">${item.title}</div>
          <div class="badge-count">${item.isBrand ? 'Thương hiệu LBC' : (item.usageCount > 0 ? 'Xuất hiện ở ' + item.usageCount + ' nơi' : 'Icon chuẩn CMS')}</div>
          <div class="btn-group">
            <button class="btn-action" onclick="copySvgCode(this, '${item.name}')">Sao chép SVG</button>
            <a class="btn-action" href="./all/${item.kebabName}.svg" download="${item.kebabName}.svg" style="text-decoration:none;display:flex;align-items:center;justify-content:center;">Tải file</a>
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
        const kebab = card.getAttribute('data-kebab');
        const title = card.getAttribute('data-title');
        const desc = card.getAttribute('data-desc');

        const matchCat = currentCategory === 'all' || cat === currentCategory;
        const matchQuery = !q || name.includes(q) || kebab.includes(q) || title.includes(q) || desc.includes(q);

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

const previewHtmlContent = generatePreviewHtml(iconManifest);
[ROOT_ICONS_DIR, PUBLIC_ICONS_DIR].forEach(base => {
  fs.writeFileSync(path.join(base, 'index.html'), previewHtmlContent, 'utf8');
  fs.writeFileSync(path.join(base, 'preview.html'), previewHtmlContent, 'utf8');
});

// 10. Generate Comprehensive README.md catalog in ./icons
function generateReadme(manifest) {
  let md = `# THƯ VIỆN TOÀN BỘ ICON TRÊN WEBSITE LẠC'S BEAUTY CENTER (LBC)\n\n`;
  md += `Tài liệu tổng hợp và lưu trữ toàn bộ **${manifest.length} Icons** định dạng Vector SVG chuẩn, bao gồm logo thương hiệu, mạng xã hội, y khoa chuyên khoa, dịch vụ thẩm mỹ, dược mỹ phẩm, điều hướng giao diện và hệ thống quản trị CMS.\n\n`;
  md += `## 📂 CẤU TRÚC THƯ MỤC LƯU TRỮ\n\n`;
  md += `Bạn có thể truy cập toàn bộ icon ngay tại thư mục:\n`;
  md += `- Thư mục trên máy: \`d:\\Demo_LBC\\icons\\\`\n`;
  md += `- Hoặc thư mục web: \`d:\\Demo_LBC\\public\\icons\\\` (xem trực tiếp trên trình duyệt tại \`http://localhost:3000/icons/index.html\`)\n\n`;
  md += `\`\`\`text\n`;
  md += `icons/\n`;
  md += `├── index.html                  # Giao diện tra cứu trực quan, bấm để copy mã SVG hoặc tải về\n`;
  md += `├── manifest.json               # Dữ liệu JSON mô tả chi tiết 148 icon\n`;
  md += `├── all/                        # Thư mục phẳng chứa toàn bộ ${manifest.length} file .svg để kéo thả nhanh\n`;
  md += `├── brand/                      # Logo LBC (Color, White, Emblem) và Mạng xã hội (Facebook, YouTube, Zalo, TikTok, Shopee, Messenger)\n`;
  md += `├── medical-clinical/           # Icon Y khoa & Chuyên khoa: Ống nghe, Kính hiển vi, Bình thí nghiệm, Viên thuốc, Khiên an toàn, v.v.\n`;
  md += `├── services-aesthetics/        # Icon Dịch vụ & Thẩm mỹ: Nâng cơ RF/HIFU (Zap), Lấp lánh (Sparkles), Trị nám (SunMedium), v.v.\n`;
  md += `├── products-commerce/          # Icon Sản phẩm & Bán hàng: Túi mua sắm, Giọt tinh chất serum, Hộp sản phẩm, Giá tiền, v.v.\n`;
  md += `├── ui-navigation/              # Icon Giao diện: Hotline Phone, Giờ mở cửa Clock, Địa chỉ MapPin, Lịch hẹn Calendar, v.v.\n`;
  md += `└── admin-system/               # Icon Quản trị: Settings, Edit, Trash2, Database, Upload, v.v.\n`;
  md += `\`\`\`\n\n`;
  md += `## 📋 DANH SÁCH CHI TIẾT TỪNG ICON\n\n`;
  md += `| STT | Tên Icon | Danh mục | Tên file SVG | Ý nghĩa / Ứng dụng trên Website | Nơi sử dụng |\n`;
  md += `|:---:|:---|:---|:---|:---|:---|\n`;

  manifest.forEach((item, idx) => {
    const loc = item.filesUsed && item.filesUsed.length > 0 
      ? item.filesUsed.slice(0, 2).map(f => `\`${f}\``).join(', ') + (item.filesUsed.length > 2 ? ` (+${item.filesUsed.length - 2} nơi)` : '')
      : 'Thư viện CMS';
    md += `| **${idx + 1}** | **${item.name}** | ${item.category} | \`${item.kebabName}.svg\` | ${item.title} - ${item.description} | ${loc} |\n`;
  });

  return md;
}

const readmeContent = generateReadme(iconManifest);
fs.writeFileSync(path.join(ROOT_ICONS_DIR, 'README.md'), readmeContent, 'utf8');
fs.writeFileSync(path.join(PUBLIC_ICONS_DIR, 'README.md'), readmeContent, 'utf8');

console.log('Finished generating index.html and README.md');
