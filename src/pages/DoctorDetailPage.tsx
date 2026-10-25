import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useDemoData } from '../context/DemoDataContext';
import { DEFAULT_DOCTOR_AVATAR } from '../data/doctors';
import NotFoundPage from './NotFoundPage';
import { 
  GraduationCap, 
  Award, 
  Calendar, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Phone, 
  CheckCircle2, 
  FileText,
  AlertCircle
} from 'lucide-react';

export const DoctorDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { doctors, services, siteConfig } = useDemoData();

  const cleanSlug = slug?.replace(/^bs-/, '');
  const foundDoctor = doctors.find(d => 
    d.slug === slug || 
    d.slug === `bs-${cleanSlug}` || 
    d.slug.replace(/^bs-/, '') === cleanSlug ||
    d.id === slug ||
    (d.id === 'doc-01' && (cleanSlug === 'lac-kim-ngan' || cleanSlug === 'lac-thi-kim-ngan'))
  );

  if (!foundDoctor && !slug?.startsWith('bs-')) {
    return <NotFoundPage />;
  }

  const doctor = foundDoctor || doctors[0];

  return (
    <>
      <SEOHead
        title={`${doctor.formalTitle} | Hồ sơ Bác sĩ Da liễu Lạc's`}
        description={`Hồ sơ năng lực, quá trình đào tạo sau đại học và lịch khám của ${doctor.formalTitle} tại Phòng khám Da liễu Lạc's Beauty Center Cần Thơ.`}
      />

      <Breadcrumbs items={[{ label: 'Đội ngũ bác sĩ', path: '/doi-ngu-bac-si' }, { label: doctor.formalTitle }]} />

      <section className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Notice Disclaimer if sample record */}
        {!doctor.isOfficialApproved && (
          <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>
              <strong>Lưu ý:</strong> Hồ sơ bác sĩ được cung cấp bởi Phòng khám Da liễu Lạc’s Beauty Center. Các chứng chỉ, bằng cấp và thông tin chuyên môn được chuẩn hóa phục vụ tra cứu thông tin y khoa.
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Portrait & Key Info (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-xl">
              <div className="aspect-[3/4] overflow-hidden bg-slate-100 relative">
                <img
                  src={doctor.avatarUrl || DEFAULT_DOCTOR_AVATAR}
                  alt={doctor.formalTitle}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== DEFAULT_DOCTOR_AVATAR) {
                      target.src = DEFAULT_DOCTOR_AVATAR;
                    }
                  }}
                  className="w-full h-full object-cover object-top"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-primary-800 text-white shadow">
                  {doctor.degree.split(',')[0]}
                </span>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <span className="text-xs font-bold text-primary-700 uppercase tracking-wider block">
                    {doctor.roleAtClinic}
                  </span>
                  <h1 className="font-heading font-bold text-2xl text-slate-900 mt-1">
                    {doctor.formalTitle}
                  </h1>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Chuyên khoa: {doctor.specialty}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1.5">
                  <p>
                    <strong>Kinh nghiệm:</strong>{' '}
                    {doctor.experienceYears && doctor.experienceYears > 0 
                      ? `${doctor.experienceYears} năm thực hành lâm sàng` 
                      : 'Đang cập nhật'}
                  </p>
                  {doctor.scopeOfPractice && (
                    <p><strong>Phạm vi hoạt động:</strong> {doctor.scopeOfPractice}</p>
                  )}
                  <p><strong>Pháp lý:</strong> {doctor.licenseNumber || 'Đang cập nhật'}</p>
                </div>

                <div className="space-y-2 pt-2">
                  <Link
                    to={`/dat-lich-kham?bac-si=${doctor.slug}`}
                    className="w-full py-3 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs sm:text-sm text-center block transition-colors shadow"
                  >
                    Đặt lịch khám với Bác sĩ
                  </Link>
                  <a
                    href={`tel:${siteConfig.hotline.replace(/\s+/g, '')}`}
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs text-center block transition-colors"
                  >
                    Hotline: {siteConfig.hotline}
                  </a>
                </div>
              </div>
            </div>

            {/* Medical Philosophy */}
            {doctor.philosophy && doctor.philosophy.trim() && (
              <div className="p-6 rounded-3xl bg-primary-50/70 border border-primary-100 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary-700 block">
                  Triết lý hành nghề
                </span>
                <blockquote className="font-sans italic text-xs sm:text-sm text-slate-800 leading-relaxed">
                  "{doctor.philosophy}"
                </blockquote>
              </div>
            )}
          </div>

          {/* Right Column: Bio, Education, Schedule (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Bio */}
            {doctor.fullBio && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-3">
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-slate-900">
                  Tiểu Sử Chuyên Môn
                </h2>
                <div className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line space-y-3">
                  {doctor.fullBio}
                </div>
              </div>
            )}

            {/* Education History */}
            {doctor.educationHistory && doctor.educationHistory.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-heading font-bold text-lg text-slate-900 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary-600" />
                  Quá Trình Đào Tạo Sau Đại Học
                </h3>
                <div className="space-y-2.5">
                  {doctor.educationHistory.map((edu, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                      <span>{edu}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {doctor.certifications && doctor.certifications.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-heading font-bold text-lg text-slate-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary-600" />
                  Chứng Chỉ Chuyên Sâu & Đào Tạo Chuyên Môn
                </h3>
                <div className="space-y-2.5">
                  {doctor.certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Clinical Strengths */}
            {doctor.specialtyStrengths && doctor.specialtyStrengths.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-heading font-bold text-lg text-slate-900">
                  Thế Mạnh Điều Trị Chủ Lực
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {doctor.specialtyStrengths.map((str, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm font-semibold text-slate-800">
                      {str}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Working Schedule at CS01 & CS02 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-4">
              <h3 className="font-heading font-bold text-lg text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-600" />
                Lịch Làm Việc & Thăm Khám Trực Tiếp
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {doctor.schedule.map((sch, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1.5 text-xs">
                    <span className="font-bold text-primary-800 text-sm block">{sch.facility}</span>
                    <p className="text-slate-600"><strong>Ngày khám:</strong> {sch.days}</p>
                    <p className="text-slate-600"><strong>Khung giờ:</strong> {sch.hours}</p>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 italic">
                * Lịch làm việc có thể thay đổi tùy thuộc vào lịch phẫu thuật hoặc hội chẩn chuyên môn. Quý khách vui lòng đặt hẹn trước khi đến.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
