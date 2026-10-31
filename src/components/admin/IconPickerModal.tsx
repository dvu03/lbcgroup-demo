import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  Sparkles,
  Upload,
  Image as ImageIcon,
  Check,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { ICON_REGISTRY, DynamicIcon, isSafeIconUrl } from '../common/DynamicIcon';
import { MediaLibraryModal } from './MediaLibraryModal';

export interface IconDefinition {
  name: string;
  label: string;
  category: string;
  file: string;
  keywords: string[];
  description?: string;
}

export const CURATED_ICONS: IconDefinition[] = [
  // 1. Dịch vụ Da liễu & Thẩm mỹ (Dermatology Services)
  { name: 'dermatology-acne-care', label: 'Đặc trị mụn & Mụn kháng trị', category: 'dermatology-services', file: '/assets/icons/dermatology-services/dermatology-acne-care.svg', description: 'Trị mụn viêm, mụn ẩn, se cồi mụn P.acnes', keywords: ['mun', 'khang tri', 'viem', 'acne', 'dieu tri mun', 'dermatology'] },
  { name: 'dermatology-scar-repair', label: 'Trị sẹo rỗ kỹ thuật cao', category: 'dermatology-services', file: '/assets/icons/dermatology-services/dermatology-scar-repair.svg', description: 'Tái tạo mô collagen, bóc tách đáy sẹo', keywords: ['seo', 'seo ro', 'subcision', 'collagen', 'tai tao', 'scar'] },
  { name: 'dermatology-pigment-sun', label: 'Trị nám – tàn nhang & sắc tố', category: 'dermatology-services', file: '/assets/icons/dermatology-services/dermatology-pigment-sun.svg', description: 'Laser chọn lọc ức chế melanin, mờ nám', keywords: ['nam', 'tan nhang', 'doi moi', 'sac to', 'melanin', 'sun'] },
  { name: 'dermatology-hair-scalp', label: 'Trị rụng tóc & Kích mầm tóc', category: 'dermatology-services', file: '/assets/icons/dermatology-services/dermatology-hair-scalp.svg', description: 'Phục hồi nang tóc và da đầu dịu nhẹ', keywords: ['rung toc', 'hoi dau', 'nang toc', 'da dau', 'hair', 'scalp'] },
  { name: 'dermatology-meso-injection', label: 'Thẩm mỹ nội khoa (Meso)', category: 'dermatology-services', file: '/assets/icons/dermatology-services/dermatology-meso-injection.svg', description: 'Tiêm vi điểm trẻ hóa da, tiêm BAP y khoa', keywords: ['tiem', 'meso', 'botox', 'filler', 'noi khoa', 'tre hoa', 'syringe'] },
  { name: 'dermatology-lifting-contour', label: 'Nâng cơ RF Jovena & HIFU', category: 'dermatology-services', file: '/assets/icons/dermatology-services/dermatology-lifting-contour.svg', description: 'Sóng RF Jovena thon gọn viền hàm', keywords: ['nang co', 'jovena', 'rf', 'hifu', 'tre hoa', 'thon gon', 'zap'] },
  { name: 'dermatology-skin-facial', label: 'Chăm sóc da chuyên sâu', category: 'dermatology-services', file: '/assets/icons/dermatology-services/dermatology-skin-facial.svg', description: 'Cấp ẩm đa tầng, phục hồi màng sinh học', keywords: ['cham soc da', 'phuc hoi', 'dien di', 'cap am', 'mat na', 'facial'] },
  { name: 'dermatology-exam-diagnosis', label: 'Khám bệnh lý da liễu khác', category: 'dermatology-services', file: '/assets/icons/dermatology-services/dermatology-exam-diagnosis.svg', description: 'Chẩn đoán viêm da cơ địa, vảy nến, mề đay', keywords: ['kham da', 'benh da', 'vay nen', 'viem da', 'me day', 'cham'] },
  { name: 'dermatology-laser-hair-removal', label: 'Triệt lông Diode Laser', category: 'dermatology-services', file: '/assets/icons/dermatology-services/dermatology-laser-hair-removal.svg', description: 'Công nghệ Diode Laser sapphire mát lạnh', keywords: ['triet long', 'laser', 'diode', 'sapphire', 'nang long'] },
  { name: 'dermatology-visia-booking', label: 'Đặt lịch soi da VISIA 3D', category: 'dermatology-services', file: '/assets/icons/dermatology-services/dermatology-visia-booking.svg', description: 'Đăng ký khám và phân tích 8 chỉ số chuyên sâu', keywords: ['visia', 'soi da', 'dat lich', 'kham da', 'calendar', 'booking'] },

  // 2. Y tế & Lâm sàng (Medical Clinic)
  { name: 'medical-stethoscope', label: 'Ống nghe y khoa', category: 'medical-clinic', file: '/assets/icons/medical-clinic/medical-stethoscope.svg', description: 'Khám lâm sàng chuyên khoa Da liễu', keywords: ['bac si', 'y khoa', 'ong nghe', 'kham benh', 'chuyen khoa', 'stethoscope'] },
  { name: 'medical-heart-pulse', label: 'Nhịp tim sinh học', category: 'medical-clinic', file: '/assets/icons/medical-clinic/medical-heart-pulse.svg', description: 'Sinh hiệu sức khỏe làn da', keywords: ['nhip tim', 'sinh hoc', 'suc khoe', 'song', 'pulse'] },
  { name: 'medical-heart-care', label: 'Trái tim y đức', category: 'medical-clinic', file: '/assets/icons/medical-clinic/medical-heart-care.svg', description: 'Sứ mệnh chăm sóc tận tâm đồng hành', keywords: ['y duc', 'tan tam', 'cham soc', 'dong hanh', 'heart', 'care'] },
  { name: 'medical-safety-shield', label: 'Khiên bảo chứng y khoa', category: 'medical-clinic', file: '/assets/icons/medical-clinic/medical-safety-shield.svg', description: 'Cam kết vô trùng chuẩn GPHĐ', keywords: ['an toan', 'khien', 'chuan y khoa', 'shield', 'bao ve'] },
  { name: 'medical-biometric', label: 'Vân tay cá nhân hóa', category: 'medical-clinic', file: '/assets/icons/medical-clinic/medical-biometric.svg', description: 'Y học cá nhân hóa độc bản', keywords: ['van tay', 'ca nhan hoa', 'biometric', 'phac do', 'fingerprint'] },
  { name: 'medical-file-check', label: 'Hồ sơ bệnh án ký duyệt', category: 'medical-clinic', file: '/assets/icons/medical-clinic/medical-file-check.svg', description: 'Hồ sơ bệnh án được bác sĩ thẩm định', keywords: ['benh an', 'ho so', 'tham dinh', 'kiem tra', 'file'] },

  // 3. Chuyên khoa & Hệ sinh thái (Specialties)
  { name: 'specialties-dermatology', label: 'Khoa Da liễu', category: 'specialties', file: '/assets/icons/specialties/specialties-dermatology.svg', description: 'Chuyên khoa mũi nhọn phòng khám', keywords: ['khoa da lieu', 'chuyen khoa', 'da lieu'] },
  { name: 'specialties-laboratory', label: 'Khoa Xét nghiệm', category: 'specialties', file: '/assets/icons/specialties/specialties-laboratory.svg', description: 'Xét nghiệm vi nấm, Demodex', keywords: ['khoa xet nghiem', 'lab', 'xet nghiem', 'demodex'] },
  { name: 'specialties-pharmacy', label: 'Nhà thuốc GPP', category: 'specialties', file: '/assets/icons/specialties/specialties-pharmacy.svg', description: 'Nhà thuốc đạt chuẩn GPP', keywords: ['nha thuoc', 'gpp', 'thuoc ke don'] },
  { name: 'specialties-cosmeceuticals', label: 'Dược – Mỹ phẩm', category: 'specialties', file: '/assets/icons/specialties/specialties-cosmeceuticals.svg', description: 'Dược mỹ phẩm nhập khẩu chính ngạch', keywords: ['duoc my pham', 'chinh hang', 'bioderma'] },
  { name: 'specialties-academy', label: 'Học viện LBC Academy', category: 'specialties', file: '/assets/icons/specialties/specialties-academy.svg', description: 'Đào tạo nghề chăm sóc da y khoa', keywords: ['dao tao', 'academy', 'hoc vien', 'nghe'] },

  // 4. Công nghệ & Thiết bị (Technology Equipment)
  { name: 'technology-visia-3d', label: 'Máy soi da VISIA 3D', category: 'technology-equipment', file: '/assets/icons/technology-equipment/technology-visia-3d.svg', description: 'Máy soi da 8 tầng chỉ số Hoa Kỳ', keywords: ['visia', 'soi da 3d', 'cong nghe', 'may moc'] },
  { name: 'technology-rf-jovena', label: 'Sóng RF Jovena', category: 'technology-equipment', file: '/assets/icons/technology-equipment/technology-rf-jovena.svg', description: 'Sóng nâng cơ RF vi điểm', keywords: ['jovena', 'rf', 'nang co', 'song cao tan'] },
  { name: 'technology-laser', label: 'Laser xung ngắn', category: 'technology-equipment', file: '/assets/icons/technology-equipment/technology-laser.svg', description: 'Laser chọn lọc mờ thâm nám', keywords: ['laser', 'xung ngan', 'tri nam'] },

  // 5. Xét nghiệm & Phòng Lab (Laboratory)
  { name: 'laboratory-microscope', label: 'Kính hiển vi soi tươi', category: 'laboratory', file: '/assets/icons/laboratory/laboratory-microscope.svg', description: 'Soi tươi tìm ký sinh trùng Demodex', keywords: ['kinh hien vi', 'soi tuoi', 'vi sinh', 'microscope'] },
  { name: 'laboratory-flask-conical', label: 'Bình thí nghiệm hóa sinh', category: 'laboratory', file: '/assets/icons/laboratory/laboratory-flask-conical.svg', description: 'Dụng cụ phân tích mẫu xét nghiệm', keywords: ['binh thi nghiem', 'ong nghiem', 'hoa sinh', 'flask'] },

  // 6. Nhà thuốc & Sản phẩm (Pharmacy Products)
  { name: 'pharmacy-medicine', label: 'Thuốc y tế chuẩn GPP', category: 'pharmacy-products', file: '/assets/icons/pharmacy-products/pharmacy-medicine.svg', description: 'Viên thuốc da liễu kê đơn', keywords: ['thuoc', 'vien thuoc', 'gpp', 'uong', 'medicine', 'pill'] },
  { name: 'pharmacy-cleanser-droplets', label: 'Làm sạch & Nước tẩy trang', category: 'pharmacy-products', file: '/assets/icons/pharmacy-products/pharmacy-cleanser-droplets.svg', description: 'Dung dịch tẩy trang, rửa mặt dịu lành', keywords: ['lam sach', 'tay trang', 'sua rua mat', 'droplets'] },
  { name: 'pharmacy-serum-droplet', label: 'Tinh chất serum phục hồi', category: 'pharmacy-products', file: '/assets/icons/pharmacy-products/pharmacy-serum-droplet.svg', description: 'Giọt tinh chất dưỡng ẩm tái tạo', keywords: ['serum', 'tinh chat', 'duong am', 'giot nuoc', 'droplet'] },
  { name: 'pharmacy-shopping-bag', label: 'Túi mua sắm dược mỹ phẩm', category: 'pharmacy-products', file: '/assets/icons/pharmacy-products/pharmacy-shopping-bag.svg', description: 'Biểu tượng giỏ hàng và mua sắm', keywords: ['gio hang', 'mua sam', 'tui xach', 'shopping', 'cart'] },
  { name: 'pharmacy-product-tag', label: 'Nhãn thương hiệu chính hãng', category: 'pharmacy-products', file: '/assets/icons/pharmacy-products/pharmacy-product-tag.svg', description: 'Nhãn phân loại sản phẩm', keywords: ['nhan mac', 'tag', 'thuong hieu', 'brand'] },
  { name: 'pharmacy-combo-package', label: 'Combo trọn gói liệu trình', category: 'pharmacy-products', file: '/assets/icons/pharmacy-products/pharmacy-combo-package.svg', description: 'Hộp sản phẩm đóng gói combo', keywords: ['hop', 'combo', 'dong goi', 'set', 'package'] },
  { name: 'pharmacy-best-seller-flame', label: 'Sản phẩm bán chạy', category: 'pharmacy-products', file: '/assets/icons/pharmacy-products/pharmacy-best-seller-flame.svg', description: 'Nhãn sản phẩm hot bán chạy', keywords: ['hot', 'ban chay', 'tieu bieu', 'flame'] },
  { name: 'pharmacy-quality-star', label: 'Đánh giá 5 sao', category: 'pharmacy-products', file: '/assets/icons/pharmacy-products/pharmacy-quality-star.svg', description: 'Đánh giá chất lượng sản phẩm', keywords: ['danh gia', 'review', '5 sao', 'star'] },

  // 7. Đào tạo & Học viện (Academy Training)
  { name: 'academy-graduation', label: 'Mũ tốt nghiệp học viện', category: 'academy-training', file: '/assets/icons/academy-training/academy-graduation.svg', description: 'Tốt nghiệp khóa đào tạo chăm sóc da', keywords: ['tot nghiep', 'hoc vien', 'mu', 'academy', 'graduation'] },
  { name: 'academy-certificate-award', label: 'Chứng chỉ chuyên môn', category: 'academy-training', file: '/assets/icons/academy-training/academy-certificate-award.svg', description: 'Chứng chỉ hành nghề spa y khoa', keywords: ['chung chi', 'bang khen', 'thanh tuu', 'award'] },
  { name: 'academy-curriculum-book', label: 'Giáo trình đào tạo', category: 'academy-training', file: '/assets/icons/academy-training/academy-curriculum-book.svg', description: 'Tài liệu giảng dạy da liễu', keywords: ['giao trinh', 'sach', 'tai lieu', 'book'] },

  // 8. Đội ngũ Bác sĩ (Doctors Team)
  { name: 'doctors-specialist', label: 'Bác sĩ chuyên khoa', category: 'doctors-team', file: '/assets/icons/doctors-team/doctors-specialist.svg', description: 'Hồ sơ Bác sĩ Sau Đại học', keywords: ['bac si', 'chuyen gia', 'ho so', 'doctor'] },
  { name: 'doctors-team-users', label: 'Hội đồng chuyên môn', category: 'doctors-team', file: '/assets/icons/doctors-team/doctors-team-users.svg', description: 'Đội ngũ bác sĩ và kỹ thuật viên', keywords: ['doi ngu', 'bac si', 'hoi dong', 'nhan su', 'users'] },
  { name: 'doctors-degree-award', label: 'Học hàm & Thạc sĩ', category: 'doctors-team', file: '/assets/icons/doctors-team/doctors-degree-award.svg', description: 'Bằng Thạc sĩ Bác sĩ Chuyên khoa', keywords: ['bang cap', 'thac si', 'chuyen khoa', 'award'] },

  // 9. Điều hướng & Tiện ích (UI Navigation)
  { name: 'navigation-menu', label: 'Nút Menu điều hướng', category: 'ui-navigation', file: '/assets/icons/ui-navigation/navigation-menu.svg', description: 'Thanh điều hướng trang web', keywords: ['menu', 'dieu huong', 'thanh menu'] },
  { name: 'navigation-close-x', label: 'Nút Đóng / Thoát (X)', category: 'ui-navigation', file: '/assets/icons/ui-navigation/navigation-close-x.svg', description: 'Đóng modal và popup', keywords: ['dong', 'tat', 'close', 'x'] },
  { name: 'navigation-search', label: 'Kính lúp tìm kiếm', category: 'ui-navigation', file: '/assets/icons/ui-navigation/navigation-search.svg', description: 'Tìm kiếm trên website', keywords: ['tim kiem', 'tra cuu', 'search'] },
  { name: 'navigation-hotline-phone', label: 'Hotline 1900 6750', category: 'ui-navigation', file: '/assets/icons/ui-navigation/navigation-hotline-phone.svg', description: 'Điện thoại liên hệ trực tiếp', keywords: ['hotline', 'dien thoai', 'goi', 'phone'] },
  { name: 'navigation-hours-clock', label: 'Giờ mở cửa (08:00 - 20:00)', category: 'ui-navigation', file: '/assets/icons/ui-navigation/navigation-hours-clock.svg', description: 'Khung giờ phục vụ khách hàng', keywords: ['gio mo cua', 'thoi gian', 'lam viec', 'clock'] },
  { name: 'navigation-location-pin', label: 'Địa chỉ phòng khám', category: 'ui-navigation', file: '/assets/icons/ui-navigation/navigation-location-pin.svg', description: 'Vị trí cơ sở Cần Thơ', keywords: ['dia chi', 'co so', 'vi tri', 'ban do', 'map pin'] },
  { name: 'navigation-appointment-calendar', label: 'Lịch hẹn khám bệnh', category: 'ui-navigation', file: '/assets/icons/ui-navigation/navigation-appointment-calendar.svg', description: 'Đặt lịch hẹn khám cùng Bác sĩ', keywords: ['lich hen', 'ngay thang', 'calendar'] },
  { name: 'navigation-back-to-top', label: 'Nút cuộn lên đầu trang', category: 'ui-navigation', file: '/assets/icons/ui-navigation/navigation-back-to-top.svg', description: 'Back to top lên đầu trang', keywords: ['len dau trang', 'cuon', 'back to top', 'arrow up'] },
  { name: 'navigation-arrow-right', label: 'Mũi tên xem tiếp (CTA)', category: 'ui-navigation', file: '/assets/icons/ui-navigation/navigation-arrow-right.svg', description: 'Nút hành động xem chi tiết', keywords: ['mui ten', 'xem tiep', 'cta', 'arrow right'] },

  // 10. Trạng thái & Thông báo (Status Feedback)
  { name: 'status-success', label: 'Thành công (Check)', category: 'status-feedback', file: '/assets/icons/status-feedback/status-success.svg', description: 'Thông báo hoàn thành thao tác', keywords: ['thanh cong', 'hoan thanh', 'xong', 'success', 'check'] },
  { name: 'status-warning', label: 'Cảnh báo y khoa', category: 'status-feedback', file: '/assets/icons/status-feedback/status-warning.svg', description: 'Lưu ý chống chỉ định', keywords: ['canh bao', 'chu y', 'luu y', 'warning'] },
  { name: 'status-error', label: 'Thông báo lỗi', category: 'status-feedback', file: '/assets/icons/status-feedback/status-error.svg', description: 'Lỗi trạng thái hoặc thao tác', keywords: ['loi', 'that bai', 'canh bao', 'error'] },
  { name: 'status-info', label: 'Thông tin chỉ dẫn', category: 'status-feedback', file: '/assets/icons/status-feedback/status-info.svg', description: 'Ghi chú và giải thích thêm', keywords: ['thong tin', 'chu thich', 'huong dan', 'info'] },

  // 11. Thanh toán (Payment)
  { name: 'payment-cash', label: 'Tiền mặt tại quầy', category: 'payment', file: '/assets/icons/payment/payment-cash.svg', description: 'Thanh toán tiền mặt tại quầy thu ngân', keywords: ['tien mat', 'quay thu ngan', 'dong tien', 'cash'] },
  { name: 'payment-credit-card', label: 'Thẻ tín dụng / POS', category: 'payment', file: '/assets/icons/payment/payment-credit-card.svg', description: 'Quẹt thẻ Visa, Mastercard tại chỗ', keywords: ['the tin dung', 'visa', 'mastercard', 'pos', 'credit card'] },
  { name: 'payment-bank-transfer', label: 'Chuyển khoản (VietQR)', category: 'payment', file: '/assets/icons/payment/payment-bank-transfer.svg', description: 'Chuyển khoản qua số tài khoản phòng khám', keywords: ['chuyen khoan', 'ngan hang', 'vietqr', 'bank transfer'] },

  // 12. Nhận diện thương hiệu (Brand)
  { name: 'brand-logo-color', label: 'Logo LBC màu chuẩn', category: 'brand', file: '/assets/icons/brand/brand-logo-color.svg', description: 'Logo chính thức hoa sen y khoa', keywords: ['logo', 'lbc', 'thuong hieu', 'brand', 'hoa sen'] },
  { name: 'brand-emblem-lotus', label: 'Monogram Hoa Sen LBC', category: 'brand', file: '/assets/icons/brand/brand-emblem-lotus.svg', description: 'Biểu tượng hoa sen ngọc chữ L', keywords: ['monogram', 'emblem', 'hoa sen', 'y khoa', 'lotus'] },
  { name: 'brand-facebook', label: 'Facebook LBC', category: 'brand', file: '/assets/icons/brand/brand-facebook.svg', description: 'Trang Facebook chính thức', keywords: ['facebook', 'fanpage', 'social'] },
  { name: 'brand-zalo', label: 'Zalo OA LBC', category: 'brand', file: '/assets/icons/brand/brand-zalo.svg', description: 'Kênh Zalo tư vấn chính thức', keywords: ['zalo', 'chat', 'oa'] },
  { name: 'brand-youtube', label: 'YouTube LBC', category: 'brand', file: '/assets/icons/brand/brand-youtube.svg', description: 'Kênh video YouTube chính thức', keywords: ['youtube', 'video', 'social'] },
  { name: 'brand-messenger', label: 'Messenger LBC', category: 'brand', file: '/assets/icons/brand/brand-messenger.svg', description: 'Chat Messenger phòng khám', keywords: ['messenger', 'chat', 'tin nhan'] }
];

