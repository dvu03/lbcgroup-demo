import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { PageHeroBanner } from '../components/common/PageHeroBanner';
import { SectionTitle } from '../components/common/SectionTitle';
import { useDemoData } from '../context/DemoDataContext';
import { ArrowRight, CheckCircle2, Calendar, Stethoscope } from 'lucide-react';

export const ServicesListPage: React.FC = () => {
  const { services, pagesConfig } = useDemoData();
  const pageConfig = pagesConfig?.['dich-vu'];

  return (
    <>
      <SEOHead
        title="Dịch vụ Điều trị Da liễu Chuyên sâu | Lạc's Beauty Center"
        description="Danh sách 9 dịch vụ khám và điều trị da liễu chuẩn y khoa tại Lạc's Beauty Center Cần Thơ: trị mụn kháng trị, sẹo rỗ, nám tàn nhang, nâng cơ RF, triệt lông..."
      />

      <PageHeroBanner
        pageId="dich-vu"
        breadcrumbLabel="Dịch vụ điều trị"
        defaultBadge="Phác đồ điều trị chuẩn y khoa"
        defaultTitle="9 Dịch Vụ Điều Trị Da Liễu Chuyên Sâu"
        defaultDescription="Tất cả các dịch vụ đều được bác sĩ chuyên khoa da liễu sau đại học trực tiếp thăm khám, lập phác đồ cá nhân hóa và theo dõi tiến trình hồi phục."
      />

      <section className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between medical-card-hover group"
            >
              {/* Image Header */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={srv.coverImage}
                  alt={srv.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-primary-800 shadow-sm uppercase tracking-wide">
                  {srv.shortName}
                </span>
                {!srv.isDoctorApproved && (
                  <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[9px] font-semibold bg-amber-100 text-amber-900 border border-amber-300 backdrop-blur-sm">
                    Cần BS duyệt
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 group-hover:text-primary-700 transition-colors leading-snug">
                    {srv.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {srv.metaDescription}
                  </p>

                  {/* 2 Suitable Candidates Bullets */}
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                    {srv.suitableFor.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary-600 shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer link */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/dich-vu/${srv.slug}`}
                    className="text-xs font-semibold text-primary-600 group-hover:text-primary-700 inline-flex items-center gap-1"
                  >
                    <span>Xem chi tiết phác đồ</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to={`/dat-lich-kham?dich-vu=${srv.slug}`}
                    className="p-1.5 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-600 hover:text-white transition-colors"
                    title="Đặt lịch dịch vụ này"
                  >
                    <Calendar className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
