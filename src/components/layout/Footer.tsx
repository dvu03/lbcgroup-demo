import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowUpRight,
  ExternalLink,
  Heart
} from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';
import { footerLinks } from '../../data/navigation';

export const Footer: React.FC = () => {
  const { siteConfig, locations } = useDemoData();
  const [footerLogoError, setFooterLogoError] = useState(false);

  const footerLogo = siteConfig.logoFooter || siteConfig.logoFooterUrl;

  useEffect(() => {
    setFooterLogoError(false);
  }, [siteConfig.logoFooter, siteConfig.logoFooterUrl]);

  return (
    <footer className="bg-slate-900 text-slate-300 text-xs pt-12 md:pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Section: Brand + Legal Entity Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand & Legal Statement */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group" aria-label={siteConfig.brandName || "Lạc's Beauty Center"}>
              {footerLogo && !footerLogoError ? (
                <div className="h-10 sm:h-12 max-w-[180px] flex items-center justify-start shrink-0">
                  <img
                    src={footerLogo}
                    alt={siteConfig.brandName || "Logo Lạc's Beauty Center"}
                    onError={() => setFooterLogoError(true)}
                    className="max-h-10 sm:max-h-12 w-auto max-w-full object-contain transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-primary-600 text-white font-heading font-black text-xl flex items-center justify-center shadow shrink-0">
                  {siteConfig.brandName ? siteConfig.brandName.charAt(0) : 'L'}
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg text-white tracking-tight group-hover:text-primary-400 transition-colors">
                  {siteConfig.brandName || "Lạc's Beauty Center"}
                </span>
                <span className="text-[11px] text-primary-400 font-medium">
                  {siteConfig.facilityName || "Phòng khám Chuyên khoa Da liễu"}
                </span>
              </div>
            </Link>

            <p className="text-slate-400 leading-relaxed text-xs sm:text-[13px] max-w-md">
              {siteConfig.tagline}. Tiên phong ứng dụng công nghệ phân tích da đa tầng VISIA 3D và các giải pháp điều trị da liễu chuẩn y khoa tại Cần Thơ và Đồng bằng sông Cửu Long.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 space-y-1.5 text-[11px] leading-relaxed">
              <div className="font-semibold text-slate-200">
                {siteConfig.legalEntity}
              </div>
              <div className="text-slate-400">
                • Giấy phép hoạt động KCB: <span className="text-slate-300">0123/CTO-GPHĐ</span> do Sở Y tế TP. Cần Thơ cấp
              </div>
              <div className="text-slate-400">
                • Người chịu trách nhiệm chuyên môn kỹ thuật: <span className="text-slate-300">ThS.BS. Lạc Kim Ngân</span> (Dữ liệu minh họa – Chờ xác nhận)
              </div>
            </div>

            {/* Social & E-commerce links */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <a
                href={siteConfig.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-primary-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                title="Fanpage Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href={siteConfig.socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                title="Kênh YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a
                href={siteConfig.socialLinks.zalo}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white font-bold text-[11px] flex items-center justify-center transition-colors"
                title="Zalo Official Account"
              >
                Zalo OA
              </a>
              <a
                href={siteConfig.socialLinks.shopee}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 h-8 rounded-lg bg-slate-800 hover:bg-amber-600 text-slate-300 hover:text-white font-bold text-[11px] flex items-center justify-center transition-colors"
                title="Gian hàng Shopee Mall"
              >
                Shopee
              </a>
              <a
                href={siteConfig.socialLinks.tiktok}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-[11px] flex items-center justify-center transition-colors"
                title="Kênh TikTok"
              >
                TikTok
              </a>
            </div>
          </div>

          {/* 2 Facilities Detailed Addresses */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {locations.map((loc, idx) => (
              <div 
                key={loc.id} 
                className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-primary-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-900/80 text-primary-300 border border-primary-700/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      {loc.shortName}
                    </span>
                    {loc.isMainFacility && (
                      <span className="text-[10px] text-slate-400">Trụ sở chính</span>
                    )}
                  </div>
                  <h4 className="font-heading font-semibold text-slate-100 text-xs sm:text-sm mb-2">
                    {loc.name}
                  </h4>
                  <div className="space-y-1.5 text-slate-400 text-[11px]">
                    <p className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-primary-400 shrink-0 mt-0.5" />
                      <span>{loc.address}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary-400 shrink-0" />
                      <span>{loc.hours}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-primary-400 shrink-0" />
                      <a href={`tel:${loc.phone.replace(/[^0-9]/g, '')}`} className="text-slate-300 hover:text-white font-medium">
                        {loc.phone}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-center justify-between">
                  <Link 
                    to="/he-thong-co-so" 
                    className="text-primary-400 hover:text-primary-300 text-[11px] font-semibold inline-flex items-center gap-1"
                  >
                    Xem chỉ đường Google Maps <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Section: 4 Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Cột 1: Về Lạc's */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-slate-100 text-xs sm:text-sm uppercase tracking-wider">
              Về Lạc's Beauty Center
            </h4>
            <ul className="space-y-2 text-[12px] text-slate-400">
              {footerLinks.about.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="hover:text-primary-400 transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 2: Dịch vụ điều trị */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-slate-100 text-xs sm:text-sm uppercase tracking-wider">
              Dịch vụ điều trị
            </h4>
            <ul className="space-y-2 text-[12px] text-slate-400">
              {footerLinks.services.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="hover:text-primary-400 transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 3: Chính sách & Pháp lý */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-slate-100 text-xs sm:text-sm uppercase tracking-wider">
              Chính sách & Pháp lý
            </h4>
            <ul className="space-y-2 text-[12px] text-slate-400">
              {footerLinks.policies.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="hover:text-primary-400 transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 4: Hỗ trợ khách hàng */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-slate-100 text-xs sm:text-sm uppercase tracking-wider">
              Hỗ trợ khách hàng
            </h4>
            <ul className="space-y-2 text-[12px] text-slate-400">
              {footerLinks.support.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="hover:text-primary-400 transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-[11px] font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Đã thông báo Bộ Công Thương</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Disclaimer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} {siteConfig.brandName}. Bản quyền thuộc về {siteConfig.legalEntity}.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/demo-admin" className="text-primary-400 hover:text-primary-300 underline font-semibold">
              Khu vực Quản lý Demo
            </Link>
            <span>•</span>
            <span className="text-slate-400">Mẫu demo khảo sát theme Sapo Bean Pharmacity</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
