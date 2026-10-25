import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';
import { SectionTitle } from '../common/SectionTitle';
import { Specialty } from '../../data/specialties';
import { EcosystemSpecialtiesSectionConfig } from '../../data/siteConfig';

// Helper to convert hex to rgba string
function hexToRgba(hexCode: string, alpha: number): string {
  let clean = (hexCode || '#000000').replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('');
  }
  if (clean.length !== 6) {
    return `rgba(0, 0, 0, ${alpha})`;
  }
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Compute 100% coverage overlay style based on banner overrides and section config
function computeOverlayStyle(
  banner: Specialty,
  config?: EcosystemSpecialtiesSectionConfig
): React.CSSProperties {
  const isEnabled =
    banner.overlayEnabled !== undefined
      ? banner.overlayEnabled
      : config?.overlayEnabled !== false;

  if (!isEnabled) {
    return { display: 'none' };
  }

  // Determine base overlay color
  const rawColor = banner.overlayColor || config?.overlayColor || 'black';
  let hex = '#000000';
  if (rawColor === 'white') hex = '#FFFFFF';
  else if (rawColor === 'black') hex = '#000000';
  else if (rawColor === 'custom') {
    hex = banner.overlayCustomColor || config?.overlayCustomColor || '#000000';
  } else if (rawColor.startsWith('#')) {
    hex = rawColor;
  }

  // Base opacity: 0 to 80 (default 20)
  const opacityVal =
    banner.overlayOpacity !== undefined
      ? banner.overlayOpacity
      : config?.overlayOpacity !== undefined
      ? config.overlayOpacity
      : 20;

  const baseAlpha = Math.max(0, Math.min(0.8, opacityVal / 100));
  const mode = banner.overlayMode || config?.overlayMode || 'gradient-left';

  if (mode === 'solid') {
    return {
      backgroundColor: hexToRgba(hex, baseAlpha)
    };
  }

  if (mode === 'gradient-bottom') {
    const startA =
      banner.overlayGradientStart !== undefined
        ? banner.overlayGradientStart / 100
        : Math.min(0.92, baseAlpha * 1.5 + 0.35);
    const endA =
      banner.overlayGradientEnd !== undefined
        ? banner.overlayGradientEnd / 100
        : Math.max(0, baseAlpha * 0.3);

    return {
      background: `linear-gradient(to top, ${hexToRgba(hex, startA)} 0%, ${hexToRgba(
        hex,
        (startA + endA) / 2
      )} 55%, ${hexToRgba(hex, endA)} 100%)`
    };
  }

  // Default: 'gradient-left'
  // Stronger scrim on the left where text resides, soft transparent fade to the right where photo is vibrant
  const startA =
    banner.overlayGradientStart !== undefined
      ? banner.overlayGradientStart / 100
      : Math.min(0.92, baseAlpha * 1.6 + 0.32);
  const midA = Math.min(
    0.85,
    (startA +
      (banner.overlayGradientEnd !== undefined
        ? banner.overlayGradientEnd / 100
        : baseAlpha * 0.35)) /
      2
  );
  const endA =
    banner.overlayGradientEnd !== undefined
      ? banner.overlayGradientEnd / 100
      : Math.max(0, baseAlpha * 0.35);

  return {
    background: `linear-gradient(to right, ${hexToRgba(hex, startA)} 0%, ${hexToRgba(
      hex,
      midA
    )} 60%, ${hexToRgba(hex, endA)} 100%)`
  };
}

// Compute text and button styling according to overlay light/dark contrast
function computeBannerTypography(
  banner: Specialty,
  config?: EcosystemSpecialtiesSectionConfig
) {
  const rawColor = banner.overlayColor || config?.overlayColor || 'black';
  const isLightOverlay = rawColor === 'white';

  const titleColor =
    banner.titleColor || banner.textColor || (isLightOverlay ? '#0F172A' : '#FFFFFF');
  const descColor = banner.descColor || (isLightOverlay ? '#334155' : '#F1F5F9');

  const badgeStyle: React.CSSProperties = {
    color: banner.badgeColor || (isLightOverlay ? '#047857' : '#FFFFFF'),
    backgroundColor:
      banner.badgeBgColor ||
      (isLightOverlay ? 'rgba(236, 253, 245, 0.95)' : 'rgba(255, 255, 255, 0.22)'),
    borderColor: isLightOverlay
      ? 'rgba(167, 243, 208, 0.9)'
      : 'rgba(255, 255, 255, 0.35)'
  };

  const btnStyle: React.CSSProperties = {
    backgroundColor:
      banner.btnBgColor || (isLightOverlay ? '#047857' : '#FFFFFF'),
    color: banner.btnTextColor || (isLightOverlay ? '#FFFFFF' : '#0F172A')
  };

  return { titleColor, descColor, badgeStyle, btnStyle, isLightOverlay };
}

