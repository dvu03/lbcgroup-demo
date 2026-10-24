import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { SEOHead } from "../components/common/SEOHead";
import { SectionTitle } from "../components/common/SectionTitle";
import { initialFAQs, FAQGroup } from "../data/faqs";
import {
  HelpCircle,
  ChevronDown,
  Search,
  MessageCircle,
  Phone,
  Calendar,
  ShieldCheck
} from "lucide-react";

export default function FAQPage() {
  const [faqGroups] = useState<FAQGroup[]>(initialFAQs);
  const [activeGroupId, setActiveGroupId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openQuestionIndex, setOpenQuestionIndex] = useState<string>("0-0");

  const toggleQuestion = (key: string) => {
    setOpenQuestionIndex(openQuestionIndex === key ? "" : key);
  };

  // Filter groups
  const filteredGroups = faqGroups
    .map((grp) => {
      const matchGroup = activeGroupId === "all" || grp.id === activeGroupId;
      if (!matchGroup) return null;

      const filteredItems = grp.items.filter(
        (it) =>
          it.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          it.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (filteredItems.length === 0) return null;

      return {
        ...grp,
        items: filteredItems
      };
    })
    .filter(Boolean) as FAQGroup[];

  const totalQuestions = filteredGroups.reduce((acc, g) => acc + g.items.length, 0);

  return (
    <>
      <SEOHead
        title="Câu Hỏi Thường Gặp (FAQ) | Phòng Khám Lạc's Beauty Center"
        description="Giải đáp các thắc mắc phổ biến về chi phí khám da liễu, quy trình điều trị mụn, sẹo rỗ, chứng nhận máy móc và phác đồ tại Lạc's Beauty Center Cần Thơ."
      />

      <Breadcrumbs
        items={[
          { label: "Trang chủ", path: "/" },
          { label: "Câu hỏi thường gặp" }
        ]}
      />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-800 text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold tracking-wider uppercase mb-4 border border-white/20">
              <HelpCircle className="w-4 h-4 text-teal-300" />
              Trung tâm hỗ trợ khách hàng
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">
              Câu Hỏi Thường Gặp
            </h1>
            <p className="text-primary-100 text-base md:text-lg leading-relaxed">
              Giải đáp chi tiết các thắc mắc về quy trình khám chữa bệnh, công nghệ y khoa, chi phí dịch vụ và các khóa học đào tạo nghề chăm sóc da.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 min-h-[70vh]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            
            {/* Search and Category Filter */}
            <div className="mb-10 space-y-4">
              {/* Search box */}
              <div className="relative">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Nhập từ khóa tìm kiếm câu hỏi (ví dụ: mụn, sẹo rỗ, chi phí, VISIA)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 text-sm md:text-base bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm"
                />
              </div>

              {/* Group tabs */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActiveGroupId("all")}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition ${
                    activeGroupId === "all"
                      ? "bg-primary-700 text-white shadow-md shadow-primary-700/20"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  Tất cả chủ đề
                </button>
                {faqGroups.map((grp) => (
                  <button
                    key={grp.id}
                    onClick={() => setActiveGroupId(grp.id)}
                    className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition ${
                      activeGroupId === grp.id
                        ? "bg-primary-700 text-white shadow-md shadow-primary-700/20"
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {grp.groupTitle}
                  </button>
                ))}
              </div>
            </div>

            {/* Accordion Groups */}
            {filteredGroups.length > 0 ? (
              <div className="space-y-8">
                {filteredGroups.map((grp, gIdx) => (
                  <div key={grp.id} className="space-y-3">
                    <h2 className="font-serif font-bold text-lg text-primary-950 px-2 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary-600" />
                      {grp.groupTitle}
                    </h2>

                    <div className="space-y-3">
                      {grp.items.map((item, iIdx) => {
                        const itemKey = `${gIdx}-${iIdx}`;
                        const isOpen = openQuestionIndex === itemKey;
                        return (
                          <div
                            key={itemKey}
                            className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition"
                          >
                            <button
                              onClick={() => toggleQuestion(itemKey)}
                              className="w-full text-left p-5 flex items-start justify-between gap-4 hover:bg-slate-50/60 transition"
                            >
                              <span className="font-sans font-bold text-sm md:text-base text-slate-900 leading-snug">
                                {item.question}
                              </span>
                              <ChevronDown
                                className={`w-5 h-5 text-primary-600 shrink-0 mt-0.5 transition-transform duration-300 ${
                                  isOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>

                            {isOpen && (
                              <div className="px-5 pb-5 pt-1 text-slate-600 text-xs md:text-sm leading-relaxed border-t border-slate-100">
                                <p>{item.answer}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300">
                <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-600 font-medium mb-2">Không tìm thấy câu hỏi phù hợp với từ khóa</p>
                <p className="text-xs text-slate-400 mb-6">Bạn có thể liên hệ trực tiếp đội ngũ tư vấn y khoa để được giải đáp ngay.</p>
                <Link to="/lien-he" className="btn-primary inline-flex text-xs">
                  Gửi câu hỏi cho chúng tôi
                </Link>
              </div>
            )}

            {/* Support Callout Box */}
            <div className="mt-12 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-serif font-bold text-xl text-slate-900 mb-1">
                  Vẫn Còn Thắc Mắc Khác?
                </h3>
                <p className="text-slate-600 text-xs md:text-sm">
                  Đội ngũ Bác sĩ và Điều dưỡng Da liễu Lạc's Beauty Center luôn sẵn sàng lắng nghe và tư vấn giải pháp.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="tel:19006750"
                  className="btn-outline flex items-center gap-2 text-xs md:text-sm"
                >
                  <Phone className="w-4 h-4 text-primary-600" />
                  <span>Hotline: 1900 6750</span>
                </a>
                <Link
                  to="/dat-lich-kham"
                  className="btn-primary flex items-center gap-2 text-xs md:text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Đặt lịch khám</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
