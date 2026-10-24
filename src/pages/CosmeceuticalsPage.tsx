import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionTitle } from '../components/common/SectionTitle';
import { useDemoData } from '../context/DemoDataContext';
import { ShoppingBag, Filter, ShieldCheck, Search, ArrowRight, AlertCircle } from 'lucide-react';

export const CosmeceuticalsPage: React.FC = () => {
  const { products, brands, addToCart, pagesConfig, productCategories } = useDemoData();
  const pageConfig = pagesConfig?.['duoc-my-pham'];
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('cat') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const categories = [
    { id: 'all', label: 'Tất cả nhu cầu' },
    ...(productCategories && productCategories.length > 0
      ? productCategories.map(c => ({ id: c.id, label: c.name }))
      : [
          { id: 'lam-sach', label: 'Làm sạch – Tẩy trang' },
          { id: 'dac-tri-mun', label: 'Đặc trị mụn' },
          { id: 'phuc-hoi-duong-am', label: 'Phục hồi – Cấp ẩm' },
          { id: 'chong-nang', label: 'Chống nắng phổ rộng' },
          { id: 'sang-da-mo-tham', label: 'Sáng da – Mờ thâm' }
        ]
    )
  ];

  let filtered = products.filter(p => {
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchBrand = selectedBrand === 'all' || p.brandId === selectedBrand;
    const matchSearch = !searchKeyword.trim() || 
      p.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      p.brandName.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchCat && matchBrand && matchSearch;
  });

  if (sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  }

  return (
    <>
      <SEOHead
        title="Dược Mỹ Phẩm Chính Hãng Quốc Tế | Lạc's Beauty Center"
        description="Danh mục dược mỹ phẩm chính hãng 100% từ Bioderma, Biotrade, PostQuam... được bác sĩ chuyên khoa da liễu khuyên dùng cho da nhạy cảm."
      />

      <Breadcrumbs items={[{ label: 'Dược – Mỹ phẩm' }]} />

      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner from CMS */}
        {pageConfig?.enabled !== false && (
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-8 sm:p-12 mb-10 shadow-lg">
            <img
              src={pageConfig?.desktopImage || "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80"}
              alt={pageConfig?.title || "Dược mỹ phẩm chính hãng"}
              className="absolute inset-0 w-full h-full object-cover brightness-[0.40]"
            />
            <div className="relative z-10 max-w-2xl space-y-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-500/30 text-primary-200 border border-primary-400/40 uppercase">
                {pageConfig?.badge || "100% Nhập khẩu chính ngạch"}
              </span>
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                {pageConfig?.title || "Dược Mỹ Phẩm Chính Hãng Chuẩn Y Khoa"}
              </h1>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {pageConfig?.description || "Các dòng sản phẩm phục hồi, trị mụn và chống nắng từ các hãng dược phẩm nổi tiếng thế giới. Mọi sản phẩm đều có số phiếu công bố và tem kiểm định của Bộ Y tế."}
              </p>
            </div>
          </div>
        )}

        {/* Demo Disclaimer */}
        <div className="mb-8 p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-800 flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Lưu ý bản Prototype:</strong> Chức năng giỏ hàng và danh mục dược mỹ phẩm dùng để kiểm tra trải nghiệm người dùng và bố cục Sapo. Chưa kết nối cổng thanh toán trực tuyến hoặc tồn kho kho vận thực tế.
          </span>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-sm mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Tìm tên sản phẩm hoặc thương hiệu..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-primary-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Category Select */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-primary-500"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* Brand Select */}
            <div>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-primary-500"
              >
                <option value="all">Tất cả thương hiệu</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>{b.name} ({b.origin})</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-primary-500"
              >
                <option value="default">Sắp xếp: Mặc định</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl">
            <p className="text-slate-500 text-sm">Không tìm thấy sản phẩm phù hợp với bộ lọc hiện tại.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedBrand('all');
                setSearchKeyword('');
              }}
              className="mt-3 px-4 py-2 rounded-full bg-primary-600 text-white text-xs font-semibold"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between medical-card-hover group"
              >
                <div className="relative aspect-square overflow-hidden bg-slate-50 p-4">
                  <img
                    src={p.imageUrls[0]}
                    alt={p.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-primary-800 shadow-sm border border-slate-100 uppercase tracking-wide">
                    {p.brandName}
                  </span>
                </div>

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
                      title="Thêm vào giỏ"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span className="hidden sm:inline">Chọn mua</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};
