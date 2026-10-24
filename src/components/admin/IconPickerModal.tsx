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
  category: 'medical' | 'service' | 'product' | 'navigation' | 'general';
  keywords: string[];
}

export const CURATED_ICONS: IconDefinition[] = [
  // Y tế & Chuyên khoa
  { name: 'Stethoscope', label: 'Ống nghe y khoa', category: 'medical', keywords: ['bac si', 'kham', 'da lieu', 'chuyen khoa', 'tai mui hong', 'doctor'] },
  { name: 'FlaskConical', label: 'Bình thí nghiệm', category: 'medical', keywords: ['xet nghiem', 'vi nam', 'demodex', 'lab', 'hoa sinh'] },
  { name: 'Pill', label: 'Viên thuốc y tế', category: 'medical', keywords: ['nha thuoc', 'duoc', 'uong', 'boi', 'gpp', 'medicine'] },
  { name: 'Microscope', label: 'Kính hiển vi', category: 'medical', keywords: ['soi da', 'visia', 'vi sinh', 'nghien cuu', 'te bao'] },
  { name: 'HeartPulse', label: 'Nhịp tim sinh học', category: 'medical', keywords: ['suc khoe', 'tim mach', 'sinh hoc', 'song'] },
  { name: 'HeartHandshake', label: 'Trái tim tận tâm', category: 'medical', keywords: ['cham soc', 'tan tam', 'phuc hoi', 'dong hanh'] },
  { name: 'Syringe', label: 'Kim tiêm vi điểm', category: 'medical', keywords: ['tiem', 'meso', 'botox', 'filler', 'noi khoa'] },
  { name: 'Activity', label: 'Xung điện / Hoạt tính', category: 'medical', keywords: ['hoat tinh', 'dien tim', 'dieu tri', 'seo'] },
  { name: 'ShieldCheck', label: 'Khiên bảo chứng y khoa', category: 'medical', keywords: ['chuan y khoa', 'an toan', 'chinh hang', 'uy tin'] },
  { name: 'Award', label: 'Huy hiệu chuyên môn', category: 'medical', keywords: ['sau dai hoc', 'thac si', 'giai thuong', 'chung nhan'] },
  { name: 'GraduationCap', label: 'Mũ học thuật / Đào tạo', category: 'medical', keywords: ['dao tao', 'hoc vien', 'academy', 'nghe', 'chung chi'] },

  // Dịch vụ & Thẩm mỹ
  { name: 'ShieldAlert', label: 'Đặc trị mụn viêm', category: 'service', keywords: ['mun', 'khang tri', 'viem', 'acne', 'shield'] },
  { name: 'Zap', label: 'Nâng cơ công nghệ cao', category: 'service', keywords: ['nang co', 'jovena', 'rf', 'hifu', 'tre hoa', 'laser'] },
  { name: 'SunMedium', label: 'Sắc tố & Trị nám', category: 'service', keywords: ['nam', 'tan nhang', 'doi moi', 'sac to', 'sun'] },
  { name: 'Sun', label: 'Mặt trời rạng rỡ', category: 'service', keywords: ['sang da', 'chong nang', 'nang', 'sang'] },
  { name: 'Feather', label: 'Lông vũ dịu nhẹ / Phục hồi', category: 'service', keywords: ['rung toc', 'diu nhe', 'nang toc', 'nhe nhang'] },
  { name: 'Sparkles', label: 'Lấp lánh trẻ hóa', category: 'service', keywords: ['sang da', 'tre hoa', 'dep', 'phuc hoi', 'glow'] },
  { name: 'Sparkle', label: 'Tia sáng laser', category: 'service', keywords: ['triet long', 'laser', 'diode', 'sang'] },
  { name: 'Fingerprint', label: 'Cá nhân hóa độc bản', category: 'service', keywords: ['ca nhan hoa', 'van tay', 'doc ban', 'phac do'] },
  { name: 'Cpu', label: 'Công nghệ vi xử lý', category: 'service', keywords: ['cong nghe cao', 'may moc', 'hien dai', 'fda'] },

  // Sản phẩm & Danh mục
  { name: 'Droplets', label: 'Giọt nước làm sạch', category: 'product', keywords: ['lam sach', 'tay trang', 'sua rua mat', 'nuoc', 'clean'] },
  { name: 'Droplet', label: 'Giọt tinh chất serum', category: 'product', keywords: ['serum', 'ampoule', 'tinh chat', 'duong am'] },
  { name: 'ShoppingBag', label: 'Túi mua sắm', category: 'product', keywords: ['duoc my pham', 'san pham', 'hang hoa', 'gio hang'] },
  { name: 'Tag', label: 'Nhãn thương hiệu', category: 'product', keywords: ['brand', 'thuong hieu', 'chinh hang', 'gia'] },
  { name: 'Package', label: 'Hộp sản phẩm đóng gói', category: 'product', keywords: ['dong goi', 'hop', 'set', 'combo'] },
  { name: 'Star', label: 'Ngôi sao nổi bật', category: 'product', keywords: ['danh gia', 'review', 'tieu bieu', 'hot'] },
  { name: 'DollarSign', label: 'Giá niêm yết', category: 'product', keywords: ['gia', 'chi phi', 'khuyen mai'] },
  { name: 'Flame', label: 'Ngọn lửa hot', category: 'product', keywords: ['ban chay', 'hot', 'khuyen mai', 'noi bat'] },

  // Điều hướng & Back to Top
  { name: 'ArrowUp', label: 'Mũi tên lên (Arrow Up)', category: 'navigation', keywords: ['len dau trang', 'back to top', 'cuon', 'mui ten'] },
  { name: 'ChevronUp', label: 'Mũi tên nhọn (Chevron Up)', category: 'navigation', keywords: ['chevron', 'len', 'top', 'scroll'] },
  { name: 'ArrowUpCircle', label: 'Mũi tên trong vòng tròn', category: 'navigation', keywords: ['circle', 'tron', 'len tren', 'back to top'] },
  { name: 'ChevronsUp', label: 'Mũi tên kép lên nhanh', category: 'navigation', keywords: ['double', 'nhanh', 'dau trang'] },
  { name: 'MoveUp', label: 'Nút di chuyển lên', category: 'navigation', keywords: ['move', 'dieu huong', 'top'] },
  { name: 'ArrowUpRight', label: 'Mũi tên chéo liên kết', category: 'navigation', keywords: ['link', 'ngoai', 'dieu huong'] },
  { name: 'ArrowRight', label: 'Mũi tên sang phải', category: 'navigation', keywords: ['tiep tuc', 'xem them', 'cta'] },
  { name: 'CheckCircle2', label: 'Dấu tích xanh chuẩn', category: 'general', keywords: ['hoan thanh', 'chuan', 'thanh cong', 'dat'] }
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
  recommendedCategory?: 'medical' | 'service' | 'product' | 'navigation' | 'general' | 'all';
  initialCategory?: 'medical' | 'service' | 'product' | 'navigation' | 'general' | 'all' | string;
}

