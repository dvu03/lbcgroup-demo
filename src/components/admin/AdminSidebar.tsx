import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Home,
  Menu,
  PanelsTopLeft,
  PhoneCall,
  Image as ImageIcon,
  Sliders,
  Sparkles,
  Stethoscope,
  Scissors,
  Users,
  Cpu,
  Layers,
  MapPin,
  ShoppingBag,
  Tag,
  FolderTree,
  FileText,
  CalendarCheck2,
  Search,
  Scale,
  Palette,
  History,
  HardDriveDownload,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Type,
  Maximize2,
  Ruler,
  X
} from "lucide-react";

export type AdminTabKey =
  | "dashboard"
  | "homepage-sections"
  | "page-banners"
  | "navigation"
  | "header-footer"
  | "cta-contact"
  | "media-library"
  | "hero-banners"
  | "branding"
  | "typography"
  | "colors"
  | "spacing"
  | "banners-guide"
  | "specialties"
  | "services"
  | "doctors"
  | "technologies"
  | "case-studies"
  | "locations"
  | "products"
  | "brands"
  | "categories"
  | "articles"
  | "leads"
  | "seo"
  | "legal-info"
  | "ui-config"
  | "audit-log"
  | "backup-restore";

interface SidebarGroup {
  id: string;
  title: string;
  items: {
    key: AdminTabKey;
    label: string;
    icon: React.ElementType;
    badge?: number | string;
    badgeColor?: string;
  }[];
}

interface AdminSidebarProps {
  activeTab: AdminTabKey;
  onSelectTab: (tab: AdminTabKey) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  counts: {
    doctors: number;
    services: number;
    products: number;
    articles: number;
    banners: number;
    leads: number;
    newLeads: number;
  };
}

