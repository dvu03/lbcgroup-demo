import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sliders,
  Plus,
  Edit,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Image as ImageIcon,
  ExternalLink,
  Smartphone,
  Monitor,
  CheckCircle2,
  Sparkles,
  Clock,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";
import { useDemoData } from "../../../context/DemoDataContext";
import { SlideItem, SideBanner, HeroSliderSettings } from "../../../data/heroSlider";
import { MediaLibraryModal } from "../MediaLibraryModal";
import { ConfirmationModal } from "../ConfirmationModal";

export const HeroBannersTab: React.FC = () => {
  const {
    heroSlides,
    updateHeroSlides,
    saveSlide,
    deleteSlide,
    duplicateSlide,
    heroSliderSettings,
    updateHeroSliderSettings,
    sideBanners,
    saveSideBanner
  } = useDemoData();

  const [activeSubTab, setActiveSubTab] = useState<"slides" | "sideBanners">("slides");
  const [editingSlide, setEditingSlide] = useState<SlideItem | null>(null);
  const [editingSideBanner, setEditingSideBanner] = useState<SideBanner | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<"desktop" | "mobile" | "side" | null>(null);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Local state for autoplay timing preview before saving
  const [autoplaySettings, setAutoplaySettings] = useState<HeroSliderSettings>(heroSliderSettings);
  const [hasUnsavedTiming, setHasUnsavedTiming] = useState(false);

  useEffect(() => {
    setAutoplaySettings(heroSliderSettings);
    setHasUnsavedTiming(false);
  }, [heroSliderSettings]);

  const handleTimingChange = (partial: Partial<HeroSliderSettings>) => {
    setAutoplaySettings(prev => ({ ...prev, ...partial }));
    setHasUnsavedTiming(true);
  };

  const handleSaveTiming = () => {
    updateHeroSliderSettings(autoplaySettings);
    setHasUnsavedTiming(false);
    showToast(`Đã lưu cấu hình chuyển slide: ${autoplaySettings.autoplayEnabled ? `${autoplaySettings.autoplayInterval} giây/slide` : 'Tắt tự động'}`);
  };

  const handleResetDefaultTiming = () => {
    const defaults: HeroSliderSettings = { autoplayEnabled: true, autoplayInterval: 5, pauseOnHover: true };
    setAutoplaySettings(defaults);
    updateHeroSliderSettings(defaults);
    setHasUnsavedTiming(false);
    showToast("Đã khôi phục cài đặt mặc định: 5 giây/slide, bật tự động!");
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleCreateNewSlide = () => {
    const newSlide: SlideItem = {
      id: `slide-${Date.now()}`,
      badge: "Ưu đãi đặc biệt",
      title: "Tiêu đề banner mới Lạc's Beauty Center",
      subtitle: "Mô tả ngắn gọn về chương trình dịch vụ hoặc công nghệ nổi bật.",
      ctaText: "Xem chi tiết",
      ctaLink: "/dich-vu",
      desktopImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80",
      mobileImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=750&q=80",
      altText: "Banner Lạc's Beauty Center",
      enabled: true,
      overlayOpacity: 40,
      textColor: "light",
      align: "left"
    };
    setEditingSlide(newSlide);
  };

  const handleMoveSlide = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= heroSlides.length) return;

    const list = [...heroSlides];
    const [moved] = list.splice(index, 1);
    list.splice(targetIdx, 0, moved);
    updateHeroSlides(list);
    showToast("Đã cập nhật thứ tự hiển thị banner!");
  };

  const handleSaveSlideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide) return;
    saveSlide(editingSlide);
    showToast(`Đã lưu banner: "${editingSlide.title}"!`);
    setEditingSlide(null);
  };

  const handleSaveSideBannerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSideBanner) return;
    saveSideBanner(editingSideBanner);
    showToast(`Đã lưu banner phụ: "${editingSideBanner.title}"!`);
    setEditingSideBanner(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-neutral-900 font-heading flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-700" />
            <span>Quản lý Hero Banners & Slider Trang chủ</span>
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl leading-relaxed">
            Tùy biến 5 slide chính tại khung banner lớn và 2 banner phụ cố định bên phải. Cập nhật ảnh chuẩn tỉ lệ Desktop & Mobile, nhãn badge và đường dẫn CTA.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {activeSubTab === "slides" && (
            <button
              type="button"
              onClick={handleCreateNewSlide}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition"
            >
              <Plus className="w-4 h-4" />
              <span>Tạo Banner mới</span>
            </button>
          )}

          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Xem Hero Live</span>
          </Link>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveSubTab("slides")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition ${
            activeSubTab === "slides"
              ? "bg-emerald-700 text-white shadow-xs"
              : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          <span>Slide chính Hero Slider ({heroSlides.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("sideBanners")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition ${
            activeSubTab === "sideBanners"
              ? "bg-emerald-700 text-white shadow-xs"
              : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          <span>2 Banner phụ bên phải ({sideBanners.length})</span>
        </button>
      </div>

      {/* Info shortcut banner for top announcement */}
      <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl flex items-center justify-between gap-3 text-xs text-neutral-700">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>
            <strong>Lưu ý:</strong> Thanh thông báo Banner Top trên cùng Header được quản lý tập trung tại mục{" "}
            <span className="font-semibold text-emerald-800">Giao diện website → Banner top & Header</span> để đảm bảo Single Source of Truth.
          </span>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-fadeIn font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Hero Slides List */}
      {activeSubTab === "slides" && (
        <div className="space-y-5">
          {/* Autoplay & Timing Configuration Card */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0 shadow-xs">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 font-heading flex items-center gap-2">
                    <span>Tự động chuyển Slide (Autoplay) & Thời gian</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      autoplaySettings.autoplayEnabled
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : "bg-neutral-100 text-neutral-600 border-neutral-200"
                    }`}>
                      {autoplaySettings.autoplayEnabled ? `${autoplaySettings.autoplayInterval} giây/slide` : "Đang tắt"}
                    </span>
                    {hasUnsavedTiming && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 animate-pulse">
                        Chưa lưu
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Tùy chỉnh thời gian hiển thị mỗi banner trên trang chủ từ 2 đến 15 giây.
                  </p>
                </div>
              </div>

              {/* Autoplay Switch & Save Button */}
              <div className="flex items-center gap-3 self-end sm:self-center">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-neutral-700">
                    {autoplaySettings.autoplayEnabled ? "Tự động: BẬT" : "Tự động: TẮT"}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoplaySettings.autoplayEnabled}
                      onChange={(e) => handleTimingChange({ autoplayEnabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleSaveTiming}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Lưu thời gian</span>
                </button>
              </div>
            </div>

            {/* Timing Controls (Slider + Number input + Presets + Mini Live Preview) */}
            {autoplaySettings.autoplayEnabled ? (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center pt-1">
                <div className="md:col-span-8 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-neutral-700">
                      Thời gian hiển thị mỗi slide (2 – 15 giây):
                    </span>
                    <span className="font-bold font-mono text-emerald-800 text-sm bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                      {autoplaySettings.autoplayInterval} giây/slide
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-neutral-400 font-mono">2s</span>
                    <input
                      type="range"
                      min="2"
                      max="15"
                      step="1"
                      value={autoplaySettings.autoplayInterval}
                      onChange={(e) => handleTimingChange({ autoplayInterval: Number(e.target.value) })}
                      className="w-full h-2.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                    <span className="text-xs text-neutral-400 font-mono">15s</span>
                    <div className="flex items-center gap-1.5 shrink-0 bg-neutral-50 px-2.5 py-1 rounded-xl border border-neutral-300">
                      <input
                        type="number"
                        min="2"
                        max="15"
                        value={autoplaySettings.autoplayInterval}
                        onChange={(e) => {
                          const val = Math.max(2, Math.min(15, Number(e.target.value) || 5));
                          handleTimingChange({ autoplayInterval: val });
                        }}
                        className="w-12 text-xs font-bold text-center bg-transparent font-mono focus:outline-hidden"
                      />
                      <span className="text-xs text-neutral-600 font-medium">giây</span>
                    </div>
                  </div>

                  {/* Quick Presets and Reset */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[11px] text-neutral-500 font-medium">Mức mẫu:</span>
                    {[
                      { label: "2s (Rất nhanh)", val: 2 },
                      { label: "3s (Nhanh)", val: 3 },
                      { label: "5s (Chuẩn)", val: 5 },
                      { label: "7s (Thư thả)", val: 7 },
                      { label: "10s (Chậm)", val: 10 },
                    ].map((preset) => (
                      <button
                        key={preset.val}
                        type="button"
                        onClick={() => handleTimingChange({ autoplayInterval: preset.val })}
                        className={`px-2.5 py-1 text-xs rounded-lg border transition font-medium ${
                          autoplaySettings.autoplayInterval === preset.val
                            ? "bg-emerald-700 text-white border-emerald-700 font-bold shadow-xs"
                            : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={handleResetDefaultTiming}
                      className="ml-auto text-xs font-semibold text-neutral-600 hover:text-emerald-800 flex items-center gap-1 hover:underline py-1"
                      title="Khôi phục giá trị mặc định 5 giây/slide"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Khôi phục mặc định (5s)</span>
                    </button>
                  </div>

                  {/* Pause on hover toggle */}
                  <div className="pt-2 flex items-center gap-2 border-t border-neutral-100">
                    <input
                      type="checkbox"
                      id="pauseOnHoverCheck"
                      checked={autoplaySettings.pauseOnHover !== false}
                      onChange={(e) => handleTimingChange({ pauseOnHover: e.target.checked })}
                      className="w-4 h-4 text-emerald-600 rounded border-neutral-300 focus:ring-emerald-500"
                    />
                    <label htmlFor="pauseOnHoverCheck" className="text-xs text-neutral-700 cursor-pointer">
                      Tự động tạm dừng khi người dùng rê chuột (Hover) vào banner để đọc thông tin
                    </label>
                  </div>
                </div>

                {/* Mini Live Preview Container to test transition speed */}
                <div className="md:col-span-4 bg-neutral-900 rounded-2xl p-3.5 border border-neutral-800 text-white space-y-2">
                  <div className="flex items-center justify-between text-xs text-neutral-300">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Play className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Xem thử tốc độ chuyển:</span>
                    </span>
                    <span className="font-mono text-xs text-emerald-400 font-bold">
                      {autoplaySettings.autoplayInterval}s/slide
                    </span>
                  </div>

                  <MiniSliderPreview
                    slides={heroSlides.filter(s => s.enabled !== false)}
                    interval={autoplaySettings.autoplayInterval}
                    autoplay={autoplaySettings.autoplayEnabled}
                  />
                  <p className="text-[10px] text-neutral-400 text-center">
                    Thanh màu xanh bên dưới thể hiện thời gian đếm ngược trước khi đổi slide.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-600">
                <span>Tự động chuyển slide đang TẮT. Website sẽ dừng lại ở slide hiện tại và chỉ chuyển khi người dùng tương tác.</span>
                <button
                  type="button"
                  onClick={() => handleTimingChange({ autoplayEnabled: true, autoplayInterval: 5 })}
                  className="px-3 py-1.5 bg-emerald-700 text-white rounded-lg font-semibold hover:bg-emerald-800 transition shrink-0"
                >
                  Bật Autoplay ngay
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4">
            {heroSlides.map((slide, index) => {
              const isFirst = index === 0;
              const isLast = index === heroSlides.length - 1;
              const isEnabled = slide.enabled !== false;

              return (
                <div
                  key={slide.id}
                  className={`bg-white rounded-2xl border p-4 transition-all hover:shadow-md flex flex-col md:flex-row items-start md:items-center gap-4 ${
                    isEnabled ? "border-neutral-200" : "border-neutral-200 bg-neutral-50/70 opacity-70"
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative w-full md:w-56 h-32 rounded-xl overflow-hidden bg-neutral-900 shrink-0 group border border-neutral-200">
                    <img
                      src={slide.desktopImage}
                      alt={slide.altText || slide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {slide.overlayEnabled !== false && (
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundColor: slide.overlayColor || '#000000',
                          opacity: (slide.overlayOpacity ?? 40) / 100,
                        }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2 z-10">
                      <span className="text-[10px] text-white/90 font-mono truncate">
                        Slide #{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {slide.badge}
                      </span>
                      <span className="text-xs text-neutral-400 font-mono">ID: {slide.id}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-100 text-neutral-700 border border-neutral-200">
                        Độ tối: {slide.overlayEnabled === false ? "Tắt (Sáng 100%)" : `${slide.overlayOpacity ?? 40}%`}
                      </span>
                      {!isEnabled && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-200 text-neutral-600">
                          Tạm ẩn
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-neutral-900 line-clamp-1 font-heading">
                      {slide.title}
                    </h4>

                    <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                      {slide.subtitle}
                    </p>

                    <div className="flex items-center gap-3 pt-1 text-xs text-neutral-600">
                      <span className="font-medium text-emerald-800">CTA: "{slide.ctaText}"</span>
                      <span className="text-neutral-400 font-mono text-[11px] truncate max-w-xs">&rarr; {slide.ctaLink}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex md:flex-col items-center justify-end gap-1.5 shrink-0 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-neutral-100">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={isFirst}
                        onClick={() => handleMoveSlide(index, "up")}
                        className="p-1.5 rounded-lg text-neutral-500 hover:text-emerald-700 hover:bg-neutral-100 disabled:opacity-30 transition"
                        title="Di chuyển lên"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        disabled={isLast}
                        onClick={() => handleMoveSlide(index, "down")}
                        className="p-1.5 rounded-lg text-neutral-500 hover:text-emerald-700 hover:bg-neutral-100 disabled:opacity-30 transition"
                        title="Di chuyển xuống"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => duplicateSlide(slide.id)}
                        className="p-1.5 rounded-lg text-neutral-600 hover:text-purple-700 hover:bg-purple-50 transition"
                        title="Nhân bản slide này"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditingSlide({ ...slide })}
                        className="p-1.5 rounded-lg text-neutral-600 hover:text-blue-700 hover:bg-blue-50 transition"
                        title="Chỉnh sửa slide"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(slide.id)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition"
                        title="Xóa slide"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Side Banners List */}
      {activeSubTab === "sideBanners" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sideBanners.map((banner, index) => (
            <div
              key={banner.id}
              className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-3"
            >
              <div className="relative h-44 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-200">
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                {banner.overlayEnabled !== false && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundColor: banner.overlayColor || '#000000',
                      opacity: (banner.overlayOpacity ?? 45) / 100,
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 flex flex-col justify-end text-white z-10">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-300">
                    {banner.tag}
                  </span>
                  <h4 className="text-sm font-bold mt-0.5 font-heading">{banner.title}</h4>
                  <p className="text-xs text-neutral-200 mt-1 line-clamp-1">{banner.desc}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-700">Vị trí: Banner phụ #{index + 1}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-100 text-neutral-700 border border-neutral-200">
                      Độ tối: {banner.overlayEnabled === false ? "Tắt" : `${banner.overlayOpacity ?? 45}%`}
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-400 font-mono">Link: {banner.ctaLink}</div>
                </div>

                <button
                  type="button"
                  onClick={() => setEditingSideBanner({ ...banner })}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Sửa banner</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Slide Modal with Live Preview */}
      {editingSlide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8 overflow-hidden border border-neutral-200">
            <form onSubmit={handleSaveSlideSubmit}>
              <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-neutral-900 font-heading">
                    Chỉnh sửa Banner Slide: {editingSlide.title}
                  </h3>
                  <span className="text-xs text-neutral-400 font-mono">ID: {editingSlide.id}</span>
                </div>

                <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setPreviewDevice("desktop")}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg transition font-medium ${
                      previewDevice === "desktop" ? "bg-white text-emerald-800 shadow-xs font-bold" : "text-neutral-600"
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Desktop</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice("mobile")}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg transition font-medium ${
                      previewDevice === "mobile" ? "bg-white text-emerald-800 shadow-xs font-bold" : "text-neutral-600"
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile</span>
                  </button>
                </div>
              </div>

              {/* Live Preview Box */}
              <div className="p-4 bg-neutral-900/90 border-b border-neutral-800 flex justify-center">
                <div
                  className={`transition-all duration-300 relative rounded-xl overflow-hidden shadow-lg border border-neutral-700 ${
                    previewDevice === "desktop" ? "w-full max-w-2xl h-44" : "w-64 h-52"
                  }`}
                >
                  <img
                    src={previewDevice === "desktop" ? editingSlide.desktopImage : (editingSlide.mobileImage || editingSlide.desktopImage)}
                    alt={editingSlide.altText || "Preview"}
                    className="w-full h-full object-cover"
                  />
                  {editingSlide.overlayEnabled !== false && (
                    <div
                      className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                      style={{
                        backgroundColor: editingSlide.overlayColor || '#000000',
                        opacity: (editingSlide.overlayOpacity ?? 40) / 100
                      }}
                    />
                  )}
                  {editingSlide.overlayEnabled !== false && (editingSlide.overlayOpacity ?? 40) > 0 && (
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/20 to-transparent lg:bg-gradient-to-r lg:from-slate-950/60 lg:via-slate-950/15 lg:to-transparent pointer-events-none" />
                  )}
                  <div className="absolute inset-0 flex flex-col justify-center p-4 text-white z-10">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white w-max mb-1">
                      {editingSlide.badge}
                    </span>
                    <h4 className="text-sm font-bold font-heading line-clamp-1">{editingSlide.title}</h4>
                    <p className="text-[11px] text-neutral-200 line-clamp-2 mt-0.5">{editingSlide.subtitle}</p>
                    <div className="mt-2">
                      <span className="inline-block px-3 py-1 text-[10px] font-bold bg-white text-neutral-900 rounded-lg">
                        {editingSlide.ctaText} &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="p-6 space-y-4 max-h-[50vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Nhãn nhỏ (Badge)
                    </label>
                    <input
                      type="text"
                      value={editingSlide.badge}
                      onChange={(e) => setEditingSlide({ ...editingSlide, badge: e.target.value })}
                      required
                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Văn bản thay thế (Alt Text SEO)
                    </label>
                    <input
                      type="text"
                      value={editingSlide.altText || ""}
                      onChange={(e) => setEditingSlide({ ...editingSlide, altText: e.target.value })}
                      placeholder="Banner phòng khám Lạc's Beauty Center"
                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Tiêu đề chính banner
                  </label>
                  <input
                    type="text"
                    value={editingSlide.title}
                    onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden font-heading"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Mô tả / Phụ đề
                  </label>
                  <textarea
                    rows={2}
                    value={editingSlide.subtitle}
                    onChange={(e) => setEditingSlide({ ...editingSlide, subtitle: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden resize-none"
                  />
                </div>

                {/* Images */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-100">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                        Ảnh Desktop (1600x600)
                      </label>
                      <button
                        type="button"
                        onClick={() => setMediaPickerTarget("desktop")}
                        className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Thư viện Media</span>
                      </button>
                    </div>
                    <input
                      type="url"
                      value={editingSlide.desktopImage}
                      onChange={(e) => setEditingSlide({ ...editingSlide, desktopImage: e.target.value })}
                      required
                      placeholder="https://..."
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden font-mono"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                        Ảnh Mobile (750x450)
                      </label>
                      <button
                        type="button"
                        onClick={() => setMediaPickerTarget("mobile")}
                        className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Thư viện Media</span>
                      </button>
                    </div>
                    <input
                      type="url"
                      value={editingSlide.mobileImage}
                      onChange={(e) => setEditingSlide({ ...editingSlide, mobileImage: e.target.value })}
                      placeholder="Để trống sẽ dùng ảnh desktop"
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden font-mono"
                    />
                  </div>
                </div>

                {/* CTAs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-100">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Nhãn nút CTA 1
                    </label>
                    <input
                      type="text"
                      value={editingSlide.ctaText}
                      onChange={(e) => setEditingSlide({ ...editingSlide, ctaText: e.target.value })}
                      required
                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Đường dẫn URL CTA 1
                    </label>
                    <input
                      type="text"
                      value={editingSlide.ctaLink}
                      onChange={(e) => setEditingSlide({ ...editingSlide, ctaLink: e.target.value })}
                      required
                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Overlay & Brightness Controls */}
                <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-700" />
                      <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                        Độ tối & Lớp phủ ảnh (Overlay)
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <label className="text-xs font-medium text-neutral-700 cursor-pointer flex items-center gap-1.5">
                        <input
                          type="checkbox"
                          checked={editingSlide.overlayEnabled !== false}
                          onChange={(e) => setEditingSlide({ ...editingSlide, overlayEnabled: e.target.checked })}
                          className="w-4 h-4 text-emerald-600 rounded border-neutral-300 focus:ring-emerald-500"
                        />
                        <span>Bật lớp phủ</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setEditingSlide({
                          ...editingSlide,
                          overlayEnabled: true,
                          overlayColor: '#000000',
                          overlayOpacity: 40
                        })}
                        className="text-[11px] text-emerald-700 hover:text-emerald-900 underline font-medium"
                      >
                        Đặt lại mặc định
                      </button>
                    </div>
                  </div>

                  {editingSlide.overlayEnabled !== false ? (
                    <div className="space-y-3 pt-2 border-t border-neutral-200">
                      {/* Slider + Number Input */}
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <label className="font-semibold text-neutral-700">
                            Độ mờ lớp phủ (Độ tối): <span className="text-emerald-700 font-bold font-mono">{editingSlide.overlayOpacity ?? 40}%</span>
                          </label>
                          <span className="text-[11px] text-neutral-400">
                            {(editingSlide.overlayOpacity ?? 40) === 0
                              ? "0% (Sáng gốc - Không lớp phủ)"
                              : (editingSlide.overlayOpacity ?? 40) <= 30
                              ? "Sáng nhẹ"
                              : (editingSlide.overlayOpacity ?? 40) <= 50
                              ? "Tiêu chuẩn (Khuyến nghị)"
                              : "Tối đậm (Tương phản cao)"}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min="0"
                            max="80"
                            step="1"
                            value={editingSlide.overlayOpacity ?? 40}
                            onChange={(e) => setEditingSlide({ ...editingSlide, overlayOpacity: parseInt(e.target.value, 10) })}
                            className="flex-1 h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                          />
                          <input
                            type="number"
                            min="0"
                            max="80"
                            value={editingSlide.overlayOpacity ?? 40}
                            onChange={(e) => {
                              const val = Math.min(80, Math.max(0, parseInt(e.target.value, 10) || 0));
                              setEditingSlide({ ...editingSlide, overlayOpacity: val });
                            }}
                            className="w-16 px-2 py-1 text-xs text-center border border-neutral-300 rounded-lg font-mono font-bold"
                          />
                          <span className="text-xs text-neutral-500 font-bold">%</span>
                        </div>
                      </div>

                      {/* Presets and Color Picker */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                        <div className="flex items-center gap-1.5 text-[11px]">
                          <span className="text-neutral-500">Mức nhanh:</span>
                          {[
                            { label: "0% Sáng", val: 0 },
                            { label: "25% Nhẹ", val: 25 },
                            { label: "40% Chuẩn", val: 40 },
                            { label: "60% Tối", val: 60 },
                            { label: "80% Rất tối", val: 80 }
                          ].map((p) => (
                            <button
                              key={p.val}
                              type="button"
                              onClick={() => setEditingSlide({ ...editingSlide, overlayOpacity: p.val })}
                              className={`px-2 py-0.5 rounded text-[10px] font-medium border transition ${
                                (editingSlide.overlayOpacity ?? 40) === p.val
                                  ? "bg-emerald-700 text-white border-emerald-700 font-bold"
                                  : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100"
                              }`}
                            >
                              {p.label}
                            </button>
                          ))}
                        </div>

                        {/* Color Picker */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-neutral-600">Màu phủ:</span>
                          <input
                            type="color"
                            value={editingSlide.overlayColor || '#000000'}
                            onChange={(e) => setEditingSlide({ ...editingSlide, overlayColor: e.target.value })}
                            className="w-7 h-7 rounded-lg border border-neutral-300 cursor-pointer p-0.5"
                          />
                          <input
                            type="text"
                            value={editingSlide.overlayColor || '#000000'}
                            onChange={(e) => setEditingSlide({ ...editingSlide, overlayColor: e.target.value })}
                            className="w-20 px-2 py-1 text-[11px] font-mono border border-neutral-300 rounded-lg uppercase"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-400 italic">
                      Lớp phủ đang tắt. Ảnh sẽ hiển thị độ sáng nguyên bản không bị tối.
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="slideEnabledCheck"
                    checked={editingSlide.enabled !== false}
                    onChange={(e) => setEditingSlide({ ...editingSlide, enabled: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded border-neutral-300 focus:ring-emerald-500"
                  />
                  <label htmlFor="slideEnabledCheck" className="text-xs font-medium text-neutral-800 cursor-pointer">
                    Bật hiển thị slide này trong slider trang chủ
                  </label>
                </div>
              </div>

              <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingSlide(null)}
                  className="px-4 py-2 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-100 transition"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition"
                >
                  Lưu thay đổi Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Side Banner Modal */}
      {editingSideBanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-neutral-200">
            <form onSubmit={handleSaveSideBannerSubmit}>
              <div className="p-5 border-b border-neutral-200">
                <h3 className="text-base font-bold text-neutral-900 font-heading">
                  Chỉnh sửa Banner phụ: {editingSideBanner.title}
                </h3>
                <span className="text-xs text-neutral-400 font-mono">ID: {editingSideBanner.id}</span>
              </div>

              {/* Side Banner Live Preview Box */}
              <div className="p-4 bg-neutral-900 border-b border-neutral-800 flex justify-center">
                <div className="relative w-full max-w-sm h-36 rounded-xl overflow-hidden border border-neutral-700 shadow-md">
                  <img
                    src={editingSideBanner.imageUrl || '/images/fallback-clinic.svg'}
                    alt={editingSideBanner.title}
                    className="w-full h-full object-cover"
                  />
                  {editingSideBanner.overlayEnabled !== false && (
                    <div
                      className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                      style={{
                        backgroundColor: editingSideBanner.overlayColor || '#000000',
                        opacity: (editingSideBanner.overlayOpacity ?? 45) / 100
                      }}
                    />
                  )}
                  {editingSideBanner.overlayEnabled !== false && (editingSideBanner.overlayOpacity ?? 45) > 0 && (
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/20 to-transparent pointer-events-none" />
                  )}
                  <div className="absolute inset-0 flex flex-col justify-end p-3 text-white z-10">
                    <span className="text-[9px] font-bold tracking-wider uppercase text-emerald-300 bg-emerald-950/70 px-2 py-0.5 rounded-full w-max mb-1">
                      {editingSideBanner.tag || 'Tag'}
                    </span>
                    <h4 className="text-xs font-bold line-clamp-1">{editingSideBanner.title || 'Tiêu đề'}</h4>
                    <p className="text-[10px] text-neutral-300 line-clamp-1">{editingSideBanner.desc}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Nhãn Tag nổi bật
                  </label>
                  <input
                    type="text"
                    value={editingSideBanner.tag}
                    onChange={(e) => setEditingSideBanner({ ...editingSideBanner, tag: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Tiêu đề
                  </label>
                  <input
                    type="text"
                    value={editingSideBanner.title}
                    onChange={(e) => setEditingSideBanner({ ...editingSideBanner, title: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Mô tả
                  </label>
                  <textarea
                    rows={2}
                    value={editingSideBanner.desc}
                    onChange={(e) => setEditingSideBanner({ ...editingSideBanner, desc: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden resize-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                      Ảnh Banner phụ
                    </label>
                    <button
                      type="button"
                      onClick={() => setMediaPickerTarget("side")}
                      className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Thư viện Media</span>
                    </button>
                  </div>
                  <input
                    type="url"
                    value={editingSideBanner.imageUrl}
                    onChange={(e) => setEditingSideBanner({ ...editingSideBanner, imageUrl: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Nút bấm CTA
                    </label>
                    <input
                      type="text"
                      value={editingSideBanner.ctaText}
                      onChange={(e) => setEditingSideBanner({ ...editingSideBanner, ctaText: e.target.value })}
                      required
                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      URL liên kết
                    </label>
                    <input
                      type="text"
                      value={editingSideBanner.ctaLink}
                      onChange={(e) => setEditingSideBanner({ ...editingSideBanner, ctaLink: e.target.value })}
                      required
                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Overlay & Brightness Controls */}
                <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                        Độ tối & Lớp phủ ảnh (Overlay)
                      </h4>
                      <p className="text-[11px] text-neutral-500">
                        Chỉnh lớp phủ tối giúp chữ màu trắng nổi bật, hoặc giảm độ tối để ảnh sáng rõ hơn.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingSideBanner.overlayEnabled !== false}
                        onChange={(e) => setEditingSideBanner({ ...editingSideBanner, overlayEnabled: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-neutral-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>

                  {editingSideBanner.overlayEnabled !== false ? (
                    <div className="space-y-3 pt-2 border-t border-neutral-200">
                      {/* Opacity slider & number input */}
                      <div>
                        <div className="flex items-center justify-between text-xs font-medium text-neutral-700 mb-1">
                          <span>Độ mờ lớp phủ (0% = Sáng nhất, 80% = Tối nhất)</span>
                          <span className="font-bold text-emerald-700 font-mono text-sm">
                            {editingSideBanner.overlayOpacity ?? 45}%
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min="0"
                            max="80"
                            step="5"
                            value={editingSideBanner.overlayOpacity ?? 45}
                            onChange={(e) =>
                              setEditingSideBanner({ ...editingSideBanner, overlayOpacity: Number(e.target.value) })
                            }
                            className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                          />
                          <input
                            type="number"
                            min="0"
                            max="80"
                            value={editingSideBanner.overlayOpacity ?? 45}
                            onChange={(e) => {
                              const val = Math.max(0, Math.min(80, Number(e.target.value) || 0));
                              setEditingSideBanner({ ...editingSideBanner, overlayOpacity: val });
                            }}
                            className="w-14 px-2 py-1 text-xs border border-neutral-300 rounded-lg text-center font-mono font-bold"
                          />
                        </div>
                      </div>

                      {/* Presets and Color Picker */}
                      <div className="flex items-center justify-between pt-1">
                        {/* Quick Presets */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-neutral-500 font-medium">Mức mẫu:</span>
                          {[
                            { label: "Sáng (0%)", val: 0 },
                            { label: "Nhẹ (25%)", val: 25 },
                            { label: "Vừa (45%)", val: 45 },
                            { label: "Đậm (70%)", val: 70 },
                          ].map((p) => (
                            <button
                              key={p.val}
                              type="button"
                              onClick={() => setEditingSideBanner({ ...editingSideBanner, overlayOpacity: p.val })}
                              className={`px-2 py-0.5 rounded text-[10px] font-medium border transition ${
                                (editingSideBanner.overlayOpacity ?? 45) === p.val
                                  ? "bg-emerald-700 text-white border-emerald-700 font-bold"
                                  : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100"
                              }`}
                            >
                              {p.label}
                            </button>
                          ))}
                        </div>

                        {/* Color Picker */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-neutral-600">Màu:</span>
                          <input
                            type="color"
                            value={editingSideBanner.overlayColor || '#000000'}
                            onChange={(e) => setEditingSideBanner({ ...editingSideBanner, overlayColor: e.target.value })}
                            className="w-7 h-7 rounded-lg border border-neutral-300 cursor-pointer p-0.5"
                          />
                          <input
                            type="text"
                            value={editingSideBanner.overlayColor || '#000000'}
                            onChange={(e) => setEditingSideBanner({ ...editingSideBanner, overlayColor: e.target.value })}
                            className="w-20 px-2 py-1 text-[11px] font-mono border border-neutral-300 rounded-lg uppercase"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-400 italic">
                      Lớp phủ đang tắt. Ảnh sẽ hiển thị độ sáng nguyên bản không bị tối.
                    </p>
                  )}
                </div>
              </div>

              <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingSideBanner(null)}
                  className="px-4 py-2 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-100 transition"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition"
                >
                  Lưu banner phụ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!deleteConfirmId}
        type="danger"
        title="Xóa Hero Slide này?"
        message="Hành động này sẽ xóa vĩnh viễn slide khỏi danh sách trình chiếu trên trang chủ website."
        confirmLabel="Xóa Slide"
        cancelLabel="Hủy bỏ"
        onConfirm={() => {
          if (deleteConfirmId) {
            deleteSlide(deleteConfirmId);
            setDeleteConfirmId(null);
            showToast("Đã xóa slide thành công!");
          }
        }}
        onCancel={() => setDeleteConfirmId(null)}
      />

      {/* Media Picker Modal */}
      <MediaLibraryModal
        isOpen={!!mediaPickerTarget}
        onClose={() => setMediaPickerTarget(null)}
        onSelectMedia={(media) => {
          if (mediaPickerTarget === "desktop" && editingSlide) {
            setEditingSlide({ ...editingSlide, desktopImage: media.url, altText: editingSlide.altText || media.alt });
          } else if (mediaPickerTarget === "mobile" && editingSlide) {
            setEditingSlide({ ...editingSlide, mobileImage: media.url });
          } else if (mediaPickerTarget === "side" && editingSideBanner) {
            setEditingSideBanner({ ...editingSideBanner, imageUrl: media.url });
          }
          setMediaPickerTarget(null);
        }}
        title="Chọn ảnh Banner từ Thư viện Media"
      />
    </div>
  );
};

// Interactive Mini Preview Component to test slide timing & visual rhythm
const MiniSliderPreview: React.FC<{
  slides: SlideItem[];
  interval: number;
  autoplay: boolean;
}> = ({ slides, interval, autoplay }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
  }, [activeIdx, interval]);

  useEffect(() => {
    if (!autoplay || slides.length <= 1) {
      setProgress(0);
      return;
    }

    const stepMs = 50;
    const totalMs = interval * 1000;
    const progressPerStep = (stepMs / totalMs) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + progressPerStep >= 100) {
          setActiveIdx((curr) => (curr + 1) % slides.length);
          return 0;
        }
        return prev + progressPerStep;
      });
    }, stepMs);

    return () => clearInterval(timer);
  }, [autoplay, interval, slides.length]);

  if (!slides.length) {
    return (
      <div className="h-28 flex items-center justify-center text-xs text-neutral-400 bg-neutral-950 rounded-xl border border-neutral-800">
        Chưa có slide nào được kích hoạt
      </div>
    );
  }

  const current = slides[activeIdx % slides.length];

  return (
    <div className="relative h-28 rounded-xl overflow-hidden border border-neutral-700 bg-neutral-950 shadow-inner group">
      <img
        src={current.desktopImage}
        alt={current.title}
        className="w-full h-full object-cover transition-opacity duration-500"
      />
      {current.overlayEnabled !== false && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: current.overlayColor || '#000000',
            opacity: (current.overlayOpacity ?? 40) / 100
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-2.5 z-10 text-white">
        <span className="text-[9px] font-bold tracking-wider uppercase text-emerald-300 truncate">
          {current.badge}
        </span>
        <span className="text-xs font-bold line-clamp-1">{current.title}</span>
      </div>

      {/* Progress bar countdown at bottom */}
      {autoplay && slides.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
          <div
            className="h-full bg-emerald-500 transition-all duration-75"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
      )}

      {/* Counter badge and manual controls in preview */}
      <div className="absolute top-1.5 right-1.5 z-20 flex items-center gap-1">
        <button
          type="button"
          onClick={() => setActiveIdx((curr) => (curr === 0 ? slides.length - 1 : curr - 1))}
          className="w-5 h-5 rounded bg-black/60 hover:bg-black/90 text-white flex items-center justify-center text-[11px] font-bold"
          title="Slide trước"
        >
          ‹
        </button>
        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-black/70 text-emerald-300 border border-neutral-700">
          {(activeIdx % slides.length) + 1}/{slides.length}
        </span>
        <button
          type="button"
          onClick={() => setActiveIdx((curr) => (curr + 1) % slides.length)}
          className="w-5 h-5 rounded bg-black/60 hover:bg-black/90 text-white flex items-center justify-center text-[11px] font-bold"
          title="Slide tiếp"
        >
          ›
        </button>
      </div>
    </div>
  );
};

