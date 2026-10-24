import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useDemoData } from "../context/DemoDataContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { SEOHead } from "../components/common/SEOHead";
import {
  Search,
  Sparkles,
  Stethoscope,
  User,
  Cpu,
  BookOpen,
  ShoppingBag,
  ArrowRight,
  Filter
} from "lucide-react";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [activeTab, setActiveTab] = useState<string>("all");

  const { services, specialties, doctors, technologies, articles, products, brands } = useDemoData();

  useEffect(() => {
    setSearchTerm(queryParam);
  }, [queryParam]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchTerm });
  };

  const q = searchTerm.toLowerCase().trim();

  // Filter across entities
  const matchingSpecialties = q
    ? specialties.filter((s) => s.name.toLowerCase().includes(q) || s.shortDesc.toLowerCase().includes(q))
    : [];

  const matchingServices = q
    ? services.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.shortName.toLowerCase().includes(q) ||
          s.metaDescription.toLowerCase().includes(q)
      )
    : [];

  const matchingDoctors = q
    ? doctors.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.formalTitle.toLowerCase().includes(q) ||
          d.specialty.toLowerCase().includes(q) ||
          d.degree.toLowerCase().includes(q)
      )
    : [];

  const matchingTechnologies = q
    ? technologies.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.deviceOrigin.toLowerCase().includes(q) ||
          t.principle.toLowerCase().includes(q)
      )
    : [];

  const matchingArticles = q
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.categoryName.toLowerCase().includes(q)
      )
    : [];

  const matchingProducts = q
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brandName.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q) ||
          p.skinType.toLowerCase().includes(q)
      )
    : [];

  const totalResults =
    matchingSpecialties.length +
    matchingServices.length +
    matchingDoctors.length +
    matchingTechnologies.length +
    matchingArticles.length +
    matchingProducts.length;

  return (
    <>
      <SEOHead
        title={`Kết Quả Tìm Kiếm: "${searchTerm}" | Lạc's Beauty Center`}
        description="Tìm kiếm dịch vụ da liễu, hồ sơ bác sĩ, máy móc công nghệ, bài viết y khoa và dược mỹ phẩm chính hãng tại Lạc's Beauty Center."
      />

      <Breadcrumbs
        items={[
          { label: "Trang chủ", path: "/" },
          { label: "Tìm kiếm" }
        ]}
      />

      <section className="bg-slate-900 text-white py-12">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl md:text-4xl font-serif font-bold mb-4">
              Tra Cứu Thông Tin Y Khoa & Dịch Vụ
            </h1>
            <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm dịch vụ, bác sĩ, công nghệ, dược mỹ phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-28 py-3.5 rounded-full text-sm md:text-base text-slate-900 bg-white focus:outline-none focus:ring-4 focus:ring-primary-500/30 shadow-lg"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-primary-700 hover:bg-primary-800 text-white px-5 py-2 rounded-full text-xs font-semibold transition"
              >
                Tìm kiếm
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-12 bg-slate-50 min-h-[60vh]">
        <div className="container-custom">
          {q ? (
            <div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
                <p className="text-sm md:text-base text-slate-700">
                  Tìm thấy <strong>{totalResults}</strong> kết quả cho từ khóa:{" "}
                  <span className="text-primary-800 font-bold font-mono">"{searchTerm}"</span>
                </p>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-1.5 text-xs">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                      activeTab === "all" ? "bg-primary-700 text-white" : "bg-white text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    Tất cả ({totalResults})
                  </button>
                  {matchingServices.length > 0 && (
                    <button
                      onClick={() => setActiveTab("services")}
                      className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                        activeTab === "services" ? "bg-primary-700 text-white" : "bg-white text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      Dịch vụ ({matchingServices.length})
                    </button>
                  )}
                  {matchingDoctors.length > 0 && (
                    <button
                      onClick={() => setActiveTab("doctors")}
                      className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                        activeTab === "doctors" ? "bg-primary-700 text-white" : "bg-white text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      Bác sĩ ({matchingDoctors.length})
                    </button>
                  )}
                  {matchingProducts.length > 0 && (
                    <button
                      onClick={() => setActiveTab("products")}
                      className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                        activeTab === "products" ? "bg-primary-700 text-white" : "bg-white text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      Sản phẩm ({matchingProducts.length})
                    </button>
                  )}
                  {matchingArticles.length > 0 && (
                    <button
                      onClick={() => setActiveTab("articles")}
                      className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                        activeTab === "articles" ? "bg-primary-700 text-white" : "bg-white text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      Bài viết ({matchingArticles.length})
                    </button>
                  )}
                </div>
              </div>

              {totalResults === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center max-w-lg mx-auto border border-dashed border-slate-300">
                  <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-slate-800 mb-1">Không tìm thấy kết quả phù hợp</h3>
                  <p className="text-xs text-slate-500 mb-6">
                    Thử tìm kiếm với từ khóa ngắn gọn hơn như: "mụn", "sẹo", "laser", "Bioderma", "Lạc Kim Ngân".
                  </p>
                  <Link to="/" className="btn-primary text-xs inline-flex">
                    Quay về trang chủ
                  </Link>
                </div>
              ) : (
                <div className="space-y-10">
                  {/* Services Results */}
                  {(activeTab === "all" || activeTab === "services") && matchingServices.length > 0 && (
                    <div>
                      <h2 className="text-lg font-serif font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Stethoscope className="w-5 h-5 text-primary-600" />
                        Dịch Vụ Điều Trị Da Liễu ({matchingServices.length})
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {matchingServices.map((svc) => (
                          <Link
                            key={svc.id}
                            to={`/dich-vu/${svc.slug}`}
                            className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-primary-300 hover:shadow-md transition flex flex-col group"
                          >
                            <span className="text-[11px] font-bold text-primary-700 uppercase tracking-wider mb-1">
                              {svc.shortName}
                            </span>
                            <h3 className="font-serif font-bold text-slate-900 group-hover:text-primary-700 transition text-base mb-2">
                              {svc.name}
                            </h3>
                            <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                              {svc.metaDescription}
                            </p>
                            <span className="text-xs text-primary-700 font-semibold mt-auto flex items-center gap-1">
                              Chi tiết dịch vụ <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Doctors Results */}
                  {(activeTab === "all" || activeTab === "doctors") && matchingDoctors.length > 0 && (
                    <div>
                      <h2 className="text-lg font-serif font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-primary-600" />
                        Bác Sĩ Chuyên Khoa ({matchingDoctors.length})
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {matchingDoctors.map((doc) => (
                          <Link
                            key={doc.id}
                            to={`/bs-${doc.slug}`}
                            className="bg-white p-4 rounded-2xl border border-slate-200/80 hover:border-primary-300 hover:shadow-md transition flex items-center gap-4 group"
                          >
                            <img
                              src={doc.avatarUrl}
                              alt={doc.name}
                              className="w-16 h-16 rounded-full object-cover border border-slate-200 shrink-0"
                            />
                            <div>
                              <span className="text-[10px] uppercase font-bold text-primary-700 tracking-wider">
                                {doc.formalTitle || doc.degree}
                              </span>
                              <h3 className="font-serif font-bold text-slate-900 group-hover:text-primary-700 transition text-sm">
                                {doc.name}
                              </h3>
                              <p className="text-[11px] text-slate-500 line-clamp-1">
                                {doc.specialty}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Products Results */}
                  {(activeTab === "all" || activeTab === "products") && matchingProducts.length > 0 && (
                    <div>
                      <h2 className="text-lg font-serif font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-primary-600" />
                        Dược – Mỹ Phẩm ({matchingProducts.length})
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {matchingProducts.map((p) => (
                          <Link
                            key={p.id}
                            to={`/san-pham/${p.slug}`}
                            className="bg-white p-4 rounded-2xl border border-slate-200/80 hover:border-primary-300 hover:shadow-md transition flex flex-col group"
                          >
                            <div className="aspect-square bg-slate-50 rounded-xl overflow-hidden mb-3">
                              <img src={p.imageUrls[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                              {p.brandName}
                            </span>
                            <h3 className="text-xs md:text-sm font-medium text-slate-900 line-clamp-2 group-hover:text-primary-700 transition mb-2">
                              {p.name}
                            </h3>
                            <span className="text-sm font-bold text-primary-800 mt-auto">
                              {p.price.toLocaleString("vi-VN")} ₫
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Articles Results */}
                  {(activeTab === "all" || activeTab === "articles") && matchingArticles.length > 0 && (
                    <div>
                      <h2 className="text-lg font-serif font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-primary-600" />
                        Bài Viết & Kiến Thức ({matchingArticles.length})
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {matchingArticles.map((art) => (
                          <Link
                            key={art.id}
                            to={`/tin-tuc/${art.slug}`}
                            className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-primary-300 hover:shadow-md transition flex flex-col group"
                          >
                            <div className="aspect-[16/10] bg-slate-100 overflow-hidden">
                              <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                            </div>
                            <div className="p-4 flex-1 flex flex-col">
                              <span className="text-[10px] font-bold text-primary-700 uppercase tracking-wider mb-1">
                                {art.categoryName}
                              </span>
                              <h3 className="font-serif font-bold text-sm text-slate-900 group-hover:text-primary-700 transition line-clamp-2 mb-2">
                                {art.title}
                              </h3>
                              <p className="text-xs text-slate-500 line-clamp-2 mt-auto">
                                {art.summary}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center max-w-lg mx-auto border border-slate-200 shadow-sm">
              <Search className="w-12 h-12 text-primary-600 mx-auto mb-3" />
              <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">Nhập Từ Khóa Cần Tìm</h3>
              <p className="text-xs md:text-sm text-slate-500 mb-4">
                Tìm kiếm thông tin theo tên dịch vụ, bác sĩ phụ trách, máy móc công nghệ cao hoặc thương hiệu dược mỹ phẩm yêu thích.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button onClick={() => setSearchTerm("mụn")} className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-xs text-slate-700">Trị mụn</button>
                <button onClick={() => setSearchTerm("sẹo")} className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-xs text-slate-700">Sẹo rỗ</button>
                <button onClick={() => setSearchTerm("Bioderma")} className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-xs text-slate-700">Bioderma</button>
                <button onClick={() => setSearchTerm("Lạc Kim Ngân")} className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-xs text-slate-700">BS. Lạc Kim Ngân</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
