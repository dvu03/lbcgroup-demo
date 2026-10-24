import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Award, Shield, HeartHandshake } from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';

export const AboutSummarySection: React.FC = () => {
  const { siteConfig } = useDemoData();
  const about = siteConfig.aboutConfig;

  const mainImage = about?.mainImage || "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80";
  const subImages = about?.subImages?.length ? about.subImages : [
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80"
  ];
  const metricNumber = about?.metricNumber || "10.000+";
  const metricLabel = about?.metricLabel || "Ca điều trị chuẩn Y khoa";
  const metricBadge = about?.metricBadge || "VISIA 3D";
  const badge = about?.badge || "Về chúng tôi";
  const title = about?.title || siteConfig.facilityName;
  const description = about?.description || "Tọa lạc tại trung tâm thành phố Cần Thơ, Lạc's Beauty Center được xây dựng với định vị là phòng khám da liễu chuẩn y khoa chuyên sâu. Chúng tôi không chạy theo các trào lưu làm đẹp lột tẩy cấp tốc, mà kiên định theo đuổi triết lý Y học Cá nhân hóa: mỗi làn da cần một phác đồ khoa học riêng biệt dựa trên bằng chứng soi da vi thể và theo dõi sát sao của bác sĩ chuyên khoa sau đại học.";
  const ctaText = about?.ctaText || "Xem câu chuyện thương hiệu";
  const ctaLink = about?.ctaLink || "/gioi-thieu";

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-slate-50/70 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Visual Collage (1 large photo + 3 mini activity photos) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
              <img
                src={mainImage}
                alt="Không gian sảnh phòng khám Lạc's Beauty Center"
                onError={(e) => {
                  e.currentTarget.src = '/images/fallback-clinic.svg';
                }}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
              
              {/* Overlay Metric Badge */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-6 sm:right-6 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-slate-100 flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] sm:text-[11px] font-bold text-primary-700 uppercase tracking-wider block truncate">
                    {metricLabel}
                  </span>
                  <span className="font-heading text-lg sm:text-2xl font-bold text-slate-900 leading-tight block">
                    {metricNumber}
                  </span>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-[10px] sm:text-xs shrink-0">
                  {metricBadge}
                </div>
              </div>
            </div>

            {/* 3 Activity Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              {subImages.slice(0, 3).map((imgUrl, i) => (
                <div key={i} className="rounded-2xl overflow-hidden shadow-sm aspect-[4/3] border-2 border-white">
                  <img
                    src={imgUrl}
                    alt={`Hoạt động phòng khám ${i + 1}`}
                    onError={(e) => {
                      e.currentTarget.src = '/images/fallback-clinic.svg';
                    }}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Brand Narrative & 3 Focus Points */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-700 uppercase tracking-wider mb-3">
                {badge}
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                {title}
              </h2>
              <p className="mt-4 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
                {description}
              </p>
            </div>

            {/* 3 Focus Points */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-primary-200 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-slate-900">
                    Đội ngũ Chuyên môn Sau Đại học
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    100% bác sĩ có học vị Thạc sĩ, Bác sĩ Chuyên khoa I & II giàu kinh nghiệm, trực tiếp khám và lên phác đồ.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-primary-200 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-slate-900">
                    Công nghệ Tiên tiến & Minh bạch
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Đơn vị sở hữu máy soi da VISIA 3D đầu tiên tại Việt Nam, máy nâng cơ RF Jovena, HIFU và Laser nhập khẩu chính hãng.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-primary-200 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-slate-900">
                    Không gian Chuẩn Y khoa & Tận tâm
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Hệ thống 2 cơ sở khang trang, phòng thủ thuật vô trùng khép kín và phong cách phục vụ chu đáo, gần gũi với người miền Tây.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to={ctaLink}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/doi-ngu-bac-si"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-all"
              >
                <span>Hồ sơ Bác sĩ</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
