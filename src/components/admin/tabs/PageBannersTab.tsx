import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  PanelsTopLeft,
  Image as ImageIcon,
  Sliders,
  CheckCircle2,
  ExternalLink,
  Save,
  RotateCcw,
  Eye,
  EyeOff,
  Sparkles,
  Link as LinkIcon,
  ChevronRight,
  Info,
  Layers,
  ArrowRight
} from "lucide-react";
import { useDemoData } from "../../../context/DemoDataContext";
import { PageBannerConfig } from "../../../data/pagesConfig";
import { MediaLibraryModal } from "../MediaLibraryModal";

export const PageBannersTab: React.FC = () => {
  const { pagesConfig, updatePageConfig } = useDemoData();

  const pageKeys = Object.keys(pagesConfig);
  const [selectedPageId, setSelectedPageId] = useState<string>("gioi-thieu");
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Current config for editing
  const currentConfig: PageBannerConfig = pagesConfig[selectedPageId] || {
    id: selectedPageId,
    pageName: "Trang nội dung",
    routePath: `/${selectedPageId}`,
    enabled: true,
    badge: "",
    title: "",
    description: "",
    desktopImage: "",
    mobileImage: "",
    overlayOpacity: 70,
    overlayColor: "dark",
    alignment: "center",
    cta1Text: "",
    cta1Link: "",
    cta1Enabled: false,
    cta2Text: "",
    cta2Link: "",
    cta2Enabled: false,
    showBreadcrumbs: true
  };

  const [formState, setFormState] = useState<PageBannerConfig>(currentConfig);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<"desktop" | "mobile" | null>(null);

  // Sync formState when selectedPageId changes
  const handleSelectPage = (pageId: string) => {
    setSelectedPageId(pageId);
    setFormState(pagesConfig[pageId] || currentConfig);
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await updatePageConfig(selectedPageId, formState);
      if (res.success) {
        showToast(`Đã lưu cấu hình banner và nội dung trang "${formState.pageName}" lên Neon DB!`);
      } else {
        alert("Lỗi khi lưu cấu hình trang: " + (res.error || "Không thể kết nối đến cơ sở dữ liệu"));
      }
    } catch (err: any) {
      console.error(err);
      alert("Lỗi khi lưu cấu hình: " + (err?.message || "Lỗi không xác định"));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-neutral-900 font-heading flex items-center gap-2">
            <PanelsTopLeft className="w-5 h-5 text-emerald-700" />
            <span>Quản trị Banner & Nội Dung Các Trang (13 Route)</span>
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl leading-relaxed">
            Hệ thống CMS tập trung cho toàn bộ hero banner, câu chuyện thương hiệu, hình ảnh desktop/mobile, độ mờ overlay và nút CTA của tất cả trang con trên website. Dữ liệu lưu vĩnh viễn trên Neon PostgreSQL.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            to={formState.routePath || "/"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Xem Trang này Live</span>
          </Link>
        </div>
      </div>

      {/* Toast Notice */}
      {toastMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-fadeIn font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Page Selector Tabs */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs p-3">
        <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider px-2 block mb-2">
          Chọn trang cần chỉnh sửa ({pageKeys.length} trang)
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {pageKeys.map((pId) => {
            const page = pagesConfig[pId];
            const isSelected = selectedPageId === pId;
            return (
              <button
                key={pId}
                type="button"
                onClick={() => handleSelectPage(pId)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-emerald-800 text-white shadow-xs"
                    : "bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border border-neutral-200"
                }`}
              >
                <span>{page.pageName.split("–")[0].split("(")[0]}</span>
                {!page.enabled && (
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-amber-300" : "bg-neutral-400"}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Banner Live Preview */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
          <div className="p-3.5 bg-neutral-50/80 border-b border-neutral-200 flex items-center justify-between text-xs font-semibold text-neutral-600">
            <span className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-700" />
              <span>Xem trước Banner: {formState.pageName}</span>
            </span>
            <span className="text-[11px] font-mono text-neutral-400">Route: {formState.routePath}</span>
          </div>

          <div
            className="relative py-12 px-6 sm:py-16 sm:px-12 flex flex-col justify-center min-h-[260px] bg-neutral-900 transition-all overflow-hidden"
            style={{
              backgroundImage: `url(${formState.desktopImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            {/* Dynamic Overlay */}
            <div
              className={`absolute inset-0 ${
                formState.overlayColor === "primary"
                  ? "bg-emerald-950"
                  : formState.overlayColor === "light"
                  ? "bg-white"
                  : "bg-neutral-950"
              }`}
              style={{ opacity: (formState.overlayOpacity || 70) / 100 }}
            />

            {/* Content Preview */}
            <div
              className={`relative z-10 max-w-3xl ${
                formState.alignment === "center"
                  ? "mx-auto text-center"
                  : formState.alignment === "right"
                  ? "ml-auto text-right"
                  : "text-left"
              }`}
            >
              {formState.showBreadcrumbs && (
                <div className="inline-flex items-center gap-2 text-[11px] text-white/70 mb-3 font-medium">
                  <span>Trang chủ</span>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-white font-semibold">{formState.pageName}</span>
                </div>
              )}

              {formState.badge && (
                <div className="mb-2">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-white/20 text-white backdrop-blur-xs border border-white/30 uppercase tracking-widest">
                    {formState.badge}
                  </span>
                </div>
              )}

              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-heading leading-tight tracking-tight drop-shadow-xs">
                {formState.title || "Tiêu đề Hero Banner"}
              </h1>

              {formState.description && (
                <p className="mt-2 text-xs sm:text-sm text-neutral-200 leading-relaxed max-w-2xl mx-auto drop-shadow-xs">
                  {formState.description}
                </p>
              )}

              {(formState.cta1Enabled || formState.cta2Enabled) && (
                <div
                  className={`mt-4 flex flex-wrap gap-2.5 ${
                    formState.alignment === "center"
                      ? "justify-center"
                      : formState.alignment === "right"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {formState.cta1Enabled && formState.cta1Text && (
                    <span className="px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5">
                      {formState.cta1Text}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  )}
                  {formState.cta2Enabled && formState.cta2Text && (
                    <span className="px-4 py-2 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-xs border border-white/30">
                      {formState.cta2Text}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Settings Form */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-100 gap-3">
            <div>
              <h3 className="text-base font-bold text-neutral-900 font-heading">
                Cấu hình Banner & Hiển thị: {formState.pageName}
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Đường dẫn liên kết: <code className="font-mono text-emerald-700">{formState.routePath}</code>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer bg-neutral-50 px-3 py-1.5 rounded-xl border border-neutral-200">
                <input
                  type="checkbox"
                  checked={formState.enabled}
                  onChange={(e) => setFormState({ ...formState, enabled: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded border-neutral-300 focus:ring-emerald-500"
                />
                <span className="text-xs font-semibold text-neutral-700">Bật Banner trang này</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer bg-neutral-50 px-3 py-1.5 rounded-xl border border-neutral-200">
                <input
                  type="checkbox"
                  checked={formState.showBreadcrumbs !== false}
                  onChange={(e) => setFormState({ ...formState, showBreadcrumbs: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded border-neutral-300 focus:ring-emerald-500"
                />
                <span className="text-xs font-semibold text-neutral-700">Hiện Breadcrumbs</span>
              </label>
            </div>
          </div>

          {/* Texts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                Nhãn nhỏ trên tiêu đề (Badge)
              </label>
              <input
                type="text"
                value={formState.badge || ""}
                onChange={(e) => setFormState({ ...formState, badge: e.target.value })}
                placeholder="VD: CÂU CHUYỆN THƯƠNG HIỆU"
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                Tiêu đề Banner *
              </label>
              <input
                type="text"
                required
                value={formState.title || ""}
                onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                placeholder="Tiêu đề trang..."
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden font-bold"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                Mô tả Banner
              </label>
              <textarea
                rows={2}
                value={formState.description || ""}
                onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                placeholder="Mô tả tóm tắt nội dung chính của trang..."
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden resize-none"
              />
            </div>
          </div>

          {/* Background Images */}
          <div className="pt-4 border-t border-neutral-100 space-y-4">
            <h4 className="text-sm font-bold text-neutral-900 font-heading">
              Hình ảnh nền Banner (Desktop & Mobile)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Desktop Image */}
              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-800">Ảnh nền Desktop (1920x800) *</span>
                  <button
                    type="button"
                    onClick={() => setMediaPickerTarget("desktop")}
                    className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Chọn từ Thư viện</span>
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={formState.desktopImage || ""}
                  onChange={(e) => setFormState({ ...formState, desktopImage: e.target.value })}
                  placeholder="URL ảnh desktop..."
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg font-mono"
                />
              </div>

              {/* Mobile Image */}
              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-800">Ảnh nền Mobile (Tùy chọn)</span>
                  <button
                    type="button"
                    onClick={() => setMediaPickerTarget("mobile")}
                    className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Chọn từ Thư viện</span>
                  </button>
                </div>
                <input
                  type="text"
                  value={formState.mobileImage || ""}
                  onChange={(e) => setFormState({ ...formState, mobileImage: e.target.value })}
                  placeholder="URL ảnh mobile (để trống nếu dùng chung ảnh desktop)..."
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg font-mono"
                />
              </div>
            </div>
          </div>

          {/* Visual Style Controls (Overlay, Alignment) */}
          <div className="pt-4 border-t border-neutral-100 space-y-4">
            <h4 className="text-sm font-bold text-neutral-900 font-heading">
              Hiệu ứng lớp phủ (Overlay) & Căn chỉnh
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                    Độ mờ Overlay ({formState.overlayOpacity || 70}%)
                  </label>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={formState.overlayOpacity || 70}
                  onChange={(e) => setFormState({ ...formState, overlayOpacity: Number(e.target.value) })}
                  className="w-full accent-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                  Tông màu Overlay
                </label>
                <select
                  value={formState.overlayColor || "dark"}
                  onChange={(e) => setFormState({ ...formState, overlayColor: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl"
                >
                  <option value="dark">Tối trang nhã (Dark)</option>
                  <option value="primary">Xanh ngọc y khoa (Primary Emerald)</option>
                  <option value="light">Sáng (Light)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                  Căn chỉnh văn bản
                </label>
                <select
                  value={formState.alignment || "center"}
                  onChange={(e) => setFormState({ ...formState, alignment: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl"
                >
                  <option value="center">Giữa trung tâm (Center)</option>
                  <option value="left">Căn trái (Left)</option>
                  <option value="right">Căn phải (Right)</option>
                </select>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="pt-4 border-t border-neutral-100 space-y-4">
            <h4 className="text-sm font-bold text-neutral-900 font-heading">
              Hai nút hành động (CTA Buttons)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* CTA 1 */}
              <div className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-800">Nút CTA 1</span>
                  <label className="flex items-center gap-1.5 text-xs text-neutral-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formState.cta1Enabled !== false}
                      onChange={(e) => setFormState({ ...formState, cta1Enabled: e.target.checked })}
                      className="w-3.5 h-3.5 text-emerald-600 rounded"
                    />
                    <span>Bật nút này</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={formState.cta1Text || ""}
                  onChange={(e) => setFormState({ ...formState, cta1Text: e.target.value })}
                  placeholder="VD: Đặt lịch thăm khám"
                  className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded-lg"
                />
                <input
                  type="text"
                  value={formState.cta1Link || ""}
                  onChange={(e) => setFormState({ ...formState, cta1Link: e.target.value })}
                  placeholder="VD: /dat-lich-kham"
                  className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded-lg font-mono"
                />
              </div>

              {/* CTA 2 */}
              <div className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-800">Nút CTA 2</span>
                  <label className="flex items-center gap-1.5 text-xs text-neutral-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formState.cta2Enabled !== false}
                      onChange={(e) => setFormState({ ...formState, cta2Enabled: e.target.checked })}
                      className="w-3.5 h-3.5 text-emerald-600 rounded"
                    />
                    <span>Bật nút này</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={formState.cta2Text || ""}
                  onChange={(e) => setFormState({ ...formState, cta2Text: e.target.value })}
                  placeholder="VD: Đội ngũ bác sĩ"
                  className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded-lg"
                />
                <input
                  type="text"
                  value={formState.cta2Link || ""}
                  onChange={(e) => setFormState({ ...formState, cta2Link: e.target.value })}
                  placeholder="VD: /doi-ngu-bac-si"
                  className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded-lg font-mono"
                />
              </div>
            </div>
          </div>

          {/* Special Narrative Fields for About Page */}
          {selectedPageId === "gioi-thieu" && (
            <div className="pt-6 border-t-2 border-emerald-100 bg-emerald-50/40 p-5 rounded-2xl space-y-4">
              <div>
                <h4 className="text-sm font-bold text-emerald-950 font-heading flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span>Nội dung Khối "Câu Chuyện Thương Hiệu & Khởi Nguồn" (Trang Giới Thiệu)</span>
                </h4>
                <p className="text-xs text-emerald-800 mt-0.5">
                  Quản lý trực tiếp tiêu đề, 2 đoạn văn tự sự và 2 số liệu lâm sàng minh chứng.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Nhãn nhỏ (Story Badge)
                  </label>
                  <input
                    type="text"
                    value={formState.storyBadge || ""}
                    onChange={(e) => setFormState({ ...formState, storyBadge: e.target.value })}
                    placeholder="Khởi nguồn & Triết lý"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Tiêu đề câu chuyện (Story Title)
                  </label>
                  <input
                    type="text"
                    value={formState.storyTitle || ""}
                    onChange={(e) => setFormState({ ...formState, storyTitle: e.target.value })}
                    placeholder="Khát Vọng Mang Chuẩn Mực Da Liễu Hiện Đại Về Miền Tây"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl bg-white font-bold"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Đoạn văn tự sự 1 (Paragraph 1)
                  </label>
                  <textarea
                    rows={3}
                    value={formState.storyParagraph1 || ""}
                    onChange={(e) => setFormState({ ...formState, storyParagraph1: e.target.value })}
                    placeholder="Được thành lập bởi đội ngũ bác sĩ chuyên khoa da liễu giàu tâm huyết..."
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl bg-white resize-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Đoạn văn tự sự 2 (Paragraph 2)
                  </label>
                  <textarea
                    rows={3}
                    value={formState.storyParagraph2 || ""}
                    onChange={(e) => setFormState({ ...formState, storyParagraph2: e.target.value })}
                    placeholder="Chúng tôi tin rằng mỗi làn da là một thực thể sinh học độc bản..."
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl bg-white resize-none"
                  />
                </div>

                {/* Stats */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Số liệu 1: Con số & Nhãn
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={formState.stat1Number || ""}
                      onChange={(e) => setFormState({ ...formState, stat1Number: e.target.value })}
                      placeholder="10.000+"
                      className="px-2.5 py-1.5 text-xs border border-neutral-300 rounded-lg bg-white font-bold font-heading text-emerald-800"
                    />
                    <input
                      type="text"
                      value={formState.stat1Label || ""}
                      onChange={(e) => setFormState({ ...formState, stat1Label: e.target.value })}
                      placeholder="Khách hàng điều trị thành công"
                      className="px-2.5 py-1.5 text-xs border border-neutral-300 rounded-lg bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Số liệu 2: Con số & Nhãn
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={formState.stat2Number || ""}
                      onChange={(e) => setFormState({ ...formState, stat2Number: e.target.value })}
                      placeholder="100%"
                      className="px-2.5 py-1.5 text-xs border border-neutral-300 rounded-lg bg-white font-bold font-heading text-emerald-800"
                    />
                    <input
                      type="text"
                      value={formState.stat2Label || ""}
                      onChange={(e) => setFormState({ ...formState, stat2Label: e.target.value })}
                      placeholder="Bác sĩ Sau Đại học"
                      className="px-2.5 py-1.5 text-xs border border-neutral-300 rounded-lg bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Save Bar */}
          <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-3">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Đang lưu Neon..." : `Lưu thay đổi trang "${formState.pageName}"`}</span>
            </button>
          </div>
        </div>
      </form>

      {/* Media Picker Modal */}
      <MediaLibraryModal
        isOpen={!!mediaPickerTarget}
        onClose={() => setMediaPickerTarget(null)}
        onSelectImage={(url) => {
          if (mediaPickerTarget === "desktop") {
            setFormState({ ...formState, desktopImage: url });
          } else if (mediaPickerTarget === "mobile") {
            setFormState({ ...formState, mobileImage: url });
          }
          setMediaPickerTarget(null);
          showToast("Đã chọn ảnh banner từ Thư viện Media!");
        }}
      />
    </div>
  );
};
