import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Stethoscope,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle2,
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
  RotateCcw,
  Sliders,
  AlignLeft,
  AlignCenter,
  AlignJustify
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

// Helper to convert hex to rgba
function hexToRgba(hexCode: string, alpha: number): string {
  let clean = (hexCode || "#000000").replace("#", "").trim();
  if (clean.length === 3) {
    clean = clean.split("").map((c) => c + c).join("");
  }
  if (clean.length !== 6) {
    return `rgba(0, 0, 0, ${alpha})`;
  }
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Compute overlay background CSS for live preview
function computePreviewOverlay(
  banner: Specialty,
  config: EcosystemSpecialtiesSectionConfig
): React.CSSProperties {
  const isEnabled =
    banner.overlayEnabled !== undefined
      ? banner.overlayEnabled
      : config.overlayEnabled !== false;

  if (!isEnabled) {
    return { display: "none" };
  }

  const rawColor = banner.overlayColor || config.overlayColor || "black";
  let hex = "#000000";
  if (rawColor === "white") hex = "#FFFFFF";
  else if (rawColor === "black") hex = "#000000";
  else if (rawColor === "custom") {
    hex = banner.overlayCustomColor || config.overlayCustomColor || "#000000";
  } else if (rawColor.startsWith("#")) {
    hex = rawColor;
  }

  const opacityVal =
    banner.overlayOpacity !== undefined
      ? banner.overlayOpacity
      : config.overlayOpacity !== undefined
      ? config.overlayOpacity
      : 20;

  const baseAlpha = Math.max(0, Math.min(0.8, opacityVal / 100));
  const mode = banner.overlayMode || config.overlayMode || "gradient-left";

  if (mode === "solid") {
    return {
      backgroundColor: hexToRgba(hex, baseAlpha)
    };
  }

  if (mode === "gradient-bottom") {
    const startA =
      banner.overlayGradientStart !== undefined
        ? banner.overlayGradientStart / 100
        : Math.min(0.92, baseAlpha * 1.5 + 0.35);
    const endA =
      banner.overlayGradientEnd !== undefined
        ? banner.overlayGradientEnd / 100
        : Math.max(0, baseAlpha * 0.3);

    return {
      background: `linear-gradient(to top, ${hexToRgba(hex, startA)} 0%, ${hexToRgba(
        hex,
        (startA + endA) / 2
      )} 55%, ${hexToRgba(hex, endA)} 100%)`
    };
  }

  // Default: 'gradient-left'
  const startA =
    banner.overlayGradientStart !== undefined
      ? banner.overlayGradientStart / 100
      : Math.min(0.92, baseAlpha * 1.6 + 0.32);
  const midA = Math.min(
    0.85,
    (startA +
      (banner.overlayGradientEnd !== undefined
        ? banner.overlayGradientEnd / 100
        : baseAlpha * 0.35)) /
      2
  );
  const endA =
    banner.overlayGradientEnd !== undefined
      ? banner.overlayGradientEnd / 100
      : Math.max(0, baseAlpha * 0.35);

  return {
    background: `linear-gradient(to right, ${hexToRgba(hex, startA)} 0%, ${hexToRgba(
      hex,
      midA
    )} 60%, ${hexToRgba(hex, endA)} 100%)`
  };
}

export const SpecialtiesTab: React.FC = () => {
  const {
    specialties,
    updateSpecialties,
    saveSpecialty,
    deleteSpecialty,
    siteConfig,
    updateSiteConfig
  } = useDemoData();

  // Section level configuration state
  const [sectionConfig, setSectionConfig] = useState<EcosystemSpecialtiesSectionConfig>(
    siteConfig.specialtiesSectionConfig || defaultSpecialtiesSectionConfig
  );

  useEffect(() => {
    if (siteConfig.specialtiesSectionConfig) {
      setSectionConfig({
        ...defaultSpecialtiesSectionConfig,
        ...siteConfig.specialtiesSectionConfig
      });
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

  const filtered = sortedSpecialties.filter(
    (s) =>
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
      order: specialties.length + 1,
      overlayEnabled: true,
      overlayColor: "black",
      overlayOpacity: 20,
      overlayMode: "gradient-left",
      contentPosition: "left"
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
            <span className="text-xs font-semibold text-neutral-500">
              Ảnh nền phủ 100% banner + Overlay chỉnh opacity
            </span>
          </div>
          <h2 className="text-lg font-bold text-neutral-900 font-heading flex items-center gap-2 mt-1">
            <Stethoscope className="w-5 h-5 text-emerald-700" />
            <span>5 Chuyên khoa & Lĩnh vực Trọng tâm</span>
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl leading-relaxed">
            Mỗi banner có ảnh phủ kín 100%, nội dung (nhãn, tiêu đề, mô tả, nút CTA) hiển thị nổi trên lớp overlay. Cho phép chỉnh màu và độ mờ opacity (0% - 80%) thời gian thực.
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
            <span>{showSectionSettings ? "Đóng Cấu hình Section" : "Cấu hình Section & Lớp phủ"}</span>
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
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs animate-fadeIn space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-neutral-900 font-heading">
                Cấu hình Chung cho Section & Lớp phủ (Overlay)
              </h3>
            </div>
            <span className="text-[11px] text-neutral-400">
              Lưu trực tiếp vào Neon PostgreSQL
            </span>
          </div>

          {/* Section general options */}
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
            <div className="md:col-span-3">
              <label className="font-semibold text-neutral-800 block mb-1">
                Mô tả tổng quan Section (Subtitle)
              </label>
              <textarea
                rows={2}
                value={sectionConfig.subtitle}
                onChange={(e) =>
                  setSectionConfig({ ...sectionConfig, subtitle: e.target.value })
                }
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl resize-none focus:outline-hidden focus:border-emerald-600"
              />
            </div>
          </div>

          {/* OVERLAY & OPACITY CONTROLS */}
          <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200/80 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-emerald-200/60 pb-2">
              <span className="font-bold text-neutral-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-700" />
                <span>Cấu hình Lớp phủ Ảnh (Overlay & Opacity) Mặc định</span>
              </span>
              <span className="text-[11px] text-emerald-800 font-medium">
                Áp dụng chung cho cả 5 banner (trừ khi banner có cài đặt riêng)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Overlay Toggle */}
              <div>
                <label className="font-semibold text-neutral-800 block mb-1.5">
                  Bật/tắt lớp phủ
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sectionConfig.overlayEnabled !== false}
                    onChange={(e) =>
                      setSectionConfig({ ...sectionConfig, overlayEnabled: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-neutral-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              {/* Overlay Color Mode */}
              <div>
                <label className="font-semibold text-neutral-800 block mb-1">
                  Màu lớp phủ
                </label>
                <div className="flex items-center gap-2">
                  <select
                    value={sectionConfig.overlayColor || "black"}
                    onChange={(e) =>
                      setSectionConfig({
                        ...sectionConfig,
                        overlayColor: e.target.value as "black" | "white" | "custom"
                      })
                    }
                    className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded-lg bg-white"
                  >
                    <option value="black">Đen (Chuẩn chữ sáng)</option>
                    <option value="white">Trắng (Chuẩn chữ tối)</option>
                    <option value="custom">Màu tùy chỉnh</option>
                  </select>

                  {sectionConfig.overlayColor === "custom" && (
                    <input
                      type="color"
                      value={sectionConfig.overlayCustomColor || "#000000"}
                      onChange={(e) =>
                        setSectionConfig({ ...sectionConfig, overlayCustomColor: e.target.value })
                      }
                      className="w-8 h-8 rounded border border-neutral-300 p-0.5 cursor-pointer shrink-0"
                    />
                  )}
                </div>
              </div>

              {/* Opacity Range Slider (0% - 80%) */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-neutral-800">
                    Độ mờ lớp phủ (Opacity):{" "}
                    <span className="text-emerald-700 font-bold font-mono text-sm">
                      {sectionConfig.overlayOpacity ?? 20}%
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setSectionConfig({ ...sectionConfig, overlayOpacity: 20 })}
                    className="text-[11px] text-neutral-500 hover:text-emerald-700 flex items-center gap-1 font-medium transition"
                    title="Khôi phục giá trị mặc định 20%"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Mặc định 20%</span>
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-neutral-400 font-mono">0%</span>
                  <input
                    type="range"
                    min="0"
                    max="80"
                    step="1"
                    value={sectionConfig.overlayOpacity ?? 20}
                    onChange={(e) =>
                      setSectionConfig({
                        ...sectionConfig,
                        overlayOpacity: parseInt(e.target.value, 10)
                      })
                    }
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <span className="text-[11px] text-neutral-400 font-mono">80%</span>
                </div>
                <span className="text-[10px] text-neutral-500 mt-1 block">
                  Chỉ làm mờ lớp nền phủ, không làm mờ chữ hoặc nút CTA.
                </span>
              </div>

              {/* Overlay Mode */}
              <div>
                <label className="font-semibold text-neutral-800 block mb-1">
                  Kiểu lớp phủ (Mode)
                </label>
                <select
                  value={sectionConfig.overlayMode || "gradient-left"}
                  onChange={(e) =>
                    setSectionConfig({
                      ...sectionConfig,
                      overlayMode: e.target.value as "gradient-left" | "gradient-bottom" | "solid"
                    })
                  }
                  className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded-lg bg-white"
                >
                  <option value="gradient-left">Gradient từ trái sang (Khuyến nghị)</option>
                  <option value="gradient-bottom">Gradient từ dưới lên</option>
                  <option value="solid">Phủ đều 100% (Solid)</option>
                </select>
              </div>

              {/* Banner Height */}
              <div>
                <label className="font-semibold text-neutral-800 block mb-1">
                  Chiều cao banner
                </label>
                <select
                  value={sectionConfig.bannerHeight || "normal"}
                  onChange={(e) =>
                    setSectionConfig({
                      ...sectionConfig,
                      bannerHeight: e.target.value as "compact" | "normal" | "tall"
                    })
                  }
                  className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded-lg bg-white"
                >
                  <option value="compact">Gọn nhẹ (~210px)</option>
                  <option value="normal">Tiêu chuẩn (~235px)</option>
                  <option value="tall">Thoáng đãng (~260px)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end pt-2 border-t border-neutral-100">
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

          const currentOpacity =
            spec.overlayOpacity !== undefined
              ? spec.overlayOpacity
              : sectionConfig.overlayOpacity ?? 20;

          return (
            <div
              key={spec.id}
              className={`bg-white rounded-2xl border transition-all p-4 sm:p-5 shadow-xs hover:shadow-md flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 ${
                spec.enabled === false
                  ? "border-neutral-200 bg-neutral-50/70 opacity-60"
                  : "border-neutral-200"
              }`}
            >
              {/* Left Info: Order Badge + 100% Background Thumbnail + Content Summary */}
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

                {/* Banner Mini Image Thumbnail (Showing Full Cover & Overlay Preview) */}
                <div className="w-28 sm:w-32 h-18 sm:h-20 rounded-xl overflow-hidden border border-neutral-200 shrink-0 relative group/thumb shadow-xs">
                  <img
                    src={spec.heroImage}
                    alt={spec.name}
                    style={{ objectPosition: spec.imagePosition || "center center" }}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/images/fallback-clinic.svg";
                    }}
                  />
                  {/* Overlay preview on thumbnail */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundColor:
                        spec.overlayColor === "white"
                          ? `rgba(255,255,255,${currentOpacity / 100})`
                          : `rgba(0,0,0,${currentOpacity / 100})`
                    }}
                  />
                  <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-black/70 text-white backdrop-blur-xs">
                    {currentOpacity}%
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

                  <div className="flex items-center gap-3 mt-1 text-[11px] text-neutral-400 flex-wrap">
                    <span className={isOverLimit ? "text-red-600 font-semibold" : "text-neutral-500"}>
                      Mô tả: {charCount}/120 ký tự {isOverLimit && "⚠️ Quá 120 ký tự"}
                    </span>
                    <span>•</span>
                    <span>Lớp phủ: <strong>{currentOpacity}%</strong></span>
                    <span>•</span>
                    <span>Vị trí: {spec.contentPosition || "Trái"}</span>
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

                {/* Edit & Delete Buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setEditingSpecialty({ ...spec })}
                    className="px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-xl border border-neutral-200 transition flex items-center gap-1"
                    title="Chỉnh sửa banner"
                  >
                    <Edit className="w-3.5 h-3.5 text-neutral-600" />
                    <span>Sửa</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(spec.id)}
                    className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-6 overflow-hidden border border-neutral-200 flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/70">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                  Cấu hình Banner Phủ 100% Ảnh & Lớp Phủ (Overlay)
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
              <div className="p-5 sm:p-6 space-y-5 text-xs">
                {/* LIVE PREVIEW: FULL 100% BACKGROUND IMAGE WITH REAL-TIME OVERLAY OPACITY */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Xem trước banner trực tiếp (Ảnh phủ 100% + Lớp overlay)</span>
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      Kéo slider bên dưới để xem độ mờ thay đổi tức thì
                    </span>
                  </div>

                  {/* Horizontal Banner Preview Box */}
                  <div className="p-3 bg-neutral-100 rounded-2xl border border-neutral-200">
                    <div
                      className={`group relative overflow-hidden rounded-2xl shadow-md flex flex-col justify-between min-h-[190px] sm:min-h-[215px] border ${
                        editingSpecialty.overlayColor === "white"
                          ? "border-slate-300"
                          : "border-white/20"
                      }`}
                    >
                      {/* Background Image: 100% Coverage */}
                      <img
                        src={editingSpecialty.heroImage}
                        alt={editingSpecialty.name}
                        style={{
                          objectPosition: editingSpecialty.imagePosition || "center center"
                        }}
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                        onError={(e) => {
                          e.currentTarget.src = "/images/fallback-clinic.svg";
                        }}
                      />

                      {/* Overlay Layer */}
                      <div
                        className="absolute inset-0 pointer-events-none transition-all duration-200"
                        style={computePreviewOverlay(editingSpecialty, sectionConfig)}
                      />

                      {/* Content Layer (Relative z-10, never blurred) */}
                      <div
                        className={`relative z-10 p-5 flex flex-col justify-between h-full w-full ${
                          editingSpecialty.contentPosition === "center"
                            ? "items-center text-center"
                            : editingSpecialty.contentPosition === "bottom"
                            ? "items-start justify-end text-left"
                            : "items-start text-left"
                        }`}
                      >
                        <div
                          className={`space-y-1.5 ${
                            editingSpecialty.contentPosition === "center"
                              ? "max-w-md mx-auto"
                              : "max-w-[80%]"
                          }`}
                        >
                          {/* Badge */}
                          <div>
                            <span
                              style={{
                                color:
                                  editingSpecialty.badgeColor ||
                                  (editingSpecialty.overlayColor === "white"
                                    ? "#047857"
                                    : "#FFFFFF"),
                                backgroundColor:
                                  editingSpecialty.badgeBgColor ||
                                  (editingSpecialty.overlayColor === "white"
                                    ? "rgba(236, 253, 245, 0.95)"
                                    : "rgba(255, 255, 255, 0.22)")
                              }}
                              className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border border-white/30 backdrop-blur-md shadow-2xs"
                            >
                              {editingSpecialty.badge?.trim() ||
                                sectionConfig.defaultBadgeText ||
                                "Chuyên khoa"}
                            </span>
                          </div>

                          {/* Title */}
                          <h4
                            style={{
                              color:
                                editingSpecialty.titleColor ||
                                editingSpecialty.textColor ||
                                (editingSpecialty.overlayColor === "white"
                                  ? "#0F172A"
                                  : "#FFFFFF")
                            }}
                            className="font-heading font-bold text-base sm:text-lg leading-snug line-clamp-1 drop-shadow-xs"
                          >
                            {editingSpecialty.name || "Tên chuyên khoa"}
                          </h4>

                          {/* Short Desc */}
                          <p
                            style={{
                              color:
                                editingSpecialty.descColor ||
                                (editingSpecialty.overlayColor === "white"
                                  ? "#334155"
                                  : "#F1F5F9")
                            }}
                            className="text-xs line-clamp-2 leading-relaxed drop-shadow-2xs opacity-95"
                          >
                            {editingSpecialty.shortDesc || "Mô tả ngắn phạm vi hoạt động chuyên môn."}
                          </p>
                        </div>

                        {/* CTA button */}
                        <div className="pt-2">
                          <span
                            style={{
                              backgroundColor:
                                editingSpecialty.btnBgColor ||
                                (editingSpecialty.overlayColor === "white"
                                  ? "#047857"
                                  : "#FFFFFF"),
                              color:
                                editingSpecialty.btnTextColor ||
                                (editingSpecialty.overlayColor === "white"
                                  ? "#FFFFFF"
                                  : "#0F172A")
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md shadow-xs"
                          >
                            <span>{editingSpecialty.ctaText || "Tìm hiểu"}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* OVERLAY & OPACITY SLIDER FOR THIS BANNER */}
                <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 space-y-3.5">
                  <div className="flex items-center justify-between border-b border-emerald-200/60 pb-2">
                    <span className="font-bold text-neutral-900 flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-emerald-700" />
                      <span>Cấu hình Lớp phủ Ảnh (Overlay & Opacity) riêng cho Banner</span>
                    </span>
                    <span className="text-[10px] text-neutral-500">
                      (Ghi đè cấu hình chung của section)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Overlay Toggle */}
                    <div>
                      <label className="font-semibold text-neutral-800 block mb-1">
                        Bật lớp phủ
                      </label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingSpecialty.overlayEnabled !== false}
                          onChange={(e) =>
                            setEditingSpecialty({
                              ...editingSpecialty,
                              overlayEnabled: e.target.checked
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-neutral-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>

                    {/* Color Mode */}
                    <div>
                      <label className="font-semibold text-neutral-800 block mb-1">
                        Màu lớp phủ
                      </label>
                      <div className="flex items-center gap-2">
                        <select
                          value={editingSpecialty.overlayColor || "black"}
                          onChange={(e) =>
                            setEditingSpecialty({
                              ...editingSpecialty,
                              overlayColor: e.target.value
                            })
                          }
                          className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded-lg bg-white"
                        >
                          <option value="black">Đen (Chữ trắng)</option>
                          <option value="white">Trắng (Chữ tối)</option>
                          <option value="custom">Tùy chỉnh</option>
                        </select>
                        {editingSpecialty.overlayColor === "custom" && (
                          <input
                            type="color"
                            value={editingSpecialty.overlayCustomColor || "#000000"}
                            onChange={(e) =>
                              setEditingSpecialty({
                                ...editingSpecialty,
                                overlayCustomColor: e.target.value
                              })
                            }
                            className="w-7 h-7 rounded border border-neutral-300 p-0.5 cursor-pointer shrink-0"
                          />
                        )}
                      </div>
                    </div>

                    {/* Content Position */}
                    <div>
                      <label className="font-semibold text-neutral-800 block mb-1">
                        Vị trí nội dung
                      </label>
                      <select
                        value={editingSpecialty.contentPosition || "left"}
                        onChange={(e) =>
                          setEditingSpecialty({
                            ...editingSpecialty,
                            contentPosition: e.target.value as "left" | "center" | "bottom"
                          })
                        }
                        className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded-lg bg-white"
                      >
                        <option value="left">Bên trái (Khuyến nghị)</option>
                        <option value="center">Chính giữa</option>
                        <option value="bottom">Dưới cùng</option>
                      </select>
                    </div>
                  </div>

                  {/* Real-time Opacity Range Slider (0% - 80%) */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-semibold text-neutral-800">
                        Độ mờ lớp phủ (Opacity):{" "}
                        <span className="text-emerald-700 font-bold font-mono text-sm">
                          {editingSpecialty.overlayOpacity !== undefined
                            ? editingSpecialty.overlayOpacity
                            : sectionConfig.overlayOpacity ?? 20}
                          %
                        </span>
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingSpecialty({
                            ...editingSpecialty,
                            overlayOpacity: 20
                          })
                        }
                        className="text-[11px] text-neutral-500 hover:text-emerald-700 flex items-center gap-1 font-medium transition"
                        title="Khôi phục giá trị mặc định 20%"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Khôi phục 20%</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-neutral-400 font-mono">0%</span>
                      <input
                        type="range"
                        min="0"
                        max="80"
                        step="1"
                        value={
                          editingSpecialty.overlayOpacity !== undefined
                            ? editingSpecialty.overlayOpacity
                            : sectionConfig.overlayOpacity ?? 20
                        }
                        onChange={(e) =>
                          setEditingSpecialty({
                            ...editingSpecialty,
                            overlayOpacity: parseInt(e.target.value, 10)
                          })
                        }
                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                      />
                      <span className="text-[11px] text-neutral-400 font-mono">80%</span>
                    </div>
                  </div>
                </div>

                {/* BASIC INFO */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Name / Title */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Tiêu đề Banner *
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
                    className={`w-full px-3 py-2 text-xs border rounded-xl resize-none focus:outline-hidden ${
                      (editingSpecialty.shortDesc?.length || 0) > 120
                        ? "border-red-400 bg-red-50/30 focus:border-red-600"
                        : "border-neutral-300 focus:border-emerald-600"
                    }`}
                  />
                  {(editingSpecialty.shortDesc?.length || 0) > 120 && (
                    <div className="flex items-center gap-1 text-[11px] text-red-600 mt-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Cảnh báo: Mô tả vượt quá 120 ký tự theo brief. Hãy rút gọn để banner hiển thị đẹp nhất.</span>
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

                {/* Banner Image & Crop Position */}
                <div className="space-y-3 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Hình ảnh Phủ Nền 100% (Hero Image)</span>
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
                      <span>Tùy biến Màu sắc Nút & Chữ</span>
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      Mặc định tự căn chỉnh độ tương phản theo màu lớp phủ
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-medium text-neutral-600 mb-1">
                        Màu tiêu đề
                      </label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={editingSpecialty.titleColor || "#FFFFFF"}
                          onChange={(e) =>
                            setEditingSpecialty({ ...editingSpecialty, titleColor: e.target.value })
                          }
                          className="w-7 h-7 rounded border border-neutral-300 cursor-pointer p-0.5"
                        />
                        <input
                          type="text"
                          value={editingSpecialty.titleColor || ""}
                          placeholder="#FFFFFF"
                          onChange={(e) =>
                            setEditingSpecialty({ ...editingSpecialty, titleColor: e.target.value })
                          }
                          className="w-full px-2 py-1 text-[11px] font-mono border border-neutral-300 rounded bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-medium text-neutral-600 mb-1">
                        Màu mô tả
                      </label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={editingSpecialty.descColor || "#F1F5F9"}
                          onChange={(e) =>
                            setEditingSpecialty({ ...editingSpecialty, descColor: e.target.value })
                          }
                          className="w-7 h-7 rounded border border-neutral-300 cursor-pointer p-0.5"
                        />
                        <input
                          type="text"
                          value={editingSpecialty.descColor || ""}
                          placeholder="#F1F5F9"
                          onChange={(e) =>
                            setEditingSpecialty({ ...editingSpecialty, descColor: e.target.value })
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
                          value={editingSpecialty.btnBgColor || "#FFFFFF"}
                          onChange={(e) =>
                            setEditingSpecialty({ ...editingSpecialty, btnBgColor: e.target.value })
                          }
                          className="w-7 h-7 rounded border border-neutral-300 cursor-pointer p-0.5"
                        />
                        <input
                          type="text"
                          value={editingSpecialty.btnBgColor || ""}
                          placeholder="#FFFFFF"
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
                          value={editingSpecialty.btnTextColor || "#0F172A"}
                          onChange={(e) =>
                            setEditingSpecialty({ ...editingSpecialty, btnTextColor: e.target.value })
                          }
                          className="w-7 h-7 rounded border border-neutral-300 cursor-pointer p-0.5"
                        />
                        <input
                          type="text"
                          value={editingSpecialty.btnTextColor || ""}
                          placeholder="#0F172A"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full my-6 overflow-hidden border border-neutral-200 flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-700" />
                <h3 className="text-sm font-bold text-neutral-900 font-heading">
                  Xem trước Section 5 Chuyên khoa (100% Ảnh nền + Overlay)
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

                      const isLight =
                        spec.overlayColor === "white" ||
                        (!spec.overlayColor && sectionConfig.overlayColor === "white");

                      return (
                        <div
                          key={spec.id}
                          className={`group relative overflow-hidden rounded-2xl shadow-xs flex flex-col justify-between min-h-[190px] sm:min-h-[215px] border ${
                            isLight ? "border-slate-200" : "border-white/15"
                          } ${colSpanClass}`}
                        >
                          {/* Background Image: 100% */}
                          <img
                            src={spec.heroImage}
                            alt={spec.name}
                            style={{
                              objectPosition: spec.imagePosition || "center center"
                            }}
                            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                            onError={(e) => {
                              e.currentTarget.src = "/images/fallback-clinic.svg";
                            }}
                          />

                          {/* Overlay */}
                          <div
                            className="absolute inset-0 pointer-events-none"
                            style={computePreviewOverlay(spec, sectionConfig)}
                          />

                          {/* Content */}
                          <div className="relative z-10 p-5 flex flex-col justify-between h-full w-full">
                            <div className="max-w-[80%] space-y-1.5">
                              <div>
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border backdrop-blur-md shadow-2xs ${
                                    isLight
                                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                      : "bg-white/20 text-white border-white/30"
                                  }`}
                                >
                                  {badgeText}
                                </span>
                              </div>
                              <h4
                                className={`font-heading font-bold text-sm sm:text-base line-clamp-1 drop-shadow-xs ${
                                  isLight ? "text-slate-900" : "text-white"
                                }`}
                              >
                                {spec.name}
                              </h4>
                              <p
                                className={`text-[11px] sm:text-xs line-clamp-2 leading-relaxed drop-shadow-2xs ${
                                  isLight ? "text-slate-700" : "text-slate-100"
                                }`}
                              >
                                {spec.shortDesc}
                              </p>
                            </div>

                            <div className="pt-2">
                              <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md shadow-xs ${
                                  isLight
                                    ? "bg-emerald-700 text-white"
                                    : "bg-white text-slate-900"
                                }`}
                              >
                                <span>{spec.ctaText || "Tìm hiểu"}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
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

      {/* Confirmation Modal */}
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

      {/* Media Library Picker Modal */}
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
