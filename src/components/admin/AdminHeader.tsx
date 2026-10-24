import React from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  Search,
  ExternalLink,
  Plus,
  CheckCircle2,
  HardDrive,
  RefreshCw,
  Bell
} from "lucide-react";
import { AdminTabKey } from "./AdminSidebar";

interface AdminHeaderProps {
  activeTab: AdminTabKey;
  onOpenMobileSidebar: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isCollapsed: boolean;
  onQuickNew?: () => void;
  quickNewTitle?: string;
  saveStatus?: "saved" | "saving" | "unsaved";
}

const TAB_TITLES: Record<AdminTabKey, { title: string; category: string; description: string }> = {
  dashboard: { title: "Tổng quan hệ thống", category: "TỔNG QUAN", description: "Báo cáo số liệu và hoạt động gần đây" },
  "homepage-sections": { title: "Trang chủ & Bố cục Section", category: "NỘI DUNG WEBSITE", description: "Bật tắt, đổi thứ tự và sửa nội dung các khối" },
  navigation: { title: "Menu & Điều hướng", category: "NỘI DUNG WEBSITE", description: "Quản lý liên kết thanh menu chính và chân trang" },
  "header-footer": { title: "Header & Footer", category: "NỘI DUNG WEBSITE", description: "Cấu hình thanh thông báo, thông tin chân trang" },
  "cta-contact": { title: "CTA & Thông tin liên hệ", category: "NỘI DUNG WEBSITE", description: "Số hotline, nút đặt lịch và hộp tư vấn" },
  "media-library": { title: "Thư viện Media", category: "THƯ VIỆN NỘI DUNG", description: "Quản lý kho ảnh, icon và video (IndexedDB)" },
  "hero-banners": { title: "Hero Banner & Slider", category: "THƯ VIỆN NỘI DUNG", description: "Quản lý banner chính và 2 banner phụ trang chủ" },
  branding: { title: "Logo & Bộ nhận diện", category: "THƯ VIỆN NỘI DUNG", description: "Tên thương hiệu, khẩu hiệu, logo và bảng màu" },
  specialties: { title: "Chuyên khoa phòng khám", category: "DỮ LIỆU CHUYÊN MÔN", description: "Danh mục 4 chuyên khoa y tế thẩm mỹ" },
  services: { title: "Danh mục Dịch vụ", category: "DỮ LIỆU CHUYÊN MÔN", description: "Quản lý 9 dịch vụ điều trị và chăm sóc da" },
  doctors: { title: "Đội ngũ Bác sĩ & Chuyên gia", category: "DỮ LIỆU CHUYÊN MÔN", description: "Hồ sơ bác sĩ chuyên khoa, học vị, ảnh đại diện" },
  technologies: { title: "Công nghệ & Thiết bị", category: "DỮ LIỆU CHUYÊN MÔN", description: "Hệ thống máy móc, laser và công nghệ điều trị" },
  "case-studies": { title: "Khách hàng Before–After", category: "DỮ LIỆU CHUYÊN MÔN", description: "Hình ảnh trước sau và ca lâm sàng thực tế" },
  locations: { title: "Cơ sở phòng khám", category: "DỮ LIỆU CHUYÊN MÔN", description: "Địa chỉ chi nhánh, giờ mở cửa và hotline" },
  products: { title: "Sản phẩm Dược mỹ phẩm", category: "THƯƠNG MẠI", description: "Danh mục sản phẩm chính hãng, SKU và giá niêm yết" },
  brands: { title: "Thương hiệu đối tác", category: "THƯƠNG MẠI", description: "Quản lý thương hiệu mỹ phẩm phân phối" },
  categories: { title: "Danh mục sản phẩm", category: "THƯƠNG MẠI", description: "Phân loại dược mỹ phẩm (Serum, Kem chống nắng...)" },
  articles: { title: "Tin tức & Kiến thức y khoa", category: "MARKETING", description: "Bài viết chuyên môn, cẩm nang chăm sóc da" },
  leads: { title: "Khách hẹn & Đăng ký tư vấn", category: "MARKETING", description: "Danh sách khách hàng điền form từ website" },
  seo: { title: "Cấu hình SEO tổng thể", category: "MARKETING", description: "Meta title, meta description và từ khóa tìm kiếm" },
  "legal-info": { title: "Thông tin & Pháp lý phòng khám", category: "HỆ THỐNG", description: "Giấy phép hoạt động, phụ trách chuyên môn" },
  "ui-config": { title: "Cấu hình giao diện", category: "HỆ THỐNG", description: "Màu chủ đạo, hiển thị nổi bật và font chữ" },
  "audit-log": { title: "Nhật ký chỉnh sửa (Audit Logs)", category: "HỆ THỐNG", description: "Lịch sử thao tác tạo, sửa, xóa nội dung" },
  "backup-restore": { title: "Sao lưu & Phục hồi JSON", category: "HỆ THỐNG", description: "Xuất dữ liệu CMS và khôi phục cài đặt gốc" }
};

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTab,
  onOpenMobileSidebar,
  searchQuery,
  onSearchChange,
  isCollapsed,
  onQuickNew,
  quickNewTitle,
  saveStatus = "saved"
}) => {
  const currentMeta = TAB_TITLES[activeTab] || {
    title: "Quản trị nội dung",
    category: "HỆ THỐNG",
    description: "Hệ thống quản trị website"
  };

  return (
    <header
      className={`sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-neutral-200 transition-all duration-300 ${
        isCollapsed ? "lg:ml-20" : "lg:ml-64"
      }`}
    >
      <div className="px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle + Breadcrumb & Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl"
            title="Mở menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 font-medium uppercase tracking-wider">
              <span>Lạc's CMS</span>
              <span>/</span>
              <span>{currentMeta.category}</span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-neutral-900 truncate tracking-tight font-heading">
              {currentMeta.title}
            </h1>
          </div>
        </div>

        {/* Right: Search + Status Badge + Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Search */}
          <div className="relative hidden md:block w-48 lg:w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Tìm kiếm trong tab..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-100/80 focus:bg-white border border-transparent focus:border-emerald-600 rounded-xl focus:outline-hidden transition"
            />
          </div>

          {/* Persistent storage indicator badge */}
          <div
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200"
            title="Dữ liệu được lưu trữ tự động trong IndexedDB & LocalStorage của trình duyệt"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Đã lưu cục bộ</span>
          </div>

          {/* Quick Add Button if applicable */}
          {onQuickNew && (
            <button
              type="button"
              onClick={onQuickNew}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">{quickNewTitle || "Thêm mới"}</span>
            </button>
          )}

          {/* View Website Button */}
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:text-emerald-800 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition"
            title="Mở giao diện website khách hàng ở tab mới"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Xem Website</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
