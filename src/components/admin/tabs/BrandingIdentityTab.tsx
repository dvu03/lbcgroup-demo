import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Save,
  CheckCircle2,
  Image as ImageIcon,
  Palette,
  Phone,
  Mail,
  Clock,
  MapPin,
  Share2,
  Globe,
  ExternalLink,
  Upload,
  Trash2,
  AlertCircle,
  Search,
  Sliders,
  Type,
  Share,
  ArrowUp
} from "lucide-react";
import { useDemoData } from "../../../context/DemoDataContext";
import { SiteConfig, BackToTopConfig } from "../../../data/siteConfig";
import { MediaLibraryModal } from "../MediaLibraryModal";
import { fileToMediaItem, saveMediaItemToDB } from "../../../utils/mediaStorage";
import { DynamicIcon } from "../../common/DynamicIcon";
import { IconPickerModal } from "../IconPickerModal";

export type BrandingSubTab = "branding" | "contact" | "seo" | "ui" | "popup";

interface BrandingIdentityTabProps {
  initialSubTab?: BrandingSubTab;
}

export const BrandingIdentityTab: React.FC<BrandingIdentityTabProps> = ({
  initialSubTab = "branding"
}) => {
  const { siteConfig, updateSiteConfig } = useDemoData();
  const [activeSubTab, setActiveSubTab] = useState<BrandingSubTab>(initialSubTab);
  const [formData, setFormData] = useState<SiteConfig>({ ...siteConfig });
  const [mediaPickerTarget, setMediaPickerTarget] = useState<"logoHeader" | "logoFooter" | "favicon" | "ogImage" | "popupImage" | null>(null);
  const [showBackToTopIconPicker, setShowBackToTopIconPicker] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewErrors, setPreviewErrors] = useState<{
    logoHeader?: boolean;
    logoFooter?: boolean;
    favicon?: boolean;
    ogImage?: boolean;
  }>({});

  const headerFileInputRef = useRef<HTMLInputElement>(null);
  const footerFileInputRef = useRef<HTMLInputElement>(null);
  const faviconFileInputRef = useRef<HTMLInputElement>(null);
  const ogFileInputRef = useRef<HTMLInputElement>(null);

  // Sync prop change
  useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  // Keep formData in sync if siteConfig changes from external sources
  useEffect(() => {
    setFormData({ ...siteConfig });
  }, [siteConfig]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleFileUpload = async (
    target: "logoHeader" | "logoFooter" | "favicon" | "ogImage",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    e.target.value = "";

    const validMimes = [
      'image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif',
      'image/x-icon', 'image/vnd.microsoft.icon'
    ];
    const isSvgOrIco = file.name.toLowerCase().endsWith('.svg') || file.name.toLowerCase().endsWith('.ico');
    if (!validMimes.includes(file.type) && !isSvgOrIco) {
      setUploadError(`Định dạng tệp "${file.name}" không hợp lệ. Vui lòng chọn tệp ảnh PNG, JPG, WebP hoặc SVG.`);
      return;
    }

    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setUploadError(`Tệp ảnh quá lớn (${(file.size / (1024 * 1024)).toFixed(1)}MB). Giới hạn tối đa là 5MB.`);
      return;
    }

    try {
      const mediaItem = await fileToMediaItem(file);
      await saveMediaItemToDB(mediaItem);

      if (target === "logoHeader") {
        setFormData(prev => ({ ...prev, logoUrl: mediaItem.url, logoHeader: mediaItem.url }));
        setPreviewErrors(prev => ({ ...prev, logoHeader: false }));
        showToast("Đã tải lên Logo Header thành công! Bấm 'Lưu Cấu Hình' để hoàn tất.");
      } else if (target === "logoFooter") {
        setFormData(prev => ({ ...prev, logoFooterUrl: mediaItem.url, logoFooter: mediaItem.url }));
        setPreviewErrors(prev => ({ ...prev, logoFooter: false }));
        showToast("Đã tải lên Logo Footer thành công! Bấm 'Lưu Cấu Hình' để hoàn tất.");
      } else if (target === "favicon") {
        setFormData(prev => ({ ...prev, faviconUrl: mediaItem.url, favicon: mediaItem.url }));
        setPreviewErrors(prev => ({ ...prev, favicon: false }));
        showToast("Đã tải lên Favicon thành công! Bấm 'Lưu Cấu Hình' để hoàn tất.");
      } else if (target === "ogImage") {
        setFormData(prev => ({
          ...prev,
          seoDefault: { ...prev.seoDefault, keywords: prev.seoDefault?.keywords || "" },
          popupBanner: { ...prev.popupBanner, imageUrl: mediaItem.url }
        }));
        setPreviewErrors(prev => ({ ...prev, ogImage: false }));
        showToast("Đã tải lên ảnh đại diện SEO (Open Graph)! Bấm 'Lưu Cấu Hình' để hoàn tất.");
      }
    } catch (err: any) {
      setUploadError(err.message || "Không thể xử lý tệp ảnh. Vui lòng thử lại.");
    }
  };

  const handleClearLogo = (target: "logoHeader" | "logoFooter" | "favicon") => {
    if (target === "logoHeader") {
      setFormData(prev => ({ ...prev, logoUrl: "", logoHeader: "" }));
      setPreviewErrors(prev => ({ ...prev, logoHeader: false }));
      showToast("Đã chuyển Logo Header về dạng chữ mặc định. Bấm 'Lưu Cấu Hình' để áp dụng.");
    } else if (target === "logoFooter") {
      setFormData(prev => ({ ...prev, logoFooterUrl: "", logoFooter: "" }));
      setPreviewErrors(prev => ({ ...prev, logoFooter: false }));
      showToast("Đã chuyển Logo Footer về mặc định. Bấm 'Lưu Cấu Hình' để áp dụng.");
    } else if (target === "favicon") {
      setFormData(prev => ({ ...prev, faviconUrl: "", favicon: "" }));
      setPreviewErrors(prev => ({ ...prev, favicon: false }));
      showToast("Đã chuyển Favicon về mặc định. Bấm 'Lưu Cấu Hình' để áp dụng.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setUploadError(null);
    try {
      const finalConfig: SiteConfig = {
        ...formData,
        logoUrl: formData.logoHeader || formData.logoUrl || "",
        logoHeader: formData.logoHeader || formData.logoUrl || "",
        logoFooterUrl: formData.logoFooter || formData.logoFooterUrl || "",
        logoFooter: formData.logoFooter || formData.logoFooterUrl || "",
        faviconUrl: formData.favicon || formData.faviconUrl || "",
        favicon: formData.favicon || formData.faviconUrl || "",
      };
      const res = await updateSiteConfig(finalConfig);
      setIsSaving(false);
      if (res.success) {
        showToast("Đã lưu thành công cấu hình! Toàn bộ website client và Neon DB đã được đồng bộ tức thì.");
      } else {
        setUploadError("Không thể lưu cấu hình: " + (res.error || "Lỗi lưu DB"));
        alert("Lỗi khi lưu cấu hình lên server: " + (res.error || "Không thể kết nối đến cơ sở dữ liệu"));
      }
    } catch (err: any) {
      setIsSaving(false);
      setUploadError("Không thể lưu cấu hình: " + (err.message || String(err)));
      alert("Lỗi khi lưu cấu hình: " + (err.message || String(err)));
    }
  };

  const currentHeaderLogo = formData.logoHeader || formData.logoUrl;
  const currentFooterLogo = formData.logoFooter || formData.logoFooterUrl;
  const currentFavicon = formData.favicon || formData.faviconUrl;

  return (
    <div className="space-y-6">
      {/* Hidden file inputs for direct upload */}
      <input
        type="file"
        ref={headerFileInputRef}
        onChange={(e) => handleFileUpload("logoHeader", e)}
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        className="hidden"
      />
      <input
        type="file"
        ref={footerFileInputRef}
        onChange={(e) => handleFileUpload("logoFooter", e)}
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        className="hidden"
      />
      <input
        type="file"
        ref={faviconFileInputRef}
        onChange={(e) => handleFileUpload("favicon", e)}
        accept="image/png,image/x-icon,image/vnd.microsoft.icon,image/svg+xml"
        className="hidden"
      />
      <input
        type="file"
        ref={ogFileInputRef}
        onChange={(e) => handleFileUpload("ogImage", e)}
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
      />

      {/* Header Info Banner */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
            <span>Cấu hình tổng thể</span>
            <span>•</span>
            <span>Bộ nhận diện & Kênh liên lạc</span>
          </div>
          <h2 className="text-xl font-bold text-neutral-900 font-heading flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-700" />
            <span>Bộ Nhận Diện, Kênh Liên Lạc & Cấu Hình SEO</span>
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl leading-relaxed">
            Nguồn dữ liệu duy nhất quản lý tên thương hiệu, logo đa vị trí, hotline, kênh mạng xã hội, thẻ meta SEO và chuẩn typography toàn website.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Xem Website Live</span>
          </Link>
        </div>
      </div>

      {/* SubTab Navigation */}
      <div className="bg-white rounded-2xl p-1.5 shadow-xs border border-neutral-200 flex flex-wrap gap-1">
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
          <span>1. Logo & Nhận Diện</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("contact")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === "contact"
              ? "bg-emerald-700 text-white shadow-xs"
              : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>2. Hotline & Kênh Liên Hệ</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("seo")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === "seo"
              ? "bg-emerald-700 text-white shadow-xs"
              : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
          }`}
        >
          <Search className="w-4 h-4" />
          <span>3. Cấu Hình SEO & Meta</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("ui")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === "ui"
              ? "bg-emerald-700 text-white shadow-xs"
              : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>4. Kiểu Chữ & Giao Diện</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("popup")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === "popup"
              ? "bg-emerald-700 text-white shadow-xs"
              : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>5. Popup, Liên Hệ Nổi & Back to Top</span>
        </button>
      </div>

      {toastMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs flex items-center gap-2 animate-fadeIn font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {uploadError && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs flex items-center gap-2 animate-fadeIn font-medium">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* ========================================================
            SUBTAB 1: LOGO & NHẬN DIỆN THƯƠNG HIỆU
            ======================================================== */}
        {activeSubTab === "branding" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Logo & Visual Assets */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-emerald-700" />
                  <h3 className="font-bold text-neutral-900 text-sm font-heading">
                    Logo & Biểu trưng Đa Vị Trí
                  </h3>
                </div>
                <span className="text-[11px] text-neutral-500">
                  Tự động đồng bộ với Header, Footer và Favicon tab trình duyệt
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Header Logo */}
                <div className="space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                        Logo Header (Navbar)
                      </label>
                      {currentHeaderLogo ? (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-semibold">
                          Tùy chỉnh
                        </span>
                      ) : (
                        <span className="text-[10px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md font-medium">
                          Mặc định LBC
                        </span>
                      )}
                    </div>

                    {/* Preview Box */}
                    <div className="h-32 rounded-2xl bg-slate-900 p-3 flex flex-col items-center justify-center border border-slate-800 relative group overflow-hidden">
                      {currentHeaderLogo && !previewErrors.logoHeader ? (
                        <div className="w-full h-full flex items-center justify-center p-2">
                          <img
                            src={currentHeaderLogo}
                            alt="Logo Header Preview"
                            onError={() => setPreviewErrors(prev => ({ ...prev, logoHeader: true }))}
                            className="max-h-20 max-w-full object-contain"
                          />
                        </div>
                      ) : previewErrors.logoHeader ? (
                        <div className="text-center text-rose-300 p-2">
                          <AlertCircle className="w-5 h-5 mx-auto mb-1 text-rose-400" />
                          <span className="text-[11px] block">Không tải được ảnh logo</span>
                        </div>
                      ) : (
                        <div className="text-center text-white">
                          <div className="w-9 h-9 mx-auto mb-1 rounded-xl bg-primary-600 text-white font-heading font-black text-base flex items-center justify-center shadow">
                            {formData.brandName ? formData.brandName.charAt(0) : "L"}
                          </div>
                          <span className="font-heading font-bold text-sm text-emerald-400 block">{formData.brandName || "Lạc's Beauty Center"}</span>
                          <span className="text-[9px] uppercase tracking-widest text-neutral-400">Chữ mặc định</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        type="button"
                        onClick={() => headerFileInputRef.current?.click()}
                        className="flex items-center justify-center gap-1 px-2 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-[11px] font-semibold transition"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Tải ảnh</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setMediaPickerTarget("logoHeader")}
                        className="flex items-center justify-center gap-1 px-2 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl text-[11px] font-semibold transition"
                      >
                        <ImageIcon className="w-3 h-3" />
                        <span>Thư viện</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleClearLogo("logoHeader")}
                        className="flex items-center justify-center gap-1 px-2 py-1.5 bg-neutral-100 hover:bg-rose-50 hover:text-rose-700 text-neutral-500 rounded-xl text-[11px] font-medium transition"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Mặc định</span>
                      </button>
                    </div>

                    <input
                      type="text"
                      value={currentHeaderLogo || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData(prev => ({ ...prev, logoUrl: val, logoHeader: val }));
                        setPreviewErrors(prev => ({ ...prev, logoHeader: false }));
                      }}
                      placeholder="URL logo (https://... hoặc Data URL)"
                      className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded-xl font-mono text-neutral-700 bg-neutral-50/50"
                    />
                  </div>
                </div>

                {/* Footer Logo */}
                <div className="space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                        Logo Chân trang (Footer)
                      </label>
                      {currentFooterLogo ? (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-semibold">
                          Tùy chỉnh
                        </span>
                      ) : (
                        <span className="text-[10px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md font-medium">
                          Mặc định LBC
                        </span>
                      )}
                    </div>

                    <div className="h-32 rounded-2xl bg-neutral-100 p-3 flex flex-col items-center justify-center border border-neutral-200 relative group overflow-hidden">
                      {currentFooterLogo && !previewErrors.logoFooter ? (
                        <div className="w-full h-full flex items-center justify-center p-2">
                          <img
                            src={currentFooterLogo}
                            alt="Logo Footer Preview"
                            onError={() => setPreviewErrors(prev => ({ ...prev, logoFooter: true }))}
                            className="max-h-20 max-w-full object-contain"
                          />
                        </div>
                      ) : previewErrors.logoFooter ? (
                        <div className="text-center text-rose-600 p-2">
                          <AlertCircle className="w-5 h-5 mx-auto mb-1 text-rose-500" />
                          <span className="text-[11px] block">Không tải được ảnh logo</span>
                        </div>
                      ) : (
                        <div className="text-center text-neutral-800">
                          <div className="w-9 h-9 mx-auto mb-1 rounded-xl bg-primary-600 text-white font-heading font-black text-base flex items-center justify-center shadow">
                            {formData.brandName ? formData.brandName.charAt(0) : "L"}
                          </div>
                          <span className="font-heading font-bold text-sm text-emerald-800 block">{formData.brandName || "Lạc's Beauty Center"}</span>
                          <span className="text-[9px] uppercase tracking-widest text-neutral-500">Chữ mặc định</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        type="button"
                        onClick={() => footerFileInputRef.current?.click()}
                        className="flex items-center justify-center gap-1 px-2 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-[11px] font-semibold transition"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Tải ảnh</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setMediaPickerTarget("logoFooter")}
                        className="flex items-center justify-center gap-1 px-2 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl text-[11px] font-semibold transition"
                      >
                        <ImageIcon className="w-3 h-3" />
                        <span>Thư viện</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleClearLogo("logoFooter")}
                        className="flex items-center justify-center gap-1 px-2 py-1.5 bg-neutral-100 hover:bg-rose-50 hover:text-rose-700 text-neutral-500 rounded-xl text-[11px] font-medium transition"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Mặc định</span>
                      </button>
                    </div>

                    <input
                      type="text"
                      value={currentFooterLogo || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData(prev => ({ ...prev, logoFooterUrl: val, logoFooter: val }));
                        setPreviewErrors(prev => ({ ...prev, logoFooter: false }));
                      }}
                      placeholder="URL logo footer"
                      className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded-xl font-mono text-neutral-700 bg-neutral-50/50"
                    />
                  </div>
                </div>

                {/* Favicon */}
                <div className="space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                        Favicon (Tab trình duyệt)
                      </label>
                      {currentFavicon ? (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-semibold">
                          Tùy chỉnh
                        </span>
                      ) : (
                        <span className="text-[10px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md font-medium">
                          Mặc định
                        </span>
                      )}
                    </div>

                    <div className="h-32 rounded-2xl bg-neutral-50 p-3 flex flex-col items-center justify-center border border-neutral-200">
                      {currentFavicon && !previewErrors.favicon ? (
                        <div className="w-14 h-14 rounded-xl bg-white p-2 border border-neutral-200 shadow-xs flex items-center justify-center">
                          <img
                            src={currentFavicon}
                            alt="Favicon Preview"
                            onError={() => setPreviewErrors(prev => ({ ...prev, favicon: true }))}
                            className="w-10 h-10 object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-emerald-800 text-white font-heading font-black text-xl flex items-center justify-center shadow-md">
                          {formData.brandName ? formData.brandName.charAt(0) : "L"}
                        </div>
                      )}
                      <span className="text-[10px] text-neutral-500 mt-2">Tab Preview (16x16 / 32x32)</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        type="button"
                        onClick={() => faviconFileInputRef.current?.click()}
                        className="flex items-center justify-center gap-1 px-2 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-[11px] font-semibold transition"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Tải ảnh</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setMediaPickerTarget("favicon")}
                        className="flex items-center justify-center gap-1 px-2 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl text-[11px] font-semibold transition"
                      >
                        <ImageIcon className="w-3 h-3" />
                        <span>Thư viện</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleClearLogo("favicon")}
                        className="flex items-center justify-center gap-1 px-2 py-1.5 bg-neutral-100 hover:bg-rose-50 hover:text-rose-700 text-neutral-500 rounded-xl text-[11px] font-medium transition"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Mặc định</span>
                      </button>
                    </div>

                    <input
                      type="text"
                      value={currentFavicon || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData(prev => ({ ...prev, faviconUrl: val, favicon: val }));
                        setPreviewErrors(prev => ({ ...prev, favicon: false }));
                      }}
                      placeholder="URL favicon (.ico, .png, .svg)"
                      className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded-xl font-mono text-neutral-700 bg-neutral-50/50"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Brand Information */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <h3 className="font-bold text-neutral-900 text-sm font-heading">
                  Thông Tin Thương Hiệu Chính Thức
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Tên thương hiệu hiển thị
                  </label>
                  <input
                    type="text"
                    value={formData.brandName}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 rounded-xl font-heading font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Khẩu hiệu (Tagline)
                  </label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            SUBTAB 2: HOTLINE & KÊNH LIÊN HỆ
            ======================================================== */}
        {activeSubTab === "contact" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Contact & Hotline */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
                <Phone className="w-4 h-4 text-emerald-700" />
                <h3 className="font-bold text-neutral-900 text-sm font-heading">
                  Hotline & Giờ Thăm Khám (Đồng bộ Header & Footer)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Hotline tổng đài (Hiển thị góc phải Header)
                  </label>
                  <input
                    type="text"
                    value={formData.hotline}
                    onChange={(e) => setFormData({ ...formData, hotline: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-xl font-mono"
                  />
                  <span className="text-[11px] text-neutral-400 mt-1 block">Mặc định: 1900 6750</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Hotline tư vấn da liễu
                  </label>
                  <input
                    type="text"
                    value={formData.hotlineConsultation}
                    onChange={(e) => setFormData({ ...formData, hotlineConsultation: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Email phòng khám
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Giờ làm việc & Thăm khám
                  </label>
                  <input
                    type="text"
                    value={formData.operatingHours}
                    onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-xl"
                  />
                  <span className="text-[11px] text-neutral-400 mt-1 block">Mặc định: 08:00 – 20:00 (Hằng ngày)</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Tên pháp nhân doanh nghiệp
                  </label>
                  <input
                    type="text"
                    value={formData.legalEntity}
                    onChange={(e) => setFormData({ ...formData, legalEntity: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
                <Share2 className="w-4 h-4 text-emerald-700" />
                <h3 className="font-bold text-neutral-900 text-sm font-heading">
                  Liên kết Kênh Mạng Xã Hội & Sàn Thương Mại
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Facebook Fanpage
                  </label>
                  <input
                    type="url"
                    value={formData.socialLinks.facebook}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, facebook: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Zalo Official Account (OA)
                  </label>
                  <input
                    type="url"
                    value={formData.socialLinks.zalo}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, zalo: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    TikTok Channel
                  </label>
                  <input
                    type="url"
                    value={formData.socialLinks.tiktok}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, tiktok: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Kênh YouTube
                  </label>
                  <input
                    type="url"
                    value={formData.socialLinks.youtube}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, youtube: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Gian hàng Shopee Mall
                  </label>
                  <input
                    type="url"
                    value={formData.socialLinks.shopee}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, shopee: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Tên miền website (Domain)
                  </label>
                  <input
                    type="text"
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            SUBTAB 3: CẤU HÌNH SEO TỔNG THỂ
            ======================================================== */}
        {activeSubTab === "seo" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-emerald-700" />
                  <h3 className="font-bold text-neutral-900 text-sm font-heading">
                    Cấu Hình SEO Mặc Định Toàn Website (Global Meta Tags)
                  </h3>
                </div>
                <span className="text-[11px] text-neutral-500">
                  Tự động đưa vào thẻ &lt;title&gt; và &lt;meta name="description"&gt; của từng trang
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                      Tiêu đề SEO mặc định (Meta Title)
                    </label>
                    <span className="text-[11px] text-neutral-400">
                      {(formData.seoDefault?.title || "").length}/70 ký tự khuyên dùng
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formData.seoDefault?.title || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        seoDefault: {
                          ...formData.seoDefault,
                          title: e.target.value
                        }
                      })
                    }
                    placeholder="Phòng khám Chuyên khoa Da liễu Lạc's Beauty Center Cần Thơ"
                    required
                    className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                      Mô tả SEO mặc định (Meta Description)
                    </label>
                    <span className="text-[11px] text-neutral-400">
                      {(formData.seoDefault?.description || "").length}/160 ký tự khuyên dùng
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={formData.seoDefault?.description || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        seoDefault: {
                          ...formData.seoDefault,
                          description: e.target.value
                        }
                      })
                    }
                    placeholder="Mô tả tóm tắt nội dung phòng khám cho kết quả tìm kiếm Google..."
                    required
                    className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-xl leading-relaxed focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Từ khóa tìm kiếm (Meta Keywords)
                  </label>
                  <input
                    type="text"
                    value={formData.seoDefault?.keywords || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        seoDefault: {
                          ...formData.seoDefault,
                          keywords: e.target.value
                        }
                      })
                    }
                    placeholder="da liễu Cần Thơ, trị mụn, trị nám, soi da VISIA 3D, bác sĩ Lạc Kim Ngân"
                    className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-xl"
                  />
                </div>

                {/* Google Search Result Snippet Preview */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Xem trước kết quả tìm kiếm Google (SERP Preview)
                  </span>
                  <div className="text-[#1a0dab] hover:underline cursor-pointer text-sm font-semibold truncate">
                    {formData.seoDefault?.title || "Phòng khám Chuyên khoa Da liễu Lạc's Beauty Center"}
                  </div>
                  <div className="text-[#006621] text-xs font-mono truncate">
                    {formData.domain || "https://lbcgroup.vn"}
                  </div>
                  <div className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                    {formData.seoDefault?.description || "Tiên phong ứng dụng máy soi da VISIA 3D và các giải pháp điều trị da liễu chuẩn y khoa tại Cần Thơ."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            SUBTAB 4: KIỂU CHỮ & GIAO DIỆN CHUNG
            ======================================================== */}
        {activeSubTab === "ui" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Search Suggestions & Header Greetings */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <h3 className="font-bold text-neutral-900 text-sm font-heading">
                  Gợi Ý Tìm Kiếm & Lời Chào Header
                </h3>
              </div>

              {/* 3 Greeting Messages */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                  3 Thông điệp Lời chào Luân phiên (Micro-row Header)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[0, 1, 2].map((idx) => (
                    <div key={idx}>
                      <label className="block text-[11px] text-neutral-500 mb-1">
                        Thông điệp {idx + 1}
                      </label>
                      <input
                        type="text"
                        value={formData.headerWelcomeMessages?.[idx] || ""}
                        onChange={(e) => {
                          const updated = [...(formData.headerWelcomeMessages || ["LBC xin chào.", "Hướng đến Y học Cá nhân hóa.", "Tiên phong trong ứng dụng công nghệ cao."])];
                          updated[idx] = e.target.value;
                          setFormData({ ...formData, headerWelcomeMessages: updated });
                        }}
                        placeholder={`Lời chào ${idx + 1}`}
                        className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Search Suggestions */}
              <div className="pt-3 border-t border-neutral-100">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                    Gợi ý Tìm kiếm Dưới Thanh Search (Cách nhau bởi dấu phẩy)
                  </label>
                  <span className="text-[11px] text-neutral-400">
                    Mặc định brief: Trị mụn, Trị nám, Nâng cơ, Triệt lông, Bioderma
                  </span>
                </div>
                <input
                  type="text"
                  value={(formData.searchSuggestions || ["Trị mụn", "Trị nám", "Nâng cơ", "Triệt lông", "Bioderma"]).join(", ")}
                  onChange={(e) => {
                    const tags = e.target.value.split(",").map(t => t.trim()).filter(Boolean);
                    setFormData({ ...formData, searchSuggestions: tags });
                  }}
                  placeholder="Trị mụn, Trị nám, Nâng cơ, Triệt lông, Bioderma"
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-medium"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {(formData.searchSuggestions || ["Trị mụn", "Trị nám", "Nâng cơ", "Triệt lông", "Bioderma"]).map((tag, i) => (
                    <span key={i} className="px-2.5 py-0.5 rounded-full text-[11px] bg-emerald-50 text-emerald-800 font-medium border border-emerald-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Typography Standards */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
                <Type className="w-4 h-4 text-emerald-700" />
                <h3 className="font-bold text-neutral-900 text-sm font-heading">
                  Tiêu Chuẩn Kiểu Chữ & Bảng Màu Nhận Diện
                </h3>
              </div>

              <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-emerald-950 block mb-0.5">Hệ thống Font chữ chuẩn theo Brand Identity LBC:</span>
                  <span className="text-emerald-800">
                    &bull; Font Tiêu đề (Heading): <strong className="font-heading">Fraunces (Serif chuẩn y khoa & thẩm mỹ)</strong>
                    {" | "}
                    &bull; Font Nội dung (Body): <strong className="font-sans">Be Vietnam Pro (Rõ nét tiếng Việt)</strong>
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-700 text-white shrink-0">
                  Đã tối ưu CSS Token
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            SUBTAB 5: POPUP BANNER & LIÊN HỆ NỔI & VỀ CHÚNG TÔI
            ======================================================== */}
        {activeSubTab === "popup" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Popup Banner (Mục 17) */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <h3 className="font-bold text-neutral-900 text-sm font-heading">
                    Mục 17. Popup Banner Tùy Chọn (Sự Kiện Khai Trương Cơ Sở 02)
                  </h3>
                </div>
                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                  <span className={formData.popupBanner?.enabled ? "text-emerald-700" : "text-neutral-500"}>
                    {formData.popupBanner?.enabled ? "Đang BẬT" : "Đang TẮT (Mặc định)"}
                  </span>
                  <input
                    type="checkbox"
                    checked={formData.popupBanner?.enabled || false}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        popupBanner: {
                          ...(formData.popupBanner || {
                            title: "Mừng Khai Trương Cơ Sở 02 Lạc's Beauty Center",
                            description: "Trải nghiệm soi da VISIA 3D đa tầng miễn phí...",
                            imageUrl: "",
                            link: "/he-thong-co-so"
                          }),
                          enabled: e.target.checked
                        }
                      })
                    }
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                </label>
              </div>

              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-[11px] text-amber-900 leading-relaxed">
                <strong>Quy tắc theo Brief:</strong> Mặc định tắt. Chỉ phục vụ sự kiện thương hiệu (ví dụ Khai trương CS02). Kích thước tham chiếu 600×600 px. Cơ chế lưu storage hiển thị tối đa 1 lần/ngày cho mỗi trình duyệt, có nút đóng và không tự tạo popup mã giảm giá sai lệch.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Tiêu đề Popup Sự Kiện
                    </label>
                    <input
                      type="text"
                      value={formData.popupBanner?.title || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          popupBanner: {
                            ...(formData.popupBanner || { enabled: false, description: "", imageUrl: "", link: "" }),
                            title: e.target.value
                          }
                        })
                      }
                      placeholder="Mừng Khai Trương Cơ Sở 02 Lạc's Beauty Center"
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Mô tả chi tiết sự kiện
                    </label>
                    <textarea
                      rows={3}
                      value={formData.popupBanner?.description || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          popupBanner: {
                            ...(formData.popupBanner || { enabled: false, title: "", imageUrl: "", link: "" }),
                            description: e.target.value
                          }
                        })
                      }
                      placeholder="Trải nghiệm soi da VISIA 3D đa tầng miễn phí và nhận phác đồ điều trị cá nhân hóa..."
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      URL Đích khi người dùng bấm nút
                    </label>
                    <input
                      type="text"
                      value={formData.popupBanner?.link || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          popupBanner: {
                            ...(formData.popupBanner || { enabled: false, title: "", description: "", imageUrl: "" }),
                            link: e.target.value
                          }
                        })
                      }
                      placeholder="/he-thong-co-so hoặc /dat-lich-kham"
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Ảnh Banner Sự Kiện (Tỷ lệ 1:1 hoặc 600×600)
                  </label>
                  <div className="h-44 rounded-2xl bg-neutral-50 border border-neutral-200 overflow-hidden flex items-center justify-center relative">
                    {formData.popupBanner?.imageUrl ? (
                      <img
                        src={formData.popupBanner.imageUrl}
                        alt="Popup Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-neutral-400">Chưa có ảnh (sẽ hiển thị khung nội dung)</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.popupBanner?.imageUrl || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          popupBanner: {
                            ...(formData.popupBanner || { enabled: false, title: "", description: "", link: "" }),
                            imageUrl: e.target.value
                          }
                        })
                      }
                      placeholder="URL ảnh hoặc chọn từ Thư viện..."
                      className="flex-1 px-3 py-2 text-xs border border-neutral-300 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setMediaPickerTarget("popupImage")}
                      className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-xl transition"
                    >
                      Thư viện
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Nút Liên Hệ Nổi (Mục 16) */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-700" />
                  <h3 className="font-bold text-neutral-900 text-sm font-heading">
                    Mục 16. Nút Liên Hệ Nổi (Floating Contact Hub)
                  </h3>
                </div>
                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                  Màu chủ đạo #0E7C86
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200">
                  <span className="font-bold text-neutral-700 block mb-1">1. Hotline tư vấn</span>
                  <input
                    type="text"
                    value={formData.hotline}
                    onChange={(e) => setFormData({ ...formData, hotline: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded-xl"
                  />
                  <span className="text-[10px] text-neutral-400 mt-1 block">Tự động gắn tel:</span>
                </div>

                <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200">
                  <span className="font-bold text-neutral-700 block mb-1">2. Zalo Official Account</span>
                  <input
                    type="text"
                    value={formData.socialLinks.zalo}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, zalo: e.target.value }
                      })
                    }
                    className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded-xl"
                  />
                  <span className="text-[10px] text-neutral-400 mt-1 block">Zalo OA chính thức</span>
                </div>

                <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200">
                  <span className="font-bold text-neutral-700 block mb-1">3. Messenger phòng khám</span>
                  <input
                    type="text"
                    value={formData.socialLinks.messenger || "https://m.me/lacsbeautycenter"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, messenger: e.target.value }
                      })
                    }
                    className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded-xl"
                  />
                  <span className="text-[10px] text-neutral-400 mt-1 block">m.me/... fanpage</span>
                </div>

                <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200">
                  <span className="font-bold text-neutral-700 block mb-1">4. Hệ thống cơ sở</span>
                  <input
                    type="text"
                    value="/he-thong-co-so"
                    readOnly
                    className="w-full px-2.5 py-1.5 text-xs border border-neutral-200 bg-neutral-100 text-neutral-500 rounded-xl font-mono"
                  />
                  <span className="text-[10px] text-neutral-400 mt-1 block">Dẫn đến /he-thong-co-so</span>
                </div>
              </div>
            </div>

            {/* Mục 18: Nút Di Chuyển Lên Đầu Trang (Back To Top) */}
            {(() => {
              const bttConfig: BackToTopConfig = {
                enabled: true,
                iconName: "ArrowUp",
                iconUrl: "",
                position: "bottom-right",
                bottomOffsetDesktop: 96,
                bottomOffsetMobile: 76,
                sideOffset: 24,
                size: "md",
                backgroundColor: "#0E7C86",
                hoverBackgroundColor: "#0A5C63",
                iconColor: "#FFFFFF",
                borderRadius: "full",
                scrollThreshold: 300,
                ...(formData.backToTop || {})
              };

              const updateBtt = (partial: Partial<BackToTopConfig>) => {
                setFormData(prev => ({
                  ...prev,
                  backToTop: {
                    ...bttConfig,
                    ...partial
                  }
                }));
              };

              return (
                <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-100 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <ArrowUp className="w-4 h-4 text-emerald-700" />
                      <h3 className="font-bold text-neutral-900 text-sm font-heading">
                        Mục 18. Nút Di Chuyển Lên Đầu Trang (Back To Top)
                      </h3>
                    </div>

                    <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                      <span className={bttConfig.enabled ? "text-emerald-700 font-semibold" : "text-neutral-500"}>
                        {bttConfig.enabled ? "Đang BẬT" : "Đang TẮT"}
                      </span>
                      <input
                        type="checkbox"
                        checked={bttConfig.enabled}
                        onChange={(e) => updateBtt({ enabled: e.target.checked })}
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                      />
                    </label>
                  </div>

                  <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/70 rounded-2xl text-[11px] text-emerald-900 leading-relaxed">
                    <strong>Hành vi chuẩn UX:</strong> Nút tự động xuất hiện mượt mà khi người dùng cuộn qua ngưỡng cấu hình, cuộn êm (smooth scroll) lên đỉnh trang, tự ẩn khi ở đầu trang, hỗ trợ bàn phím (Tab focus, Enter/Space), tuân thủ <code>prefers-reduced-motion</code> và được tính toán khoảng cách an toàn tránh đè lên Floating Contact Hub.
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Cột Cấu Hình (7 cols) */}
                    <div className="lg:col-span-7 space-y-4">
                      {/* Chọn Icon Nút */}
                      <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200">
                        <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                          1. Biểu tượng nút Back To Top
                        </label>
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-11 h-11 rounded-xl flex items-center justify-center shadow-xs transition"
                              style={{
                                backgroundColor: bttConfig.backgroundColor,
                                color: bttConfig.iconColor,
                                borderRadius: bttConfig.borderRadius === "full" ? "9999px" : bttConfig.borderRadius === "xl" ? "12px" : "8px"
                              }}
                            >
                              <DynamicIcon
                                name={bttConfig.iconName || "ArrowUp"}
                                url={bttConfig.iconUrl}
                                className="w-5 h-5"
                              />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-neutral-900">
                                {bttConfig.iconUrl ? "Icon ảnh / SVG tùy chỉnh" : (bttConfig.iconName || "ArrowUp")}
                              </div>
                              <div className="text-[11px] text-neutral-500">
                                {bttConfig.iconUrl ? "Tài nguyên Media upload" : "Icon thư viện Lucide"}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {(bttConfig.iconUrl || bttConfig.iconName !== "ArrowUp") && (
                              <button
                                type="button"
                                onClick={() => updateBtt({ iconName: "ArrowUp", iconUrl: "" })}
                                className="px-2.5 py-1.5 text-xs text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200 rounded-lg transition"
                                title="Đặt lại ArrowUp mặc định"
                              >
                                Mặc định
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => setShowBackToTopIconPicker(true)}
                              className="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition"
                            >
                              Đổi Icon
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Vị trí hiển thị */}
                      <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-2">
                        <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                          2. Vị trí hiển thị
                        </label>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <label className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition ${bttConfig.position === "bottom-right" ? "bg-emerald-50/60 border-emerald-300 text-emerald-950 font-semibold" : "bg-white border-neutral-200 text-neutral-700"}`}>
                            <input
                              type="radio"
                              name="bttPosition"
                              checked={bttConfig.position === "bottom-right"}
                              onChange={() => updateBtt({ position: "bottom-right" })}
                              className="text-emerald-600"
                            />
                            <div>
                              <div>Góc phải dưới (Khuyên dùng)</div>
                              <div className="text-[10px] text-neutral-500 font-normal">Nằm trên cụm Hotline/Zalo nổi</div>
                            </div>
                          </label>

                          <label className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition ${bttConfig.position === "bottom-left" ? "bg-emerald-50/60 border-emerald-300 text-emerald-950 font-semibold" : "bg-white border-neutral-200 text-neutral-700"}`}>
                            <input
                              type="radio"
                              name="bttPosition"
                              checked={bttConfig.position === "bottom-left"}
                              onChange={() => updateBtt({ position: "bottom-left" })}
                              className="text-emerald-600"
                            />
                            <div>
                              <div>Góc trái dưới</div>
                              <div className="text-[10px] text-neutral-500 font-normal">Độc lập ở cạnh trái màn hình</div>
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* Kích thước & Bo góc */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200">
                          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                            3. Kích thước nút
                          </label>
                          <select
                            value={bttConfig.size}
                            onChange={(e) => updateBtt({ size: e.target.value as "sm" | "md" | "lg" })}
                            className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded-xl bg-white font-medium"
                          >
                            <option value="sm">Nhỏ gọn (36 × 36 px)</option>
                            <option value="md">Tiêu chuẩn (44 × 44 px - Khuyên dùng)</option>
                            <option value="lg">Lớn nổi bật (52 × 52 px)</option>
                          </select>
                        </div>

                        <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200">
                          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                            4. Kiểu bo góc
                          </label>
                          <select
                            value={bttConfig.borderRadius}
                            onChange={(e) => updateBtt({ borderRadius: e.target.value as "full" | "xl" | "lg" })}
                            className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded-xl bg-white font-medium"
                          >
                            <option value="full">Tròn hoàn toàn (Bo tròn 9999px)</option>
                            <option value="xl">Bo góc mềm vừa (12px)</option>
                            <option value="lg">Bo góc nhẹ vuông vức (8px)</option>
                          </select>
                        </div>
                      </div>

                      {/* Khoảng cách an toàn (Offsets & Threshold) */}
                      <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3">
                        <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                          5. Khoảng cách an toàn & Ngưỡng cuộn (Safe Offsets)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <div>
                            <span className="text-[11px] font-medium text-neutral-600 block mb-1">Cách đáy Desktop:</span>
                            <div className="flex items-center gap-1.5">
                              <input
                                type="number"
                                min={40}
                                max={250}
                                step={2}
                                value={bttConfig.bottomOffsetDesktop}
                                onChange={(e) => updateBtt({ bottomOffsetDesktop: Number(e.target.value) || 96 })}
                                className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded-xl font-mono text-center"
                              />
                              <span className="text-neutral-400 font-mono text-[11px]">px</span>
                            </div>
                            <span className="text-[10px] text-neutral-400 mt-1 block">Khuyên dùng: 96px</span>
                          </div>

                          <div>
                            <span className="text-[11px] font-medium text-neutral-600 block mb-1">Cách đáy Mobile:</span>
                            <div className="flex items-center gap-1.5">
                              <input
                                type="number"
                                min={40}
                                max={200}
                                step={2}
                                value={bttConfig.bottomOffsetMobile}
                                onChange={(e) => updateBtt({ bottomOffsetMobile: Number(e.target.value) || 76 })}
                                className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded-xl font-mono text-center"
                              />
                              <span className="text-neutral-400 font-mono text-[11px]">px</span>
                            </div>
                            <span className="text-[10px] text-neutral-400 mt-1 block">Khuyên dùng: 76px</span>
                          </div>

                          <div>
                            <span className="text-[11px] font-medium text-neutral-600 block mb-1">Ngưỡng cuộn hiện:</span>
                            <div className="flex items-center gap-1.5">
                              <input
                                type="number"
                                min={100}
                                max={1500}
                                step={50}
                                value={bttConfig.scrollThreshold}
                                onChange={(e) => updateBtt({ scrollThreshold: Number(e.target.value) || 300 })}
                                className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded-xl font-mono text-center"
                              />
                              <span className="text-neutral-400 font-mono text-[11px]">px</span>
                            </div>
                            <span className="text-[10px] text-neutral-400 mt-1 block">Khuyên dùng: 300px</span>
                          </div>
                        </div>
                      </div>

                      {/* Bảng màu */}
                      <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                            6. Màu sắc nhận diện
                          </label>
                          <button
                            type="button"
                            onClick={() => updateBtt({
                              backgroundColor: "#0E7C86",
                              hoverBackgroundColor: "#0A5C63",
                              iconColor: "#FFFFFF"
                            })}
                            className="text-[11px] text-emerald-700 hover:text-emerald-900 font-semibold"
                          >
                            Khôi phục chuẩn LBC (#0E7C86)
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <div>
                            <span className="text-[11px] font-medium text-neutral-600 block mb-1">Màu nền nút:</span>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={bttConfig.backgroundColor}
                                onChange={(e) => updateBtt({ backgroundColor: e.target.value })}
                                className="w-7 h-7 rounded-lg border border-neutral-300 cursor-pointer p-0.5"
                              />
                              <input
                                type="text"
                                value={bttConfig.backgroundColor}
                                onChange={(e) => updateBtt({ backgroundColor: e.target.value })}
                                className="w-full px-2 py-1 text-xs font-mono border border-neutral-300 rounded-lg uppercase"
                              />
                            </div>
                          </div>

                          <div>
                            <span className="text-[11px] font-medium text-neutral-600 block mb-1">Màu khi Hover:</span>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={bttConfig.hoverBackgroundColor}
                                onChange={(e) => updateBtt({ hoverBackgroundColor: e.target.value })}
                                className="w-7 h-7 rounded-lg border border-neutral-300 cursor-pointer p-0.5"
                              />
                              <input
                                type="text"
                                value={bttConfig.hoverBackgroundColor}
                                onChange={(e) => updateBtt({ hoverBackgroundColor: e.target.value })}
                                className="w-full px-2 py-1 text-xs font-mono border border-neutral-300 rounded-lg uppercase"
                              />
                            </div>
                          </div>

                          <div>
                            <span className="text-[11px] font-medium text-neutral-600 block mb-1">Màu Icon:</span>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={bttConfig.iconColor}
                                onChange={(e) => updateBtt({ iconColor: e.target.value })}
                                className="w-7 h-7 rounded-lg border border-neutral-300 cursor-pointer p-0.5"
                              />
                              <input
                                type="text"
                                value={bttConfig.iconColor}
                                onChange={(e) => updateBtt({ iconColor: e.target.value })}
                                className="w-full px-2 py-1 text-xs font-mono border border-neutral-300 rounded-lg uppercase"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cột Trực Quan Hóa Live Preview (5 cols) */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="bg-neutral-900 rounded-2xl p-4 text-white space-y-3 sticky top-4">
                        <div className="flex items-center justify-between text-xs pb-2 border-b border-neutral-800">
                          <span className="font-bold flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>Trực Quan Hóa Tương Tác Live</span>
                          </span>
                          <span className="text-[10px] text-neutral-400 font-mono">Desktop & Mobile</span>
                        </div>

                        {/* Desktop Simulation Window */}
                        <div className="relative h-64 rounded-xl bg-slate-950 border border-neutral-800 overflow-hidden flex flex-col justify-between p-3 select-none">
                          {/* Top browser bar */}
                          <div className="flex items-center justify-between pb-2 border-b border-neutral-800/80">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                            </div>
                            <span className="text-[9px] text-neutral-500 font-mono">lacbeautycenter.com</span>
                          </div>

                          {/* Mock Page Content Lines */}
                          <div className="space-y-2 opacity-25">
                            <div className="h-2.5 bg-neutral-700 rounded-full w-3/4"></div>
                            <div className="h-2 bg-neutral-800 rounded-full w-full"></div>
                            <div className="h-2 bg-neutral-800 rounded-full w-5/6"></div>
                            <div className="h-2 bg-neutral-800 rounded-full w-4/6"></div>
                          </div>

                          {/* Floating Contact Hub simulation */}
                          <div className="absolute bottom-3 right-3 flex flex-col items-center gap-1">
                            <div className="w-9 h-9 rounded-full bg-[#0E7C86] flex items-center justify-center text-white text-[10px] shadow-lg font-bold">
                              LBC
                            </div>
                            <span className="text-[8px] text-neutral-400 font-mono">Hub Liên Hệ</span>
                          </div>

                          {/* Back To Top Button Simulation */}
                          {bttConfig.enabled ? (
                            <div
                              className="absolute transition-all duration-300 flex items-center justify-center shadow-2xl group cursor-pointer hover:scale-110"
                              style={{
                                bottom: `${Math.min(Math.max(bttConfig.bottomOffsetDesktop * 0.55, 30), 120)}px`,
                                [bttConfig.position === "bottom-left" ? "left" : "right"]: "14px",
                                width: bttConfig.size === "sm" ? "28px" : bttConfig.size === "lg" ? "40px" : "34px",
                                height: bttConfig.size === "sm" ? "28px" : bttConfig.size === "lg" ? "40px" : "34px",
                                backgroundColor: bttConfig.backgroundColor,
                                color: bttConfig.iconColor,
                                borderRadius: bttConfig.borderRadius === "full" ? "9999px" : bttConfig.borderRadius === "xl" ? "10px" : "6px"
                              }}
                              title="Bấm thử nghiệm cuộn lên đầu"
                            >
                              <DynamicIcon
                                name={bttConfig.iconName || "ArrowUp"}
                                url={bttConfig.iconUrl}
                                className={bttConfig.size === "sm" ? "w-3.5 h-3.5" : bttConfig.size === "lg" ? "w-5 h-5" : "w-4 h-4"}
                              />
                            </div>
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xs text-xs text-neutral-400">
                              (Nút Back to Top đang TẮT)
                            </div>
                          )}
                        </div>

                        <div className="text-[11px] text-neutral-400 leading-normal flex items-start gap-2 pt-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>
                            Khoảng cách an toàn được tối ưu tự động: Trên desktop nút nằm trên cụm Hotline 1 khoảng thẩm mỹ ({bttConfig.bottomOffsetDesktop}px); trên mobile cách đáy {bttConfig.bottomOffsetMobile}px không che thanh công cụ.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Mục 5: Về Lạc's Beauty Center */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <h3 className="font-bold text-neutral-900 text-sm font-heading">
                  Mục 5. Cấu Hình Số Liệu & Giới Thiệu (About Summary Section)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Số liệu nổi bật có căn cứ
                  </label>
                  <input
                    type="text"
                    value={formData.aboutConfig?.metricNumber || "10.000+"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        aboutConfig: {
                          badge: "Về chúng tôi",
                          title: formData.facilityName,
                          description: "",
                          metricLabel: "Ca điều trị chuẩn Y khoa",
                          metricBadge: "VISIA 3D",
                          mainImage: "",
                          subImages: [],
                          ctaText: "Xem câu chuyện thương hiệu",
                          ctaLink: "/gioi-thieu",
                          ...formData.aboutConfig,
                          metricNumber: e.target.value
                        }
                      })
                    }
                    placeholder="10.000+ hoặc để trống nếu chưa có số liệu"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl"
                  />
                  <span className="text-[11px] text-amber-700 mt-1 block">
                    * Tuân thủ brief: Không tự ý bịa số liệu thành tích nếu chưa có căn cứ từ phòng khám.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Nhãn mô tả số liệu
                  </label>
                  <input
                    type="text"
                    value={formData.aboutConfig?.metricLabel || "Ca điều trị chuẩn Y khoa"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        aboutConfig: {
                          badge: "Về chúng tôi",
                          title: formData.facilityName,
                          description: "",
                          metricNumber: "10.000+",
                          metricBadge: "VISIA 3D",
                          mainImage: "",
                          subImages: [],
                          ctaText: "Xem câu chuyện thương hiệu",
                          ctaLink: "/gioi-thieu",
                          ...formData.aboutConfig,
                          metricLabel: e.target.value
                        }
                      })
                    }
                    placeholder="Ca điều trị chuẩn Y khoa"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Floating Save Bar */}
        <div className="sticky bottom-4 z-20 bg-white/95 backdrop-blur-md p-4 rounded-3xl border border-neutral-200 shadow-xl flex items-center justify-between">
          <span className="text-xs text-neutral-500 font-medium hidden sm:inline">
            Mọi thay đổi sẽ cập nhật tức thì trên website client và lưu bền vững vào bộ nhớ trình duyệt.
          </span>
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl shadow-md transition ml-auto"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>ĐANG LƯU VÀO NEON...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>LƯU CẤU HÌNH</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Media Picker Modal */}
      <MediaLibraryModal
        isOpen={!!mediaPickerTarget}
        onClose={() => setMediaPickerTarget(null)}
        onSelectMedia={(media) => {
          if (mediaPickerTarget === "logoHeader") {
            setFormData(prev => ({ ...prev, logoUrl: media.url, logoHeader: media.url }));
            setPreviewErrors(prev => ({ ...prev, logoHeader: false }));
            showToast("Đã chọn Logo Header từ Thư viện! Bấm 'Lưu Cấu Hình' để hoàn tất.");
          } else if (mediaPickerTarget === "logoFooter") {
            setFormData(prev => ({ ...prev, logoFooterUrl: media.url, logoFooter: media.url }));
            setPreviewErrors(prev => ({ ...prev, logoFooter: false }));
            showToast("Đã chọn Logo Footer từ Thư viện! Bấm 'Lưu Cấu Hình' để hoàn tất.");
          } else if (mediaPickerTarget === "favicon") {
            setFormData(prev => ({ ...prev, faviconUrl: media.url, favicon: media.url }));
            setPreviewErrors(prev => ({ ...prev, favicon: false }));
            showToast("Đã chọn Favicon từ Thư viện! Bấm 'Lưu Cấu Hình' để hoàn tất.");
          } else if (mediaPickerTarget === "ogImage") {
            setFormData(prev => ({
              ...prev,
              seoDefault: { ...prev.seoDefault, keywords: prev.seoDefault?.keywords || "" },
              popupBanner: { ...prev.popupBanner, imageUrl: media.url }
            }));
            setPreviewErrors(prev => ({ ...prev, ogImage: false }));
            showToast("Đã chọn ảnh đại diện SEO từ Thư viện! Bấm 'Lưu Cấu Hình' để hoàn tất.");
          } else if (mediaPickerTarget === "popupImage") {
            setFormData(prev => ({
              ...prev,
              popupBanner: { ...(prev.popupBanner || { enabled: false, title: "", description: "", link: "" }), imageUrl: media.url }
            }));
            showToast("Đã chọn ảnh Popup Banner từ Thư viện! Bấm 'Lưu Cấu Hình' để hoàn tất.");
          }
          setMediaPickerTarget(null);
        }}
        title="Chọn ảnh từ Thư viện Media"
      />

      {/* Back to Top Icon Picker Modal */}
      <IconPickerModal
        isOpen={showBackToTopIconPicker}
        onClose={() => setShowBackToTopIconPicker(false)}
        onSelect={(iconName, iconUrl) => {
          setFormData(prev => {
            const currentBtt = prev.backToTop || {
              enabled: true,
              iconName: "ArrowUp",
              iconUrl: "",
              position: "bottom-right",
              bottomOffsetDesktop: 96,
              bottomOffsetMobile: 76,
              sideOffset: 24,
              size: "md",
              backgroundColor: "#0E7C86",
              hoverBackgroundColor: "#0A5C63",
              iconColor: "#FFFFFF",
              borderRadius: "full",
              scrollThreshold: 300
            };
            return {
              ...prev,
              backToTop: {
                ...currentBtt,
                iconName,
                iconUrl: iconUrl || ""
              }
            };
          });
        }}
        currentIconName={formData.backToTop?.iconName || "ArrowUp"}
        currentIconUrl={formData.backToTop?.iconUrl}
        initialCategory="navigation"
      />
    </div>
  );
};
