import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Award, Calendar } from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';
import { DEFAULT_DOCTOR_AVATAR } from '../../data/doctors';
import { SectionTitle } from '../common/SectionTitle';

export const DoctorsSection: React.FC = () => {
  const { doctors } = useDemoData();

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-slate-50/80 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Bác Sĩ Trình Độ Sau Đại Học"
          subtitle="100% Bác sĩ tại phòng khám tốt nghiệp chuyên khoa Da liễu sau đại học từ các trường Đại học Y Dược danh tiếng, trực tiếp thăm khám và theo dõi suốt phác đồ."
        />

        {/* 4 Cards: 2 cols on mobile, 4 cols on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between medical-card-hover group"
            >
              {/* Doctor Portrait (3:4 ratio maintained without face cut) */}
              <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                <img
                  src={doc.avatarUrl || DEFAULT_DOCTOR_AVATAR}
                  alt={doc.formalTitle}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== DEFAULT_DOCTOR_AVATAR) {
                      target.src = DEFAULT_DOCTOR_AVATAR;
                    }
                  }}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                {/* Degree Tag */}
                <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 sm:px-2.5 py-0.5 rounded-full text-[8px] sm:text-[10px] font-bold bg-primary-900/80 text-primary-200 border border-primary-500/40 backdrop-blur-sm">
                  {doc.degree.split(',')[0]}
                </span>

                {/* Experience badge */}
                <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 flex items-center justify-between text-white text-[9px] sm:text-[11px]">
                  <span className="bg-slate-900/75 px-1.5 sm:px-2 py-0.5 rounded-md backdrop-blur-sm font-semibold truncate">
                    {doc.experienceYears && doc.experienceYears > 0 ? `${doc.experienceYears}+ Năm KN` : 'Bác sĩ Da liễu'}
                  </span>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
                <div>
                  <span className="text-[9px] sm:text-[11px] font-semibold text-primary-700 uppercase tracking-wider block truncate">
                    {doc.roleAtClinic}
                  </span>
                  <h3 className="font-heading font-bold text-xs sm:text-base lg:text-lg text-slate-900 group-hover:text-primary-700 transition-colors leading-snug line-clamp-1">
                    {doc.formalTitle}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 line-clamp-2 leading-relaxed">
                    {doc.shortSummary}
                  </p>
                </div>

                {/* Action Links */}
                <div className="pt-2 sm:pt-3 border-t border-slate-100 space-y-1 sm:space-y-1.5">
                  <Link
                    to={`/${doc.slug}`}
                    className="w-full py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg sm:rounded-xl bg-primary-50 group-hover:bg-primary-600 text-primary-700 group-hover:text-white font-semibold text-[10px] sm:text-xs flex items-center justify-center gap-1 transition-all shadow-xs"
                  >
                    <span>Xem hồ sơ</span>
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </Link>
                  <Link
                    to={`/dat-lich-kham?bac-si=${doc.slug}`}
                    className="w-full py-1 text-center text-[10px] sm:text-[11px] font-medium text-slate-500 hover:text-primary-700 block transition-colors truncate"
                  >
                    Đặt lịch với BS
                  </Link>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all doctors */}
        <div className="mt-10 text-center">
          <Link
            to="/doi-ngu-bac-si"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-800 font-semibold text-xs sm:text-sm border border-slate-200 shadow-sm transition-all"
          >
            <span>Xem chi tiết danh sách Đội ngũ Bác sĩ</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
