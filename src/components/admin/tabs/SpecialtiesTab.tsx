import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Stethoscope,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Layers,
  Image as ImageIcon,
  ArrowUp,
  ArrowDown,
  Eye,
  Settings2,
  AlertCircle,
  Check,
  Palette,
  ArrowRight,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { useDemoData } from "../../../context/DemoDataContext";
import { Specialty } from "../../../data/specialties";
import {
  EcosystemSpecialtiesSectionConfig,
  defaultSpecialtiesSectionConfig
} from "../../../data/siteConfig";
import { ConfirmationModal } from "../ConfirmationModal";
import { MediaLibraryModal } from "../MediaLibraryModal";

const PRESET_ROUTES = [
  { label: "Khoa Da liễu (/khoa-da-lieu)", url: "/khoa-da-lieu" },
  { label: "Khoa Xét nghiệm (/khoa-xet-nghiem)", url: "/khoa-xet-nghiem" },
  { label: "Nhà thuốc (/nha-thuoc)", url: "/nha-thuoc" },
  { label: "Dược – Mỹ phẩm (/duoc-my-pham)", url: "/duoc-my-pham" },
  { label: "Đào tạo nghề – LBC Academy (/dao-tao)", url: "/dao-tao" },
];

const CROP_POSITIONS = [
  { label: "Chính giữa (center center) - Khuyến nghị", value: "center center" },
  { label: "Căn trên (center top)", value: "center top" },
  { label: "Căn dưới (center bottom)", value: "center bottom" },
  { label: "Lệch phải (center right)", value: "center right" },
  { label: "Lệch trái (center left)", value: "center left" },
];

