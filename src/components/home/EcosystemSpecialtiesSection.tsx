import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';
import { SectionTitle } from '../common/SectionTitle';
import { DynamicIcon } from '../common/DynamicIcon';

export const EcosystemSpecialtiesSection: React.FC = () => {
  const { specialties } = useDemoData();

  return (
    <section className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        title="5 Chuyên khoa & Lĩnh vực Trọng tâm"
        subtitle="Mô hình khép kín kết hợp giữa thăm khám da liễu, xét nghiệm hỗ trợ, nhà thuốc chuẩn GPP, dược mỹ phẩm quốc tế và học viện đào tạo nghề chuyên sâu."
      />

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2.5 sm:gap-4 lg:gap-5">
        {specialties.map((spec) => (
          <div
            key={spec.id}
            className="flex flex-col justify-between rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 medical-card-hover group"
          >
            {/* Card Visual Header */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
              <img
                src={spec.heroImage}
                alt={spec.name}
                onError={(e) => {
                  e.currentTarget.src = '/images/fallback-clinic.svg';
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.78]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
              
              {/* Badge */}
              {spec.badge && (
                <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-medium bg-slate-900/75 text-slate-200 border border-white/20 backdrop-blur-md">
                  {spec.badge}
                </span>
              )}

              {/* Specialty Icon - securely positioned inside header, no overflow-hidden clipping */}
              <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/95 text-primary-700 shadow-md backdrop-blur-md flex items-center justify-center border border-white/60 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 z-10">
                <DynamicIcon
                  name={spec.iconName}
                  url={spec.iconUrl}
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
              </div>
            </div>

            {/* Card Body */}
            <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between pt-3.5 sm:pt-4 space-y-2 sm:space-y-3">
              <div>
                <span className="text-[9px] sm:text-[10px] font-semibold text-primary-700 uppercase tracking-wider block mb-0.5 sm:mb-1">
                  {spec.tagline}
                </span>
                <h3 className="font-heading font-bold text-xs sm:text-base lg:text-lg text-slate-900 group-hover:text-primary-700 transition-colors leading-snug line-clamp-2">
                  {spec.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-1 sm:mt-2 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                  {spec.shortDesc}
                </p>
              </div>

              {/* CTA link */}
              <div className="pt-2 border-t border-slate-100">
                <Link
                  to={`/${spec.slug}`}
                  className="w-full py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg sm:rounded-xl bg-slate-50 group-hover:bg-primary-50 text-slate-700 group-hover:text-primary-700 font-semibold text-[11px] sm:text-xs flex items-center justify-between transition-colors"
                >
                  <span className="truncate">{spec.ctaText}</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform shrink-0 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