export const EcosystemSpecialtiesSection: React.FC = () => {
  const { specialties, siteConfig } = useDemoData();
  const config = siteConfig.specialtiesSectionConfig;

  // If section is toggled off in CMS, do not render
  if (config && config.enabled === false) {
    return null;
  }

  const title = config?.title || '5 Chuyên khoa & Lĩnh vực Trọng tâm';
  const subtitle =
    config?.subtitle ||
    'Mô hình khép kín kết hợp giữa thăm khám da liễu, xét nghiệm hỗ trợ, nhà thuốc chuẩn GPP, dược mỹ phẩm quốc tế và học viện đào tạo nghề chuyên sâu.';
  const defaultBadge = config?.defaultBadgeText || 'Chuyên khoa';

  // Filter only enabled specialties and sort by order
  const displayItems = specialties
    .filter((s) => s.enabled !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  // Spacing configuration
  const paddingClass =
    config?.paddingY === 'compact'
      ? 'py-8 sm:py-10 md:py-12'
      : config?.paddingY === 'spacious'
      ? 'py-16 sm:py-20 md:py-24'
      : 'py-12 sm:py-16 md:py-20';

  const gapClass =
    config?.gap === 'sm'
      ? 'gap-3 sm:gap-3.5'
      : config?.gap === 'lg'
      ? 'gap-5 sm:gap-6'
      : 'gap-3.5 sm:gap-4 lg:gap-5';

  const desktopLayout = config?.desktopLayout || '3-2';

  // Banner height class
  const heightClass =
    config?.bannerHeight === 'compact'
      ? 'min-h-[200px] sm:min-h-[210px] lg:min-h-[220px]'
      : config?.bannerHeight === 'tall'
      ? 'min-h-[245px] sm:min-h-[260px] lg:min-h-[275px]'
      : 'min-h-[220px] sm:min-h-[235px] lg:min-h-[245px]';

  const renderBannerCard = (spec: Specialty, colSpanClass: string) => {
    const badgeText = spec.badge?.trim() || defaultBadge;
    const overlayStyle = computeOverlayStyle(spec, config);
    const { titleColor, descColor, badgeStyle, btnStyle, isLightOverlay } =
      computeBannerTypography(spec, config);

    const position = spec.contentPosition || 'left';
    const contentAlignClass =
      position === 'center'
        ? 'items-center text-center'
        : position === 'bottom'
        ? 'items-start justify-end text-left'
        : 'items-start text-left';

    const textWidthClass =
      position === 'center'
        ? 'max-w-xl mx-auto'
        : colSpanClass.includes('lg:col-span-3')
        ? 'max-w-[85%] sm:max-w-[75%] lg:max-w-[65%]'
        : 'max-w-[90%] sm:max-w-[85%] lg:max-w-[75%]';

    return (
      <div
        key={spec.id}
        className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${heightClass} ${colSpanClass} border ${
          isLightOverlay ? 'border-slate-200/80' : 'border-white/15'
        }`}
        style={{
          backgroundColor: spec.bgColor || undefined
        }}
      >
        {/* 1. BACKGROUND IMAGE (covers 100% of banner card) */}
        <img
          src={spec.heroImage}
          alt={spec.altText || spec.name}
          onError={(e) => {
            e.currentTarget.src = '/images/fallback-clinic.svg';
          }}
          style={{
            objectPosition: spec.imagePosition || 'center center'
          }}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
        />

        {/* 2. OVERLAY LAYER (covers 100% of banner card, opacity adjustable via CMS) */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-300"
          style={overlayStyle}
        />

        {/* 3. CONTENT CONTAINER (z-10, relative, crisp text & CTA button never affected by overlay opacity) */}
        <div
          className={`relative z-10 p-5 sm:p-6 flex flex-col justify-between h-full w-full ${contentAlignClass}`}
        >
          {/* Text block */}
          <div className={`${textWidthClass} space-y-2`}>
            {/* Badge "Chuyên khoa" */}
            {config?.showBadge !== false && (
              <div className="mb-1">
                <span
                  style={badgeStyle}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold border backdrop-blur-md shadow-2xs"
                >
                  {badgeText}
                </span>
              </div>
            )}

            {/* Banner Title */}
            <h3
              style={{ color: titleColor }}
              className="font-heading font-bold text-base sm:text-lg lg:text-xl leading-snug line-clamp-1 drop-shadow-xs group-hover:translate-x-0.5 transition-transform"
            >
              {spec.name}
            </h3>

            {/* Banner Description (<= 120 chars) */}
            <p
              style={{ color: descColor }}
              className="text-xs sm:text-sm line-clamp-2 leading-relaxed drop-shadow-2xs opacity-95"
            >
              {spec.shortDesc}
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-3">
            <Link
              to={spec.ctaLink || `/${spec.slug}`}
              style={btnStyle}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold backdrop-blur-md shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group/btn"
            >
              <span>{spec.ctaText || 'Tìm hiểu'}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      className={`${paddingClass} transition-colors`}
      style={{
        backgroundColor:
          config?.backgroundColor && config.backgroundColor !== 'transparent'
            ? config.backgroundColor
            : undefined,
        color: config?.textColor || undefined
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={title} subtitle={subtitle} />

        {desktopLayout === '3-2' ? (
          /* 6-Column Grid: Row 1 = 3 banners (lg:col-span-2), Row 2 = 2 banners (lg:col-span-3) */
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 ${gapClass}`}>
            {displayItems.map((spec, index) => {
              const colSpanClass =
                index < 3
                  ? 'col-span-1 md:col-span-1 lg:col-span-2'
                  : 'col-span-1 md:col-span-1 lg:col-span-3 md:last:col-span-2 lg:last:col-span-3';

              return renderBannerCard(spec, colSpanClass);
            })}
          </div>
        ) : (
          /* Standard 2 or 3 Column Grid */
          <div
            className={`grid grid-cols-1 ${
              desktopLayout === '3-cols'
                ? 'md:grid-cols-2 lg:grid-cols-3'
                : 'md:grid-cols-2'
            } ${gapClass}`}
          >
            {displayItems.map((spec) => renderBannerCard(spec, 'col-span-1'))}
          </div>
        )}
      </div>
    </section>
  );
};
