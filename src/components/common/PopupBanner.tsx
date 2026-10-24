import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';

export const PopupBanner: React.FC = () => {
  const { siteConfig } = useDemoData();
  const [isOpen, setIsOpen] = useState(false);

  const banner = siteConfig.popupBanner;

  useEffect(() => {
    if (!banner?.enabled) {
      setIsOpen(false);
      return;
    }

    try {
      const today = new Date().toISOString().split('T')[0];
      const dismissedDate = localStorage.getItem('lbc_popup_dismissed_date');
      if (dismissedDate === today) {
        setIsOpen(false);
        return;
      }
      // Small timeout so it pops smoothly after initial page load
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    } catch {
      // If localStorage is unavailable, respect enabled flag
      setIsOpen(true);
    }
  }, [banner?.enabled]);

  const handleDismiss = () => {
    setIsOpen(false);
    try {
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem('lbc_popup_dismissed_date', today);
    } catch {
      // ignore storage error
    }
  };

  if (!isOpen || !banner?.enabled) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-banner-title"
    >
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={handleDismiss} />

      <div className="relative w-full max-w-[540px] max-h-[92vh] overflow-y-auto bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-100 z-10 animate-scaleUp">
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md transition-colors"
          aria-label="Đóng thông báo"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* 600x600 Reference Image / Visual */}
        {banner.imageUrl && (
          <div className="relative aspect-[16/10] sm:aspect-[16/10] w-full overflow-hidden bg-slate-100">
            <img
              src={banner.imageUrl}
              alt={banner.title || 'Sự kiện thương hiệu LBC'}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent sm:hidden" />
          </div>
        )}

        {/* Content Box */}
        <div className="p-4 sm:p-7 space-y-3 sm:space-y-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-primary-50 text-primary-700 border border-primary-100 uppercase tracking-wide">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Sự kiện đặc biệt</span>
          </div>

          <h3
            id="popup-banner-title"
            className="font-heading text-lg sm:text-2xl font-bold text-slate-900 leading-tight"
          >
            {banner.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            {banner.description}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to={banner.link || '/he-thong-co-so'}
              onClick={handleDismiss}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <span>Xem chi tiết sự kiện</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={handleDismiss}
              className="w-full sm:w-auto px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium text-xs sm:text-sm transition-all"
            >
              Đóng lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
