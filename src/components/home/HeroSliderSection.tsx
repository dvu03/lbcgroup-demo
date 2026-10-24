import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';

export const HeroSliderSection: React.FC = () => {
  const { heroSlides, sideBanners } = useDemoData();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Auto slide interval (5.5s)
  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % heroSlides.length);
  };

  // Touch swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 45) {
      nextSlide();
    } else if (distance < -45) {
      prevSlide();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  if (!heroSlides.length) return null;
  const slide = heroSlides[currentSlide];

  return (
    <section className="w-full py-3 sm:py-5">
      {/* Container aligned with unified site-container system */}
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 lg:gap-5 items-stretch">

          {/* Main Hero Banner: 2/3 width on desktop (8 of 12 cols), 100% on tablet & mobile */}
          <div
            className="lg:col-span-8 relative rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-lg bg-slate-950 flex flex-col justify-center min-h-[270px] sm:min-h-[340px] lg:h-[400px] lg:min-h-[400px] group box-border"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Background Images with Cross-fade & Responsive Picture sources */}
            {heroSlides.map((s, idx) => (
              <div
                key={s.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
              >
                <picture>
                  <source media="(max-width: 640px)" srcSet={s.mobileImage} />
                  <img
                    src={s.desktopImage}
                    alt={s.title}
                    onError={(e) => {
                      e.currentTarget.src = '/images/fallback-clinic.svg';
                    }}
                    className="w-full h-full object-cover object-center brightness-[0.62]"
                  />
                </picture>
                {/* Contrast overlay: heavy vertical gradient on mobile, directional left-to-right on desktop */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/40 to-transparent lg:bg-gradient-to-r lg:from-slate-950/65 lg:via-slate-950/30 lg:to-transparent" />
              </div>
            ))}

            {/* Slide Text & Action Content */}
            <div className="relative z-20 w-full max-w-full lg:max-w-[560px] p-4 sm:p-7 lg:p-10 pb-12 sm:pb-14 lg:pb-10 text-white flex flex-col justify-center space-y-2 sm:space-y-3.5 box-border">
              {/* Badge */}
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-primary-500/30 text-primary-200 border border-primary-400/40 backdrop-blur-md">
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary-300 shrink-0" />
                  <span className="truncate">{slide.badge}</span>
                </span>
              </div>

              {/* Title with fluid responsive clamp (20-34px), robust line-height and break-words */}
              <h1 className="font-heading font-bold text-white drop-shadow-md text-[clamp(1.25rem,4.2vw,2.15rem)] lg:text-[34px] leading-[1.2] lg:leading-[1.25] tracking-tight break-words [overflow-wrap:break-word]">
                {slide.title}
              </h1>

              {/* Subtitle / Description */}
              <p className="text-[11px] sm:text-sm lg:text-base text-slate-100/90 leading-relaxed drop-shadow line-clamp-2 sm:line-clamp-3 break-words [overflow-wrap:break-word] max-w-xl">
                {slide.subtitle}
              </p>

              {/* CTA Action Buttons */}
              <div className="pt-1.5 sm:pt-3 flex flex-row flex-wrap items-center gap-2 sm:gap-3">
                <Link
                  to={slide.ctaLink}
                  className="min-h-[38px] sm:min-h-[44px] px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-primary-600/30 transition-all flex items-center justify-center gap-1.5 text-center shrink-0"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </Link>

                <Link
                  to="/dat-lich-kham"
                  className="min-h-[38px] sm:min-h-[44px] px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-medium text-xs sm:text-sm backdrop-blur-md border border-white/25 transition-all flex items-center justify-center gap-1.5 text-center shrink-0"
                >
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span>Đặt lịch khám</span>
                </Link>
              </div>
            </div>

            {/* Desktop Navigation Arrows (hidden on small mobile to avoid layout clutter) */}
            <button
              onClick={prevSlide}
              className="hidden md:flex absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-primary-700 text-white items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 border border-white/15 shadow-md"
              aria-label="Slide trước"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="hidden md:flex absolute right-3 lg:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-primary-700 text-white items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 border border-white/15 shadow-md"
              aria-label="Slide tiếp"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots Pagination Pill - Positioned bottom right safely away from left-aligned text & CTA */}
            <div className="absolute bottom-2.5 right-3 sm:bottom-3 sm:right-6 lg:bottom-4 lg:right-8 z-30 flex items-center gap-1.5 sm:gap-2 bg-black/45 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/10 shadow-sm">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`transition-all duration-300 rounded-full h-1.5 sm:h-2 ${idx === currentSlide ? 'w-5 sm:w-7 bg-primary-400' : 'w-1.5 sm:w-2 bg-white/40 hover:bg-white/70'
                    }`}
                  aria-label={`Đi tới slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* 2 Sub Banners: Side-by-side (2 columns) on mobile & tablet, stacked vertically on desktop */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:flex lg:flex-col gap-2.5 sm:gap-4 lg:gap-5 lg:h-[400px]">
            {sideBanners.map((banner) => (
              <Link
                key={banner.id}
                to={banner.ctaLink}
                className="relative rounded-[16px] sm:rounded-[24px] overflow-hidden shadow-md bg-slate-900 group min-h-[135px] sm:min-h-[165px] lg:min-h-0 lg:flex-1 flex items-center p-3 sm:p-5 lg:p-6 text-white box-border hover:shadow-lg transition-all duration-300 border border-slate-800/40"
              >
                {/* Background Image */}
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  onError={(e) => {
                    e.currentTarget.src = '/images/fallback-clinic.svg';
                  }}
                  className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.52] group-hover:scale-105 transition-transform duration-500"
                />
                {/* High Contrast Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent lg:bg-gradient-to-r lg:from-slate-950/60 lg:via-slate-950/30 lg:to-transparent" />

                {/* Content */}
                <div className="relative z-10 space-y-1 sm:space-y-1.5 max-w-[420px]">
                  <span className="text-[9px] sm:text-[11px] font-bold tracking-wider uppercase text-primary-300 bg-primary-950/70 px-2 sm:px-2.5 py-0.5 rounded-full border border-primary-500/30 inline-block mb-0.5">
                    {banner.tag}
                  </span>
                  <h3 className="font-heading text-xs sm:text-base lg:text-[19px] font-bold text-white group-hover:text-primary-200 transition-colors leading-snug line-clamp-1 sm:line-clamp-2">
                    {banner.title}
                  </h3>
                  <p className="text-[10px] sm:text-[13px] text-slate-200/90 line-clamp-1 sm:line-clamp-2 leading-relaxed hidden xs:block">
                    {banner.desc}
                  </p>
                  <div className="pt-0.5 sm:pt-1 text-[11px] sm:text-xs font-semibold text-primary-300 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>{banner.ctaText}</span>
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
