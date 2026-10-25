import React, { useState, useEffect, useMemo } from "react";
import {
  Palette,
  Type,
  Sparkles,
  Layers,
  Sliders,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Image as ImageIcon,
  Eye,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Check,
  Info,
  Maximize2,
  Box
} from "lucide-react";
import { useDemoData } from "../../../context/DemoDataContext";
import { SiteConfig, ThemeConfig, defaultThemeConfig } from "../../../data/siteConfig";
import { MediaLibraryModal } from "../MediaLibraryModal";
import { fileToMediaItem, saveMediaItemToDB } from "../../../utils/mediaStorage";

export type AppearanceSubTab = "branding" | "typography" | "colors" | "spacing" | "banners";

interface AppearanceTabProps {
  initialSubTab?: AppearanceSubTab;
}

// Verified Vietnamese-supporting Google Fonts
const HEADING_FONT_OPTIONS = [
  { value: "'Fraunces', Georgia, serif", label: "Fraunces (Mặc định - Serif sang trọng y khoa & thẩm mỹ)" },
  { value: "'Playfair Display', Georgia, serif", label: "Playfair Display (Serif cổ điển đẳng cấp)" },
  { value: "'Be Vietnam Pro', system-ui, sans-serif", label: "Be Vietnam Pro (Sans-serif rõ nét, hiện đại)" },
  { value: "'Merriweather', Georgia, serif", label: "Merriweather (Serif chuẩn mực báo chí & y khoa)" },
  { value: "'Montserrat', system-ui, sans-serif", label: "Montserrat (Sans-serif hình học sang trọng)" }
];

const BODY_FONT_OPTIONS = [
  { value: "'Be Vietnam Pro', system-ui, -apple-system, sans-serif", label: "Be Vietnam Pro (Mặc định - Tối ưu tiếng Việt tuyệt đối)" },
  { value: "'Inter', system-ui, -apple-system, sans-serif", label: "Inter (Sans-serif công nghệ sạch sẽ)" },
  { value: "'Plus Jakarta Sans', system-ui, sans-serif", label: "Plus Jakarta Sans (Sans-serif cao cấp hiện đại)" },
  { value: "'Roboto', system-ui, -apple-system, sans-serif", label: "Roboto (Sans-serif hài hòa, dễ đọc)" },
  { value: "'Outfit', system-ui, sans-serif", label: "Outfit (Sans-serif mềm mại, trẻ trung)" }
];

const COLOR_PRESETS = [
  {
    name: "LBC Teal Chuẩn Y Khoa",
    primary: "#0E7C86",
    hover: "#0A4F57",
    light: "#EEF7F8",
    secondary: "#C49A45"
  },
  {
    name: "Sapphire Chuyên Sâu",
    primary: "#0369A1",
    hover: "#075985",
    light: "#F0F9FF",
    secondary: "#D97706"
  },
  {
    name: "Ngọc Lục Bảo Trị Liệu",
    primary: "#059669",
    hover: "#047857",
    light: "#ECFDF5",
    secondary: "#B45309"
  },
  {
    name: "Luxury Nude Thẩm Mỹ",
    primary: "#854D0E",
    hover: "#713F12",
    light: "#FEFCE8",
    secondary: "#0E7C86"
  }
];

