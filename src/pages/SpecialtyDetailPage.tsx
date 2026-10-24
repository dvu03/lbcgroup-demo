import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionTitle } from '../components/common/SectionTitle';
import { useDemoData } from '../context/DemoDataContext';
import { 
  CheckCircle2, 
  Calendar, 
  Phone, 
  ShieldCheck, 
  UserCheck, 
  Clock, 
  FileText, 
  GraduationCap, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface SpecialtyDetailPageProps {
  forcedSlug?: string;
}

export const SpecialtyDetailPage: React.FC<SpecialtyDetailPageProps> = ({ forcedSlug }) => {
  const { slug } = useParams<{ slug: string }>();
  const activeSlug = forcedSlug || slug || 'khoa-da-lieu';
  const { specialties, siteConfig, addBookingLead } = useDemoData();

  const specialty = specialties.find(s => s.slug === activeSlug) || specialties[0];

  // Academy registration form state
  const [studentForm, setStudentForm] = useState({
    name: '',
    phone: '',
    course: 'Kỹ thuật viên Chăm sóc da chuyên sâu',
    notes: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentForm.name || !studentForm.phone) {
      alert("Vui lòng điền họ tên và số điện thoại.");
      return;
    }
    addBookingLead({
      fullName: studentForm.name,
      phone: studentForm.phone,
      facility: "Học viện Lạc's Academy",
      serviceInterest: `Đăng ký học: ${studentForm.course}`,
      preferredDateTime: "Tư vấn sớm nhất",
      notes: studentForm.notes,
      consentAgreed: true
    });
    setFormSubmitted(true);
  };

  return (
    <>
      <SEOHead
        title={`${specialty.name} | Lạc's Beauty Center`}
        description={specialty.shortDesc}
      />

      <Breadcrumbs items={[{ label: 'Chuyên khoa', path: '/khoa-da-lieu' }, { label: specialty.name }]} />

      {/* Hero Banner */}
      <section className="relative py-16 sm:py-24 bg-slate-900 text-white overflow-hidden">
        <img
          src={specialty.heroImage}
          alt={specialty.name}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.40]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-500/20 text-primary-300 border border-primary-400/30 backdrop-blur-md uppercase tracking-wider">
            {specialty.code} • Hệ sinh thái LBC
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight">
            {specialty.name}
          </h1>
          <p className="text-sm sm:text-base text-primary-200 font-medium max-w-2xl leading-relaxed">
            {specialty.tagline}
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to={specialty.ctaLink}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs sm:text-sm shadow-lg transition-all"
            >
              <span>{specialty.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${siteConfig.hotline.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm backdrop-blur-md border border-white/20 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Tư vấn: {siteConfig.hotline}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Content & Service Scope */}
      <section className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Info (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                Giới Thiệu Về {specialty.name}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
                {specialty.fullDesc}
              </p>
            </div>

            {/* Scope of Services */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-5">
              <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900">
                Phạm Vi Hoạt Động & Hạng Mục Dịch Vụ Chính
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {specialty.servicesList.map((srv, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-100 text-xs sm:text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                    <span>{srv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo Gallery of Specialty Area */}
            {specialty.galleryImages?.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-heading font-bold text-lg text-slate-900">
                  Không Gian & Hoạt Động Thực Tế Tại Khu Vực
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {specialty.galleryImages.map((img, idx) => (
                    <div key={idx} className="rounded-2xl overflow-hidden aspect-[4/3] border border-slate-100 shadow-sm">
                      <img
                        src={img}
                        alt={`${specialty.name} ảnh ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Special Section for Lạc's Academy (dao-tao) */}
            {specialty.slug === 'dao-tao' && (
              <div id="dang-ky" className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-primary-900 to-slate-900 text-white space-y-6 shadow-xl">
                <div>
                  <span className="text-xs font-bold text-primary-300 uppercase tracking-wider block mb-1">
                    Tuyển sinh khóa mới
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                    Đăng Ký Tư Vấn Khóa Học Nghề Chăm Sóc Da
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                    Học trực tiếp cùng Bác sĩ và Chuyên viên trưởng, cam kết 80% thời lượng thực hành trên mẫu thật, cấp chứng chỉ sơ cấp chính quy.
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="p-4 rounded-2xl bg-emerald-900/60 border border-emerald-500/50 text-emerald-200 text-xs sm:text-sm text-center">
                    ✓ Đăng ký thành công! Ban Đào tạo Lạc's Academy sẽ liên hệ tư vấn lộ trình học và học phí cho bạn trong vòng 24 giờ.
                  </div>
                ) : (
                  <form onSubmit={handleStudentSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-slate-300 block mb-1">Họ và tên học viên *</label>
                        <input
                          type="text"
                          required
                          value={studentForm.name}
                          onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                          placeholder="Nguyễn Văn A"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs placeholder:text-slate-400 focus:outline-none focus:border-primary-400"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-300 block mb-1">Số điện thoại / Zalo *</label>
                        <input
                          type="tel"
                          required
                          value={studentForm.phone}
                          onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
                          placeholder="0901 234 567"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs placeholder:text-slate-400 focus:outline-none focus:border-primary-400"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-slate-300 block mb-1">Khóa học quan tâm</label>
                      <select
                        value={studentForm.course}
                        onChange={(e) => setStudentForm({ ...studentForm, course: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-white/20 text-white text-xs focus:outline-none focus:border-primary-400"
                      >
                        <option value="Kỹ thuật viên Chăm sóc da chuyên sâu">Khóa Kỹ thuật viên Chăm sóc da chuyên sâu</option>
                        <option value="Kỹ thuật nặn mụn chuẩn y khoa không sẹo">Khóa Kỹ thuật nặn mụn chuẩn y khoa không sẹo</option>
                        <option value="Ứng dụng công nghệ cao trong thẩm mỹ">Khóa Ứng dụng công nghệ cao trong thẩm mỹ</option>
                        <option value="Khóa đào tạo toàn diện cho Chủ Spa">Khóa đào tạo toàn diện cho Chủ Spa</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-slate-300 block mb-1">Ghi chú hoặc câu hỏi</label>
                      <input
                        type="text"
                        value={studentForm.notes}
                        onChange={(e) => setStudentForm({ ...studentForm, notes: e.target.value })}
                        placeholder="Em muốn học ca tối / hỏi về học phí..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs placeholder:text-slate-400 focus:outline-none focus:border-primary-400"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-colors"
                    >
                      Nhận thông tin tư vấn & Học phí ưu đãi
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Sidebar Info (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Personnel & License Card */}
            <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-md space-y-4">
              <h4 className="font-heading font-bold text-sm text-slate-900 pb-2 border-b border-slate-100">
                Thông Tin Quản Lý Chuyên Môn
              </h4>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <UserCheck className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Nhân sự phụ trách:</span>
                    <span>{specialty.inChargePerson}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Giờ hoạt động:</span>
                    <span>{specialty.operatingHours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <FileText className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Căn cứ pháp lý:</span>
                    <span className="text-[11px] text-slate-500">{specialty.licenseInfo}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/dat-lich-kham"
                  className="w-full py-2.5 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs text-center block transition-colors shadow-sm"
                >
                  {specialty.ctaText}
                </Link>
              </div>
            </div>

            {/* Other 4 Specialties List */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-3">
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-400">
                Các chuyên khoa khác:
              </h4>
              <div className="space-y-1.5">
                {specialties.filter(s => s.id !== specialty.id).map((other) => (
                  <Link
                    key={other.id}
                    to={`/${other.slug}`}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-primary-50 text-xs font-semibold text-slate-700 hover:text-primary-700 transition-colors border border-slate-100"
                  >
                    <span>{other.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
