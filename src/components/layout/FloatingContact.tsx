import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Calendar, X, ChevronUp } from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';
import { Link, useLocation } from 'react-router-dom';

export const FloatingContact: React.FC = () => {
  const { siteConfig } = useDemoData();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isBookingPage = location.pathname === '/dat-lich-kham';
  const messengerUrl = siteConfig.socialLinks.messenger || 'https://m.me/lacsbeautycenter';
  const zaloUrl = siteConfig.socialLinks.zalo || 'https://zalo.me/lacsbeautycenter';
  const hotline = siteConfig.hotline || '1900 6750';

  return (
    <>
      {/* 1. Desktop Floating Quick Actions (Bottom Right) */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3 pointer-events-auto">
        
        {isOpen && (
          <div className="flex flex-col items-end gap-2.5 animate-fadeIn">
            {/* 1. Messenger phòng khám */}
            <a
              href={messengerUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-sky-600 text-white shadow-lg hover:bg-sky-700 hover:scale-105 transition-all text-xs font-semibold"
              title="Chat Messenger phòng khám"
            >
              <span>Messenger</span>
              <MessageCircle className="w-4 h-4" />
            </a>

            {/* 2. Zalo Official Account */}
            <a
              href={zaloUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:scale-105 transition-all text-xs font-semibold"
              title="Chat Zalo OA Phòng khám"
            >
              <span>Chat Zalo OA</span>
              <div className="w-5 h-5 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-[10px]">
                Z
              </div>
            </a>

            {/* 3. Hotline phòng khám */}
            <a
              href={`tel:${hotline.replace(/\s+/g, '')}`}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 hover:scale-105 transition-all text-xs font-semibold"
              title="Gọi Hotline tư vấn"
            >
              <span>Hotline {hotline}</span>
              <Phone className="w-4 h-4" />
            </a>

            {/* 4. Hệ thống 2 cơ sở */}
            <Link
              to="/he-thong-co-so"
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-primary-700 text-white shadow-lg hover:bg-primary-800 hover:scale-105 transition-all text-xs font-semibold"
              title="Xem Hệ thống 2 cơ sở"
            >
              <span>Hệ thống 2 cơ sở</span>
              <MapPin className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Toggle Button in Brand Primary Color #0E7C86 */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#0E7C86] hover:bg-[#0c6b74] text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-white"
          aria-label="Liên hệ hỗ trợ LBC"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative">
              <Phone className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0E7C86]"></span>
            </div>
          )}
        </button>
      </div>

      {/* 2. Mobile Fixed Bottom Bar (Only if not on booking page to avoid clutter) */}
      {!isBookingPage && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-1.5 py-1.5 flex items-center gap-1 shadow-2xl">
          {/* Hotline */}
          <a
            href={`tel:${hotline.replace(/\s+/g, '')}`}
            className="flex-1 py-1.5 px-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-bold flex flex-col items-center justify-center gap-0.5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#0E7C86]" />
            <span className="truncate max-w-[70px]">{hotline}</span>
          </a>

          {/* Zalo */}
          <a
            href={zaloUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-1.5 px-1 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-[10px] font-bold flex flex-col items-center justify-center gap-0.5"
          >
            <span className="text-[9px] bg-blue-600 text-white rounded px-1 font-black">Zalo</span>
            <span>OA</span>
          </a>

          {/* Messenger */}
          <a
            href={messengerUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-1.5 px-1 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-[10px] font-bold flex flex-col items-center justify-center gap-0.5"
          >
            <MessageCircle className="w-3.5 h-3.5 text-sky-600" />
            <span>Chat</span>
          </a>

          {/* Booking CTA */}
          <Link
            to="/dat-lich-kham"
            className="flex-[1.4] py-2 px-2 rounded-xl bg-[#0E7C86] hover:bg-[#0c6b74] text-white text-[11px] font-bold flex items-center justify-center gap-1 shadow-md"
          >
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">Đặt lịch</span>
          </Link>
        </div>
      )}
    </>
  );
};
