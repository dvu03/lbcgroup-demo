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

import { useDemoData } from "../../context/DemoDataContext";

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
  dashboard: { title: "Tổng quan hệ thống", category: "1. TỔNG QUAN", description: "Báo cáo số liệu và hoạt động gần đây" },
  "homepage-sections": { title: "Trang chủ & Bố cục Section", category: "2. NỘI DUNG WEBSITE", description: "Bật tắt, đổi thứ tự và sửa nội dung các khối" },
  "page-banners": { title: "Banner & Nội dung các trang", category: "2. NỘI DUNG WEBSITE", description: "Quản lý hero banner và nội dung các trang con" },
  specialties: { title: "5 Chuyên khoa & Lĩnh vực Trọng tâm", category: "2. NỘI DUNG WEBSITE", description: "Quản lý 5 banner chuyên khoa, bố cục banner ngang và cấu hình section" },
  services: { title: "Danh mục Dịch vụ", category: "2. NỘI DUNG WEBSITE", description: "Quản lý dịch vụ điều trị và chăm sóc da" },
  doctors: { title: "Đội ngũ Bác sĩ & Chuyên gia", category: "2. NỘI DUNG WEBSITE", description: "Hồ sơ bác sĩ chuyên khoa, học vị, ảnh đại diện" },
  technologies: { title: "Công nghệ & Thiết bị", category: "2. NỘI DUNG WEBSITE", description: "Hệ thống máy móc, laser và công nghệ điều trị" },
  "case-studies": { title: "Khách hàng Before–After", category: "2. NỘI DUNG WEBSITE", description: "Hình ảnh trước sau và ca lâm sàng thực tế" },
  articles: { title: "Tin tức & Kiến thức y khoa", category: "2. NỘI DUNG WEBSITE", description: "Bài viết chuyên môn, cẩm nang chăm sóc da" },
  locations: { title: "Cơ sở phòng khám", category: "2. NỘI DUNG WEBSITE", description: "Địa chỉ chi nhánh, giờ mở cửa và hotline" },
  leads: { title: "Khách hẹn & Đăng ký tư vấn", category: "2. NỘI DUNG WEBSITE", description: "Danh sách khách hàng điền form từ website" },
  products: { title: "Sản phẩm Dược mỹ phẩm", category: "3. SẢN PHẨM & THƯƠNG HIỆU", description: "Danh mục sản phẩm chính hãng, SKU và giá niêm yết" },
  brands: { title: "Thương hiệu đối tác", category: "3. SẢN PHẨM & THƯƠNG HIỆU", description: "Quản lý thương hiệu mỹ phẩm phân phối" },
  categories: { title: "Danh mục sản phẩm", category: "3. SẢN PHẨM & THƯƠNG HIỆU", description: "Phân loại dược mỹ phẩm (Serum, Kem chống nắng...)" },
  "media-library": { title: "Thư viện Media", category: "4. THƯ VIỆN MEDIA", description: "Quản lý tập trung kho ảnh, icon và video (IndexedDB & Neon)" },
  branding: { title: "Nhận diện thương hiệu & Logo", category: "5. GIAO DIỆN WEBSITE", description: "Logo chính, logo header/footer, favicon, tên thương hiệu và slogan" },
  typography: { title: "Typography — Cấu hình Phông chữ", category: "5. GIAO DIỆN WEBSITE", description: "Font tiêu đề, font nội dung, cỡ chữ cơ bản và thang Heading H1-H4" },
  colors: { title: "Màu sắc & Kiểm tra Tương phản", category: "5. GIAO DIỆN WEBSITE", description: "Màu thương hiệu, màu nhấn, màu chữ và kiểm tra độ tương phản WCAG 2.1" },
  spacing: { title: "Kích thước & Bố cục", category: "5. GIAO DIỆN WEBSITE", description: "Độ rộng khung chứa container, khoảng cách section, bo góc card và nút bấm" },
  "header-footer": { title: "Banner Top & Header", category: "5. GIAO DIỆN WEBSITE", description: "Cấu hình thanh thông báo, bố cục header và hotline" },
  navigation: { title: "Menu & Điều hướng", category: "5. GIAO DIỆN WEBSITE", description: "Quản lý liên kết thanh menu chính và drawer di động" },
  "hero-banners": { title: "Hero Banner & Slider Trang chủ", category: "5. GIAO DIỆN WEBSITE", description: "Quản lý slide chính, autoplay và độ mờ overlay" },
  "banners-guide": { title: "Hướng dẫn Tỷ lệ & Kích thước ảnh", category: "5. GIAO DIỆN WEBSITE", description: "Bảng tra cứu kích thước và tỷ lệ khuyến nghị cho từng loại banner" },
  seo: { title: "Cấu hình SEO tổng thể", category: "6. SEO", description: "Meta title, meta description và từ khóa tìm kiếm" },
  "cta-contact": { title: "Hotline & Kênh liên hệ", category: "7. CẤU HÌNH & HỆ THỐNG", description: "Số hotline, nút đặt lịch và hộp tư vấn nổi" },
  "legal-info": { title: "Thông tin & Pháp lý phòng khám", category: "7. CẤU HÌNH & HỆ THỐNG", description: "Giấy phép hoạt động, phụ trách chuyên môn" },
  "ui-config": { title: "Cấu hình giao diện", category: "5. GIAO DIỆN WEBSITE", description: "Màu chủ đạo, hiển thị nổi bật và font chữ" },
  "audit-log": { title: "Nhật ký chỉnh sửa (Audit Logs)", category: "7. CẤU HÌNH & HỆ THỐNG", description: "Lịch sử thao tác tạo, sửa, xóa nội dung" },
  "backup-restore": { title: "Sao lưu & Phục hồi JSON", category: "7. CẤU HÌNH & HỆ THỐNG", description: "Xuất dữ liệu CMS và khôi phục cài đặt gốc" }
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
  const { dbStatus, syncStatus, refreshFromNeon } = useDemoData();
  const [isRefreshing, setIsRefreshing] = React.useState(false);

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

          {/* Database / Sync indicator badge */}
          {dbStatus === 'connected' ? (
            <div
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-full ${
                syncStatus === 'saving'
                  ? 'bg-amber-50 text-amber-800 border border-amber-200 animate-pulse'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}
              title="Dữ liệu đồng bộ trực tiếp với cơ sở dữ liệu đám mây Neon PostgreSQL"
            >
              {syncStatus === 'saving' ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                  <span>Đang lưu Neon...</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Neon DB: Đã kết nối</span>
                </>
              )}
            </div>
          ) : dbStatus === 'syncing' ? (
            <div
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-full bg-blue-50 text-blue-800 border border-blue-200 animate-pulse"
              title="Đang đồng bộ dữ liệu với Neon PostgreSQL..."
            >
              <RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin" />
              <span>Đang kết nối Neon...</span>
            </div>
          ) : (
            <div
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-full bg-amber-50 text-amber-800 border border-amber-200"
              title="Đang chạy ở chế độ offline (IndexedDB & LocalStorage)"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
              <span>Cục bộ (Offline)</span>
            </div>
          )}

          {/* Quick Refresh from Neon button */}
          <button
            type="button"
            onClick={async () => {
              setIsRefreshing(true);
              await refreshFromNeon();
              setTimeout(() => setIsRefreshing(false), 500);
            }}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-neutral-700 hover:text-emerald-800 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition cursor-pointer"
            title="Tải lại toàn bộ dữ liệu mới nhất từ cơ sở dữ liệu Neon PostgreSQL"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-600' : ''}`} />
            <span className="hidden md:inline">Làm mới Neon</span>
          </button>

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
