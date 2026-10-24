import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Scissors,
  ShoppingBag,
  FileText,
  Sliders,
  CalendarCheck2,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  HardDrive,
  Eye,
  PlusCircle,
  Clock,
  Layers,
  Cpu
} from "lucide-react";
import { useDemoData } from "../../../context/DemoDataContext";
import { getAuditLogs, AuditLogEntry } from "../../../utils/auditLogger";
import { AdminTabKey } from "../AdminSidebar";

interface DashboardOverviewTabProps {
  onSelectTab: (tab: AdminTabKey) => void;
  onQuickAdd: (type: "doctor" | "service" | "product" | "banner" | "article") => void;
}

export const DashboardOverviewTab: React.FC<DashboardOverviewTabProps> = ({
  onSelectTab,
  onQuickAdd
}) => {
  const {
    doctors,
    services,
    products,
    articles,
    heroSlides,
    sideBanners,
    bookingLeads,
    specialties,
    technologies,
    caseStudies,
    homepageModules
  } = useDemoData();

  const auditLogs = getAuditLogs().slice(0, 6);

  // Compute stats
  const totalBanners = heroSlides.length + sideBanners.length;
  const missingDoctorImages = doctors.filter((d) => !d.avatarUrl || d.avatarUrl.includes("placeholder")).length;
  const missingProductImages = products.filter((p) => !p.imageUrls || p.imageUrls.length === 0).length;
  const totalMissingImages = missingDoctorImages + missingProductImages;

  const incompleteServices = services.filter((s) => !s.metaDescription || s.metaDescription.length < 30).length;
  const incompleteDoctors = doctors.filter((d) => !d.shortSummary || d.shortSummary.length < 20).length;
  const totalIncomplete = incompleteServices + incompleteDoctors;

  const newLeadsCount = bookingLeads.filter((l) => l.status === "new").length;

  const statCards = [
    {
      label: "Bác sĩ & Chuyên gia",
      count: doctors.length,
      sub: `${doctors.filter(d => d.isOfficialApproved).length} bác sĩ đã duyệt hồ sơ`,
      icon: Users,
      color: "from-blue-600 to-cyan-600",
      tab: "doctors" as AdminTabKey,
      addType: "doctor" as const
    },
    {
      label: "Dịch vụ điều trị",
      count: services.length,
      sub: `${specialties.length} chuyên khoa liên kết`,
      icon: Scissors,
      color: "from-emerald-600 to-teal-600",
      tab: "services" as AdminTabKey,
      addType: "service" as const
    },
    {
      label: "Sản phẩm Dược mỹ phẩm",
      count: products.length,
      sub: `${products.filter(p => p.isFeatured).length} sản phẩm bán chạy`,
      icon: ShoppingBag,
      color: "from-purple-600 to-pink-600",
      tab: "products" as AdminTabKey,
      addType: "product" as const
    },
    {
      label: "Tin tức & Y khoa",
      count: articles.length,
      sub: `${articles.filter(a => a.isFeatured).length} bài viết ghim đầu`,
      icon: FileText,
      color: "from-amber-600 to-orange-600",
      tab: "articles" as AdminTabKey,
      addType: "article" as const
    },
    {
      label: "Hero Banners & Slider",
      count: totalBanners,
      sub: `${heroSlides.length} slide chính + ${sideBanners.length} banner phụ`,
      icon: Sliders,
      color: "from-rose-600 to-red-600",
      tab: "hero-banners" as AdminTabKey,
      addType: "banner" as const
    },
    {
      label: "Khách hẹn đặt lịch",
      count: bookingLeads.length,
      sub: newLeadsCount > 0 ? `${newLeadsCount} yêu cầu mới cần xử lý` : "Tất cả đã liên hệ",
      icon: CalendarCheck2,
      color: "from-indigo-600 to-blue-600",
      tab: "leads" as AdminTabKey,
      highlight: newLeadsCount > 0
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-[#0d1613] via-[#152720] to-[#12221b] border border-emerald-900/60 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Hệ thống CMS Mô phỏng Chuyên nghiệp</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-heading">
              Chào mừng trở lại Quản trị Lạc's Beauty Center
            </h2>
            <p className="text-neutral-300 text-xs md:text-sm mt-1 max-w-2xl leading-relaxed">
              Toàn bộ thay đổi về Bác sĩ, Dịch vụ, Banner, Dược mỹ phẩm và Bố cục trang chủ được đồng bộ tức thì với website và lưu an toàn trong IndexedDB & LocalStorage.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold shadow-md transition"
            >
              <Eye className="w-4 h-4" />
              <span>Xem Website Live</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`bg-white rounded-2xl p-5 border transition-all duration-200 hover:shadow-md relative overflow-hidden group ${
                card.highlight ? "border-amber-300 bg-amber-50/20" : "border-neutral-200"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">
                    {card.label}
                  </span>
                  <div className="text-3xl font-extrabold text-neutral-900 mt-1 font-heading">
                    {card.count}
                  </div>
                  <p className={`text-xs mt-1.5 font-medium ${card.highlight ? "text-amber-700 font-semibold" : "text-neutral-500"}`}>
                    {card.sub}
                  </p>
                </div>

                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${card.color} text-white flex items-center justify-center shadow-md shadow-neutral-200 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              {/* Action buttons footer */}
              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => onSelectTab(card.tab)}
                  className="font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 transition"
                >
                  <span>Quản lý</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {card.addType && (
                  <button
                    type="button"
                    onClick={() => onQuickAdd(card.addType)}
                    className="text-neutral-500 hover:text-emerald-800 flex items-center gap-1 font-medium transition"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Thêm mới</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Two-column Status & Health Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Health & Content Quality */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-neutral-900 text-sm font-heading flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Chỉ số chất lượng nội dung</span>
            </h3>
            <span className="text-[11px] font-semibold text-neutral-400 uppercase">Audit</span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className={`w-2.5 h-2.5 rounded-full ${totalMissingImages > 0 ? "bg-amber-500 animate-ping" : "bg-emerald-500"}`} />
                <div>
                  <div className="font-semibold text-neutral-800">Ảnh đại diện & Media</div>
                  <div className="text-neutral-500 text-[11px]">
                    {totalMissingImages > 0 ? `${totalMissingImages} mục cần bổ sung ảnh` : "Đầy đủ hình ảnh"}
                  </div>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                totalMissingImages > 0 ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
              }`}>
                {totalMissingImages > 0 ? `! ${totalMissingImages}` : "Tốt"}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className={`w-2.5 h-2.5 rounded-full ${totalIncomplete > 0 ? "bg-amber-500" : "bg-emerald-500"}`} />
                <div>
                  <div className="font-semibold text-neutral-800">Độ hoàn thiện mô tả</div>
                  <div className="text-neutral-500 text-[11px]">
                    {totalIncomplete > 0 ? `${totalIncomplete} mục có mô tả ngắn` : "Đầy đủ nội dung y khoa"}
                  </div>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                totalIncomplete > 0 ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
              }`}>
                {totalIncomplete > 0 ? `Cần xem lại` : "Đạt chuẩn"}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <HardDrive className="w-4 h-4 text-emerald-700" />
                <div>
                  <div className="font-semibold text-neutral-800">Bộ nhớ IndexedDB & Local</div>
                  <div className="text-neutral-500 text-[11px]">Media lưu trữ cục bộ persistent</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full font-bold text-[11px] bg-emerald-100 text-emerald-800">
                Sẵn sàng
              </span>
            </div>

            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-neutral-700" />
                <div>
                  <div className="font-semibold text-neutral-800">Bố cục Trang chủ</div>
                  <div className="text-neutral-500 text-[11px]">{homepageModules.filter(m => m.enabled).length}/{homepageModules.length} section đang bật</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onSelectTab("homepage-sections")}
                className="text-emerald-800 hover:text-emerald-950 font-semibold"
              >
                Tùy chỉnh &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Quick Operations & Short-cuts */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-neutral-900 text-sm font-heading">
              Thao tác nhanh
            </h3>
            <span className="text-[11px] text-neutral-400">Shortcuts</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => onQuickAdd("doctor")}
              className="p-3 rounded-xl bg-neutral-50 hover:bg-emerald-50 border border-neutral-200 hover:border-emerald-300 text-left transition group"
            >
              <Users className="w-5 h-5 text-neutral-600 group-hover:text-emerald-700 mb-2 transition-colors" />
              <div className="text-xs font-bold text-neutral-800 group-hover:text-emerald-900">Thêm Bác sĩ</div>
              <div className="text-[10px] text-neutral-500">Cập nhật hồ sơ & ảnh</div>
            </button>

            <button
              type="button"
              onClick={() => onQuickAdd("service")}
              className="p-3 rounded-xl bg-neutral-50 hover:bg-emerald-50 border border-neutral-200 hover:border-emerald-300 text-left transition group"
            >
              <Scissors className="w-5 h-5 text-neutral-600 group-hover:text-emerald-700 mb-2 transition-colors" />
              <div className="text-xs font-bold text-neutral-800 group-hover:text-emerald-900">Thêm Dịch vụ</div>
              <div className="text-[10px] text-neutral-500">Quy trình & chi phí</div>
            </button>

            <button
              type="button"
              onClick={() => onQuickAdd("product")}
              className="p-3 rounded-xl bg-neutral-50 hover:bg-emerald-50 border border-neutral-200 hover:border-emerald-300 text-left transition group"
            >
              <ShoppingBag className="w-5 h-5 text-neutral-600 group-hover:text-emerald-700 mb-2 transition-colors" />
              <div className="text-xs font-bold text-neutral-800 group-hover:text-emerald-900">Thêm Dược mỹ phẩm</div>
              <div className="text-[10px] text-neutral-500">SKU, giá & ảnh</div>
            </button>

            <button
              type="button"
              onClick={() => onQuickAdd("banner")}
              className="p-3 rounded-xl bg-neutral-50 hover:bg-emerald-50 border border-neutral-200 hover:border-emerald-300 text-left transition group"
            >
              <Sliders className="w-5 h-5 text-neutral-600 group-hover:text-emerald-700 mb-2 transition-colors" />
              <div className="text-xs font-bold text-neutral-800 group-hover:text-emerald-900">Thêm Banner Hero</div>
              <div className="text-[10px] text-neutral-500">Banner & nút CTA</div>
            </button>
          </div>

          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => onSelectTab("media-library")}
              className="text-neutral-600 hover:text-emerald-800 font-semibold flex items-center gap-1.5"
            >
              <span>Thư viện Media (IndexedDB)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onSelectTab("backup-restore")}
              className="text-neutral-600 hover:text-emerald-800 font-semibold flex items-center gap-1.5"
            >
              <span>Sao lưu JSON</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Recent Audit Activities */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-neutral-900 text-sm font-heading flex items-center gap-2">
              <Clock className="w-4 h-4 text-neutral-500" />
              <span>Lịch sử thay đổi gần đây</span>
            </h3>
            <button
              type="button"
              onClick={() => onSelectTab("audit-log")}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-950"
            >
              Xem tất cả
            </button>
          </div>

          {auditLogs.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-400">
              Chưa có lịch sử thay đổi nào được ghi nhận.
            </div>
          ) : (
            <div className="space-y-2.5">
              {auditLogs.map((log: AuditLogEntry) => (
                <div
                  key={log.id}
                  className="p-2.5 rounded-xl bg-neutral-50/70 hover:bg-neutral-50 border border-neutral-100 flex items-start gap-2.5 text-xs transition"
                >
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${
                      log.action === "create"
                        ? "bg-emerald-100 text-emerald-800"
                        : log.action === "update"
                        ? "bg-blue-100 text-blue-800"
                        : log.action === "delete"
                        ? "bg-red-100 text-red-800"
                        : log.action === "reorder"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {log.action}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-neutral-800 truncate">{log.description}</div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">
                      {new Date(log.timestamp).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}{" "}
                      - {log.module}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
