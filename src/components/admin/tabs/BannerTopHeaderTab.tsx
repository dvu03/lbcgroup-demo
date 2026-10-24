import React, { useState, useEffect, useRef } from "react";
import {
  Megaphone,
  Sparkles,
  PanelsTopLeft,
  Menu,
  Smartphone,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  Check,
  Upload,
  Image as ImageIcon,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  AlertCircle,
  HelpCircle,
  Palette,
  Layout,
  Sliders,
  Phone,
  Clock,
  MapPin,
  Search,
  Calendar,
  ShoppingBag,
  User,
  Monitor
} from "lucide-react";
import { useDemoData } from "../../../context/DemoDataContext";
import { 
  BannerTopConfig, 
  BannerTopMessage, 
  HeaderMainConfig,
  initialBannerTopConfig,
  initialHeaderMainConfig
} from "../../../data/siteConfig";
import { NavItem, initialNavItems } from "../../../data/navigation";
import { MediaLibraryModal } from "../MediaLibraryModal";
import { saveMediaItemToDB, fileToMediaItem } from "../../../utils/mediaStorage";

type ActiveSubTab = "banner" | "logo" | "header" | "spacing" | "navigation" | "responsive";

export const BannerTopHeaderTab: React.FC = () => {
  const { siteConfig, updateSiteConfig, navItems, updateNavItems } = useDemoData();

  const [activeSubTab, setActiveSubTab] = useState<ActiveSubTab>("banner");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Form states
  const [bannerConfig, setBannerConfig] = useState<BannerTopConfig>(() => {
    return siteConfig.bannerTopConfig || initialBannerTopConfig;
  });

  const [headerConfig, setHeaderConfig] = useState<HeaderMainConfig>(() => {
    return siteConfig.headerMainConfig || initialHeaderMainConfig;
  });

  const [logoState, setLogoState] = useState({
    logoHeader: siteConfig.logoHeader || siteConfig.logoUrl || "",
    logoWhiteUrl: siteConfig.logoWhiteUrl || "",
    brandName: siteConfig.brandName || "Lạc's Beauty Center",
    facilityName: siteConfig.facilityName || "Phòng khám Chuyên khoa Da liễu",
  });

  const [localNavItems, setLocalNavItems] = useState<NavItem[]>(() => {
    return navItems && navItems.length > 0 ? navItems : initialNavItems;
  });

  // Media picker modal state
  const [mediaPickerTarget, setMediaPickerTarget] = useState<
    "bannerDesktop" | "bannerMobile" | "logoStandard" | "logoWhite" | "headerPattern" | "headerBackground" | "headerBackgroundMobile" | null
  >(null);

  // Logo preview mode
  const [logoPreviewBg, setLogoPreviewBg] = useState<"white" | "light" | "primary" | "dark">("white");

  // Responsive simulator viewport
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  // Sync state if siteConfig changes from other tabs
  useEffect(() => {
    if (siteConfig.bannerTopConfig) {
      setBannerConfig(siteConfig.bannerTopConfig);
    }
    if (siteConfig.headerMainConfig) {
      setHeaderConfig(siteConfig.headerMainConfig);
    }
    setLogoState({
      logoHeader: siteConfig.logoHeader || siteConfig.logoUrl || "",
      logoWhiteUrl: siteConfig.logoWhiteUrl || "",
      brandName: siteConfig.brandName || "Lạc's Beauty Center",
      facilityName: siteConfig.facilityName || "Phòng khám Chuyên khoa Da liễu",
    });
  }, [siteConfig]);

  useEffect(() => {
    if (navItems && navItems.length > 0) {
      setLocalNavItems(navItems);
    }
  }, [navItems]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Save all top area changes
  const handleSaveAll = () => {
    updateSiteConfig({
      bannerTopConfig: bannerConfig,
      headerMainConfig: headerConfig,
      logoHeader: logoState.logoHeader,
      logoUrl: logoState.logoHeader,
      logoWhiteUrl: logoState.logoWhiteUrl,
      brandName: logoState.brandName,
      facilityName: logoState.facilityName,
    });
    updateNavItems(localNavItems);
    showToast("Đã lưu thành công toàn bộ cấu hình Banner Top, Header và Menu!");
  };

  // Reset to default brief
  const handleResetDefaults = () => {
    if (window.confirm("Bạn có chắc chắn muốn khôi phục cấu hình Banner Top và Header về mặc định theo brief LBC?")) {
      setBannerConfig(initialBannerTopConfig);
      setHeaderConfig(initialHeaderMainConfig);
      setLocalNavItems(initialNavItems);
      updateSiteConfig({
        bannerTopConfig: initialBannerTopConfig,
        headerMainConfig: initialHeaderMainConfig,
      });
      updateNavItems(initialNavItems);
      showToast("Đã khôi phục cấu hình mặc định chuẩn LBC!");
    }
  };

  // Upload helper for direct file upload into IndexedDB / Media Library
  const handleDirectFileUpload = async (
    target: "bannerDesktop" | "bannerMobile" | "logoStandard" | "logoWhite" | "headerPattern" | "headerBackground" | "headerBackgroundMobile",
    file: File
  ) => {
    try {
      const mediaItem = await fileToMediaItem(file);
      await saveMediaItemToDB(mediaItem);

      if (target === "bannerDesktop") {
        setBannerConfig(prev => ({ ...prev, desktopImageUrl: mediaItem.url, desktopImage: mediaItem.url }));
      } else if (target === "bannerMobile") {
        setBannerConfig(prev => ({ ...prev, mobileImageUrl: mediaItem.url, mobileImage: mediaItem.url }));
      } else if (target === "logoStandard") {
        setLogoState(prev => ({ ...prev, logoHeader: mediaItem.url }));
      } else if (target === "logoWhite") {
        setLogoState(prev => ({ ...prev, logoWhiteUrl: mediaItem.url }));
      } else if (target === "headerPattern") {
        setHeaderConfig(prev => ({ ...prev, bgPatternUrl: mediaItem.url }));
      } else if (target === "headerBackground") {
        setHeaderConfig(prev => ({ ...prev, backgroundImage: mediaItem.url, useBackgroundImage: true }));
      } else if (target === "headerBackgroundMobile") {
        setHeaderConfig(prev => ({ ...prev, backgroundImageMobile: mediaItem.url, useBackgroundImage: true }));
      }
      showToast(`Đã tải ảnh lên thành công: ${file.name}`);
    } catch (e) {
      console.error(e);
      showToast("Lỗi khi tải ảnh lên. Vui lòng thử lại!");
    }
  };

  // Handle media selection from library
  const handleMediaSelected = (media: { url: string; altText?: string; name?: string }) => {
    if (!mediaPickerTarget) return;

    if (mediaPickerTarget === "bannerDesktop") {
      setBannerConfig(prev => ({ ...prev, desktopImageUrl: media.url, desktopImage: media.url }));
    } else if (mediaPickerTarget === "bannerMobile") {
      setBannerConfig(prev => ({ ...prev, mobileImageUrl: media.url, mobileImage: media.url }));
    } else if (mediaPickerTarget === "logoStandard") {
      setLogoState(prev => ({ ...prev, logoHeader: media.url }));
    } else if (mediaPickerTarget === "logoWhite") {
      setLogoState(prev => ({ ...prev, logoWhiteUrl: media.url }));
    } else if (mediaPickerTarget === "headerPattern") {
      setHeaderConfig(prev => ({ ...prev, bgPatternUrl: media.url }));
    } else if (mediaPickerTarget === "headerBackground") {
      setHeaderConfig(prev => ({ ...prev, backgroundImage: media.url, useBackgroundImage: true }));
    } else if (mediaPickerTarget === "headerBackgroundMobile") {
      setHeaderConfig(prev => ({ ...prev, backgroundImageMobile: media.url, useBackgroundImage: true }));
    }

    setMediaPickerTarget(null);
    showToast("Đã chọn ảnh từ Thư viện Media!");
  };

  // ==========================================
  // TAB 1: BANNER TOP MESSAGE HANDLERS
  // ==========================================
  const handleAddBannerMessage = () => {
    const newMessage: BannerTopMessage = {
      id: `msg-${Date.now()}`,
      text: "Thông điệp mới từ Phòng khám Da liễu LBC",
      enabled: true,
      isActive: true,
      order: bannerConfig.messages.length + 1,
    };
    setBannerConfig(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
  };

  const handleUpdateBannerMessage = (id: string, updates: Partial<BannerTopMessage>) => {
    setBannerConfig(prev => ({
      ...prev,
      messages: prev.messages.map(m => (m.id === id ? { ...m, ...updates } : m)),
    }));
  };

  const handleDeleteBannerMessage = (id: string) => {
    if (bannerConfig.messages.length <= 1) {
      showToast("Cần giữ ít nhất 1 thông điệp banner!");
      return;
    }
    setBannerConfig(prev => ({
      ...prev,
      messages: prev.messages.filter(m => m.id !== id),
    }));
  };

  const handleMoveBannerMessage = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= bannerConfig.messages.length) return;
    const newMessages = [...bannerConfig.messages];
    const temp = newMessages[index];
    newMessages[index] = newMessages[targetIndex];
    newMessages[targetIndex] = temp;
    setBannerConfig(prev => ({ ...prev, messages: newMessages }));
  };

  // ==========================================
  // TAB 4: MENU ITEMS HANDLERS
  // ==========================================
  const handleAddNavItem = () => {
    const newItem: NavItem = {
      id: `nav-${Date.now()}`,
      title: "Mục menu mới",
      path: "/dich-vu",
      isActive: true,
    };
    setLocalNavItems(prev => [...prev, newItem]);
  };

  const handleUpdateNavItem = (id: string, updates: Partial<NavItem>) => {
    setLocalNavItems(prev => prev.map(item => (item.id === id ? { ...item, ...updates } : item)));
  };

  const handleDeleteNavItem = (id: string) => {
    setLocalNavItems(prev => prev.filter(item => item.id !== id));
  };

  const handleMoveNavItem = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= localNavItems.length) return;
    const newItems = [...localNavItems];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setLocalNavItems(newItems);
  };

  return (
    <div className="space-y-6 pb-20 animate-fadeIn">
      {/* Toast Alert Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-slideUp">
          <Check className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-semibold">{toastMsg}</span>
        </div>
      )}

      {/* Main Header Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-700 mb-1">
            <span>Giao diện website</span>
            <span>•</span>
            <span>Bố cục 3 tầng ngang Bean Pharmacity</span>
          </div>
          <h1 className="font-heading text-2xl font-bold text-slate-900">
            Quản lý Banner Top, Header & Điều Hướng
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tùy biến 3 tầng ngang theo chuẩn thiết kế LBC: Tầng 1 (Banner top), Tầng 2 (Header chính & Micro-row), Tầng 3 (Menu điều hướng).
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 font-semibold text-xs transition-colors"
            title="Khôi phục mặc định brief LBC"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
            <span>Mặc định</span>
          </button>
          <button
            type="button"
            onClick={handleSaveAll}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-bold text-xs shadow-md transition-all transform hover:-translate-y-0.5"
          >
            <Save className="w-4 h-4 text-white" />
            <span>LƯU CẤU HÌNH</span>
          </button>
        </div>
      </div>

      {/* 5-Tab Navigation Bar + Responsive Simulator */}
      <div className="bg-white rounded-2xl p-1.5 shadow-sm border border-slate-200/80 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => setActiveSubTab("banner")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === "banner"
              ? "bg-primary-600 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>Tab A: Banner Top</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("logo")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === "logo"
              ? "bg-primary-600 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Tab B: Logo Thương Hiệu</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("header")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === "header"
              ? "bg-primary-600 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <PanelsTopLeft className="w-4 h-4" />
          <span>Tab C: Header Chính</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("spacing")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === "spacing"
              ? "bg-primary-600 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Layout className="w-4 h-4" />
          <span>Tab D: Bố Cục & Khoảng Cách</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("navigation")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === "navigation"
              ? "bg-primary-600 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Menu className="w-4 h-4" />
          <span>Tab E: Menu Điều Hướng</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("responsive")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === "responsive"
              ? "bg-primary-600 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Monitor className="w-4 h-4" />
          <span>Mô Phỏng Responsive</span>
        </button>
      </div>

      {/* =========================================================================
          TAB A: BANNER TOP
          ========================================================================= */}
      {activeSubTab === "banner" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Messages & Toggles (2 cols) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Main Toggle & Link Card */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="font-heading text-base font-bold text-slate-900 flex items-center gap-2">
                      <Megaphone className="w-4 h-4 text-primary-600" />
                      <span>Trạng thái & Liên kết Banner Top</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Tầng 1 trên cùng website, tỷ lệ 1920×60 (Desktop) / 750×80 (Mobile). Toàn bộ banner bấm chuyển trang.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bannerConfig.enabled}
                      onChange={e => setBannerConfig(prev => ({ ...prev, enabled: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Đường dẫn khi bấm vào Banner (Click URL)
                    </label>
                    <input
                      type="text"
                      value={bannerConfig.linkUrl}
                      onChange={e => setBannerConfig(prev => ({ ...prev, linkUrl: e.target.value }))}
                      placeholder="/dat-lich-kham"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Mặc định theo brief: <code>/dat-lich-kham</code>
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Thời gian chuyển thông điệp (giây)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="2"
                        max="20"
                        value={bannerConfig.rotationSpeedSeconds}
                        onChange={e => setBannerConfig(prev => ({ ...prev, rotationSpeedSeconds: Number(e.target.value) }))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                      />
                      <span className="text-xs text-slate-500 shrink-0 font-medium">giây / lần</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Màu nền Banner</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={bannerConfig.backgroundColor}
                        onChange={e => setBannerConfig(prev => ({ ...prev, backgroundColor: e.target.value }))}
                        className="w-9 h-9 p-0.5 rounded-lg border border-slate-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={bannerConfig.backgroundColor}
                        onChange={e => setBannerConfig(prev => ({ ...prev, backgroundColor: e.target.value }))}
                        className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Màu chữ Banner</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={bannerConfig.textColor}
                        onChange={e => setBannerConfig(prev => ({ ...prev, textColor: e.target.value }))}
                        className="w-9 h-9 p-0.5 rounded-lg border border-slate-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={bannerConfig.textColor}
                        onChange={e => setBannerConfig(prev => ({ ...prev, textColor: e.target.value }))}
                        className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Căn lề nội dung</label>
                    <select
                      value={bannerConfig.contentAlignment || bannerConfig.alignment || "center"}
                      onChange={e => setBannerConfig(prev => ({ ...prev, contentAlignment: e.target.value as any, alignment: e.target.value as any }))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                    >
                      <option value="center">Căn giữa (Chuẩn)</option>
                      <option value="left">Căn trái</option>
                      <option value="right">Căn phải</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Chiều cao Banner Desktop ({bannerConfig.heightDesktop || 42}px)
                    </label>
                    <input
                      type="range"
                      min="32"
                      max="64"
                      value={bannerConfig.heightDesktop || 42}
                      onChange={e => setBannerConfig(prev => ({ ...prev, heightDesktop: Number(e.target.value) }))}
                      className="w-full accent-primary-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Chiều cao Banner Mobile ({bannerConfig.heightMobile || 38}px)
                    </label>
                    <input
                      type="range"
                      min="28"
                      max="56"
                      value={bannerConfig.heightMobile || 38}
                      onChange={e => setBannerConfig(prev => ({ ...prev, heightMobile: Number(e.target.value) }))}
                      className="w-full accent-primary-600"
                    />
                  </div>
                </div>
              </div>

              {/* Messages List Card */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="font-heading text-base font-bold text-slate-900">
                      Danh sách thông điệp luân phiên
                    </h3>
                    <p className="text-xs text-slate-500">
                      Mỗi lần chỉ hiển thị 1 thông điệp. Chuyển đổi mượt mà theo thời gian.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddBannerMessage}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary-50 text-primary-700 hover:bg-primary-100 text-xs font-bold transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Thêm thông điệp</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {bannerConfig.messages.map((msg, index) => (
                    <div
                      key={msg.id}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center gap-3"
                    >
                      <div className="flex flex-col gap-1 text-slate-400">
                        <button
                          type="button"
                          onClick={() => handleMoveBannerMessage(index, "up")}
                          disabled={index === 0}
                          className="hover:text-primary-600 disabled:opacity-30"
                          title="Di chuyển lên"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveBannerMessage(index, "down")}
                          disabled={index === bannerConfig.messages.length - 1}
                          className="hover:text-primary-600 disabled:opacity-30"
                          title="Di chuyển xuống"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="w-6 h-6 rounded-lg bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center shrink-0">
                        {index + 1}
                      </div>

                      <div className="flex-1">
                        <input
                          type="text"
                          value={msg.text}
                          onChange={e => handleUpdateBannerMessage(msg.id, { text: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-primary-600 bg-white"
                          placeholder="Nhập thông điệp thương hiệu..."
                        />
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <label className="flex items-center gap-1 text-xs text-slate-600 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={msg.isActive}
                            onChange={e => handleUpdateBannerMessage(msg.id, { isActive: e.target.checked })}
                            className="rounded text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-[11px] font-semibold">Bật</span>
                        </label>

                        <button
                          type="button"
                          onClick={() => handleDeleteBannerMessage(msg.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Xóa thông điệp"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Banner Images Upload (1 col) */}
            <div className="space-y-6">
              
              {/* Desktop Banner Image */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h4 className="font-heading text-sm font-bold text-slate-900">
                    Ảnh Banner Desktop (1920 × 60 px)
                  </h4>
                  <span className="text-[10px] font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-full">
                    Tùy chọn
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Nếu không có ảnh, banner sẽ tự động phủ nền màu <code>#0E7C86</code> và hiển thị chữ trắng chuẩn nhận diện.
                </p>

                {bannerConfig.desktopImageUrl ? (
                  <div className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-900">
                    <img
                      src={bannerConfig.desktopImageUrl}
                      alt="Banner desktop preview"
                      className="w-full h-16 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => setMediaPickerTarget("bannerDesktop")}
                        className="px-3 py-1.5 rounded-lg bg-white text-slate-800 text-xs font-bold"
                      >
                        Đổi ảnh
                      </button>
                      <button
                        type="button"
                        onClick={() => setBannerConfig(prev => ({ ...prev, desktopImageUrl: "" }))}
                        className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center space-y-2.5">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <span className="text-xs text-slate-500 block">Chưa tải ảnh dải ngang desktop</span>
                    <div className="flex items-center justify-center gap-2">
                      <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors">
                        <span>Tải tệp</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={e => {
                            if (e.target.files?.[0]) {
                              handleDirectFileUpload("bannerDesktop", e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => setMediaPickerTarget("bannerDesktop")}
                        className="px-3 py-1.5 rounded-xl bg-primary-50 hover:bg-primary-100 text-primary-700 text-xs font-bold transition-colors"
                      >
                        Thư viện media
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Banner Image */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h4 className="font-heading text-sm font-bold text-slate-900">
                    Ảnh Banner Mobile (750 × 80 px)
                  </h4>
                  <span className="text-[10px] font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-full">
                    Tùy chọn
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Thiết kế phù hợp với màn hình dọc điện thoại, chữ to rõ ràng, không bị méo tỷ lệ.
                </p>

                {bannerConfig.mobileImageUrl ? (
                  <div className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-900">
                    <img
                      src={bannerConfig.mobileImageUrl}
                      alt="Banner mobile preview"
                      className="w-full h-16 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => setMediaPickerTarget("bannerMobile")}
                        className="px-3 py-1.5 rounded-lg bg-white text-slate-800 text-xs font-bold"
                      >
                        Đổi ảnh
                      </button>
                      <button
                        type="button"
                        onClick={() => setBannerConfig(prev => ({ ...prev, mobileImageUrl: "" }))}
                        className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center space-y-2.5">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <span className="text-xs text-slate-500 block">Chưa tải ảnh banner mobile</span>
                    <div className="flex items-center justify-center gap-2">
                      <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors">
                        <span>Tải tệp</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={e => {
                            if (e.target.files?.[0]) {
                              handleDirectFileUpload("bannerMobile", e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => setMediaPickerTarget("bannerMobile")}
                        className="px-3 py-1.5 rounded-xl bg-primary-50 hover:bg-primary-100 text-primary-700 text-xs font-bold transition-colors"
                      >
                        Thư viện media
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Live Preview Box */}
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/80 space-y-3">
                <h4 className="font-heading text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Xem trước trực quan Banner
                </h4>
                <div
                  style={{
                    backgroundColor: bannerConfig.backgroundColor,
                    color: bannerConfig.textColor,
                  }}
                  className="rounded-xl p-3 text-center text-xs font-semibold shadow-inner truncate transition-all"
                >
                  {bannerConfig.messages.find(m => m.isActive)?.text || "Chưa có thông điệp bật"}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          TAB B: LOGO THƯƠNG HIỆU
          ========================================================================= */}
      {activeSubTab === "logo" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Standard Logo Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-heading text-base font-bold text-slate-900">
                    Logo Màu Chuẩn (Nền Sáng)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Dùng cho Header nền trắng hoặc `#EEF7F8`. Hỗ trợ PNG trong suốt, SVG.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Đường dẫn ảnh Logo (URL)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={logoState.logoHeader}
                    onChange={e => setLogoState(prev => ({ ...prev, logoHeader: e.target.value }))}
                    placeholder="/images/logo/logo-lbc.png"
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-primary-600"
                  />
                  <button
                    type="button"
                    onClick={() => setMediaPickerTarget("logoStandard")}
                    className="px-3.5 py-2.5 rounded-xl bg-primary-50 text-primary-700 hover:bg-primary-100 text-xs font-bold shrink-0 transition-colors"
                  >
                    Thư viện
                  </button>
                  <label className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer shrink-0 transition-colors">
                    <span>Tải tệp</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={e => {
                        if (e.target.files?.[0]) handleDirectFileUpload("logoStandard", e.target.files[0]);
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Preview Standard Logo */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center min-h-[120px]">
                {logoState.logoHeader ? (
                  <img
                    src={logoState.logoHeader}
                    alt="Logo Header preview"
                    className="max-h-14 w-auto object-contain"
                  />
                ) : (
                  <span className="text-xs text-slate-400 font-medium">Chưa chọn logo màu</span>
                )}
              </div>
            </div>

            {/* White Logo Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-heading text-base font-bold text-slate-900">
                    Logo Màu Trắng (Nền Tối)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Dùng khi Header bật chế độ màu xanh thương hiệu hoặc nền tối.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Đường dẫn Logo Trắng (URL)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={logoState.logoWhiteUrl}
                    onChange={e => setLogoState(prev => ({ ...prev, logoWhiteUrl: e.target.value }))}
                    placeholder="/images/logo/logo-lbc-white.svg"
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-primary-600"
                  />
                  <button
                    type="button"
                    onClick={() => setMediaPickerTarget("logoWhite")}
                    className="px-3.5 py-2.5 rounded-xl bg-primary-50 text-primary-700 hover:bg-primary-100 text-xs font-bold shrink-0 transition-colors"
                  >
                    Thư viện
                  </button>
                  <label className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer shrink-0 transition-colors">
                    <span>Tải tệp</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={e => {
                        if (e.target.files?.[0]) handleDirectFileUpload("logoWhite", e.target.files[0]);
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Preview White Logo on Dark Background */}
              <div className="p-6 rounded-2xl bg-[#0E7C86] border border-primary-700 flex items-center justify-center min-h-[120px]">
                {logoState.logoWhiteUrl ? (
                  <img
                    src={logoState.logoWhiteUrl}
                    alt="Logo Trắng preview"
                    className="max-h-14 w-auto object-contain"
                  />
                ) : (
                  <span className="text-xs text-white/70 font-medium">Chưa chọn logo trắng (tự dùng logo chuẩn)</span>
                )}
              </div>
            </div>

          </div>

          {/* Sizing & Brand Typography Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-heading text-base font-bold text-slate-900">
                  Kích thước hiển thị Logo & Xử lý bố cục thông minh
                </h3>
                <p className="text-xs text-slate-500">
                  Khi tắt chữ, vùng logo tự động thu gọn theo kích thước ảnh, ô tìm kiếm và các khối bên phải sẽ tự động co giãn tận dụng tối đa không gian.
                </p>
              </div>
            </div>

            {/* Logo Dimensions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Chiều rộng Desktop ({headerConfig.logoWidthDesktop || 185}px)
                </label>
                <input
                  type="range"
                  min="80"
                  max="320"
                  value={headerConfig.logoWidthDesktop || 185}
                  onChange={e => setHeaderConfig(prev => ({ ...prev, logoWidthDesktop: Number(e.target.value) }))}
                  className="w-full accent-primary-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Chiều cao Desktop ({headerConfig.logoHeightDesktop || 48}px)
                </label>
                <input
                  type="range"
                  min="24"
                  max="80"
                  value={headerConfig.logoHeightDesktop || 48}
                  onChange={e => setHeaderConfig(prev => ({ ...prev, logoHeightDesktop: Number(e.target.value) }))}
                  className="w-full accent-primary-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Chiều rộng Mobile ({headerConfig.logoWidthMobile || 130}px)
                </label>
                <input
                  type="range"
                  min="60"
                  max="200"
                  value={headerConfig.logoWidthMobile || 130}
                  onChange={e => setHeaderConfig(prev => ({ ...prev, logoWidthMobile: Number(e.target.value) }))}
                  className="w-full accent-primary-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Chiều cao Mobile ({headerConfig.logoHeightMobile || 36}px)
                </label>
                <input
                  type="range"
                  min="20"
                  max="60"
                  value={headerConfig.logoHeightMobile || 36}
                  onChange={e => setHeaderConfig(prev => ({ ...prev, logoHeightMobile: Number(e.target.value) }))}
                  className="w-full accent-primary-600"
                />
              </div>
            </div>

            {/* Logo Fit & Alignment */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Chế độ hiển thị ảnh (Object Fit)
                </label>
                <select
                  value={headerConfig.logoFit || "contain"}
                  onChange={e => setHeaderConfig(prev => ({ ...prev, logoFit: e.target.value as any }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                >
                  <option value="contain">Contain (Giữ nguyên tỉ lệ ảnh - Khuyên dùng)</option>
                  <option value="cover">Cover (Bao phủ vùng chứa)</option>
                  <option value="fill">Fill (Lấp đầy)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Căn chỉnh chiều dọc
                </label>
                <select
                  value={headerConfig.logoVerticalAlign || "center"}
                  onChange={e => setHeaderConfig(prev => ({ ...prev, logoVerticalAlign: e.target.value as any }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                >
                  <option value="center">Căn giữa (Center)</option>
                  <option value="flex-start">Căn trên (Top)</option>
                  <option value="flex-end">Căn dưới (Bottom)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Khoảng cách Logo đến Chữ ({headerConfig.gapLogoText ?? 10}px)
                </label>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={headerConfig.gapLogoText ?? 10}
                  onChange={e => setHeaderConfig(prev => ({ ...prev, gapLogoText: Number(e.target.value) }))}
                  className="w-full accent-primary-600"
                />
              </div>
            </div>

            {/* Brand Typography & Visibility Toggles */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <h4 className="font-heading text-xs font-bold text-slate-700 uppercase tracking-wider">
                Văn bản thương hiệu bên cạnh Logo (Dynamic Typography)
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Brand Name Controls */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-800">
                      Tên thương hiệu chính
                    </span>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={headerConfig.showBrandNameText !== false}
                        onChange={e => setHeaderConfig(prev => ({ ...prev, showBrandNameText: e.target.checked }))}
                        className="rounded text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-[11px] font-semibold text-slate-600">Hiển thị chữ</span>
                    </label>
                  </div>

                  <input
                    type="text"
                    value={logoState.brandName}
                    onChange={e => setLogoState(prev => ({ ...prev, brandName: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium bg-white"
                    placeholder="Lạc's Beauty Center"
                  />

                  <div className="flex items-center gap-2">
                    <label className="text-[11px] text-slate-500 whitespace-nowrap">Cỡ chữ:</label>
                    <select
                      value={headerConfig.brandNameFontSize || "16px"}
                      onChange={e => setHeaderConfig(prev => ({ ...prev, brandNameFontSize: e.target.value }))}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-medium bg-white"
                    >
                      <option value="14px">14px</option>
                      <option value="15px">15px</option>
                      <option value="16px">16px (Chuẩn)</option>
                      <option value="18px">18px</option>
                      <option value="20px">20px</option>
                    </select>
                  </div>
                </div>

                {/* Facility Subtitle Controls */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-800">
                      Mô tả / Phân khoa dưới logo
                    </span>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={headerConfig.showFacilitySubtitle !== false}
                        onChange={e => setHeaderConfig(prev => ({ ...prev, showFacilitySubtitle: e.target.checked }))}
                        className="rounded text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-[11px] font-semibold text-slate-600">Hiển thị chữ</span>
                    </label>
                  </div>

                  <input
                    type="text"
                    value={logoState.facilityName}
                    onChange={e => setLogoState(prev => ({ ...prev, facilityName: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium bg-white"
                    placeholder="Phòng khám Chuyên khoa Da liễu"
                  />

                  <div className="flex items-center gap-2">
                    <label className="text-[11px] text-slate-500 whitespace-nowrap">Cỡ chữ:</label>
                    <select
                      value={headerConfig.facilityFontSize || "11px"}
                      onChange={e => setHeaderConfig(prev => ({ ...prev, facilityFontSize: e.target.value }))}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-medium bg-white"
                    >
                      <option value="10px">10px</option>
                      <option value="11px">11px (Chuẩn)</option>
                      <option value="12px">12px</option>
                      <option value="13px">13px</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Dynamic Behavior Note Alert */}
              <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-100 flex items-start gap-2.5 text-xs text-sky-800">
                <Sparkles className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Cơ chế co giãn tự động:</strong> Khi tắt cả Tên thương hiệu và Mô tả phân khoa, thẻ bọc văn bản sẽ được loại bỏ hoàn toàn khỏi DOM (không giữ lại khoảng trống hoặc margin rỗng). Chiều rộng logo sẽ co về kích thước ảnh thực tế, ô tìm kiếm và nhóm chức năng bên phải sẽ tự giãn rộng ra một cách hài hòa!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB C: HEADER CHÍNH
          ========================================================================= */}
      {activeSubTab === "header" && (
        <div className="space-y-6">
          
          {/* Upper Micro-row Greetings & Hotline */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-heading text-base font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary-600" />
                  <span>Hàng Thông Tin Phía Trên Header (Micro-Row)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Phân bổ thông tin như mẫu Bean Pharmacity: Trái là lời chào thương hiệu luân phiên, Phải là Hotline & Giờ hoạt động.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={headerConfig.showTopbar}
                  onChange={e => setHeaderConfig(prev => ({ ...prev, showTopbar: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Lời chào 1</label>
                <input
                  type="text"
                  value={headerConfig.greeting1 ?? headerConfig.welcomeMessages?.[0] ?? "LBC xin chào."}
                  onChange={e => {
                    const val = e.target.value;
                    setHeaderConfig(prev => {
                      const msgs = [...(prev.welcomeMessages || ["", "", ""])];
                      msgs[0] = val;
                      return { ...prev, greeting1: val, welcomeMessages: msgs };
                    });
                  }}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Lời chào 2</label>
                <input
                  type="text"
                  value={headerConfig.greeting2 ?? headerConfig.welcomeMessages?.[1] ?? "Hướng đến Y học Cá nhân hóa."}
                  onChange={e => {
                    const val = e.target.value;
                    setHeaderConfig(prev => {
                      const msgs = [...(prev.welcomeMessages || ["", "", ""])];
                      msgs[1] = val;
                      return { ...prev, greeting2: val, welcomeMessages: msgs };
                    });
                  }}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Lời chào 3</label>
                <input
                  type="text"
                  value={headerConfig.greeting3 ?? headerConfig.welcomeMessages?.[2] ?? "Tiên phong trong ứng dụng công nghệ cao."}
                  onChange={e => {
                    const val = e.target.value;
                    setHeaderConfig(prev => {
                      const msgs = [...(prev.welcomeMessages || ["", "", ""])];
                      msgs[2] = val;
                      return { ...prev, greeting3: val, welcomeMessages: msgs };
                    });
                  }}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Số Hotline (Hiển thị góc phải)
                </label>
                <input
                  type="text"
                  value={siteConfig.hotline}
                  onChange={e => updateSiteConfig({ hotline: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Giờ làm việc phòng khám
                </label>
                <input
                  type="text"
                  value={siteConfig.operatingHours}
                  onChange={e => updateSiteConfig({ operatingHours: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                />
              </div>
            </div>
          </div>

          {/* Search Bar & Suggestions */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-heading text-base font-bold text-slate-900 flex items-center gap-2">
                <Search className="w-4 h-4 text-primary-600" />
                <span>Ô Tìm Kiếm & Từ Khóa Gợi Ý</span>
              </h3>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={headerConfig.showSearch}
                  onChange={e => setHeaderConfig(prev => ({ ...prev, showSearch: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Placeholder ô tìm kiếm</label>
                <input
                  type="text"
                  value={headerConfig.searchPlaceholder}
                  onChange={e => setHeaderConfig(prev => ({ ...prev, searchPlaceholder: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Từ khóa gợi ý (Phân cách bởi dấu phẩy)
                </label>
                <input
                  type="text"
                  value={headerConfig.searchSuggestions?.join(", ")}
                  onChange={e => setHeaderConfig(prev => ({
                    ...prev,
                    searchSuggestions: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                  }))}
                  placeholder="Trị mụn, Trị nám, Nâng cơ, Triệt lông, Bioderma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                />
              </div>
            </div>
          </div>

          {/* Branch, Account, Cart & CTA Settings */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-5">
            <h3 className="font-heading text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Các Khối Tính Năng Trong Header Chính
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Branch */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-primary-600" />
                    <span>Hệ thống cơ sở</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={headerConfig.showBranches}
                    onChange={e => setHeaderConfig(prev => ({ ...prev, showBranches: e.target.checked }))}
                    className="rounded text-primary-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Tiêu đề phụ</label>
                  <input
                    type="text"
                    value={headerConfig.branchTitle}
                    onChange={e => setHeaderConfig(prev => ({ ...prev, branchTitle: e.target.value }))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Tiêu đề chính</label>
                  <input
                    type="text"
                    value={headerConfig.branchSubtitle}
                    onChange={e => setHeaderConfig(prev => ({ ...prev, branchSubtitle: e.target.value }))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
                  />
                </div>
              </div>

              {/* Account & Cart Toggles */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
                <span className="font-bold text-xs text-slate-800 block">
                  Tài khoản & Giỏ hàng
                </span>
                <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer pt-1">
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-primary-600" />
                    <span>Hiển thị icon Tài khoản</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={headerConfig.showAccount}
                    onChange={e => setHeaderConfig(prev => ({ ...prev, showAccount: e.target.checked }))}
                    className="rounded text-primary-600"
                  />
                </label>
                <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer pt-1">
                  <span className="flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4 text-primary-600" />
                    <span>Hiển thị icon Giỏ hàng (Kèm badge)</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={headerConfig.showCart}
                    onChange={e => setHeaderConfig(prev => ({ ...prev, showCart: e.target.checked }))}
                    className="rounded text-primary-600"
                  />
                </label>
              </div>

              {/* CTA Booking Button */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary-600" />
                    <span>Nút Đặt Lịch Khám (CTA)</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={headerConfig.showCta}
                    onChange={e => setHeaderConfig(prev => ({ ...prev, showCta: e.target.checked }))}
                    className="rounded text-primary-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Nhãn nút</label>
                  <input
                    type="text"
                    value={headerConfig.ctaText}
                    onChange={e => setHeaderConfig(prev => ({ ...prev, ctaText: e.target.value }))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Đường dẫn</label>
                  <input
                    type="text"
                    value={headerConfig.ctaLink}
                    onChange={e => setHeaderConfig(prev => ({ ...prev, ctaLink: e.target.value }))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Header Background & Styling Options */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-5">
            <h3 className="font-heading text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
              <Palette className="w-4 h-4 text-primary-600" />
              <span>Phương Án Màu Nền & Hoa Văn Header</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => setHeaderConfig(prev => ({ ...prev, bgMode: "white" }))}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  headerConfig.bgMode === "white"
                    ? "border-primary-600 bg-primary-50/50 ring-2 ring-primary-600/20"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-300 shadow-2xs mb-2"></div>
                <span className="font-bold text-xs text-slate-900 block">Trắng Tinh Khiết</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Khuyên dùng theo brief LBC</span>
              </button>

              <button
                type="button"
                onClick={() => setHeaderConfig(prev => ({ ...prev, bgMode: "light" }))}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  headerConfig.bgMode === "light"
                    ? "border-primary-600 bg-primary-50/50 ring-2 ring-primary-600/20"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#EEF7F8] border border-cyan-200 shadow-2xs mb-2"></div>
                <span className="font-bold text-xs text-slate-900 block">Xanh Nhạt (#EEF7F8)</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Thanh lịch & dịu mắt</span>
              </button>

              <button
                type="button"
                onClick={() => setHeaderConfig(prev => ({ ...prev, bgMode: "primary" }))}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  headerConfig.bgMode === "primary"
                    ? "border-primary-600 bg-primary-50/50 ring-2 ring-primary-600/20"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#0E7C86] shadow-2xs mb-2"></div>
                <span className="font-bold text-xs text-slate-900 block">Xanh Thương Hiệu</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Tự động bật logo trắng</span>
              </button>

              <button
                type="button"
                onClick={() => setHeaderConfig(prev => ({ ...prev, bgMode: "custom" }))}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  headerConfig.bgMode === "custom"
                    ? "border-primary-600 bg-primary-50/50 ring-2 ring-primary-600/20"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 shadow-2xs mb-2"></div>
                <span className="font-bold text-xs text-slate-900 block">Tùy Chọn Màu Khác</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Tự do chỉnh mã màu HEX</span>
              </button>
            </div>

            {headerConfig.bgMode === "custom" && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <input
                  type="color"
                  value={headerConfig.bgColor || "#FFFFFF"}
                  onChange={e => setHeaderConfig(prev => ({ ...prev, bgColor: e.target.value }))}
                  className="w-10 h-10 p-0.5 rounded-xl border border-slate-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={headerConfig.bgColor || "#FFFFFF"}
                  onChange={e => setHeaderConfig(prev => ({ ...prev, bgColor: e.target.value }))}
                  placeholder="#FFFFFF"
                  className="w-36 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                />
                <span className="text-xs text-slate-500">Mã màu nền Header tùy chỉnh</span>
              </div>
            )}
          </div>

          {/* Header Background Image Management Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-heading text-base font-bold text-slate-900 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-primary-600" />
                  <span>Quản Lý Ảnh Nền Header (Background Image)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Tải ảnh nền lên từ máy tính hoặc chọn từ thư viện media. Có thể bật/tắt để dùng nền màu thuần.
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={headerConfig.useBackgroundImage || false}
                  onChange={e => setHeaderConfig(prev => ({ ...prev, useBackgroundImage: e.target.checked }))}
                  className="rounded text-primary-600 focus:ring-primary-500"
                />
                <span className="text-xs font-bold text-slate-700">Bật ảnh nền Header</span>
              </label>
            </div>

            {headerConfig.useBackgroundImage && (
              <div className="space-y-4 pt-1 animate-fadeIn">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Đường dẫn ảnh nền Header (URL)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={headerConfig.backgroundImage || ""}
                      onChange={e => setHeaderConfig(prev => ({ ...prev, backgroundImage: e.target.value }))}
                      placeholder="/images/header-bg-texture.jpg hoặc https://..."
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-primary-600"
                    />
                    <button
                      type="button"
                      onClick={() => setMediaPickerTarget("headerBackground")}
                      className="px-3.5 py-2.5 rounded-xl bg-primary-50 text-primary-700 hover:bg-primary-100 text-xs font-bold shrink-0 transition-colors"
                    >
                      Thư viện
                    </button>
                    <label className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer shrink-0 transition-colors">
                      <span>Tải tệp</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={e => {
                          if (e.target.files?.[0]) handleDirectFileUpload("headerBackground", e.target.files[0]);
                        }}
                      />
                    </label>
                  </div>
                </div>

                {/* Preview Background Image */}
                {headerConfig.backgroundImage && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Xem trước ảnh nền Header:</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setMediaPickerTarget("headerBackground")}
                          className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                        >
                          Đổi ảnh
                        </button>
                        <button
                          type="button"
                          onClick={() => setHeaderConfig(prev => ({ ...prev, backgroundImage: "", useBackgroundImage: false }))}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 text-xs font-semibold hover:bg-rose-100"
                        >
                          Xóa ảnh
                        </button>
                      </div>
                    </div>

                    <div
                      className="h-24 w-full rounded-xl border border-slate-200 shadow-inner overflow-hidden relative"
                      style={{
                        backgroundImage: `url(${headerConfig.backgroundImage})`,
                        backgroundSize: headerConfig.backgroundSize || "cover",
                        backgroundPosition: headerConfig.backgroundPosition || "center",
                        backgroundRepeat: headerConfig.backgroundSize === "repeat" ? "repeat" : "no-repeat",
                        backgroundColor: headerConfig.backgroundFallbackColor || "#FFFFFF",
                        opacity: (headerConfig.backgroundOpacity ?? 100) / 100,
                      }}
                    />
                  </div>
                )}

                {/* Mobile Background Image (Optional) */}
                <div className="pt-2 border-t border-slate-100">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ảnh nền Header cho Mobile (Tùy chọn, hiển thị riêng trên di động)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={headerConfig.backgroundImageMobile || ""}
                      onChange={e => setHeaderConfig(prev => ({ ...prev, backgroundImageMobile: e.target.value }))}
                      placeholder="/images/header-bg-mobile.jpg hoặc https://..."
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-primary-600"
                    />
                    <button
                      type="button"
                      onClick={() => setMediaPickerTarget("headerBackgroundMobile")}
                      className="px-3.5 py-2.5 rounded-xl bg-primary-50 text-primary-700 hover:bg-primary-100 text-xs font-bold shrink-0 transition-colors"
                    >
                      Thư viện
                    </button>
                    <label className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer shrink-0 transition-colors">
                      <span>Tải tệp</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={e => {
                          if (e.target.files?.[0]) handleDirectFileUpload("headerBackgroundMobile", e.target.files[0]);
                        }}
                      />
                    </label>
                  </div>
                </div>

                {/* Preview Mobile Background Image */}
                {headerConfig.backgroundImageMobile && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Xem trước ảnh nền Mobile:</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setMediaPickerTarget("headerBackgroundMobile")}
                          className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                        >
                          Đổi ảnh
                        </button>
                        <button
                          type="button"
                          onClick={() => setHeaderConfig(prev => ({ ...prev, backgroundImageMobile: "" }))}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 text-xs font-semibold hover:bg-rose-100"
                        >
                          Xóa ảnh
                        </button>
                      </div>
                    </div>

                    <div
                      className="h-20 w-44 rounded-xl border border-slate-200 shadow-inner overflow-hidden relative"
                      style={{
                        backgroundImage: `url(${headerConfig.backgroundImageMobile})`,
                        backgroundSize: headerConfig.backgroundSize || "cover",
                        backgroundPosition: headerConfig.backgroundPosition || "center",
                        backgroundRepeat: headerConfig.backgroundSize === "repeat" ? "repeat" : "no-repeat",
                        backgroundColor: headerConfig.backgroundFallbackColor || "#FFFFFF",
                        opacity: (headerConfig.backgroundOpacity ?? 100) / 100,
                      }}
                    />
                  </div>
                )}

                {/* Background Display Controls Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Chế độ hiển thị (Background Size)
                    </label>
                    <select
                      value={headerConfig.backgroundSize || "cover"}
                      onChange={e => setHeaderConfig(prev => ({ ...prev, backgroundSize: e.target.value as any }))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                    >
                      <option value="cover">Cover (Phủ kín vùng Header)</option>
                      <option value="contain">Contain (Vừa vặn trong khung)</option>
                      <option value="repeat">Repeat (Lặp lại hoa văn)</option>
                      <option value="auto">Auto (Kích thước gốc)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Vị trí ảnh nền (Position)
                    </label>
                    <select
                      value={headerConfig.backgroundPosition || "center"}
                      onChange={e => setHeaderConfig(prev => ({ ...prev, backgroundPosition: e.target.value as any }))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                    >
                      <option value="center">Chính giữa (Center)</option>
                      <option value="top">Căn đỉnh (Top)</option>
                      <option value="bottom">Căn đáy (Bottom)</option>
                      <option value="left">Căn trái (Left)</option>
                      <option value="right">Căn phải (Right)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Độ trong suốt / Tương phản ({headerConfig.backgroundOpacity ?? 15}%)
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      value={headerConfig.backgroundOpacity ?? 15}
                      onChange={e => setHeaderConfig(prev => ({ ...prev, backgroundOpacity: Number(e.target.value) }))}
                      className="w-full accent-primary-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Màu nền dự phòng
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={headerConfig.backgroundFallbackColor || "#FFFFFF"}
                        onChange={e => setHeaderConfig(prev => ({ ...prev, backgroundFallbackColor: e.target.value }))}
                        className="w-9 h-9 p-0.5 rounded-lg border border-slate-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={headerConfig.backgroundFallbackColor || "#FFFFFF"}
                        onChange={e => setHeaderConfig(prev => ({ ...prev, backgroundFallbackColor: e.target.value }))}
                        className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* =========================================================================
          TAB D: BỐ CỤC & KHOẢNG CÁCH (SPACING & ALIGNMENT)
          ========================================================================= */}
      {activeSubTab === "spacing" && (
        <div className="space-y-6">
          {/* Spacing & Layout Card (Bố cục & Khoảng cách) */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-heading text-base font-bold text-slate-900 flex items-center gap-2">
                  <Layout className="w-4 h-4 text-primary-600" />
                  <span>Bố Cục & Khoảng Cách (Spacing & Alignment)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Điều chỉnh kích thước tổng thể, container và khoảng cách các thành phần đồng bộ theo theme Sapo.
                </p>
              </div>
            </div>

            {/* Container & Padding Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Chiều rộng tối đa (Container Max Width)
                </label>
                <select
                  value={headerConfig.containerMaxWidth || "1380px"}
                  onChange={e => setHeaderConfig(prev => ({ ...prev, containerMaxWidth: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                >
                  <option value="1280px">1280px (Tiêu chuẩn)</option>
                  <option value="1380px">1380px (Chuẩn LBC Theme)</option>
                  <option value="1440px">1440px (Rộng)</option>
                  <option value="1536px">1536px (Rất rộng)</option>
                  <option value="100%">100% (Full Width)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Lề ngang Container ({headerConfig.containerPaddingX ?? 16}px)
                </label>
                <input
                  type="range"
                  min="8"
                  max="40"
                  value={headerConfig.containerPaddingX ?? 16}
                  onChange={e => setHeaderConfig(prev => ({ ...prev, containerPaddingX: Number(e.target.value) }))}
                  className="w-full accent-primary-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Đệm trên/dưới Desktop ({headerConfig.headerPaddingYDesktop ?? 12}px)
                </label>
                <input
                  type="range"
                  min="4"
                  max="32"
                  value={headerConfig.headerPaddingYDesktop ?? 12}
                  onChange={e => setHeaderConfig(prev => ({ ...prev, headerPaddingYDesktop: Number(e.target.value) }))}
                  className="w-full accent-primary-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Đệm trên/dưới Mobile ({headerConfig.headerPaddingYMobile ?? 8}px)
                </label>
                <input
                  type="range"
                  min="4"
                  max="20"
                  value={headerConfig.headerPaddingYMobile ?? 8}
                  onChange={e => setHeaderConfig(prev => ({ ...prev, headerPaddingYMobile: Number(e.target.value) }))}
                  className="w-full accent-primary-600"
                />
              </div>
            </div>

            {/* Heights & Gaps Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Khoảng cách Logo - Ô tìm kiếm ({headerConfig.gapLogoSearch ?? 24}px)
                </label>
                <input
                  type="range"
                  min="8"
                  max="48"
                  value={headerConfig.gapLogoSearch ?? 24}
                  onChange={e => setHeaderConfig(prev => ({ ...prev, gapLogoSearch: Number(e.target.value) }))}
                  className="w-full accent-primary-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Khoảng cách Tìm kiếm - Chức năng ({headerConfig.gapSearchActions ?? 24}px)
                </label>
                <input
                  type="range"
                  min="8"
                  max="48"
                  value={headerConfig.gapSearchActions ?? 24}
                  onChange={e => setHeaderConfig(prev => ({ ...prev, gapSearchActions: Number(e.target.value) }))}
                  className="w-full accent-primary-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Khoảng cách giữa các Icon ({headerConfig.gapIcons ?? 12}px)
                </label>
                <input
                  type="range"
                  min="4"
                  max="24"
                  value={headerConfig.gapIcons ?? 12}
                  onChange={e => setHeaderConfig(prev => ({ ...prev, gapIcons: Number(e.target.value) }))}
                  className="w-full accent-primary-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Khoảng cách nhóm bên phải ({headerConfig.gapRightElements ?? 16}px)
                </label>
                <input
                  type="range"
                  min="8"
                  max="36"
                  value={headerConfig.gapRightElements ?? 16}
                  onChange={e => setHeaderConfig(prev => ({ ...prev, gapRightElements: Number(e.target.value) }))}
                  className="w-full accent-primary-600"
                />
              </div>
            </div>

            {/* Height Limits & Sticky Header */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Chiều cao Header Desktop ({headerConfig.headerHeightDesktop ?? 76}px)
                </label>
                <input
                  type="range"
                  min="56"
                  max="110"
                  value={headerConfig.headerHeightDesktop ?? 76}
                  onChange={e => setHeaderConfig(prev => ({ ...prev, headerHeightDesktop: Number(e.target.value) }))}
                  className="w-full accent-primary-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Chiều cao Header Mobile ({headerConfig.headerHeightMobile ?? 64}px)
                </label>
                <input
                  type="range"
                  min="48"
                  max="90"
                  value={headerConfig.headerHeightMobile ?? 64}
                  onChange={e => setHeaderConfig(prev => ({ ...prev, headerHeightMobile: Number(e.target.value) }))}
                  className="w-full accent-primary-600"
                />
              </div>

              <div className="flex items-center pt-5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={headerConfig.isSticky !== false && headerConfig.stickyHeader !== false}
                    onChange={e => setHeaderConfig(prev => ({ ...prev, isSticky: e.target.checked, stickyHeader: e.target.checked }))}
                    className="rounded text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-xs font-bold text-slate-700">Dính đỉnh khi cuộn trang (Sticky Header)</span>
                </label>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          TAB E: MENU ĐIỀU HƯỚNG
          ========================================================================= */}
      {activeSubTab === "navigation" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-heading text-base font-bold text-slate-900 flex items-center gap-2">
                  <Menu className="w-4 h-4 text-primary-600" />
                  <span>Danh Sách 10 Mục Menu Điều Hướng LBC (Khu vực 2)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Dữ liệu đồng bộ trực tiếp với thanh điều hướng website và drawer trên thiết bị di động.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAddNavItem}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary-50 text-primary-700 hover:bg-primary-100 text-xs font-bold transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm mục menu</span>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {localNavItems.map((item, index) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col gap-1 text-slate-400">
                      <button
                        type="button"
                        onClick={() => handleMoveNavItem(index, "up")}
                        disabled={index === 0}
                        className="hover:text-primary-600 disabled:opacity-30"
                        title="Di chuyển lên"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveNavItem(index, "down")}
                        disabled={index === localNavItems.length - 1}
                        className="hover:text-primary-600 disabled:opacity-30"
                        title="Di chuyển xuống"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="w-7 h-7 rounded-lg bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </div>

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={item.title}
                        onChange={e => handleUpdateNavItem(item.id, { title: e.target.value })}
                        placeholder="Tên nhãn menu..."
                        className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold bg-white"
                      />
                      <input
                        type="text"
                        value={item.path}
                        onChange={e => handleUpdateNavItem(item.id, { path: e.target.value })}
                        placeholder="/duong-dan"
                        className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium bg-white"
                      />
                    </div>

                    {item.isMega && (
                      <span className="hidden sm:inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 shrink-0">
                        Mega Menu: {item.megaType}
                      </span>
                    )}

                    <div className="flex items-center gap-3 shrink-0">
                      <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.isActive !== false}
                          onChange={e => handleUpdateNavItem(item.id, { isActive: e.target.checked })}
                          className="rounded text-primary-600"
                        />
                        <span className="text-[11px] font-semibold">Bật</span>
                      </label>

                      <button
                        type="button"
                        onClick={() => handleDeleteNavItem(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Xóa mục menu"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Submenu Children Links */}
                  {item.children && item.children.length > 0 && (
                    <div className="pl-12 pt-2 border-t border-slate-200/50 space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        Các mục con ({item.children.length}):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {item.children.map((child, cIdx) => (
                          <div key={cIdx} className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs flex items-center justify-between">
                            <span className="font-semibold text-slate-800">{child.title}</span>
                            <span className="text-[11px] text-slate-400 font-mono">{child.path}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MÔ PHỎNG RESPONSIVE (2 KHU VỰC ĐẦU TRANG)
          ========================================================================= */}
      {activeSubTab === "responsive" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-5">
            <h3 className="font-heading text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-primary-600" />
              <span>Căn Chỉnh Chiều Rộng Container & Khoảng Cách</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Chiều rộng tối đa Container ({headerConfig.containerMaxWidth || "1380px"})
                </label>
                <input
                  type="range"
                  min="1200"
                  max="1440"
                  step="10"
                  value={parseInt(headerConfig.containerMaxWidth) || 1380}
                  onChange={e => setHeaderConfig(prev => ({ ...prev, containerMaxWidth: `${e.target.value}px` }))}
                  className="w-full accent-primary-600"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Tiêu chuẩn: 1380px giúp tận dụng tốt chiều rộng màn hình như Bean Pharmacity.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Cố định Header khi cuộn trang (Sticky Header)
                </label>
                <div className="pt-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={headerConfig.isSticky !== false}
                      onChange={e => setHeaderConfig(prev => ({ ...prev, isSticky: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Chọn thiết bị để mô phỏng
                </label>
                <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setPreviewDevice("desktop")}
                    className={`flex-1 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 ${
                      previewDevice === "desktop" ? "bg-white text-primary-700 shadow-xs" : "text-slate-600"
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Desktop</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice("tablet")}
                    className={`flex-1 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 ${
                      previewDevice === "tablet" ? "bg-white text-primary-700 shadow-xs" : "text-slate-600"
                    }`}
                  >
                    <Layout className="w-3.5 h-3.5" />
                    <span>Tablet</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice("mobile")}
                    className={`flex-1 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 ${
                      previewDevice === "mobile" ? "bg-white text-primary-700 shadow-xs" : "text-slate-600"
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Multi-Device Simulator Frame */}
          <div className="bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-white/70 text-xs pb-3 border-b border-slate-800">
              <span className="font-bold flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-400" />
                <span>Mô phỏng hiển thị 2 tầng đầu trang LBC ({previewDevice.toUpperCase()})</span>
              </span>
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                <span>Xem trang website thật</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex justify-center p-4 bg-slate-950 rounded-2xl overflow-x-auto">
              <div
                style={{
                  width: previewDevice === "desktop" ? "100%" : previewDevice === "tablet" ? "768px" : "390px",
                  maxWidth: "100%",
                }}
                className="bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-300 transition-all duration-300"
              >
                {/* ========================================================
                    TẦNG 1: HEADER TÍCH HỢP BANNER THÔNG BÁO VÀ CHỨC NĂNG
                    ======================================================== */}
                <div className="border-b border-slate-200/80">
                  {/* 1.1 Integrated Top Banner Strip */}
                  {bannerConfig.enabled && (
                    <div
                      style={{
                        backgroundColor: bannerConfig.backgroundColor,
                        color: bannerConfig.textColor,
                      }}
                      className="py-1.5 px-4 flex items-center justify-between text-xs font-semibold truncate tracking-wide"
                    >
                      <span className="truncate">{bannerConfig.messages.find(m => m.isActive)?.text || "Banner LBC"}</span>
                      {previewDevice === "desktop" && (
                        <span className="text-[11px] font-normal opacity-90 shrink-0 ml-4">
                          Hotline: {siteConfig.hotline}
                        </span>
                      )}
                    </div>
                  )}

                  {/* 1.2 Main Header Row */}
                  <div
                    style={{
                      backgroundColor:
                        headerConfig.bgMode === "primary"
                          ? "#0E7C86"
                          : headerConfig.bgMode === "light"
                          ? "#EEF7F8"
                          : headerConfig.bgMode === "custom"
                          ? headerConfig.bgColor
                          : "#FFFFFF",
                    }}
                    className="px-4 py-3 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary-600 text-white font-heading font-black text-sm flex items-center justify-center shrink-0">
                        L
                      </div>
                      {(headerConfig.showBrandNameText !== false || headerConfig.showFacilitySubtitle !== false) && (
                        <div>
                          {headerConfig.showBrandNameText !== false && (
                            <span className={`font-heading font-bold text-xs block leading-tight ${
                              headerConfig.bgMode === "primary" ? "text-white" : "text-slate-900"
                            }`}>
                              {logoState.brandName}
                            </span>
                          )}
                          {headerConfig.showFacilitySubtitle !== false && (
                            <span className={`text-[9px] block ${
                              headerConfig.bgMode === "primary" ? "text-white/80" : "text-primary-700"
                            }`}>
                              {logoState.facilityName}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {previewDevice === "desktop" && headerConfig.showSearch && (
                      <div className="flex-1 max-w-[260px] px-3 py-1.5 rounded-full border border-slate-200 bg-white text-[11px] text-slate-400 truncate">
                        {headerConfig.searchPlaceholder}
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      {headerConfig.showCta && (
                        <span
                          style={{
                            backgroundColor: headerConfig.ctaBgColor || (headerConfig.bgMode === "primary" ? "#F59E0B" : "#0E7C86"),
                            color: headerConfig.ctaTextColor || (headerConfig.bgMode === "primary" ? "#0F172A" : "#FFFFFF"),
                          }}
                          className="px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider shrink-0 shadow-xs"
                        >
                          {headerConfig.ctaText}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* ========================================================
                    TẦNG 2: MENU ĐIỀU HƯỚNG
                    ======================================================== */}
                {previewDevice === "desktop" && (
                  <div className="bg-white border-b border-slate-200/80 px-4 py-2">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700">
                      {localNavItems.filter(i => i.isActive !== false).slice(0, 8).map(item => (
                        <span key={item.id} className="hover:text-primary-600 cursor-pointer">
                          {item.title}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dummy Body Content */}
                <div className="p-8 bg-slate-50 text-center text-xs text-slate-400">
                  Nội dung trang website sẽ hiển thị dưới 3 tầng ngang này
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Media Library Picker Modal */}
      <MediaLibraryModal
        isOpen={mediaPickerTarget !== null}
        onClose={() => setMediaPickerTarget(null)}
        onSelect={handleMediaSelected}
        title="Thư Viện Media — Chọn Hình Ảnh"
      />
    </div>
  );
};
