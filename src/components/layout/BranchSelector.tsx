import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, ChevronDown, ExternalLink } from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';

interface BranchSelectorProps {
  isDark?: boolean;
}

export const BranchSelector: React.FC<BranchSelectorProps> = ({ isDark = false }) => {
  const { locations, siteConfig } = useDemoData();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const config = siteConfig.headerMainConfig;

  if (config && config.showBranches === false) {
    return null;
  }

  const branchTitle = config?.branchTitle || 'Hệ thống';
  const branchSubtitle = config?.branchSubtitle || '2 cơ sở';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative z-30">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 p-1.5 sm:p-2 rounded-xl transition-colors text-left group ${
          isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-slate-50 text-slate-900'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Xem danh sách cơ sở phòng khám"
      >
        <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 shadow-2xs transition-colors ${
          isDark ? 'bg-white/15 text-white group-hover:bg-white group-hover:text-primary-800' : 'bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white'
        }`}>
          <MapPin className="w-4 h-4" />
        </div>
        <div className="text-xs leading-tight">
          <span className={`block text-[11px] ${isDark ? 'text-white/75' : 'text-slate-500'}`}>
            {branchTitle}
          </span>
          <span className={`font-bold flex items-center gap-0.5 ${isDark ? 'text-white' : 'text-slate-900 group-hover:text-primary-700'}`}>
            <span>{branchSubtitle}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''} ${isDark ? 'text-white/70' : 'text-slate-400'}`} />
          </span>
        </div>
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="absolute right-0 sm:left-0 sm:right-auto top-full mt-2 w-80 sm:w-96 max-w-[calc(100vw-32px)] bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-4 z-[70] animate-fadeIn max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100">
            <span className="font-heading font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary-600" />
              <span>Hệ thống 2 cơ sở Cần Thơ</span>
            </span>
            <Link
              to="/he-thong-co-so"
              onClick={() => setIsOpen(false)}
              className="text-[11px] font-semibold text-primary-600 hover:text-primary-800 flex items-center gap-0.5"
            >
              <span>Xem tất cả</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {locations.map((loc) => (
              <div 
                key={loc.id}
                className="p-3 rounded-xl bg-slate-50 hover:bg-primary-50/60 border border-slate-100 hover:border-primary-200 transition-all text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">
                    {loc.shortName || loc.name}
                  </span>
                  {loc.isMainFacility && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-100 text-primary-800">
                      Cơ sở chính
                    </span>
                  )}
                </div>

                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {loc.address}
                </p>

                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 border-t border-slate-200/50">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-primary-600" />
                    <span>{loc.phone.split('-')[0].trim()}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{loc.hours}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2 text-center">
            <Link
              to="/dat-lich-kham"
              onClick={() => setIsOpen(false)}
              className="w-full block py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs text-center transition-colors shadow-xs"
            >
              Đặt lịch khám tại cơ sở gần nhất
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