export interface IconPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedIconName?: string;
  currentIconName?: string;
  selectedIconUrl?: string;
  currentIconUrl?: string;
  onSelect: (iconName: string, iconUrl?: string) => void;
  title?: string;
  recommendedCategory?: string;
  initialCategory?: string;
}

export const IconPickerModal: React.FC<IconPickerModalProps> = ({
  isOpen,
  onClose,
  selectedIconName,
  currentIconName,
  selectedIconUrl,
  currentIconUrl,
  onSelect,
  title = 'Chọn Icon từ Thư viện Chuẩn LBC',
  recommendedCategory,
  initialCategory
}) => {
  // Normalize category mapping
  const normalizeCat = (cat?: string): string => {
    if (!cat || cat === 'all') return 'all';
    if (cat === 'service' || cat === 'services') return 'dermatology-services';
    if (cat === 'medical') return 'medical-clinic';
    if (cat === 'product' || cat === 'products') return 'pharmacy-products';
    if (cat === 'navigation') return 'ui-navigation';
    return cat;
  };

  const initialCat = normalizeCat(initialCategory || recommendedCategory);
  const initName = currentIconName || selectedIconName || 'dermatology-skin-facial';
  const initUrl = currentIconUrl || selectedIconUrl || '';
  const [activeCategory, setActiveCategory] = useState<string>(initialCat);
  const [searchQuery, setSearchQuery] = useState('');
  const [customUrl, setCustomUrl] = useState(initUrl);
  const [tempIconName, setTempIconName] = useState(initName);
  const [activeTab, setActiveTab] = useState<'domain' | 'custom'>('domain');
  const [showMediaPicker, setShowMediaPicker] = useState(false);

  const filteredIcons = useMemo(() => {
    return CURATED_ICONS.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesName = item.name.toLowerCase().includes(q);
      const matchesLabel = item.label.toLowerCase().includes(q);
      const matchesKeywords = item.keywords.some((k) => k.includes(q));

      return matchesCategory && (matchesName || matchesLabel || matchesKeywords);
    });
  }, [activeCategory, searchQuery]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (activeTab === 'custom' && customUrl.trim()) {
      if (!isSafeIconUrl(customUrl)) {
        alert('Đường dẫn icon không hợp lệ hoặc chứa mã không an toàn.');
        return;
      }
      onSelect(tempIconName, customUrl.trim());
    } else {
      onSelect(tempIconName, customUrl || undefined);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-neutral-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/70">
          <div>
            <h3 className="text-base font-bold text-neutral-900 font-heading flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-700" />
              <span>{title}</span>
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Chọn biểu tượng vector chuẩn theo 12 lĩnh vực LBC hoặc tải lên ảnh/SVG an toàn từ Thư viện Media.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Domain Library vs Custom URL / Media */}
        <div className="px-5 pt-3 flex items-center gap-2 border-b border-neutral-200">
          <button
            type="button"
            onClick={() => setActiveTab('domain')}
            className={`pb-2.5 px-3 text-xs font-bold transition border-b-2 ${
              activeTab === 'domain'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Thư viện Icon Chuẩn LBC ({CURATED_ICONS.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('custom')}
            className={`pb-2.5 px-3 text-xs font-bold transition border-b-2 ${
              activeTab === 'custom'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Icon Tùy chỉnh (SVG / Ảnh riêng)
          </button>
        </div>

        {/* Tab 1: Domain Library */}
        {activeTab === 'domain' && (
          <div className="p-5 flex-1 overflow-y-auto space-y-3.5">
            {/* Search & Categories Filter */}
            <div className="space-y-2.5">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm icon theo tên, lĩnh vực (VD: 'mụn', 'sẹo', 'nám', 'bác sĩ', 'thuốc', 'kính hiển vi')..."
                  className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
                />
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
                {[
                  { id: 'all', label: 'Tất cả' },
                  { id: 'dermatology-services', label: 'Dịch vụ Da liễu' },
                  { id: 'medical-clinic', label: 'Y khoa & Phòng khám' },
                  { id: 'specialties', label: 'Chuyên khoa' },
                  { id: 'technology-equipment', label: 'Công nghệ cao' },
                  { id: 'laboratory', label: 'Xét nghiệm' },
                  { id: 'pharmacy-products', label: 'Nhà thuốc & Sản phẩm' },
                  { id: 'academy-training', label: 'Đào tạo' },
                  { id: 'doctors-team', label: 'Đội ngũ Bác sĩ' },
                  { id: 'ui-navigation', label: 'Điều hướng' },
                  { id: 'status-feedback', label: 'Trạng thái' },
                  { id: 'payment', label: 'Thanh toán' },
                  { id: 'brand', label: 'Thương hiệu' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                      activeCategory === cat.id
                        ? 'bg-emerald-800 text-white'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Icon Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-[44vh] overflow-y-auto pr-1">
              {filteredIcons.map((item) => {
                const isSelected = tempIconName === item.name || customUrl === item.file;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      setTempIconName(item.name);
                      setCustomUrl(item.file);
                    }}
                    className={`p-3 rounded-2xl border text-left transition flex items-center gap-2.5 group relative ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 shadow-sm ring-2 ring-emerald-500/20'
                        : 'bg-white border-neutral-200 hover:border-emerald-300 hover:bg-neutral-50/70'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition ${
                        isSelected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-neutral-100 text-neutral-700 group-hover:bg-emerald-100 group-hover:text-emerald-800'
                      }`}
                    >
                      <DynamicIcon name={item.name} url={item.file} className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-bold text-neutral-900 line-clamp-1 block">
                        {item.label}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono line-clamp-1 block">
                        {item.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Custom SVG / Image */}
        {activeTab === 'custom' && (
          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/70 space-y-2">
              <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-emerald-700" />
                <span>Tiêu chuẩn an toàn icon tải lên</span>
              </span>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                Hỗ trợ định dạng SVG, PNG, WebP với tỷ lệ vuông (1:1), nền trong suốt (transparent). Hệ thống tự động kiểm duyệt mã độc XSS và bảo đảm URL vĩnh viễn không bị mất khi tải lại trang.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                  Đường dẫn ảnh / SVG (Persistent URL)
                </label>
                <button
                  type="button"
                  onClick={() => setShowMediaPicker(true)}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Chọn từ Thư viện Media</span>
                </button>
              </div>

              <input
                type="text"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="https://... hoặc /images/..."
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
              />
            </div>

            {/* Custom Icon Preview */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white border border-neutral-300 flex items-center justify-center p-2 shadow-xs">
                {customUrl && isSafeIconUrl(customUrl) ? (
                  <img src={customUrl} alt="Preview" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-[10px] text-neutral-400 font-mono">Chưa có</span>
                )}
              </div>
              <div>
                <span className="text-xs font-bold text-neutral-800 block">Xem trước icon tùy chỉnh</span>
                <span className="text-[11px] text-neutral-500 block mt-0.5">
                  {customUrl ? "URL hợp lệ, an toàn để hiển thị" : "Nhập URL hoặc chọn từ Thư viện Media"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Footer / Confirm Bar */}
        <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500">Đang chọn:</span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white border border-neutral-300 text-xs font-bold text-emerald-800">
              <DynamicIcon name={tempIconName} url={customUrl} className="w-4 h-4 text-emerald-700" />
              <span>{tempIconName}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-neutral-600 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-100 transition"
            >
              Hủy bỏ
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition"
            >
              Áp dụng Icon
            </button>
          </div>
        </div>
      </div>

      {/* Media Library Picker Modal */}
      <MediaLibraryModal
        isOpen={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelectImage={(url) => {
          setCustomUrl(url);
          setShowMediaPicker(false);
        }}
      />
    </div>
  );
};
