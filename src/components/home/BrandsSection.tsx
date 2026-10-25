import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useDemoData } from '../../context/DemoDataContext';
import { SectionTitle } from '../common/SectionTitle';

export const BrandsSection: React.FC = () => {
  const { brands, products } = useDemoData();

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-slate-50/70 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Dược Mỹ Phẩm Chính Hãng"
          subtitle="Hợp tác chính thức cùng các tập đoàn dược mỹ phẩm da liễu hàng đầu thế giới từ Pháp, Tây Ban Nha và Bulgaria."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((b) => {
            const allBrandProducts = products.filter(p => p.brandId === b.id);
            const brandProducts = allBrandProducts.slice(0, 2);
            return (
              <div
                key={b.id}
                className="rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between medical-card-hover group"
              >
                <div>
                  {/* Brand Header with Logo / Origin */}
                  <div className="flex flex-wrap items-center justify-between gap-1.5 mb-3 pb-2.5 border-b border-slate-100">
                    <span className="text-[11px] sm:text-xs font-bold text-primary-700 bg-primary-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-primary-100">
                      Xuất xứ: {b.origin}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Phân phối chính hãng
                    </span>
                  </div>

                  {/* Brand Logo if available */}
                  {b.logoUrl && (
                    <div className="h-10 mb-2 flex items-center">
                      <img
                        src={b.logoUrl}
                        alt={b.name}
                        className="max-h-9 max-w-[130px] object-contain"
                      />
                    </div>
                  )}

                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-primary-700 transition-colors">
                      {b.name}
                    </h3>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {allBrandProducts.length > 0 ? `${allBrandProducts.length} sản phẩm` : ''}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {b.description}
                  </p>

                  {/* 2 Representative Products */}
                  {brandProducts.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Sản phẩm tiêu biểu:
                      </span>
                      {brandProducts.map((p) => (
                        <div key={p.id} className="flex items-center gap-2.5 text-xs text-slate-700">
                          <img
                            src={p.imageUrls[0]}
                            alt={p.name}
                            onError={(e) => {
                              e.currentTarget.src = '/images/fallback-clinic.svg';
                            }}
                            className="w-8 h-8 rounded-lg object-cover border border-slate-100 shrink-0"
                          />
                          <span className="line-clamp-1 flex-1 font-medium">{p.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100">
                  <Link
                    to={`/thuong-hieu/${b.slug}`}
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 group-hover:bg-primary-50 text-slate-700 group-hover:text-primary-700 font-semibold text-xs flex items-center justify-between transition-colors"
                  >
                    <span>Xem toàn bộ dòng sản phẩm</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
