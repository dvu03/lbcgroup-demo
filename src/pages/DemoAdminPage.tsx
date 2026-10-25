import React, { useState } from "react";
import { useDemoData } from "../context/DemoDataContext";
import { SEOHead } from "../components/common/SEOHead";
import { AdminSidebar, AdminTabKey } from "../components/admin/AdminSidebar";
import { AdminHeader } from "../components/admin/AdminHeader";
import { AlertTriangle, RefreshCw, Trash2 } from "lucide-react";

// Import all CMS Tab components
import { DashboardOverviewTab } from "../components/admin/tabs/DashboardOverviewTab";
import { HomepageSectionsTab } from "../components/admin/tabs/HomepageSectionsTab";
import { HeroBannersTab } from "../components/admin/tabs/HeroBannersTab";
import { DoctorsTab } from "../components/admin/tabs/DoctorsTab";
import { ServicesTab } from "../components/admin/tabs/ServicesTab";
import { ProductsTab } from "../components/admin/tabs/ProductsTab";
import { ArticlesTab } from "../components/admin/tabs/ArticlesTab";
import { MediaLibraryTab } from "../components/admin/tabs/MediaLibraryTab";
import { BrandingIdentityTab } from "../components/admin/tabs/BrandingIdentityTab";
import { LeadsTab } from "../components/admin/tabs/LeadsTab";
import { AuditLogTab } from "../components/admin/tabs/AuditLogTab";
import { BackupRestoreTab } from "../components/admin/tabs/BackupRestoreTab";
import { SpecialtiesTab } from "../components/admin/tabs/SpecialtiesTab";
import { TechnologiesTab } from "../components/admin/tabs/TechnologiesTab";
import { CaseStudiesTab } from "../components/admin/tabs/CaseStudiesTab";
import { LocationsTab } from "../components/admin/tabs/LocationsTab";
import { NavigationTab } from "../components/admin/tabs/NavigationTab";
import { LegalInfoTab } from "../components/admin/tabs/LegalInfoTab";
import { BannerTopHeaderTab } from "../components/admin/tabs/BannerTopHeaderTab";
import { PageBannersTab } from "../components/admin/tabs/PageBannersTab";
import { AppearanceTab } from "../components/admin/tabs/AppearanceTab";

export default function DemoAdminPage() {
  const {
    doctors,
    services,
    products,
    articles,
    heroSlides,
    sideBanners,
    bookingLeads,
    dbStatus,
    refreshFromNeon,
    clearLocalCache
  } = useDemoData();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [activeTab, setActiveTab] = useState<AdminTabKey>("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const counts = {
    doctors: doctors.length,
    services: services.length,
    products: products.length,
    articles: articles.length,
    banners: heroSlides.length + sideBanners.length,
    leads: bookingLeads.length,
    newLeads: bookingLeads.filter((l) => l.status === "new").length
  };

  const handleQuickAdd = (type: "doctor" | "service" | "product" | "banner" | "article") => {
    switch (type) {
      case "doctor":
        setActiveTab("doctors");
        break;
      case "service":
        setActiveTab("services");
        break;
      case "product":
        setActiveTab("products");
        break;
      case "banner":
        setActiveTab("hero-banners");
        break;
      case "article":
        setActiveTab("articles");
        break;
    }
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <DashboardOverviewTab
            onSelectTab={setActiveTab}
            onQuickAdd={handleQuickAdd}
          />
        );
      case "homepage-sections":
        return <HomepageSectionsTab />;
      case "page-banners":
        return <PageBannersTab />;
      case "hero-banners":
        return <HeroBannersTab />;
      case "doctors":
        return <DoctorsTab />;
      case "services":
        return <ServicesTab />;
      case "products":
        return <ProductsTab initialSubTab="products" />;
      case "brands":
        return <ProductsTab initialSubTab="brands" />;
      case "categories":
        return <ProductsTab initialSubTab="categories" />;
      case "articles":
        return <ArticlesTab />;
      case "media-library":
        return <MediaLibraryTab />;
      case "header-footer":
        return <BannerTopHeaderTab onNavigateTab={setActiveTab} />;
      case "branding":
        return <AppearanceTab initialSubTab="branding" />;
      case "typography":
        return <AppearanceTab initialSubTab="typography" />;
      case "colors":
        return <AppearanceTab initialSubTab="colors" />;
      case "spacing":
        return <AppearanceTab initialSubTab="spacing" />;
      case "banners-guide":
        return <AppearanceTab initialSubTab="banners" />;
      case "cta-contact":
        return <BrandingIdentityTab initialSubTab="contact" />;
      case "seo":
        return <BrandingIdentityTab initialSubTab="seo" />;
      case "ui-config":
        return <AppearanceTab initialSubTab="colors" />;
      case "leads":
        return <LeadsTab />;
      case "specialties":
        return <SpecialtiesTab />;
      case "technologies":
        return <TechnologiesTab />;
      case "case-studies":
        return <CaseStudiesTab />;
      case "locations":
        return <LocationsTab />;
      case "navigation":
        return <NavigationTab />;
      case "legal-info":
        return <LegalInfoTab />;
      case "audit-log":
        return <AuditLogTab />;
      case "backup-restore":
        return <BackupRestoreTab />;
      default:
        return (
          <DashboardOverviewTab
            onSelectTab={setActiveTab}
            onQuickAdd={handleQuickAdd}
          />
        );
    }
  };

  return (
    <>
      <SEOHead
        title="Quản Trị CMS — Lạc's Beauty Center"
        description="Hệ thống Quản lý Nội dung (CMS) mô phỏng chuyên nghiệp cho Lạc's Beauty Center: quản lý bác sĩ, dịch vụ, sản phẩm, hero slider và trang chủ."
      />

      <div className="min-h-screen bg-neutral-100 flex flex-col font-sans text-neutral-800 antialiased selection:bg-emerald-600 selection:text-white">
        {/* Sidebar Navigation */}
        <AdminSidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          counts={counts}
        />

        {/* Top Navbar Header */}
        <AdminHeader
          activeTab={activeTab}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isCollapsed={isSidebarCollapsed}
          saveStatus="saved"
        />

        {/* Main Content Area */}
        <main
          className={`flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300 max-w-full overflow-x-hidden ${
            isSidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
          }`}
        >
          <div className="max-w-7xl mx-auto space-y-6">
            {dbStatus === "local" && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-xl text-amber-700 shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Đang hiển thị bản lưu cục bộ (Offline / LocalStorage)</h4>
                    <p className="text-xs text-amber-700">
                      Trình duyệt đang tải nội dung cache trên máy của bạn. Hãy bấm đồng bộ để tải phiên bản mới nhất từ Neon PostgreSQL.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    type="button"
                    onClick={async () => {
                      setIsRefreshing(true);
                      await refreshFromNeon();
                      setIsRefreshing(false);
                    }}
                    disabled={isRefreshing}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-xl transition"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
                    <span>Đồng bộ từ Neon</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm("Bạn có chắc chắn muốn xóa bộ nhớ đệm (LocalStorage) và tải lại trang từ đầu?")) {
                        clearLocalCache();
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 bg-white border border-amber-200 hover:bg-amber-100 rounded-xl transition"
                    title="Xóa cache trình duyệt và tải lại trang"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                    <span>Xóa cache máy</span>
                  </button>
                </div>
              </div>
            )}

            {renderActiveTabContent()}
          </div>
        </main>
      </div>
    </>
  );
}
