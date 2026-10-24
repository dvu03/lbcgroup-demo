import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDemoData } from "../context/DemoDataContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { SEOHead } from "../components/common/SEOHead";
import { SectionTitle } from "../components/common/SectionTitle";
import { Calendar, Clock, UserCheck, Search, ArrowRight, BookOpen } from "lucide-react";

export default function NewsListPage() {
  const { articles } = useDemoData();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter((art) => {
    const matchCat = selectedCategory === "all" || art.category === selectedCategory;
    const matchSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const categories = [
    { id: "all", name: "Tất cả bài viết" },
    { id: "cham-soc-da", name: "Chăm sóc da & Y khoa" },
    { id: "hoat-dong", name: "Hoạt động & Sự kiện" }
  ];

  return (
    <>
      <SEOHead
        title="Tin Tức & Kiến Thức Da Liễu | Phòng Khám Lạc's Beauty Center"
        description="Tổng hợp kiến thức y khoa chuyên sâu về điều trị mụn, sẹo rỗ, nám má, trẻ hóa da và các hoạt động học thuật tại Phòng khám Lạc's Beauty Center."
      />

      <Breadcrumbs
        items={[
          { label: "Trang chủ", path: "/" },
          { label: "Tin tức & Kiến thức" }
        ]}
      />

      <section className="bg-gradient-to-r from-primary-900 to-primary-800 text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold tracking-wider uppercase mb-4 border border-white/20">
              <BookOpen className="w-4 h-4 text-teal-300" />
              Cẩm nang y khoa & Hoạt động
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">
              Kiến Thức Da Liễu Chuẩn Y Khoa
            </h1>
            <p className="text-primary-100 text-base md:text-lg leading-relaxed">
              Các bài viết được biên soạn và kiểm duyệt bởi đội ngũ Bác sĩ chuyên khoa Da liễu Lạc's Beauty Center, giúp người bệnh hiểu đúng về làn da và phòng tránh các sai lầm nguy hại.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-slate-50 min-h-screen">
        <div className="container-custom">
          
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition ${
                    selectedCategory === cat.id
                      ? "bg-primary-700 text-white shadow-md shadow-primary-700/20"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs md:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((art) => (
                <article
                  key={art.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-primary-300 hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  <Link to={`/tin-tuc/${art.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur text-primary-800 text-[11px] font-bold px-3 py-1 rounded-full border border-primary-100 shadow-sm">
                      {art.categoryName}
                    </span>
                  </Link>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {art.publishedDate}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {art.readTime}
                      </span>
                    </div>

                    <h2 className="font-serif text-lg font-bold text-slate-900 group-hover:text-primary-700 transition line-clamp-2 leading-snug mb-3">
                      <Link to={`/tin-tuc/${art.slug}`}>
                        {art.title}
                      </Link>
                    </h2>

                    <p className="text-slate-600 text-xs md:text-sm line-clamp-3 leading-relaxed mb-4">
                      {art.summary}
                    </p>

                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      {art.consultingDoctor ? (
                        <span className="text-primary-700 font-medium flex items-center gap-1 line-clamp-1">
                          <UserCheck className="w-3.5 h-3.5 shrink-0" />
                          {art.consultingDoctor}
                        </span>
                      ) : (
                        <span className="text-slate-400">{art.author}</span>
                      )}

                      <Link
                        to={`/tin-tuc/${art.slug}`}
                        className="text-primary-700 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 shrink-0 ml-2"
                      >
                        Đọc <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300">
              <p className="text-slate-500 mb-4">Không tìm thấy bài viết nào phù hợp với bộ lọc hoặc từ khóa tìm kiếm.</p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="btn-outline text-xs"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
