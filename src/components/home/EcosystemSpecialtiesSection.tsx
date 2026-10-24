import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Stethoscope, FlaskConical, Pill, Sparkles, GraduationCap } from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';
import { SectionTitle } from '../common/SectionTitle';

export const EcosystemSpecialtiesSection: React.FC = () => {
  const { specialties } = useDemoData();

  const getIcon = (slug: string) => {
    switch (slug) {
      case 'khoa-da-lieu': return <Stethoscope className="w-5 h-5 text-white" />;
      case 'khoa-xet-nghiem': return <FlaskConical className="w-5 h-5 text-white" />;
      case 'nha-thuoc': return <Pill className="w-5 h-5 text-white" />;
      case 'duoc-my-pham': return <Sparkles className="w-5 h-5 text-white" />;
      case 'dao-tao': return <GraduationCap className="w-5 h-5 text-white" />;
      default: return <Stethoscope className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        badge="Hệ sinh thái y tế toàn diện"
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
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.75]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>
              
              {/* Badge */}
              <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 sm:px-2.5 py-0.5 rounded-full text-[8px] sm:text-[10px] font-bold bg-primary-900/80 text-primary-200 border border-primary-500/30 backdrop-blur-sm uppercase">
                {spec.badge || 'Chuyên khoa'}
              </span>

              {/* Floating Icon */}
              <div className="absolute -bottom-3 sm:-bottom-4 right-2 sm:right-4 w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary-600 shadow-lg flex items-center justify-center border-2 border-white group-hover:scale-110 transition-transform">
                <span className="scale-75 sm:scale-100">{getIcon(spec.slug)}</span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between pt-4 sm:pt-6 space-y-2 sm:space-y-3">
              <div>
                <span className="text-[9px] sm:text-[10px] font-bold text-primary-600 uppercase tracking-wider block mb-0.5 sm:mb-1">
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
