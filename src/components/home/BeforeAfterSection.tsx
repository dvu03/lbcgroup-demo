import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';
import { SectionTitle } from '../common/SectionTitle';
import { BeforeAfterViewer } from '../common/BeforeAfterViewer';

export const BeforeAfterSection: React.FC = () => {
  const { caseStudies } = useDemoData();
  const [selectedCaseId, setSelectedCaseId] = useState(caseStudies[0]?.id || '');

  const activeCase = caseStudies.find(c => c.id === selectedCaseId) || caseStudies[0];

  if (!activeCase) return null;

  return (
    <section className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        title="Người Thật – Việc Thật (Before / After)"
        subtitle="Mọi hình ảnh ca điều trị đều được lưu trữ hồ sơ y khoa và có văn bản đồng ý chia sẻ của khách hàng. Tuyệt đối không can thiệp chỉnh sửa làm sai lệch kết quả."
      />

      {/* Main Interactive Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-xl">
        
        {/* Left: Interactive Before-After Slider (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-3">
          <BeforeAfterViewer
            beforeImage={activeCase.beforeImageUrl}
            afterImage={activeCase.afterImageUrl}
            aspectRatio="aspect-[4/3] sm:aspect-[16/10]"
          />
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 italic">
            <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Kết quả có thể khác nhau tùy thuộc vào cơ địa và mức độ tuân thủ phác đồ của từng bệnh nhân.</span>
          </div>
        </div>

        {/* Right: Case Details & Case Selector (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-5 sm:space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200/80">
                Hồ sơ: {activeCase.code}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {activeCase.sessions}
              </span>
            </div>
            
            <h3 className="font-heading font-bold text-lg sm:text-2xl text-slate-900 leading-tight">
              {activeCase.serviceName}
            </h3>
            <p className="text-xs font-medium text-primary-700 mt-1">
              Bác sĩ điều trị: {activeCase.treatingDoctor}
            </p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5 sm:space-y-3 text-xs">
            <div>
              <span className="font-bold text-slate-700 block mb-1">Tình trạng ban đầu:</span>
              <p className="text-slate-600 leading-relaxed">{activeCase.initialCondition}</p>
            </div>
            <div>
              <span className="font-bold text-slate-700 block mb-1">Phác đồ điều trị:</span>
              <p className="text-slate-600 leading-relaxed">{activeCase.protocolSummary}</p>
            </div>
            {activeCase.notes && (
              <div className="pt-2 border-t border-slate-200/60 text-[11px] text-emerald-700 flex items-start gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{activeCase.notes}</span>
              </div>
            )}
          </div>

          {/* Quick Case Thumbnails */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Chọn ca điều trị khác:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
              {caseStudies.slice(0, 5).map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCaseId(c.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                    c.id === activeCase.id
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {c.code} – {c.serviceName.split('–')[0].replace('Điều trị', '').trim()}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-2">
            <Link
              to="/ket-qua-dieu-tri"
              className="w-full py-3 px-4 rounded-full bg-slate-900 hover:bg-primary-600 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow transition-colors"
            >
              <span>Xem kết quả điều trị</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
