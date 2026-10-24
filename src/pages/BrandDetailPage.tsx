import React from "react";
import { useParams, Link } from "react-router-dom";
import { useDemoData } from "../context/DemoDataContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { SEOHead } from "../components/common/SEOHead";
import { SectionTitle } from "../components/common/SectionTitle";
import { ShieldCheck, ArrowRight, ShoppingBag, Sparkles, Building2 } from "lucide-react";

export default function BrandDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { brands, products, openCart } = useDemoData();

  const brand = brands.find((b) => b.slug === slug);

  if (!brand) {
    return (
      <div className="py-20 text-center container-custom">
        <h1 className="text-2xl font-serif text-slate-800 mb-4">Không tìm thấy thương hiệu</h1>
        <p className="text-slate-600 mb-6">Thương hiệu bạn yêu cầu không tồn tại hoặc đã được cập nhật đường dẫn.</p>
        <Link to="/duoc-my-pham" className="btn-primary inline-flex">
          Quay lại Dược – Mỹ phẩm
        </Link>
      </div>
    );
  }

  // Filter products belonging to this brand
  const brandProducts = products.filter((p) => p.brandId === brand.id || p.brandName.toLowerCase() === brand.name.toLowerCase());

  return (
    <>
      <SEOHead
        title={`${brand.name} Chính Hãng | Lạc's Beauty Center`}
        description={brand.description}
      />

      <Breadcrumbs
        items={[
          { label: "Trang chủ", path: "/" },
          { label: "Dược – Mỹ phẩm", path: "/duoc-my-pham" },
          { label: brand.name }
        ]}
      />

      {/* Brand Hero */}
      <section className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 text-white py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur text-xs font-semibold tracking-wider uppercase mb-4 border border-white/20">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Đối tác phân phối dược mỹ phẩm chính hãng
              </div>
              <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">{brand.name}</h1>
              <p className="text-primary-100 text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
                {brand.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-primary-200">
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                  <Building2 className="w-4 h-4 text-teal-300" />
                  Xuất xứ: <strong className="text-white font-medium">{brand.origin}</strong>
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                  <Sparkles className="w-4 h-4 text-teal-300" />
                  Tiêu chuẩn: <strong className="text-white font-medium">Da liễu Châu Âu / Quốc tế</strong>
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl text-slate-800 border border-slate-100 flex flex-col items-center text-center">
              <img
                src={brand.logoUrl}
                alt={brand.name}
                className="w-32 h-32 object-contain rounded-xl mb-4 p-2 bg-slate-50 border border-slate-100"
              />
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">
                Chứng nhận đối tác
              </span>
              <p className="text-sm font-semibold text-primary-800 mb-4">
                Sản phẩm kê toa & hỗ trợ phác đồ da liễu
              </p>
              <Link
                to="/dat-lich-kham"
                className="btn-primary w-full text-center text-sm"
              >
                Tư vấn chọn sản phẩm phù hợp
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Products List */}
      <section className="py-16 bg-slate-50">
        <div className="container-custom">
          <SectionTitle
            badge={`Thương hiệu ${brand.name}`}
            title="Sản Phẩm Đang Phân Phối Tại Lạc's Beauty Center"
            subtitle="Tất cả sản phẩm đều được kiểm định nguồn gốc xuất xứ, tem phụ tiếng Việt và lưu trữ tại kho dược đạt chuẩn GPP."
          />

          {brandProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {brandProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-slate-200/80 hover:border-primary-300 hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden"
                >
                  <Link to={`/san-pham/${p.slug}`} className="block relative aspect-square bg-slate-100/60 overflow-hidden">
                    <img
                      src={p.imageUrls[0]}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-primary-700 text-xs px-2.5 py-1 rounded-full font-medium border border-primary-100 shadow-sm">
                      {p.categoryName}
                    </span>
                  </Link>

                  <div className="p-5 flex-1 flex flex-col">
                    <span className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-semibold">
                      {p.brandName} • {p.origin}
                    </span>
                    <Link
                      to={`/san-pham/${p.slug}`}
                      className="font-medium text-slate-800 hover:text-primary-700 transition line-clamp-2 text-sm leading-snug mb-2 font-sans"
                    >
                      {p.name}
                    </Link>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                      {p.shortDesc}
                    </p>

                    <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="text-base font-bold text-primary-800">
                          {p.price.toLocaleString("vi-VN")} ₫
                        </div>
                        <div className="text-xs text-slate-400">
                          {p.spec}
                        </div>
                      </div>
                      <button
                        onClick={() => openCart(p.id)}
                        className="w-9 h-9 rounded-full bg-primary-50 text-primary-700 hover:bg-primary-700 hover:text-white flex items-center justify-center transition shadow-sm"
                        title="Thêm vào giỏ demo"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 text-center rounded-2xl border border-dashed border-slate-200">
              <p className="text-slate-500 mb-4">Các sản phẩm thuộc nhãn hàng này đang được đội ngũ dược sĩ cập nhật danh mục.</p>
              <Link to="/duoc-my-pham" className="btn-outline inline-flex text-sm">
                Khám phá thương hiệu khác
              </Link>
            </div>
          )}

          {/* Clinical advisory note */}
          <div className="mt-12 bg-teal-50 border border-teal-200 rounded-2xl p-6 text-sm text-teal-900 flex items-start gap-4">
            <div className="p-2 rounded-xl bg-teal-600 text-white shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-teal-950 mb-1">Cam kết chính hãng từ Phòng khám Lạc's Beauty Center</h4>
              <p className="text-teal-800/90 leading-relaxed text-xs md:text-sm">
                Khác với các cửa hàng mỹ phẩm thông thường, Dược – Mỹ phẩm tại Lạc's Beauty Center được bảo quản theo nhiệt độ tiêu chuẩn nhà thuốc, đảm bảo độ ổn định hoạt chất cao nhất. Người bệnh được Bác sĩ Da liễu trực tiếp soi da và hướng dẫn liều dùng phù hợp trước khi sử dụng.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
