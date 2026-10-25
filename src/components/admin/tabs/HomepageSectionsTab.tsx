import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Layers,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Edit,
  Save,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  Plus,
  Trash2,
  Image as ImageIcon,
  Sparkles,
  Award,
  Shield,
  HeartHandshake,
  GraduationCap,
  Stethoscope,
  Cpu,
  Fingerprint,
  ShieldCheck,
  Link as LinkIcon,
  Tag,
  Check,
  AlertCircle
} from "lucide-react";
import { useDemoData } from "../../../context/DemoDataContext";
import { HomepageModuleConfig } from "../../../data/homepageModules";
import { CoreValue } from "../../../data/coreValues";
import { AboutFocusCard, AboutSectionConfig } from "../../../data/siteConfig";
import { ConfirmationModal } from "../ConfirmationModal";
import { MediaLibraryModal } from "../MediaLibraryModal";

const ICON_OPTIONS = [
  { value: "Award", label: "Huy hiệu (Award)" },
  { value: "ShieldCheck", label: "Khiên bảo vệ (ShieldCheck)" },
  { value: "Shield", label: "Khiên y khoa (Shield)" },
  { value: "HeartHandshake", label: "Trái tim tận tâm (HeartHandshake)" },
  { value: "GraduationCap", label: "Mũ bác sĩ (GraduationCap)" },
  { value: "Sparkles", label: "Lấp lánh (Sparkles)" },
  { value: "Stethoscope", label: "Ống nghe y khoa (Stethoscope)" },
  { value: "Cpu", label: "Công nghệ cao (Cpu)" },
  { value: "Fingerprint", label: "Cá nhân hóa (Fingerprint)" },
  { value: "CheckCircle2", label: "Dấu tích chuẩn (CheckCircle2)" }
];

