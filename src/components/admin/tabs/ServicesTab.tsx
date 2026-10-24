import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Scissors,
  Plus,
  Search,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  CheckCircle2,
  Image as ImageIcon,
  Clock,
  UserCheck,
  HelpCircle,
  FileText,
  AlertCircle
} from "lucide-react";
import { useDemoData } from "../../../context/DemoDataContext";
import { ServiceItem } from "../../../data/services";
import { RichTextEditor } from "../RichTextEditor";
import { MediaLibraryModal } from "../MediaLibraryModal";
import { ConfirmationModal } from "../ConfirmationModal";

export const ServicesTab: React.FC = () => {
  const { services, saveService, deleteService, duplicateService, specialties, doctors } = useDemoData();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [activeFormTab, setActiveFormTab] = useState<"info" | "content" | "protocol" | "faqs">("info");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const filteredServices = services.filter((srv) => {
    const matchesSearch =
      srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.metaDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === "all" || srv.specialtyId === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleCreateNew = () => {
    const newSrv: ServiceItem = {
      id: `srv-${Date.now()}`,
      name: "Dịch vụ Da liễu mới",
      shortName: "Dịch vụ mới",
      slug: `dich-vu-moi-${Date.now()}`,
      iconCode: "ICO-NEW",
      iconName: "Sparkles",
      metaDescription: "Thăm khám và điều trị da liễu theo phác đồ cá nhân hóa tại Lạc's Beauty Center.",
      suitableFor: ["Khách hàng có nhu cầu chăm sóc da chuyên sâu"],
      protocolSteps: [
        { step: 1, title: "Soi da đa tầng VISIA 3D", desc: "Thăm khám và chẩn đoán cấu trúc da." },
        { step: 2, title: "Điều trị chuyên sâu", desc: "Thực hiện phác đồ chuẩn y khoa vô trùng." }
      ],
      technologyIds: [],
      duration: "Khoảng 60 – 90 phút / buổi",
      consultingDoctor: doctors[0]?.formalTitle || "ThS.BS. Lạc Kim Ngân",
      faqs: [{ question: "Liệu trình có gây đau không?", answer: "Quy trình nhẹ nhàng, có ủ tê chuẩn y tế nếu cần." }],
      beforeAfterCaseIds: [],
      coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
      seoKeyword: "dịch vụ da liễu Cần Thơ",
      contentMarkdown: "## Giới thiệu dịch vụ\n\nNội dung chi tiết về dịch vụ điều trị chuẩn y khoa...",
      isDoctorApproved: false,
      isVisible: true
    };
    setEditingService(newSrv);
    setActiveFormTab("info");
  };

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    saveService(editingService);
    showToast(`Đã lưu dịch vụ: "${editingService.name}"!`);
    setEditingService(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-neutral-900 font-heading flex items-center gap-2">
            <Scissors className="w-5 h-5 text-emerald-700" />
            <span>Quản lý Danh mục Dịch vụ Điều trị</span>
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl leading-relaxed">
            Hệ thống 9 dịch vụ điều trị da liễu chuyên sâu + ô soi da VISIA 3D trên trang chủ. Quản lý quy trình điều trị, công nghệ liên quan và nội dung biên tập Markdown.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleCreateNew}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo Dịch vụ mới</span>
          </button>

          <Link
            to="/dich-vu"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Xem Danh mục Dịch vụ</span>
          </Link>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-fadeIn font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên dịch vụ..."
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
            />
          </div>

          <div className="relative shrink-0">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-3 py-1.5 text-xs border border-neutral-300 rounded-xl bg-white focus:outline-hidden font-medium text-neutral-700"
            >
              <option value="all">Tất cả chuyên khoa ({services.length})</option>
              {specialties.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-xs text-neutral-500 font-medium">
          Hiển thị <span className="font-bold text-neutral-800">{filteredServices.length}</span> dịch vụ
        </div>
      </div>

      {/* Services Table List */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
        <div className="divide-y divide-neutral-200">
          {filteredServices.map((srv, index) => (
            <div
              key={srv.id}
              className="p-4 hover:bg-neutral-50/50 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-start md:items-center gap-3.5 min-w-0">
                <img
                  src={srv.coverImage}
                  alt={srv.name}
                  className="w-16 h-16 rounded-xl object-cover border border-neutral-200 shrink-0"
                />

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {srv.shortName}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-mono">ID: {srv.id}</span>
                    {srv.isDoctorApproved ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Đã duyệt y khoa
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                        Chờ bác sĩ duyệt
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-neutral-900 mt-1 font-heading">
                    {srv.name}
                  </h3>

                  <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
                    {srv.metaDescription}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-neutral-500 mt-1.5 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{srv.duration}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{srv.consultingDoctor}</span>
                    </span>
                    <span>{srv.protocolSteps.length} bước phác đồ</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
                <Link
                  to={`/dich-vu/${srv.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-emerald-800 hover:bg-neutral-100 transition"
                  title="Xem trang chi tiết dịch vụ"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => duplicateService(srv.id)}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-purple-700 hover:bg-purple-50 transition"
                  title="Nhân bản dịch vụ"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingService({ ...srv });
                    setActiveFormTab("info");
                  }}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-blue-700 hover:bg-blue-50 transition"
                  title="Chỉnh sửa dịch vụ"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(srv.id)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition"
                  title="Xóa dịch vụ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8 overflow-hidden border border-neutral-200">
            <form onSubmit={handleSaveSubmit}>
              <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-neutral-900 font-heading">
                    Chỉnh sửa Dịch vụ: {editingService.name}
                  </h3>
                  <span className="text-xs text-neutral-400 font-mono">Slug: /{editingService.slug}</span>
                </div>
              </div>

              {/* Subtabs for Modal */}
              <div className="flex items-center gap-1 px-6 pt-3 border-b border-neutral-200 bg-neutral-50">
                <button
                  type="button"
                  onClick={() => setActiveFormTab("info")}
                  className={`px-3 py-2 text-xs font-bold border-b-2 transition ${
                    activeFormTab === "info"
                      ? "border-emerald-700 text-emerald-800"
                      : "border-transparent text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  Thông tin chung
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFormTab("content")}
                  className={`px-3 py-2 text-xs font-bold border-b-2 transition ${
                    activeFormTab === "content"
                      ? "border-emerald-700 text-emerald-800"
                      : "border-transparent text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  Nội dung chi tiết (Markdown)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFormTab("protocol")}
                  className={`px-3 py-2 text-xs font-bold border-b-2 transition ${
                    activeFormTab === "protocol"
                      ? "border-emerald-700 text-emerald-800"
                      : "border-transparent text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  Quy trình ({editingService.protocolSteps.length} bước)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFormTab("faqs")}
                  className={`px-3 py-2 text-xs font-bold border-b-2 transition ${
                    activeFormTab === "faqs"
                      ? "border-emerald-700 text-emerald-800"
                      : "border-transparent text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  Hỏi đáp FAQ ({editingService.faqs.length})
                </button>
              </div>

              <div className="p-6 space-y-4 max-h-[55vh] overflow-y-auto">
                {activeFormTab === "info" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                          Tên dịch vụ đầy đủ
                        </label>
                        <input
                          type="text"
                          value={editingService.name}
                          onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                          required
                          className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden font-heading"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                          Tên ngắn (Thẻ trang chủ)
                        </label>
                        <input
                          type="text"
                          value={editingService.shortName}
                          onChange={(e) => setEditingService({ ...editingService, shortName: e.target.value })}
                          required
                          className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                          Slug đường dẫn (URL)
                        </label>
                        <input
                          type="text"
                          value={editingService.slug}
                          onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                          required
                          className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                          Thời lượng thực hiện
                        </label>
                        <input
                          type="text"
                          value={editingService.duration}
                          onChange={(e) => setEditingService({ ...editingService, duration: e.target.value })}
                          required
                          className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                          Ảnh đại diện dịch vụ (Cover)
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowMediaPicker(true)}
                          className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1"
                        >
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Chọn từ Thư viện Media</span>
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <img
                          src={editingService.coverImage}
                          alt="Cover"
                          className="w-16 h-12 rounded-lg object-cover border border-neutral-200 shrink-0"
                        />
                        <input
                          type="url"
                          value={editingService.coverImage}
                          onChange={(e) => setEditingService({ ...editingService, coverImage: e.target.value })}
                          required
                          className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-hidden font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                        Mô tả ngắn (SEO & Thẻ)
                      </label>
                      <textarea
                        rows={2}
                        value={editingService.metaDescription}
                        onChange={(e) => setEditingService({ ...editingService, metaDescription: e.target.value })}
                        required
                        className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-hidden resize-none"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="srvDoctorApprovedCheck"
                        checked={editingService.isDoctorApproved}
                        onChange={(e) => setEditingService({ ...editingService, isDoctorApproved: e.target.checked })}
                        className="w-4 h-4 text-emerald-600 rounded border-neutral-300 focus:ring-emerald-500"
                      />
                      <label htmlFor="srvDoctorApprovedCheck" className="text-xs font-medium text-neutral-800 cursor-pointer">
                        Nội dung đã được Bác sĩ Da liễu duyệt chuyên môn y khoa
                      </label>
                    </div>
                  </>
                )}

                {activeFormTab === "content" && (
                  <RichTextEditor
                    label="Nội dung bài viết chi tiết dịch vụ (Markdown)"
                    value={editingService.contentMarkdown}
                    onChange={(val) => setEditingService({ ...editingService, contentMarkdown: val })}
                    rows={12}
                    helperText="Hỗ trợ heading, in đậm, danh sách và chèn ảnh trực tiếp từ thư viện Media."
                  />
                )}

                {activeFormTab === "protocol" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                        Các bước phác đồ điều trị ({editingService.protocolSteps.length})
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const nextStep = editingService.protocolSteps.length + 1;
                          setEditingService({
                            ...editingService,
                            protocolSteps: [
                              ...editingService.protocolSteps,
                              { step: nextStep, title: `Bước ${nextStep}: Tiêu đề bước`, desc: "Mô tả thao tác điều trị..." }
                            ]
                          });
                        }}
                        className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Thêm bước</span>
                      </button>
                    </div>

                    {editingService.protocolSteps.map((step, sIdx) => (
                      <div key={sIdx} className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-xs text-neutral-800">Bước {sIdx + 1}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = editingService.protocolSteps.filter((_, idx) => idx !== sIdx);
                              setEditingService({ ...editingService, protocolSteps: updated });
                            }}
                            className="text-xs text-red-600 hover:text-red-800"
                          >
                            Xóa bước
                          </button>
                        </div>
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) => {
                            const updated = [...editingService.protocolSteps];
                            updated[sIdx].title = e.target.value;
                            setEditingService({ ...editingService, protocolSteps: updated });
                          }}
                          placeholder="Tiêu đề bước"
                          className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded-lg"
                        />
                        <textarea
                          rows={2}
                          value={step.desc}
                          onChange={(e) => {
                            const updated = [...editingService.protocolSteps];
                            updated[sIdx].desc = e.target.value;
                            setEditingService({ ...editingService, protocolSteps: updated });
                          }}
                          placeholder="Mô tả bước"
                          className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded-lg resize-none"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {activeFormTab === "faqs" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                        Hỏi đáp thường gặp ({editingService.faqs.length})
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingService({
                            ...editingService,
                            faqs: [
                              ...editingService.faqs,
                              { question: "Câu hỏi thường gặp mới?", answer: "Câu trả lời giải thích từ bác sĩ..." }
                            ]
                          });
                        }}
                        className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Thêm câu hỏi</span>
                      </button>
                    </div>

                    {editingService.faqs.map((faq, fIdx) => (
                      <div key={fIdx} className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-xs text-neutral-800">Q&A #{fIdx + 1}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = editingService.faqs.filter((_, idx) => idx !== fIdx);
                              setEditingService({ ...editingService, faqs: updated });
                            }}
                            className="text-xs text-red-600 hover:text-red-800"
                          >
                            Xóa FAQ
                          </button>
                        </div>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => {
                            const updated = [...editingService.faqs];
                            updated[fIdx].question = e.target.value;
                            setEditingService({ ...editingService, faqs: updated });
                          }}
                          placeholder="Câu hỏi"
                          className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded-lg font-medium"
                        />
                        <textarea
                          rows={2}
                          value={faq.answer}
                          onChange={(e) => {
                            const updated = [...editingService.faqs];
                            updated[fIdx].answer = e.target.value;
                            setEditingService({ ...editingService, faqs: updated });
                          }}
                          placeholder="Câu trả lời"
                          className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded-lg resize-none"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-100 transition"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition"
                >
                  Lưu Dịch vụ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!deleteConfirmId}
        type="danger"
        title="Xóa Dịch vụ điều trị?"
        message="Hành động này sẽ xóa dịch vụ khỏi danh mục và lưới 10 ô trang chủ trên website."
        confirmLabel="Xóa Dịch vụ"
        cancelLabel="Hủy bỏ"
        onConfirm={() => {
          if (deleteConfirmId) {
            deleteService(deleteConfirmId);
            setDeleteConfirmId(null);
            showToast("Đã xóa dịch vụ thành công!");
          }
        }}
        onCancel={() => setDeleteConfirmId(null)}
      />

      {/* Media Picker Modal */}
      <MediaLibraryModal
        isOpen={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelectMedia={(media) => {
          if (editingService) {
            setEditingService({ ...editingService, coverImage: media.url });
          }
          setShowMediaPicker(false);
        }}
        title="Chọn ảnh đại diện Dịch vụ"
      />
    </div>
  );
};
