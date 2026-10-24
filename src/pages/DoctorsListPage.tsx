import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { PageHeroBanner } from '../components/common/PageHeroBanner';
import { SectionTitle } from '../components/common/SectionTitle';
import { useDemoData } from '../context/DemoDataContext';
import { DEFAULT_DOCTOR_AVATAR } from '../data/doctors';
import { ArrowRight, GraduationCap, Calendar, Clock, Award } from 'lucide-react';

export const DoctorsListPage: React.FC = () => {
  const { doctors } = useDemoData();

  return (
    <>
      <SEOHead
        title="Đội ngũ Bác sĩ Trình độ Sau Đại học | Lạc's Beauty Center"
        description="Đội ngũ bác sĩ chuyên khoa da liễu có trình độ sau đại học tại Lạc's Beauty Center Cần Thơ. Thạc sĩ, Bác sĩ Chuyên khoa I & II trực tiếp thăm khám."
      />

      <PageHeroBanner
        pageId="doi-ngu-bac-si"
        breadcrumbLabel="Đội ngũ bác sĩ"
        defaultBadge="Chuyên môn sau đại học"
        defaultTitle="Đội Ngũ Bác Sĩ Chuyên Khoa Da Liễu"
        defaultDescription="Hội tụ các chuyên gia da liễu đầu ngành, được đào tạo bài bản sau đại học và tu nghiệp nâng cao tại các trung tâm y khoa quốc tế."
      />

      <section className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between medical-card-hover group"
            >
              {/* Doctor Portrait */}
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
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent"></div>
                
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary-900/80 text-primary-200 border border-primary-500/30 backdrop-blur-sm">
                  {doc.degree.split(',')[0]}
                </span>

                <div className="absolute bottom-3 left-3 right-3 text-white text-xs">
                  <span className="font-semibold">{doc.experienceYears}+ Năm kinh nghiệm</span>
                </div>
              </div>

              {/* Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-semibold text-primary-700 uppercase tracking-wider block">
                    {doc.roleAtClinic}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-primary-700 transition-colors">
                    {doc.formalTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {doc.shortSummary}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-600 space-y-1">
                    <p className="truncate"><strong>Chuyên khoa:</strong> {doc.specialty}</p>
                    <p className="text-slate-500 italic truncate">{doc.licenseNumber}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <Link
                    to={`/${doc.slug}`}
                    className="w-full py-2.5 px-3 rounded-xl bg-primary-50 group-hover:bg-primary-600 text-primary-700 group-hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <span>Xem toàn bộ hồ sơ</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to={`/dat-lich-kham?bac-si=${doc.slug}`}
                    className="w-full py-1.5 text-center text-[11px] font-medium text-slate-500 hover:text-primary-700 block transition-colors"
                  >
                    Đặt lịch khám với Bác sĩ
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
