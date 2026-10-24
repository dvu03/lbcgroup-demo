import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';
import { initialProductCategories } from '../../data/categories';
import { DynamicIcon } from '../common/DynamicIcon';
import { SectionTitle } from '../common/SectionTitle';

export const FeaturedProductsSection: React.FC = () => {
  const { products, addToCart, productCategories: contextCategories } = useDemoData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const activeCategories = contextCategories && contextCategories.length > 0
    ? contextCategories
    : initialProductCategories;

  const categories = [
    { id: 'all', name: 'Tất cả', iconName: 'Sparkles', iconUrl: '' },
    ...activeCategories
  ];

  const filteredProducts = (selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory)
  ).slice(0, 8);

  return (
    <section className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        badge="Dược mỹ phẩm chọn lọc"
        title="Sản phẩm tiêu biểu"
        subtitle="Bác sĩ phòng khám chọn lọc dựa trên tiêu chuẩn tương thích sinh học, độ an toàn và hiệu quả lâm sàng cho da nhạy cảm."
      />

      {/* Category Tabs */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-semibold scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {cat.id !== 'all' && (
              <DynamicIcon
                name={cat.iconName}
                url={cat.iconUrl}
                className={`w-3.5 h-3.5 ${selectedCategory === cat.id ? 'text-white' : 'text-primary-600'}`}
              />
            )}
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group medical-card-hover"
          >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden bg-slate-50 p-4">
              <img
                src={p.imageUrls[0]}
                alt={p.name}
                onError={(e) => {
                  e.currentTarget.src = '/images/fallback-clinic.svg';
                }}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-primary-800 shadow-sm border border-slate-100 uppercase tracking-wide">
                {p.brandName}
              </span>
            </div>

            {/* Details */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-semibold text-slate-400 block mb-1">
                  {p.categoryName} • {p.spec}
                </span>
                <Link
                  to={`/san-pham/${p.slug}`}
                  className="font-sans font-semibold text-xs sm:text-sm text-slate-900 group-hover:text-primary-700 line-clamp-2 leading-snug transition-colors"
                >
                  {p.name}
                </Link>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-1">
                  {p.skinType}
                </p>
              </div>

              {/* Price & Add to Cart */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 block leading-tight">
                    {p.price.toLocaleString('vi-VN')} đ
                  </span>
                  {p.originalPrice && (
                    <span className="text-[10px] text-slate-400 line-through">
                      {p.originalPrice.toLocaleString('vi-VN')} đ
                    </span>
                  )}
                </div>
                <button
                  onClick={() => addToCart(p, 1)}
                  className="p-2 sm:px-3 sm:py-2 rounded-xl bg-primary-50 hover:bg-primary-600 text-primary-700 hover:text-white transition-all text-xs font-semibold flex items-center gap-1 shrink-0 shadow-sm"
                  title="Thêm vào giỏ hàng demo"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span className="hidden sm:inline">Chọn mua</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/duoc-my-pham"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-all"
        >
          <span>Xem tất cả sản phẩm Dược mỹ phẩm</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};
