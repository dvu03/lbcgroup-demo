import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionTitle } from '../components/common/SectionTitle';
import { useDemoData } from '../context/DemoDataContext';
import { Cpu, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';

export const TechnologiesListPage: React.FC = () => {
  const { technologies } = useDemoData();

  return (
    <>
      <SEOHead
        title="Công nghệ Cao & Thiết bị Y tế | Lạc's Beauty Center"
        description="Khám phá các công nghệ tiên tiến tại Lạc's Beauty Center Cần Thơ: máy soi da VISIA 3D, nâng cơ RF Jovena, HIFU, Laser thẩm mỹ vi điểm..."
      />

      <Breadcrumbs items={[{ label: 'Công nghệ' }]} />

      <section className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Thiết bị y tế chính hãng"
          title="Hệ Thống Công Nghệ Cao Tại Lạc's"
          subtitle="Đầu tư đồng bộ hệ thống thiết bị y tế hiện đại nhập khẩu chính hãng, phục vụ đắc lực cho các phác đồ y học cá nhân hóa."
        />

        <div className="mb-8 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
          <span>
            <strong>Tuân thủ Nghị định 342/2025/NĐ-CP:</strong> Toàn bộ thiết bị được trình bày dưới góc độ dịch vụ điều trị chuyên môn tại phòng khám, không quảng cáo thương mại phóng đại tính năng thiết bị.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {technologies.map((tech) => (
            <div
              key={tech.id}
              className="rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between medical-card-hover group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={tech.imageUrl}
                  alt={tech.name}
                  className="w-full h-full object-cover brightness-[0.80] group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary-900/80 text-primary-200 border border-primary-500/30 uppercase">
                  {tech.code}
                </span>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-semibold text-primary-700 block mb-1">
                    {tech.deviceOrigin}
                  </span>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 group-hover:text-primary-700 transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {tech.principle}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <Link
                    to={`/cong-nghe/${tech.slug}`}
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 group-hover:bg-primary-50 text-slate-700 group-hover:text-primary-700 font-semibold text-xs flex items-center justify-between transition-colors"
                  >
                    <span>Xem nguyên lý & quy trình</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
