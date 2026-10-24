import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDemoData } from "../context/DemoDataContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { SEOHead } from "../components/common/SEOHead";
import { SectionTitle } from "../components/common/SectionTitle";
import {
  ShieldCheck,
  ShoppingBag,
  Heart,
  Share2,
  CheckCircle2,
  AlertCircle,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Info
} from "lucide-react";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { products, openCart } = useDemoData();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"cong-dung" | "thanh-phan" | "huong-dan">("cong-dung");

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="py-20 text-center container-custom">
        <h1 className="text-2xl font-serif text-slate-800 mb-4">Không tìm thấy sản phẩm</h1>
        <p className="text-slate-600 mb-6">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã ngừng phân phối.</p>
        <Link to="/duoc-my-pham" className="btn-primary inline-flex">
          Quay lại danh mục Dược – Mỹ phẩm
        </Link>
      </div>
    );
  }

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.brandId === product.brandId || p.category === product.category))
    .slice(0, 4);

  return (
    <>
      <SEOHead
        title={`${product.name} | Dược Mỹ Phẩm Lạc's Beauty Center`}
        description={product.shortDesc}
      />

      <Breadcrumbs
        items={[
          { label: "Trang chủ", path: "/" },
          { label: "Dược – Mỹ phẩm", path: "/duoc-my-pham" },
          { label: product.brandName, path: `/thuong-hieu/${product.brandId}` },
          { label: product.name }
        ]}
      />

      <div className="py-12 bg-slate-50">
        <div className="container-custom">
          {/* Main Product Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 shadow-sm border border-slate-200/80 mb-8 sm:mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Product Gallery (5 cols) */}
              <div className="lg:col-span-5">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 mb-4">
                  <img
                    src={product.imageUrls[selectedImageIndex] || product.imageUrls[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-primary-700 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md">
                    {product.categoryName}
                  </div>
                </div>

                {product.imageUrls.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {product.imageUrls.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                          selectedImageIndex === idx ? "border-primary-600 ring-2 ring-primary-100" : "border-slate-200 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Medical Trust Box */}
                <div className="mt-6 p-4 rounded-2xl bg-teal-50/70 border border-teal-200/60 text-xs text-teal-900 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-teal-950 font-semibold mb-0.5">Tiêu chuẩn Kho Dược Phòng khám</strong>
                    Sản phẩm được lưu kho theo chuẩn GPP y tế, hạn sử dụng dài và tem chống hàng giả độc quyền.
                  </div>
                </div>
              </div>

              {/* Product Info (7 cols) */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="flex items-center gap-3 mb-2">
                  <Link
                    to={`/thuong-hieu/${product.brandId}`}
                    className="text-xs uppercase font-bold text-primary-700 tracking-wider hover:underline"
                  >
                    Thương hiệu: {product.brandName}
                  </Link>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-500">Mã SKU: {product.sku}</span>
                </div>

                <h1 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 leading-snug mb-3">
                  {product.name}
                </h1>

                {/* Price Display */}
                <div className="flex items-baseline gap-4 mb-5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-3xl font-bold text-primary-800">
                    {product.price.toLocaleString("vi-VN")} ₫
                  </div>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="text-base text-slate-400 line-through">
                      {product.originalPrice.toLocaleString("vi-VN")} ₫
                    </div>
                  )}
                  <span className="text-xs text-slate-500 ml-auto bg-white px-3 py-1 rounded-full border border-slate-200">
                    Quy cách: <strong>{product.spec}</strong>
                  </span>
                </div>

                <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-6">
                  {product.shortDesc}
                </p>

                {/* Technical Specifications - HEADING 6 TABLE as per brief */}
                <div className="mb-6 border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="bg-slate-100/80 px-4 py-2.5 border-b border-slate-200">
                    <h6 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Thông số sản phẩm
                    </h6>
                  </div>
                  <table className="w-full text-xs md:text-sm">
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-2.5 px-4 font-medium text-slate-500 w-1/3 bg-slate-50/50">Loại da phù hợp</td>
                        <td className="py-2.5 px-4 text-slate-800">{product.skinType}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-medium text-slate-500 bg-slate-50/50">Dung tích / Quy cách</td>
                        <td className="py-2.5 px-4 text-slate-800">{product.spec}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-medium text-slate-500 bg-slate-50/50">Xuất xứ thương hiệu</td>
                        <td className="py-2.5 px-4 text-slate-800">{product.origin}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-medium text-slate-500 bg-slate-50/50">Nhóm công dụng</td>
                        <td className="py-2.5 px-4 text-slate-800">{product.categoryName}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Actions: Quantity + Add To Cart + Consultation */}
                <div className="space-y-4 pt-4 border-t border-slate-200 mt-auto">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 transition text-sm font-semibold"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 text-sm font-medium text-slate-800 min-w-[40px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 transition text-sm font-semibold"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => openCart(product.id, quantity)}
                      className="btn-primary flex-1 flex items-center justify-center gap-2 py-3.5"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span>Thêm vào giỏ hàng demo</span>
                    </button>

                    <Link
                      to="/dat-lich-kham"
                      className="btn-outline flex items-center justify-center gap-2 py-3.5 text-sm"
                    >
                      <span>Tư vấn da miễn phí</span>
                    </Link>
                  </div>

                  <p className="text-xs text-slate-400 italic text-center">
                    * Lưu ý: Đây là website thử nghiệm prototype cho Ban Giám đốc LBC. Đơn hàng demo sẽ hiển thị trong giỏ hàng mẫu để kiểm tra trải nghiệm người dùng, chưa trừ tiền hay xuất kho thật.
                  </p>
                </div>

              </div>
            </div>

            {/* Detailed Tabs: Uses, Ingredients, Instructions */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="flex border-b border-slate-200 gap-8 mb-6">
                <button
                  onClick={() => setActiveTab("cong-dung")}
                  className={`pb-3 text-sm font-semibold transition border-b-2 ${
                    activeTab === "cong-dung"
                      ? "border-primary-700 text-primary-800"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Công dụng chi tiết
                </button>
                <button
                  onClick={() => setActiveTab("thanh-phan")}
                  className={`pb-3 text-sm font-semibold transition border-b-2 ${
                    activeTab === "thanh-phan"
                      ? "border-primary-700 text-primary-800"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Thành phần chính
                </button>
                <button
                  onClick={() => setActiveTab("huong-dan")}
                  className={`pb-3 text-sm font-semibold transition border-b-2 ${
                    activeTab === "huong-dan"
                      ? "border-primary-700 text-primary-800"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Hướng dẫn sử dụng & Khuyến cáo
                </button>
              </div>

              <div className="prose prose-slate max-w-none text-sm md:text-base leading-relaxed text-slate-700">
                {activeTab === "cong-dung" && (
                  <div>
                    <p>{product.uses}</p>
                    <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                      <strong>Lưu ý từ Bác sĩ Da liễu LBC:</strong> Hiệu quả cải thiện có thể khác nhau tùy theo cơ địa da và việc tuân thủ đầy đủ các bước chống nắng, phục hồi đi kèm.
                    </div>
                  </div>
                )}
                {activeTab === "thanh-phan" && (
                  <div>
                    <p>{product.mainIngredients}</p>
                    <p className="mt-2 text-xs text-slate-500">
                      Bảng thành phần đầy đủ được in rõ trên bao bì sản phẩm nhập khẩu chính ngạch theo quy định của Cục Quản lý Dược – Bộ Y tế.
                    </p>
                  </div>
                )}
                {activeTab === "huong-dan" && (
                  <div>
                    <p>{product.usageGuide}</p>
                    <ul className="list-disc pl-5 mt-3 space-y-1 text-xs text-slate-600">
                      <li>Bảo quản nơi khô ráo, thoáng mát dưới 30°C, tránh ánh nắng trực tiếp.</li>
                      <li>Đậy kín nắp sau khi sử dụng để tránh oxy hóa hoạt chất.</li>
                      <li>Ngưng sử dụng và liên hệ bác sĩ nếu có dấu hiệu kích ứng hoặc dị ứng bất thường.</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <SectionTitle
                subtitle="Gợi ý liên quan"
                title="Sản Phẩm Cùng Chuyên Khoa"
                align="left"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white rounded-2xl border border-slate-200/80 hover:border-primary-300 hover:shadow-lg transition p-4 flex flex-col group"
                  >
                    <Link to={`/san-pham/${p.slug}`} className="block aspect-square bg-slate-50 rounded-xl overflow-hidden mb-3">
                      <img src={p.imageUrls[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                    </Link>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">{p.brandName}</span>
                    <Link to={`/san-pham/${p.slug}`} className="text-sm font-medium text-slate-800 line-clamp-2 hover:text-primary-700 transition mb-2">
                      {p.name}
                    </Link>
                    <div className="mt-auto pt-2 flex items-center justify-between border-t border-slate-100">
                      <span className="font-bold text-primary-800 text-sm">{p.price.toLocaleString("vi-VN")} ₫</span>
                      <button
                        onClick={() => openCart(p.id)}
                        className="p-1.5 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-700 hover:text-white transition"
                        title="Thêm vào giỏ"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
