import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDemoData } from '../../context/DemoDataContext';
import { DynamicIcon } from './DynamicIcon';
import { BackToTopConfig } from '../../data/siteConfig';

export const DEFAULT_BACK_TO_TOP_CONFIG: BackToTopConfig = {
  enabled: true,
  iconName: 'ArrowUp',
  position: 'bottom-right',
  bottomOffsetDesktop: 96, // 96px from bottom on desktop: stays comfortably above floating contact (24px + 56px + 16px gap)
  bottomOffsetMobile: 76,  // 76px from bottom on mobile: stays above the mobile fixed action bar (56px + 20px gap)
  sideOffset: 24,
  backgroundColor: '#0E7C86',
  iconColor: '#FFFFFF',
  hoverBackgroundColor: '#096068',
  size: 'md',
  borderRadius: 'full',
  scrollThreshold: 300,
  tooltipText: 'Lên đầu trang'
};

export const BackToTop: React.FC = () => {
  const { siteConfig } = useDemoData();
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  const config: BackToTopConfig = {
    ...DEFAULT_BACK_TO_TOP_CONFIG,
    ...(siteConfig.backToTop || {})
  };

  // Hide on admin route
  const isAdmin = location.pathname.startsWith('/demo-admin');

  useEffect(() => {
    if (!config.enabled || isAdmin) {
      setIsVisible(false);
      return;
    }

    let ticking = false;
    const threshold = config.scrollThreshold || 300;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY || document.documentElement.scrollTop;
          setIsVisible(currentScrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll position on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [config.enabled, config.scrollThreshold, isAdmin]);

  if (!config.enabled || isAdmin || !isVisible) {
    return null;
  }

  const handleScrollToTop = () => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };

  // Size mapping
  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-14 h-14 text-base'
  }[config.size || 'md'];

  const iconSizes = {
    sm: 18,
    md: 20,
    lg: 24
  }[config.size || 'md'];

  // Border radius mapping
  const radiusClasses = {
    full: 'rounded-full',
    xl: 'rounded-2xl',
    lg: 'rounded-xl'
  }[config.borderRadius || 'full'];

  const isRight = (config.position || 'bottom-right') === 'bottom-right';

  return (
    <div
      className={`fixed z-40 transition-all duration-300 ease-out animate-fadeIn ${
        isRight ? 'right-4 sm:right-6' : 'left-4 sm:left-6'
      }`}
      style={{
        bottom: `${config.bottomOffsetDesktop || 96}px`,
        // Mobile custom offset handling via media query styled inline
      }}
    >
      <style>{`
        @media (max-width: 639px) {
          .back-to-top-btn-container {
            bottom: ${config.bottomOffsetMobile || 76}px !important;
          }
        }
      `}</style>

      <div className="back-to-top-btn-container relative group">
        <button
          type="button"
          onClick={handleScrollToTop}
          aria-label={config.tooltipText || "Cuộn lên đầu trang"}
          className={`${sizeClasses} ${radiusClasses} shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 focus:outline-hidden focus:ring-3 focus:ring-emerald-400 border-2 border-white/60 pointer-events-auto`}
          style={{
            backgroundColor: config.backgroundColor || '#0E7C86',
            color: config.iconColor || '#FFFFFF'
          }}
          onMouseEnter={(e) => {
            if (config.hoverBackgroundColor) {
              e.currentTarget.style.backgroundColor = config.hoverBackgroundColor;
            }
          }}
          onMouseLeave={(e) => {
            if (config.backgroundColor) {
              e.currentTarget.style.backgroundColor = config.backgroundColor;
            }
          }}
        >
          <DynamicIcon
            name={config.iconName || 'ArrowUp'}
            url={config.iconUrl}
            size={iconSizes}
            className="transition-transform group-hover:-translate-y-0.5 duration-200"
          />
        </button>

        {/* Hover Tooltip (Desktop) */}
        {config.tooltipText && (
          <div
            className={`hidden sm:block absolute ${
              isRight ? 'right-full mr-2.5' : 'left-full ml-2.5'
            } top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-neutral-900/90 text-white text-[11px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md backdrop-blur-xs`}
          >
            {config.tooltipText}
          </div>
        )}
      </div>
    </div>
  );
};
