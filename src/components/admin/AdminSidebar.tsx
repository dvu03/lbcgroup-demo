import React from "react";
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

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
  counts
}) => {
  const groups: SidebarGroup[] = [
    {
      title: "A. TỔNG QUAN",
      items: [
        { key: "dashboard", label: "Dashboard", icon: LayoutDashboard }
      ]
    },
    {
      title: "B. GIAO DIỆN WEBSITE",
      items: [
        { key: "header-footer", label: "Banner top & Header", icon: PanelsTopLeft },
        { key: "branding", label: "Logo & Nhận diện", icon: Sparkles },
        { key: "navigation", label: "Menu & Điều hướng", icon: Menu },
        { key: "homepage-sections", label: "Trang chủ & Section", icon: Home },
        { key: "page-banners", label: "Banner & Nội dung các trang", icon: Layers },
        { key: "ui-config", label: "Cấu hình giao diện chung", icon: Palette }
      ]
    },
    {
      title: "C. NỘI DUNG WEBSITE",
      items: [
        { key: "specialties", label: "Chuyên khoa", icon: Stethoscope },
        { key: "services", label: "Dịch vụ điều trị", icon: Scissors, badge: counts.services },
        { key: "doctors", label: "Đội ngũ bác sĩ", icon: Users, badge: counts.doctors },
        { key: "technologies", label: "Công nghệ cao", icon: Cpu },
        { key: "case-studies", label: "Before–After", icon: Layers },
        { key: "products", label: "Sản phẩm dược mỹ phẩm", icon: ShoppingBag, badge: counts.products },
        { key: "brands", label: "Thương hiệu đối tác", icon: Tag },
        { key: "articles", label: "Tin tức & Bài viết", icon: FileText, badge: counts.articles },
        { key: "locations", label: "Cơ sở phòng khám", icon: MapPin },
        {
          key: "leads",
          label: "Khách hẹn & Đặt lịch",
          icon: CalendarCheck2,
          badge: counts.newLeads > 0 ? `${counts.newLeads} mới` : counts.leads,
          badgeColor: counts.newLeads > 0 ? "bg-amber-500 text-white animate-pulse" : undefined
        },
        { key: "legal-info", label: "Thông tin & Pháp lý", icon: Scale }
      ]
    },
    {
      title: "D. THƯ VIỆN NỘI DUNG",
      items: [
        { key: "media-library", label: "Thư viện Media", icon: ImageIcon },
        { key: "hero-banners", label: "Hero Banner & Slider", icon: Sliders, badge: counts.banners }
      ]
    },
    {
      title: "E. SEO & CẤU HÌNH",
      items: [
        { key: "seo", label: "Cấu hình SEO tổng thể", icon: Search },
        { key: "cta-contact", label: "CTA & Kênh liên hệ", icon: PhoneCall },
        { key: "audit-log", label: "Nhật ký chỉnh sửa", icon: History },
        { key: "backup-restore", label: "Sao lưu & Phục hồi", icon: HardDriveDownload }
      ]
    }
  ];

  const handleItemClick = (key: AdminTabKey) => {
    onSelectTab(key);
    onCloseMobile();
  };

  const sidebarContent = (
    <div className="h-full flex flex-col bg-[#111c18] text-neutral-300 border-r border-emerald-950/60 select-none">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-emerald-900/40 bg-[#0d1613]">
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
              <span className="font-heading font-bold text-white text-base tracking-tight block">
                Lạc's CMS
              </span>
              <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-semibold block">
                Beauty Center
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
      <div className="flex-1 overflow-y-auto custom-scrollbar py-3 px-2 space-y-4">
        {groups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {!isCollapsed ? (
              <div className="px-3 py-1 text-[10px] font-bold tracking-wider text-emerald-500/80 uppercase">
                {group.title}
              </div>
            ) : (
              <div className="w-full my-2 border-t border-neutral-800" />
            )}

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
          </div>
        ))}
      </div>

      {/* Footer Controls */}
      <div className="p-3 border-t border-emerald-900/40 bg-[#0d1613] space-y-2">
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
