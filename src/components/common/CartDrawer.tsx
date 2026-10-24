import React, { useEffect } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';
import { Link } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, clearCart, isCartOpen, setIsCartOpen } = useDemoData();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
      }
    };
    if (isCartOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-primary-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary-600" />
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Giỏ hàng Dược mỹ phẩm
              </h3>
              <span className="bg-primary-100 text-primary-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                {cart.reduce((count, item) => count + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
              aria-label="Đóng giỏ hàng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Demo Alert */}
          <div className="bg-amber-50 border-b border-amber-100 p-3 text-xs text-amber-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Lưu ý bản Demo:</strong> Kênh giỏ hàng dùng để trình diễn giao diện. Chưa kết nối cổng thanh toán trực tuyến hoặc tồn kho thực tế.
            </span>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">Chưa có sản phẩm nào trong giỏ hàng</p>
                <Link
                  to="/duoc-my-pham"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 inline-flex items-center text-xs font-semibold text-primary-600 hover:text-primary-700"
                >
                  Xem danh mục dược mỹ phẩm chính hãng <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                  <img
                    src={item.product.imageUrls[0]}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg border border-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-semibold text-primary-600 uppercase">
                      {item.product.brandName}
                    </span>
                    <h4 className="text-xs sm:text-sm font-medium text-slate-900 line-clamp-1">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">{item.product.spec}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs sm:text-sm font-bold text-slate-900">
                        {item.product.price.toLocaleString('vi-VN')} đ
                      </span>
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-medium text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-slate-300 hover:text-rose-500 self-start p-1"
                    title="Xóa"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Tạm tính:</span>
                <span className="text-lg font-bold text-primary-700">
                  {totalAmount.toLocaleString('vi-VN')} đ
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% chính hãng – Tư vấn phác đồ miễn phí</span>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    alert("Cảm ơn bạn! Đơn hàng demo đã được ghi nhận. Trong phiên bản chính thức, hệ thống sẽ chuyển sang bước thanh toán hoặc gửi tin nhắn Zalo/Hotline hỗ trợ giao hàng.");
                    clearCart();
                    setIsCartOpen(false);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm shadow-md transition-colors text-center block"
                >
                  Xác nhận đặt hàng (Mô phỏng)
                </button>
                <button
                  onClick={clearCart}
                  className="w-full py-2 text-xs text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Xóa toàn bộ giỏ hàng
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
