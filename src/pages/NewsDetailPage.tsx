import React from "react";
import { useParams, Link } from "react-router-dom";
import { useDemoData } from "../context/DemoDataContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { SEOHead } from "../components/common/SEOHead";
import {
  Calendar,
  Clock,
  UserCheck,
  Share2,
  BookOpen,
  List,
  ShieldCheck,
  ArrowRight,
  User
} from "lucide-react";

export default function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { articles } = useDemoData();

  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="py-20 text-center container-custom">
        <h1 className="text-2xl font-serif text-slate-800 mb-4">Không tìm thấy bài viết</h1>
        <p className="text-slate-600 mb-6">Bài viết bạn yêu cầu không tồn tại hoặc đã được chuyển mục.</p>
        <Link to="/tin-tuc" className="btn-primary inline-flex">
          Quay lại danh mục Tin tức
        </Link>
      </div>
    );
  }

  // Related articles
  const relatedArticles = articles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  return (
    <>
      <SEOHead
        title={`${article.title} | Lạc's Beauty Center`}
        description={article.summary}
      />

      <Breadcrumbs
        items={[
          { label: "Trang chủ", path: "/" },
          { label: "Tin tức & Kiến thức", path: "/tin-tuc" },
          { label: article.categoryName, path: "/tin-tuc" },
          { label: article.title }
        ]}
      />

      <article className="py-12 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            
            {/* Header info */}
            <div className="mb-8">
              <span className="inline-block bg-primary-100 text-primary-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
                {article.categoryName}
              </span>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-xs md:text-sm text-slate-500 pb-6 border-b border-slate-200">
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <User className="w-4 h-4 text-primary-600" />
                  {article.author}
                </span>

                {article.consultingDoctor && (
                  <span className="flex items-center gap-1.5 text-teal-700 font-semibold bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                    <UserCheck className="w-4 h-4 text-teal-600" />
                    {article.consultingDoctor}
                  </span>
                )}

                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {article.publishedDate}
                </span>

                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  {article.readTime}
                </span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="rounded-3xl overflow-hidden aspect-[16/9] mb-8 bg-slate-100 shadow-md">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Summary Box */}
            <div className="p-6 rounded-2xl bg-slate-50 border-l-4 border-primary-600 text-slate-700 italic text-base leading-relaxed mb-8">
              "{article.summary}"
            </div>

            {/* Table of contents if present */}
            {article.tableOfContents && article.tableOfContents.length > 0 && (
              <div className="p-6 rounded-2xl bg-teal-50/50 border border-teal-100 mb-10">
                <div className="flex items-center gap-2 font-bold text-primary-900 text-base mb-3">
                  <List className="w-5 h-5 text-primary-700" />
                  Mục lục nội dung chính
                </div>
                <nav className="space-y-2">
                  {article.tableOfContents.map((toc, idx) => (
                    <a
                      key={idx}
                      href={`#${toc.id}`}
                      className="block text-sm text-slate-700 hover:text-primary-700 transition hover:underline"
                      style={{ paddingLeft: `${(toc.level - 2) * 16}px` }}
                    >
                      • {toc.title}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Body Content - Markdown rendered */}
            <div className="prose prose-slate max-w-none text-base md:text-lg leading-relaxed text-slate-800 space-y-6">
              {article.contentMarkdown.split("\n\n").map((para, i) => {
                if (para.startsWith("## ")) {
                  const headingText = para.replace("## ", "").split("{#")[0].trim();
                  const anchorId = para.includes("{#") ? para.split("{#")[1].replace("}", "").trim() : "";
                  return (
                    <h2
                      id={anchorId}
                      key={i}
                      className="text-xl md:text-2xl font-serif font-bold text-slate-900 pt-6 border-t border-slate-100 first:border-0"
                    >
                      {headingText}
                    </h2>
                  );
                } else if (para.startsWith("- ") || para.startsWith("* ")) {
                  const items = para.split("\n");
                  return (
                    <ul key={i} className="list-disc pl-6 space-y-2 text-slate-700">
                      {items.map((it, idx) => (
                        <li key={idx} dangerouslySetInnerHTML={{ __html: it.replace(/^[-*]\s*/, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                      ))}
                    </ul>
                  );
                } else if (/^\d+\.\s/.test(para)) {
                  const items = para.split("\n");
                  return (
                    <ol key={i} className="list-decimal pl-6 space-y-2 text-slate-700">
                      {items.map((it, idx) => (
                        <li key={idx} dangerouslySetInnerHTML={{ __html: it.replace(/^\d+\.\s*/, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                      ))}
                    </ol>
                  );
                } else {
                  return (
                    <p
                      key={i}
                      className="text-slate-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }}
                    />
                  );
                }
              })}
            </div>

            {/* Legal / Medical Disclaimer Box (Nghị định 342) */}
            <div className="mt-12 p-6 rounded-2xl bg-amber-50 border border-amber-200 text-xs md:text-sm text-amber-900 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-amber-950 mb-1">
                  Khuyến cáo y khoa từ Phòng khám Chuyên khoa Da liễu Lạc's Beauty Center
                </strong>
                Thông tin trong bài viết chỉ mang tính chất tham khảo kiến thức chăm sóc da khoa học. Mỗi tình trạng da liễu có nguyên nhân và phác đồ điều trị khác nhau. Người bệnh không nên tự ý áp dụng thuốc hoặc phương pháp điều trị khi chưa có chỉ định trực tiếp từ Bác sĩ Da liễu.
              </div>
            </div>

            {/* Booking Callout */}
            <div className="mt-8 bg-gradient-to-r from-primary-800 to-primary-700 text-white p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <h3 className="text-xl md:text-2xl font-serif font-bold mb-2">
                  Cần Thăm Khám Trực Tiếp Cùng Bác Sĩ?
                </h3>
                <p className="text-primary-100 text-sm">
                  Đội ngũ Bác sĩ CKI Da liễu luôn sẵn sàng soi da chuyên sâu và tư vấn phác đồ cá nhân hóa.
                </p>
              </div>
              <Link to="/dat-lich-kham" className="btn-accent shrink-0 text-sm">
                Đặt lịch khám ngay
              </Link>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="mt-16 pt-12 border-t border-slate-200">
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-6">
                  Bài Viết Cùng Chuyên Mục
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedArticles.map((rel) => (
                    <Link
                      key={rel.id}
                      to={`/tin-tuc/${rel.slug}`}
                      className="group block bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:border-primary-300 hover:shadow-lg transition"
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-slate-200">
                        <img
                          src={rel.imageUrl}
                          alt={rel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <span className="text-[11px] text-slate-400 block mb-1">{rel.publishedDate}</span>
                        <h4 className="font-serif font-bold text-slate-800 text-sm line-clamp-2 group-hover:text-primary-700 transition">
                          {rel.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </article>
    </>
  );
}
