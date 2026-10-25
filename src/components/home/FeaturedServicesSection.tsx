import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarCheck } from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';
import { SectionTitle } from '../common/SectionTitle';
import { DynamicIcon } from '../common/DynamicIcon';

export const FeaturedServicesSection: React.FC = () => {
  const { services } = useDemoData();

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-primary-50/40 border-y border-primary-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Dịch Vụ Điều Trị Chuyên Sâu"
          subtitle="9 dịch vụ da liễu và thẩm mỹ được trực tiếp Bác sĩ Sau đại học chẩn đoán và theo dõi định kỳ suốt liệu trình."
        />

        {/* 10-Item Grid (9 Services + 1 VISIA 3D Slot) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {services.map((srv) => (
            <Link
              key={srv.id}
              to={`/dich-vu/${srv.slug}`}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-primary-400 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group medical-card-hover"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary-50 group-hover:bg-primary-600 group-hover:scale-110 flex items-center justify-center transition-all duration-300 shadow-sm mb-3">
                <DynamicIcon
                  name={srv.iconName}
                  url={srv.iconUrl}
                  className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors"
                />
              </div>
              <h3 className="font-heading font-bold text-xs sm:text-sm text-slate-900 group-hover:text-primary-700 transition-colors leading-snug">
                {srv.shortName}
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {srv.name}
              </p>
              <span className="mt-3 text-[11px] font-semibold text-primary-600 inline-flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                Xem phác đồ <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}

          {/* Ô thứ 10: Đặt lịch soi da VISIA 3D - tư vấn */}
          <Link
            to="/dat-lich-kham"
            className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 text-white shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center group medical-card-hover"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 group-hover:bg-white text-white group-hover:text-primary-700 group-hover:scale-110 flex items-center justify-center transition-all duration-300 shadow-sm mb-3 backdrop-blur-sm">
              <CalendarCheck className="w-7 h-7" />
            </div>
            <h3 className="font-heading font-bold text-xs sm:text-sm text-white leading-snug">
              Đặt lịch soi da VISIA 3D
            </h3>
            <p className="text-[11px] text-primary-100 mt-1 line-clamp-2 leading-relaxed">
              Khám & Phân tích 8 chỉ số chuyên sâu cùng Bác sĩ
            </p>
            <span className="mt-3 px-3 py-1 rounded-full bg-white text-primary-800 text-[10px] font-bold tracking-wide uppercase shadow">
              Đăng ký ngay
            </span>
          </Link>
        </div>

        {/* View All Services Link */}
        <div className="mt-10 text-center">
          <Link
            to="/dich-vu"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-primary-50 text-primary-700 font-semibold text-xs sm:text-sm border border-primary-200 shadow-sm transition-all"
          >
            <span>Khám phá chi tiết toàn bộ 9 dịch vụ điều trị</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
