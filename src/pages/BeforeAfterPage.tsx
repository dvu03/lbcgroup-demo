import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { PageHeroBanner } from '../components/common/PageHeroBanner';
import { SectionTitle } from '../components/common/SectionTitle';
import { useDemoData } from '../context/DemoDataContext';
import { BeforeAfterViewer } from '../components/common/BeforeAfterViewer';
import { AlertCircle, ShieldCheck, Calendar, ArrowRight } from 'lucide-react';

export const BeforeAfterPage: React.FC = () => {
  const { caseStudies, services } = useDemoData();
  const [selectedServiceId, setSelectedServiceId] = useState<string>('all');

  const filteredCases = selectedServiceId === 'all'
    ? caseStudies
    : caseStudies.filter(c => c.serviceId === selectedServiceId);

  return (
    <>
      <SEOHead
        title="Người Thật – Việc Thật (Before / After) | Lạc's Beauty Center"
        description="Hình ảnh trước và sau điều trị mụn kháng trị, sẹo rỗ, nám tàn nhang, nâng cơ tại Lạc's Beauty Center Cần Thơ. 100% ca điều trị có văn bản đồng ý chia sẻ."
      />

      <PageHeroBanner
        pageId="ket-qua-dieu-tri"
        breadcrumbLabel="Kết quả điều trị (Before – After)"
        defaultBadge="Bằng chứng lâm sàng thực tế"
        defaultTitle="Người Thật – Việc Thật (Before & After)"
        defaultDescription="Tổng hợp các ca điều trị thành công tại phòng khám. Hình ảnh chụp cùng góc máy, cùng điều kiện ánh sáng chuẩn y khoa, không sử dụng filter hay phần mềm chỉnh sửa da."
      />

      <section className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Regulatory & Consent Notice */}
        <div className="mb-10 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-3 shadow-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-slate-900">Cam kết bảo mật & Quyền riêng tư y tế:</span>
            <p>
              Tất cả các ca điều trị được công khai dưới đây đều đã ký văn bản thỏa thuận sử dụng hình ảnh ẩn danh phục vụ mục đích tư vấn chuyên môn. Kết quả điều trị thực tế có thể khác nhau tùy thuộc vào cơ địa da, tuổi tác và mức độ tuân thủ phác đồ tại nhà của từng khách hàng.
            </p>
          </div>
        </div>

        {/* Service Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-semibold scrollbar-none">
          <button
            onClick={() => setSelectedServiceId('all')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              selectedServiceId === 'all'
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Tất cả các ca ({caseStudies.length})
          </button>
          {services.slice(0, 6).map((srv) => {
            const count = caseStudies.filter(c => c.serviceId === srv.id).length;
            if (count === 0) return null;
            return (
              <button
                key={srv.id}
                onClick={() => setSelectedServiceId(srv.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedServiceId === srv.id
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {srv.shortName} ({count})
              </button>
            );
          })}
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {filteredCases.map((cs) => (
            <div
              key={cs.id}
              className="p-6 rounded-3xl bg-white border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary-100 text-primary-800 uppercase">
                  Mã: {cs.code}
                </span>
                <span className="text-xs font-semibold text-slate-500">{cs.sessions}</span>
              </div>

              {/* Before After Slider */}
              <BeforeAfterViewer
                beforeImage={cs.beforeImageUrl}
                afterImage={cs.afterImageUrl}
                aspectRatio="aspect-[4/3]"
              />

              <div className="space-y-2 pt-2">
                <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 leading-snug">
                  {cs.serviceName}
                </h3>
                <p className="text-xs text-primary-700 font-medium">
                  {cs.customerInitial} • Bác sĩ điều trị: {cs.treatingDoctor}
                </p>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs text-slate-600">
                  <p><strong>Tình trạng ban đầu:</strong> {cs.initialCondition}</p>
                  <p><strong>Phác đồ áp dụng:</strong> {cs.protocolSummary}</p>
                  {cs.notes && (
                    <p className="text-[11px] text-emerald-700 pt-1 border-t border-slate-200/50">
                      ✓ {cs.notes}
                    </p>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <Link
                    to={`/dat-lich-kham?dich-vu=${cs.serviceId}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:text-primary-700"
                  >
                    <span>Đặt lịch khám phác đồ tương tự</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
