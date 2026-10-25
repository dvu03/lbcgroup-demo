import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Clock, Settings } from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';
import { initialHeaderMainConfig, HeaderMainConfig } from '../../data/siteConfig';

export const HeaderTopbar: React.FC = () => {
  const { siteConfig } = useDemoData();
  const [welcomeIndex, setWelcomeIndex] = useState(0);

  const headerConfig: HeaderMainConfig = {
    ...initialHeaderMainConfig,
    ...(siteConfig.headerMainConfig || {})
  };

  if (!headerConfig.showTopbar) {
    return null;
  }

  const welcomeMessages = (headerConfig.welcomeMessages?.length ? headerConfig.welcomeMessages : siteConfig.headerWelcomeMessages)?.length
    ? (headerConfig.welcomeMessages?.length ? headerConfig.welcomeMessages : siteConfig.headerWelcomeMessages)
    : [
        "LBC xin chào.",
        "Hướng đến Y học Cá nhân hóa.",
        "Tiên phong trong ứng dụng công nghệ cao."
      ];

  // Rotate greeting every 4 seconds
  useEffect(() => {
    if (welcomeMessages.length <= 1) return;
    const timer = setInterval(() => {
      setWelcomeIndex(prev => (prev + 1) % welcomeMessages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [welcomeMessages.length]);

  const hotline = siteConfig.hotline || "1900 6750";
  const operatingHours = siteConfig.operatingHours || "08:00 – 20:00 (Hằng ngày)";

  // Adapt colors if header is in dark primary mode
  const isDark = headerConfig.backgroundMode === 'primary' || headerConfig.backgroundColor === '#0E7C86';
  const topbarBg = isDark ? 'rgba(0, 0, 0, 0.15)' : '#EEF7F8';
  const topbarTextColor = isDark ? 'text-teal-100' : 'text-slate-600';
  const topbarBorder = isDark ? 'border-white/10' : 'border-slate-200/60';

  return (
    <div 
      className={`hidden lg:block border-b ${topbarBorder} py-1.5 text-xs ${topbarTextColor} transition-colors duration-200`}
      style={{ backgroundColor: topbarBg }}
    >
      <div className="site-container flex items-center justify-between">
        
        {/* Left: Rotating Greeting Messages with Pulsing Indicator */}
        {headerConfig.showWelcomeGreeting && (
          <div className="flex items-center gap-2 font-medium min-w-0">
            <span className={`inline-flex rounded-full h-1.5 w-1.5 ${isDark ? 'bg-amber-300' : 'bg-primary-600'}`}></span>
            <span 
              key={welcomeIndex}
              className={`font-semibold truncate animate-fadeIn ${isDark ? 'text-white' : 'text-primary-900'}`}
            >
              {welcomeMessages[welcomeIndex]}
            </span>
          </div>
        )}

        {/* Right: Hotline 24/7 & Operating Hours */}
        <div className="flex items-center gap-5 shrink-0 ml-auto">
          {headerConfig.showHotline && (
            <a
              href={`tel:${hotline.replace(/\s+/g, '')}`}
              className={`inline-flex items-center gap-1.5 transition-colors group ${
                isDark ? 'hover:text-amber-200 text-white' : 'hover:text-primary-700 text-slate-700'
              }`}
              title="Gọi ngay Hotline LBC để được tư vấn da liễu"
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                isDark 
                  ? 'bg-white/20 text-white group-hover:bg-amber-400 group-hover:text-slate-900' 
                  : 'bg-primary-100 text-primary-700 group-hover:bg-primary-600 group-hover:text-white'
              }`}>
                <Phone className="w-3 h-3" />
              </div>
              <span>
                Hotline 24/7: <b className={`font-bold tracking-wide ${isDark ? 'text-amber-300' : 'text-primary-800'}`}>{hotline}</b>
              </span>
            </a>
          )}

          {headerConfig.showHotline && headerConfig.showOperatingHours && (
            <span className={isDark ? 'text-white/20' : 'text-slate-300'}>|</span>
          )}

          {headerConfig.showOperatingHours && (
            <div className={`inline-flex items-center gap-1.5 ${isDark ? 'text-teal-100/90' : 'text-slate-500'}`}>
              <Clock className={`w-3.5 h-3.5 ${isDark ? 'text-teal-200' : 'text-primary-600'}`} />
              <span>{operatingHours}</span>
            </div>
          )}

          <span className={isDark ? 'text-white/20' : 'text-slate-300'}>|</span>

          {/* Quick switch to CMS Admin */}
          <Link
            to="/demo-admin"
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all ${
              isDark
                ? 'bg-amber-400/20 text-amber-300 hover:bg-amber-400 hover:text-slate-900 border border-amber-400/30'
                : 'bg-primary-50 text-primary-700 hover:bg-primary-600 hover:text-white border border-primary-200/80 shadow-xs'
            }`}
            title="Mở bảng điều khiển quản trị CMS (Demo Admin)"
          >
            <Settings className="w-3 h-3" />
            <span>Quản trị CMS</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