export const HomepageSectionsTab: React.FC = () => {
  const {
    homepageModules,
    toggleHomepageModule,
    reorderHomepageModules,
    updateHomepageModule,
    coreValues,
    saveCoreValue,
    deleteCoreValue,
    updateCoreValues,
    siteConfig,
    updateSiteConfig,
    resetToDefaults
  } = useDemoData();

  const [activeSubTab, setActiveSubTab] = useState<"layout" | "section-a" | "section-b">("layout");

  // Layout module editing
  const [editingModule, setEditingModule] = useState<HomepageModuleConfig | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Section A: Core Values state
  const [editingValue, setEditingValue] = useState<CoreValue | null>(null);
  const [deleteValueId, setDeleteValueId] = useState<string | null>(null);
  const [mediaPickerForValue, setMediaPickerForValue] = useState(false);

  // Section B: About Summary state
  const aboutConfig = siteConfig.aboutConfig || {};
  const [aboutForm, setAboutForm] = useState<AboutSectionConfig>({
    enabled: aboutConfig.enabled !== false,
    sectionBadge: aboutConfig.sectionBadge || aboutConfig.badge || "VỀ CHÚNG TÔI",
    heading: aboutConfig.heading || aboutConfig.title || siteConfig.facilityName || "Phòng khám Chuyên khoa Da liễu Lạc's Beauty Center",
    description: aboutConfig.description || "",
    mainImage: aboutConfig.mainImage || "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
    subImages: aboutConfig.subImages?.length ? [...aboutConfig.subImages] : [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80"
    ],
    statNumber: aboutConfig.statNumber || aboutConfig.metricNumber || "10.000+",
    statLabel: aboutConfig.statLabel || aboutConfig.metricLabel || "Ca điều trị chuẩn Y khoa",
    techBadge: aboutConfig.techBadge || aboutConfig.metricBadge || "VISIA 3D",
    cta1Text: aboutConfig.cta1Text || aboutConfig.ctaText || "Xem câu chuyện thương hiệu",
    cta1Url: aboutConfig.cta1Url || aboutConfig.cta1Link || aboutConfig.ctaLink || "/gioi-thieu",
    cta1Enabled: aboutConfig.cta1Enabled !== false,
    cta2Text: aboutConfig.cta2Text || "Hồ sơ Bác sĩ",
    cta2Url: aboutConfig.cta2Url || aboutConfig.cta2Link || "/doi-ngu-bac-si",
    cta2Enabled: aboutConfig.cta2Enabled !== false,
    focusCards: aboutConfig.focusCards?.length ? [...aboutConfig.focusCards] : [
      {
        id: "focus-1",
        iconName: "Award",
        title: "Đội ngũ Chuyên môn Sau Đại học",
        description: "100% bác sĩ có học vị Thạc sĩ, Bác sĩ Chuyên khoa I & II giàu kinh nghiệm, trực tiếp khám và lên phác đồ.",
        enabled: true,
        order: 1
      },
      {
        id: "focus-2",
        iconName: "Shield",
        title: "Công nghệ Tiên tiến & Minh bạch",
        description: "Đơn vị sở hữu máy soi da VISIA 3D đầu tiên tại Việt Nam, máy nâng cơ RF Jovena, HIFU và Laser nhập khẩu chính hãng.",
        enabled: true,
        order: 2
      },
      {
        id: "focus-3",
        iconName: "HeartHandshake",
        title: "Không gian Chuẩn Y khoa & Tận tâm",
        description: "Hệ thống 2 cơ sở khang trang, phòng thủ thuật vô trùng khép kín và phong cách phục vụ chu đáo, gần gũi với người miền Tây.",
        enabled: true,
        order: 3
      }
    ]
  });

  // Media Picker state for About section
  const [aboutMediaTarget, setAboutMediaTarget] = useState<"main" | "sub-0" | "sub-1" | "sub-2" | "focusCard" | null>(null);
  const [editingFocusCard, setEditingFocusCard] = useState<AboutFocusCard | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Reorder modules
  const handleMoveModule = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= homepageModules.length) return;

    const list = [...homepageModules];
    const [moved] = list.splice(index, 1);
    list.splice(targetIndex, 0, moved);

    const updated = list.map((item, idx) => ({ ...item, order: idx + 1 }));
    const res = await reorderHomepageModules(updated);
    if (res.success) {
      showToast(`Đã di chuyển section "${moved.name.split("–")[0]}" ${direction === "up" ? "lên" : "xuống"}!`);
    }
  };

  // Reorder Core Values
  const handleMoveCoreValue = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= coreValues.length) return;

    const list = [...coreValues];
    const [moved] = list.splice(index, 1);
    list.splice(targetIndex, 0, moved);

    const updated = list.map((item, idx) => ({ ...item, order: idx + 1 }));
    const res = await updateCoreValues(updated);
    if (res.success) {
      showToast(`Đã đổi thứ tự thẻ "${moved.title}"!`);
    }
  };

  // Save Core Value item
  const handleSaveCoreValue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingValue || !editingValue.title.trim()) return;

    const valueToSave: CoreValue = {
      ...editingValue,
      order: editingValue.order || coreValues.length + 1
    };

    setIsSaving(true);
    const res = await saveCoreValue(valueToSave);
    setIsSaving(false);
    if (res.success) {
      showToast(`Đã lưu thẻ giá trị "${valueToSave.title}" lên hệ thống và Neon DB!`);
      setEditingValue(null);
    } else {
      alert("Lỗi khi lưu thẻ giá trị: " + (res.error || "Không thể kết nối đến cơ sở dữ liệu"));
    }
  };

  // Save About Section Config
  const handleSaveAboutConfig = async () => {
    const updatedAbout: AboutSectionConfig = {
      ...aboutForm,
      badge: aboutForm.sectionBadge,
      title: aboutForm.heading,
      metricNumber: aboutForm.statNumber,
      metricLabel: aboutForm.statLabel,
      metricBadge: aboutForm.techBadge,
      ctaText: aboutForm.cta1Text,
      ctaLink: aboutForm.cta1Url,
      cta1Link: aboutForm.cta1Url,
      cta2Link: aboutForm.cta2Url
    };

    setIsSaving(true);
    const res = await updateSiteConfig({
      aboutConfig: updatedAbout
    });
    setIsSaving(false);
    if (res.success) {
      showToast("Đã lưu toàn bộ cấu hình Section Về Chúng Tôi lên Neon PostgreSQL!");
    } else {
      alert("Lỗi khi lưu cấu hình Về Chúng Tôi: " + (res.error || "Không thể kết nối đến cơ sở dữ liệu"));
    }
  };

  // Render preview icon helper
  const renderPreviewIcon = (iconName: string, imageUrl?: string) => {
    if (imageUrl) {
      return <img src={imageUrl} alt="" className="w-5 h-5 object-contain rounded" />;
    }
    switch (iconName) {
      case "Award": return <Award className="w-5 h-5 text-emerald-700" />;
      case "ShieldCheck": return <ShieldCheck className="w-5 h-5 text-emerald-700" />;
      case "Shield": return <Shield className="w-5 h-5 text-emerald-700" />;
      case "HeartHandshake": return <HeartHandshake className="w-5 h-5 text-emerald-700" />;
      case "GraduationCap": return <GraduationCap className="w-5 h-5 text-emerald-700" />;
      case "Sparkles": return <Sparkles className="w-5 h-5 text-emerald-700" />;
      case "Stethoscope": return <Stethoscope className="w-5 h-5 text-emerald-700" />;
      case "Cpu": return <Cpu className="w-5 h-5 text-emerald-700" />;
      case "Fingerprint": return <Fingerprint className="w-5 h-5 text-emerald-700" />;
      default: return <ShieldCheck className="w-5 h-5 text-emerald-700" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-neutral-900 font-heading flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-700" />
            <span>Quản trị CMS Trang chủ & Các Section</span>
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl leading-relaxed">
            Quản trị bố cục 12 section tổng thể cùng trình biên tập nội dung chuyên sâu cho Section A (4 Giá trị cốt lõi) và Section B (Về chúng tôi & VISIA 3D). Mọi thay đổi đồng bộ trực tiếp lên Neon PostgreSQL.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Xem Trang chủ Live</span>
          </Link>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveSubTab("layout")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeSubTab === "layout"
              ? "bg-emerald-800 text-white shadow-xs"
              : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Bố cục 12 Section</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("section-a")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeSubTab === "section-a"
              ? "bg-emerald-800 text-white shadow-xs"
              : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Section A: 4 Thẻ Giá Trị Cốt Lõi ({coreValues.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("section-b")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeSubTab === "section-b"
              ? "bg-emerald-800 text-white shadow-xs"
              : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Section B: Về Chúng Tôi (About Summary)</span>
        </button>
      </div>

      {/* Toast Notice */}
      {toastMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-fadeIn font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* SUB-TAB 1: 12 SECTIONS LAYOUT */}
      {activeSubTab === "layout" && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
            <div className="p-4 bg-neutral-50/70 border-b border-neutral-200 flex items-center justify-between text-xs font-semibold text-neutral-600">
              <span>Danh sách 12 Section Trang chủ ({homepageModules.filter((m) => m.enabled).length} đang bật)</span>
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="text-neutral-500 hover:text-red-600 text-xs flex items-center gap-1 transition"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Đặt lại thứ tự gốc</span>
              </button>
            </div>

            <div className="divide-y divide-neutral-200">
              {homepageModules.map((item, index) => {
                const isFirst = index === 0;
                const isLast = index === homepageModules.length - 1;

                return (
                  <div
                    key={item.id}
                    className={`p-4 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      item.enabled ? "bg-white hover:bg-neutral-50/50" : "bg-neutral-50/60 opacity-70"
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-3 min-w-0">
                      <div className="flex flex-col items-center justify-center w-8 h-8 rounded-xl bg-neutral-100 font-extrabold text-neutral-700 text-xs shrink-0 border border-neutral-200 font-mono">
                        {index + 1}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-bold text-neutral-900 truncate">
                            {item.customTitle || item.name}
                          </h4>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            {item.themeMapping}
                          </span>
                          {!item.enabled && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-200 text-neutral-600">
                              Đã ẩn
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">
                          {item.customSubtitle || item.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                      <button
                        type="button"
                        disabled={isFirst}
                        onClick={() => handleMoveModule(index, "up")}
                        className="p-1.5 rounded-lg text-neutral-500 hover:text-emerald-700 hover:bg-neutral-100 disabled:opacity-30 disabled:hover:bg-transparent transition"
                        title="Di chuyển lên trên"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        disabled={isLast}
                        onClick={() => handleMoveModule(index, "down")}
                        className="p-1.5 rounded-lg text-neutral-500 hover:text-emerald-700 hover:bg-neutral-100 disabled:opacity-30 disabled:hover:bg-transparent transition"
                        title="Di chuyển xuống dưới"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>

                      <div className="w-px h-4 bg-neutral-200 mx-1" />

                      <button
                        type="button"
                        onClick={() => setEditingModule({ ...item })}
                        className="p-1.5 rounded-lg text-neutral-600 hover:text-blue-700 hover:bg-blue-50 transition"
                        title="Chỉnh sửa tiêu đề"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          toggleHomepageModule(item.id);
                          showToast(`Đã cập nhật trạng thái của section "${item.name.split("–")[0]}"!`);
                        }}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                          item.enabled
                            ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-neutral-200 hover:bg-neutral-300 text-neutral-700"
                        }`}
                      >
                        {item.enabled ? (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>Đang bật</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>Đã ẩn</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: SECTION A — 4 THẺ GIÁ TRỊ CỐT LÕI */}
      {activeSubTab === "section-a" && (
        <div className="space-y-6">
          <div className="bg-emerald-50/60 border border-emerald-200/70 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-emerald-950 font-heading">
                Quản lý Section A: 4 Thẻ Giá Trị Thương Hiệu
              </h3>
              <p className="text-xs text-emerald-800 mt-0.5">
                Các thẻ giá trị y khoa hiển thị ngay dưới Hero Slider. Admin có toàn quyền thêm thẻ, sửa tiêu đề, mô tả, chọn icon/ảnh, gắn nhãn ("Đề xuất"), gắn link và sắp xếp thứ tự.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditingValue({
                  id: `core-${Date.now()}`,
                  title: "",
                  description: "",
                  iconName: "ShieldCheck",
                  badge: "",
                  link: "",
                  enabled: true,
                  order: coreValues.length + 1
                });
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-xs transition shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Thẻ Giá Trị Mới</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coreValues.map((val, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === coreValues.length - 1;

              return (
                <div
                  key={val.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    val.enabled !== false
                      ? "bg-white border-neutral-200 shadow-xs hover:border-emerald-300"
                      : "bg-neutral-50/70 border-neutral-200 opacity-60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                        {renderPreviewIcon(val.iconName, val.imageUrl)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-neutral-400">#{idx + 1}</span>
                          <h4 className="text-sm font-bold text-neutral-900 font-heading">{val.title}</h4>
                        </div>
                        {val.badge && (
                          <span className="inline-block px-2 py-0.5 mt-1 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                            {val.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={isFirst}
                        onClick={() => handleMoveCoreValue(idx, "up")}
                        className="p-1 rounded-lg text-neutral-400 hover:text-emerald-700 hover:bg-neutral-100 disabled:opacity-20"
                        title="Di chuyển sang trái / lên"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={isLast}
                        onClick={() => handleMoveCoreValue(idx, "down")}
                        className="p-1 rounded-lg text-neutral-400 hover:text-emerald-700 hover:bg-neutral-100 disabled:opacity-20"
                        title="Di chuyển sang phải / xuống"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingValue({ ...val })}
                        className="p-1.5 rounded-lg text-neutral-600 hover:text-blue-700 hover:bg-blue-50 transition"
                        title="Chỉnh sửa thẻ"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteValueId(val.id)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-red-700 hover:bg-red-50 transition"
                        title="Xóa thẻ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-600 mt-3 line-clamp-2 leading-relaxed">
                    {val.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                    <span className="flex items-center gap-1 text-[11px] font-mono text-neutral-400 truncate max-w-[200px]">
                      <LinkIcon className="w-3 h-3 shrink-0" />
                      {val.link || "Không điều hướng"}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = { ...val, enabled: val.enabled === false ? true : false };
                        saveCoreValue(updated);
                        showToast(`Đã ${updated.enabled ? "bật" : "tắt"} hiển thị thẻ "${val.title}"!`);
                      }}
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full transition ${
                        val.enabled !== false
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-neutral-200 text-neutral-600"
                      }`}
                    >
                      {val.enabled !== false ? "Đang hiển thị" : "Đã tắt"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: SECTION B — VỀ CHÚNG TÔI (ABOUT SUMMARY) */}
      {activeSubTab === "section-b" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs p-5 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-100 gap-3">
              <div>
                <h3 className="text-base font-bold text-neutral-900 font-heading flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-700" />
                  <span>Cấu hình Section B: Về Chúng Tôi (Giới Thiệu Thương Hiệu)</span>
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Chỉnh sửa toàn bộ hình ảnh, số liệu thực tế ("10.000+"), 3 thẻ thông tin chuyên sâu và 2 nút kêu gọi hành động CTA.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer bg-neutral-50 px-3 py-1.5 rounded-xl border border-neutral-200">
                  <input
                    type="checkbox"
                    checked={aboutForm.enabled !== false}
                    onChange={(e) => setAboutForm({ ...aboutForm, enabled: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded border-neutral-300 focus:ring-emerald-500"
                  />
                  <span className="text-xs font-semibold text-neutral-700">Bật Section này</span>
                </label>

                <button
                  type="button"
                  disabled={isSaving}
                  onClick={handleSaveAboutConfig}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-xs shadow-xs transition"
                >
                  {isSaving ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Đang lưu...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Lưu lên Neon DB</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* General Texts & Narrative */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                  Nhãn Section (Badge nhỏ trên cùng)
                </label>
                <input
                  type="text"
                  value={aboutForm.sectionBadge || ""}
                  onChange={(e) => setAboutForm({ ...aboutForm, sectionBadge: e.target.value })}
                  placeholder="VỀ CHÚNG TÔI"
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                  Tiêu đề Section (Heading)
                </label>
                <input
                  type="text"
                  value={aboutForm.heading || ""}
                  onChange={(e) => setAboutForm({ ...aboutForm, heading: e.target.value })}
                  placeholder="Phòng khám Chuyên khoa Da liễu Lạc's Beauty Center"
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden font-semibold"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                  Nội dung mô tả giới thiệu
                </label>
                <textarea
                  rows={3}
                  value={aboutForm.description || ""}
                  onChange={(e) => setAboutForm({ ...aboutForm, description: e.target.value })}
                  placeholder="Mô tả triết lý y khoa, định vị phòng khám..."
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden resize-none"
                />
              </div>
            </div>

            {/* Images Management */}
            <div className="pt-4 border-t border-neutral-100 space-y-4">
              <h4 className="text-sm font-bold text-neutral-900 font-heading">
                Hình ảnh Section (1 Ảnh lớn + 3 Ảnh phụ hoạt động)
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Main Large Image */}
                <div className="md:col-span-2 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-800">Ảnh chính bên trái</span>
                    <button
                      type="button"
                      onClick={() => setAboutMediaTarget("main")}
                      className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Chọn từ Thư viện</span>
                    </button>
                  </div>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-200 border border-neutral-300 relative group">
                    <img
                      src={aboutForm.mainImage}
                      alt="Ảnh chính"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <input
                    type="text"
                    value={aboutForm.mainImage || ""}
                    onChange={(e) => setAboutForm({ ...aboutForm, mainImage: e.target.value })}
                    placeholder="URL ảnh chính..."
                    className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded-lg font-mono"
                  />
                </div>

                {/* 3 Sub-images */}
                <div className="md:col-span-2 space-y-2">
                  <span className="text-xs font-bold text-neutral-800 block">
                    3 Ảnh nhỏ hoạt động phòng khám
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[0, 1, 2].map((subIdx) => {
                      const img = aboutForm.subImages?.[subIdx] || "";
                      return (
                        <div key={subIdx} className="p-2 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1.5">
                          <div className="aspect-[4/3] rounded-lg overflow-hidden bg-neutral-200 border border-neutral-300 relative">
                            {img ? (
                              <img src={img} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-neutral-400 text-[10px]">
                                Chưa có
                              </div>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => setAboutMediaTarget(`sub-${subIdx}` as any)}
                            className="w-full py-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded border border-emerald-200"
                          >
                            Đổi ảnh #{subIdx + 1}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Bấm "Đổi ảnh" để chọn ảnh lưu trữ vĩnh viễn từ Media Library.
                  </p>
                </div>
              </div>
            </div>

            {/* Metrics & Badges */}
            <div className="pt-4 border-t border-neutral-100 space-y-4">
              <h4 className="text-sm font-bold text-neutral-900 font-heading">
                Số liệu nổi bật & Nhãn công nghệ
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Con số nổi bật (Metric Number)
                  </label>
                  <input
                    type="text"
                    value={aboutForm.statNumber || ""}
                    onChange={(e) => setAboutForm({ ...aboutForm, statNumber: e.target.value })}
                    placeholder="10.000+"
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl font-bold font-heading text-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Nhãn giải thích số liệu
                  </label>
                  <input
                    type="text"
                    value={aboutForm.statLabel || ""}
                    onChange={(e) => setAboutForm({ ...aboutForm, statLabel: e.target.value })}
                    placeholder="Ca điều trị chuẩn Y khoa"
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Nhãn máy / công nghệ đi kèm
                  </label>
                  <input
                    type="text"
                    value={aboutForm.techBadge || ""}
                    onChange={(e) => setAboutForm({ ...aboutForm, techBadge: e.target.value })}
                    placeholder="VISIA 3D"
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl font-mono"
                  />
                </div>
              </div>
            </div>

            {/* 3 Focus Cards Management */}
            <div className="pt-4 border-t border-neutral-100 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 font-heading">
                    3 Thẻ Thông Tin Chuyên Sâu Bên Phải
                  </h4>
                  <p className="text-xs text-neutral-500">
                    Quản lý icon, tiêu đề và mô tả của từng điểm nhấn thương hiệu.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newCard: AboutFocusCard = {
                      id: `focus-${Date.now()}`,
                      title: "Điểm nhấn mới",
                      description: "Mô tả điểm nhấn y khoa...",
                      iconName: "ShieldCheck",
                      enabled: true,
                      order: (aboutForm.focusCards?.length || 0) + 1
                    };
                    setAboutForm({
                      ...aboutForm,
                      focusCards: [...(aboutForm.focusCards || []), newCard]
                    });
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm thẻ</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {(aboutForm.focusCards || []).map((card, cIdx) => (
                  <div
                    key={card.id || cIdx}
                    className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
                          {renderPreviewIcon(card.iconName, card.imageUrl)}
                        </div>
                        <span className="text-xs font-bold text-neutral-800">Thẻ #{cIdx + 1}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setEditingFocusCard(card)}
                          className="p-1 rounded text-neutral-500 hover:text-blue-700 hover:bg-blue-50"
                          title="Sửa thẻ"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setAboutForm({
                              ...aboutForm,
                              focusCards: aboutForm.focusCards?.filter((_, i) => i !== cIdx)
                            });
                          }}
                          className="p-1 rounded text-neutral-400 hover:text-red-700 hover:bg-red-50"
                          title="Xóa thẻ"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-neutral-900">{card.title}</h5>
                      <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between text-[11px]">
                      <span className="text-neutral-400 font-mono">Icon: {card.iconName}</span>
                      <label className="flex items-center gap-1 text-neutral-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={card.enabled !== false}
                          onChange={(e) => {
                            const updated = [...(aboutForm.focusCards || [])];
                            updated[cIdx] = { ...updated[cIdx], enabled: e.target.checked };
                            setAboutForm({ ...aboutForm, focusCards: updated });
                          }}
                          className="w-3 h-3 text-emerald-600 rounded"
                        />
                        <span>Bật</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 border-t border-neutral-100 space-y-4">
              <h4 className="text-sm font-bold text-neutral-900 font-heading">
                Nút kêu gọi hành động (CTA Buttons)
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* CTA 1 */}
                <div className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-800">Nút CTA 1 (Chính)</span>
                    <label className="flex items-center gap-1.5 text-xs text-neutral-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={aboutForm.cta1Enabled !== false}
                        onChange={(e) => setAboutForm({ ...aboutForm, cta1Enabled: e.target.checked })}
                        className="w-3.5 h-3.5 text-emerald-600 rounded"
                      />
                      <span>Bật nút này</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={aboutForm.cta1Text || ""}
                    onChange={(e) => setAboutForm({ ...aboutForm, cta1Text: e.target.value })}
                    placeholder="Xem câu chuyện thương hiệu"
                    className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded-lg"
                  />
                  <input
                    type="text"
                    value={aboutForm.cta1Url || ""}
                    onChange={(e) => setAboutForm({ ...aboutForm, cta1Url: e.target.value })}
                    placeholder="/gioi-thieu"
                    className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded-lg font-mono"
                  />
                </div>

                {/* CTA 2 */}
                <div className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-800">Nút CTA 2 (Phụ)</span>
                    <label className="flex items-center gap-1.5 text-xs text-neutral-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={aboutForm.cta2Enabled !== false}
                        onChange={(e) => setAboutForm({ ...aboutForm, cta2Enabled: e.target.checked })}
                        className="w-3.5 h-3.5 text-emerald-600 rounded"
                      />
                      <span>Bật nút này</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={aboutForm.cta2Text || ""}
                    onChange={(e) => setAboutForm({ ...aboutForm, cta2Text: e.target.value })}
                    placeholder="Hồ sơ Bác sĩ"
                    className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded-lg"
                  />
                  <input
                    type="text"
                    value={aboutForm.cta2Url || ""}
                    onChange={(e) => setAboutForm({ ...aboutForm, cta2Url: e.target.value })}
                    placeholder="/doi-ngu-bac-si"
                    className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded-lg font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Save Bar */}
            <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-3">
              <button
                type="button"
                disabled={isSaving}
                onClick={handleSaveAboutConfig}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-xs shadow-md transition"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Đang lưu vào Neon PostgreSQL...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Lưu toàn bộ thay đổi lên Neon DB</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Edit Section Layout Title */}
      {editingModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-neutral-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateHomepageModule(editingModule);
                showToast(`Đã lưu thay đổi cho section "${editingModule.name}"!`);
                setEditingModule(null);
              }}
            >
              <div className="p-6 border-b border-neutral-100">
                <h3 className="text-base font-bold text-neutral-900 font-heading">
                  Chỉnh sửa Section: {editingModule.name.split("–")[0]}
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Ánh xạ theme Sapo: {editingModule.themeMapping}
                </p>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Tiêu đề tùy chỉnh hiển thị
                  </label>
                  <input
                    type="text"
                    value={editingModule.customTitle || ""}
                    onChange={(e) => setEditingModule({ ...editingModule, customTitle: e.target.value })}
                    placeholder={editingModule.name}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Mô tả / Phụ đề section
                  </label>
                  <textarea
                    rows={3}
                    value={editingModule.customSubtitle || ""}
                    onChange={(e) => setEditingModule({ ...editingModule, customSubtitle: e.target.value })}
                    placeholder={editingModule.description}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="sectionEnabledCheck"
                    checked={editingModule.enabled}
                    onChange={(e) => setEditingModule({ ...editingModule, enabled: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded border-neutral-300 focus:ring-emerald-500"
                  />
                  <label htmlFor="sectionEnabledCheck" className="text-xs font-medium text-neutral-800 cursor-pointer">
                    Hiển thị section này trên trang chủ website
                  </label>
                </div>
              </div>

              <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingModule(null)}
                  className="px-4 py-2 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-100 transition"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Edit Section A Core Value */}
      {editingValue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-neutral-200">
            <form onSubmit={handleSaveCoreValue}>
              <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-neutral-900 font-heading">
                    {coreValues.some((v) => v.id === editingValue.id) ? "Chỉnh sửa Thẻ Giá Trị" : "Thêm Thẻ Giá Trị Mới"}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">Section A — 4 Thẻ Giá Trị Cốt Lõi</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  {renderPreviewIcon(editingValue.iconName, editingValue.imageUrl)}
                </div>
              </div>

              <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Tiêu đề thẻ *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingValue.title}
                    onChange={(e) => setEditingValue({ ...editingValue, title: e.target.value })}
                    placeholder="VD: Tiên phong Công nghệ cao"
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Mô tả thẻ *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={editingValue.description}
                    onChange={(e) => setEditingValue({ ...editingValue, description: e.target.value })}
                    placeholder="Mô tả giá trị y khoa mang lại cho khách hàng..."
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Icon Lucide
                    </label>
                    <select
                      value={editingValue.iconName}
                      onChange={(e) => setEditingValue({ ...editingValue, iconName: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
                    >
                      {ICON_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Nhãn phụ (Badge)
                    </label>
                    <input
                      type="text"
                      value={editingValue.badge || ""}
                      onChange={(e) => setEditingValue({ ...editingValue, badge: e.target.value })}
                      placeholder="VD: Đề xuất"
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                      Hoặc Ảnh / Icon tùy chỉnh (Media Library)
                    </label>
                    <button
                      type="button"
                      onClick={() => setMediaPickerForValue(true)}
                      className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold"
                    >
                      Chọn ảnh
                    </button>
                  </div>
                  <input
                    type="text"
                    value={editingValue.imageUrl || ""}
                    onChange={(e) => setEditingValue({ ...editingValue, imageUrl: e.target.value })}
                    placeholder="Để trống nếu sử dụng Icon Lucide chuẩn..."
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Link điều hướng khi bấm vào thẻ
                  </label>
                  <input
                    type="text"
                    value={editingValue.link || ""}
                    onChange={(e) => setEditingValue({ ...editingValue, link: e.target.value })}
                    placeholder="VD: /cong-nghe hoặc /gioi-thieu"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-mono"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="valEnabledCheck"
                    checked={editingValue.enabled !== false}
                    onChange={(e) => setEditingValue({ ...editingValue, enabled: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded border-neutral-300 focus:ring-emerald-500"
                  />
                  <label htmlFor="valEnabledCheck" className="text-xs font-medium text-neutral-800 cursor-pointer">
                    Bật hiển thị thẻ này trên trang chủ
                  </label>
                </div>
              </div>

              <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingValue(null)}
                  className="px-4 py-2 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-100 transition"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl shadow-xs transition flex items-center gap-1.5"
                >
                  {isSaving ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Đang lưu...</span>
                    </>
                  ) : (
                    <span>Lưu Thẻ Giá Trị</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Edit Section B Focus Card */}
      {editingFocusCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-neutral-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updated = (aboutForm.focusCards || []).map((c) =>
                  c.id === editingFocusCard.id ? editingFocusCard : c
                );
                setAboutForm({ ...aboutForm, focusCards: updated });
                setEditingFocusCard(null);
                showToast("Đã cập nhật thẻ thông tin!");
              }}
            >
              <div className="p-5 border-b border-neutral-100">
                <h4 className="text-sm font-bold text-neutral-900 font-heading">
                  Chỉnh sửa Thẻ Thông Tin Section B
                </h4>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Tiêu đề thẻ *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingFocusCard.title}
                    onChange={(e) => setEditingFocusCard({ ...editingFocusCard, title: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Mô tả thẻ *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={editingFocusCard.description}
                    onChange={(e) => setEditingFocusCard({ ...editingFocusCard, description: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Icon hiển thị
                  </label>
                  <select
                    value={editingFocusCard.iconName}
                    onChange={(e) => setEditingFocusCard({ ...editingFocusCard, iconName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl"
                  >
                    {ICON_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="px-5 py-3.5 bg-neutral-50 border-t border-neutral-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingFocusCard(null)}
                  className="px-3.5 py-1.5 text-xs text-neutral-700 bg-white border border-neutral-300 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl"
                >
                  Xong
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Resetting Layout */}
      <ConfirmationModal
        isOpen={showResetConfirm}
        type="warning"
        title="Đặt lại thứ tự section gốc?"
        message="Hành động này sẽ khôi phục 12 section trang chủ về thứ tự và trạng thái ban đầu theo brief Sapo theme."
        confirmLabel="Khôi phục gốc"
        cancelLabel="Hủy bỏ"
        onConfirm={() => {
          resetToDefaults();
          setShowResetConfirm(false);
          showToast("Đã khôi phục bố cục trang chủ về ban đầu!");
        }}
        onCancel={() => setShowResetConfirm(false)}
      />

      {/* Confirmation Modal for Deleting Core Value */}
      <ConfirmationModal
        isOpen={!!deleteValueId}
        type="danger"
        title="Xóa Thẻ Giá Trị?"
        message="Bạn có chắc chắn muốn xóa thẻ giá trị này khỏi Section A? Thao tác sẽ được ghi nhận và đồng bộ lên Neon DB."
        confirmLabel="Xóa vĩnh viễn"
        cancelLabel="Hủy bỏ"
        onConfirm={async () => {
          if (deleteValueId) {
            const id = deleteValueId;
            setDeleteValueId(null);
            const res = await deleteCoreValue(id);
            if (res.success) {
              showToast("Đã xóa thẻ giá trị cốt lõi!");
            } else {
              alert("Lỗi khi xóa thẻ giá trị: " + (res.error || "Không thể kết nối đến cơ sở dữ liệu"));
            }
          }
        }}
        onCancel={() => setDeleteValueId(null)}
      />

      {/* Media Picker for Core Value Icon/Image */}
      <MediaLibraryModal
        isOpen={mediaPickerForValue}
        onClose={() => setMediaPickerForValue(false)}
        onSelectImage={(url) => {
          if (editingValue) {
            setEditingValue({ ...editingValue, imageUrl: url });
          }
          setMediaPickerForValue(false);
        }}
      />

      {/* Media Picker for About Section */}
      <MediaLibraryModal
        isOpen={!!aboutMediaTarget}
        onClose={() => setAboutMediaTarget(null)}
        onSelectImage={(url) => {
          if (aboutMediaTarget === "main") {
            setAboutForm({ ...aboutForm, mainImage: url });
          } else if (aboutMediaTarget === "sub-0") {
            const subs = [...(aboutForm.subImages || [])];
            subs[0] = url;
            setAboutForm({ ...aboutForm, subImages: subs });
          } else if (aboutMediaTarget === "sub-1") {
            const subs = [...(aboutForm.subImages || [])];
            subs[1] = url;
            setAboutForm({ ...aboutForm, subImages: subs });
          } else if (aboutMediaTarget === "sub-2") {
            const subs = [...(aboutForm.subImages || [])];
            subs[2] = url;
            setAboutForm({ ...aboutForm, subImages: subs });
          }
          setAboutMediaTarget(null);
          showToast("Đã chọn ảnh từ Thư viện Media!");
        }}
      />
    </div>
  );
};
