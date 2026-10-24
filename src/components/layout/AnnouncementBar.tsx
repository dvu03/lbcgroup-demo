import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronRight } from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';
import { initialBannerTopConfig, BannerTopConfig } from '../../data/siteConfig';

export const AnnouncementBar: React.FC = () => {
  const { siteConfig } = useDemoData();
  const [currentIdx, setCurrentIdx] = useState(0);

  const bannerConfig: BannerTopConfig = {
    ...initialBannerTopConfig,
    ...(siteConfig.bannerTopConfig || {})
  };

  if (!bannerConfig.enabled) {
    return null;
  }

  // Filter enabled messages
  const activeMessages = (bannerConfig.messages || [])
    .filter(m => m.enabled && (m.isActive !== false))
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const messages = activeMessages.length > 0
    ? activeMessages
    : [
        {
          id: 'def-1',
          text: 'Đơn vị sở hữu máy soi da VISIA 3D đầu tiên tại Việt Nam',
          subText: 'Soi da công nghệ cao – Thấy được kết quả trước khi thực hiện',
          link: '/dat-lich-kham',
          enabled: true,
          order: 1
        },
        {
          id: 'def-2',
          text: 'Soi da công nghệ cao - Thấy được kết quả trước khi thực hiện',
          subText: 'Phác đồ cá nhân hóa chuẩn Y khoa cùng Bác sĩ Chuyên khoa Da liễu',
          link: '/dat-lich-kham',
          enabled: true,
          order: 2
        }
      ];

  const currentMsg = messages[currentIdx % messages.length];
  const intervalMs = (bannerConfig.rotationInterval || bannerConfig.rotationSpeedSeconds || 4) * 1000;

  // Single message rotation
  useEffect(() => {
    if (messages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % messages.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [messages.length, intervalMs]);

  const targetLink = currentMsg.link || bannerConfig.link || bannerConfig.linkUrl || '/dat-lich-kham';
  const bgColor = bannerConfig.backgroundColor || '#0E7C86';
  const textColor = bannerConfig.textColor || '#FFFFFF';

  const alignment = bannerConfig.contentAlignment || bannerConfig.alignment || 'center';
  const justifyClass = alignment === 'left' ? 'justify-start' : alignment === 'right' ? 'justify-end' : 'justify-center';

  const desktopImg = bannerConfig.desktopImageUrl || bannerConfig.desktopImage;
  const mobileImg = bannerConfig.mobileImageUrl || bannerConfig.mobileImage;

  return (
    <aside
      className="site-announcement site-announcement-bar w-full relative overflow-hidden transition-colors duration-200 select-none z-10 block"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        minHeight: `${bannerConfig.heightDesktop || 42}px`
      }}
      aria-label="Thanh thông báo nổi bật Lạc's Beauty Center"
    >
      {/* Raster Background Banner (Desktop 1920x60 / Mobile 750x80) */}
      {desktopImg ? (
        <picture className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {mobileImg && (
            <source
              media="(max-width: 640px)"
              srcSet={mobileImg}
            />
          )}
          <img
            src={desktopImg}
            alt="Banner top Lạc's Beauty Center"
            className="w-full h-full object-cover object-center"
          />
        </picture>
      ) : null}

      <div className="site-container relative z-10 w-full h-full">
        <Link
          to={targetLink}
          className={`flex items-center ${justifyClass} gap-2.5 py-1.5 px-2 text-xs sm:text-[13px] font-medium group transition-opacity hover:opacity-95`}
          style={{ minHeight: `${bannerConfig.heightDesktop || 42}px` }}
          title="Nhấn để Đặt lịch khám & Soi da VISIA 3D"
        >
          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
          </span>

          <div className="flex items-center gap-2 truncate max-w-full">
            <span
              key={currentMsg.id || currentIdx}
              className="font-semibold tracking-wide truncate animate-fadeIn"
            >
              {currentMsg.text}
            </span>
          </div>

          <span className="hidden sm:inline-flex items-center gap-0.5 text-[11px] font-bold bg-white/15 group-hover:bg-white/25 px-2.5 py-0.5 rounded-full border border-white/25 transition-transform group-hover:translate-x-0.5 shrink-0 ml-1">
            <span>Đặt lịch ngay</span>
            <ChevronRight className="w-3 h-3" />
          </span>
        </Link>
      </div>
    </aside>
  );
};