const STORAGE_KEY = "lbc_admin_sidebar_open_groups";

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
  counts
}) => {
  // 7 Clean Groups according to task specifications
  const groups: SidebarGroup[] = [
    {
      id: "overview",
      title: "1. Tổng quan",
      items: [
        { key: "dashboard", label: "Dashboard", icon: LayoutDashboard }
      ]
    },
    {
      id: "content",
      title: "2. Nội dung website",
      items: [
        { key: "homepage-sections", label: "Trang chủ & Section", icon: Home },
        { key: "page-banners", label: "Banner & Trang con", icon: Layers },
        { key: "specialties", label: "5 Chuyên khoa", icon: Stethoscope },
        { key: "services", label: "Dịch vụ điều trị", icon: Scissors, badge: counts.services },
        { key: "doctors", label: "Đội ngũ bác sĩ", icon: Users, badge: counts.doctors },
        { key: "technologies", label: "Công nghệ cao", icon: Cpu },
        { key: "case-studies", label: "Kết quả điều trị (B&A)", icon: Sparkles },
        { key: "articles", label: "Tin tức & Bài viết", icon: FileText, badge: counts.articles },
        { key: "locations", label: "Cơ sở phòng khám", icon: MapPin },
        {
          key: "leads",
          label: "Khách hẹn & Đặt lịch",
          icon: CalendarCheck2,
          badge: counts.newLeads > 0 ? `${counts.newLeads} mới` : counts.leads,
          badgeColor: counts.newLeads > 0 ? "bg-amber-500 text-white animate-pulse" : undefined
        }
      ]
    },
    {
      id: "commerce",
      title: "3. Sản phẩm & Thương hiệu",
      items: [
        { key: "products", label: "Sản phẩm", icon: ShoppingBag, badge: counts.products },
        { key: "categories", label: "Danh mục sản phẩm", icon: FolderTree },
        { key: "brands", label: "Thương hiệu đối tác", icon: Tag }
      ]
    },
    {
      id: "media",
      title: "4. Thư viện Media",
      items: [
        { key: "media-library", label: "Quản lý File & Ảnh", icon: ImageIcon }
      ]
    },
    {
      id: "appearance",
      title: "5. Giao diện website",
      items: [
        { key: "branding", label: "Nhận diện & Logo", icon: Sparkles },
        { key: "typography", label: "Typography - Phông chữ", icon: Type },
        { key: "colors", label: "Màu sắc & Tương phản", icon: Palette },
        { key: "spacing", label: "Kích thước & Bố cục", icon: Maximize2 },
        { key: "header-footer", label: "Banner Top & Header", icon: PanelsTopLeft },
        { key: "navigation", label: "Menu & Điều hướng", icon: Menu },
        { key: "hero-banners", label: "Hero Banner Trang chủ", icon: Sliders, badge: counts.banners },
        { key: "banners-guide", label: "Hướng dẫn tỷ lệ ảnh", icon: Ruler }
      ]
    },
    {
      id: "seo",
      title: "6. SEO",
      items: [
        { key: "seo", label: "SEO tổng thể", icon: Search }
      ]
    },
    {
      id: "system",
      title: "7. Cấu hình & Hệ thống",
      items: [
        { key: "cta-contact", label: "Hotline & Kênh liên hệ", icon: PhoneCall },
        { key: "legal-info", label: "Thông tin doanh nghiệp", icon: Scale },
        { key: "audit-log", label: "Nhật ký chỉnh sửa", icon: History },
        { key: "backup-restore", label: "Sao lưu & Phục hồi", icon: HardDriveDownload }
      ]
    }
  ];

  // Accordion state persisted in localStorage
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Default: all groups open
    return {
      overview: true,
      content: true,
      commerce: true,
      media: true,
      appearance: true,
      seo: true,
      system: true
    };
  });

  // Ensure current active tab's group is open
  useEffect(() => {
    const activeGroup = groups.find(g => g.items.some(i => i.key === activeTab));
    if (activeGroup && !openGroups[activeGroup.id]) {
      setOpenGroups(prev => {
        const next = { ...prev, [activeGroup.id]: true };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
    }
  }, [activeTab]);

  const toggleGroup = (groupId: string) => {
    setOpenGroups(prev => {
      const next = { ...prev, [groupId]: !prev[groupId] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleItemClick = (key: AdminTabKey) => {
    onSelectTab(key);
    onCloseMobile();
  };

  const sidebarContent = (
    <div className="h-full flex flex-col bg-[#0f1915] text-neutral-300 border-r border-emerald-950/60 select-none">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-emerald-900/40 bg-[#0a1210]">
        <Link
          to="/demo-admin"
          onClick={() => onSelectTab("dashboard")}
          className={`flex items-center gap-3 transition-opacity ${isCollapsed ? "justify-center w-full" : ""}`}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white font-extrabold shadow-md shadow-emerald-950/40 shrink-0">
            L
          </div>
          {!isCollapsed && (
            <div className="truncate">
              <span className="font-heading font-bold text-white text-sm tracking-tight block">
                LBC GROUP ADMIN
              </span>
              <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-semibold block">
                Hệ Thống CMS Quản Trị
              </span>
            </div>
          )}
        </Link>

        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
          title="Đóng menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav Items List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar py-3 px-2 space-y-3">
        {groups.map((group) => {
          const isOpen = isCollapsed || !!openGroups[group.id];
          const hasActiveItem = group.items.some(i => i.key === activeTab);

          return (
            <div key={group.id} className="space-y-1">
              {!isCollapsed ? (
                <button
                  type="button"
                  onClick={() => toggleGroup(group.id)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-colors ${
                    hasActiveItem 
                      ? "text-emerald-300 bg-emerald-950/30" 
                      : "text-emerald-500/70 hover:text-emerald-400 hover:bg-emerald-950/20"
                  }`}
                >
                  <span className="truncate">{group.title}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-0" : "-rotate-90 text-neutral-500"
                    }`}
                  />
                </button>
              ) : (
                <div className="w-full my-2 border-t border-emerald-950" />
              )}

              {isOpen && (
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.key;
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => handleItemClick(item.key)}
                        title={isCollapsed ? item.label : undefined}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all group relative ${
                          isActive
                            ? "bg-gradient-to-r from-emerald-800 to-emerald-700 text-white font-semibold shadow-sm shadow-emerald-950"
                            : "text-neutral-400 hover:text-neutral-100 hover:bg-emerald-950/40"
                        } ${isCollapsed ? "justify-center px-0 py-2.5" : ""}`}
                      >
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isActive ? "text-emerald-200" : "text-neutral-400 group-hover:text-emerald-400"
                          }`}
                        />
                        {!isCollapsed && (
                          <>
                            <span className="truncate flex-1 text-left">{item.label}</span>
                            {item.badge !== undefined && (
                              <span
                                className={`px-1.5 py-0.5 text-[10px] rounded-full font-bold ${
                                  item.badgeColor ||
                                  (isActive
                                    ? "bg-white/20 text-white"
                                    : "bg-neutral-800 text-neutral-400 group-hover:bg-emerald-900 group-hover:text-emerald-200")
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Controls */}
      <div className="p-3 border-t border-emerald-900/40 bg-[#0a1210] space-y-2">
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-emerald-300 hover:text-white bg-emerald-950/70 hover:bg-emerald-900/70 border border-emerald-800/40 transition ${
            isCollapsed ? "justify-center px-0" : ""
          }`}
          title="Mở website khách hàng ở tab mới"
        >
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          {!isCollapsed && <span>Xem Website (Live)</span>}
        </Link>

        {/* Desktop Collapse Toggle */}
        <button
          type="button"
          onClick={onToggleCollapse}
          className="hidden lg:flex w-full items-center justify-center gap-2 py-1.5 text-xs text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40 rounded-lg transition"
          title={isCollapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-[11px]">Thu gọn sidebar</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden lg:block fixed top-0 bottom-0 left-0 z-30 transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed top-0 bottom-0 left-0 z-50 w-72 max-w-[85vw] transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
};
