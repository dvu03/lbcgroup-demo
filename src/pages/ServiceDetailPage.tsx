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
  Clock, 
  Stethoscope, 
  Cpu, 
  HelpCircle, 
  ChevronDown, 
  AlertCircle, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { BeforeAfterViewer } from '../components/common/BeforeAfterViewer';

interface ServiceDetailPageProps {
  forcedSlug?: string;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ forcedSlug }) => {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const slug = forcedSlug || paramSlug;
  const { services, technologies, doctors, caseStudies, siteConfig } = useDemoData();

  const service = services.find(s => s.slug === slug) || services[0];
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Match related technologies
  const appliedTechs = technologies.filter(t => service.technologyIds.includes(t.id));

  // Match related before-after cases
  const relatedCases = caseStudies.filter(c => service.beforeAfterCaseIds.includes(c.id));

  return (
    <>
      <SEOHead
        title={`${service.name} | Phòng khám Da liễu Lạc's`}
        description={service.metaDescription}
      />

      <Breadcrumbs items={[{ label: 'Dịch vụ điều trị', path: '/dich-vu' }, { label: service.name }]} />

      {/* Hero Header */}
      <section className="relative py-14 sm:py-20 bg-slate-900 text-white overflow-hidden">
        <img
          src={service.coverImage}
          alt={service.name}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-500/20 text-primary-300 border border-primary-400/30 backdrop-blur-md uppercase">
              {service.shortName}
            </span>
            {!service.isDoctorApproved && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/30 text-amber-200 border border-amber-400/30 backdrop-blur-md">
                Nội dung minh họa – cần bác sĩ duyệt
              </span>
            )}
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight">
            {service.name}
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed">
            {service.metaDescription}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              to={`/dat-lich-kham?dich-vu=${service.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs sm:text-sm shadow-lg transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Đặt lịch khám phác đồ</span>
            </Link>
            <a
              href={`tel:${siteConfig.hotline.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm backdrop-blur-md border border-white/20 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Hotline: {siteConfig.hotline}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Info (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Suitable Candidates */}
            <div className="p-6 sm:p-8 rounded-3xl bg-primary-50/50 border border-primary-100 space-y-4">
              <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary-600" />
                Đối Tượng & Dấu Hiệu Phù Hợp Thăm Khám
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.suitableFor.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-100 text-xs sm:text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-600 shrink-0 mt-2"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Markdown Overview Content */}
            <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed space-y-4">
              <div dangerouslySetInnerHTML={{ __html: service.contentMarkdown.replace(/## (.*)/g, '<h2 class="font-heading text-xl font-bold text-slate-900 mt-6 mb-2">$1</h2>').replace(/### (.*)/g, '<h3 class="font-heading text-base font-bold text-slate-800 mt-4 mb-1">$1</h3>').replace(/\n\n/g, '<br/>') }} />
            </div>

            {/* Protocol Steps (1 to 5) */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="font-heading font-bold text-xl text-slate-900">
                Phác Đồ & Quy Trình Điều Trị Tại Lạc's Beauty Center
              </h3>
              <div className="space-y-3">
                {service.protocolSteps.map((step) => (
                  <div key={step.step} className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                        {step.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Technologies */}
            {appliedTechs.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="font-heading font-bold text-xl text-slate-900 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-primary-600" />
                  Công Nghệ Cao Ứng Dụng Trong Dịch Vụ
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {appliedTechs.map((tech) => (
                    <Link
                      key={tech.id}
                      to={`/cong-nghe/${tech.slug}`}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-primary-50 hover:border-primary-200 transition-colors flex items-start gap-3.5 group"
                    >
                      <img
                        src={tech.imageUrl}
                        alt={tech.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-primary-700 uppercase block">{tech.code}</span>
                        <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 group-hover:text-primary-700 truncate">
                          {tech.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{tech.deviceOrigin}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Before/After Cases */}
            {relatedCases.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="font-heading font-bold text-xl text-slate-900">
                  Kết Quả Điều Trị Thực Tế Của Khách Hàng
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedCases.map((cs) => (
                    <div key={cs.id} className="space-y-2">
                      <BeforeAfterViewer
                        beforeImage={cs.beforeImageUrl}
                        afterImage={cs.afterImageUrl}
                        aspectRatio="aspect-[4/3]"
                      />
                      <div className="text-xs font-medium text-slate-700">{cs.customerInitial} • {cs.sessions}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs Accordion */}
            {service.faqs?.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="font-heading font-bold text-xl text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary-600" />
                  Câu Hỏi Thường Gặp Về Dịch Vụ
                </h3>
                <div className="space-y-2.5">
                  {service.faqs.map((faq, idx) => (
                    <div key={idx} className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
                      <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                        className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                      >
                        <span className="font-heading font-bold text-xs sm:text-sm text-slate-900">
                          {faq.question}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
                      </button>
                      {openFaqIndex === idx && (
                        <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 border-t border-slate-100 leading-relaxed bg-slate-50/50">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Consultation Card */}
            <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-xl space-y-4">
              <h4 className="font-heading font-bold text-base text-slate-900 pb-3 border-b border-slate-100">
                Thông Tin Dịch Vụ
              </h4>

              <div className="space-y-3 text-xs text-slate-600">
                <div>
                  <span className="text-slate-400 block">Thời gian tham khảo:</span>
                  <span className="font-semibold text-slate-800">{service.duration}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Bác sĩ tham vấn:</span>
                  <span className="font-semibold text-primary-800">{service.consultingDoctor}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Địa điểm thực hiện:</span>
                  <span className="font-semibold text-slate-800">Cơ sở 01 & Cơ sở 02</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <Link
                  to={`/dat-lich-kham?dich-vu=${service.slug}`}
                  className="w-full py-3 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs text-center block transition-colors shadow"
                >
                  Đặt lịch khám phác đồ này
                </Link>
                <a
                  href={`tel:${siteConfig.hotline.replace(/\s+/g, '')}`}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs text-center block transition-colors"
                >
                  Hotline tư vấn: {siteConfig.hotline}
                </a>
              </div>
            </div>

            {/* Other Services */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-3">
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-400">
                Các dịch vụ điều trị khác:
              </h4>
              <div className="space-y-1.5">
                {services.filter(s => s.id !== service.id).map((other) => (
                  <Link
                    key={other.id}
                    to={`/dich-vu/${other.slug}`}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-primary-50 text-xs font-semibold text-slate-700 hover:text-primary-700 transition-colors border border-slate-100"
                  >
                    <span>{other.shortName}</span>
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
