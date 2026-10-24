import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, X, Sparkles, Activity, Tag, ArrowRight } from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';

interface SearchBarProps {
  isMobile?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ isMobile = false }) => {
  const { services, brands, products, siteConfig } = useDemoData();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const headerConfig = siteConfig.headerMainConfig;
  const isDark = headerConfig?.backgroundMode === 'primary' || headerConfig?.backgroundColor === '#0E7C86';

  const defaultSuggestions = headerConfig?.searchSuggestions?.length
    ? headerConfig.searchSuggestions
    : (siteConfig.searchSuggestions?.length
      ? siteConfig.searchSuggestions
      : ["Trị mụn", "Trị nám", "Nâng cơ", "Triệt lông", "Bioderma"]);

  const placeholder = headerConfig?.searchPlaceholder || "Tìm dịch vụ, sản phẩm hoặc thương hiệu...";

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (keyword: string) => {
    setQuery(keyword);
    navigate(`/search?q=${encodeURIComponent(keyword)}`);
    setIsOpen(false);
  };

  // Instant matching results
  const q = query.trim().toLowerCase();
  const matchingServices = q
    ? services.filter(s => s.name.toLowerCase().includes(q) || s.shortName.toLowerCase().includes(q)).slice(0, 3)
    : [];
  const matchingProducts = q
    ? products.filter(p => p.name.toLowerCase().includes(q) || (p.brandId && p.brandId.toLowerCase().includes(q))).slice(0, 3)
    : [];

  return (
    <div ref={containerRef} className={`relative ${isMobile ? 'w-full' : 'flex-1 max-w-[460px] xl:max-w-[540px]'}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className="w-full pl-10 pr-24 py-2 sm:py-2.5 rounded-full border border-primary-500/40 bg-white text-xs sm:text-[13px] text-slate-800 focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100 transition-all placeholder:text-slate-400 shadow-2xs"
          />

          {/* Left Search Line Icon in #0E7C86 */}
          <Search className="w-4 h-4 text-primary-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />

          {/* Clear Button */}
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="absolute right-14 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              title="Xóa tìm kiếm"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Submit Search Button */}
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 sm:h-8 px-3.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold flex items-center gap-1 transition-colors shadow-2xs"
            aria-label="Tìm kiếm"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px] font-bold">Tìm</span>
          </button>
        </div>
      </form>

      {/* Search Quick Suggestions Pills on Desktop (Below Input) */}
      {!isMobile && (
        <div className={`hidden lg:flex items-center gap-1.5 mt-1.5 text-[11px] overflow-hidden ${isDark ? 'text-teal-100' : 'text-slate-500'}`}>
          <span className={isDark ? 'text-teal-200/80 font-medium' : 'text-slate-400 font-medium'}>Gợi ý:</span>
          <div className="flex items-center gap-1.5 truncate">
            {defaultSuggestions.map((tag, idx) => (
              <React.Fragment key={idx}>
                <button
                  type="button"
                  onClick={() => handleSuggestionClick(tag)}
                  className={`hover:underline transition-colors shrink-0 ${
                    isDark ? 'text-white hover:text-amber-200' : 'hover:text-primary-700 text-slate-600'
                  }`}
                >
                  {tag}
                </button>
                {idx < defaultSuggestions.length - 1 && (
                  <span className={isDark ? 'text-teal-300/40 text-[10px]' : 'text-slate-300 text-[10px]'}>|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Live Dropdown Preview */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 text-xs space-y-3.5 animate-fadeIn max-h-[80vh] overflow-y-auto">
          {/* Quick Keywords */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 block flex items-center gap-1.5">
              <Tag className="w-3 h-3 text-primary-600" />
              <span>Gợi ý tìm kiếm phổ biến:</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {defaultSuggestions.map((tag, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSuggestionClick(tag)}
                  className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-primary-50 hover:text-primary-700 text-slate-700 font-medium transition-colors text-[11px]"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Instant Matches for Services */}
          {matchingServices.length > 0 && (
            <div className="pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 block flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-primary-600" />
                <span>Dịch vụ liên quan:</span>
              </span>
              <div className="space-y-1.5">
                {matchingServices.map(srv => (
                  <Link
                    key={srv.id}
                    to={`/dich-vu/${srv.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-primary-50 text-slate-800 hover:text-primary-800 transition-colors"
                  >
                    <span className="font-semibold text-xs">{srv.name}</span>
                    <span className="text-[11px] text-primary-600 font-medium flex items-center gap-0.5">
                      Chi tiết <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Instant Matches for Products */}
          {matchingProducts.length > 0 && (
            <div className="pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 block flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-primary-600" />
                <span>Dược mỹ phẩm:</span>
              </span>
              <div className="space-y-1.5">
                {matchingProducts.map(prod => (
                  <Link
                    key={prod.id}
                    to={`/duoc-my-pham/${prod.id}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-primary-50 text-slate-800 hover:text-primary-800 transition-colors"
                  >
                    <img src={prod.imageUrls?.[0] || ""} alt={prod.name} className="w-9 h-9 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <span className="font-semibold text-xs block truncate">{prod.name}</span>
                      <span className="text-[10px] text-slate-500">{prod.brandId}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Full Search Link */}
          {query.trim() && (
            <div className="pt-2 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={handleSubmit}
                className="text-xs font-bold text-primary-700 hover:underline inline-flex items-center gap-1"
              >
                <span>Xem tất cả kết quả cho "{query}"</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
