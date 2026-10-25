import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';
import { SectionTitle } from '../common/SectionTitle';

export const TechnologiesSection: React.FC = () => {
  const { technologies } = useDemoData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Filter 5 technologies for Banner 2 according to brief
  const bannerTechnologies = technologies
    .filter(t => t.showOnHomeBanner2 !== false)
    .slice(0, 5);

  const totalBanners = bannerTechnologies.length || 5;

  // Auto-play rotation every 5 seconds if not hovered
  useEffect(() => {
    if (isHovered || totalBanners <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalBanners);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, totalBanners]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalBanners) % totalBanners);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalBanners);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const getBannerTitle = (tech: any) => {
    if (tech.bannerTitle) return tech.bannerTitle;
    const cleanName = (tech.name || '').replace(/^(Công nghệ|Hệ thống)\s+/i, '').trim();
    const service = (tech.appliedService || '').replace(/^Dịch vụ\s+/i, '').trim();
    return `${cleanName} – Dịch vụ ${service}`;
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Tiêu đề khối: "Công nghệ cao tại Lạc's" chuẩn theo Brief Sheet 2 */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Công nghệ cao tại Lạc's
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Hệ thống máy móc chính hãng đạt chuẩn quốc tế, phục vụ điều trị chuyên sâu theo phác đồ cá nhân hóa của bác sĩ chuyên khoa da liễu.
          </p>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-primary-50 text-slate-700 hover:text-primary-700 flex items-center justify-center transition-all shadow-xs hover:border-primary-300"
            aria-label="Banner công nghệ trước"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-primary-50 text-slate-700 hover:text-primary-700 flex items-center justify-center transition-all shadow-xs hover:border-primary-300"
            aria-label="Banner công nghệ tiếp theo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Module Banner 2 (5 banner, trượt) */}
      <div
        className="relative overflow-hidden rounded-3xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {bannerTechnologies.map((tech, idx) => {
            const bannerTitle = getBannerTitle(tech);
            const imageSrc = tech.actionImageUrl || tech.imageUrl;

            return (
              <div
                key={tech.id}
                className="w-full shrink-0 px-0.5 sm:px-1"
              >
                <Link
                  to={`/cong-nghe/${tech.slug}`}
                  className="group relative block w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[800/460] rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-slate-200/60 transition-transform duration-500"
                >
                  {/* Ảnh máy trong phòng điều trị thật, có thao tác của nhân viên (800×500) */}
                  <img
                    src={imageSrc}
                    alt={bannerTitle}
                    onError={(e) => {
                      e.currentTarget.src = '/images/fallback-clinic.svg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.82]"
                    loading="lazy"
                  />

                  {/* Gradient Overlay for high readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 pointer-events-none">
                    <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-slate-900/80 text-primary-200 border border-white/20 backdrop-blur-md">
                      {tech.deviceOrigin ? tech.deviceOrigin.split('–')[0]?.trim() : 'Thiết bị chính hãng'}
                    </span>
                  </div>

                  {/* Bottom Content: Ghi tên công nghệ + tên dịch vụ ứng dụng */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-6 sm:left-6 sm:right-6 text-white space-y-1 sm:space-y-2 pr-24 sm:pr-0">
                    <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-primary-300">
                      <span>{tech.deviceOrigin}</span>
                    </div>

                    <h3 className="font-heading text-sm sm:text-xl md:text-3xl font-bold text-white group-hover:text-primary-200 transition-colors leading-snug drop-shadow-md line-clamp-2">
                      {bannerTitle}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 max-w-3xl leading-relaxed opacity-90 hidden sm:block">
                      {tech.principle}
                    </p>

                    <div className="pt-1 sm:pt-2 flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm font-semibold text-primary-300 group-hover:text-white transition-colors">
                      <span className="underline underline-offset-4">Xem chi tiết bài công nghệ</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Indicator Dots (5 dots for 5 banners) */}
        <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 z-10 flex items-center gap-1.5 bg-black/45 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/10">
          {bannerTechnologies.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setCurrentIndex(dotIdx)}
              className={`transition-all rounded-full ${
                dotIdx === currentIndex
                  ? 'w-5 sm:w-6 h-1.5 sm:h-2 bg-primary-400'
                  : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/50 hover:bg-white'
              }`}
              aria-label={`Chuyển đến banner ${dotIdx + 1}`}
            />
          ))}
          <span className="text-[10px] sm:text-[11px] font-mono text-white/80 ml-1 pl-1 sm:ml-1.5 sm:pl-1.5 border-l border-white/20">
            {currentIndex + 1}/{totalBanners}
          </span>
        </div>
      </div>

      {/* Mini Thumbnails / Quick Jump Strip (5 banner thumbnails - horizontally scrollable on mobile) */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-3 lg:grid-cols-5 mt-4 max-w-full">
        {bannerTechnologies.map((tech, i) => (
          <button
            key={tech.id}
            onClick={() => setCurrentIndex(i)}
            className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border text-left transition-all flex items-center gap-2 sm:gap-2.5 shrink-0 min-w-[160px] sm:min-w-0 ${
              currentIndex === i
                ? 'bg-primary-50/80 border-primary-500 shadow-sm'
                : 'bg-white border-slate-200/80 hover:bg-slate-50 opacity-80 hover:opacity-100'
            }`}
          >
            <div className="w-10 h-8 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
              <img
                src={tech.actionImageUrl || tech.imageUrl}
                alt={tech.name}
                onError={(e) => {
                  e.currentTarget.src = '/images/fallback-clinic.svg';
                }}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold text-primary-700 block uppercase">
                {tech.code || `CN-0${i + 1}`}
              </span>
              <span className="text-xs font-semibold text-slate-800 truncate block">
                {tech.name}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Bottom CTA to all technologies page */}
      <div className="mt-8 text-center">
        <Link
          to="/cong-nghe"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-all"
        >
          <span>Xem tất cả thiết bị công nghệ tại phòng khám</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};