// Helper: Calculate WCAG relative luminance and contrast ratio
function getContrastRatio(hex1: string, hex2: string): number {
  const getLuminance = (hex: string) => {
    const clean = hex.replace('#', '');
    if (clean.length !== 6) return 0.5;
    const r = parseInt(clean.substring(0, 2), 16) / 255;
    const g = parseInt(clean.substring(2, 4), 16) / 255;
    const b = parseInt(clean.substring(4, 6), 16) / 255;
    const a = [r, g, b].map(v => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);
  return Number(((brightest + 0.05) / (darkest + 0.05)).toFixed(2));
}

export const AppearanceTab: React.FC<AppearanceTabProps> = ({
  initialSubTab = "branding"
}) => {
  const { siteConfig, updateSiteConfig } = useDemoData();
  const [activeSubTab, setActiveSubTab] = useState<AppearanceSubTab>(initialSubTab);

  // Form state
  const [formData, setFormData] = useState<SiteConfig>({ ...siteConfig });
  const [themeState, setThemeState] = useState<ThemeConfig>({
    ...defaultThemeConfig,
    ...(siteConfig.theme || {}),
    primaryColor: siteConfig.primaryColor || siteConfig.theme?.primaryColor || defaultThemeConfig.primaryColor,
    secondaryColor: siteConfig.secondaryColor || siteConfig.theme?.secondaryColor || defaultThemeConfig.secondaryColor,
    fontHeading: siteConfig.fontHeading || siteConfig.theme?.fontHeading || defaultThemeConfig.fontHeading,
    fontBody: siteConfig.fontBody || siteConfig.theme?.fontBody || defaultThemeConfig.fontBody
  });

  const [useSeparateFooterLogo, setUseSeparateFooterLogo] = useState(
    Boolean(siteConfig.logoFooterUrl && siteConfig.logoFooterUrl !== siteConfig.logoHeader)
  );

  const [mediaPickerTarget, setMediaPickerTarget] = useState<
    "logoHeader" | "logoFooter" | "logoWhite" | "favicon" | null
  >(null);

  const [logoPreviewBg, setLogoPreviewBg] = useState<"white" | "light" | "teal" | "dark">("white");
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  useEffect(() => {
    setFormData({ ...siteConfig });
    setThemeState({
      ...defaultThemeConfig,
      ...(siteConfig.theme || {}),
      primaryColor: siteConfig.primaryColor || siteConfig.theme?.primaryColor || defaultThemeConfig.primaryColor,
      secondaryColor: siteConfig.secondaryColor || siteConfig.theme?.secondaryColor || defaultThemeConfig.secondaryColor,
      fontHeading: siteConfig.fontHeading || siteConfig.theme?.fontHeading || defaultThemeConfig.fontHeading,
      fontBody: siteConfig.fontBody || siteConfig.theme?.fontBody || defaultThemeConfig.fontBody
    });
  }, [siteConfig]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const markChanged = () => {
    setHasUnsavedChanges(true);
  };

  // WCAG Contrast calculations
  const textContrastOnBg = useMemo(() => {
    return getContrastRatio(themeState.textColorMain, themeState.backgroundColor);
  }, [themeState.textColorMain, themeState.backgroundColor]);

  const whiteOnPrimaryContrast = useMemo(() => {
    return getContrastRatio("#FFFFFF", themeState.primaryColor);
  }, [themeState.primaryColor]);

  // Handle direct file upload from computer
  const handleDirectUpload = async (
    target: "logoHeader" | "logoFooter" | "logoWhite" | "favicon",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    try {
      const mediaItem = await fileToMediaItem(file);
      await saveMediaItemToDB(mediaItem);

      if (target === "logoHeader") {
        setFormData(prev => ({ ...prev, logoHeader: mediaItem.url, logoUrl: mediaItem.url }));
      } else if (target === "logoFooter") {
        setFormData(prev => ({ ...prev, logoFooterUrl: mediaItem.url, logoFooter: mediaItem.url }));
      } else if (target === "logoWhite") {
        setFormData(prev => ({ ...prev, logoWhiteUrl: mediaItem.url }));
      } else if (target === "favicon") {
        setFormData(prev => ({ ...prev, faviconUrl: mediaItem.url, favicon: mediaItem.url }));
      }
      markChanged();
      showToast(`Đã tải lên ảnh thành công! Bấm "Lưu Thay Đổi" để hoàn tất.`);
    } catch (err) {
      console.error(err);
      alert("Tải ảnh thất bại, vui lòng thử lại.");
    }
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const payload: Partial<SiteConfig> = {
      ...formData,
      // Canonical logo values
      logoHeader: formData.logoHeader || formData.logoUrl,
      logoUrl: formData.logoHeader || formData.logoUrl,
      logoFooterUrl: useSeparateFooterLogo ? (formData.logoFooterUrl || formData.logoHeader) : formData.logoHeader,
      logoFooter: useSeparateFooterLogo ? (formData.logoFooterUrl || formData.logoHeader) : formData.logoHeader,
      logoWhiteUrl: formData.logoWhiteUrl || formData.logoHeader,
      faviconUrl: formData.faviconUrl || formData.favicon,
      favicon: formData.faviconUrl || formData.favicon,

      // Synced theme tokens
      primaryColor: themeState.primaryColor,
      secondaryColor: themeState.secondaryColor,
      fontHeading: themeState.fontHeading,
      fontBody: themeState.fontBody,
      theme: { ...themeState }
    };

    updateSiteConfig(payload);
    setHasUnsavedChanges(false);
    showToast("Đã lưu toàn bộ cấu hình giao diện thành công vào Neon PostgreSQL!");
  };

  const handleResetDefaults = () => {
    if (confirm("Khôi phục toàn bộ Typography, Màu sắc và Kích thước về thiết kế ban đầu của Lạc's Beauty Center?")) {
      setThemeState({ ...defaultThemeConfig });
      setFormData(prev => ({
        ...prev,
        primaryColor: defaultThemeConfig.primaryColor,
        secondaryColor: defaultThemeConfig.secondaryColor,
        fontHeading: defaultThemeConfig.fontHeading,
        fontBody: defaultThemeConfig.fontBody,
        theme: { ...defaultThemeConfig }
      }));
      markChanged();
      showToast("Đã khôi phục giá trị mặc định. Bấm 'Lưu Thay Đổi' để đồng bộ.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-neutral-900 font-heading flex items-center gap-2">
            <Palette className="w-5 h-5 text-emerald-700" />
            <span>Trung Tâm Quản Lý Giao Diện & Thương Hiệu</span>
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl leading-relaxed">
            Hệ thống quản lý nhận diện tập trung duy nhất cho toàn website: Logo, Favicon, Font chữ, Màu sắc chuẩn WCAG, Kích thước banner và khoảng cách bố cục.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {hasUnsavedChanges && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Có thay đổi chưa lưu</span>
            </span>
          )}

          <button
            type="button"
            onClick={handleResetDefaults}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-300 hover:bg-neutral-50 rounded-xl transition shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Mặc định</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave()}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition"
          >
            <Save className="w-4 h-4" />
            <span>Lưu Thay Đổi</span>
          </button>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs flex items-center gap-2 animate-fadeIn font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Subtab Navigation Pills */}
      <div className="flex flex-wrap gap-1.5 p-1.5 bg-white rounded-2xl border border-neutral-200 shadow-xs">
        <button
          type="button"
          onClick={() => setActiveSubTab("branding")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === "branding"
              ? "bg-emerald-700 text-white shadow-xs"
              : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>1. Nhận Diện Thương Hiệu & Logo</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("typography")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === "typography"
              ? "bg-emerald-700 text-white shadow-xs"
              : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
          }`}
        >
          <Type className="w-4 h-4" />
          <span>2. Typography & Kiểu Chữ</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("colors")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === "colors"
              ? "bg-emerald-700 text-white shadow-xs"
              : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>3. Màu Sắc & Độ Tương Phản</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("spacing")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === "spacing"
              ? "bg-emerald-700 text-white shadow-xs"
              : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
          }`}
        >
          <Box className="w-4 h-4" />
          <span>4. Kích Thước & Bo Góc</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("banners")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === "banners"
              ? "bg-emerald-700 text-white shadow-xs"
              : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>5. Hướng Dẫn Tỷ Lệ Ảnh & Banner</span>
        </button>
      </div>

      {/* ========================================================
          SUBTAB 1: NHẬN DIỆN THƯƠNG HIỆU & LOGO
          ======================================================== */}
      {activeSubTab === "branding" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Main Brand Names */}
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <h3 className="font-bold text-neutral-900 text-sm font-heading">
                Thông Tin Thương Hiệu & Tên Phòng Khám
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                  Tên Thương Hiệu (Brand Name)
                </label>
                <input
                  type="text"
                  value={formData.brandName || ""}
                  onChange={(e) => {
                    setFormData({ ...formData, brandName: e.target.value });
                    markChanged();
                  }}
                  placeholder="Lạc's Beauty Center"
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-medium focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                  Tên Loại Hình Cơ Sở Y Tế (Facility Subtitle)
                </label>
                <input
                  type="text"
                  value={formData.facilityName || ""}
                  onChange={(e) => {
                    setFormData({ ...formData, facilityName: e.target.value });
                    markChanged();
                  }}
                  placeholder="Phòng khám Chuyên khoa Da liễu"
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-medium focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                  Khẩu Hiệu / Định Vị Y Học (Tagline)
                </label>
                <input
                  type="text"
                  value={formData.tagline || ""}
                  onChange={(e) => {
                    setFormData({ ...formData, tagline: e.target.value });
                    markChanged();
                  }}
                  placeholder="Tiên phong công nghệ cao – Hướng đến Y học Cá nhân hóa"
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-medium focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Canonical Logos Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 1. Primary Logo (Header & General) */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-emerald-700" />
                  <h4 className="font-bold text-neutral-900 text-sm font-heading">
                    Logo Chính (Primary Logo / Header)
                  </h4>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Nguồn chính thức
                </span>
              </div>

              <p className="text-xs text-neutral-500 leading-relaxed">
                Hiển thị tại Header chính, thanh điều hướng và làm logo mặc định cho toàn bộ website. Khuyến nghị định dạng vector SVG hoặc ảnh PNG nền trong suốt.
              </p>

              {/* Logo Preview on selectable background */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-neutral-500">
                  <span>Xem trước trên nền:</span>
                  <div className="flex items-center gap-1">
                    {(["white", "light", "teal", "dark"] as const).map(bg => (
                      <button
                        key={bg}
                        type="button"
                        onClick={() => setLogoPreviewBg(bg)}
                        className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                          logoPreviewBg === bg ? "bg-neutral-800 text-white border-neutral-800" : "bg-white text-neutral-600 border-neutral-200"
                        }`}
                      >
                        {bg === "white" ? "Trắng" : bg === "light" ? "Nhạt" : bg === "teal" ? "Teal" : "Tối"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={`h-24 rounded-2xl flex items-center justify-center p-3 border transition-colors ${
                  logoPreviewBg === "white" ? "bg-white border-neutral-200" :
                  logoPreviewBg === "light" ? "bg-[#EEF7F8] border-teal-100" :
                  logoPreviewBg === "teal" ? "bg-[#0E7C86] border-teal-700" :
                  "bg-slate-900 border-slate-800"
                }`}>
                  {formData.logoHeader ? (
                    <img
                      src={formData.logoHeader}
                      alt="Logo Preview"
                      className="max-h-16 max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-xs text-neutral-400">Chưa thiết lập logo</span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="url"
                  value={formData.logoHeader || ""}
                  onChange={(e) => {
                    setFormData({ ...formData, logoHeader: e.target.value, logoUrl: e.target.value });
                    markChanged();
                  }}
                  placeholder="https://... hoặc /images/logo.svg"
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono"
                />
                <button
                  type="button"
                  onClick={() => setMediaPickerTarget("logoHeader")}
                  className="px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition shrink-0"
                >
                  Media
                </button>
                <label className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition cursor-pointer shrink-0">
                  <span>Tải lên</span>
                  <input
                    type="file"
                    accept="image/*,.svg,.ico"
                    className="hidden"
                    onChange={(e) => handleDirectUpload("logoHeader", e)}
                  />
                </label>
              </div>
            </div>

            {/* 2. White Logo for Dark Backgrounds */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-emerald-700" />
                  <h4 className="font-bold text-neutral-900 text-sm font-heading">
                    Logo Màu Trắng (White Logo / Dark Mode)
                  </h4>
                </div>
              </div>

              <p className="text-xs text-neutral-500 leading-relaxed">
                Sử dụng khi Header chuyển sang chế độ nền tối (Teal `#0E7C86` hoặc Slate), hoặc dùng làm logo nổi bật ở chân trang Footer.
              </p>

              <div className="h-24 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center p-3">
                {formData.logoWhiteUrl ? (
                  <img
                    src={formData.logoWhiteUrl}
                    alt="Logo White Preview"
                    className="max-h-16 max-w-full object-contain"
                  />
                ) : (
                  <span className="text-xs text-slate-500">Chưa có logo trắng (sẽ tự động dùng logo chính)</span>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="url"
                  value={formData.logoWhiteUrl || ""}
                  onChange={(e) => {
                    setFormData({ ...formData, logoWhiteUrl: e.target.value });
                    markChanged();
                  }}
                  placeholder="https://... hoặc /images/logo-white.svg"
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono"
                />
                <button
                  type="button"
                  onClick={() => setMediaPickerTarget("logoWhite")}
                  className="px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition shrink-0"
                >
                  Media
                </button>
                <label className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition cursor-pointer shrink-0">
                  <span>Tải lên</span>
                  <input
                    type="file"
                    accept="image/*,.svg"
                    className="hidden"
                    onChange={(e) => handleDirectUpload("logoWhite", e)}
                  />
                </label>
              </div>
            </div>

            {/* 3. Footer Logo */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-emerald-700" />
                  <h4 className="font-bold text-neutral-900 text-sm font-heading">
                    Logo Chân Trang (Footer Logo)
                  </h4>
                </div>
              </div>

              {/* Toggle shared vs custom */}
              <div className="flex items-center gap-2 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <input
                  type="checkbox"
                  id="chkFooterLogo"
                  checked={!useSeparateFooterLogo}
                  onChange={(e) => {
                    setUseSeparateFooterLogo(!e.target.checked);
                    markChanged();
                  }}
                  className="w-4 h-4 text-emerald-600 rounded border-neutral-300"
                />
                <label htmlFor="chkFooterLogo" className="text-xs font-medium text-neutral-800 cursor-pointer">
                  Mặc định dùng chung với Logo chính / Logo trắng (Khuyến nghị)
                </label>
              </div>

              {useSeparateFooterLogo && (
                <div className="space-y-3 pt-2">
                  <div className="h-20 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center p-3">
                    {formData.logoFooterUrl ? (
                      <img
                        src={formData.logoFooterUrl}
                        alt="Logo Footer Preview"
                        className="max-h-14 max-w-full object-contain"
                      />
                    ) : (
                      <span className="text-xs text-slate-500">Chưa có logo footer</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={formData.logoFooterUrl || ""}
                      onChange={(e) => {
                        setFormData({ ...formData, logoFooterUrl: e.target.value, logoFooter: e.target.value });
                        markChanged();
                      }}
                      placeholder="https://..."
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setMediaPickerTarget("logoFooter")}
                      className="px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition shrink-0"
                    >
                      Media
                    </button>
                    <label className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition cursor-pointer shrink-0">
                      <span>Tải lên</span>
                      <input
                        type="file"
                        accept="image/*,.svg"
                        className="hidden"
                        onChange={(e) => handleDirectUpload("logoFooter", e)}
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Browser Favicon */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <h4 className="font-bold text-neutral-900 text-sm font-heading">
                    Favicon Trình Duyệt (Browser Tab Icon)
                  </h4>
                </div>
              </div>

              <p className="text-xs text-neutral-500 leading-relaxed">
                Biểu tượng nhỏ hiển thị trên tab trình duyệt và dấu trang. Tự động áp dụng và cập nhật ngay khi lưu. Khuyến nghị tỷ lệ vuông 1:1 (32×32 hoặc 64×64 px).
              </p>

              {/* Favicon Simulation in browser tab */}
              <div className="p-3 bg-neutral-100 rounded-2xl border border-neutral-200 flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-xs border border-neutral-200">
                  {formData.faviconUrl ? (
                    <img src={formData.faviconUrl} alt="Favicon" className="w-4 h-4 object-contain rounded-xs" />
                  ) : (
                    <div className="w-4 h-4 rounded bg-emerald-700 flex items-center justify-center text-[10px] text-white font-bold">L</div>
                  )}
                  <span className="text-xs font-medium text-neutral-700 max-w-[150px] truncate">
                    {formData.brandName || "Lạc's Beauty Center"}
                  </span>
                </div>
                <span className="text-[11px] text-neutral-400">Xem trước hiển thị trên thanh tab</span>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="url"
                  value={formData.faviconUrl || ""}
                  onChange={(e) => {
                    setFormData({ ...formData, faviconUrl: e.target.value, favicon: e.target.value });
                    markChanged();
                  }}
                  placeholder="https://... hoặc .ico / .svg / .png"
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono"
                />
                <button
                  type="button"
                  onClick={() => setMediaPickerTarget("favicon")}
                  className="px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition shrink-0"
                >
                  Media
                </button>
                <label className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition cursor-pointer shrink-0">
                  <span>Tải lên</span>
                  <input
                    type="file"
                    accept="image/*,.ico,.svg"
                    className="hidden"
                    onChange={(e) => handleDirectUpload("favicon", e)}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SUBTAB 2: TYPOGRAPHY & KIỂU CHỮ
          ======================================================== */}
      {activeSubTab === "typography" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-emerald-700" />
                <h3 className="font-bold text-neutral-900 text-sm font-heading">
                  Cấu Hình Hệ Thống Font Chữ (Typography Tokens)
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                Áp dụng qua CSS Variables
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Heading Font */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Font Tiêu Đề (Headings H1–H4)
                </label>
                <select
                  value={themeState.fontHeading}
                  onChange={(e) => {
                    setThemeState({ ...themeState, fontHeading: e.target.value });
                    markChanged();
                  }}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-medium focus:ring-emerald-500 focus:border-emerald-500"
                >
                  {HEADING_FONT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Định hình cá tính thương hiệu cao cấp của phòng khám. Fraunces mang đến phong thái y khoa sang trọng.
                </p>
              </div>

              {/* Body Font */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Font Nội Dung & Giao Diện (Body / UI Controls)
                </label>
                <select
                  value={themeState.fontBody}
                  onChange={(e) => {
                    setThemeState({ ...themeState, fontBody: e.target.value });
                    markChanged();
                  }}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-medium focus:ring-emerald-500 focus:border-emerald-500"
                >
                  {BODY_FONT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Đảm bảo độ sắc nét khi hiển thị văn bản chẩn đoán y khoa và phác đồ điều trị tiếng Việt.
                </p>
              </div>

              {/* Base Size */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Cỡ Chữ Cơ Bản (Base Font Size): {themeState.fontSizeBase}px
                </label>
                <input
                  type="range"
                  min={14}
                  max={18}
                  step={1}
                  value={themeState.fontSizeBase}
                  onChange={(e) => {
                    setThemeState({ ...themeState, fontSizeBase: Number(e.target.value) });
                    markChanged();
                  }}
                  className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                  <span>14px (Nhỏ gọn)</span>
                  <span>16px (Tiêu chuẩn)</span>
                  <span>18px (Dễ đọc cho người lớn tuổi)</span>
                </div>
              </div>

              {/* Line Height */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Khoảng Cách Dòng (Line Height): {themeState.lineHeightBase}
                </label>
                <input
                  type="range"
                  min={1.4}
                  max={1.8}
                  step={0.05}
                  value={themeState.lineHeightBase}
                  onChange={(e) => {
                    setThemeState({ ...themeState, lineHeightBase: Number(e.target.value) });
                    markChanged();
                  }}
                  className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                  <span>1.4 (Chặt chẽ)</span>
                  <span>1.6 (Khuyến nghị chuẩn)</span>
                  <span>1.8 (Rộng rãi thoáng)</span>
                </div>
              </div>
            </div>

            {/* Interactive Live Typography Preview */}
            <div className="pt-4 border-t border-neutral-100 space-y-3">
              <span className="text-xs font-bold text-neutral-900 block font-heading">
                Xem Trước Thực Tế (Live Typography Preview)
              </span>

              <div
                className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4"
                style={{
                  fontFamily: themeState.fontBody,
                  fontSize: `${themeState.fontSizeBase}px`,
                  lineHeight: themeState.lineHeightBase
                }}
              >
                <div>
                  <h1
                    className="font-bold text-neutral-900 mb-1"
                    style={{ fontFamily: themeState.fontHeading, fontSize: "2rem" }}
                  >
                    Tiêu Đề H1: Y Học Cá Nhân Hóa Chuẩn Da Liễu
                  </h1>
                  <h2
                    className="font-bold text-emerald-800 mb-2"
                    style={{ fontFamily: themeState.fontHeading, fontSize: "1.35rem" }}
                  >
                    Tiêu Đề H2: Phác đồ điều trị mụn & trẻ hóa công nghệ cao
                  </h2>
                  <p className="text-neutral-600 leading-relaxed max-w-3xl">
                    Tại Lạc's Beauty Center, mỗi bệnh nhân đều được bác sĩ chuyên khoa da liễu sau đại học trực tiếp soi da đa tầng VISIA 3D, phân tích 8 chỉ số tổn thương và thiết lập phác đồ trị liệu cá nhân hóa khép kín.
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    className="px-5 py-2.5 rounded-full text-xs font-semibold text-white shadow-sm"
                    style={{ backgroundColor: themeState.primaryColor }}
                  >
                    Nút Khám Phá Phác Đồ
                  </button>
                  <button
                    type="button"
                    className="px-5 py-2.5 rounded-full text-xs font-semibold border"
                    style={{
                      borderColor: themeState.primaryColor,
                      color: themeState.primaryColor,
                      backgroundColor: themeState.primaryLightColor
                    }}
                  >
                    Hồ Sơ Bác Sĩ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SUBTAB 3: MÀU SẮC & CONTRAST CHECKER
          ======================================================== */}
      {activeSubTab === "colors" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Preset Palettes */}
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-bold text-neutral-900 text-sm font-heading flex items-center gap-2">
                <Palette className="w-4 h-4 text-emerald-700" />
                <span>Bảng Màu Đề Xuất Chuẩn Phòng Khám</span>
              </h3>
              <span className="text-[11px] text-neutral-400">Chọn 1 click để áp dụng</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => {
                    setThemeState({
                      ...themeState,
                      primaryColor: preset.primary,
                      primaryHoverColor: preset.hover,
                      primaryLightColor: preset.light,
                      secondaryColor: preset.secondary
                    });
                    markChanged();
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all hover:scale-[1.02] ${
                    themeState.primaryColor.toUpperCase() === preset.primary.toUpperCase()
                      ? "border-emerald-700 bg-emerald-50/40 ring-2 ring-emerald-600/30 shadow-xs"
                      : "border-neutral-200 bg-white hover:border-neutral-300"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="w-5 h-5 rounded-full shadow-xs" style={{ backgroundColor: preset.primary }}></span>
                    <span className="w-4 h-4 rounded-full shadow-xs" style={{ backgroundColor: preset.hover }}></span>
                    <span className="w-4 h-4 rounded-full shadow-xs border" style={{ backgroundColor: preset.light }}></span>
                    <span className="w-3.5 h-3.5 rounded-full shadow-xs ml-auto" style={{ backgroundColor: preset.secondary }}></span>
                  </div>
                  <span className="text-xs font-bold text-neutral-900 block truncate">{preset.name}</span>
                  <span className="text-[10px] text-neutral-500 font-mono">{preset.primary}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Details & Contrast Checkers */}
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-6">
            <h3 className="font-bold text-neutral-900 text-sm font-heading pb-3 border-b border-neutral-100">
              Tùy Chỉnh Chi Tiết Từng Mã Màu & Tiêu Chuẩn Tiếp Cận (WCAG)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Primary Color */}
              <div className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/50 space-y-3">
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                  Màu Thương Hiệu Chính (Primary)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={themeState.primaryColor}
                    onChange={(e) => {
                      setThemeState({ ...themeState, primaryColor: e.target.value });
                      markChanged();
                    }}
                    className="w-10 h-10 rounded-xl cursor-pointer border border-neutral-300 p-0.5 bg-white"
                  />
                  <input
                    type="text"
                    value={themeState.primaryColor}
                    onChange={(e) => {
                      setThemeState({ ...themeState, primaryColor: e.target.value });
                      markChanged();
                    }}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono uppercase"
                  />
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-neutral-500">Chữ trắng trên màu này:</span>
                  <span className={`px-2 py-0.5 rounded font-bold ${
                    whiteOnPrimaryContrast >= 4.5 ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                  }`}>
                    {whiteOnPrimaryContrast}:1 ({whiteOnPrimaryContrast >= 7 ? "AAA" : whiteOnPrimaryContrast >= 4.5 ? "AA" : "Cảnh báo"})
                  </span>
                </div>
              </div>

              {/* Hover Color */}
              <div className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/50 space-y-3">
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                  Màu Khi Di Chuột (Hover)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={themeState.primaryHoverColor}
                    onChange={(e) => {
                      setThemeState({ ...themeState, primaryHoverColor: e.target.value });
                      markChanged();
                    }}
                    className="w-10 h-10 rounded-xl cursor-pointer border border-neutral-300 p-0.5 bg-white"
                  />
                  <input
                    type="text"
                    value={themeState.primaryHoverColor}
                    onChange={(e) => {
                      setThemeState({ ...themeState, primaryHoverColor: e.target.value });
                      markChanged();
                    }}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono uppercase"
                  />
                </div>
                <p className="text-[10px] text-neutral-500">
                  Hiệu ứng hover trên các nút bấm chính và thẻ dịch vụ.
                </p>
              </div>

              {/* Light Accent Color */}
              <div className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/50 space-y-3">
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                  Màu Nền Nhạt Điểm Nhấn (Light Accent)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={themeState.primaryLightColor}
                    onChange={(e) => {
                      setThemeState({ ...themeState, primaryLightColor: e.target.value });
                      markChanged();
                    }}
                    className="w-10 h-10 rounded-xl cursor-pointer border border-neutral-300 p-0.5 bg-white"
                  />
                  <input
                    type="text"
                    value={themeState.primaryLightColor}
                    onChange={(e) => {
                      setThemeState({ ...themeState, primaryLightColor: e.target.value });
                      markChanged();
                    }}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono uppercase"
                  />
                </div>
                <p className="text-[10px] text-neutral-500">
                  Nền của các badge nhãn, thẻ giá trị và khối nổi bật.
                </p>
              </div>

              {/* Secondary / Gold Color */}
              <div className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/50 space-y-3">
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                  Màu Phụ / Điểm Nhấn (Secondary)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={themeState.secondaryColor}
                    onChange={(e) => {
                      setThemeState({ ...themeState, secondaryColor: e.target.value });
                      markChanged();
                    }}
                    className="w-10 h-10 rounded-xl cursor-pointer border border-neutral-300 p-0.5 bg-white"
                  />
                  <input
                    type="text"
                    value={themeState.secondaryColor}
                    onChange={(e) => {
                      setThemeState({ ...themeState, secondaryColor: e.target.value });
                      markChanged();
                    }}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono uppercase"
                  />
                </div>
                <p className="text-[10px] text-neutral-500">
                  Dành cho các chứng nhận quốc tế, xếp hạng sao và đối tác.
                </p>
              </div>

              {/* Main Text Color */}
              <div className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/50 space-y-3">
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                  Màu Chữ Chính (Main Text)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={themeState.textColorMain}
                    onChange={(e) => {
                      setThemeState({ ...themeState, textColorMain: e.target.value });
                      markChanged();
                    }}
                    className="w-10 h-10 rounded-xl cursor-pointer border border-neutral-300 p-0.5 bg-white"
                  />
                  <input
                    type="text"
                    value={themeState.textColorMain}
                    onChange={(e) => {
                      setThemeState({ ...themeState, textColorMain: e.target.value });
                      markChanged();
                    }}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono uppercase"
                  />
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-neutral-500">Tương phản trên nền trắng:</span>
                  <span className={`px-2 py-0.5 rounded font-bold ${
                    textContrastOnBg >= 7 ? "bg-emerald-100 text-emerald-800" : textContrastOnBg >= 4.5 ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                  }`}>
                    {textContrastOnBg}:1 ({textContrastOnBg >= 7 ? "Chuẩn AAA" : textContrastOnBg >= 4.5 ? "Chuẩn AA" : "Kém"})
                  </span>
                </div>
              </div>

              {/* Muted Text Color */}
              <div className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/50 space-y-3">
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                  Màu Chữ Phụ (Muted Text)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={themeState.textColorMuted}
                    onChange={(e) => {
                      setThemeState({ ...themeState, textColorMuted: e.target.value });
                      markChanged();
                    }}
                    className="w-10 h-10 rounded-xl cursor-pointer border border-neutral-300 p-0.5 bg-white"
                  />
                  <input
                    type="text"
                    value={themeState.textColorMuted}
                    onChange={(e) => {
                      setThemeState({ ...themeState, textColorMuted: e.target.value });
                      markChanged();
                    }}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono uppercase"
                  />
                </div>
                <p className="text-[10px] text-neutral-500">
                  Dành cho ngày tháng, tác giả, mô tả ngắn phụ.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SUBTAB 4: KÍCH THƯỚC & BO GÓC (SPACING)
          ======================================================== */}
      {activeSubTab === "spacing" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-6">
            <h3 className="font-bold text-neutral-900 text-sm font-heading pb-3 border-b border-neutral-100 flex items-center gap-2">
              <Box className="w-4 h-4 text-emerald-700" />
              <span>Kích Thước Container & Độ Bo Góc (Border Radius)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Container Max Width */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                  Độ Rộng Khung Nội Dung Tối Đa (Container Max Width)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["1200px", "1280px", "1380px", "1440px"].map((width) => (
                    <button
                      key={width}
                      type="button"
                      onClick={() => {
                        setThemeState({ ...themeState, containerMaxWidth: width });
                        markChanged();
                      }}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                        themeState.containerMaxWidth === width
                          ? "bg-emerald-700 text-white border-emerald-700 shadow-xs"
                          : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50"
                      }`}
                    >
                      {width} {width === "1380px" && "(Chuẩn)"}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-neutral-500 mt-2">
                  Quy định độ rộng hiển thị toàn trang trên màn hình máy tính lớn.
                </p>
              </div>

              {/* Card Radius */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                  Độ Bo Góc Thẻ (Card Border Radius)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { val: "12px", label: "Bo nhẹ (12px)" },
                    { val: "16px", label: "Vừa phải (16px)" },
                    { val: "24px", label: "Chuẩn Y khoa (24px)" },
                    { val: "32px", label: "Bo tròn mềm (32px)" }
                  ].map((item) => (
                    <button
                      key={item.val}
                      type="button"
                      onClick={() => {
                        setThemeState({ ...themeState, cardBorderRadius: item.val });
                        markChanged();
                      }}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                        themeState.cardBorderRadius === item.val
                          ? "bg-emerald-700 text-white border-emerald-700 shadow-xs"
                          : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Button Radius */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                  Độ Bo Góc Nút Bấm (Button Radius)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: "6px", label: "Vuông nhẹ (6px)" },
                    { val: "12px", label: "Bo góc (12px)" },
                    { val: "9999px", label: "Full Pill (Tròn)" }
                  ].map((item) => (
                    <button
                      key={item.val}
                      type="button"
                      onClick={() => {
                        setThemeState({ ...themeState, buttonBorderRadius: item.val });
                        markChanged();
                      }}
                      className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition ${
                        themeState.buttonBorderRadius === item.val
                          ? "bg-emerald-700 text-white border-emerald-700 shadow-xs"
                          : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Section Padding */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                  Khoảng Cách Section (Desktop Padding): {themeState.sectionPaddingDesktop}px
                </label>
                <input
                  type="range"
                  min={48}
                  max={100}
                  step={8}
                  value={themeState.sectionPaddingDesktop}
                  onChange={(e) => {
                    setThemeState({ ...themeState, sectionPaddingDesktop: Number(e.target.value) });
                    markChanged();
                  }}
                  className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                  <span>48px (Gọn)</span>
                  <span>80px (Tiêu chuẩn thoáng)</span>
                  <span>100px (Rộng)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SUBTAB 5: HƯỚNG DẪN TỶ LỆ ẢNH & BANNER
          ======================================================== */}
      {activeSubTab === "banners" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-bold text-neutral-900 text-sm font-heading flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-700" />
                <span>Quy Chuẩn Kích Thước & Tỷ Lệ Ảnh Toàn Website</span>
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                Chỉ dành cho Quản trị viên
              </span>
            </div>

            <p className="text-xs text-neutral-500 leading-relaxed">
              Các thông số kỹ thuật bên dưới giúp Quản trị viên chuẩn bị ảnh đẹp và chuyên nghiệp nhất. Những thông tin này được bảo mật nội bộ trong CMS, tuyệt đối không rò rỉ lên giao diện khách hàng.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {[
                {
                  title: "Hero Banner Trang Chủ",
                  desktop: "1920 × 800 px",
                  mobile: "800 × 800 px (Vuông)",
                  ratio: "16:9 hoặc 2.4:1",
                  note: "Ảnh chụp không gian sảnh hoặc máy móc công nghệ cao, chữ an toàn ở giữa/trái."
                },
                {
                  title: "2 Banner Phụ Trang Chủ",
                  desktop: "600 × 300 px",
                  mobile: "400 × 200 px",
                  ratio: "2:1",
                  note: "Ảnh dịch vụ chuyên sâu hoặc chương trình soi da VISIA 3D."
                },
                {
                  title: "Slider Công Nghệ Lâm Sàng",
                  desktop: "800 × 500 px",
                  mobile: "800 × 500 px",
                  ratio: "16:10",
                  note: "Ảnh chụp thao tác bác sĩ/chuyên viên trên máy trong phòng điều trị thật."
                },
                {
                  title: "Banner Đầu Trang Các Trang Con",
                  desktop: "1920 × 600 px",
                  mobile: "750 × 500 px",
                  ratio: "16:5",
                  note: "Ảnh nền nhẹ nhàng có lớp phủ tối để làm nổi bật tiêu đề và breadcrumb."
                },
                {
                  title: "Chân Dung Bác Sĩ",
                  desktop: "600 × 800 px",
                  mobile: "450 × 600 px",
                  ratio: "3:4",
                  note: "Ảnh chân dung bác sĩ mặc áo blouse trắng, chụp thẳng, mắt nhìn ống kính."
                },
                {
                  title: "Ảnh Sản Phẩm & Mỹ Phẩm",
                  desktop: "800 × 800 px",
                  mobile: "600 × 600 px",
                  ratio: "1:1 (Vuông)",
                  note: "Ảnh chai/lọ sản phẩm trên nền trắng sạch sẽ hoặc phông sáng."
                }
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/60 space-y-2">
                  <span className="font-bold text-xs text-neutral-900 block font-heading">
                    {item.title}
                  </span>
                  <div className="space-y-1 text-[11px]">
                    <div className="flex justify-between text-neutral-600">
                      <span>Desktop:</span>
                      <strong className="font-mono text-emerald-800">{item.desktop}</strong>
                    </div>
                    <div className="flex justify-between text-neutral-600">
                      <span>Mobile:</span>
                      <strong className="font-mono text-neutral-800">{item.mobile}</strong>
                    </div>
                    <div className="flex justify-between text-neutral-600">
                      <span>Tỷ lệ chuẩn:</span>
                      <strong className="text-neutral-800">{item.ratio}</strong>
                    </div>
                  </div>
                  <p className="text-[10px] text-neutral-400 pt-1.5 border-t border-neutral-200/60 leading-relaxed">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Central Media Library Modal Picker */}
      <MediaLibraryModal
        isOpen={!!mediaPickerTarget}
        onClose={() => setMediaPickerTarget(null)}
        onSelectMedia={(media) => {
          if (mediaPickerTarget === "logoHeader") {
            setFormData(prev => ({ ...prev, logoHeader: media.url, logoUrl: media.url }));
          } else if (mediaPickerTarget === "logoFooter") {
            setFormData(prev => ({ ...prev, logoFooterUrl: media.url, logoFooter: media.url }));
          } else if (mediaPickerTarget === "logoWhite") {
            setFormData(prev => ({ ...prev, logoWhiteUrl: media.url }));
          } else if (mediaPickerTarget === "favicon") {
            setFormData(prev => ({ ...prev, faviconUrl: media.url, favicon: media.url }));
          }
          setMediaPickerTarget(null);
          markChanged();
          showToast(`Đã chọn ảnh từ Thư viện Media! Bấm "Lưu Thay Đổi" để cập nhật.`);
        }}
        title="Chọn ảnh từ Thư viện Media LBC"
      />
    </div>
  );
};