export const IconPickerModal: React.FC<IconPickerModalProps> = ({
  isOpen,
  onClose,
  selectedIconName,
  currentIconName,
  selectedIconUrl,
  currentIconUrl,
  onSelect,
  title = 'Chọn Icon từ Thư viện Chuẩn',
  recommendedCategory,
  initialCategory
}) => {
  const initialCat = (initialCategory || recommendedCategory || 'all') as string;
  const initName = currentIconName || selectedIconName || 'Sparkles';
  const initUrl = currentIconUrl || selectedIconUrl || '';
  const [activeCategory, setActiveCategory] = useState<string>(initialCat);
  const [searchQuery, setSearchQuery] = useState('');
  const [customUrl, setCustomUrl] = useState(initUrl);
  const [tempIconName, setTempIconName] = useState(initName);
  const [activeTab, setActiveTab] = useState<'lucide' | 'custom'>('lucide');
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
      onSelect(tempIconName, undefined);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-neutral-200 flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="p-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/70">
          <div>
            <h3 className="text-base font-bold text-neutral-900 font-heading flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-700" />
              <span>{title}</span>
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Chọn biểu tượng Lucide hoặc tải lên ảnh/SVG an toàn từ Thư viện Media.
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

        {/* Tab Switcher: Lucide Library vs Custom URL / Media */}
        <div className="px-5 pt-4 flex items-center gap-2 border-b border-neutral-200">
          <button
            type="button"
            onClick={() => setActiveTab('lucide')}
            className={`pb-2.5 px-3 text-xs font-bold transition border-b-2 ${
              activeTab === 'lucide'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Thư viện Icon Lucide ({CURATED_ICONS.length})
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

        {/* Tab 1: Lucide Library */}
        {activeTab === 'lucide' && (
          <div className="p-5 flex-1 overflow-y-auto space-y-4">
            {/* Search & Categories Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm icon theo tên, công dụng (VD: 'da lieu', 'mui ten', 'thuoc')..."
                  className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
                />
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
                {[
                  { id: 'all', label: 'Tất cả' },
                  { id: 'medical', label: 'Y tế' },
                  { id: 'service', label: 'Dịch vụ' },
                  { id: 'product', label: 'Sản phẩm' },
                  { id: 'navigation', label: 'Nút cuộn & Mũi tên' }
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
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 max-h-[42vh] overflow-y-auto pr-1">
              {filteredIcons.map((item) => {
                const isSelected = tempIconName === item.name && !customUrl;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      setTempIconName(item.name);
                      setCustomUrl('');
                    }}
                    className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1.5 group relative ${
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
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition ${
                        isSelected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-neutral-100 text-neutral-700 group-hover:bg-emerald-100 group-hover:text-emerald-800'
                      }`}
                    >
                      <DynamicIcon name={item.name} className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold text-neutral-800 line-clamp-1 block w-full">
                      {item.name}
                    </span>
                    <span className="text-[9px] text-neutral-400 line-clamp-1 block w-full">
                      {item.label}
                    </span>
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
              <span>{customUrl ? "Ảnh/SVG tùy chỉnh" : tempIconName}</span>
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