export const SpecialtiesTab: React.FC = () => {
  const {
    specialties,
    updateSpecialties,
    saveSpecialty,
    deleteSpecialty,
    siteConfig,
    updateSiteConfig,
    refreshFromNeon
  } = useDemoData();

  // Section level configuration state
  const [sectionConfig, setSectionConfig] = useState<EcosystemSpecialtiesSectionConfig>(
    siteConfig.specialtiesSectionConfig || defaultSpecialtiesSectionConfig
  );

  useEffect(() => {
    if (siteConfig.specialtiesSectionConfig) {
      setSectionConfig(siteConfig.specialtiesSectionConfig);
    }
  }, [siteConfig.specialtiesSectionConfig]);

  const [showSectionSettings, setShowSectionSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingSpecialty, setEditingSpecialty] = useState<Specialty | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingSection, setIsSavingSection] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [showFullPreview, setShowFullPreview] = useState(false);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const sortedSpecialties = [...specialties].sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  const filtered = sortedSpecialties.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.badge || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateNew = () => {
    const newSpec: Specialty = {
      id: `spec-${Date.now()}`,
      code: `ICO-K${specialties.length + 1}`,
      name: "Chuyên khoa mới",
      slug: `chuyen-khoa-moi-${Date.now()}`,
      badge: sectionConfig.defaultBadgeText || "Chuyên khoa",
      tagline: "Thông điệp y khoa chuyên môn",
      shortDesc: "Mô tả ngắn về phạm vi thăm khám và điều trị (dưới 120 ký tự).",
      fullDesc: "Nội dung giới thiệu chi tiết về cơ sở vật chất và quy trình chuyên khoa...",
      iconName: "Stethoscope",
      ctaText: "Tìm hiểu",
      ctaLink: "/khoa-da-lieu",
      servicesList: ["Dịch vụ điều trị 1", "Dịch vụ điều trị 2"],
      inChargePerson: "Bác sĩ Chuyên khoa",
      licenseInfo: "Số phép hoạt động y tế",
      operatingHours: "08:00 - 18:00 (Thứ 2 - Thứ 7)",
      heroImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
      galleryImages: [],
      altText: "Ảnh minh họa chuyên khoa",
      imagePosition: "center center",
      enabled: true,
      order: specialties.length + 1
    };
    setEditingSpecialty(newSpec);
  };

  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSpecialty) return;
    setIsSaving(true);
    const res = await saveSpecialty(editingSpecialty);
    setIsSaving(false);
    if (res.success) {
      showToast(`Đã lưu thành công banner: "${editingSpecialty.name}" vào cơ sở dữ liệu!`);
      setEditingSpecialty(null);
    } else {
      alert("Lỗi khi lưu chuyên khoa: " + (res.error || "Không thể kết nối đến cơ sở dữ liệu"));
    }
  };

  const handleSaveSectionSettings = async () => {
    setIsSavingSection(true);
    const res = await updateSiteConfig({
      specialtiesSectionConfig: sectionConfig
    });
    setIsSavingSection(false);
    if (res.success) {
      showToast("Đã lưu cấu hình Section 5 Chuyên khoa thành công!");
    } else {
      alert("Lỗi khi lưu cấu hình section: " + (res.error || "Không thể kết nối đến cơ sở dữ liệu"));
    }
  };

  const handleToggleBanner = async (id: string) => {
    const nextList = specialties.map((s) =>
      s.id === id ? { ...s, enabled: s.enabled === false ? true : false } : s
    );
    setIsSaving(true);
    const res = await updateSpecialties(nextList);
    setIsSaving(false);
    if (res.success) {
      showToast("Đã cập nhật trạng thái hiển thị banner!");
    } else {
      alert("Lỗi khi cập nhật trạng thái: " + (res.error || "Không thể cập nhật"));
    }
  };

  const handleMoveOrder = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sortedSpecialties.length) return;

    const nextList = [...sortedSpecialties];
    const temp = nextList[index];
    nextList[index] = nextList[targetIndex];
    nextList[targetIndex] = temp;

    const reordered = nextList.map((item, idx) => ({ ...item, order: idx + 1 }));
    setIsSaving(true);
    const res = await updateSpecialties(reordered);
    setIsSaving(false);
    if (res.success) {
      showToast("Đã cập nhật thứ tự hiển thị banner!");
    } else {
      alert("Lỗi khi đổi thứ tự: " + (res.error || "Không thể cập nhật"));
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Notification Toast */}
      {toastMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-fadeIn font-medium shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
              Module Trang chủ
            </span>
            <span className="text-xs text-neutral-400">•</span>
            <span className="text-xs font-semibold text-neutral-500">5 Banner ngang chuẩn ảnh mẫu</span>
          </div>
          <h2 className="text-lg font-bold text-neutral-900 font-heading flex items-center gap-2 mt-1">
            <Stethoscope className="w-5 h-5 text-emerald-700" />
            <span>5 Chuyên khoa & Lĩnh vực Trọng tâm</span>
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl leading-relaxed">
            Quản lý 5 banner nằm ngang (nội dung bên trái, ảnh minh họa bên phải) trên trang chủ. Bố cục Desktop: Hàng 1 (3 banner), Hàng 2 (2 banner cân đối).
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setShowSectionSettings(!showSectionSettings)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition shadow-xs ${
              showSectionSettings
                ? "bg-neutral-800 text-white border-neutral-800"
                : "bg-white text-neutral-700 hover:bg-neutral-50 border-neutral-300"
            }`}
          >
            <Settings2 className="w-4 h-4" />
            <span>{showSectionSettings ? "Đóng Cấu hình Section" : "Cấu hình Section"}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowFullPreview(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-300 rounded-xl shadow-xs transition"
          >
            <Eye className="w-4 h-4 text-neutral-600" />
            <span>Xem trước Giao diện</span>
          </button>

          <button
            type="button"
            onClick={handleCreateNew}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Banner</span>
          </button>
        </div>
      </div>

      {/* Collapsible Section Configuration Card */}
      {showSectionSettings && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs animate-fadeIn space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-neutral-900 font-heading">
                Cấu hình Chung cho Section "5 Chuyên khoa"
              </h3>
            </div>
            <span className="text-[11px] text-neutral-400">
              Lưu trực tiếp vào Neon PostgreSQL
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {/* Enable Section Toggle */}
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between">
              <div>
                <span className="font-semibold text-neutral-800 block">Hiển thị Section</span>
                <span className="text-[11px] text-neutral-500">Bật/tắt khối này trên trang chủ</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={sectionConfig.enabled !== false}
                  onChange={(e) =>
                    setSectionConfig({ ...sectionConfig, enabled: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-neutral-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            {/* Show Badge Toggle */}
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between">
              <div>
                <span className="font-semibold text-neutral-800 block">Hiển thị nhãn nhỏ (Badge)</span>
                <span className="text-[11px] text-neutral-500">Hiển thị nhãn ở góc trên mỗi banner</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={sectionConfig.showBadge !== false}
                  onChange={(e) =>
                    setSectionConfig({ ...sectionConfig, showBadge: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-neutral-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            {/* Default Badge Text */}
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
              <label className="font-semibold text-neutral-800 block mb-1">
                Nhãn mặc định Section
              </label>
              <input
                type="text"
                value={sectionConfig.defaultBadgeText || "Chuyên khoa"}
                onChange={(e) =>
                  setSectionConfig({ ...sectionConfig, defaultBadgeText: e.target.value })
                }
                placeholder="Ví dụ: Chuyên khoa"
                className="w-full px-3 py-1.5 text-xs bg-white border border-neutral-300 rounded-lg focus:outline-hidden focus:border-emerald-600"
              />
              <span className="text-[10px] text-neutral-400 mt-1 block">
                Áp dụng khi banner không cài nhãn riêng
              </span>
            </div>

            {/* Section Title */}
            <div className="md:col-span-2">
              <label className="font-semibold text-neutral-800 block mb-1">
                Tiêu đề Section
              </label>
              <input
                type="text"
                value={sectionConfig.title}
                onChange={(e) =>
                  setSectionConfig({ ...sectionConfig, title: e.target.value })
                }
                placeholder="5 Chuyên khoa & Lĩnh vực Trọng tâm"
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-hidden focus:border-emerald-600 font-heading font-semibold"
              />
            </div>

            {/* Desktop Layout Preset */}
            <div>
              <label className="font-semibold text-neutral-800 block mb-1">
                Bố cục Desktop
              </label>
              <select
                value={sectionConfig.desktopLayout || "3-2"}
                onChange={(e) =>
                  setSectionConfig({
                    ...sectionConfig,
                    desktopLayout: e.target.value as "3-2" | "3-cols" | "2-cols"
                  })
                }
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl bg-white focus:outline-hidden"
              >
                <option value="3-2">Mặc định Brief: Hàng 1 (3 banner) + Hàng 2 (2 banner)</option>
                <option value="3-cols">Lưới 3 cột đồng đều (Grid 3 cols)</option>
                <option value="2-cols">Lưới 2 cột rộng rãi (Grid 2 cols)</option>
              </select>
            </div>

            {/* Section Subtitle */}
            <div className="md:col-span-2">
              <label className="font-semibold text-neutral-800 block mb-1">
                Mô tả tổng quan Section (Subtitle)
              </label>
              <textarea
                rows={2}
                value={sectionConfig.subtitle}
                onChange={(e) =>
                  setSectionConfig({ ...sectionConfig, subtitle: e.target.value })
                }
                placeholder="Mô hình khép kín kết hợp giữa thăm khám da liễu, xét nghiệm hỗ trợ..."
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl resize-none focus:outline-hidden focus:border-emerald-600"
              />
            </div>

            {/* Padding & Spacing */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-semibold text-neutral-800 block mb-1">
                  Khoảng cách trên/dưới
                </label>
                <select
                  value={sectionConfig.paddingY || "normal"}
                  onChange={(e) =>
                    setSectionConfig({
                      ...sectionConfig,
                      paddingY: e.target.value as "compact" | "normal" | "spacious"
                    })
                  }
                  className="w-full px-2.5 py-2 text-xs border border-neutral-300 rounded-xl bg-white focus:outline-hidden"
                >
                  <option value="compact">Gọn nhẹ (py-10)</option>
                  <option value="normal">Tiêu chuẩn (py-16)</option>
                  <option value="spacious">Rộng rãi (py-20)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-neutral-800 block mb-1">
                  Khoảng cách giữa thẻ
                </label>
                <select
                  value={sectionConfig.gap || "md"}
                  onChange={(e) =>
                    setSectionConfig({
                      ...sectionConfig,
                      gap: e.target.value as "sm" | "md" | "lg"
                    })
                  }
                  className="w-full px-2.5 py-2 text-xs border border-neutral-300 rounded-xl bg-white focus:outline-hidden"
                >
                  <option value="sm">Hẹp (14px)</option>
                  <option value="md">Tiêu chuẩn (18px)</option>
                  <option value="lg">Rộng (24px)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end pt-3 border-t border-neutral-100">
            <button
              type="button"
              disabled={isSavingSection}
              onClick={handleSaveSectionSettings}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 rounded-xl shadow-xs transition flex items-center gap-1.5"
            >
              {isSavingSection ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Đang lưu Neon DB...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Lưu Cấu hình Section</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Search & Counter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên hoặc nội dung..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-hidden focus:border-emerald-600 bg-white"
          />
        </div>

        <div className="flex items-center gap-3 text-xs text-neutral-500 self-end sm:self-center">
          <span>
            Tổng cộng: <strong className="text-neutral-900">{specialties.length}</strong> chuyên khoa
          </span>
          <span>•</span>
          <span className="text-emerald-700 font-medium">
            {specialties.filter((s) => s.enabled !== false).length} đang hiển thị
          </span>
        </div>
      </div>

      {/* List of 5 Banners */}
      <div className="space-y-3.5">
        {filtered.map((spec, index) => {
          const charCount = spec.shortDesc?.length || 0;
          const isOverLimit = charCount > 120;
          const badgeText = spec.badge?.trim() || sectionConfig.defaultBadgeText || "Chuyên khoa";

          return (
            <div
              key={spec.id}
              className={`bg-white rounded-2xl border transition-all p-4 sm:p-5 shadow-xs hover:shadow-md flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 ${
                spec.enabled === false
                  ? "border-neutral-200 bg-neutral-50/70 opacity-60"
                  : "border-neutral-200"
              }`}
            >
              {/* Left Info: Order Badge + Image Preview + Content Summary */}
              <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                {/* Reorder Buttons & Order Number */}
                <div className="flex flex-col items-center justify-center gap-1 shrink-0 bg-neutral-50 p-1.5 rounded-xl border border-neutral-200">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMoveOrder(index, "up")}
                    className="p-1 rounded text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/70 disabled:opacity-20 transition"
                    title="Di chuyển lên"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-bold text-neutral-600 font-mono">
                    #{index + 1}
                  </span>
                  <button
                    type="button"
                    disabled={index === sortedSpecialties.length - 1}
                    onClick={() => handleMoveOrder(index, "down")}
                    className="p-1 rounded text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/70 disabled:opacity-20 transition"
                    title="Di chuyển xuống"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Banner Mini Image Thumbnail */}
                <div className="w-24 sm:w-28 h-16 sm:h-18 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0 relative group/thumb">
                  <img
                    src={spec.heroImage}
                    alt={spec.name}
                    style={{ objectPosition: spec.imagePosition || "center center" }}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/images/fallback-clinic.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[9px] text-white font-semibold px-1 py-0.5 bg-black/60 rounded">
                      {spec.imagePosition || "center"}
                    </span>
                  </div>
                </div>

                {/* Text Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {badgeText}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">
                      {spec.code}
                    </span>
                    <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50/50 px-2 py-0.5 rounded-md">
                      Route: {spec.ctaLink || `/${spec.slug}`}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-neutral-900 font-heading truncate">
                    {spec.name}
                  </h3>

                  <p className="text-xs text-neutral-600 line-clamp-1 mt-0.5">
                    {spec.shortDesc}
                  </p>

                  <div className="flex items-center gap-3 mt-1 text-[11px] text-neutral-400">
                    <span className={isOverLimit ? "text-red-600 font-semibold" : "text-neutral-500"}>
                      Độ dài mô tả: {charCount}/120 ký tự {isOverLimit && "⚠️ Quá 120 ký tự"}
                    </span>
                    <span>•</span>
                    <span>Nút CTA: "{spec.ctaText || "Tìm hiểu"}"</span>
                  </div>
                </div>
              </div>

              {/* Right Actions: Toggle Status & Action Buttons */}
              <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-neutral-100">
                {/* Toggle Enable/Disable Switch */}
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={spec.enabled !== false}
                      onChange={() => handleToggleBanner(spec.id)}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4.5 bg-neutral-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                  <span className="text-[11px] text-neutral-500 font-medium hidden sm:inline">
                    {spec.enabled !== false ? "Hiển thị" : "Đã ẩn"}
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setEditingSpecialty({ ...spec })}
                    className="p-2 text-xs font-semibold text-neutral-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-xl border border-neutral-200 transition flex items-center gap-1"
                    title="Chỉnh sửa banner"
                  >
                    <Edit className="w-3.5 h-3.5 text-neutral-600" />
                    <span>Sửa</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(spec.id)}
                    className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                    title="Xóa banner"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Specialty Banner Modal */}
      {editingSpecialty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-6 overflow-hidden border border-neutral-200 flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                  Cấu hình Banner Ngang
                </span>
                <h3 className="text-base font-bold text-neutral-900 font-heading">
                  Chỉnh sửa: {editingSpecialty.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingSpecialty(null)}
                className="w-7 h-7 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveBanner} className="flex-1 overflow-y-auto">
              <div className="p-5 sm:p-6 space-y-4 text-xs">
                {/* LIVE PREVIEW OF HORIZONTAL BANNER */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Xem trước banner trực tiếp (Live Preview)</span>
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      Tỷ lệ & bố cục hiển thị trên trang chủ
                    </span>
                  </div>

                  {/* Horizontal Banner Preview Box */}
                  <div className="p-3 bg-neutral-100 rounded-2xl border border-neutral-200">
                    <div
                      className="group relative overflow-hidden bg-white border border-slate-100 rounded-2xl shadow-xs flex flex-row items-stretch min-h-[160px] sm:min-h-[175px]"
                      style={{
                        backgroundColor: editingSpecialty.bgColor || undefined,
                        color: editingSpecialty.textColor || undefined
                      }}
                    >
                      {/* Left Content Column */}
                      <div className="flex-1 p-3.5 sm:p-4 flex flex-col justify-between z-10 min-w-0 pr-2">
                        <div>
                          {/* Badge */}
                          <div className="mb-1.5">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100">
                              {editingSpecialty.badge?.trim() ||
                                sectionConfig.defaultBadgeText ||
                                "Chuyên khoa"}
                            </span>
                          </div>

                          {/* Title */}
                          <h4 className="font-heading font-bold text-sm sm:text-base text-slate-900 line-clamp-1 leading-snug">
                            {editingSpecialty.name || "Tên chuyên khoa"}
                          </h4>

                          {/* Short Desc */}
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                            {editingSpecialty.shortDesc || "Mô tả ngắn phạm vi hoạt động chuyên môn."}
                          </p>
                        </div>

                        {/* CTA button */}
                        <div className="pt-2">
                          <span
                            style={{
                              backgroundColor: editingSpecialty.btnBgColor || undefined,
                              color: editingSpecialty.btnTextColor || undefined
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200/70 shadow-2xs"
                          >
                            <span>{editingSpecialty.ctaText || "Tìm hiểu"}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>

                      {/* Right Image Illustration */}
                      <div className="w-[38%] sm:w-[40%] relative overflow-hidden shrink-0 self-stretch">
                        <img
                          src={editingSpecialty.heroImage}
                          alt={editingSpecialty.altText || editingSpecialty.name}
                          style={{
                            objectPosition: editingSpecialty.imagePosition || "center center"
                          }}
                          className="w-full h-full object-cover brightness-[0.98]"
                          onError={(e) => {
                            e.currentTarget.src = "/images/fallback-clinic.svg";
                          }}
                        />
                        <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white via-white/50 to-transparent pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-neutral-100">
                  {/* Name / Title */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Tiêu đề Banner (Tên chuyên khoa) *
                    </label>
                    <input
                      type="text"
                      value={editingSpecialty.name}
                      onChange={(e) =>
                        setEditingSpecialty({ ...editingSpecialty, name: e.target.value })
                      }
                      required
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-hidden focus:border-emerald-600 font-heading font-semibold"
                    />
                  </div>

                  {/* Badge */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Nhãn nhỏ (Badge)
                    </label>
                    <input
                      type="text"
                      value={editingSpecialty.badge || ""}
                      onChange={(e) =>
                        setEditingSpecialty({ ...editingSpecialty, badge: e.target.value })
                      }
                      placeholder={`Mặc định: "${sectionConfig.defaultBadgeText || "Chuyên khoa"}"`}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-hidden focus:border-emerald-600"
                    />
                    <span className="text-[10px] text-neutral-400 mt-0.5 block">
                      Để trống sẽ dùng nhãn mặc định của section ("{sectionConfig.defaultBadgeText || "Chuyên khoa"}")
                    </span>
                  </div>
                </div>

                {/* Short Description with Character Counter */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                      Mô tả ngắn (Brief: không vượt quá 120 ký tự) *
                    </label>
                    <span
                      className={`text-[11px] font-mono font-semibold ${
                        (editingSpecialty.shortDesc?.length || 0) > 120
                          ? "text-red-600"
                          : "text-neutral-500"
                      }`}
                    >
                      {editingSpecialty.shortDesc?.length || 0} / 120 ký tự
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    value={editingSpecialty.shortDesc}
                    onChange={(e) =>
                      setEditingSpecialty({
                        ...editingSpecialty,
                        shortDesc: e.target.value
                      })
                    }
                    required
                    placeholder="Nhập mô tả ngắn gọn về chuyên khoa..."
                    className={`w-full px-3 py-2 text-xs border rounded-xl resize-none focus:outline-hidden ${
                      (editingSpecialty.shortDesc?.length || 0) > 120
                        ? "border-red-400 bg-red-50/30 focus:border-red-600"
                        : "border-neutral-300 focus:border-emerald-600"
                    }`}
                  />
                  {(editingSpecialty.shortDesc?.length || 0) > 120 && (
                    <div className="flex items-center gap-1 text-[11px] text-red-600 mt-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Cảnh báo: Mô tả vượt quá 120 ký tự theo brief. Hãy rút gọn lại để banner hiển thị đẹp nhất.</span>
                    </div>
                  )}
                </div>

                {/* CTA Button & Target Route */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Nội dung nút CTA
                    </label>
                    <input
                      type="text"
                      value={editingSpecialty.ctaText || "Tìm hiểu"}
                      onChange={(e) =>
                        setEditingSpecialty({ ...editingSpecialty, ctaText: e.target.value })
                      }
                      placeholder="Tìm hiểu"
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-hidden focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Chọn Route trang con (Sheet 1, mục 2.x)
                    </label>
                    <select
                      value={editingSpecialty.ctaLink}
                      onChange={(e) =>
                        setEditingSpecialty({ ...editingSpecialty, ctaLink: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl bg-white focus:outline-hidden focus:border-emerald-600 font-mono"
                    >
                      {PRESET_ROUTES.map((r) => (
                        <option key={r.url} value={r.url}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Custom URL Input if needed */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Hoặc nhập URL / Route tùy chỉnh
                  </label>
                  <input
                    type="text"
                    value={editingSpecialty.ctaLink}
                    onChange={(e) =>
                      setEditingSpecialty({ ...editingSpecialty, ctaLink: e.target.value })
                    }
                    placeholder="/khoa-da-lieu"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono focus:outline-hidden focus:border-emerald-600"
                  />
                </div>

                {/* Banner Image & Crop Position */}
                <div className="space-y-3 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Hình ảnh Banner & Vị trí Crop</span>
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      Tỷ lệ đề xuất: 800 × 500 px (8:5)
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                      URL Hình ảnh
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="url"
                        value={editingSpecialty.heroImage}
                        onChange={(e) =>
                          setEditingSpecialty({
                            ...editingSpecialty,
                            heroImage: e.target.value
                          })
                        }
                        required
                        className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono bg-white focus:outline-hidden focus:border-emerald-600"
                      />
                      <button
                        type="button"
                        onClick={() => setShowMediaPicker(true)}
                        className="px-3.5 py-2 bg-neutral-200 hover:bg-neutral-300 rounded-xl text-xs font-semibold shrink-0 transition"
                      >
                        Thư viện Media
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                        Vị trí Crop ảnh (object-position)
                      </label>
                      <select
                        value={editingSpecialty.imagePosition || "center center"}
                        onChange={(e) =>
                          setEditingSpecialty({
                            ...editingSpecialty,
                            imagePosition: e.target.value
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded-xl bg-white focus:outline-hidden focus:border-emerald-600"
                      >
                        {CROP_POSITIONS.map((cp) => (
                          <option key={cp.value} value={cp.value}>
                            {cp.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                        Alt text ảnh (SEO & Khả năng tiếp cận)
                      </label>
                      <input
                        type="text"
                        value={editingSpecialty.altText || ""}
                        onChange={(e) =>
                          setEditingSpecialty({
                            ...editingSpecialty,
                            altText: e.target.value
                          })
                        }
                        placeholder="Mô tả ảnh cho công cụ tìm kiếm..."
                        className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded-xl bg-white focus:outline-hidden focus:border-emerald-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Custom Colors & Styling */}
                <div className="space-y-3 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Tùy biến Màu sắc Thẻ (Tùy chọn)</span>
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      Mặc định: Nền trắng, Nút xám nhạt
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-medium text-neutral-600 mb-1">
                        Màu nền thẻ
                      </label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={editingSpecialty.bgColor || "#FFFFFF"}
                          onChange={(e) =>
                            setEditingSpecialty({ ...editingSpecialty, bgColor: e.target.value })
                          }
                          className="w-7 h-7 rounded border border-neutral-300 cursor-pointer p-0.5"
                        />
                        <input
                          type="text"
                          value={editingSpecialty.bgColor || ""}
                          placeholder="#FFFFFF"
                          onChange={(e) =>
                            setEditingSpecialty({ ...editingSpecialty, bgColor: e.target.value })
                          }
                          className="w-full px-2 py-1 text-[11px] font-mono border border-neutral-300 rounded bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-medium text-neutral-600 mb-1">
                        Màu chữ
                      </label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={editingSpecialty.textColor || "#0F172A"}
                          onChange={(e) =>
                            setEditingSpecialty({ ...editingSpecialty, textColor: e.target.value })
                          }
                          className="w-7 h-7 rounded border border-neutral-300 cursor-pointer p-0.5"
                        />
                        <input
                          type="text"
                          value={editingSpecialty.textColor || ""}
                          placeholder="#0F172A"
                          onChange={(e) =>
                            setEditingSpecialty({ ...editingSpecialty, textColor: e.target.value })
                          }
                          className="w-full px-2 py-1 text-[11px] font-mono border border-neutral-300 rounded bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-medium text-neutral-600 mb-1">
                        Màu nền nút CTA
                      </label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={editingSpecialty.btnBgColor || "#F8FAFC"}
                          onChange={(e) =>
                            setEditingSpecialty({ ...editingSpecialty, btnBgColor: e.target.value })
                          }
                          className="w-7 h-7 rounded border border-neutral-300 cursor-pointer p-0.5"
                        />
                        <input
                          type="text"
                          value={editingSpecialty.btnBgColor || ""}
                          placeholder="#F8FAFC"
                          onChange={(e) =>
                            setEditingSpecialty({ ...editingSpecialty, btnBgColor: e.target.value })
                          }
                          className="w-full px-2 py-1 text-[11px] font-mono border border-neutral-300 rounded bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-medium text-neutral-600 mb-1">
                        Màu chữ nút CTA
                      </label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={editingSpecialty.btnTextColor || "#334155"}
                          onChange={(e) =>
                            setEditingSpecialty({ ...editingSpecialty, btnTextColor: e.target.value })
                          }
                          className="w-7 h-7 rounded border border-neutral-300 cursor-pointer p-0.5"
                        />
                        <input
                          type="text"
                          value={editingSpecialty.btnTextColor || ""}
                          placeholder="#334155"
                          onChange={(e) =>
                            setEditingSpecialty({ ...editingSpecialty, btnTextColor: e.target.value })
                          }
                          className="w-full px-2 py-1 text-[11px] font-mono border border-neutral-300 rounded bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enable toggle */}
                <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div>
                    <span className="font-semibold text-neutral-800 block">Kích hoạt hiển thị banner</span>
                    <span className="text-[11px] text-neutral-500">Bật hoặc tắt banner này trên giao diện người dùng</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingSpecialty.enabled !== false}
                      onChange={(e) =>
                        setEditingSpecialty({ ...editingSpecialty, enabled: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-neutral-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingSpecialty(null)}
                  className="px-4 py-2 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-100 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 rounded-xl shadow-xs transition flex items-center gap-1.5"
                >
                  {isSaving ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Đang lưu Neon DB...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Lưu Banner</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Full Preview Modal */}
      {showFullPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full my-6 overflow-hidden border border-neutral-200 flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-700" />
                <h3 className="text-sm font-bold text-neutral-900 font-heading">
                  Xem trước Giao diện Section 5 Chuyên khoa
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center bg-neutral-200/70 p-1 rounded-lg text-xs">
                  <button
                    type="button"
                    onClick={() => setPreviewDevice("desktop")}
                    className={`px-2.5 py-1 rounded font-medium transition ${
                      previewDevice === "desktop" ? "bg-white text-neutral-900 shadow-xs" : "text-neutral-600"
                    }`}
                  >
                    Desktop (3+2)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice("tablet")}
                    className={`px-2.5 py-1 rounded font-medium transition ${
                      previewDevice === "tablet" ? "bg-white text-neutral-900 shadow-xs" : "text-neutral-600"
                    }`}
                  >
                    Tablet (2 cột)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice("mobile")}
                    className={`px-2.5 py-1 rounded font-medium transition ${
                      previewDevice === "mobile" ? "bg-white text-neutral-900 shadow-xs" : "text-neutral-600"
                    }`}
                  >
                    Mobile (1 cột)
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowFullPreview(false)}
                  className="w-7 h-7 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto bg-neutral-50 flex-1 flex justify-center">
              <div
                className={`transition-all duration-300 w-full ${
                  previewDevice === "mobile"
                    ? "max-w-sm bg-white p-4 rounded-3xl shadow-lg border border-neutral-200"
                    : previewDevice === "tablet"
                    ? "max-w-2xl bg-white p-5 rounded-2xl shadow-lg border border-neutral-200"
                    : "max-w-5xl bg-white p-6 rounded-2xl shadow-lg border border-neutral-200"
                }`}
              >
                {/* Title */}
                <div className="text-center mb-6">
                  <h2 className="text-base sm:text-xl font-bold text-neutral-900 font-heading">
                    {sectionConfig.title}
                  </h2>
                  <p className="text-xs text-neutral-500 mt-1 max-w-xl mx-auto">
                    {sectionConfig.subtitle}
                  </p>
                </div>

                {/* Grid */}
                <div
                  className={`grid gap-3.5 ${
                    previewDevice === "mobile"
                      ? "grid-cols-1"
                      : previewDevice === "tablet"
                      ? "grid-cols-2"
                      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-6"
                  }`}
                >
                  {specialties
                    .filter((s) => s.enabled !== false)
                    .map((spec, idx) => {
                      const colSpanClass =
                        previewDevice === "desktop"
                          ? idx < 3
                            ? "col-span-1 md:col-span-1 lg:col-span-2"
                            : "col-span-1 md:col-span-1 lg:col-span-3"
                          : "";

                      const badgeText =
                        spec.badge?.trim() || sectionConfig.defaultBadgeText || "Chuyên khoa";

                      return (
                        <div
                          key={spec.id}
                          className={`group relative overflow-hidden bg-white border border-slate-100 rounded-2xl shadow-xs flex flex-row items-stretch min-h-[160px] sm:min-h-[175px] ${colSpanClass}`}
                        >
                          <div className="flex-1 p-3.5 sm:p-4 flex flex-col justify-between z-10 min-w-0 pr-2">
                            <div>
                              <div className="mb-1.5">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100">
                                  {badgeText}
                                </span>
                              </div>
                              <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 line-clamp-1">
                                {spec.name}
                              </h4>
                              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                                {spec.shortDesc}
                              </p>
                            </div>

                            <div className="pt-2">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-50 text-slate-700 border border-slate-200/70">
                                <span>{spec.ctaText || "Tìm hiểu"}</span>
                                <ArrowRight className="w-3 h-3" />
                              </span>
                            </div>
                          </div>

                          <div className="w-[38%] relative overflow-hidden shrink-0 self-stretch">
                            <img
                              src={spec.heroImage}
                              alt={spec.name}
                              style={{
                                objectPosition: spec.imagePosition || "center center"
                              }}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "/images/fallback-clinic.svg";
                              }}
                            />
                            <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white via-white/50 to-transparent pointer-events-none" />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <ConfirmationModal
        isOpen={!!deleteConfirmId}
        type="danger"
        title="Xóa Banner Chuyên khoa?"
        message="Hành động này sẽ xóa banner khỏi danh sách chuyên khoa trên hệ thống."
        confirmLabel="Xóa"
        cancelLabel="Hủy"
        onConfirm={async () => {
          if (deleteConfirmId) {
            const id = deleteConfirmId;
            setDeleteConfirmId(null);
            const res = await deleteSpecialty(id);
            if (res.success) {
              showToast("Đã xóa chuyên khoa khỏi cơ sở dữ liệu!");
            } else {
              alert("Lỗi khi xóa: " + (res.error || "Không thể xóa"));
            }
          }
        }}
        onCancel={() => setDeleteConfirmId(null)}
      />

      <MediaLibraryModal
        isOpen={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelectMedia={(media) => {
          if (editingSpecialty) {
            setEditingSpecialty({ ...editingSpecialty, heroImage: media.url });
          }
          setShowMediaPicker(false);
        }}
        title="Chọn ảnh Banner Chuyên khoa từ Media"
      />
    </div>
  );
};
