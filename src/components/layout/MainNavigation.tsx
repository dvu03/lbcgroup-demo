import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  ChevronRight,
  Sparkles,
  Stethoscope,
  FlaskConical,
  Pill,
  GraduationCap,
  Activity,
  ShieldAlert,
  SunMedium,
  Feather,
  Syringe,
  Zap,
  HeartHandshake,
  Microscope,
  Sparkle,
  Phone,
  Calendar,
  X,
  Settings
} from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';
import { initialNavItems } from '../../data/navigation';
import { initialProductCategories } from '../../data/categories';
import { DynamicIcon } from '../common/DynamicIcon';
import { SearchBar } from './SearchBar';

interface MainNavigationProps {
  isMobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
}

export const MainNavigation: React.FC<MainNavigationProps> = ({
  isMobileMenuOpen,
  onCloseMobileMenu
}) => {
  const { specialties, services, siteConfig, navItems, brands, productCategories: contextCategories } = useDemoData();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<'menu' | 'specialties'>('menu');
  const location = useLocation();

  const currentNavItems = (navItems && navItems.length > 0 ? navItems : initialNavItems);
  const activeNavItems = currentNavItems.filter(item => item.isActive !== false);

  const productCategories = contextCategories && contextCategories.length > 0
    ? contextCategories
    : initialProductCategories;

  const getSpecialtyIcon = (specOrSlug: any, sizeClass = "w-5 h-5") => {
    if (typeof specOrSlug === 'object' && specOrSlug !== null) {
      return (
        <DynamicIcon
          name={specOrSlug.iconName || 'Stethoscope'}
          url={specOrSlug.iconUrl}
          className={`${sizeClass} text-primary-600`}
        />
      );
    }
    const found = specialties.find(s => s.slug === specOrSlug);
    return (
      <DynamicIcon
        name={found?.iconName || 'Stethoscope'}
        url={found?.iconUrl}
        className={`${sizeClass} text-primary-600`}
      />
    );
  };

  const getServiceIcon = (srvOrSlug: any, sizeClass = "w-4 h-4") => {
    if (typeof srvOrSlug === 'object' && srvOrSlug !== null) {
      return (
        <DynamicIcon
          name={srvOrSlug.iconName || 'Sparkles'}
          url={srvOrSlug.iconUrl}
          className={`${sizeClass} text-primary-600`}
        />
      );
    }
    const found = services.find(s => s.slug === srvOrSlug);
    return (
      <DynamicIcon
        name={found?.iconName || 'Sparkles'}
        url={found?.iconUrl}
        className={`${sizeClass} text-primary-600`}
      />
    );
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* ========================================================
          1. DESKTOP NAVIGATION BAR (Row 3)
          ======================================================== */}
      <nav className="site-navigation hidden lg:block border-t border-slate-200/70 bg-white select-none">
        <div className="site-container">
          <ul className="flex items-center justify-between text-[13px] xl:text-[14px] font-semibold text-slate-700">
            {activeNavItems.map((item) => {
              const isCurrentActive = isActive(item.path);

              // 1. Mega Menu: Chuyên khoa
              if (item.isMega && item.megaType === 'specialties') {
                return (
                  <li 
                    key={item.id}
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown('specialties')}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link 
                      to={item.path} 
                      className={`inline-flex items-center gap-1 py-3 group-hover:text-primary-600 transition-colors border-b-2 ${
                        isCurrentActive ? 'text-primary-700 border-primary-600' : 'border-transparent'
                      }`}
                    >
                      <span>{item.title}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-primary-600 transition-transform ${activeDropdown === 'specialties' ? 'rotate-180' : ''}`} />
                    </Link>

                    {activeDropdown === 'specialties' && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full w-[960px] max-w-[95vw] bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 z-50 animate-fadeIn">
                        <div className="mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                          <span className="font-heading text-sm font-bold text-slate-900 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-primary-600" />
                            <span>Hệ sinh thái 5 Chuyên khoa & Lĩnh vực LBC Group</span>
                          </span>
                          <span className="text-xs text-slate-400">Chuẩn mực y khoa – Chuyên sâu</span>
                        </div>
                        <div className="grid grid-cols-5 gap-3.5">
                          {specialties.map((spec) => (
                            <Link
                              key={spec.id}
                              to={`/${spec.slug}`}
                              className="p-3.5 rounded-xl border border-slate-100 hover:border-primary-300 hover:bg-primary-50/50 transition-all flex flex-col justify-between group/card text-left"
                            >
                              <div>
                                <div className="w-9 h-9 rounded-lg bg-primary-100 flex items-center justify-center mb-2.5 group-hover/card:scale-110 transition-transform">
                                  {getSpecialtyIcon(spec.slug)}
                                </div>
                                <h4 className="font-heading text-xs font-bold text-slate-900 group-hover/card:text-primary-700 mb-1 leading-snug">
                                  {spec.name}
                                </h4>
                                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                                  {spec.shortDesc}
                                </p>
                              </div>
                              <span className="mt-3 text-[11px] font-semibold text-primary-600 inline-flex items-center gap-1">
                                Xem chi tiết <ChevronRight className="w-3 h-3" />
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                );
              }

              // 2. Mega Menu: Dịch vụ
              if (item.isMega && item.megaType === 'services') {
                return (
                  <li 
                    key={item.id}
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown('services')}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link 
                      to={item.path} 
                      className={`inline-flex items-center gap-1 py-3 group-hover:text-primary-600 transition-colors border-b-2 ${
                        isCurrentActive ? 'text-primary-700 border-primary-600' : 'border-transparent'
                      }`}
                    >
                      <span>{item.title}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-primary-600 transition-transform ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
                    </Link>

                    {activeDropdown === 'services' && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full w-[1000px] max-w-[95vw] bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 z-50 animate-fadeIn">
                        <div className="mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                          <span className="font-heading text-sm font-bold text-slate-900 flex items-center gap-2">
                            <Activity className="w-4 h-4 text-primary-600" />
                            <span>9 Dịch vụ Điều trị Da liễu Chuyên sâu Chuẩn Y khoa</span>
                          </span>
                          <Link to="/dich-vu" className="text-xs font-semibold text-primary-600 hover:underline">
                            Xem tất cả dịch vụ →
                          </Link>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {services.map((srv) => (
                            <Link
                              key={srv.id}
                              to={`/dich-vu/${srv.slug}`}
                              className="p-3 rounded-xl hover:bg-primary-50/60 border border-transparent hover:border-primary-200 transition-all flex items-start gap-3 group/srv"
                            >
                              <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center shrink-0 group-hover/srv:bg-primary-600 group-hover/srv:text-white transition-colors">
                                {getServiceIcon(srv.slug)}
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="font-semibold text-xs text-slate-800 group-hover/srv:text-primary-700 leading-snug truncate">
                                  {srv.name}
                                </h4>
                                <span className="text-[11px] text-slate-500 line-clamp-1 block mt-0.5">
                                  {srv.metaDescription}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                );
              }

              // 3. Mega Menu: Dược – Mỹ phẩm (2 cột: Theo thương hiệu & Theo nhu cầu)
              if (item.isMega && item.megaType === 'brands') {
                return (
                  <li 
                    key={item.id}
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown('brands')}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link 
                      to={item.path} 
                      className={`inline-flex items-center gap-1 py-3 group-hover:text-primary-600 transition-colors border-b-2 ${
                        isCurrentActive ? 'text-primary-700 border-primary-600' : 'border-transparent'
                      }`}
                    >
                      <span>{item.title}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-primary-600 transition-transform ${activeDropdown === 'brands' ? 'rotate-180' : ''}`} />
                    </Link>

                    {activeDropdown === 'brands' && (
                      <div className="absolute right-0 top-full w-[640px] max-w-[95vw] bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 z-50 animate-fadeIn">
                        <div className="mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                          <span className="font-heading text-sm font-bold text-slate-900 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-primary-600" />
                            <span>Dược Mỹ Phẩm Kê Toa & Chăm Sóc Da Y Khoa</span>
                          </span>
                          <Link to="/duoc-my-pham" className="text-xs font-semibold text-primary-600 hover:underline">
                            Xem tất cả sản phẩm →
                          </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          {/* Cột 1: Theo thương hiệu */}
                          <div>
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                              Theo Thương Hiệu Đối Tác
                            </span>
                            <div className="space-y-1.5">
                              {brands.map((b) => (
                                <Link
                                  key={b.id}
                                  to={`/thuong-hieu/${b.slug}`}
                                  className="flex items-center justify-between p-2 rounded-xl hover:bg-primary-50 text-xs text-slate-700 hover:text-primary-700 font-medium transition-colors"
                                >
                                  <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-md bg-white border border-slate-200 overflow-hidden shrink-0 p-0.5">
                                      <img src={b.logoUrl} alt={b.name} className="w-full h-full object-contain" />
                                    </div>
                                    <span className="font-semibold">{b.name}</span>
                                  </div>
                                  <span className="text-[10px] text-slate-400 font-normal">{b.origin}</span>
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Cột 2: Theo nhu cầu da */}
                          <div>
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                              Theo Nhu Cầu & Tình Trạng Da
                            </span>
                            <div className="space-y-1.5">
                              {productCategories.map((c) => (
                                <Link
                                  key={c.id}
                                  to={`/duoc-my-pham?cat=${c.id}`}
                                  className="flex items-center justify-between p-2 rounded-xl hover:bg-primary-50 text-xs text-slate-700 hover:text-primary-700 font-medium transition-colors group/cat"
                                >
                                  <div className="flex items-center gap-2">
                                    <DynamicIcon name={c.iconName} url={c.iconUrl} className="w-4 h-4 text-primary-600 shrink-0" />
                                    <span>{c.name}</span>
                                  </div>
                                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover/cat:text-primary-600 transition-colors" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                );
              }

              // 4. Dropdown Menu with children
              if (item.children && item.children.length > 0) {
                return (
                  <li 
                    key={item.id}
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(item.id)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link 
                      to={item.path} 
                      className={`inline-flex items-center gap-1 py-3 group-hover:text-primary-600 transition-colors border-b-2 ${
                        isCurrentActive ? 'text-primary-700 border-primary-600' : 'border-transparent'
                      }`}
                    >
                      <span>{item.title}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-primary-600 transition-transform ${activeDropdown === item.id ? 'rotate-180' : ''}`} />
                    </Link>

                    {activeDropdown === item.id && (
                      <div className="absolute left-0 top-full w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-fadeIn">
                        {item.children.map((sub, sIdx) => (
                          <Link
                            key={sIdx}
                            to={sub.path}
                            className="block px-3 py-2 rounded-xl hover:bg-primary-50 text-xs text-slate-700 hover:text-primary-700 font-medium transition-colors"
                          >
                            <span className="block font-semibold">{sub.title}</span>
                            {sub.desc && <span className="block text-[11px] text-slate-400 mt-0.5">{sub.desc}</span>}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                );
              }

              // 4. Standard Link
              return (
                <li key={item.id}>
                  <Link 
                    to={item.path} 
                    className={`inline-block py-3 hover:text-primary-600 transition-colors border-b-2 ${
                      isCurrentActive ? 'text-primary-700 border-primary-600' : 'border-transparent'
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* ========================================================
          2. MOBILE DRAWER MENU & OVERLAY
          ======================================================== */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop Overlay */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
            onClick={onCloseMobileMenu}
          />

          {/* Drawer Menu Panel */}
          <div className="fixed inset-y-0 left-0 w-full max-w-xs sm:max-w-sm bg-white shadow-2xl flex flex-col z-10 animate-slideRight">
            
            {/* Header Drawer */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-[#EEF7F8]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary-600 text-white font-heading font-black text-base flex items-center justify-center shadow-xs">
                  {siteConfig.brandName ? siteConfig.brandName.charAt(0) : "L"}
                </div>
                <div className="min-w-0">
                  <span className="font-heading font-bold text-sm text-slate-900 block truncate">
                    {siteConfig.brandName || "Lạc's Beauty Center"}
                  </span>
                  <span className="text-[10px] text-primary-700 font-medium block">
                    Phòng khám Chuyên khoa Da liễu
                  </span>
                </div>
              </div>
              <button 
                onClick={onCloseMobileMenu}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200/60 transition-colors"
                aria-label="Đóng menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Search Bar inside Drawer */}
            <div className="p-3 border-b border-slate-100 bg-white">
              <SearchBar isMobile={true} />
            </div>

            {/* Mobile Tabs */}
            <div className="flex border-b border-slate-100 bg-slate-50 text-xs font-bold">
              <button
                type="button"
                onClick={() => setMobileTab('menu')}
                className={`flex-1 py-2.5 text-center transition-colors border-b-2 ${
                  mobileTab === 'menu' ? 'border-primary-600 text-primary-700 bg-white' : 'border-transparent text-slate-500'
                }`}
              >
                Menu Website
              </button>
              <button
                type="button"
                onClick={() => setMobileTab('specialties')}
                className={`flex-1 py-2.5 text-center transition-colors border-b-2 ${
                  mobileTab === 'specialties' ? 'border-primary-600 text-primary-700 bg-white' : 'border-transparent text-slate-500'
                }`}
              >
                Chuyên khoa & Dịch vụ
              </button>
            </div>

            {/* Navigation Links Scrollable Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1 text-sm font-semibold">
              {mobileTab === 'menu' ? (
                <>
                  {activeNavItems.map((item) => (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={onCloseMobileMenu}
                      className="block py-2.5 px-3 rounded-xl hover:bg-primary-50 text-slate-800 hover:text-primary-700"
                    >
                      {item.title}
                    </Link>
                  ))}
                </>
              ) : (
                <div className="space-y-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5 px-3">
                      Chuyên khoa:
                    </span>
                    {specialties.map(spec => (
                      <Link
                        key={spec.id}
                        to={`/${spec.slug}`}
                        onClick={onCloseMobileMenu}
                        className="flex items-center gap-2.5 py-2 px-3 rounded-xl hover:bg-primary-50 text-xs font-semibold text-slate-800"
                      >
                        <div className="w-6 h-6 rounded bg-primary-100 flex items-center justify-center shrink-0">
                          {getSpecialtyIcon(spec.slug)}
                        </div>
                        <span>{spec.name}</span>
                      </Link>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5 px-3">
                      Dịch vụ nổi bật:
                    </span>
                    {services.slice(0, 6).map(srv => (
                      <Link
                        key={srv.id}
                        to={`/dich-vu/${srv.slug}`}
                        onClick={onCloseMobileMenu}
                        className="flex items-center gap-2.5 py-2 px-3 rounded-xl hover:bg-primary-50 text-xs font-medium text-slate-700"
                      >
                        <div className="w-6 h-6 rounded bg-primary-100 flex items-center justify-center shrink-0">
                          {getServiceIcon(srv.slug)}
                        </div>
                        <span>{srv.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions inside Drawer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-2.5">
              <Link
                to="/dat-lich-kham"
                onClick={onCloseMobileMenu}
                className="w-full py-2.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>ĐẶT LỊCH KHÁM</span>
              </Link>
              <a
                href={`tel:${siteConfig.hotline.replace(/\s+/g, '')}`}
                className="w-full py-2 rounded-full bg-white border border-primary-600/30 text-primary-700 font-bold text-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Hotline: {siteConfig.hotline}</span>
              </a>
              <Link
                to="/demo-admin"
                onClick={onCloseMobileMenu}
                className="w-full py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-200 transition-colors"
              >
                <Settings className="w-3.5 h-3.5 text-primary-600" />
                <span>Quản trị CMS (Demo Admin)</span>
              </Link>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
