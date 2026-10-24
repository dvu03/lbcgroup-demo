import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Clock } from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';
import { AnnouncementBar } from './AnnouncementBar';
import { SearchBar } from './SearchBar';
import { BranchSelector } from './BranchSelector';
import { HeaderActions } from './HeaderActions';
import { MainNavigation } from './MainNavigation';

export const Header: React.FC = () => {
  const { siteConfig } = useDemoData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoImgError, setLogoImgError] = useState(false);
  const [greetingIdx, setGreetingIdx] = useState(0);
  const location = useLocation();

  const headerConfig = siteConfig.headerMainConfig;
  const bgMode = headerConfig?.bgMode || headerConfig?.backgroundMode || 'white';

  let headerBg = '#FFFFFF';
  let isDark = false;

  if (bgMode === 'white') {
    headerBg = '#FFFFFF';
    isDark = false;
  } else if (bgMode === 'light') {
    headerBg = '#EEF7F8';
    isDark = false;
  } else if (bgMode === 'primary') {
    headerBg = '#0E7C86';
    isDark = true;
  } else if (bgMode === 'custom') {
    headerBg = headerConfig?.bgColor || headerConfig?.backgroundColor || '#FFFFFF';
    if (headerBg.startsWith('#') && headerBg.length === 7) {
      const r = parseInt(headerBg.slice(1, 3), 16);
      const g = parseInt(headerBg.slice(3, 5), 16);
      const b = parseInt(headerBg.slice(5, 7), 16);
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      isDark = luminance < 140;
    }
  }

  // If background image is enabled, fallback color is used as the base
  if (headerConfig?.useBackgroundImage && headerConfig?.backgroundFallbackColor) {
    headerBg = headerConfig.backgroundFallbackColor;
  }

  const standardLogo = siteConfig.logoHeader || siteConfig.logoUrl;
  const activeLogo = isDark && siteConfig.logoWhiteUrl ? siteConfig.logoWhiteUrl : standardLogo;

  const logoWidthDesktop = headerConfig?.logoWidthDesktop || 185;
  const logoHeightDesktop = headerConfig?.logoHeightDesktop || 48;
  const logoWidthMobile = headerConfig?.logoWidthMobile || 130;
  const logoHeightMobile = headerConfig?.logoHeightMobile || 36;
  const logoFit = headerConfig?.logoFit || 'contain';

  // Logo Typography toggles
  const showBrandName = headerConfig?.showBrandNameText !== false && Boolean(siteConfig.brandName);
  const showFacility = headerConfig?.showFacilitySubtitle !== false && Boolean(siteConfig.facilityName);
  const hasAnyBrandText = showBrandName || showFacility;

  // Spacing configs
  const containerMaxWidth = headerConfig?.containerMaxWidth || '1380px';
  const containerPaddingX = headerConfig?.containerPaddingX ?? 16;
  const gapLogoSearch = headerConfig?.gapLogoSearch ?? 24;
  const gapSearchActions = headerConfig?.gapSearchActions ?? 24;
  const gapRightElements = headerConfig?.gapRightElements ?? 16;
  const headerPaddingYDesktop = headerConfig?.headerPaddingYDesktop ?? 10;
  const headerPaddingYMobile = headerConfig?.headerPaddingYMobile ?? 8;
  const headerHeightDesktop = headerConfig?.headerHeightDesktop ?? 76;
  const headerHeightMobile = headerConfig?.headerHeightMobile ?? 64;
  const isSticky = headerConfig?.isSticky !== false && headerConfig?.stickyHeader !== false;

  // Upper info row configs (Bean Pharmacity layout)
  const showTopbar = headerConfig?.showTopbar !== false;
  const showGreeting = headerConfig?.showWelcomeGreeting !== false;
  const showHotline = headerConfig?.showHotline !== false;
  const showHours = headerConfig?.showOperatingHours !== false;
  const hotlineLabel = headerConfig?.hotlineLabel || 'HOTLINE';
  const hotlineNumber = siteConfig.hotline || '1900 6750';
  const hotlineClean = hotlineNumber.replace(/[^0-9]/g, '');
  const operatingHours = siteConfig.operatingHours || '08:00 – 20:00 (Hằng ngày)';

  const welcomeMessages = (headerConfig?.welcomeMessages?.length ? headerConfig.welcomeMessages : siteConfig.headerWelcomeMessages)?.length
    ? (headerConfig?.welcomeMessages?.length ? headerConfig.welcomeMessages : siteConfig.headerWelcomeMessages)
    : [
        "LBC xin chào.",
        "Hướng đến Y học Cá nhân hóa.",
        "Tiên phong trong ứng dụng công nghệ cao."
      ];

  // Rotate greeting every 4s
  useEffect(() => {
    if (welcomeMessages.length <= 1) return;
    const interval = setInterval(() => {
      setGreetingIdx(prev => (prev + 1) % welcomeMessages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [welcomeMessages.length]);

  const currentGreeting = welcomeMessages[greetingIdx % welcomeMessages.length];

  useEffect(() => {
    setLogoImgError(false);
  }, [siteConfig.logoHeader, siteConfig.logoUrl, siteConfig.logoWhiteUrl, isDark]);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle sticky header shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="site-header relative z-40 select-none">
      {/* ========================================================
          KHU VỰC 1: BANNER TOP + HEADER TÍCH HỢP
          ======================================================== */}
      <div className="site-header-tier-1 relative">
        {/* 1.1 Dải Banner Top trên cùng (#0E7C86, 1920x60 / 750x80) */}
        <AnnouncementBar />

        {/* 1.2 Khối Header chính (Gồm hàng thông tin nhỏ phía trên + hàng chức năng chính) */}
        <div
          style={{
            backgroundColor: headerBg,
            minHeight: `${headerHeightDesktop}px`,
            paddingTop: `${headerPaddingYDesktop}px`,
            paddingBottom: `${headerPaddingYDesktop}px`
          }}
          className={`relative transition-all duration-200 border-b border-slate-200/70 ${
            isSticky && isScrolled ? 'sticky top-0 shadow-md z-40' : 'relative z-30'
          }`}
        >
          {/* Header Background Image layer (isolated with overflow-hidden pointer-events-none) */}
          {headerConfig?.useBackgroundImage && (headerConfig?.backgroundImage || headerConfig?.backgroundImageMobile) && (
            <>
              {headerConfig?.backgroundImage && (
                <div
                  className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${
                    headerConfig?.backgroundImageMobile ? 'hidden md:block' : 'block'
                  }`}
                  style={{
                    backgroundImage: `url(${headerConfig.backgroundImage})`,
                    backgroundSize: headerConfig.backgroundSize || 'cover',
                    backgroundPosition: headerConfig.backgroundPosition || 'center',
                    backgroundRepeat: headerConfig.backgroundSize === 'repeat' ? 'repeat' : 'no-repeat',
                    opacity: (headerConfig.backgroundOpacity ?? 100) / 100,
                  }}
                />
              )}
              {headerConfig?.backgroundImageMobile && (
                <div
                  className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${
                    headerConfig?.backgroundImage ? 'block md:hidden' : 'block'
                  }`}
                  style={{
                    backgroundImage: `url(${headerConfig.backgroundImageMobile})`,
                    backgroundSize: headerConfig.backgroundSize || 'cover',
                    backgroundPosition: headerConfig.backgroundPosition || 'center',
                    backgroundRepeat: headerConfig.backgroundSize === 'repeat' ? 'repeat' : 'no-repeat',
                    opacity: (headerConfig.backgroundOpacity ?? 100) / 100,
                  }}
                />
              )}
            </>
          )}

          {/* Background pattern overlay if configured */}
          {headerConfig?.bgPatternUrl && !headerConfig?.useBackgroundImage && (
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden z-0"
              style={{
                backgroundImage: `url(${headerConfig.bgPatternUrl})`,
                backgroundRepeat: 'repeat',
                opacity: headerConfig.bgPatternOpacity ?? 0.08,
              }}
            />
          )}

          {/* Main Content Container */}
          <div
            className="site-container relative z-10 w-full flex flex-col gap-2"
            style={{
              maxWidth: containerMaxWidth.endsWith('px') ? containerMaxWidth : `${containerMaxWidth}px`,
              paddingLeft: `${containerPaddingX}px`,
              paddingRight: `${containerPaddingX}px`
            }}
          >
            {/* 1.2.0 HÀNG THÔNG TIN PHÍA TRÊN CỦA HEADER (Upper Micro-Row - Bố cục Bean Pharmacity) */}
            {showTopbar && (showGreeting || showHotline || showHours) && (
              <div className={`hidden lg:flex items-center justify-between pb-1.5 border-b text-xs ${
                isDark ? 'border-white/10 text-white/90' : 'border-slate-200/60 text-slate-600'
              }`}>
                {/* Trái: Lời chào thương hiệu */}
                {showGreeting && (
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span className="font-medium truncate tracking-wide text-[11px] xl:text-xs">
                      {currentGreeting}
                    </span>
                  </div>
                )}

                {/* Phải: Hotline & Giờ hoạt động theo đúng chuẩn Bean Pharmacity */}
                <div className="flex items-center gap-3.5 shrink-0 text-[11px] xl:text-xs ml-auto">
                  {showHotline && (
                    <a
                      href={`tel:${hotlineClean}`}
                      className="flex items-center gap-1.5 group transition-opacity hover:opacity-90"
                      title={`Gọi Hotline ${hotlineNumber}`}
                    >
                      <span className={`font-bold text-[10px] tracking-wider uppercase ${isDark ? 'text-white/80' : 'text-slate-500'}`}>
                        {hotlineLabel}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-[11px] shadow-2xs group-hover:bg-emerald-700 transition-colors">
                        <Phone className="w-2.5 h-2.5" />
                        <span>{hotlineNumber}</span>
                      </span>
                    </a>
                  )}

                  {showHours && (
                    <div className={`flex items-center gap-1 pl-3 border-l ${
                      isDark ? 'border-white/20 text-white/80' : 'border-slate-200 text-slate-500'
                    }`}>
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{operatingHours}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 1.2.1 HÀNG CHỨC NĂNG CHÍNH CỦA HEADER (Main Row: Logo, Search, Branches, Account, Cart, CTA) */}
            <div className="flex items-center justify-between w-full min-w-0 gap-2 sm:gap-4">

              {/* 1.2.1.1 Brand Logo & Dynamic Typography */}
              <div 
                className="shrink min-w-0 flex items-center"
              >
                <Link
                  to="/"
                  className="flex items-center min-w-0 group transition-all"
                  style={{
                    gap: hasAnyBrandText ? `${Math.min(headerConfig?.gapLogoText ?? 10, 8)}px` : '0px',
                    alignItems: headerConfig?.logoVerticalAlign || 'center'
                  }}
                  aria-label={siteConfig.brandName || "Lạc's Beauty Center"}
                >
                  {/* Logo Image */}
                  {activeLogo && !logoImgError ? (
                    <div
                      className="flex items-center justify-start shrink-0"
                    >
                      <img
                        src={activeLogo}
                        alt={siteConfig.brandName || "Logo Lạc's Beauty Center"}
                        onError={() => setLogoImgError(true)}
                        style={{
                          objectFit: logoFit as any
                        }}
                        className="h-7 sm:h-9 md:h-12 w-auto max-w-[110px] sm:max-w-[140px] md:max-w-[185px] transition-transform duration-200 group-hover:scale-102"
                      />
                    </div>
                  ) : (
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center font-heading font-black text-base sm:text-lg md:text-xl shadow-md transition-colors shrink-0 ${
                      isDark ? 'bg-white text-primary-800' : 'bg-primary-600 text-white group-hover:bg-primary-700'
                    }`}>
                      {siteConfig.brandName ? siteConfig.brandName.charAt(0) : 'L'}
                    </div>
                  )}

                  {/* ONLY render text wrapper when at least one brand text line is enabled! */}
                  {hasAnyBrandText && (
                    <div className="flex flex-col min-w-0 justify-center max-w-[125px] sm:max-w-[200px] md:max-w-none">
                      {showBrandName && (
                        <span
                          className={`font-heading font-bold tracking-tight leading-tight truncate transition-colors text-xs sm:text-sm md:text-base ${
                            isDark ? 'text-white' : 'text-slate-900 group-hover:text-primary-700'
                          }`}
                        >
                          {siteConfig.brandName}
                        </span>
                      )}
                      {showFacility && (
                        <span
                          className={`font-medium tracking-wide truncate hidden xs:inline-block sm:block text-[10px] sm:text-[11px] ${showBrandName ? 'mt-0.5' : ''} ${
                            isDark ? 'text-white/80' : 'text-primary-700'
                          }`}
                        >
                          {siteConfig.facilityName}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              </div>

              {/* 1.2.1.2 Search Bar (Flexible, fills available space up to max-w) */}
              <div 
                className="hidden md:flex flex-1 min-w-[180px] max-w-[580px] mx-4"
              >
                <SearchBar isMobile={false} />
              </div>

              {/* 1.2.1.3 Right Action Group (Facilities, Account, Cart, CTA) */}
              <div 
                className="flex items-center ml-auto shrink-0 gap-1 sm:gap-2.5 lg:gap-3"
              >
                {/* Facilities / Hệ thống 2 cơ sở */}
                <div className="hidden lg:block shrink-0">
                  <BranchSelector isDark={isDark} />
                </div>

                {/* Account, Cart, CTA Button & Mobile Trigger */}
                <HeaderActions
                  isMobileMenuOpen={isMobileMenuOpen}
                  onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  isDark={isDark}
                />
              </div>

            </div>

            {/* 1.2.2 Mobile Search Row (visible on small mobile screens under logo & actions) */}
            <div className={`block md:hidden mt-1 pt-2 border-t ${
              isDark ? 'border-white/15' : 'border-slate-100'
            }`}>
              <SearchBar isMobile={true} />
            </div>

          </div>
        </div>
      </div>

      {/* ========================================================
          KHU VỰC 2: MENU ĐIỀU HƯỚNG CHÍNH (Tầng 2 - 10 Mục brief LBC)
          ======================================================== */}
      <MainNavigation
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
      />

    </header>
  );
};
