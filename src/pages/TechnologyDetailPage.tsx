import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useDemoData } from '../context/DemoDataContext';
import { Cpu, ShieldCheck, CheckCircle2, ArrowRight, Calendar, AlertCircle } from 'lucide-react';

export const TechnologyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { technologies, siteConfig } = useDemoData();

  const tech = technologies.find(t => t.slug === slug) || technologies[0];

  return (
    <>
      <SEOHead
        title={`${tech.name} | Công nghệ Lạc's Beauty Center`}
        description={tech.principle}
      />

      <Breadcrumbs items={[{ label: 'Công nghệ', path: '/cong-nghe' }, { label: tech.name }]} />

      <section className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Info (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 uppercase tracking-wide inline-block mb-2">
                {tech.code} • {tech.deviceOrigin}
              </span>
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                {tech.name}
              </h1>
              <p className="text-sm font-medium text-primary-700 mt-2">
                Ứng dụng: {tech.appliedService}
              </p>
            </div>

            {/* Principle Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-3">
              <h3 className="font-heading font-bold text-lg text-slate-900">
                Nguyên Lý Hoạt Động Y Khoa
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {tech.principle}
              </p>
            </div>

            {/* Benefits */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-lg text-slate-900">
                Lợi Ích Điều Trị Vượt Trội Cho Khách Hàng
              </h3>
              <div className="space-y-3">
                {tech.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Session Process */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-lg text-slate-900">
                Quy Trình 1 Buổi Trị Liệu Với Thiết Bị
              </h3>
              <div className="space-y-3">
                {tech.sessionProcess.map((proc, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 text-xs sm:text-sm text-slate-700 border border-slate-100">
                    {proc}
                  </div>
                ))}
              </div>
            </div>

            {/* Certification & Compliance Note */}
            <div className="p-4 rounded-2xl bg-primary-50 border border-primary-100 text-xs text-primary-900 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-primary-700 shrink-0 mt-0.5" />
              <div>
                <strong>Chứng nhận & Pháp lý thiết bị:</strong> {tech.certifications}
              </div>
            </div>
          </div>

          {/* Sidebar (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl overflow-hidden border border-slate-100 shadow-lg bg-white p-5 space-y-4">
              <img
                src={tech.imageUrl}
                alt={tech.name}
                className="w-full aspect-[4/3] object-cover rounded-2xl"
              />
              <div className="space-y-2 pt-2">
                <Link
                  to="/dat-lich-kham"
                  className="w-full py-3 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs text-center block transition-colors shadow"
                >
                  Đặt lịch trải nghiệm công nghệ
                </Link>
                <Link
                  to="/cong-nghe"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs text-center block transition-colors"
                >
                  Xem các công nghệ khác
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
