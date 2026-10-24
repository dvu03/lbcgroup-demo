import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, ShoppingBag, Calendar, Menu, X, LogIn, UserPlus, ClipboardList, ChevronDown } from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';

interface HeaderActionsProps {
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  isDark?: boolean;
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({
  isMobileMenuOpen,
  onToggleMobileMenu,
  isDark = false,
}) => {
  const { cart, setIsCartOpen, siteConfig } = useDemoData();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const config = siteConfig.headerMainConfig;

  const showAccount = config?.showAccount !== false;
  const showCart = config?.showCart !== false;
  const showCta = config?.showCta !== false;
  const ctaText = config?.ctaText || "ĐẶT LỊCH KHÁM";
  const ctaLink = config?.ctaLink || "/dat-lich-kham";
  const ctaBg = config?.ctaBgColor || (isDark ? "#F59E0B" : "#0E7C86");
  const ctaColor = config?.ctaTextColor || (isDark ? "#0F172A" : "#FFFFFF");
  const gapIcons = config?.gapIcons ?? 12;

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setIsAccountOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
        setIsCartDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsAccountOpen(false);
        setIsCartDropdownOpen(false);
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
    <div 
      className="flex items-center shrink-0 gap-1 sm:gap-2 lg:gap-3"
    >
      
      {/* 1. Account Dropdown / Icon */}
      {showAccount && (
        <div ref={accountRef} className="relative z-30">
          <button
            type="button"
            onClick={() => {
              setIsAccountOpen(!isAccountOpen);
              setIsCartDropdownOpen(false);
            }}
            className={`flex items-center gap-1.5 p-1.5 sm:p-2 rounded-xl transition-colors group ${
              isDark 
                ? 'text-white hover:bg-white/10' 
                : 'text-primary-600 hover:text-primary-800 hover:bg-primary-50/80'
            }`}
            title="Tài khoản khách hàng"
            aria-label="Tài khoản khách hàng"
            aria-expanded={isAccountOpen}
          >
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors ${
              isDark 
                ? 'bg-white/15 text-white group-hover:bg-white group-hover:text-primary-800' 
                : 'bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white'
            }`}>
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <span className={`hidden xl:inline text-xs font-semibold ${
              isDark ? 'text-white group-hover:text-white/80' : 'text-slate-700 group-hover:text-primary-700'
            }`}>
              Tài khoản
            </span>
          </button>

          {isAccountOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 max-w-[calc(100vw-32px)] bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-2.5 z-[70] text-xs animate-fadeIn">
              <div className="px-3 py-2 border-b border-slate-100">
                <span className="font-bold text-slate-900 block">Tài khoản LBC</span>
                <span className="text-[11px] text-slate-400">Đăng nhập để theo dõi hồ sơ</span>
              </div>
              <div className="py-1">
                <Link
                  to="/account/login"
                  onClick={() => setIsAccountOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-primary-50 text-slate-700 hover:text-primary-700 font-medium transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5 text-primary-600" />
                  <span>Đăng nhập</span>
                </Link>
                <Link
                  to="/account/register"
                  onClick={() => setIsAccountOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-primary-50 text-slate-700 hover:text-primary-700 font-medium transition-colors"
                >
                  <UserPlus className="w-3.5 h-3.5 text-primary-600" />
                  <span>Đăng ký thành viên</span>
                </Link>
                <Link
                  to="/booking"
                  onClick={() => setIsAccountOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-primary-50 text-slate-700 hover:text-primary-700 font-medium transition-colors"
                >
                  <ClipboardList className="w-3.5 h-3.5 text-primary-600" />
                  <span>Lịch khám của tôi (Demo)</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. Cart Icon with Dropdown Popover */}
      {showCart && (
        <div ref={cartRef} className="relative z-30">
          <button
            type="button"
            onClick={() => {
              // On desktop: toggle dropdown popover; if already open or on mobile: open drawer
              if (window.innerWidth < 768) {
                setIsCartOpen(true);
              } else {
                setIsCartDropdownOpen(!isCartDropdownOpen);
                setIsAccountOpen(false);
              }
            }}
            className={`relative p-1.5 sm:p-2 rounded-xl transition-colors group ${
              isDark 
                ? 'text-white hover:bg-white/10' 
                : 'text-primary-600 hover:text-primary-800 hover:bg-primary-50/80'
            }`}
            aria-label="Giỏ hàng dược mỹ phẩm"
            title="Giỏ hàng dược mỹ phẩm"
            aria-expanded={isCartDropdownOpen}
          >
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors ${
              isDark 
                ? 'bg-white/15 text-white group-hover:bg-white group-hover:text-primary-800' 
                : 'bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white'
            }`}>
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Cart Popover Dropdown */}
          {isCartDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 max-w-[calc(100vw-32px)] bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-4 z-[70] text-xs animate-fadeIn">
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100">
                <span className="font-heading font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                  <ShoppingBag className="w-4 h-4 text-primary-600" />
                  <span>Giỏ hàng ({cartCount} sản phẩm)</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartDropdownOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="text-[11px] font-semibold text-primary-600 hover:underline"
                >
                  Mở toàn bộ →
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="py-6 text-center text-slate-400 space-y-2">
                  <ShoppingBag className="w-8 h-8 mx-auto text-slate-300" />
                  <p className="text-xs">Chưa có sản phẩm nào trong giỏ hàng</p>
                  <Link
                    to="/duoc-my-pham"
                    onClick={() => setIsCartDropdownOpen(false)}
                    className="inline-block py-1.5 px-3 rounded-lg bg-primary-50 text-primary-700 text-[11px] font-bold hover:bg-primary-100"
                  >
                    Xem dược mỹ phẩm
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="max-h-48 overflow-y-auto space-y-2 pr-1 divide-y divide-slate-100">
                    {cart.slice(0, 3).map((item) => (
                      <div key={item.product.id} className="pt-2 first:pt-0 flex items-center gap-2.5">
                        <img
                          src={item.product.imageUrls?.[0] || ''}
                          alt={item.product.name}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-50 border border-slate-100 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-slate-800 text-[11px] truncate">
                            {item.product.name}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {item.quantity} × {item.product.price.toLocaleString('vi-VN')} đ
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {cart.length > 3 && (
                    <p className="text-[10px] text-center text-slate-400 italic">
                      và {cart.length - 3} sản phẩm khác...
                    </p>
                  )}

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-600">Tổng cộng:</span>
                    <span className="text-primary-700 font-extrabold">{cartTotal.toLocaleString('vi-VN')} đ</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCartDropdownOpen(false);
                        setIsCartOpen(true);
                      }}
                      className="py-2 px-2.5 rounded-xl border border-primary-600/30 text-primary-700 hover:bg-primary-50 font-bold text-center text-[11px] transition-colors"
                    >
                      Xem giỏ hàng
                    </button>
                    <Link
                      to="/dat-lich-kham"
                      onClick={() => setIsCartDropdownOpen(false)}
                      className="py-2 px-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-center text-[11px] transition-colors shadow-xs"
                    >
                      Đặt khám ngay
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 3. Primary CTA: ĐẶT LỊCH KHÁM */}
      {showCta && (
        <Link
          to={ctaLink}
          style={{ backgroundColor: ctaBg, color: ctaColor }}
          className="hidden sm:inline-flex items-center gap-1.5 px-4 lg:px-5 py-2.5 rounded-full font-bold text-xs lg:text-[13px] tracking-wide shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 shrink-0 hover:brightness-105"
          title={ctaText}
        >
          <Calendar className="w-4 h-4 shrink-0" style={{ color: ctaColor }} />
          <span className="whitespace-nowrap">{ctaText}</span>
        </Link>
      )}

      {/* 4. Mobile Menu Hamburger */}
      <button
        type="button"
        onClick={onToggleMobileMenu}
        className={`lg:hidden p-1.5 sm:p-2 rounded-xl transition-colors shrink-0 ${
          isDark ? 'text-white hover:bg-white/10' : 'text-slate-700 hover:bg-slate-100'
        }`}
        aria-label={isMobileMenuOpen ? "Đóng menu" : "Mở menu"}
      >
        {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
      </button>

    </div>
  );
};
