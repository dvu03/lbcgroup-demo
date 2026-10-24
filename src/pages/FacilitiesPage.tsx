import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionTitle } from '../components/common/SectionTitle';
import { useDemoData } from '../context/DemoDataContext';
import { MapPin, Phone, Clock, Calendar, Navigation, ShieldCheck } from 'lucide-react';

export const FacilitiesPage: React.FC = () => {
  const { locations, siteConfig } = useDemoData();

  return (
    <>
      <SEOHead
        title="Hệ thống 2 Cơ sở tại Cần Thơ | Lạc's Beauty Center"
        description="Khám phá địa chỉ, hình ảnh thực tế, giờ mở cửa và bản đồ đường đi tới Cơ sở 01 và Cơ sở 02 của Phòng khám Da liễu Lạc's Beauty Center Cần Thơ."
      />

      <Breadcrumbs items={[{ label: 'Hệ thống cơ sở' }]} />

      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Hệ thống cơ sở khang trang"
          title="Hệ Thống 2 Cơ Sở Tại TP. Cần Thơ"
          subtitle="Tọa lạc tại các trục đường huyết mạch thuận tiện di chuyển, trang bị đầy đủ máy móc công nghệ cao và phòng vô trùng đạt chuẩn y tế."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-xl flex flex-col justify-between"
            >
              {/* Facility Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={loc.imageUrl}
                  alt={loc.name}
                  className="w-full h-full object-cover brightness-[0.80]"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-primary-800/90 text-white backdrop-blur-md border border-primary-500/30">
                  {loc.shortName}
                </span>
                {loc.isMainFacility && (
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-emerald-700/90 text-white backdrop-blur-md">
                    Trụ sở chính
                  </span>
                )}
              </div>

              {/* Facility Info */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 leading-tight">
                    {loc.name}
                  </h3>

                  <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                    <p className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                      <span className="font-medium text-slate-800">{loc.address}</span>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-primary-600 shrink-0" />
                      <span>{loc.hours}</span>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-primary-600 shrink-0" />
                      <span>Hotline tiếp nhận: <strong className="text-slate-900">{loc.phone}</strong></span>
                    </p>
                  </div>

                  {loc.notes && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/60 text-xs text-amber-800 font-medium">
                      ⚠️ {loc.notes}
                    </div>
                  )}
                </div>

                {/* Google Maps Embed */}
                <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-[16/9] shadow-inner">
                  <iframe
                    src={loc.mapEmbedUrl}
                    title={`Bản đồ ${loc.name}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    to={`/dat-lich-kham?co-so=${loc.id}`}
                    className="flex-1 py-3 px-4 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs sm:text-sm text-center shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Đặt lịch khám tại đây</span>
                  </Link>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(loc.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Navigation className="w-4 h-4 text-primary-600" />
                    <span>Chỉ đường</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
