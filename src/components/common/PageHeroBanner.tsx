import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, ChevronRight } from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';
import { Breadcrumbs } from './Breadcrumbs';

export interface PageHeroBannerProps {
  pageId: string;
  defaultBadge?: string;
  defaultTitle?: string;
  defaultDescription?: string;
  defaultDesktopImage?: string;
  breadcrumbLabel?: string;
  children?: React.ReactNode;
}

export const PageHeroBanner: React.FC<PageHeroBannerProps> = ({
  pageId,
  defaultBadge,
  defaultTitle,
  defaultDescription,
  defaultDesktopImage,
  breadcrumbLabel,
  children
}) => {
  const { pagesConfig } = useDemoData();
  const config = pagesConfig?.[pageId];

  // If banner is explicitly disabled in CMS, render only breadcrumb (or nothing)
  if (config && config.enabled === false) {
    if (config.showBreadcrumbs !== false && breadcrumbLabel) {
      return <Breadcrumbs items={[{ label: breadcrumbLabel }]} />;
    }
    return null;
  }

  const badge = config?.badge || defaultBadge;
  const title = config?.title || defaultTitle;
  const description = config?.description || defaultDescription;
  const desktopImage = config?.desktopImage || defaultDesktopImage || "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1920&q=80";
  const mobileImage = config?.mobileImage || desktopImage;
  const opacity = typeof config?.overlayOpacity === 'number' ? config.overlayOpacity : 75;
  const alignment = config?.alignment || 'center';
  const showBreadcrumbs = config?.showBreadcrumbs !== false;

  const alignClasses =
    alignment === 'left'
      ? 'text-left items-start mx-0'
      : alignment === 'right'
      ? 'text-right items-end ml-auto'
      : 'text-center items-center mx-auto';

  const overlayBgClass =
    config?.overlayColor === 'primary'
      ? 'from-primary-950 via-primary-950/80 to-transparent'
      : config?.overlayColor === 'light'
      ? 'from-white/95 via-white/80 to-white/30 text-slate-900'
      : 'from-slate-950 via-slate-950/70 to-slate-950/40 text-white';

  const isLight = config?.overlayColor === 'light';

  return (
    <>
      {showBreadcrumbs && breadcrumbLabel && (
        <Breadcrumbs items={[{ label: breadcrumbLabel }]} />
      )}

      <section className="relative py-14 sm:py-20 md:py-24 overflow-hidden bg-slate-950 text-white">
        {/* Background Images */}
        <picture className="absolute inset-0 w-full h-full">
          {mobileImage && (
            <source media="(max-width: 640px)" srcSet={mobileImage} />
          )}
          <img
            src={desktopImage}
            alt={title || "Banner"}
            className="w-full h-full object-cover brightness-[0.85]"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1920&q=80";
            }}
          />
        </picture>

        {/* Dynamic Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t ${overlayBgClass}`}
          style={{ opacity: opacity / 100 }}
        />

        {/* Banner Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`max-w-3xl flex flex-col ${alignClasses} space-y-4`}>
            {badge && (
              <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider backdrop-blur-md ${
                isLight
                  ? 'bg-primary-100 text-primary-800 border border-primary-200'
                  : 'bg-primary-500/20 text-primary-300 border border-primary-400/30'
              }`}>
                {badge}
              </span>
            )}

            {title && (
              <h1 className={`font-heading text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight leading-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {title}
              </h1>
            )}

            {description && (
              <p className={`text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl ${
                isLight ? 'text-slate-600' : 'text-slate-200'
              }`}>
                {description}
              </p>
            )}

            {/* CTAs */}
            {(config?.cta1Enabled || config?.cta2Enabled) && (
              <div className={`pt-3 flex flex-wrap gap-3 ${alignment === 'center' ? 'justify-center' : alignment === 'right' ? 'justify-end' : 'justify-start'}`}>
                {config?.cta1Enabled && config.cta1Text && (
                  <Link
                    to={config.cta1Link || '/dat-lich-kham'}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs sm:text-sm shadow-lg transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{config.cta1Text}</span>
                  </Link>
                )}

                {config?.cta2Enabled && config.cta2Text && (
                  <Link
                    to={config.cta2Link || '/doi-ngu-bac-si'}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-xs sm:text-sm backdrop-blur-md border transition-all ${
                      isLight
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                        : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                    }`}
                  >
                    <span>{config.cta2Text}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            )}

            {children}
          </div>
        </div>
      </section>
    </>
  );
};
