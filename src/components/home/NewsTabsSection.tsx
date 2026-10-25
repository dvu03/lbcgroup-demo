import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User, Clock, Stethoscope } from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';
import { SectionTitle } from '../common/SectionTitle';

export const NewsTabsSection: React.FC = () => {
  const { articles } = useDemoData();
  const [activeTab, setActiveTab] = useState<'all' | 'cham-soc-da' | 'hoat-dong'>('all');

  const filteredArticles = activeTab === 'all'
    ? articles.slice(0, 6)
    : articles.filter(a => a.category === activeTab).slice(0, 6);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-slate-50/70 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Tin Tức & Hoạt Động Phòng Khám"
          subtitle="Cập nhật những kiến thức da liễu chuẩn mực từ bác sĩ và các hoạt động cộng đồng, sự kiện khoa học của LBC Group."
        />

        {/* Tab Controls (Horizontally scrollable on mobile without wrapping) */}
        <div className="flex items-center justify-start sm:justify-center gap-2 mb-8 text-xs font-semibold overflow-x-auto pb-2 scrollbar-none max-w-full">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full transition-all shrink-0 whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            Bài mới nhất
          </button>
          <button
            onClick={() => setActiveTab('cham-soc-da')}
            className={`px-4 py-2 rounded-full transition-all shrink-0 whitespace-nowrap ${
              activeTab === 'cham-soc-da'
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            Kiến thức chăm sóc da
          </button>
          <button
            onClick={() => setActiveTab('hoat-dong')}
            className={`px-4 py-2 rounded-full transition-all shrink-0 whitespace-nowrap ${
              activeTab === 'hoat-dong'
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            Hoạt động & Sự kiện
          </button>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredArticles.map((art) => (
            <article
              key={art.id}
              className="rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between medical-card-hover group"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  onError={(e) => {
                    e.currentTarget.src = '/images/fallback-clinic.svg';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-primary-800 backdrop-blur-sm shadow-sm uppercase tracking-wide">
                  {art.categoryName}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {art.publishedDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {art.readTime}
                    </span>
                  </div>

                  <Link
                    to={`/tin-tuc/${art.slug}`}
                    className="font-heading font-bold text-sm sm:text-base text-slate-900 group-hover:text-primary-700 line-clamp-2 leading-snug transition-colors"
                  >
                    {art.title}
                  </Link>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                {art.consultingDoctor && (
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-primary-800 font-medium">
                    <Stethoscope className="w-3.5 h-3.5 text-primary-600 shrink-0" />
                    <span className="truncate">{art.consultingDoctor}</span>
                  </div>
                )}

                <div className="pt-2">
                  <Link
                    to={`/tin-tuc/${art.slug}`}
                    className="text-xs font-semibold text-primary-600 group-hover:text-primary-700 inline-flex items-center gap-1"
                  >
                    <span>Đọc bài viết</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/tin-tuc"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs sm:text-sm border border-slate-200 shadow-sm transition-all"
          >
            <span>Xem tất cả bài viết kiến thức & tin tức</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
