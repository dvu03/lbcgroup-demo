import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';
import { SectionTitle } from '../common/SectionTitle';

export const EcosystemSpecialtiesSection: React.FC = () => {
  const { specialties, siteConfig } = useDemoData();
  const config = siteConfig.specialtiesSectionConfig;

  // If section is toggled off in CMS, do not render
  if (config && config.enabled === false) {
    return null;
  }

  const title = config?.title || "5 Chuyên khoa & Lĩnh vực Trọng tâm";
  const subtitle = config?.subtitle || "Mô hình khép kín kết hợp giữa thăm khám da liễu, xét nghiệm hỗ trợ, nhà thuốc chuẩn GPP, dược mỹ phẩm quốc tế và học viện đào tạo nghề chuyên sâu.";
  const defaultBadge = config?.defaultBadgeText || "Chuyên khoa";

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

  return (
    <section
      className={`${paddingClass} transition-colors`}
      style={{
        backgroundColor: config?.backgroundColor && config.backgroundColor !== 'transparent' ? config.backgroundColor : undefined,
        color: config?.textColor || undefined
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={title}
          subtitle={subtitle}
        />

        {desktopLayout === '3-2' ? (
          /* 6-Column Grid: Row 1 = 3 banners (lg:col-span-2), Row 2 = 2 banners (lg:col-span-3) */
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 ${gapClass}`}>
            {displayItems.map((spec, index) => {
              // Row 1: 3 items (each takes 2 cols out of 6)
              // Row 2: 2 items (each takes 3 cols out of 6)
              // Tablet (2 cols): 5th item spans both cols for balanced layout
              const colSpanClass =
                index < 3
                  ? 'col-span-1 md:col-span-1 lg:col-span-2'
                  : 'col-span-1 md:col-span-1 lg:col-span-3 md:last:col-span-2 lg:last:col-span-3';

              const badgeText = spec.badge?.trim() || defaultBadge;

              return (
                <div
                  key={spec.id}
                  className={`group relative overflow-hidden bg-white border border-slate-100 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-row items-stretch min-h-[175px] sm:min-h-[185px] lg:min-h-[190px] ${colSpanClass}`}
                  style={{
                    backgroundColor: spec.bgColor || undefined,
                    color: spec.textColor || undefined
                  }}
                >
                  {/* Left Content Area (approx 58-60% width) */}
                  <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between z-10 min-w-0 pr-2 sm:pr-3">
                    <div>
                      {/* Badge "Chuyên khoa" */}
                      {config?.showBadge !== false && (
                        <div className="mb-1.5 sm:mb-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100">
                            {badgeText}
                          </span>
                        </div>
                      )}

                      {/* Banner Title */}
                      <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 leading-snug">
                        {spec.name}
                      </h3>

                      {/* Banner Description (<= 120 chars) */}
                      <p className="text-[11px] sm:text-xs text-slate-500 mt-1 sm:mt-1.5 line-clamp-2 leading-relaxed">
                        {spec.shortDesc}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-2 sm:pt-3">
                      <Link
                        to={spec.ctaLink || `/${spec.slug}`}
                        style={{
                          backgroundColor: spec.btnBgColor || undefined,
                          color: spec.btnTextColor || undefined
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 hover:bg-emerald-600 text-slate-700 hover:text-white border border-slate-200/70 hover:border-emerald-600 transition-all duration-200 group/btn shadow-2xs"
                      >
                        <span>{spec.ctaText || "Tìm hiểu"}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform shrink-0" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Image Illustration (approx 40-42% width) */}
                  <div className="w-[38%] sm:w-[40%] relative overflow-hidden shrink-0 self-stretch">
                    <img
                      src={spec.heroImage}
                      alt={spec.altText || spec.name}
                      onError={(e) => {
                        e.currentTarget.src = "/images/fallback-clinic.svg";
                      }}
                      style={{
                        objectPosition: spec.imagePosition || "center center"
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.98]"
                    />
                    {/* Soft gradient edge to blend smoothly into card background without harsh line */}
                    <div className="absolute inset-y-0 left-0 w-6 sm:w-8 bg-gradient-to-r from-white via-white/50 to-transparent pointer-events-none" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Standard 2 or 3 Column Grid */
          <div
            className={`grid grid-cols-1 ${
              desktopLayout === '3-cols' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'
            } ${gapClass}`}
          >
            {displayItems.map((spec) => {
              const badgeText = spec.badge?.trim() || defaultBadge;

              return (
                <div
                  key={spec.id}
                  className="group relative overflow-hidden bg-white border border-slate-100 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-row items-stretch min-h-[175px] sm:min-h-[185px] lg:min-h-[190px]"
                  style={{
                    backgroundColor: spec.bgColor || undefined,
                    color: spec.textColor || undefined
                  }}
                >
                  <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between z-10 min-w-0 pr-2 sm:pr-3">
                    <div>
                      {config?.showBadge !== false && (
                        <div className="mb-1.5 sm:mb-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100">
                            {badgeText}
                          </span>
                        </div>
                      )}
                      <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 leading-snug">
                        {spec.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-500 mt-1 sm:mt-1.5 line-clamp-2 leading-relaxed">
                        {spec.shortDesc}
                      </p>
                    </div>

                    <div className="pt-2 sm:pt-3">
                      <Link
                        to={spec.ctaLink || `/${spec.slug}`}
                        style={{
                          backgroundColor: spec.btnBgColor || undefined,
                          color: spec.btnTextColor || undefined
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 hover:bg-emerald-600 text-slate-700 hover:text-white border border-slate-200/70 hover:border-emerald-600 transition-all duration-200 group/btn shadow-2xs"
                      >
                        <span>{spec.ctaText || "Tìm hiểu"}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform shrink-0" />
                      </Link>
                    </div>
                  </div>

                  <div className="w-[38%] sm:w-[40%] relative overflow-hidden shrink-0 self-stretch">
                    <img
                      src={spec.heroImage}
                      alt={spec.altText || spec.name}
                      onError={(e) => {
                        e.currentTarget.src = "/images/fallback-clinic.svg";
                      }}
                      style={{
                        objectPosition: spec.imagePosition || "center center"
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.98]"
                    />
                    <div className="absolute inset-y-0 left-0 w-6 sm:w-8 bg-gradient-to-r from-white via-white/50 to-transparent pointer-events-none" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
